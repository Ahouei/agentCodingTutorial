import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { L } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * RD-07A · "Which builder fits me?" Four questions → a main path (Codex or Lovable)
 * with reasons, plus helper options (Claude Code, Grok Build, DeepSeek in an open-source agent).
 * Facts: docs/research/platforms.md. The recommendation is the course's judgment, not a fact.
 */

type QId = 'budget' | 'access' | 'comfort' | 'style';
type Answer = 0 | 1 | 2;

const QUESTIONS: { id: QId; q: L; opts: [L, L, L] }[] = [
  {
    id: 'budget',
    q: { fa: 'برای ابزار هوش مصنوعی چقدر بودجه ماهانه دارید؟', en: 'What monthly budget do you have for AI tools?' },
    opts: [
      { fa: 'فعلاً رایگان یا خیلی کم', en: 'Free, or very little for now' },
      { fa: 'یک اشتراک معمولی ماهانه', en: 'One regular monthly plan' },
      { fa: 'برای سرعت بیشتر، پول بیشتری می‌دهم', en: 'I will pay more for speed' },
    ],
  },
  {
    id: 'access',
    q: {
      fa: 'می‌توانید طبق شرایط خود این سرویس‌ها، در حساب OpenAI یا Lovable ثبت‌نام کنید و پرداخت انجام دهید؟',
      en: "Can you sign up and pay for OpenAI or Lovable accounts within those services' terms?",
    },
    opts: [
      { fa: 'بله، مشکلی نیست', en: 'Yes, no problem' },
      { fa: 'مطمئن نیستم', en: "I'm not sure" },
      { fa: 'نه، برایم ممکن نیست', en: "No, that isn't possible for me" },
    ],
  },
  {
    id: 'comfort',
    q: { fa: 'با GitHub و ترمینال چقدر راحتید؟', en: 'How comfortable are you with GitHub and the terminal?' },
    opts: [
      { fa: 'تا حالا کار نکرده‌ام', en: 'Never used them' },
      { fa: 'کمی؛ دارم یاد می‌گیرم', en: "A little; I'm learning" },
      { fa: 'راحتم', en: "I'm comfortable" },
    ],
  },
  {
    id: 'style',
    q: { fa: 'کدام سبک کار را بیشتر دوست دارید؟', en: 'Which way of working do you prefer?' },
    opts: [
      { fa: 'سازنده تصویری در مرورگر؛ همان لحظه نتیجه را ببینم', en: 'A visual builder in the browser; see results instantly' },
      { fa: 'یک Agent که روی Repository خودم کار کند', en: 'An agent that works on my own repository' },
      { fa: 'هنوز نمی‌دانم', en: "I don't know yet" },
    ],
  },
];

type Result = {
  main: 'codex' | 'lovable';
  blocked: boolean;
  reasons: L[];
};

