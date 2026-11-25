/**
 * Zero to Hero — Cloudflare Worker in front of the static site.
 *
 * - HTML routes get their own <title>, description, canonical and Open Graph /
 *   Twitter tags (QA-28, QA-29), rendered into index.html with HTMLRewriter.
 * - Unknown addresses answer with a real 404 status (QA-31).
 * - Security headers on every response (QA-30); immutable caching for hashed assets (QA-24).
 * - /api/* is the optional-account API (RD-10), see ./api.ts.
 */
import meta from './meta.json';
import { handleApi, type Env as ApiEnv } from './api';

export interface Env extends ApiEnv {
  ASSETS: Fetcher;
}

type Meta = { chapters: Record<string, { title: string; titleEn: string; desc: string; descEn: string; sections: string[] }> };
const M = meta as Meta;
const SITE = 'https://start.ahouei.site';
const SITE_FA = 'از صفر تا قهرمان';
const HOME_TITLE = 'از صفر تا قهرمان: ساخت وب‌سایت با Agentic AI';
const HOME_DESC =
  'یک مسیر آموزشی تعاملی و قدم‌به‌قدم برای ساختن و منتشر کردن هر نوع وب‌سایت با Agentic AI و Vibe Coding، با Codex یا Lovable، GitHub و Cloudflare.';

const CSP = [
  "default-src 'self'",
  "script-src 'self' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'", // React/Motion set inline style attributes
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self' blob:", // canvas-confetti draws in a blob Web Worker
  'frame-src https://challenges.cloudflare.com',
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

function secure(h: Headers) {
  h.set('Content-Security-Policy', CSP);
  h.set('Strict-Transport-Security', 'max-age=31536000');
  h.set('X-Content-Type-Options', 'nosniff');
  h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  h.set('Cross-Origin-Opener-Policy', 'same-origin');
  return h;
}

type Page = { status: number; title: string; desc: string; path: string; og: string; noindex?: boolean };
const ADMIN_SECTIONS = ['overview', 'learners', 'content', 'announcements', 'ai', 'settings', 'audit'];

function pageFor(pathname: string): Page {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return { status: 200, title: HOME_TITLE, desc: HOME_DESC, path: '/', og: '/og/home.png' };
  if (p === '/glossary')
    return { status: 200, title: `واژه‌نامه · ${SITE_FA}`, desc: 'همه اصطلاح‌های دوره، هر کدام با پیوند به فصلی که آن را آموزش می‌دهد.', path: '/glossary', og: '/og/home.png' };
  const a = p.match(/^\/admin(?:\/([a-z]+))?$/);
  if (a && (!a[1] || ADMIN_SECTIONS.includes(a[1])))
    return { status: 200, title: `پنل مدیریت · ${SITE_FA}`, desc: 'Admin', path: '/admin', og: '/og/home.png', noindex: true };
  const m = p.match(/^\/c\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?$/);
  if (m) {
    const c = M.chapters[m[1]];
    if (c && (!m[2] || c.sections.includes(m[2])))
      return { status: 200, title: `${c.title} · ${SITE_FA}`, desc: c.desc, path: `/c/${m[1]}`, og: `/og/${m[1]}.png` };
  }
  return { status: 404, title: `صفحه پیدا نشد · ${SITE_FA}`, desc: HOME_DESC, path: p, og: '/og/home.png' };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function html(request: Request, env: Env, url: URL) {
  const page = pageFor(url.pathname);
  // Fetch the shell unconditionally: forwarding the browser's If-None-Match would get a
  // bodiless 304 back, and the page we send is rewritten per route anyway.
  const shell = await env.ASSETS.fetch(new Request(new URL('/', url), { method: 'GET' }));
  if (!shell.ok || !(shell.headers.get('content-type') ?? '').includes('text/html')) {
    // Never hand out an empty shell: fail loudly so monitoring sees it.
    return new Response('App shell unavailable', { status: 502, headers: secure(new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })) });
  }
  const tags = [
    `<meta name="description" content="${esc(page.desc)}">`,
    `<link rel="canonical" href="${SITE}${page.path}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_FA}">`,
    `<meta property="og:locale" content="fa_IR">`,
    `<meta property="og:title" content="${esc(page.title)}">`,
    `<meta property="og:description" content="${esc(page.desc)}">`,
    `<meta property="og:url" content="${SITE}${page.path}">`,
    `<meta property="og:image" content="${SITE}${page.og}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(page.title)}">`,
    `<meta name="twitter:description" content="${esc(page.desc)}">`,
    `<meta name="twitter:image" content="${SITE}${page.og}">`,
    page.status === 404 || page.noindex ? `<meta name="robots" content="noindex">` : '',
  ].join('');
  const out = new HTMLRewriter()
    .on('title', { element: (e) => void e.setInnerContent(page.title) })
    .on('meta[name="description"]', { element: (e) => void e.remove() })
    .on('head', { element: (e) => void e.append(tags, { html: true }) })
    .transform(shell);
  const headers = secure(new Headers(out.headers));
  headers.delete('ETag'); // the shell's ETag does not describe this rewritten page
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-cache');
  if (page.noindex) headers.set('X-Robots-Tag', 'noindex, nofollow');
  return new Response(out.body, { status: page.status, headers });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/')) {
      const res = await handleApi(request, env, url);
      const h = secure(new Headers(res.headers));
      if (!h.has('Cache-Control')) h.set('Cache-Control', 'no-store');
      return new Response(res.body, { status: res.status, headers: h });
    }

    const looksLikeFile = /\.[a-z0-9]{2,5}$/i.test(url.pathname);
    if (looksLikeFile) {
      const res = await env.ASSETS.fetch(request);
      const h = secure(new Headers(res.headers));
      if (url.pathname.startsWith('/assets/') && res.ok) h.set('Cache-Control', 'public, max-age=31536000, immutable');
      else if (res.ok) h.set('Cache-Control', 'public, max-age=3600');
      // A missing file is a real 404, never the app shell.
      if (res.status === 200 && (res.headers.get('content-type') ?? '').includes('text/html') && !url.pathname.endsWith('.html'))
        return new Response('Not found', { status: 404, headers: secure(new Headers({ 'Content-Type': 'text/plain; charset=utf-8' })) });
      return new Response(res.body, { status: res.status, headers: h });
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    return html(request, env, url);
  },
} satisfies ExportedHandler<Env>;
