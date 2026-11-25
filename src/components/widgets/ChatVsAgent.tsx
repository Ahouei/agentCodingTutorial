import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTx } from '../../lib/app';
import { Mascot } from '../Mascot';
import { Frame } from './Frame';
import './set2.css';

const EASE = [0.23, 1, 0.32, 1] as const;

const SNIPPET = `<!doctype html>
<html lang="en">
  <head><title>My Bakery</title></head>
  <body>
    <h1>Fresh bread every morning</h1>
    <p>Open 7am–7pm</p>
  </body>
</html>`;

type Phase = 'idle' | 'running' | 'asking' | 'done';
type Choice = 'home' | 'page' | null;

export default function ChatVsAgent() {
  const tx = useTx();
  const reduce = useReducedMotion();
  const [run, setRun] = useState(0); // bump to replay
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0); // number of agent steps revealed
  const [choice, setChoice] = useState<Choice>(null);
  const timers = useRef<number[]>([]);

  const chatIntro = tx(
    'حتماً! این یک صفحه ساده برای نانوایی شماست:',
    'Sure! Here is a simple page for your bakery:',
  );
  const chatOutro = tx(
    'حالا این کد را در یک فایل index.html ذخیره کنید، یک Hosting بخرید، فایل را آپلود کنید و دامنه را تنظیم کنید. موفق باشید!',
    'Now save this as index.html, buy some hosting, upload the file and point your domain at it. Good luck!',
  );
  const fullChat = chatIntro.length + SNIPPET.length + chatOutro.length;

  const ASK_AT = 3;
  const steps = [
    { tool: 'read', text: tx('Repository را می‌خواند: خالی است، از صفر شروع می‌کند.', 'Reads the repository: it is empty, so it starts fresh.') },
    { tool: 'plan', text: tx('برنامه می‌چیند: صفحه اصلی، منو، ساعت کار، نقشه؛ سایت ثابت روی Worker.', 'Makes a plan: home, menu, hours, map; a static site on a Worker.') },
    { tool: 'ask', text: tx('یک سؤال از شما می‌پرسد…', 'Asks you one question…') },
    { tool: 'write', text: tx('فایل‌ها را می‌سازد: index.html، styles.css، wrangler.jsonc', 'Creates files: index.html, styles.css, wrangler.jsonc') },
    { tool: 'test', text: tx('Build و تست را اجرا می‌کند؛ یک لینک شکسته پیدا و درستش می‌کند.', 'Runs the build and tests; finds a broken link and fixes it.') },
    { tool: 'git push', text: tx('Commit می‌کند و روی GitHub می‌فرستد.', 'Commits and pushes to GitHub.') },
    { tool: 'deploy', text: tx('Worker را روی Cloudflare منتشر می‌کند.', 'Deploys the Worker to Cloudflare.') },
  ];

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const start = () => {
    clear();
    setChoice(null);
    setTyped(reduce ? fullChat : 0);
    setStep(reduce ? ASK_AT : 0);
    setPhase(reduce ? 'asking' : 'running');
    setRun((r) => r + 1);
  };

  // Chat column: type the answer out.
  useEffect(() => {
    if (phase === 'idle' || reduce) return;
    if (typed >= fullChat) return;
    const t = window.setTimeout(() => setTyped((n) => Math.min(fullChat, n + 4)), 22);
    timers.current.push(t);
    return () => window.clearTimeout(t);
  }, [typed, phase, run, fullChat, reduce]);

  // Agent column: `step` = how many steps are revealed. Pauses at the question.
  useEffect(() => {
    if (phase !== 'running') return;
    if (step === ASK_AT && choice === null) {
      setPhase('asking');
      return;
    }
    if (step > steps.length) {
      setPhase('done');
      return;
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), 900);
    timers.current.push(t);
    return () => window.clearTimeout(t);
    // steps is rebuilt each render from tx; its length is constant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phase, choice, run]);

  const answer = (c: Exclude<Choice, null>) => {
    setChoice(c);
    if (reduce) {
      setStep(steps.length + 1);
      setPhase('done');
    } else setPhase('running');
  };

  const chatShown = (() => {
    const a = Math.min(typed, chatIntro.length);
    const b = Math.max(0, Math.min(typed - chatIntro.length, SNIPPET.length));
    const c = Math.max(0, typed - chatIntro.length - SNIPPET.length);
    return { intro: chatIntro.slice(0, a), code: SNIPPET.slice(0, b), outro: chatOutro.slice(0, c) };
  })();
  const chatDone = typed >= fullChat;

  const mood = phase === 'idle' ? 'calm' : phase === 'asking' ? 'think' : phase === 'done' ? 'happy' : 'wink';

  return (
    <Frame
      title={tx('یک درخواست، دو جواب: چت در برابر Agent', 'One request, two answers: chat vs agent')}
      hint={tx(
        'درخواست را برای هر دو بفرستید و ببینید آخر کار «چه کسی» باید بقیه را انجام دهد.',
        'Send the request to both and notice who has to do the rest at the end.',
      )}
      mood={mood}
      tint="var(--blush-soft)"
      footer={
        <button type="button" className={phase === 'idle' ? 'btn btn--primary' : 'btn btn--small'} onClick={start}>
          {phase === 'idle' ? tx('ارسال برای هر دو', 'Send to both') : tx('از اول', 'Replay')}
        </button>
      }
    >
      <div className="cva-request">
        <div className="cva-bubble-user">
          {tx(
            '«یک وب‌سایت ساده برای نانوایی‌ام بساز و آنلاینش کن.»',
            '"Make me a simple website for my bakery and put it online."',
          )}
        </div>
      </div>

      <div className="s2-split">
        {/* Chat */}
        <div className="s2-col">
          <div className="s2-col-head">
            <span className="s2-dot" style={{ background: 'var(--sky)' }} aria-hidden />
            {tx('Generative AI (چت)', 'Generative AI (chat)')}
          </div>
          {phase === 'idle' ? (
            <p className="w-muted" style={{ margin: 0 }}>
              {tx('منتظر درخواست شما…', 'Waiting for your request…')}
            </p>
          ) : (
            <div aria-live="polite" aria-busy={!chatDone}>
              <p className="cva-chat-text">{chatShown.intro}</p>
              {chatShown.code && <pre className="cva-snippet">{chatShown.code}</pre>}
              {chatShown.outro && (
                <p className="cva-chat-text" style={{ marginTop: 8 }}>
                  {chatShown.outro}
                </p>
              )}
            </div>
          )}
          <AnimatePresence>
            {chatDone && phase !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <p className="w-muted" style={{ margin: '4px 0 6px', fontWeight: 800 }}>
                  {tx('کارهایی که حالا با خود شماست:', 'Now it is all on you:')}
                </p>
                <div className="cva-todo">
                  <span>{tx('ذخیره فایل', 'save files')}</span>
                  <span>{tx('خرید Hosting', 'buy hosting')}</span>
                  <span>{tx('آپلود', 'upload')}</span>
                  <span>{tx('تنظیم DNS', 'set up DNS')}</span>
                  <span>{tx('پیدا کردن خطاها', 'find the bugs')}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Agent */}
        <div className="s2-col">
          <div className="s2-col-head">
            <span className="s2-dot" style={{ background: 'var(--mint)' }} aria-hidden />
            {tx('Agentic AI', 'Agentic AI')}
          </div>
          {phase === 'idle' ? (
            <p className="w-muted" style={{ margin: 0 }}>
              {tx('منتظر درخواست شما…', 'Waiting for your request…')}
            </p>
          ) : (
            <ul className="cva-feed" aria-live="polite">
              <AnimatePresence initial={false}>
                {steps.slice(0, step).map((s, i) => {
                  const isAsk = i === ASK_AT - 1;
                  const isCurrent = i === step - 1 && phase === 'running';
                  const waiting = isAsk && phase === 'asking';
                  const doneStep = !isCurrent && !waiting;
                  return (
                    <motion.li
                      key={`${run}-${i}`}
                      initial={{ opacity: 0, transform: 'translateY(6px)' }}
                      animate={{ opacity: 1, transform: 'translateY(0px)' }}
                      transition={{ duration: 0.25, ease: EASE }}
                    >
                      <span className={`cva-tick ${isCurrent ? 'is-run' : waiting ? 'is-ask' : ''}`} aria-hidden>
                        {isCurrent ? (
                          <span className="cva-spin" />
                        ) : waiting ? (
                          <b style={{ fontSize: 12 }}>?</b>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24">
                            <path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span>
                        <span className="cva-tool">{s.tool}</span> {s.text}
                        {isAsk && choice && doneStep && (
                          <span className="w-muted">
                            {' '}
                            {choice === 'home'
                              ? tx('(جواب شما: منو در صفحه اصلی)', '(you said: menu on the home page)')
                              : tx('(جواب شما: صفحه جدا برای منو)', '(you said: a separate menu page)')}
                          </span>
                        )}
                      </span>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}

          <AnimatePresence>
            {phase === 'asking' && (
              <motion.div
                className="cva-ask"
                initial={{ opacity: 0, transform: 'scale(0.96)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0.98)' }}
                transition={{ duration: 0.22, ease: EASE }}
                style={{ transformOrigin: 'top center' }}
              >
                <p style={{ margin: '0 0 8px', fontWeight: 800 }}>
                  {tx('Agent می‌پرسد: «منو را در صفحه اصلی بگذارم یا یک صفحه جدا؟»', 'The agent asks: "Should the menu go on the home page or on its own page?"')}
                </p>
                <div className="w-row">
                  <button type="button" className="btn btn--small btn--mint" onClick={() => answer('home')}>
                    {tx('در صفحه اصلی', 'On the home page')}
                  </button>
                  <button type="button" className="btn btn--small" onClick={() => answer('page')}>
                    {tx('صفحه جدا', 'Its own page')}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {phase === 'done' && (
              <motion.div
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.3, ease: EASE }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}
              >
                <Mascot size={40} mood="happy" follow={false} />
                <div>
                  <span className="cva-url">https://bakery.example.com</span>
                  <p className="w-muted" style={{ margin: '4px 0 0' }}>
                    {tx('«سایت آنلاین است. لطفاً نگاهی بیندازید و بگویید چه چیزی را عوض کنم.»', '"The site is live. Please take a look and tell me what to change."')}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {phase === 'done' && (
          <motion.p
            className="w-card"
            style={{ margin: '14px 0 0' }}
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            aria-live="polite"
          >
            {tx(
              'تفاوت در «انجام دادن» است: چت متن تحویل داد و بقیه کار را به شما سپرد؛ Agent با ابزارها کار را تا انتها برد و فقط جایی که تصمیم با شما بود، از شما پرسید. نقش شما از «اجراکننده» به «مدیر و بازبین» تغییر کرد.',
              'The difference is doing. The chat handed you text and left the rest to you; the agent used tools to finish the job and only asked you where the decision was yours. Your role moved from doer to director and reviewer.',
            )}
          </motion.p>
        )}
      </AnimatePresence>
    </Frame>
  );
}