function decide(a: Record<QId, Answer>): Result {
  let lovable = 0;
  let codex = 0;
  const reasons: L[] = [];
  // style
  if (a.style === 0) lovable += 3;
  if (a.style === 1) codex += 3;
  // comfort
  if (a.comfort === 0) lovable += 2;
  if (a.comfort === 2) codex += 2;
  if (a.comfort === 1) codex += 1;
  // budget: Codex is included in every ChatGPT plan (Cloud from Plus); Lovable credits pay for building and running.
  if (a.budget === 0) codex += 1;
  if (a.budget === 2) lovable += 1;

  const main: 'codex' | 'lovable' = lovable > codex ? 'lovable' : 'codex';
  const blocked = a.access === 2;

  if (main === 'lovable') {
    reasons.push({
      fa: 'از همان پیام اول یک سایت زنده و قابل دیدن تحویل می‌گیرید و با نوار ابزار Preview آن را مرتب می‌کنید.',
      en: 'You get a live, visible site from the first message and polish it with the preview toolbar.',
    });
    reasons.push({
      fa: 'Database، ورود کاربر و انتشار روی lovable.app از قبل آماده است؛ لازم نیست سرور یا Hosting بچینید.',
      en: 'Database, sign-in and publishing on lovable.app come built in; no server or hosting to set up.',
    });
    reasons.push({
      fa: 'کد با GitHub همگام می‌شود؛ هر وقت خواستید می‌توانید با Codex ادامه دهید یا روی Cloudflare منتشر کنید.',
      en: 'Code syncs with GitHub, so later you can continue with Codex or publish on Cloudflare.',
    });
  } else {
    reasons.push({
      fa: 'کد از روز اول در Repository خودتان است و Agent دقیقاً همان چیزی را تغییر می‌دهد که می‌خواهید.',
      en: 'The code lives in your own repository from day one, and the agent changes exactly what you ask.',
    });
    reasons.push({
      fa: 'Codex در همه پلن‌های ChatGPT هست؛ کارهای ابری (Codex Cloud) از پلن Plus به بالا.',
      en: 'Codex is in every ChatGPT plan; cloud tasks (Codex Cloud) start from Plus.',
    });
    reasons.push({
      fa: 'Hosting روی Cloudflare Workers برای شروع رایگان است و کنترل کامل دامنه و Database (D1) با خود شماست.',
      en: 'Hosting on Cloudflare Workers is free to start, and you fully control the domain and the database (D1).',
    });
  }
  if (a.access === 1) {
    reasons.push({
      fa: 'قبل از پرداخت، فهرست کشورهای پشتیبانی‌شده و شرایط استفاده هر سرویس را خودتان بخوانید.',
      en: "Before paying, read each service's supported-countries list and terms yourself.",
    });
  }
  return { main, blocked, reasons };
}

const HELPERS: { name: string; c: string; text: L }[] = [
  {
    name: 'Claude Code',
    c: 'var(--pc-claude)',
    text: {
      fa: 'Agent قوی Anthropic؛ همان مفاهیم AGENTS.md و Skills. گزینه خوبی برای بازبینی دوم یا جایگزین Codex.',
      en: "Anthropic's strong agent with the same AGENTS.md and skills ideas. Good as a second reviewer or a Codex alternative.",
    },
  },
  {
    name: 'Grok Build',
    c: 'var(--pc-grok)',
    text: {
      fa: 'Agent ترمینالی xAI که فعلاً برای امتحان رایگان است؛ Plan mode و AGENTS.md دارد. جدیدتر و کمتر آزموده.',
      en: "xAI's terminal agent, free to try for now, with plan mode and AGENTS.md. Newer and less proven.",
    },
  },
  {
    name: 'DeepSeek',
    c: 'var(--pc-deepseek)',
    text: {
      fa: 'مدل بسیار ارزان که داخل Agentهای متن‌باز مثل OpenCode، Cline یا Aider کار می‌کند؛ خودش سایت‌ساز یا Hosting ندارد.',
      en: 'A very low-cost model that runs inside open-source agents like OpenCode, Cline or Aider. No site builder or hosting of its own.',
    },
  },
];

