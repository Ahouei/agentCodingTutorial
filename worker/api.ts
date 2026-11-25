/**
 * Optional accounts (RD-10): passwordless email sign-in + progress sync.
 *
 * Security (saas-auth-security-baseline, rolling-session-lifetime):
 * - Sign-in links: 32 random bytes, stored only as SHA-256, single use, 15-minute expiry.
 *   Opening the link shows a "Continue" button (POST), so email scanners that prefetch links cannot use them.
 * - Turnstile on every sign-in request (verified server-side with the visitor IP).
 * - Rate limits per IP and per email; the response never reveals whether an email has an account.
 * - Sessions: random token in an HttpOnly, Secure, SameSite=Lax cookie; only its hash is stored;
 *   30-day lifetime renewed past the halfway mark (row and cookie together).
 * - State-changing requests must come from this origin (Origin check) with a JSON body.
 * - Ownership is always derived from the session, never from the request.
 */
import { merge, sanitize, same, type Progress } from '../src/lib/progressMerge';

export interface Env {
  DB?: D1Database;
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_SITE_KEY?: string;
  MAIL_FROM?: string;
}

const ORIGIN = 'https://start.ahouei.site';
const COOKIE = 'zth_session';
const SESSION_TTL = 30 * 24 * 3600 * 1000;
const RENEW_AFTER = SESSION_TTL / 2;
const LINK_TTL = 15 * 60 * 1000;

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers } });

const enabled = (env: Env) => !!(env.DB && env.RESEND_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY);

