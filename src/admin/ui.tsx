/** Small shared pieces for the admin panel: formatting, stat tiles, bars, status chips. */
import type { ReactNode } from 'react';
import { num, useApp } from '../lib/app';

export function useFmt() {
  const { lang } = useApp();
  const locale = lang === 'fa' ? 'fa-IR' : 'en-GB';
  const n = (v: number) => num(v.toLocaleString('en-US'), lang);
  const pct = (part: number, whole: number) => (whole ? `${num(Math.round((part / whole) * 100), lang)}${lang === 'fa' ? '٪' : '%'}` : '—');
  const date = (t: number | null | undefined) =>
    t ? new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(t) : '—';
  const dateTime = (t: number | null | undefined) =>
    t ? new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(t) : '—';
  const rel = (t: number | null | undefined) => {
    if (!t) return '—';
    const s = Math.round((t - Date.now()) / 1000);
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const a = Math.abs(s);
    if (a < 60) return rtf.format(Math.round(s), 'second');
    if (a < 3600) return rtf.format(Math.round(s / 60), 'minute');
    if (a < 86400) return rtf.format(Math.round(s / 3600), 'hour');
    if (a < 86400 * 45) return rtf.format(Math.round(s / 86400), 'day');
    return date(t);
  };
  return { n, pct, date, dateTime, rel, lang };
}

export function Stat({ label, value, sub, tone }: { label: string; value: ReactNode; sub?: ReactNode; tone?: 'coral' | 'mint' | 'sky' | 'butter' }) {
  return (
    <div className={`adm-stat ${tone ? `adm-stat--${tone}` : ''}`}>
      <span className="adm-stat-label">{label}</span>
      <b className="adm-stat-value">{value}</b>
      {sub && <span className="adm-stat-sub">{sub}</span>}
    </div>
  );
}

/** A horizontal bar for in-table comparisons. value is 0..1. */
export function Bar({ value, tone = 'mint' }: { value: number; tone?: 'mint' | 'coral' | 'butter' | 'sky' }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <span className={`adm-bar adm-bar--${tone}`} aria-hidden>
      <span style={{ transform: `scaleX(${v})` }} />
    </span>
  );
}

export function Chip({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'mint' | 'coral' | 'butter' | 'sky' }) {
  return <span className={`adm-chip adm-chip--${tone}`}>{children}</span>;
}

export function Section({ title, sub, actions, children }: { title: string; sub?: string; actions?: ReactNode; children: ReactNode }) {
  return (
    <section className="adm-card">
      <header className="adm-card-head">
        <div>
          <h2>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
        {actions && <div className="adm-card-actions">{actions}</div>}
      </header>
      {children}
    </section>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="adm-empty">{children}</p>;
}

export function Loading() {
  const { lang } = useApp();
  return (
    <p className="adm-empty" aria-live="polite">
      {lang === 'fa' ? 'در حال بارگیری…' : 'Loading…'}
    </p>
  );
}

export function ErrorNote({ error, retry }: { error: unknown; retry?: () => void }) {
  const { lang } = useApp();
  return (
    <p className="adm-error" role="alert">
      {lang === 'fa' ? 'بارگیری انجام نشد' : 'Could not load'} ({String((error as Error)?.message ?? error)}).{' '}
      {retry && (
        <button type="button" className="adm-link" onClick={retry}>
          {lang === 'fa' ? 'دوباره' : 'Retry'}
        </button>
      )}
    </p>
  );
}