export default function AgentPicker() {
  const { t, lang, path, setPath } = useApp();
  const tx = useTx();
  const lab = useLab();
  const [ans, setAns] = useState<Partial<Record<QId, Answer>>>({});
  const complete = QUESTIONS.every((q) => ans[q.id] !== undefined);
  const result = complete ? decide(ans as Record<QId, Answer>) : null;

  const markDone = lab.complete;
  useEffect(() => {
    if (complete) markDone();
  }, [complete, markDone]);

  const name = (p: 'codex' | 'lovable') => (p === 'codex' ? 'Codex' : 'Lovable');

  return (
    <Frame
      title={tx('کدام سازنده برای من مناسب است؟', 'Which builder fits me?')}
      goal={tx('به ۴ سؤال جواب دهید', 'Answer 4 questions')}
      tint="var(--sky-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setAns({})} disabled={Object.keys(ans).length === 0}>
            {tx('از اول', 'Start over')}
          </button>
          <span className="w-muted">
            {tx(`${num(Object.keys(ans).length, lang)} از ${num(QUESTIONS.length, lang)}`, `${Object.keys(ans).length} of ${QUESTIONS.length}`)}
          </span>
        </>
      }
    >
      <div className="s4">
        {QUESTIONS.map((q, i) => (
          <fieldset key={q.id} className="s4-q" style={{ border: '1.5px solid var(--line)', margin: 0 }}>
            <legend className="sr-only">{t(q.q)}</legend>
            <p className="s4-q-title" aria-hidden>
              <span className="s4-q-num">{num(i + 1, lang)}</span>
              {t(q.q)}
            </p>
            <div className="s4-opts">
              {q.opts.map((o, k) => (
                <button
                  key={k}
                  type="button"
                  className="s4-opt"
                  aria-pressed={ans[q.id] === k}
                  onClick={() => setAns((p) => ({ ...p, [q.id]: k as Answer }))}
                >
                  {t(o)}
                </button>
              ))}
            </div>
          </fieldset>
        ))}

        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              className="s4-result"
              initial={{ opacity: 0, transform: 'translateY(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              aria-live="polite"
            >
              <div className="s4-result-head">
                <Mascot size={52} mood={result.blocked ? 'think' : 'happy'} follow={false} />
                <div>
                  <span className="eyebrow">{tx('پیشنهاد دوره (نظر ما، نه یک قانون)', "The course's suggestion (our judgment, not a rule)")}</span>
                  <h4>
                    {result.blocked
                      ? tx('مسیر جایگزین: یک Agent متن‌باز با مدل DeepSeek', 'Alternative route: an open-source agent with a DeepSeek model')
                      : tx(`مسیر اصلی شما: ${name(result.main)}`, `Your main path: ${name(result.main)}`)}
                  </h4>
                </div>
              </div>

              {result.blocked ? (
                <ul className="s4-list">
                  <li>
                    {tx(
                      'OpenAI، Anthropic و Lovable ثبت‌نام از کشورهای خارج از فهرستشان را مجاز نمی‌دانند؛ دور زدن شرایطشان را توصیه نمی‌کنیم.',
                      "OpenAI, Anthropic and Lovable don't allow use from countries outside their lists; we don't advise working around their terms.",
                    )}
                  </li>
                  <li>
                    {tx(
                      'یک Agent متن‌باز (مثل OpenCode، Cline یا Aider) با API ارزان DeepSeek همان روش کار با Repository را به شما می‌دهد. شرایط DeepSeek را هم خودتان بررسی کنید.',
                      "An open-source agent (OpenCode, Cline or Aider) with DeepSeek's low-cost API gives you the same repository workflow. Check DeepSeek's terms yourself too.",
                    )}
                  </li>
                  <li>
                    {tx(
                      'در این دوره، قدم‌های «مسیر Codex» برای شما مناسب‌ترند؛ چون آن‌ها هم روی Repository و Cloudflare کار می‌کنند.',
                      'In this course, the "Codex path" steps fit you best, since they also work on a repository and Cloudflare.',
                    )}
                  </li>
                </ul>
              ) : (
                <ul className="s4-list">
                  {result.reasons.map((r, i) => (
                    <li key={i}>{t(r)}</li>
                  ))}
                </ul>
              )}

              <p className="w-muted" style={{ margin: 0 }}>
                {tx('کمک‌های جانبی، برای پر کردن جاهای خالی:', 'Helpers, to fill the gaps:')}
              </p>
              <div className="s4-helpers">
                {HELPERS.map((h) => (
                  <div key={h.name} className="s4-helper" style={{ borderInlineStart: `4px solid ${h.c}` }}>
                    <b className="ltr">{h.name}</b>
                    {t(h.text)}
                  </div>
                ))}
              </div>

              <div className="w-row">
                {(() => {
                  const target: 'codex' | 'lovable' = result.blocked ? 'codex' : result.main;
                  const on = path === target;
                  return (
                    <button type="button" className={`btn btn--small ${on ? 'btn--mint' : 'btn--primary'}`} onClick={() => setPath(target)} aria-pressed={on}>
                      {on
                        ? tx(`دوره روی مسیر ${name(target)} است`, `The course follows the ${name(target)} path`)
                        : tx(`در دوره، مسیر ${name(target)} را نشانم بده`, `Show me the ${name(target)} path in the course`)}
                    </button>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Frame>
  );
}
