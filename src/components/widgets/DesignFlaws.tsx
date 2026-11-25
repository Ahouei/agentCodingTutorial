import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { L } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * RD-07B · "Find 5 design flaws". A mock Café Sahar landing page with five planted
 * problems an agent's first draft often has. Tapping a flaw wipes in the fixed version
 * (clip-path reveal) and explains why.
 */

type FlawId = 'gradient' | 'lorem' | 'contrast' | 'tiny' | 'ltr';
const ORDER: FlawId[] = ['gradient', 'lorem', 'contrast', 'tiny', 'ltr'];

const INFO: Record<FlawId, { title: L; why: L }> = {
  gradient: {
    title: { fa: 'گرادیان بنفش به آبی', en: 'Purple-to-blue gradient' },
    why: {
      fa: 'رایج‌ترین امضای طراحی «ساخت هوش مصنوعی». کافه سحر رنگ‌های گرم و خودش را دارد؛ از Agent بخواهید رنگ‌ها را از هویت کسب‌وکار بگیرد.',
      en: "The most common sign of an AI-made design. Café Sahar has its own warm colors; ask the agent to take colors from the business's identity.",
    },
  },
  lorem: {
    title: { fa: 'متن Lorem ipsum', en: 'Lorem ipsum text' },
    why: {
      fa: 'متن نمونه نمی‌گذارد طراحی را واقعاً بسنجید. همیشه متن واقعی کافه (منو، ساعت کاری، رزرو) را به Agent بدهید.',
      en: "Placeholder text hides whether the design really works. Always give the agent the café's real text (menu, hours, booking).",
    },
  },
  contrast: {
    title: { fa: 'متن کم‌رنگ و ناخوانا', en: 'Faint, hard-to-read text' },
    why: {
      fa: 'نسبت کنتراست حدود 2.8:1 است؛ متن معمولی باید دست‌کم 4.5:1 باشد. زیر نور آفتاب روی گوشی، این متن تقریباً دیده نمی‌شود.',
      en: 'The contrast ratio is about 2.8:1; normal text needs at least 4.5:1. On a phone in sunlight it nearly disappears.',
    },
  },
  tiny: {
    title: { fa: 'دکمه خیلی کوچک', en: 'A tiny button' },
    why: {
      fa: 'دکمه ۳۰ پیکسلی برای انگشت کوچک است. اهداف لمسی باید دست‌کم ۴۴ پیکسل باشند، مخصوصاً مهم‌ترین دکمه یعنی «رزرو میز».',
      en: 'A 30px button is too small for a finger. Touch targets should be at least 44px, especially the most important one, "Book a table".',
    },
  },
  ltr: {
    title: { fa: 'متن فارسی چپ‌چین', en: 'Persian text laid out left-to-right' },
    why: {
      fa: 'وقتی جهت متن فارسی LTR باشد، علامت‌ها و اعداد جابه‌جا می‌شوند. در AGENTS.md بنویسید: dir="rtl" و CSS منطقی.',
      en: 'When Persian text runs LTR, punctuation and numbers jump around. Put dir="rtl" and logical CSS in AGENTS.md.',
    },
  },
};

/** A tappable flaw that wipes in its fix once found. Defined outside the lab so it keeps its identity across renders. */
function Spot({
  id,
  bad,
  good,
  found,
  hinted,
  rtl,
  reduce,
  onHit,
}: {
  id: FlawId;
  bad: ReactNode;
  good: ReactNode;
  found: FlawId[];
  hinted: FlawId | null;
  rtl: boolean;
  reduce: boolean;
  onHit: (id: FlawId) => void;
}) {
  const isFound = found.includes(id);
  const title = INFO[id].title;
  return (
    <button
      type="button"
      className={`df-spot ${hinted === id ? 'is-hinted' : ''}`}
      onClick={() => onHit(id)}
      aria-label={isFound ? (rtl ? `اصلاح شد: ${title.fa}` : `Fixed: ${title.en}`) : rtl ? 'بررسی این بخش' : 'Check this part'}
      aria-pressed={isFound}
    >
      {isFound ? (
        <motion.span
          className="df-layer"
          style={{ display: 'block' }}
          initial={reduce ? false : { clipPath: rtl ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: 0.4, ease: EASE_IN_OUT }}
        >
          {good}
        </motion.span>
      ) : (
        <span className="df-layer">{bad}</span>
      )}
    </button>
  );
}

