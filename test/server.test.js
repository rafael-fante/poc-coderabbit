import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { startServer } from '../src/server.js';

let server;
let baseUrl;

before(async () => {
  server = startServer(0);
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('health check', async () => {
  const response = await fetch(`${baseUrl}/health`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: 'ok' });
});

test('escapa HTML enviado pelo usuário', async () => {
  const response = await fetch(`${baseUrl}/hello?name=${encodeURIComponent('<script>alert(1)</script>')}`);
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(html, /<script>/);
  assert.equal(response.headers.get('content-security-policy'), "default-src 'none'");
});

test('retorna 404 em rota desconhecida', async () => {
  const response = await fetch(`${baseUrl}/desconhecida`);
  assert.equal(response.status, 404);
});
