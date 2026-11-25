import { motion, useScroll, useSpring } from 'motion/react';
import { CHAPTERS } from '../content';
import { href, num, useApp, useTx } from '../lib/app';
import { Mascot } from './Mascot';
import './shell.css';

export function Header() {
  const { lang, setLang, cycleTheme, done } = useApp();
  const tx = useTx();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 });
  const total = CHAPTERS.length;
  const count = CHAPTERS.filter((c) => done[c.slug]).length;

  return (
    <header className="hd">
      <div className="hd-inner wrap">
        <a className="hd-brand" href={href.home} aria-label={tx('صفحه اصلی', 'Home')}>
          <span className="hd-logo" aria-hidden>
            <Mascot size={34} mood="happy" follow={false} />
          </span>
          <span className="hd-name">
            <strong>{tx('از صفر تا قهرمان', 'Zero to Hero')}</strong>
            <span>{tx('ساخت وب با Agentic AI', 'Build the web with agentic AI')}</span>
          </span>
        </a>

        <div className="hd-actions">
          <a className="hd-progress" href={`${href.home}`} onClick={() => sessionStorageSafeSet('scroll-to', 'map')}>
            <ProgressRing value={total ? count / total : 0} />
            <span>
              {num(count, lang)}/{num(total, lang)}
            </span>
            <span className="sr-only">{tx('فصل تمام‌شده', 'chapters done')}</span>
          </a>
          <button
            type="button"
            className="hd-icon"
            onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
            aria-label={tx('Switch to English', 'تغییر زبان به فارسی')}
            lang={lang === 'fa' ? 'en' : 'fa'}
          >
            {lang === 'fa' ? 'EN' : 'فا'}
          </button>
          <button type="button" className="hd-icon" onClick={cycleTheme} aria-label={tx('تغییر حالت روشن و تیره', 'Toggle light and dark')}>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="hd-sun">
              <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              <path
                d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden className="hd-moon">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <motion.div className="hd-bar" style={{ scaleX: progress }} aria-hidden />
    </header>
  );
}

function sessionStorageSafeSet(k: string, v: string) {
  try {
    sessionStorage.setItem(k, v);
  } catch {
    /* ignore */
  }
}

export function ProgressRing({ value, size = 26 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth="4" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--mint-ink)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={false}
        animate={{ strokeDashoffset: c * (1 - value) }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  );
}