export default function DesignFlaws() {
  const { t, lang } = useApp();
  const tx = useTx();
  const lab = useLab();
  const reduce = useReducedMotion();
  const [found, setFound] = useState<FlawId[]>([]);
  const [hinted, setHinted] = useState<FlawId | null>(null);
  const hintTimer = useRef<number>(0);
  const rtl = lang === 'fa';

  const markDone = lab.complete;
  useEffect(() => {
    if (found.length === ORDER.length) markDone();
  }, [found.length, markDone]);
  useEffect(() => () => window.clearTimeout(hintTimer.current), []);

  const hit = (id: FlawId) => {
    setFound((f) => (f.includes(id) ? f : [...f, id]));
    if (hinted === id) setHinted(null);
  };
  const hint = () => {
    const next = ORDER.find((id) => !found.includes(id));
    if (!next) return;
    setHinted(next);
    window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHinted(null), 1800);
  };

  const all = found.length === ORDER.length;
  const sp = { found, hinted, rtl, reduce: !!reduce, onHit: hit };

  return (
    <Frame
      title={tx('۵ ایراد را پیدا کنید', 'Find the 5 flaws')}
      goal={tx('روی هر ایراد در صفحه بزنید', 'Tap each flaw on the page')}
      tint="var(--blush-soft)"
      mood={all ? 'happy' : 'think'}
      hint={tx(
        'این اولین پیش‌نویس Agent برای صفحه کافه سحر است. پنج ایراد رایج در آن هست؛ پیدایشان کنید.',
        "This is the agent's first draft of Café Sahar's page. It has five common flaws; find them.",
      )}
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setFound([])} disabled={found.length === 0}>
            {tx('از اول', 'Start over')}
          </button>
          <button type="button" className="btn btn--small btn--butter" onClick={hint} disabled={all}>
            {tx('راهنمایی', 'Hint')}
          </button>
        </>
      }
    >
      <div className="df-wrap s4">
        <div className="df-phone" aria-label={tx('پیش‌نمایش صفحه کافه سحر', "Preview of Café Sahar's page")} role="group">
          <div className="df-phone-top" aria-hidden />
          <div className="df-page">
            <Spot
              {...sp}
              id="gradient"
              bad={
                <span className="df-hero-bad" style={{ display: 'block', borderRadius: 12 }}>
                  کافه سحر
                  <small>بهترین قهوه شهر</small>
                </span>
              }
              good={
                <span className="df-hero-good" style={{ display: 'block', borderRadius: 12 }}>
                  کافه سحر
                  <small>قهوه تازه، هر روز از ۸ صبح</small>
                </span>
              }
            />
            <Spot
              {...sp}
              id="lorem"
              bad={<span className="df-text df-lorem" style={{ display: 'block' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</span>}
              good={<span className="df-text" style={{ display: 'block' }}>منوی امروز: اسپرسو، لاته زعفرانی و کیک خانگی. برای عصرها میز رزرو کنید.</span>}
            />
            <Spot
              {...sp}
              id="contrast"
              bad={<span className="df-text df-lowc" style={{ display: 'block' }}>نشانی: خیابان ولیعصر، کوچه گلستان، پلاک ۱۲</span>}
              good={<span className="df-text df-goodc" style={{ display: 'block' }}>نشانی: خیابان ولیعصر، کوچه گلستان، پلاک ۱۲</span>}
            />
            <Spot
              {...sp}
              id="tiny"
              bad={
                <span className="df-cta-row">
                  <span className="df-tiny">رزرو</span>
                  <span>جای دنج کنار پنجره</span>
                </span>
              }
              good={
                <span className="df-cta-row">
                  <span className="df-big">رزرو میز</span>
                  <span>جای دنج کنار پنجره</span>
                </span>
              }
            />
            <Spot
              {...sp}
              id="ltr"
              bad={<span className="df-text df-ltr" style={{ display: 'block' }}>ساعت کاری: ۸ تا ۲۳ (جمعه‌ها: ۱۰ تا ۲۳).</span>}
              good={<span className="df-text" style={{ display: 'block', direction: 'rtl', textAlign: 'right' }}>ساعت کاری: ۸ تا ۲۳ (جمعه‌ها: ۱۰ تا ۲۳).</span>}
            />
          </div>
        </div>

        <div className="df-side">
          <div className="df-count" aria-live="polite">
            <span>
              {tx(`${num(found.length, lang)} از ۵ پیدا شد`, `${found.length} of 5 found`)}
            </span>
            <span className="df-dots" aria-hidden>
              {ORDER.map((_, i) => (
                <i key={i} className={i < found.length ? 'on' : ''} />
              ))}
            </span>
          </div>
          <ul className="df-found">
            <AnimatePresence initial={false}>
              {found.map((id) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, transform: 'translateY(6px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <b>{t(INFO[id].title)}</b>
                  {t(INFO[id].why)}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
          {all && (
            <p className="w-card" style={{ margin: 0 }}>
              {tx(
                'آفرین! حالا این پنج مورد را به فهرست بازبینی طراحی خودتان اضافه کنید و پیش از تأیید هر طرح، دنبالشان بگردید.',
                'Well done! Add these five to your own design review checklist and look for them before approving any design.',
              )}
            </p>
          )}
        </div>
      </div>
    </Frame>
  );
}
