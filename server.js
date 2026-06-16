const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { clerkMiddleware, getAuth, clerkClient } = require('@clerk/express');

const PORT = process.env.PORT || 3002;

// Persistent data directory — use Railway volume mount if available, else local
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK || '';
const DASHBOARD_URL = process.env.PLEXUS_DASHBOARD_URL || '';
const DATA_FILE = path.join(DATA_DIR, 'budget-data.json');
const MAX_BACKUPS = 30; // keep ~30 snapshots, rolled by save time

// Clerk's hosted sign-in for this instance. Unauthenticated visitors are
// sent here and bounced back after signing in.
const SIGN_IN_BASE = 'https://fluent-humpback-32.accounts.dev/sign-in';

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Write a timestamped backup of the previous data file before overwriting,
// and prune to the most recent MAX_BACKUPS.
function backupAndPrune() {
  try {
    if (!fs.existsSync(DATA_FILE)) return;
    const prev = fs.readFileSync(DATA_FILE, 'utf8');
    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    fs.writeFileSync(path.join(BACKUP_DIR, `budget-data.${ts}.bak.json`), prev, 'utf8');
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.endsWith('.bak.json'))
      .map(f => ({ f, t: fs.statSync(path.join(BACKUP_DIR, f)).mtimeMs }))
      .sort((a, b) => b.t - a.t);
    files.slice(MAX_BACKUPS).forEach(({ f }) => {
      try { fs.unlinkSync(path.join(BACKUP_DIR, f)); } catch (_) {}
    });
  } catch (e) {
    console.warn('Backup failed:', e.message);
  }
}

// Cache dashboard data for 60s to avoid hitting Google Sheets quota
let _dashboardCache = { data: null, fetchedAt: 0 };
const DASHBOARD_CACHE_MS = 60 * 1000;

function fetchDashboardData() {
  return new Promise((resolve) => {
    if (!DASHBOARD_URL) return resolve({ ok: false, error: 'PLEXUS_DASHBOARD_URL not set' });
    if (_dashboardCache.data && Date.now() - _dashboardCache.fetchedAt < DASHBOARD_CACHE_MS) {
      return resolve({ ok: true, data: _dashboardCache.data, cached: true });
    }
    const url = new URL('/api/data', DASHBOARD_URL);
    https.get(url, (resp) => {
      let body = '';
      resp.on('data', (c) => { body += c; });
      resp.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (parsed.ok && parsed.data) {
            _dashboardCache = { data: parsed.data, fetchedAt: Date.now() };
          }
          resolve(parsed);
        } catch (e) {
          resolve({ ok: false, error: 'Failed to parse dashboard response' });
        }
      });
    }).on('error', (e) => resolve({ ok: false, error: e.message }));
  });
}

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ========== Auth (Clerk) ==========
// Access requires a signed-in Plexus user with the admin role. Admin status
// is cached briefly per user so we don't call Clerk on every asset request.
const ADMIN_TTL_MS = 5 * 60 * 1000;
const adminCache = new Map(); // userId -> { isAdmin, exp }

async function isAdmin(userId) {
  const cached = adminCache.get(userId);
  if (cached && cached.exp > Date.now()) return cached.isAdmin;
  let ok = false;
  try {
    const user = await clerkClient.users.getUser(userId);
    ok = user.publicMetadata?.role === 'admin';
  } catch (e) {
    console.warn('Clerk getUser failed:', e.message);
  }
  adminCache.set(userId, { isAdmin: ok, exp: Date.now() + ADMIN_TTL_MS });
  return ok;
}

// ========== Google Sheets Sync ==========
const CAT_LABELS = {
  ppc: 'PPC + Ads', design: 'Design', merch: 'Printing / Merch',
  events: 'Events', website: 'Website + Software', ai: 'AI', content: 'Content', contingency: 'Contingency'
};
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

function syncToSheets(state) {
  if (!SHEETS_WEBHOOK) return;

  const yearLabels = { '2026': 'FY 2025-26', '2024-45k': 'FY 2024-25', '2027': 'FY 2026-27' };
  const rows = [];

  Object.entries(state.data || {}).forEach(([yearKey, yearSnap]) => {
    const yearLabel = yearLabels[yearKey] || yearKey;
    Object.entries(yearSnap).forEach(([catKey, catSnap]) => {
      Object.entries(catSnap.items || {}).forEach(([name, item]) => {
        rows.push({
          year: yearLabel,
          category: CAT_LABELS[catKey] || catKey,
          item: name,
          budget: item.budget || 0,
          actual: item.actual || 0,
          monthlyBudget: item.monthlyBudget || [],
          monthlyActual: item.monthlyActual || [],
        });
      });
    });
  });

  const payload = JSON.stringify({ timestamp: new Date().toISOString(), rows });

  function postToUrl(url, data, redirectCount) {
    if (redirectCount > 5) { console.warn('Sheets sync: too many redirects'); return; }

    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = https.request(options, (res) => {
      if ([301, 302, 307].includes(res.statusCode) && res.headers.location) {
        console.log('Sheets sync: following redirect to', res.headers.location);
        postToUrl(res.headers.location, data, redirectCount + 1);
        return;
      }
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        console.log(`Sheets sync: ${res.statusCode} - ${body.slice(0, 200)}`);
      });
    });

    req.on('error', (e) => { console.warn('Sheets sync error:', e.message); });
    req.write(data);
    req.end();
  }

  postToUrl(SHEETS_WEBHOOK, payload, 0);
}

