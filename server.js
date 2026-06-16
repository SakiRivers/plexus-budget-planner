const http = require('http');
const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;
const APP_PASSWORD = process.env.APP_PASSWORD || '';

// Persistent data directory — use Railway volume mount if available, else local
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK || '';
const DASHBOARD_URL = process.env.PLEXUS_DASHBOARD_URL || '';
const DATA_FILE = path.join(DATA_DIR, 'budget-data.json');
const MAX_BACKUPS = 30; // keep ~30 snapshots, rolled by save time

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

// ========== Auth ==========
// Simple token-based auth: password → session token stored in cookie
const activeSessions = new Set();

function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

function parseCookies(req) {
  const cookies = {};
  (req.headers.cookie || '').split(';').forEach(c => {
    const [k, v] = c.trim().split('=');
    if (k && v) cookies[k] = v;
  });
  return cookies;
}

function isAuthenticated(req) {
  if (!APP_PASSWORD) return true; // no password set = open access
  const cookies = parseCookies(req);
  return cookies.plx_session && activeSessions.has(cookies.plx_session);
}

const LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Plexus Budget Planner — Login</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: { extend: { colors: { plx: { bg:'#efefef', card:'#ffffff', border:'#d6d6df', text:'#454559', dim:'#7a7a8e', blue:'#414bc8', green:'#2ba88a', red:'#c0415d' } } } }
    }
  </script>
  <style>body { font-family: system-ui, Avenir, Helvetica, Arial, sans-serif; background: #efefef; }</style>
</head>
<body class="min-h-screen flex items-center justify-center">
  <div class="bg-white border border-plx-border rounded-2xl shadow-lg p-8 w-full max-w-sm">
    <div class="text-center mb-6">
      <h1 class="text-xl font-bold text-plx-text">Plexus <span class="text-plx-blue">Budget Planner</span></h1>
      <p class="text-sm text-plx-dim mt-1">Enter password to continue</p>
    </div>
    <form id="loginForm" class="space-y-4">
      <input type="password" id="pwd" autofocus autocomplete="current-password"
        class="w-full px-4 py-3 rounded-xl border border-plx-border text-plx-text outline-none focus:border-plx-blue transition-colors"
        placeholder="Password" />
      <button type="submit"
        class="w-full py-3 rounded-xl bg-plx-blue text-white font-semibold hover:opacity-90 transition-opacity">
        Sign In
      </button>
      <p id="error" class="text-sm text-plx-red text-center hidden">Incorrect password</p>
    </form>
  </div>
  <script>
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const pwd = document.getElementById('pwd').value;
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const json = await res.json();
      if (json.ok) {
        window.location.reload();
      } else {
        document.getElementById('error').classList.remove('hidden');
        document.getElementById('pwd').value = '';
        document.getElementById('pwd').focus();
      }
    });
  </script>
</body>
</html>`;

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

// ========== Server ==========
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

const server = http.createServer((req, res) => {
  cors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check (no auth needed)
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // === Login endpoint (no auth needed) ===
  if (req.url === '/api/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { password } = JSON.parse(body);
        if (password === APP_PASSWORD) {
          const token = generateToken();
          activeSessions.add(token);
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Set-Cookie': `plx_session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800`,
          });
          res.end(JSON.stringify({ ok: true }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Wrong password' }));
        }
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Bad request' }));
      }
    });
    return;
  }

  // === Auth check for everything else ===
  if (!isAuthenticated(req)) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(LOGIN_PAGE);
    return;
  }

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
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Plexus Budget Planner running on port ${PORT}`);
  console.log(`Data stored in: ${DATA_FILE}`);
  console.log(`Password protection: ${APP_PASSWORD ? 'ENABLED' : 'disabled (no APP_PASSWORD set)'}`);
  console.log(`Google Sheets sync: ${SHEETS_WEBHOOK ? 'ENABLED' : 'disabled'}`);
  console.log(`Dashboard integration: ${DASHBOARD_URL ? `ENABLED (${DASHBOARD_URL})` : 'disabled (no PLEXUS_DASHBOARD_URL set)'}`);
  console.log(`Backups: keeping last ${MAX_BACKUPS} snapshots in ${BACKUP_DIR}`);
});
