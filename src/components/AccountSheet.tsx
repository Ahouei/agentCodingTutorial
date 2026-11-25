import { useEffect, useId, useRef, useState } from 'react';
import { useAccount } from '../lib/account';
import { num, useApp, useTx } from '../lib/app';
import { BottomSheet } from './BottomSheet';
import { Mascot } from './Mascot';
import './account.css';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

let turnstileLoading: Promise<void> | null = null;
function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (!turnstileLoading)
    turnstileLoading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        turnstileLoading = null;
        reject(new Error('turnstile'));
      };
      document.head.appendChild(s);
    });
  return turnstileLoading;
}

/** Sign-in and account sheet (RD-10). Signing in is optional; it only adds sync. */
export function AccountSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const acc = useAccount();
  const { lang, done } = useApp();
  const tx = useTx();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [state, setState] = useState<'form' | 'sending' | 'sent' | 'error' | 'rate' | 'bot'>('form');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const emailId = useId();

  useEffect(() => {
    if (!open || acc.status !== 'signed-out' || !acc.turnstileSiteKey || state === 'sent') return;
    let alive = true;
    loadTurnstile()
      .then(() => {
        if (!alive || !box.current || !window.turnstile || widget.current) return;
        widget.current = window.turnstile.render(box.current, {
          sitekey: acc.turnstileSiteKey,
          language: lang,
          theme: 'auto',
          callback: (t: string) => setToken(t),
          'expired-callback': () => setToken(null),
          'error-callback': () => setToken(null),
        });
      })
      .catch(() => alive && setState('bot'));
    return () => {
      alive = false;
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
      setToken(null);
    };
  }, [open, acc.status, acc.turnstileSiteKey, lang, state]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !email.trim()) return;
    setState('sending');
    const r = await acc.startSignIn(email.trim(), token);
    setState(r === 'ok' ? 'sent' : r === 'rate_limited' ? 'rate' : r === 'turnstile_failed' ? 'bot' : 'error');
    if (r !== 'ok' && widget.current && window.turnstile) window.turnstile.reset(widget.current);
  };

  const doneCount = Object.keys(done).length;

  return (
    <BottomSheet open={open} onClose={onClose} modal title={acc.status === 'signed-in' ? tx('حساب شما', 'Your account') : tx('ورود (اختیاری)', 'Sign in (optional)')}>
      {acc.status === 'signed-in' ? (
        <div className="acc">
          <p className="acc-lead">
            {tx('وارد شده‌اید با', 'Signed in as')} <b className="ltr">{acc.email}</b>
          </p>
          <p className="acc-sync" aria-live="polite">
            {acc.syncing
              ? tx('در حال همگام‌سازی پیشرفت…', 'Syncing your progress…')
              : tx(`پیشرفت شما (${num(doneCount, lang)} فصل) روی همه دستگاه‌ها یکی است.`, `Your progress (${doneCount} chapters) is the same on all your devices.`)}
          </p>
          <div className="acc-row">
            <button type="button" className="btn btn--small" onClick={() => acc.signOut()}>
              {tx('خروج', 'Sign out')}
            </button>
            {!confirmDelete ? (
              <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirmDelete(true)}>
                {tx('حذف حساب', 'Delete account')}
              </button>
            ) : (
              <span className="acc-confirm">
                {tx('حساب و پیشرفت ذخیره‌شده روی سرور پاک شود؟', 'Delete the account and the progress stored on the server?')}{' '}
                <button type="button" className="btn btn--small" onClick={() => acc.deleteAccount().then(() => setConfirmDelete(false))}>
                  {tx('بله، حذف کن', 'Yes, delete')}
                </button>{' '}
                <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirmDelete(false)}>
                  {tx('نه', 'No')}
                </button>
              </span>
            )}
          </div>
        </div>
      ) : state === 'sent' ? (
        <div className="acc acc-sent">
          <Mascot size={70} mood="happy" follow={false} />
          <div>
            <p className="acc-lead">{tx('ایمیلتان را ببینید.', 'Check your email.')}</p>
            <p>
              {tx(
                'اگر این آدرس درست باشد، یک پیوند ورود برایتان فرستادیم. پیوند ۱۵ دقیقه معتبر است و فقط یک بار کار می‌کند. پوشه Spam را هم نگاه کنید.',
                'If the address is right, we sent you a sign-in link. It works once and expires in 15 minutes. Check your spam folder too.',
              )}
            </p>
            <button type="button" className="btn btn--small btn--ghost" onClick={() => setState('form')}>
              {tx('ارسال دوباره یا ایمیل دیگر', 'Resend or use another email')}
            </button>
          </div>
        </div>
      ) : (
        <form className="acc" onSubmit={submit}>
          <p className="acc-lead">
            {tx(
              'بدون ورود هم همه دوره در دسترس است. با ورود، پیشرفت و جایی که خواندید روی همه دستگاه‌هایتان یکی می‌شود.',
              "The whole course works without signing in. Signing in keeps your progress and reading position the same on all your devices.",
            )}
          </p>
          <label className="acc-label" htmlFor={emailId}>
            {tx('ایمیل', 'Email')}
          </label>
          <input
            id={emailId}
            className="acc-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
          <div ref={box} className="acc-turnstile" />
          {state === 'error' && <p className="acc-err">{tx('چیزی درست کار نکرد. کمی بعد دوباره امتحان کنید.', 'Something went wrong. Try again in a moment.')}</p>}
          {state === 'rate' && <p className="acc-err">{tx('درخواست‌ها زیاد شد. یک دقیقه صبر کنید.', 'Too many requests. Wait a minute.')}</p>}
          {state === 'bot' && <p className="acc-err">{tx('بررسی امنیتی کامل نشد. صفحه را تازه کنید و دوباره امتحان کنید.', "The security check didn't complete. Reload and try again.")}</p>}
          <button type="submit" className="btn btn--primary" disabled={!token || !email.trim() || state === 'sending'}>
            {state === 'sending' ? tx('در حال ارسال…', 'Sending…') : tx('پیوند ورود را بفرست', 'Email me a sign-in link')}
          </button>
          <p className="acc-fine">{tx('رمز عبوری در کار نیست. ایمیل شما فقط برای ورود استفاده می‌شود.', 'No password. Your email is used only to sign you in.')}</p>
        </form>
      )}
    </BottomSheet>
  );
}