// ========== Static / MIME ==========
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// The application's request logic. Auth is enforced upstream by Express
// middleware, so every request reaching here is an authenticated admin.
function handleApp(req, res) {
  cors(res);

  // === API: Config ===
  if (req.url === '/api/config' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      sheetsWebhook: SHEETS_WEBHOOK ? true : false,
      dashboardConfigured: DASHBOARD_URL ? true : false,
    }));
    return;
  }

  // === API: Dashboard deals (proxied) ===
  if (req.url === '/api/dashboard-deals' && req.method === 'GET') {
    fetchDashboardData().then((result) => {
      if (!result.ok || !result.data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: result.error || 'No data', deals: null }));
        return;
      }
      const d = result.data;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        cached: !!result.cached,
        deals: {
          '2027': d.deals2627 || [],
          '2026': d.deals2526 || [],
          '2024-45k': d.deals2425 || [],
        },
      }));
    });
    return;
  }

  // === API: Load data ===
  if (req.url === '/api/data' && req.method === 'GET') {
    fs.readFile(DATA_FILE, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, data: null }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, data: JSON.parse(content) }));
    });
    return;
  }

  // === API: List backups ===
  if (req.url === '/api/backups' && req.method === 'GET') {
    try {
      const files = fs.readdirSync(BACKUP_DIR)
        .filter(f => f.endsWith('.bak.json'))
        .map(f => {
          const stat = fs.statSync(path.join(BACKUP_DIR, f));
          return { name: f, savedAt: stat.mtime.toISOString(), bytes: stat.size };
        })
        .sort((a, b) => b.savedAt.localeCompare(a.savedAt));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, backups: files }));
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: e.message }));
    }
    return;
  }

  // === API: Read a specific backup ===
  if (req.url.startsWith('/api/backup/') && req.method === 'GET') {
    const name = path.basename(req.url.split('?')[0].slice('/api/backup/'.length));
    if (!name.endsWith('.bak.json')) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: false, error: 'Invalid backup name' }));
      return;
    }
    const fp = path.join(BACKUP_DIR, name);
    fs.readFile(fp, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Not found' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true, data: JSON.parse(content) }));
    });
    return;
  }

  // === API: Save data ===
  if (req.url === '/api/data' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        backupAndPrune(); // snapshot previous file before overwriting
        fs.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Failed to save' }));
            return;
          }
          syncToSheets(parsed);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true }));
        });
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // === Static files ===
  const urlPath = req.url.split('?')[0];
  let filePath = urlPath === '/' ? '/index.html' : urlPath;
  filePath = path.join(__dirname, filePath);

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

// ========== Server ==========
const app = express();
// Behind Railway's TLS-terminating proxy, so req.protocol reflects https.
app.set('trust proxy', true);

// Health check — public (Railway probes it; no auth).
app.get('/health', (_req, res) => res.type('text').send('OK'));

// CORS preflight — public.
app.options(/.*/, (_req, res) => { cors(res); res.writeHead(204); res.end(); });

// Clerk session parsing + handshake handling.
app.use(clerkMiddleware());

// Gate: signed-in Plexus user with the admin role.
app.use(async (req, res, next) => {
  const { userId } = getAuth(req);
  if (!userId) {
    const back = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    return res.redirect(`${SIGN_IN_BASE}?redirect_url=${encodeURIComponent(back)}`);
  }
  if (!(await isAdmin(userId))) {
    res.status(403).type('html').send(
      '<div style="font-family:system-ui;max-width:32rem;margin:4rem auto;text-align:center">' +
      '<h1>Plexus admins only</h1><p>This tool is restricted. Ask Sarah if you need access.</p></div>'
    );
    return;
  }
  next();
});

// Everything else → the application logic (authenticated admins only).
app.use((req, res) => handleApp(req, res));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Plexus Budget Planner running on port ${PORT}`);
  console.log(`Data stored in: ${DATA_FILE}`);
  console.log(`Auth: Clerk (admin role required)`);
  console.log(`Google Sheets sync: ${SHEETS_WEBHOOK ? 'ENABLED' : 'disabled'}`);
  console.log(`Dashboard integration: ${DASHBOARD_URL ? `ENABLED (${DASHBOARD_URL})` : 'disabled (no PLEXUS_DASHBOARD_URL set)'}`);
  console.log(`Backups: keeping last ${MAX_BACKUPS} snapshots in ${BACKUP_DIR}`);
});
