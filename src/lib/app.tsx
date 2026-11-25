import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { L } from '../content/types';
import { isRecord, isTrueMap, readStore, writeStore } from './storage';

export { href, useRoute, navigate } from './router';
export type { Route } from './router';

export type Lang = 'fa' | 'en';
export type Theme = 'system' | 'light' | 'dark';
export type Palette = 'candy' | 'kashi';
export type BuildPath = 'codex' | 'lovable';

export type QuizRecord = { picked: number; correct: boolean };
export type Position = { slug: string; section?: string; at: number };

const isLang = (v: unknown): v is Lang => v === 'fa' || v === 'en';
const isTheme = (v: unknown): v is Theme => v === 'system' || v === 'light' || v === 'dark';
const isPalette = (v: unknown): v is Palette => v === 'candy' || v === 'kashi';
const isPath = (v: unknown): v is BuildPath => v === 'codex' || v === 'lovable';
const isQuizMap = (v: unknown): v is Record<string, QuizRecord> =>
  isRecord(v) &&
  Object.values(v).every((q) => isRecord(q) && typeof q.picked === 'number' && typeof q.correct === 'boolean');
const isPosition = (v: unknown): v is Position | null =>
  v === null || (isRecord(v) && typeof v.slug === 'string' && typeof v.at === 'number' && (v.section === undefined || typeof v.section === 'string'));

export type Progress = {
  done: Record<string, true>;
  labs: Record<string, true>;
  quizzes: Record<string, QuizRecord>;
  position: Position | null;
};

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  cycleTheme: () => void;
  palette: Palette;
  setPalette: (p: Palette) => void;
  path: BuildPath;
  setPath: (p: BuildPath) => void;
  t: (l: L) => string;
  done: Record<string, true>;
  toggleDone: (slug: string, value?: boolean) => void;
  labs: Record<string, true>;
  completeLab: (id: string) => void;
  quizzes: Record<string, QuizRecord>;
  answerQuiz: (key: string, rec: QuizRecord) => void;
  position: Position | null;
  setPosition: (slug: string, section?: string) => void;
  /** Replace all progress at once (account sync). */
  replaceProgress: (p: Progress) => void;
  /** Per-widget scratch state (drafts, ticks). Shape-checked against the fallback. */
  saved: <T>(key: string, fallback: T) => T;
  save: (key: string, value: unknown) => void;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => readStore<Lang>('act:lang', 'fa', isLang));
  const [theme, setTheme] = useState<Theme>(() => readStore<Theme>('act:theme', 'system', isTheme));
  const [palette, setPaletteState] = useState<Palette>(() => readStore<Palette>('act:palette', 'candy', isPalette));
  const [path, setPathState] = useState<BuildPath>(() => readStore<BuildPath>('act:path', 'codex', isPath));
  const [done, setDone] = useState<Record<string, true>>(() => readStore('act:done', {}, isTrueMap));
  const [labs, setLabs] = useState<Record<string, true>>(() => readStore('act:labs', {}, isTrueMap));
  const [quizzes, setQuizzes] = useState<Record<string, QuizRecord>>(() => readStore('act:quizzes', {}, isQuizMap));
  const [position, setPositionState] = useState<Position | null>(() => readStore<Position | null>('act:position', null, isPosition));

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'fa' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-palette', palette);
  }, [palette]);

  // Persist after state settles (no side effects inside state updaters).
  useEffect(() => writeStore('act:done', done), [done]);
  useEffect(() => writeStore('act:labs', labs), [labs]);
  useEffect(() => writeStore('act:quizzes', quizzes), [quizzes]);
  useEffect(() => writeStore('act:position', position), [position]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    writeStore('act:lang', l);
  }, []);

  const cycleTheme = useCallback(() => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const showingDark = theme === 'dark' || (theme === 'system' && systemDark);
    const next: Theme = showingDark ? 'light' : 'dark';
    setTheme(next);
    writeStore('act:theme', next);
  }, [theme]);

  const setPalette = useCallback((p: Palette) => {
    setPaletteState(p);
    writeStore('act:palette', p);
  }, []);

  const setPath = useCallback((p: BuildPath) => {
    setPathState(p);
    writeStore('act:path', p);
  }, []);

  const toggleDone = useCallback((slug: string, value?: boolean) => {
    setDone((prev) => {
      const on = value ?? !prev[slug];
      if (!!prev[slug] === on) return prev;
      const next = { ...prev };
      if (on) next[slug] = true;
      else delete next[slug];
      return next;
    });
  }, []);

  const completeLab = useCallback((id: string) => {
    setLabs((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  }, []);

  const answerQuiz = useCallback((key: string, rec: QuizRecord) => {
    setQuizzes((prev) => ({ ...prev, [key]: rec }));
  }, []);

  const setPosition = useCallback((slug: string, section?: string) => {
    setPositionState((prev) =>
      prev && prev.slug === slug && prev.section === section ? prev : { slug, section, at: Date.now() },
    );
  }, []);

  const replaceProgress = useCallback((p: Progress) => {
    setDone(p.done);
    setLabs(p.labs);
    setQuizzes(p.quizzes);
    setPositionState(p.position);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      lang,
      setLang,
      theme,
      cycleTheme,
      palette,
      setPalette,
      path,
      setPath,
      t: (l: L) => l[lang],
      done,
      toggleDone,
      labs,
      completeLab,
      quizzes,
      answerQuiz,
      position,
      setPosition,
      replaceProgress,
      saved: (key, fallback) => readStore(`act:w:${key}`, fallback),
      save: (key, v) => writeStore(`act:w:${key}`, v),
    }),
    [lang, setLang, theme, cycleTheme, palette, setPalette, path, setPath, done, toggleDone, labs, completeLab, quizzes, answerQuiz, position, setPosition, replaceProgress],
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
