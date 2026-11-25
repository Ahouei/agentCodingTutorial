import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useApp } from '../lib/app';
import { EASE_OUT } from '../lib/motion';
import { readStore, writeStore } from '../lib/storage';
import { Rich } from './blocks/Rich';
import './announcement.css';

export type AnnouncementData = {
  id: string;
  tone: 'info' | 'celebrate' | 'warn' | string;
  title_fa: string;
  title_en: string;
  body_fa: string;
  body_en: string;
  link: string;
};

/**
 * The one banner learners see. The admin panel's preview renders this same component,
 * so what the admin approves is exactly what learners get (admin-panel-design §2).
 */
export function AnnouncementBanner({ a, onDismiss, preview, lang: forced }: { a: AnnouncementData; onDismiss?: () => void; preview?: boolean; lang?: 'fa' | 'en' }) {
  const app = useApp();
  const lang = forced ?? app.lang;
  const tx = (fa: string, en: string) => (lang === 'fa' ? fa : en);
  const title = lang === 'fa' ? a.title_fa : a.title_en;
  const body = lang === 'fa' ? a.body_fa : a.body_en;
  const external = /^https:/.test(a.link);
  return (
    <div className={`ann ann--${a.tone}`} lang={forced} dir={forced ? (forced === 'fa' ? 'rtl' : 'ltr') : undefined} role={preview ? undefined : 'region'} aria-label={preview ? undefined : tx('اطلاعیه', 'Announcement')}>
      <span className="ann-icon" aria-hidden>
        {a.tone === 'celebrate' ? '🎉' : a.tone === 'warn' ? '⚠️' : '📣'}
      </span>
      <div className="ann-text">
        <strong>
          <Rich text={title} />
        </strong>
        {body && (
          <span>
            <Rich text={body} />
          </span>
        )}
      </div>
      {a.link && (
        <a className="ann-link" href={a.link} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} tabIndex={preview ? -1 : undefined}>
          {tx('ببینید', 'Open')}
          <span aria-hidden>{lang === 'fa' ? '←' : '→'}</span>
        </a>
      )}
      {onDismiss && (
        <button type="button" className="ann-close" onClick={onDismiss} aria-label={tx('بستن اطلاعیه', 'Dismiss announcement')} tabIndex={preview ? -1 : undefined}>
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}

const DISMISSED = 'zth:ann-dismissed';

/** Fetches the published announcement (if any) and shows it until the learner dismisses it. */
export function SiteAnnouncement() {
  const [a, setA] = useState<AnnouncementData | null>(null);
  const [dismissed, setDismissed] = useState<string>(() => readStore(DISMISSED, ''));
  useEffect(() => {
    let alive = true;
    fetch('/api/announcement')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (alive && j?.announcement?.id) setA(j.announcement as AnnouncementData);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  const show = a && a.id !== dismissed;
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          className="ann-wrap wrap"
          initial={{ opacity: 0, transform: 'translateY(-6px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px)' }}
          exit={{ opacity: 0, transform: 'translateY(-6px)' }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          <AnnouncementBanner
            a={a}
            onDismiss={() => {
              setDismissed(a.id);
              writeStore(DISMISSED, a.id);
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
