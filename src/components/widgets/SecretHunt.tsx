import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import type { L } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * RD-07C · "Find the leaked secret". A fake commit diff for Café Sahar where `.dev.vars`
 * was committed by accident. Step 1: find the leaking line. Step 2: put the response in
 * the right order (rotate first). The key is obviously fake.
 */

type Line = { id: string; file: string; sign: '+' | ' '; text: string; leak?: boolean; note?: L };

const LINES: Line[] = [
  { id: 'w1', file: 'wrangler.jsonc', sign: ' ', text: '"name": "cafe-sahar",' },
  {
    id: 'w2',
    file: 'wrangler.jsonc',
    sign: '+',
    text: '"vars": { "SITE_NAME": "Café Sahar" },',
    note: { fa: 'این یک مقدار عمومی است (نام سایت)، نه یک راز. ایرادی ندارد.', en: 'This is a public value (the site name), not a secret. Fine.' },
  },
  {
    id: 'w3',
    file: 'wrangler.jsonc',
    sign: '+',
    text: '"d1_databases": [{ "binding": "DB", "database_name": "cafe-bookings" }]',
    note: { fa: 'نام و Binding یک Database راز نیست؛ بدون Token حساب کسی نمی‌تواند از آن استفاده کند.', en: "A database's name and binding aren't secrets; nobody can use it without your account's token." },
  },
  {
    id: 's1',
    file: 'src/worker.ts',
    sign: '+',
    text: 'const key = env.RESEND_API_KEY;',
    note: { fa: 'این خط کلید را از Secretهای Worker می‌خواند؛ خود کلید اینجا نیست. درست است.', en: "This reads the key from the Worker's secrets; the key itself isn't here. Correct." },
  },
  {
    id: 's2',
    file: 'src/worker.ts',
    sign: '+',
    text: 'await sendBookingEmail(key, booking);',
    note: { fa: 'فقط از متغیر استفاده می‌کند. مشکلی نیست.', en: 'It only uses the variable. No problem.' },
  },
  { id: 'd1', file: '.dev.vars', sign: '+', text: 'RESEND_API_KEY="re_FAKE_do_not_use_123"', leak: true },
  {
    id: 'd2',
    file: '.dev.vars',
    sign: '+',
    text: 'TURNSTILE_SITE_KEY="1x00000000000000000000AA"',
    note: { fa: 'Site key در Turnstile عمومی است و در HTML هم دیده می‌شود. ولی خود فایل .dev.vars نباید Commit شود.', en: "A Turnstile site key is public and appears in the HTML anyway. Still, the .dev.vars file itself shouldn't be committed." },
  },
];

type StepId = 'rotate' | 'put' | 'remove' | 'check';
const CORRECT: StepId[] = ['rotate', 'put', 'remove', 'check'];
const STEPS: Record<StepId, L> = {
  rotate: { fa: 'کلید لو رفته را در پنل Resend باطل کنید و یک کلید تازه بسازید', en: 'Revoke the leaked key in the Resend dashboard and create a new one' },
  put: { fa: 'کلید تازه را با `npx wrangler secret put RESEND_API_KEY` به Worker بدهید', en: 'Give the new key to the Worker with `npx wrangler secret put RESEND_API_KEY`' },
  remove: { fa: 'فایل .dev.vars را از Repository پاک و به .gitignore اضافه کنید', en: 'Remove .dev.vars from the repository and add it to .gitignore' },
  check: { fa: 'لاگ‌ها و مصرف حساب Resend را برای استفاده مشکوک بررسی کنید', en: "Check the logs and the Resend account's usage for suspicious use" },
};
const SHUFFLED: StepId[] = ['remove', 'check', 'rotate', 'put'];

const WRONG_ORDER: Record<StepId, L> = {
  rotate: { fa: '', en: '' },
  put: {
    fa: 'هنوز کلید لو رفته کار می‌کند! تا باطلش نکنید، هر کسی که آن را دیده می‌تواند از حساب شما ایمیل بفرستد.',
    en: 'The leaked key still works! Until you revoke it, anyone who saw it can send email from your account.',
  },
  remove: {
    fa: 'پاک کردن فایل کافی نیست: کلید در تاریخچه Git و در کپی‌های دیگران می‌ماند. اول کلید را بی‌اثر کنید.',
    en: "Deleting the file isn't enough: the key stays in Git history and in other people's copies. Make the key useless first.",
  },
  check: {
    fa: 'بررسی خوب است، ولی تا وقتی کلید هنوز کار می‌کند خطر ادامه دارد. اول باطلش کنید.',
    en: "Checking is good, but the risk continues while the key still works. Revoke it first.",
  },
};

