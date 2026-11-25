import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useLayoutEffect, useRef, useState, type JSX } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set1.css';

type NodeId = 'browser' | 'dns' | 'edge' | 'worker' | 'db';
type Step = { node: NodeId; carry: string; fa: string; en: string };

const s = { fill: 'none', stroke: '#2a211b', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

const NODES: { id: NodeId; fa: string; en: string; tint: string; icon: JSX.Element }[] = [
  {
    id: 'browser',
    fa: 'مرورگر',
    en: 'Browser',
    tint: 'var(--sky)',
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" {...s} />
        <path d="M3 9h18" {...s} />
      </>
    ),
  },
  {
    id: 'dns',
    fa: 'DNS',
    en: 'DNS',
    tint: 'var(--butter)',
    icon: (
      <>
        <path d="M12 3v18" {...s} />
        <path d="M5 6h11l3 2.5L16 11H5Z" {...s} />
      </>
    ),
  },
  {
    id: 'edge',
    fa: 'سرور / Edge',
    en: 'Server / edge',
    tint: 'var(--mint)',
    icon: <path d="M7 18h10.5a4 4 0 0 0 .4-8 5.5 5.5 0 0 0-10.6-1.2A4.6 4.6 0 0 0 7 18Z" {...s} />,
  },
  {
    id: 'worker',
    fa: 'Backend',
    en: 'Backend',
    tint: 'var(--blush)',
    icon: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 5l-3 14" {...s} />,
  },
  {
    id: 'db',
    fa: 'Database',
    en: 'Database',
    tint: 'var(--coral)',
    icon: (
      <>
        <ellipse cx="12" cy="6" rx="7" ry="2.6" {...s} />
        <path d="M5 6v12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6M5 12c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" {...s} />
      </>
    ),
  },
];

function buildSteps(url: string, dynamic: boolean): Step[] {
  const host = url || 'cafe-sahar.ir';
  const out: Step[] = [
    {
      node: 'browser',
      carry: host,
      fa: `شما «${host}» را تایپ کردید و Enter زدید. مرورگر فقط اسم را می‌داند؛ هنوز نمی‌داند این سایت کجای اینترنت است.`,
      en: `You typed "${host}" and pressed Enter. The browser only knows a name; it has no idea where on the internet that site lives yet.`,
    },
    {
      node: 'dns',
      carry: '203.0.113.10',
      fa: 'مرورگر از DNS می‌پرسد: «آدرس IP این اسم چیست؟» و جواب یک عدد است، مثل شماره تلفن سایت. (این IP فقط مثال است.)',
      en: 'The browser asks DNS: "What is the IP address for this name?" The answer is a number, like the site\'s phone number. (This IP is just an example.)',
    },
    {
      node: 'edge',
      carry: 'GET / (HTTPS)',
      fa: 'حالا مرورگر با آن IP تماس می‌گیرد و یک Request امن (HTTPS) می‌فرستد: «صفحه اصلی را بده.» این‌جا Cloudflare نزدیک‌ترین سرور به شما جواب می‌دهد.',
      en: 'Now the browser calls that IP and sends a secure (HTTPS) request: "Give me the home page." Here, the Cloudflare server closest to you picks up.',
    },
  ];
  if (dynamic) {
    out.push(
      {
        node: 'worker',
        carry: 'run code',
        fa: 'این صفحه چیزی «زنده» دارد (مثلاً منوی امروز). پس کد Backend اجرا می‌شود؛ روی Cloudflare این کد یک Worker است.',
        en: "This page has something live (today's menu, say), so backend code runs. On Cloudflare, that code is a Worker.",
      },
      {
        node: 'db',
        carry: 'SELECT menu',
        fa: 'Backend از Database می‌پرسد: «منوی امروز چیست؟» و داده را برمی‌گرداند.',
        en: 'The backend asks the database: "What is on today\'s menu?" and gets the data back.',
      },
      {
        node: 'worker',
        carry: 'HTML',
        fa: 'Backend داده را داخل قالب صفحه می‌گذارد و یک Response آماده می‌کند.',
        en: 'The backend pours the data into the page template and prepares a response.',
      },
    );
  }
  out.push(
    {
      node: 'edge',
      carry: 'HTML · CSS · JS',
      fa: dynamic
        ? 'سرور Response را با کد 200 (یعنی «همه‌چیز اوکی است») به مرورگر برمی‌گرداند.'
        : 'سایت ثابت است، پس سرور فایل‌های آماده را مستقیم می‌فرستد؛ نه کدی اجرا می‌شود و نه Database لازم است. برای همین خیلی سریع است.',
      en: dynamic
        ? 'The server sends the response back to the browser with status 200 ("all good").'
        : 'The site is static, so the server sends ready-made files straight away. No code runs and no database is needed, which is why it is so fast.',
    },
    {
      node: 'browser',
      carry: '200 OK',
      fa: 'مرورگر HTML و CSS و JavaScript را می‌خواند و صفحه را می‌کشد. همه این رفت‌وبرگشت معمولاً کمتر از یک ثانیه طول می‌کشد!',
      en: 'The browser reads the HTML, CSS and JavaScript and paints the page. This whole round trip usually takes less than a second!',
    },
  );
  return out;
}

