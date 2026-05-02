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

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  const forwardedIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  const firstForwardedIp = forwardedIp?.split(',')[0]?.trim();

  return (
    req.headers['x-real-ip'] ||
    req.headers['cf-connecting-ip'] ||
    firstForwardedIp ||
    req.socket?.remoteAddress ||
    ''
  ).toString();
}

function getVisitorKey(req) {
  const ip = getClientIp(req);
  const salt = (
    process.env.VISITOR_COUNT_SALT ||
    process.env.SUPABASE_JWT_SECRET ||
    process.env.VITE_SUPABASE_URL ||
    'portfolio-visitor-count'
  ).trim();

  return crypto
    .createHash('sha256')
    .update(`${salt}:${ip}`)
    .digest('hex');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const supabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim();
  const supabaseKey = (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim();

  if (!supabaseUrl || !supabaseKey) {
    return sendJson(res, 500, { error: 'Missing Supabase server env vars' });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/increment_portfolio_view`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        authorization: `Bearer ${supabaseKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ visitor_key: getVisitorKey(req) }),
    });

    const text = await response.text();
    if (!response.ok) {
      return sendJson(res, response.status, { error: text || response.statusText });
    }

    return sendJson(res, 200, { count: Number.parseInt(text, 10) || 0 });
  } catch (err) {
    return sendJson(res, 500, { error: err?.message || 'Visitor count failed' });
  }
}