export default function SecretHunt() {
  const { t, lang } = useApp();
  const tx = useTx();
  const lab = useLab();
  const [tapped, setTapped] = useState<string | null>(null);
  const [leakFound, setLeakFound] = useState(false);
  const [order, setOrder] = useState<StepId[]>([]);
  const [wrong, setWrong] = useState<StepId | null>(null);
  const orderDone = order.length === CORRECT.length;

  const markDone = lab.complete;
  useEffect(() => {
    if (leakFound && orderDone) markDone();
  }, [leakFound, orderDone, markDone]);

  const files = useMemo(() => [...new Set(LINES.map((l) => l.file))], []);

  const tapLine = (l: Line) => {
    setTapped(l.id);
    if (l.leak) setLeakFound(true);
  };

  const pickStep = (id: StepId) => {
    const expected = CORRECT[order.length];
    if (id === expected) {
      setOrder((o) => [...o, id]);
      setWrong(null);
    } else {
      setWrong(id);
    }
  };

  const reset = () => {
    setTapped(null);
    setLeakFound(false);
    setOrder([]);
    setWrong(null);
  };

  const tappedLine = LINES.find((l) => l.id === tapped);
  const all = leakFound && orderDone;

  return (
    <Frame
      title={tx('راز لو رفته را پیدا کنید', 'Find the leaked secret')}
      goal={leakFound ? tx('ترتیب درست پاسخ را بچینید', 'Put the response in order') : tx('خطی را که راز را لو داده پیدا کنید', 'Find the line that leaks a secret')}
      tint="var(--butter-soft)"
      mood={all ? 'happy' : leakFound ? 'think' : 'wow'}
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={reset} disabled={!tapped && order.length === 0}>
            {tx('از اول', 'Start over')}
          </button>
          <span className="w-muted">
            {tx(`مرحله ${num(leakFound ? 2 : 1, lang)} از ۲`, `Step ${leakFound ? 2 : 1} of 2`)}
          </span>
        </>
      }
    >
      <div className="s4">
        <p className="w-muted" style={{ marginTop: 0 }}>
          {tx(
            'Agent برای کافه سحر یک Commit ساخته که ایمیل تأیید رزرو را با Resend می‌فرستد. یکی از خط‌ها یک کلید را لو داده است. (کلید ساختگی است.)',
            'The agent made a commit for Café Sahar that sends booking confirmations with Resend. One line leaks a key. (The key is fake.)',
          )}
        </p>
        <div className="sh-diff" role="group" aria-label={tx('تغییرات Commit', 'Commit changes')}>
          {files.map((f) => (
            <div key={f}>
              <div className="sh-file">{f}</div>
              {LINES.filter((l) => l.file === f).map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`sh-line ${l.sign === '+' ? 'add' : ''} ${tapped === l.id && !l.leak ? 'is-wrong' : ''} ${leakFound && l.leak ? 'is-leak' : ''}`}
                  onClick={() => tapLine(l)}
                  disabled={leakFound}
                  aria-pressed={tapped === l.id}
                >
                  <span className="sg" aria-hidden>
                    {l.sign}
                  </span>
                  <span>{l.text}</span>
                </button>
              ))}
            </div>
          ))}
        </div>

        <div aria-live="polite">
          {tappedLine && !leakFound && tappedLine.note && (
            <p className="w-card" style={{ marginBottom: 0 }}>
              {t(tappedLine.note)}
            </p>
          )}
          {leakFound && (
            <p className="w-card" style={{ marginBottom: 0, background: 'var(--mint-soft)', borderColor: 'var(--mint-ink)' }}>
              {tx(
                'پیدا شد! فایل .dev.vars فقط برای کامپیوتر خودتان است و کلید واقعی Resend در آن بود. حالا که در Repository است، باید فرض کنید کلید لو رفته.',
                'Found it! .dev.vars is for your own computer only, and it held the real Resend key. Now that it is in the repository, assume the key has leaked.',
              )}
            </p>
          )}
        </div>

        <AnimatePresence>
          {leakFound && (
            <motion.div
              key="steps"
              style={{ marginTop: 16 }}
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <p style={{ fontWeight: 900, margin: '0 0 8px' }}>
                {tx('حالا به ترتیب درست، روی قدم‌ها بزنید:', 'Now tap the steps in the right order:')}
              </p>
              <div className="sh-steps">
                {SHUFFLED.map((id) => {
                  const idx = order.indexOf(id);
                  const picked = idx >= 0;
                  return (
                    <motion.button
                      key={id}
                      type="button"
                      className={`sh-step ${picked ? 'picked' : ''}`}
                      onClick={() => pickStep(id)}
                      disabled={picked}
                      animate={wrong === id ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <span className="n" aria-hidden>
                        {picked ? num(idx + 1, lang) : '·'}
                      </span>
                      <span>
                        {t(STEPS[id])
                          .split('`')
                          .map((part, i) =>
                            i % 2 ? (
                              <code key={i} className="inline-code">
                                {part}
                              </code>
                            ) : (
                              <span key={i}>{part}</span>
                            ),
                          )}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              <div aria-live="polite">
                {wrong && !orderDone && (
                  <p className="w-card" style={{ marginBottom: 0, background: 'var(--blush-soft)', borderColor: 'var(--coral-ink)' }}>
                    {t(WRONG_ORDER[wrong])}
                  </p>
                )}
                {all && (
                  <div className="s4-result" style={{ marginTop: 12 }}>
                    <div className="s4-result-head">
                      <Mascot size={48} mood="happy" follow={false} />
                      <h4>{tx('کافه سحر دوباره امن است.', 'Café Sahar is safe again.')}</h4>
                    </div>
                    <p style={{ margin: 0 }}>
                      {tx(
                        'قانون طلایی: راز لو رفته را اول بی‌اثر کنید، بعد تمیزکاری. و .dev.vars را همیشه در .gitignore نگه دارید.',
                        'The golden rule: make a leaked secret useless first, then clean up. And always keep .dev.vars in .gitignore.',
                      )}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}
