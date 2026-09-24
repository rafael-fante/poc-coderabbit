import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

/**
 * Ends requests with JSON for GET /health, HTML for GET /hello, or 404 text.
 * The greeting uses the first 80 UTF-16 code units of the first `name` value
 * (or "mundo" if absent) and inserts it into HTML without escaping it.
 */
export function app(request, response) {
  const url = new URL(request.url, 'http://localhost');

  if (request.method === 'GET' && url.pathname === '/health') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (request.method === 'GET' && url.pathname === '/hello') {
    const name = (url.searchParams.get('name') ?? 'mundo').slice(0, 80);
    response.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'content-security-policy': "default-src 'none'",
      'x-content-type-options': 'nosniff',
    });
    response.end(`<!doctype html><html lang="pt-BR"><body><h1>Olá, ${name}!</h1></body></html>`);
    return;
  }

  response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
  response.end('Não encontrado');
}

export function startServer(port = process.env.PORT ?? 3000) {
  const server = createServer(app);
  server.listen(port, '127.0.0.1');
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  startServer();
}