export default function RequestJourney() {
  const tx = useTx();
  const { lang } = useApp();
  const reduce = useReducedMotion();
  const [draft, setDraft] = useState('cafe-sahar.ir');
  const [url, setUrl] = useState('cafe-sahar.ir');
  const [dynamic, setDynamic] = useState(true);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [xs, setXs] = useState<Record<string, number>>({});
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const steps = buildSteps(url, dynamic);
  const cur = step >= 0 ? steps[step] : null;
  const last = step === steps.length - 1;
  const { complete } = useLab();

  // Done when a request has made the full round trip back to the browser.
  useEffect(() => {
    if (last) complete();
  }, [last, complete]);

  // Measure node centres so the packet travels in pixels (transform only), in both LTR and RTL.
  useLayoutEffect(() => {
    const measure = () => {
      const next: Record<string, number> = {};
      for (const n of NODES) {
        const el = nodeRefs.current[n.id];
        if (el) next[n.id] = el.offsetLeft + el.offsetWidth / 2;
      }
      setXs(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [lang]);

  useEffect(() => {
    if (!playing) return;
    if (step >= steps.length - 1) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setStep((v) => v + 1), step < 0 ? 200 : 2400);
    return () => window.clearTimeout(t);
  }, [playing, step, steps.length]);

  const go = () => {
    const clean = draft.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '') || 'cafe-sahar.ir';
    setUrl(clean);
    setDraft(clean);
    setStep(-1);
    setPlaying(true);
  };

  const setMode = (d: boolean) => {
    setDynamic(d);
    setStep(-1);
    setPlaying(false);
  };

  return (
    <Frame
      title={tx('سفر یک Request: از تایپ آدرس تا دیدن صفحه', 'The journey of a request: from typing a URL to seeing the page')}
      goal={tx('یک Request را تا صفحه کامل دنبال کنید', 'Follow one request all the way to the page')}
      mood={last ? 'happy' : step >= 0 ? 'wow' : 'happy'}
      tint="var(--sky-soft)"
      footer={
        <>
          <div className="w-row">
            <button type="button" className="btn btn--small" onClick={() => { setPlaying(false); setStep((v) => Math.max(0, v - 1)); }} disabled={step <= 0}>
              {tx('قدم قبل', 'Back')}
            </button>
            <button type="button" className="btn btn--small btn--ghost" onClick={() => setPlaying((p) => !p)} disabled={last && !playing}>
              {playing ? tx('مکث', 'Pause') : tx('پخش خودکار', 'Auto-play')}
            </button>
          </div>
          <div className="w-row">
            <span className="w-muted">
              {step >= 0 ? `${tx('قدم', 'Step')} ${num(step + 1, lang)} / ${num(steps.length, lang)}` : ''}
            </span>
            <button
              type="button"
              className="btn btn--small btn--butter"
              onClick={() => { setPlaying(false); setStep((v) => Math.min(steps.length - 1, v + 1)); }}
              disabled={last}
            >
              {tx('قدم بعد', 'Next step')}
            </button>
          </div>
        </>
      }
    >
      <form
        className="rj-form"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <label className="rj-url">
          <span className="sr-only">{tx('آدرس سایت', 'Website address')}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
            <rect x="5" y="10" width="14" height="10" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2.2" />
          </svg>
          <span className="w-mono" style={{ opacity: 0.55 }}>
            https://
          </span>
          <input size={8} value={draft} onChange={(e) => setDraft(e.target.value)} inputMode="url" autoCapitalize="off" spellCheck={false} />
        </label>
        <button type="submit" className="btn btn--primary">
          {tx('برو', 'Go')}
        </button>
      </form>

      <div className="w-toggle" role="group" aria-label={tx('نوع سایت', 'Kind of site')} style={{ marginTop: 12 }}>
        <button type="button" aria-pressed={dynamic} onClick={() => setMode(true)}>
          {tx('سایت پویا', 'Dynamic site')}
        </button>
        <button type="button" aria-pressed={!dynamic} onClick={() => setMode(false)}>
          {tx('سایت ثابت', 'Static site')}
        </button>
      </div>

      <div className="rj-track" ref={trackRef}>
        <div className="rj-line" aria-hidden />
        {cur && xs[cur.node] !== undefined && (
          <motion.div
            aria-hidden
            style={{ position: 'absolute', top: 0, left: 0, width: 0 }}
            initial={false}
            animate={{ transform: `translateX(${xs[cur.node]}px)` }}
            transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_IN_OUT }}
          >
            <span className="rj-packet" style={{ transform: 'translateX(-50%)' }}>
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={cur.carry}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cur.carry}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>
        )}
        <div className="rj-nodes">
          {NODES.map((n) => {
            const used = dynamic || (n.id !== 'worker' && n.id !== 'db');
            const here = cur?.node === n.id;
            return (
              <div key={n.id} ref={(el) => { nodeRefs.current[n.id] = el; }} className={`rj-node ${used ? '' : 'is-off'}`}>
                <motion.span
                  className="rj-dot"
                  style={{ background: here ? n.tint : undefined }}
                  animate={{ transform: here ? 'translateY(-3px)' : 'translateY(0px)' }}
                  transition={{ duration: 0.25, ease: EASE_OUT }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
                    {n.icon}
                  </svg>
                </motion.span>
                <span>{tx(n.fa, n.en)}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rj-explain" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`${dynamic}-${step}`}
            className="w-card"
            style={{ margin: 0 }}
            initial={{ opacity: 0, transform: 'translateY(6px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            {cur
              ? tx(cur.fa, cur.en)
              : tx(
                  'آماده‌اید؟ «برو» را بزنید تا ببینید وقتی یک آدرس را باز می‌کنید پشت صحنه چه اتفاقی می‌افتد.',
                  'Ready? Press Go to see what happens behind the scenes when you open an address.',
                )}
          </motion.p>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {last && (
          <motion.div
            className="rj-mock"
            initial={{ opacity: 0, transform: 'scale(0.96) translateY(8px)' }}
            animate={{ opacity: 1, transform: 'scale(1) translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div className="rj-mock-bar">
              <i />
              <i />
              <i />
              <span className="rj-mock-addr">https://{url}</span>
            </div>
            <div className="rj-mock-body">
              <svg width="58" height="58" viewBox="0 0 60 60" aria-hidden style={{ flex: 'none' }}>
                <path d="M14 24h30v14a12 12 0 0 1-12 12h-6a12 12 0 0 1-12-12Z" fill="#fffaf2" stroke="#2a211b" strokeWidth="2.5" />
                <path d="M44 28h3a6 6 0 0 1 0 12h-4" fill="none" stroke="#2a211b" strokeWidth="2.5" />
                <path d="M23 8c-3 4 3 6 0 11M31 8c-3 4 3 6 0 11" fill="none" stroke="#ef6a4c" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="24" cy="37" r="1.6" fill="#2a211b" />
                <circle cx="34" cy="37" r="1.6" fill="#2a211b" />
                <path d="M26 42q3 2.5 6 0" fill="none" stroke="#2a211b" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <h5>{url.split('.')[0].replace(/-/g, ' ')}</h5>
                <p>{dynamic ? tx('منوی امروز: لاته، کیک هویج، چای دارچین', "Today's menu: latte, carrot cake, cinnamon tea") : tx('به کافه کوچک ما خوش آمدید', 'Welcome to our little café')}</p>
                <span className="rj-mock-btn">{tx('رزرو میز', 'Book a table')}</span>
              </div>
              <span style={{ marginInlineStart: 'auto', flex: 'none' }}>
                <Mascot size={44} mood="happy" follow={false} />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Frame>
  );
}
