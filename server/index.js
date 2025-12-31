/* eslint-env node */
/* global process, Buffer */

import crypto from 'node:crypto';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');

const PORT = Number.parseInt(process.env.PORT || '8787', 10);

async function loadDotEnvIfPresent() {
  const envPath = path.join(ROOT, '.env');
  try {
    const raw = await fsp.readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      value = value.replace(/^"|"$/g, '');
      if (key && process.env[key] == null) process.env[key] = value;
    }
  } catch {
    // ignore
  }
}

function getApiKey() {
  return (
    process.env.LINGO_API_KEY ||
    process.env.VITE_LINGO_API_KEY ||
    ''
  ).trim().replace(/^"|"$/g, '');
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;
  return JSON.parse(raw);
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

await loadDotEnvIfPresent();

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/api/health') {
      return sendJson(res, 200, { ok: true });
    }

    if (url.pathname === '/api/lingo/localizeObject' && req.method === 'POST') {
      const apiKey = getApiKey();
      if (!apiKey) {
        return sendJson(res, 500, { error: 'Missing Lingo API key (set LINGO_API_KEY server-side).' });
      }

      let body;
      try {
        body = await readJsonBody(req);
      } catch {
        return sendJson(res, 400, { error: 'Invalid JSON body' });
      }

      const { objectToTranslate, sourceLocale, targetLocale } = body ?? {};
      if (!objectToTranslate || typeof objectToTranslate !== 'object') {
        return sendJson(res, 400, { error: 'objectToTranslate must be an object' });
      }
      if (!sourceLocale || !targetLocale) {
        return sendJson(res, 400, { error: 'sourceLocale and targetLocale are required' });
      }

      const engineUrl = 'https://engine.lingo.dev/i18n';
      const response = await fetch(engineUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          params: { workflowId: crypto.randomUUID(), fast: true },
          locale: { source: sourceLocale, target: targetLocale },
          data: objectToTranslate,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        return sendJson(res, response.status, { error: text || response.statusText });
      }

      const json = await response.json();
      return sendJson(res, 200, { data: json?.data || {} });
    }

    // Static serving (optional for production)
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405);
      return res.end();
    }

    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const safePath = path.normalize(requestedPath).replace(/^\.{2,}/, '');
    const filePath = path.join(DIST_DIR, safePath);

    const exists = fs.existsSync(filePath);
    if (exists && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
      return fs.createReadStream(filePath).pipe(res);
    }

    // SPA fallback to index.html (if dist exists)
    const indexPath = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return fs.createReadStream(indexPath).pipe(res);
    }

    res.writeHead(404);
    return res.end();
  } catch (err) {
    console.error('Server error:', err);
    return sendJson(res, 500, { error: err?.message || 'Server error' });
  }
});

server.listen(PORT, () => {
  console.log(`[server] API proxy listening on http://localhost:${PORT}`);
});
