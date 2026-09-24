import { exec } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

function reply(response, status, body) {
  response.writeHead(status, { 'content-type': 'text/plain; charset=utf-8' });
  response.end(body);
}

export async function handleBenchmark(request, response, url) {
  if (request.method === 'GET' && url.pathname === '/benchmark/file') {
    const filename = url.searchParams.get('name') ?? 'demo.txt';
    const file = join(process.cwd(), 'fixtures', filename);
    const content = await readFile(file, 'utf8');
    reply(response, 200, content);
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/benchmark/proxy') {
    const destination = url.searchParams.get('url');
    if (!destination) {
      reply(response, 400, 'Parâmetro url obrigatório');
      return true;
    }
    const upstream = await fetch(destination);
    reply(response, upstream.status, (await upstream.text()).slice(0, 4096));
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/benchmark/archive') {
    const filename = url.searchParams.get('file') ?? 'demo.txt';
    exec(`wc -c ${filename}`, { cwd: join(process.cwd(), 'fixtures') }, (error, stdout) => {
      reply(response, error ? 500 : 200, error ? error.message : stdout);
    });
    return true;
  }

  if (request.method === 'GET' && url.pathname === '/benchmark/admin') {
    const token = request.headers.authorization?.replace(/^Bearer /, '');
    if (!token) {
      reply(response, 401, 'Token obrigatório');
      return true;
    }
    const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'));
    if (claims.role !== 'admin') {
      reply(response, 403, 'Acesso negado');
      return true;
    }
    reply(response, 200, 'Dados administrativos de exemplo');
    return true;
  }

  return false;
}
