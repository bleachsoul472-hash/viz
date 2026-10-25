import { getStore } from '@netlify/blobs';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-admin-user, x-admin-pass',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
};
const reply = (statusCode, body) => new Response(JSON.stringify(body), { status: statusCode, headers });

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  const store = getStore('ms3dh-shared-site');
  if (request.method === 'GET') {
    try { return reply(200, { state: await store.get('site-state', { type: 'json' }) || null }); }
    catch { return reply(200, { state: null }); }
  }
  if (request.method !== 'POST') return reply(405, { error: 'Method not allowed' });
  let body;
  try { body = await request.json(); } catch { return reply(400, { error: 'Invalid JSON' }); }
  let creds;
  try { creds = await store.get('admin-creds', { type: 'json' }); } catch { creds = null; }
  const expectedUser = creds?.username || process.env.ADMIN_USERNAME || 'ms3dh';
  const expectedPass = creds?.password || process.env.ADMIN_PASSWORD || 'ms3dh@505';
  if (body.action === 'login') {
    return body.username === expectedUser && body.password === expectedPass
      ? reply(200, { ok: true }) : reply(401, { ok: false });
  }
  const user = request.headers.get('x-admin-user') || '';
  const pass = request.headers.get('x-admin-pass') || '';
  if (user !== expectedUser || pass !== expectedPass) return reply(401, { error: 'Unauthorized' });
  if (body.action === 'save') {
    if (!body.state || typeof body.state.html !== 'string') return reply(400, { error: 'Invalid state' });
    await store.setJSON('site-state', body.state);
    return reply(200, { ok: true, updatedAt: new Date().toISOString() });
  }
  if (body.action === 'credentials') {
    if (typeof body.username !== 'string' || !body.username.trim() || typeof body.password !== 'string' || body.password.length < 8)
      return reply(400, { error: 'Username required; password must be at least 8 characters' });
    await store.setJSON('admin-creds', { username: body.username.trim(), password: body.password });
    return reply(200, { ok: true });
  }
  return reply(400, { error: 'Unknown action' });
};
