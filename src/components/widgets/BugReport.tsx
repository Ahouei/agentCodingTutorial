import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { CopyButton } from '../blocks/CopyButton';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set3.css';

type Form = {
  where: string;
  steps: string[];
  expected: string;
  actual: string;
  screenshot: boolean;
  consoleOn: boolean;
  consoleText: string;
  networkOn: boolean;
  networkText: string;
  workerLogs: boolean;
  device: string;
  rootCause: boolean;
};

const EMPTY: Form = {
  where: '',
  steps: [''],
  expected: '',
  actual: '',
  screenshot: false,
  consoleOn: false,
  consoleText: '',
  networkOn: false,
  networkText: '',
  workerLogs: false,
  device: '',
  rootCause: true,
};

const SAMPLE: Form = {
  where: 'https://cafe-sahar.ir/book',
  steps: ['Open /book on a phone', 'Pick a date, a time and 2 people', 'Tap "Book a table"'],
  expected: 'A "Your table is booked" message appears and the booking is saved in the D1 bookings table.',
  actual: 'The button spins for a few seconds, then nothing happens. No confirmation.',
  screenshot: true,
  consoleOn: true,
  consoleText: 'POST https://cafe-sahar.ir/api/bookings 500 (Internal Server Error)',
  networkOn: true,
  networkText: 'POST /api/bookings → 500, response body: {"error":"D1_ERROR: no such table: bookings"}',
  workerLogs: true,
  device: 'iPhone 13, Safari 17 (also happens in Chrome on desktop)',
  rootCause: true,
};

function score(f: Form) {
  let s = 0;
  if (f.where.trim()) s += 10;
  const steps = f.steps.filter((x) => x.trim()).length;
  s += steps >= 2 ? 20 : steps === 1 ? 10 : 0;
  if (f.expected.trim()) s += 15;
  if (f.actual.trim()) s += 15;
  if (f.screenshot) s += 7;
  if (f.consoleOn && f.consoleText.trim()) s += 8;
  if (f.networkOn && f.networkText.trim()) s += 6;
  if (f.workerLogs) s += 6;
  if (f.device.trim()) s += 6;
  if (f.rootCause) s += 7;
  return Math.min(100, s);
}

function buildReport(f: Form) {
  const steps = f.steps.filter((x) => x.trim());
  const lines: string[] = ['Bug report', ''];
  lines.push(`Where: ${f.where.trim() || '(missing: which page or URL?)'}`);
  if (f.device.trim()) lines.push(`Device / browser: ${f.device.trim()}`);
  lines.push('', 'Steps to reproduce:');
  if (steps.length) steps.forEach((s, i) => lines.push(`${i + 1}. ${s.trim()}`));
  else lines.push('(missing: what exactly do I do to see the bug?)');
  lines.push('', `Expected: ${f.expected.trim() || '(missing)'}`);
  lines.push(`Actual: ${f.actual.trim() || '(missing)'}`);
  const ev: string[] = [];
  if (f.screenshot) ev.push('- Screenshot attached.');
  if (f.consoleOn && f.consoleText.trim()) ev.push(`- Browser console error:\n  ${f.consoleText.trim()}`);
  if (f.networkOn && f.networkText.trim()) ev.push(`- Network tab:\n  ${f.networkText.trim()}`);
  if (f.workerLogs) ev.push('- Worker logs: please run `npx wrangler tail` while I reproduce it, and read the errors.');
  if (ev.length) lines.push('', 'Evidence:', ...ev);
  lines.push('');
  if (f.rootCause) {
    lines.push(
      'Before changing any code: find the root cause, explain it to me in plain language, and propose a fix. Wait for my OK.',
      'After the fix: add a test that fails without the fix and passes with it, and tell me how you verified it.',
    );
  } else {
    lines.push('Please fix this bug.');
  }
  lines.push('Only fix this one bug; do not change unrelated code.');
  return lines.join('\n');
}

