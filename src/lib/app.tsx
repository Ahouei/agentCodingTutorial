import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L } from '../content/types';

export type Lang = 'fa' | 'en';
export type Theme = 'system' | 'light' | 'dark';

/* Browser storage can be missing or throw (private mode, blocked site data).
   Every read and write is guarded; the app works the same without it. */
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  cycleTheme: () => void;
  t: (l: L) => string;
  done: Record<string, true>;
  toggleDone: (slug: string, value?: boolean) => void;
  /** Per-widget scratch state, e.g. checklist ticks. */
  saved: <T>(key: string, fallback: T) => T;
  save: (key: string, value: unknown) => void;
};

const Ctx = createContext<AppState | null>(null);

function initialLang(): Lang {
  const stored = read<Lang | null>('act:lang', null);
  if (stored === 'fa' || stored === 'en') return stored;
  return 'fa';
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [theme, setTheme] = useState<Theme>(() => read<Theme>('act:theme', 'system'));
  const [done, setDone] = useState<Record<string, true>>(() => read('act:done', {}));

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.title =
      lang === 'fa'
        ? 'از صفر تا قهرمان: ساخت وب‌سایت با Agentic AI'
        : 'Zero to Hero: build websites with agentic AI';
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write('act:lang', l);
  }, []);

  const cycleTheme = useCallback(() => {
    setTheme((prev) => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Two-state toggle from the user's point of view: flip what they currently see.
      const showingDark = prev === 'dark' || (prev === 'system' && systemDark);
      const next: Theme = showingDark ? 'light' : 'dark';
      write('act:theme', next);
      return next;
    });
  }, []);

  const toggleDone = useCallback((slug: string, value?: boolean) => {
    setDone((prev) => {
      const next = { ...prev };
      const on = value ?? !prev[slug];
      if (on) next[slug] = true;
      else delete next[slug];
      write('act:done', next);
      return next;
    });
  }, []);

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang,
      theme,
      cycleTheme,
      t: (l: L) => l[lang],
      done,
      toggleDone,
      saved: (key, fallback) => read(`act:w:${key}`, fallback),
      save: (key, v) => write(`act:w:${key}`, v),
    }),
    [lang, setLang, theme, cycleTheme, done, toggleDone],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp outside AppProvider');
  return ctx;
}

/** Inline bilingual helper for UI strings: tx('فارسی', 'English'). */
export function useTx() {
  const { lang } = useApp();
  return (fa: string, en: string) => (lang === 'fa' ? fa : en);
}

/** Persian digits for Persian UI. */
export function num(n: number | string, lang: Lang) {
  if (lang === 'en') return String(n);
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}

/* ───────── Tiny hash router: #/  and  #/c/<slug>(#section) ───────── */
export type Route = { name: 'home' } | { name: 'chapter'; slug: string; section?: string };

function parse(hash: string): Route {
  const m = hash.match(/^#\/c\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?/);
  if (m) return { name: 'chapter', slug: m[1], section: m[2] };
  return { name: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const on = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

export const href = {
  home: '#/',
  chapter: (slug: string, section?: string) => `#/c/${slug}${section ? `/${section}` : ''}`,
};
