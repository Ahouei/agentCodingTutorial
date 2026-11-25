import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useApp } from './app';
import { merge, sanitize, same, type Progress } from './progressMerge';

/**
 * Optional account (RD-10). Signed-out use is complete on its own; signing in only adds
 * progress sync across devices. Everything degrades silently if the API is unavailable.
 */
type Status = 'unknown' | 'unavailable' | 'signed-out' | 'signed-in';
type AccountState = {
  status: Status;
  email: string | null;
  /** 'admin' or 'owner' can open the admin panel (the server checks again on every request). */
  role: 'learner' | 'admin' | 'owner' | null;
  turnstileSiteKey: string | null;
  /** Bit can say AI lines (server says it's on); only meaningful when signed in. */
  bitAi: boolean;
  syncing: boolean;
  lastSync: number | null;
  justSignedIn: boolean;
  startSignIn: (email: string, turnstile: string) => Promise<'ok' | 'rate_limited' | 'turnstile_failed' | 'paused' | 'busy' | 'error'>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<boolean>;
  dismissWelcome: () => void;
};

const Ctx = createContext<AccountState | null>(null);
const H = { 'Content-Type': 'application/json' };

export function AccountProvider({ children }: { children: ReactNode }) {
  const app = useApp();
  const [status, setStatus] = useState<Status>('unknown');
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<AccountState['role']>(null);
  const [siteKey, setSiteKey] = useState<string | null>(null);
  const [bitAi, setBitAi] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<number | null>(null);
  const [justSignedIn, setJustSignedIn] = useState(false);
  const pulled = useRef(false);
  const lastPushed = useRef<Progress | null>(null);

  const local: Progress = { done: app.done, labs: app.labs, quizzes: app.quizzes, position: app.position };

  // Discover whether accounts exist and whether we're signed in.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const cfg = await fetch('/api/config').then((r) => (r.ok ? r.json() : null));
        if (!alive) return;
        if (!cfg?.accounts) return setStatus('unavailable');
        setSiteKey(cfg.turnstileSiteKey ?? null);
        setBitAi(cfg.bitAi === true);
        const me = await fetch('/api/me', { credentials: 'same-origin' }).then((r) => (r.ok ? r.json() : null));
        if (!alive) return;
        if (me?.user?.email) {
          setEmail(me.user.email);
          setRole(me.user.role === 'admin' || me.user.role === 'owner' ? me.user.role : 'learner');
          setStatus('signed-in');
        } else setStatus('signed-out');
      } catch {
        if (alive) setStatus('unavailable');
      }
    })();
    // Arriving from the email link.
    const u = new URL(location.href);
    if (u.searchParams.get('signed-in') === '1') {
      setJustSignedIn(true);
      u.searchParams.delete('signed-in');
      history.replaceState(history.state, '', u.pathname + u.search + u.hash);
    }
    return () => {
      alive = false;
    };
  }, []);

  // First sync after sign-in: pull, merge with this device, push the union.
  useEffect(() => {
    if (status !== 'signed-in' || pulled.current) return;
    pulled.current = true;
    (async () => {
      setSyncing(true);
      try {
        const res = await fetch('/api/progress', { credentials: 'same-origin' });
        if (!res.ok) return;
        const server = sanitize((await res.json()).progress);
        const merged = merge(server, sanitize(local));
        if (!same(merged, sanitize(local))) app.replaceProgress(merged);
        if (!same(merged, server)) await push(merged);
        lastPushed.current = merged;
        setLastSync(Date.now());
      } finally {
        setSyncing(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const push = async (p: Progress) => {
    const r = await fetch('/api/progress', { method: 'PUT', headers: H, credentials: 'same-origin', body: JSON.stringify({ progress: p }) });
    if (r.status === 401) {
      setStatus('signed-out');
      setEmail(null);
    }
    return r.ok;
  };

  // Ongoing sync: push local changes after a short pause (one write per pause).
  useEffect(() => {
    if (status !== 'signed-in' || !pulled.current || !lastPushed.current) return;
    const current = sanitize(local);
    if (same(current, lastPushed.current)) return;
    const t = window.setTimeout(async () => {
      setSyncing(true);
      try {
        if (await push(current)) {
          lastPushed.current = current;
          setLastSync(Date.now());
        }
      } finally {
        setSyncing(false);
      }
    }, 2000);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, app.done, app.labs, app.quizzes, app.position]);

  const startSignIn = useCallback(
    async (mail: string, turnstile: string) => {
      try {
        const r = await fetch('/api/auth/start', { method: 'POST', headers: H, body: JSON.stringify({ email: mail, turnstile, lang: app.lang }) });
        if (r.ok) return 'ok' as const;
        const j = await r.json().catch(() => ({}));
        if (j.error === 'rate_limited') return 'rate_limited' as const;
        if (j.error === 'turnstile_failed') return 'turnstile_failed' as const;
        if (j.error === 'signin_paused') return 'paused' as const;
        if (j.error === 'busy') return 'busy' as const;
        return 'error' as const;
      } catch {
        return 'error' as const;
      }
    },
    [app.lang],
  );

  const signOut = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', headers: H, credentials: 'same-origin', body: '{}' }).catch(() => {});
    setStatus('signed-out');
    setEmail(null);
    pulled.current = false;
    lastPushed.current = null;
  }, []);

  const deleteAccount = useCallback(async () => {
    const r = await fetch('/api/account', { method: 'DELETE', headers: H, credentials: 'same-origin' }).catch(() => null);
    if (r?.ok) {
      setStatus('signed-out');
      setEmail(null);
      pulled.current = false;
      lastPushed.current = null;
      return true;
    }
    return false;
  }, []);

  return (
    <Ctx.Provider
      value={{
        status,
        email,
        role: status === 'signed-in' ? role : null,
        turnstileSiteKey: siteKey,
        bitAi: status === 'signed-in' && bitAi,
        syncing,
        lastSync,
        justSignedIn,
        startSignIn,
        signOut,
        deleteAccount,
        dismissWelcome: () => setJustSignedIn(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAccount() {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAccount outside AccountProvider');
  return c;
}