async function sha256(s: string) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function randomToken() {
  const b = crypto.getRandomValues(new Uint8Array(32));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
const ipOf = (r: Request) => r.headers.get('CF-Connecting-IP') ?? '0.0.0.0';

function cookie(token: string, maxAgeMs: number) {
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${Math.floor(maxAgeMs / 1000)}`;
}
function readCookie(r: Request) {
  const m = (r.headers.get('Cookie') ?? '').match(new RegExp(`(?:^|; )${COOKIE}=([A-Za-z0-9_-]{20,})`));
  return m ? m[1] : null;
}

/** Fixed-window counter in D1. Returns true when over the limit. */
async function limited(db: D1Database, key: string, max: number, windowMs: number) {
  const now = Date.now();
  const bucket = `${key}:${Math.floor(now / windowMs)}`;
  const row = await db
    .prepare('INSERT INTO rate (key, n, exp) VALUES (?1, 1, ?2) ON CONFLICT(key) DO UPDATE SET n = n + 1 RETURNING n')
    .bind(bucket, now + windowMs * 2)
    .first<{ n: number }>();
  if (Math.random() < 0.02) await db.prepare('DELETE FROM rate WHERE exp < ?1').bind(now).run();
  return (row?.n ?? 0) > max;
}

function sameOrigin(r: Request) {
  const o = r.headers.get('Origin');
  return o === ORIGIN || o === 'http://127.0.0.1:8787' || o === 'http://localhost:8787';
}

async function sessionUser(r: Request, env: Env, renew: boolean) {
  const raw = readCookie(r);
  if (!raw || !env.DB) return null;
  const hash = await sha256(raw);
  const now = Date.now();
  const row = await env.DB.prepare(
    'SELECT s.user_id, s.expires_at, u.email FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id_hash = ?1',
  )
    .bind(hash)
    .first<{ user_id: string; expires_at: number; email: string }>();
  if (!row || row.expires_at < now) return null;
  let setCookie: string | undefined;
  if (renew && row.expires_at - now < SESSION_TTL - RENEW_AFTER) {
    await env.DB.prepare('UPDATE sessions SET expires_at = ?1, last_seen = ?2 WHERE id_hash = ?3').bind(now + SESSION_TTL, now, hash).run();
    setCookie = cookie(raw, SESSION_TTL); // row and cookie move together
  }
  return { userId: row.user_id, email: row.email, hash, setCookie };
}

const EMAIL_RE = /^[^\s@<>()[\],;:"]{1,64}@[A-Za-z0-9.-]{1,190}\.[A-Za-z]{2,24}$/;

function emailHtml(link: string, fa: boolean) {
  const t = fa
    ? { h: 'ورود به «از صفر تا قهرمان»', p: 'برای ورود روی دکمه زیر بزنید. این پیوند ۱۵ دقیقه معتبر است و فقط یک بار کار می‌کند.', b: 'ورود', n: 'اگر شما درخواست ورود نداده‌اید، این ایمیل را نادیده بگیرید.' }
    : { h: 'Sign in to Zero to Hero', p: 'Tap the button to sign in. The link works once and expires in 15 minutes.', b: 'Sign in', n: "If you didn't ask to sign in, ignore this email." };
  return `<!doctype html><html lang="${fa ? 'fa' : 'en'}" dir="${fa ? 'rtl' : 'ltr'}"><body style="margin:0;background:#fbf6ee;font-family:Tahoma,Arial,sans-serif;color:#2a211b">
<div style="max-width:480px;margin:0 auto;padding:32px 20px"><div style="background:#fffdf9;border:2px solid #2a211b;border-radius:18px;padding:24px">
<h1 style="font-size:20px;margin:0 0 12px">${t.h}</h1><p style="line-height:1.8;margin:0 0 20px">${t.p}</p>
<a href="${link}" style="display:inline-block;background:#ef6a4c;color:#2a211b;font-weight:bold;text-decoration:none;padding:12px 22px;border-radius:999px;border:2px solid #2a211b">${t.b}</a>
<p style="font-size:13px;color:#6b5e52;line-height:1.7;margin:20px 0 0">${t.n}</p></div></div></body></html>`;
}

function continuePage(token: string, fa: boolean, error?: string) {
  const t = fa
    ? { h: 'ورود به از صفر تا قهرمان', b: 'ادامه و ورود', e: error ?? '' }
    : { h: 'Sign in to Zero to Hero', b: 'Continue', e: error ?? '' };
  const body = error
    ? `<p>${t.e}</p><p><a href="/">${fa ? 'بازگشت به سایت' : 'Back to the site'}</a></p>`
    : `<form method="POST" action="/api/auth/verify"><input type="hidden" name="token" value="${token}"><button type="submit">${t.b}</button></form>`;
  return new Response(
    `<!doctype html><html lang="${fa ? 'fa' : 'en'}" dir="${fa ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${t.h}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#fbf6ee;color:#2a211b;font:17px/1.7 system-ui,Tahoma,sans-serif}main{max-width:420px;padding:28px;border:2px solid #2a211b;border-radius:22px;background:#fffdf9;box-shadow:4px 4px 0 #2a211b;text-align:center}button{min-height:48px;padding:10px 24px;border-radius:999px;border:2px solid #2a211b;background:#ef6a4c;color:#2a211b;font:inherit;font-weight:800;cursor:pointer}a{color:inherit}</style></head>
<body><main><h1 style="font-size:22px">${t.h}</h1>${body}</main></body></html>`,
    { status: error ? 400 : 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

export async function handleApi(r: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname;

  if (path === '/api/config' && r.method === 'GET')
    return json({ accounts: enabled(env), turnstileSiteKey: enabled(env) ? env.TURNSTILE_SITE_KEY : null });

  if (!enabled(env) || !env.DB) return json({ error: 'accounts_unavailable' }, 503);
  const db = env.DB;

  // ── Start sign-in: Turnstile + rate limits + email the link ──
  if (path === '/api/auth/start' && r.method === 'POST') {
    if (!sameOrigin(r)) return json({ error: 'bad_origin' }, 403);
    let body: { email?: unknown; turnstile?: unknown; lang?: unknown };
    try {
      body = await r.json();
    } catch {
      return json({ error: 'bad_request' }, 400);
    }
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const fa = body.lang !== 'en';
    if (!EMAIL_RE.test(email) || typeof body.turnstile !== 'string') return json({ error: 'bad_request' }, 400);
    const ip = ipOf(r);
    if (await limited(db, `start-ip:${ip}`, 5, 60_000)) return json({ error: 'rate_limited' }, 429);

    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET_KEY!);
    form.append('response', body.turnstile);
    form.append('remoteip', ip);
    const ts = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const tsr = (await ts.json().catch(() => ({}))) as { success?: boolean; hostname?: string };
    if (!tsr.success) return json({ error: 'turnstile_failed' }, 400);

    // Same answer whether or not the email exists or is over its limit (no enumeration).
    if (!(await limited(db, `start-email:${email}`, 3, 10 * 60_000))) {
      const token = randomToken();
      const now = Date.now();
      await db
        .prepare('INSERT INTO login_tokens (token_hash, email, expires_at, created_at, ip) VALUES (?1, ?2, ?3, ?4, ?5)')
        .bind(await sha256(token), email, now + LINK_TTL, now, ip)
        .run();
      const link = `${ORIGIN}/api/auth/verify?token=${encodeURIComponent(token)}&lang=${fa ? 'fa' : 'en'}`;
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.MAIL_FROM ?? 'Zero to Hero <noreply@ahouei.site>',
          to: [email],
          subject: fa ? 'پیوند ورود به از صفر تا قهرمان' : 'Your Zero to Hero sign-in link',
          html: emailHtml(link, fa),
        }),
      });
      if (!res.ok) console.error('resend failed', res.status, await res.text().catch(() => ''));
    }
    return json({ ok: true });
  }

  // ── Verify: GET shows a Continue button; POST consumes the link ──
  if (path === '/api/auth/verify') {
    const fa = url.searchParams.get('lang') !== 'en';
    if (r.method === 'GET') {
      const token = url.searchParams.get('token') ?? '';
      if (!/^[A-Za-z0-9_-]{20,}$/.test(token)) return continuePage('', fa, fa ? 'این پیوند معتبر نیست.' : 'This link is not valid.');
      return continuePage(token, fa);
    }
    if (r.method === 'POST') {
      if (!sameOrigin(r) && r.headers.get('Origin') !== null) return json({ error: 'bad_origin' }, 403);
      const form = await r.formData().catch(() => null);
      const token = form?.get('token');
      if (typeof token !== 'string' || !/^[A-Za-z0-9_-]{20,}$/.test(token))
        return continuePage('', fa, fa ? 'این پیوند معتبر نیست.' : 'This link is not valid.');
      const now = Date.now();
      // Consume atomically: only one request can flip used_at.
      const row = await db
        .prepare('UPDATE login_tokens SET used_at = ?1 WHERE token_hash = ?2 AND used_at IS NULL AND expires_at > ?1 RETURNING email')
        .bind(now, await sha256(token))
        .first<{ email: string }>();
      if (!row)
        return continuePage('', fa, fa ? 'این پیوند منقضی یا قبلاً استفاده شده است. دوباره درخواست ورود بدهید.' : 'This link expired or was already used. Ask for a new one.');
      let user = await db.prepare('SELECT id FROM users WHERE email = ?1').bind(row.email).first<{ id: string }>();
      if (!user) {
        const id = crypto.randomUUID();
        await db.prepare('INSERT INTO users (id, email, created_at) VALUES (?1, ?2, ?3)').bind(id, row.email, now).run();
        user = { id };
      }
      const raw = randomToken();
      await db
        .prepare('INSERT INTO sessions (id_hash, user_id, expires_at, created_at, last_seen) VALUES (?1, ?2, ?3, ?4, ?4)')
        .bind(await sha256(raw), user.id, now + SESSION_TTL, now)
        .run();
      return new Response(null, { status: 303, headers: { Location: '/?signed-in=1', 'Set-Cookie': cookie(raw, SESSION_TTL) } });
    }
  }

  // ── Session-scoped endpoints ──
  const s = await sessionUser(r, env, true);
  const withCookie = (res: Response) => {
    if (s?.setCookie) res.headers.append('Set-Cookie', s.setCookie);
    return res;
  };

  if (path === '/api/me' && r.method === 'GET') {
    if (!s) return json({ user: null }, 200);
    return withCookie(json({ user: { email: s.email } }));
  }

  if (!s) return json({ error: 'signed_out' }, 401);
  if (r.method !== 'GET' && !sameOrigin(r)) return json({ error: 'bad_origin' }, 403);

  if (path === '/api/auth/logout' && r.method === 'POST') {
    await db.prepare('DELETE FROM sessions WHERE id_hash = ?1').bind(s.hash).run();
    return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });
  }

  if (path === '/api/progress' && r.method === 'GET') {
    const row = await db.prepare('SELECT data, updated_at FROM progress WHERE user_id = ?1').bind(s.userId).first<{ data: string; updated_at: number }>();
    let data: Progress = sanitize(null);
    try {
      if (row) data = sanitize(JSON.parse(row.data));
    } catch {
      /* one corrupt row must not break sync: fall back to empty */
    }
    return withCookie(json({ progress: data, updatedAt: row?.updated_at ?? 0 }));
  }

  if (path === '/api/progress' && r.method === 'PUT') {
    const body = await r.json().catch(() => null);
    const incoming = sanitize((body as { progress?: unknown } | null)?.progress);
    const row = await db.prepare('SELECT data FROM progress WHERE user_id = ?1').bind(s.userId).first<{ data: string }>();
    let current = sanitize(null);
    try {
      if (row) current = sanitize(JSON.parse(row.data));
    } catch {
      /* fall back to empty */
    }
    const merged = merge(current, incoming);
    if (!row || !same(current, merged)) {
      const text = JSON.stringify(merged);
      if (text.length > 200_000) return json({ error: 'too_large' }, 413);
      await db
        .prepare('INSERT INTO progress (user_id, data, updated_at) VALUES (?1, ?2, ?3) ON CONFLICT(user_id) DO UPDATE SET data = ?2, updated_at = ?3')
        .bind(s.userId, text, Date.now())
        .run();
    }
    return withCookie(json({ progress: merged }));
  }

  if (path === '/api/account' && r.method === 'DELETE') {
    await db.batch([
      db.prepare('DELETE FROM progress WHERE user_id = ?1').bind(s.userId),
      db.prepare('DELETE FROM sessions WHERE user_id = ?1').bind(s.userId),
      db.prepare('DELETE FROM users WHERE id = ?1').bind(s.userId),
    ]);
    return json({ ok: true }, 200, { 'Set-Cookie': cookie('', 0) });
  }

  return json({ error: 'not_found' }, 404);
}