export default function BugReport() {
  const { lang } = useApp();
  const tx = useTx();
  const [f, setF] = useState<Form>(EMPTY);
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((prev) => ({ ...prev, [k]: v }));

  const s = score(f);
  const level =
    s >= 80
      ? { label: tx('عالی؛ Agent دقیقاً می‌داند چه کند', 'Great: the agent knows exactly what to do'), color: 'var(--mint)', mood: 'happy' as const }
      : s >= 45
        ? { label: tx('قابل قبول؛ کمی شواهد بیشتر بدهید', 'Okay: add a bit more evidence'), color: 'var(--butter)', mood: 'think' as const }
        : { label: tx('مبهم؛ Agent باید حدس بزند', 'Vague: the agent would have to guess'), color: 'var(--coral)', mood: 'wow' as const };

  const report = buildReport(f);
  const { complete } = useLab();
  useEffect(() => {
    if (s >= 80) complete(); // a report an agent can act on
  }, [s, complete]);

  return (
    <Frame
      title={tx('گزارش باگی بسازید که Agent بتواند با آن کار کند', 'Build a bug report an agent can act on')}
      goal={tx('گزارشی با کیفیت ۸۰٪ یا بیشتر بسازید', 'Reach a report quality of 80% or more')}
      hint={tx('«کار نمی‌کنه!» برای Agent کافی نیست.', '"It doesn\'t work!" is not enough for an agent.')}
      mood="think"
      tint="var(--blush-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setF(EMPTY)}>
            {tx('پاک کردن فرم', 'Clear the form')}
          </button>
          <button type="button" className="btn btn--small btn--butter" onClick={() => setF(SAMPLE)}>
            {tx('پر کردن با نمونه', 'Fill with an example')}
          </button>
        </>
      }
    >
      <div className="br-grid">
        <div className="br-fields">
          <div>
            <label className="w-label" htmlFor="br-where">
              {tx('کجا؟ (صفحه یا URL)', 'Where? (page or URL)')}
            </label>
            <input id="br-where" className="w-input" dir="ltr" value={f.where} onChange={(e) => set('where', e.target.value)} placeholder="https://cafe-sahar.ir/book" />
          </div>

          <div>
            <span className="w-label">{tx('مراحل بازتولید', 'Steps to reproduce')}</span>
            {f.steps.map((st, i) => (
              <div className="br-step" key={i}>
                <span className="br-step-num" aria-hidden>
                  {num(i + 1, lang)}
                </span>
                <input
                  className="w-input"
                  aria-label={`${tx('مرحله', 'Step')} ${i + 1}`}
                  value={st}
                  onChange={(e) => set('steps', f.steps.map((x, j) => (j === i ? e.target.value : x)))}
                  placeholder={i === 0 ? tx('مثلاً: صفحه تماس را باز کنید', 'e.g. Open the contact page') : ''}
                />
                {f.steps.length > 1 && (
                  <button
                    type="button"
                    className="br-remove"
                    aria-label={`${tx('حذف مرحله', 'Remove step')} ${i + 1}`}
                    onClick={() => set('steps', f.steps.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn btn--small" onClick={() => set('steps', [...f.steps, ''])}>
              + {tx('افزودن مرحله', 'Add a step')}
            </button>
          </div>

          <div>
            <label className="w-label" htmlFor="br-exp">
              {tx('انتظار داشتید چه شود؟', 'What did you expect?')}
            </label>
            <textarea id="br-exp" className="w-input" value={f.expected} onChange={(e) => set('expected', e.target.value)} />
          </div>
          <div>
            <label className="w-label" htmlFor="br-act">
              {tx('در عمل چه شد؟', 'What actually happened?')}
            </label>
            <textarea id="br-act" className="w-input" value={f.actual} onChange={(e) => set('actual', e.target.value)} />
          </div>

          <div className="w-grid" style={{ gap: 8 }}>
            <span className="w-label" style={{ marginBottom: 0 }}>
              {tx('شواهد', 'Evidence')}
            </span>
            <label className="br-check">
              <input type="checkbox" checked={f.screenshot} onChange={(e) => set('screenshot', e.target.checked)} />
              {tx('اسکرین‌شات ضمیمه می‌کنم', 'I will attach a screenshot')}
            </label>
            <label className="br-check">
              <input type="checkbox" checked={f.consoleOn} onChange={(e) => set('consoleOn', e.target.checked)} />
              {tx('خطای Console مرورگر (F12 → Console)', 'Browser console error (F12 → Console)')}
            </label>
            {f.consoleOn && (
              <textarea className="w-input w-mono" aria-label={tx('متن خطای Console', 'Console error text')} value={f.consoleText} onChange={(e) => set('consoleText', e.target.value)} placeholder="Uncaught TypeError: …" />
            )}
            <label className="br-check">
              <input type="checkbox" checked={f.networkOn} onChange={(e) => set('networkOn', e.target.checked)} />
              {tx('وضعیت درخواست در تب Network', 'Request status from the Network tab')}
            </label>
            {f.networkOn && (
              <input className="w-input w-mono" aria-label={tx('وضعیت Network', 'Network status')} value={f.networkText} onChange={(e) => set('networkText', e.target.value)} placeholder="POST /api/contact → 500" />
            )}
            <label className="br-check">
              <input type="checkbox" checked={f.workerLogs} onChange={(e) => set('workerLogs', e.target.checked)} />
              <span>
                {tx('از Agent بخواهید لاگ Worker را ببیند', 'Ask the agent to read the Worker logs')} <code className="inline-code">npx wrangler tail</code>
              </span>
            </label>
          </div>

          <div>
            <label className="w-label" htmlFor="br-dev">
              {tx('دستگاه و مرورگر', 'Device and browser')}
            </label>
            <input id="br-dev" className="w-input" value={f.device} onChange={(e) => set('device', e.target.value)} placeholder={tx('مثلاً: آیفون ۱۳، Safari', 'e.g. iPhone 13, Safari')} />
          </div>

          <label className="br-check" style={{ background: 'var(--mint-soft)' }}>
            <input type="checkbox" checked={f.rootCause} onChange={(e) => set('rootCause', e.target.checked)} />
            {tx('اول علت اصلی را پیدا کن و توضیح بده، بعد درست کن', 'Find and explain the root cause first, then fix')}
          </label>
        </div>

        <div className="br-output">
          <div>
            <div className="w-row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="w-label" style={{ marginBottom: 0 }}>
                {tx('کیفیت گزارش', 'Report quality')}
              </span>
              <span className="w-pill">{num(s, lang)}{lang === 'fa' ? '٪' : '%'}</span>
            </div>
            <div className="br-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={s} aria-label={tx('کیفیت گزارش', 'Report quality')}>
              <motion.div
                className="br-meter-fill"
                animate={{ transform: `scaleX(${s / 100})`, backgroundColor: level.color }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              />
            </div>
            <div className="s3-bubble" style={{ marginTop: 10 }}>
              <Mascot size={38} mood={level.mood} follow={false} />
              <p aria-live="polite">{level.label}</p>
            </div>
          </div>
          <div>
            <div className="w-row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="w-label" style={{ marginBottom: 0 }}>
                {tx('گزارشی که برای Agent می‌فرستید', 'The report you send the agent')}
              </span>
              <CopyButton text={report} />
            </div>
            <pre className="br-report" tabIndex={0} aria-label={tx('متن گزارش', 'Report text')}>
              {report}
            </pre>
          </div>
        </div>
      </div>
    </Frame>
  );
}
