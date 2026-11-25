import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { Mascot } from '../Mascot';
import { Frame } from './Frame';
import './set3.css';

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const DOMAIN = 'my-cafe.com';
const OLD_NS = ['ns1.registrar-example.com', 'ns2.registrar-example.com'];
const CF_NS = ['ada.ns.cloudflare.com', 'bob.ns.cloudflare.com'];
const DOTS = 40;

const RECORDS = [
  { id: 'a', type: 'A', name: '@', fa: 'آدرس سایت فعلی', en: 'current website address' },
  { id: 'www', type: 'CNAME', name: 'www', fa: 'نسخه www', en: 'the www version' },
  { id: 'mx', type: 'MX', name: '@', fa: 'ایمیل! بدون این، ایمیل‌ها گم می‌شوند', en: 'email! without it, mail gets lost' },
  { id: 'txt', type: 'TXT', name: '@', fa: 'SPF و تأیید مالکیت', en: 'SPF and ownership checks' },
];

const STEP_LABELS = [
  { fa: 'افزودن به Cloudflare', en: 'Add to Cloudflare' },
  { fa: 'کپی رکوردها', en: 'Copy records' },
  { fa: 'تعویض Nameserverها', en: 'Swap nameservers' },
  { fa: 'انتشار در اینترنت', en: 'Propagation' },
  { fa: 'فعال شد', en: 'Active' },
  { fa: 'اتصال به Worker', en: 'Attach to Worker' },
];

