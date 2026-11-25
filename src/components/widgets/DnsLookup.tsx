import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { Frame } from './Frame';
import './set1.css';

const TTL = 300;
const IP = '203.0.113.42';

type Hop = {
  from: { fa: string; en: string; tint: string };
  to: { fa: string; en: string; tint: string };
  q: { fa: string; en: string };
  a: { fa: string; en: string };
  why: { fa: string; en: string };
};

const BROWSER = { fa: 'مرورگر شما', en: 'Your browser', tint: 'var(--sky)' };
const RESOLVER = { fa: 'Resolver', en: 'Resolver', tint: 'var(--butter)' };
const ROOT = { fa: 'Root Server (.)', en: 'Root server (.)', tint: 'var(--blush)' };
const TLD = { fa: 'TLD Server (.com)', en: 'TLD server (.com)', tint: 'var(--mint)' };
const AUTH = { fa: 'Nameserver اصلی (Cloudflare)', en: 'Authoritative NS (Cloudflare)', tint: 'var(--coral)' };

const HOPS: Hop[] = [
  {
    from: BROWSER,
    to: RESOLVER,
    q: { fa: 'IP آدرس www.example.com چیست؟', en: 'What is the IP of www.example.com?' },
    a: { fa: 'صبر کن، می‌پرسم…', en: "Hold on, I'll find out…" },
    why: {
      fa: 'Resolver معمولاً مال اینترنت‌دهنده شماست (یا سرویسی مثل 1.1.1.1). کارش این است که به‌جای شما بگردد.',
      en: 'The resolver usually belongs to your internet provider (or a service like 1.1.1.1). Its job is to do the searching for you.',
    },
  },
  {
    from: RESOLVER,
    to: ROOT,
    q: { fa: 'چه کسی مسئول .com است؟', en: 'Who is in charge of .com?' },
    a: { fa: 'برو سراغ سرورهای .com', en: 'Go ask the .com servers.' },
    why: {
      fa: 'Root جواب نهایی را نمی‌داند؛ فقط می‌داند هر پسوند (TLD) دست کیست. مثل تابلوی ورودی یک ساختمان بزرگ.',
      en: 'The root does not know the final answer; it only knows who runs each ending (TLD). Like the directory board in a big building lobby.',
    },
  },
  {
    from: RESOLVER,
    to: TLD,
    q: { fa: 'Nameserverهای example.com کدام‌اند؟', en: 'Which nameservers handle example.com?' },
    a: { fa: 'ada.ns.cloudflare.com و bob.ns.cloudflare.com', en: 'ada.ns.cloudflare.com and bob.ns.cloudflare.com' },
    why: {
      fa: 'این همان NS delegation است: وقتی در Registrar، Nameserverها را روی Cloudflare می‌گذارید، Registry این‌جا ثبتشان می‌کند. (اسم‌ها مثال‌اند.)',
      en: 'This is NS delegation: when you set your nameservers to Cloudflare at the registrar, the registry records them here. (Names are examples.)',
    },
  },
  {
    from: RESOLVER,
    to: AUTH,
    q: { fa: 'رکورد A برای www.example.com؟', en: 'A record for www.example.com?' },
    a: { fa: `${IP} (TTL = ${TTL} ثانیه)`, en: `${IP} (TTL = ${TTL} seconds)` },
    why: {
      fa: 'Nameserver اصلی همان جایی است که شما رکوردها را تنظیم می‌کنید. جواب قطعی را فقط او دارد.',
      en: 'The authoritative nameserver is where you edit your records. Only it holds the definitive answer.',
    },
  },
  {
    from: RESOLVER,
    to: BROWSER,
    q: { fa: `بفرما: ${IP}`, en: `Here you go: ${IP}` },
    a: { fa: 'ممنون! حالا وصل می‌شوم.', en: 'Thanks! Connecting now.' },
    why: {
      fa: 'Resolver جواب را تا وقتی TTL تمام نشده در Cache نگه می‌دارد. پایین را ببینید.',
      en: 'The resolver keeps the answer in its cache until the TTL runs out. Look below.',
    },
  },
];

