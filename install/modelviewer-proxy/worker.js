const UPSTREAM = 'https://wow.zamimg.com';
const ALLOWED_ORIGINS = new Set([
  'https://genocide12.github.io',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
]);

function corsHeaders(origin) {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  });
  if (ALLOWED_ORIGINS.has(origin)) headers.set('Access-Control-Allow-Origin', origin);
  return headers;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Method not allowed', { status: 405, headers });
    if (!ALLOWED_ORIGINS.has(origin)) return new Response('Origin not allowed', { status: 403, headers });
    if (!url.pathname.startsWith('/modelviewer/')) return new Response('Not found', { status: 404, headers });

    const upstreamUrl = new URL(url.pathname + url.search, UPSTREAM);
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: { 'Accept': request.headers.get('Accept') || '*/*' },
      cf: { cacheEverything: true, cacheTtl: 86400 },
    });
    const responseHeaders = new Headers(upstream.headers);
    for (const [name, value] of headers) responseHeaders.set(name, value);
    responseHeaders.set('Cache-Control', 'public, max-age=86400');
    return new Response(upstream.body, { status: upstream.status, statusText: upstream.statusText, headers: responseHeaders });
  },
};
