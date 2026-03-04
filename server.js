const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3002;

// Persistent data directory — use Railway volume mount if available, else local
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const SHEETS_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK || '';
const DATA_FILE = path.join(DATA_DIR, 'budget-data.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const CAT_LABELS = {
  ppc: 'PPC + Ads', design: 'Design', merch: 'Printing / Merch',
  events: 'Events', website: 'Website, Software + AI', content: 'Content', contingency: 'Contingency'
};
const MONTHS = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];

// ========== Google Sheets Sync (server-side) ==========
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

  // Google Apps Script redirects POST requests, so we need to follow redirects
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
      // Follow redirects (302, 301, 307)
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

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check for Railway
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  // === API: Config (exposes non-sensitive env vars to frontend) ===
  if (req.url === '/api/config' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ sheetsWebhook: SHEETS_WEBHOOK ? true : false }));
    return;
  }

  // === API: Load data ===
  if (req.url === '/api/data' && req.method === 'GET') {
    fs.readFile(DATA_FILE, 'utf8', (err, content) => {
      if (err) {
        // No saved data yet — return empty
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, data: null }));
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
        fs.writeFile(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf8', (err) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, error: 'Failed to save' }));
            return;
          }
          // Sync to Google Sheets in background
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
  console.log(`Google Sheets sync: ${SHEETS_WEBHOOK ? 'ENABLED' : 'disabled'}`);
});