export default function NameserverSwitch() {
  const { t, lang } = useApp();
  const tx = useTx();
  const [step, setStep] = useState(0); // index of the current step label; 6 = all done
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [ns, setNs] = useState<string[]>(OLD_NS);
  const [fresh, setFresh] = useState<boolean[]>(() => Array(DOTS).fill(false));
  const order = useRef<number[]>([]);
  const timer = useRef<number | undefined>(undefined);

  // Propagation: resolvers around the world pick up the new nameservers gradually.
  useEffect(() => {
    if (step !== 3) return;
    if (!order.current.length) order.current = Array.from({ length: DOTS }, (_, i) => i).sort(() => Math.random() - 0.5);
    let k = fresh.filter(Boolean).length;
    timer.current = window.setInterval(() => {
      k += 2;
      setFresh(() => {
        const next = Array(DOTS).fill(false) as boolean[];
        order.current.slice(0, k).forEach((i) => (next[i] = true));
        return next;
      });
      if (k >= DOTS) {
        window.clearInterval(timer.current);
        window.setTimeout(() => setStep(4), 500);
      }
    }, 260);
    return () => window.clearInterval(timer.current);
  }, [step]);

  const skip = () => {
    window.clearInterval(timer.current);
    setFresh(Array(DOTS).fill(true));
    setStep(4);
  };

  const reset = () => {
    window.clearInterval(timer.current);
    setStep(0);
    setChecked({});
    setNs(OLD_NS);
    setFresh(Array(DOTS).fill(false));
    order.current = [];
  };

  const allChecked = RECORDS.every((r) => checked[r.id]);
  const swapped = ns.every((n, i) => n === CF_NS[i]);
  const newCount = fresh.filter(Boolean).length;

  const zoneStatus = step === 0 ? 'none' : step < 4 ? 'pending' : 'active';

  const say = (() => {
    switch (step) {
      case 0:
        return tx(
          `دامنه ${DOMAIN} را از یک Registrar خریده‌اید و الان Nameserverهای خود Registrar به آن جواب می‌دهند. می‌خواهیم مدیریت DNS را به Cloudflare بدهیم.`,
          `You bought ${DOMAIN} from a registrar, and the registrar's own nameservers answer for it right now. Let's hand DNS over to Cloudflare.`,
        );
      case 1:
        return tx(
          'Cloudflare رکوردهای فعلی را اسکن کرده. قبل از هر کاری مطمئن شوید همه هستند، مخصوصاً MX؛ وگرنه ایمیل‌تان قطع می‌شود.',
          'Cloudflare scanned your current records. Before anything else, make sure they are all there, especially MX, or your email stops working.',
        );
      case 2:
        return tx(
          'حالا در پنل Registrar، دو Nameserver قدیمی را با دو Nameserver که Cloudflare به شما داده جایگزین کنید.',
          'Now, in the registrar panel, replace the two old nameservers with the two Cloudflare assigned to you.',
        );
      case 3:
        return tx(
          'منتظر بمانید… Resolverهای سراسر دنیا کم‌کم Nameserverهای جدید را یاد می‌گیرند. معمولاً چند دقیقه تا چند ساعت، گاهی تا یک روز طول می‌کشد.',
          'Waiting… resolvers around the world gradually learn the new nameservers. It usually takes minutes to hours, sometimes up to a day.',
        );
      case 4:
        return tx(
          'دامنه روی Cloudflare فعال شد! حالا آن را به Worker پروژه وصل کنید.',
          'The domain is active on Cloudflare! Now attach it to your project’s Worker.',
        );
      default:
        return tx(
          'تمام! Cloudflare گواهی HTTPS را خودش صادر کرد و سایت روی دامنه خودتان باز می‌شود.',
          'Done! Cloudflare issued the HTTPS certificate by itself, and the site opens on your own domain.',
        );
    }
  })();

  return (
    <Frame
      title={tx('انتقال دامنه به Cloudflare، قدم به قدم', 'Moving your domain to Cloudflare, step by step')}
      hint={tx('مقادیر Nameserver این‌جا فقط نمونه‌اند؛ Cloudflare به هر حساب دو Nameserver مخصوص می‌دهد.', 'The nameserver values here are examples only; Cloudflare assigns each account its own pair.')}
      tint="var(--sky-soft)"
      footer={
        <button type="button" className="btn btn--small btn--ghost" onClick={reset}>
          {tx('از اول', 'Start over')}
        </button>
      }
    >
      <ol className="ns-steps" aria-label={tx('مراحل', 'Steps')}>
        {STEP_LABELS.map((l, i) => (
          <li key={i} className={i < step ? 'is-done' : i === step ? 'is-now' : ''} aria-current={i === step ? 'step' : undefined}>
            {num(i + 1, lang)}. {t(l)}
          </li>
        ))}
      </ol>

      <div className="ns-panels">
        {/* Registrar */}
        <div className={`ns-panel ${step === 2 ? 'is-focus' : ''}`}>
          <div className="ns-panel-head" style={{ background: 'var(--butter-soft)' }}>
            <span>{tx('پنل Registrar', 'Registrar panel')}</span>
            <span className="s3-host">{DOMAIN}</span>
          </div>
          <div className="ns-panel-body">
            <span className="w-muted" style={{ fontSize: 12.5 }}>
              Nameservers
            </span>
            {ns.map((n, i) => (
              <div className="ns-row" key={i}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={n}
                    className="s3-host"
                    initial={{ opacity: 0, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: EASE_OUT }}
                    style={{ color: n === CF_NS[i] ? 'var(--mint-ink)' : undefined }}
                  >
                    {n}
                  </motion.span>
                </AnimatePresence>
                {step === 2 && n !== CF_NS[i] && (
                  <button type="button" className="btn btn--small btn--butter" onClick={() => setNs((p) => p.map((x, j) => (j === i ? CF_NS[i] : x)))}>
                    {tx('جای‌گذاری', 'Paste')}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cloudflare */}
        <div className={`ns-panel ${step === 1 || step === 4 ? 'is-focus' : ''}`}>
          <div className="ns-panel-head" style={{ background: 'var(--coral-soft)' }}>
            <span>Cloudflare</span>
            <span className={`ns-status ${zoneStatus}`}>
              {zoneStatus === 'none' ? tx('اضافه نشده', 'not added') : zoneStatus === 'pending' ? tx('در انتظار', 'Pending') : tx('فعال', 'Active')}
            </span>
          </div>
          <div className="ns-panel-body">
            {step === 0 ? (
              <p className="w-muted" style={{ margin: 0 }}>
                {tx('هنوز سایتی اضافه نشده.', 'No site added yet.')}
              </p>
            ) : (
              <>
                <span className="w-muted" style={{ fontSize: 12.5 }}>
                  {tx('Nameserverهای اختصاصی شما', 'Your assigned nameservers')} <span className="s3-example">{tx('نمونه', 'example')}</span>
                </span>
                {CF_NS.map((n) => (
                  <div className="ns-row" key={n}>
                    <span className="s3-host">{n}</span>
                  </div>
                ))}
                {step >= 1 && (
                  <>
                    <span className="w-muted" style={{ fontSize: 12.5, marginTop: 4 }}>
                      {tx('رکوردهای DNS اسکن‌شده', 'Scanned DNS records')}
                    </span>
                    {RECORDS.map((r) => (
                      <label key={r.id} className="br-check" style={{ minHeight: 40, padding: '4px 10px', fontSize: 13 }}>
                        <input
                          type="checkbox"
                          checked={!!checked[r.id] || step > 1}
                          disabled={step !== 1}
                          onChange={(e) => setChecked((c) => ({ ...c, [r.id]: e.target.checked }))}
                        />
                        <span className="s3-host" style={{ fontWeight: 800 }}>
                          {r.type} {r.name}
                        </span>
                        <span className="w-muted" style={{ fontSize: 12 }}>
                          {t(r)}
                        </span>
                      </label>
                    ))}
                  </>
                )}
                {step >= 6 && (
                  <div className="ns-row" style={{ background: 'var(--mint-soft)' }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800 }}>Custom Domain</span>
                    <span className="s3-host">{DOMAIN} → my-cafe (Worker)</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* World */}
        <div className={`ns-panel ${step >= 3 ? 'is-focus' : ''}`}>
          <div className="ns-panel-head" style={{ background: 'var(--mint-soft)' }}>
            <span>{tx('اینترنت', 'The internet')}</span>
            {step === 3 && (
              <span className="w-pill" style={{ fontSize: 12 }}>
                {num(Math.round((newCount / DOTS) * 100), lang)}
                {lang === 'fa' ? '٪' : '%'}
              </span>
            )}
          </div>
          <div className="ns-panel-body">
            {step < 6 ? (
              <>
                <div className="ns-dots" role="img" aria-label={tx('Resolverهای دنیا', 'Resolvers worldwide')}>
                  {fresh.map((f, i) => (
                    <span key={i} className={`ns-dot ${f ? 'new' : 'old'}`} />
                  ))}
                </div>
                <div className="w-row" style={{ fontSize: 12, gap: 12 }}>
                  <span className="w-row" style={{ gap: 4 }}>
                    <span className="ns-dot old" style={{ width: 12 }} /> {tx('هنوز قدیمی', 'still old')}
                  </span>
                  <span className="w-row" style={{ gap: 4 }}>
                    <span className="ns-dot new" style={{ width: 12 }} /> {tx('Cloudflare', 'Cloudflare')}
                  </span>
                </div>
              </>
            ) : (
              <motion.div
                className="ns-browser"
                initial={{ opacity: 0, transform: 'scale(0.96)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <div className="ns-browser-bar">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-label="HTTPS">
                    <rect x="5" y="10.5" width="14" height="10" rx="2.5" fill="var(--mint)" stroke="currentColor" strokeWidth="2" />
                    <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="s3-host">https://{DOMAIN}</span>
                </div>
                <div className="ns-browser-page">{tx('سلام از Worker شما!', 'Hello from your Worker!')}</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className={`s3-bubble ${step >= 4 ? 'is-good' : step === 1 ? 'is-warn' : ''}`}>
        <Mascot size={44} mood={step >= 6 ? 'happy' : step === 3 ? 'think' : step === 4 ? 'wow' : 'calm'} follow={false} />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={step}
            initial={{ opacity: 0, filter: 'blur(3px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            aria-live="polite"
          >
            {say}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="s3-actions">
        {step === 0 && (
          <button type="button" className="btn btn--primary" onClick={() => setStep(1)}>
            {tx('افزودن دامنه به Cloudflare', 'Add the domain to Cloudflare')}
          </button>
        )}
        {step === 1 && (
          <button type="button" className="btn btn--primary" onClick={() => setStep(2)} disabled={!allChecked}>
            {allChecked ? tx('همه رکوردها هست؛ ادامه', 'All records are there: continue') : tx('اول همه رکوردها را تیک بزنید', 'Tick every record first')}
          </button>
        )}
        {step === 2 && (
          <button type="button" className="btn btn--primary" onClick={() => setStep(3)} disabled={!swapped}>
            {swapped ? tx('ذخیره در Registrar', 'Save at the registrar') : tx('هر دو Nameserver را جای‌گذاری کنید', 'Paste both nameservers')}
          </button>
        )}
        {step === 3 && (
          <button type="button" className="btn btn--butter" onClick={skip}>
            {tx('جلو بزن', 'Skip ahead')}
          </button>
        )}
        {step === 4 && (
          <button type="button" className="btn btn--mint" onClick={() => setStep(6)}>
            {tx('اتصال دامنه به Worker (Custom Domain)', 'Attach the domain to the Worker (Custom Domain)')}
          </button>
        )}
      </div>
    </Frame>
  );
}