export default function DnsLookup() {
  const tx = useTx();
  const { lang } = useApp();
  const [step, setStep] = useState(-1);
  const [cachedVisit, setCachedVisit] = useState(false);
  const [ttl, setTtl] = useState<number | null>(null);

  // Countdown while an answer is cached.
  const hasCache = ttl !== null && ttl > 0;
  useEffect(() => {
    if (!hasCache) return;
    const t = window.setInterval(() => setTtl((v) => (v === null ? v : Math.max(0, v - 1))), 1000);
    return () => window.clearInterval(t);
  }, [hasCache]);

  const done = step === HOPS.length - 1;

  const next = () => {
    const n = Math.min(HOPS.length - 1, step + 1);
    setStep(n);
    if (n === HOPS.length - 1) setTtl(TTL);
  };

  const fullLookup = () => {
    setCachedVisit(false);
    setStep(-1);
    setTtl(null);
  };

  const secondVisit = () => {
    if (!hasCache) {
      setCachedVisit(false);
      setStep(-1);
      return;
    }
    setCachedVisit(true);
    setStep(HOPS.length - 1);
  };

  const pct = ttl === null ? 0 : ttl / TTL;
  const R = 18;
  const C = 2 * Math.PI * R;

  return (
    <Frame
      title={tx('DNS قدم‌به‌قدم: پیدا کردن IP یک دامنه', 'DNS step by step: finding the IP of a domain')}
      hint={
        cachedVisit
          ? hasCache
            ? tx('دیدید؟ بار دوم هیچ سفری لازم نشد. جواب از Cache آمد!', 'See? No trips needed the second time. The answer came from the cache!')
            : tx('Cache خالی است، پس باید دوباره کل مسیر را برویم.', 'The cache is empty, so we have to do the whole trip again.')
          : tx('«قدم بعد» را بزنید و دنبال سؤال‌ها بیایید.', 'Press Next and follow the questions.')
      }
      mood={cachedVisit && hasCache ? 'happy' : done ? 'wink' : 'think'}
      tint="var(--butter-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--butter" onClick={next} disabled={done || cachedVisit}>
            {step < 0 ? tx('شروع جست‌وجو', 'Start lookup') : tx('قدم بعد', 'Next step')}
          </button>
          <button type="button" className="btn btn--small" onClick={secondVisit} disabled={!done && !hasCache}>
            {tx('بازدید دوم (با Cache)', 'Second visit (cached)')}
          </button>
          <button type="button" className="btn btn--small btn--ghost" onClick={fullLookup}>
            {tx('از اول', 'Start over')}
          </button>
        </>
      }
    >
      <ol className="dns-hops">
        {HOPS.map((h, i) => {
          const skipped = cachedVisit && hasCache && i > 0 && i < HOPS.length - 1;
          const visible = cachedVisit && hasCache ? i === 0 || i === HOPS.length - 1 : i <= step;
          const cls = skipped ? 'is-skipped' : !visible ? 'is-pending' : i === step || (cachedVisit && i === HOPS.length - 1) ? 'is-current' : '';
          const from = cachedVisit && hasCache && i === HOPS.length - 1 ? { ...RESOLVER } : h.from;
          return (
            <li key={i} className={`dns-hop ${cls}`}>
              <div className="dns-who">
                <span className="w-pill" style={{ background: from.tint, color: '#2a211b' }}>
                  {tx(from.fa, from.en)}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="tta-arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="w-pill" style={{ background: h.to.tint, color: '#2a211b' }}>
                  {tx(h.to.fa, h.to.en)}
                </span>
                {skipped && <span className="w-muted">{tx('(رد شد: جواب در Cache بود)', '(skipped: answer was cached)')}</span>}
              </div>
              <AnimatePresence initial={false}>
                {visible && !skipped && (
                  <motion.div
                    style={{ display: 'grid', gap: 6 }}
                    initial={{ opacity: 0, transform: 'translateY(6px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <span className="dns-bubble dns-q">
                      {cachedVisit && hasCache && i === HOPS.length - 1 ? tx(`از Cache: ${IP}`, `From cache: ${IP}`) : tx(h.q.fa, h.q.en)}
                    </span>
                    <motion.span
                      className="dns-bubble dns-a"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25, delay: 0.35 }}
                    >
                      {cachedVisit && hasCache && i === 0
                        ? tx('این یکی را دارم! همین الان از Cache می‌دهم.', 'I have this one! Straight from my cache.')
                        : tx(h.a.fa, h.a.en)}
                    </motion.span>
                    {i === step && !cachedVisit && <span className="w-muted">{tx(h.why.fa, h.why.en)}</span>}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ol>

      <div className="dns-cache" aria-live="polite">
        <svg className="dns-ring" width="48" height="48" viewBox="0 0 48 48" aria-hidden>
          <circle cx="24" cy="24" r={R} fill="none" stroke="var(--line)" strokeWidth="5" />
          <circle
            cx="24"
            cy="24"
            r={R}
            fill="none"
            stroke="var(--coral)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - pct)}
            transform="rotate(-90 24 24)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div style={{ flex: '1 1 160px' }}>
          <strong>{tx('Cache در Resolver', 'Resolver cache')}</strong>
          <div className="w-muted">
            {hasCache
              ? tx(
                  `www.example.com → ${IP} · ${num(ttl!, lang)} ثانیه تا انقضا`,
                  `www.example.com → ${IP} · expires in ${ttl} s`,
                )
              : ttl === 0
                ? tx('منقضی شد. بازدید بعدی دوباره کل مسیر را می‌رود.', 'Expired. The next visit does the full trip again.')
                : tx('هنوز خالی است.', 'Empty for now.')}
          </div>
        </div>
        {hasCache && (
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setTtl((v) => (v === null ? v : Math.max(0, v - 60)))}>
            {tx('۶۰ ثانیه جلو برو', 'Skip 60 s')}
          </button>
        )}
      </div>
      <p className="w-muted" style={{ margin: '10px 0 0' }}>
        {tx(
          'به همین دلیل وقتی یک رکورد DNS را عوض می‌کنید، بعضی‌ها تا تمام شدن TTL هنوز جواب قدیمی را می‌بینند.',
          'This is why, after you change a DNS record, some people keep seeing the old answer until the TTL runs out.',
        )}
      </p>
    </Frame>
  );
}
