/* eslint-env node */
/* global process, Buffer */

import crypto from 'node:crypto';

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return null;
  return JSON.parse(raw);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const apiKey = (process.env.LINGO_API_KEY || '').trim().replace(/^"|"$/g, '');
  if (!apiKey) {
    return sendJson(res, 500, { error: 'Missing LINGO_API_KEY env var' });
  }

  let body;
  try {
    body = req.body && typeof req.body === 'object' ? req.body : await readJsonBody(req);
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

  try {
    const response = await fetch('https://engine.lingo.dev/i18n', {
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
  } catch (err) {
    return sendJson(res, 500, { error: err?.message || 'Translation failed' });
  }
}
