import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { CopyButton } from '../blocks/CopyButton';
import { Mascot } from '../Mascot';
import { Frame } from './Frame';
import './set2.css';

const EASE = [0.23, 1, 0.32, 1] as const;

type Ing = {
  id: string;
  label: [string, string];
  line: string;
  weight: number;
  /** What the agent will guess when this ingredient is missing. */
  guess: [string, string];
};

const INGREDIENTS: Ing[] = [
  {
    id: 'context',
    label: ['زمینه (Context)', 'Context'],
    line: 'Context: I run a small bakery in Shiraz and I have no coding experience. The repo is empty and Cloudflare is already connected.',
    weight: 14,
    guess: ['حدس می‌زند سایت مال چه کسب‌وکاری است؛ شاید یک استارتاپ فناوری!', 'Guesses what business this is for. A tech startup, maybe?'],
  },
  {
    id: 'goal',
    label: ['هدف (Goal)', 'Goal'],
    line: 'Goal: build a one-page website that shows our menu, opening hours and location, and gets people to order cakes on WhatsApp.',
    weight: 18,
    guess: ['نمی‌داند سایت قرار است چه کاری انجام دهد؛ یک صفحه کلی و بی‌هدف می‌سازد.', 'Has no idea what the site is for, so it builds a generic page with no purpose.'],
  },
  {
    id: 'audience',
    label: ['مخاطب (Audience)', 'Audience'],
    line: 'Audience: local customers, mostly on mobile phones, reading in Persian.',
    weight: 10,
    guess: ['برای کاربر انگلیسی‌زبان روی کامپیوتر طراحی می‌کند.', 'Designs for English readers on a desktop.'],
  },
  {
    id: 'constraints',
    label: ['محدودیت‌ها (Constraints)', 'Constraints'],
    line: 'Constraints: Cloudflare Workers free plan, static site, no database for now, right-to-left Persian layout, fast on slow mobile data.',
    weight: 14,
    guess: ['ممکن است یک Framework سنگین و پایگاه‌داده‌ای انتخاب کند که اصلاً لازم ندارید.', 'May pick a heavy framework and a database you do not need at all.'],
  },
  {
    id: 'done',
    label: ['معیار پایان (Done means)', 'Acceptance criteria'],
    line: 'Done means: looks right on a 360px-wide phone, all text is in Persian, the WhatsApp button works, and it is deployed to a preview URL.',
    weight: 14,
    guess: ['هر وقت خودش فکر کند کافی است، کار را تمام شده اعلام می‌کند.', 'Declares victory whenever it feels finished.'],
  },
  {
    id: 'plan',
    label: ['اول برنامه، بعد تأیید', 'Plan first, wait for approval'],
    line: 'First, show me your plan (sections, design direction, tech choices) and wait for my approval before writing any code.',
    weight: 12,
    guess: ['بی‌درنگ شروع به کدنویسی می‌کند؛ نتیجه را فقط در پایان می‌بینید.', 'Starts coding right away; you only see the result at the very end.'],
  },
  {
    id: 'ask',
    label: ['اگر مبهم بود، بپرس', 'Ask me if unclear'],
    line: 'If anything is unclear, ask me up to 3 questions before you start.',
    weight: 8,
    guess: ['جاهای خالی را با فرض‌های خودش پر می‌کند.', 'Fills every gap with its own assumptions.'],
  },
  {
    id: 'format',
    label: ['قالب گزارش', 'Output format'],
    line: 'When you finish, reply with: a short plain-language summary, the list of files you changed, and the preview link.',
    weight: 8,
    guess: ['یک گزارش طولانی و فنی می‌دهد که سخت است بفهمید چه شد.', 'Replies with a long technical wall of text that is hard to follow.'],
  },
];

const VAGUE = 'Make me a website.';

export default function PromptLab() {
  const { lang } = useApp();
  const tx = useTx();
  const reduce = useReducedMotion();
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [last, setLast] = useState<string | null>(null);

  const flip = (id: string) => {
    setOn((p) => ({ ...p, [id]: !p[id] }));
    setLast(id);
  };

  const active = INGREDIENTS.filter((i) => on[i.id]);
  const clarity = Math.min(100, 8 + active.reduce((n, i) => n + i.weight, 0));
  const lines = [...(on.goal ? [] : [VAGUE]), ...active.map((i) => i.line)];
  const prompt = lines.join('\n');
  const missing = INGREDIENTS.filter((i) => !on[i.id]);

  const mood = clarity >= 100 ? 'wink' : clarity >= 70 ? 'happy' : clarity >= 35 ? 'calm' : 'think';
  const tier =
    clarity >= 100
      ? tx(
          'دقیق: یک برنامه برای سایت یک‌صفحه‌ای فارسی و موبایل‌محور پیشنهاد می‌دهد، اگر سؤالی دارد می‌پرسد و منتظر تأیید شما می‌ماند.',
          'Precise: it proposes a plan for a Persian, mobile-first one-pager, asks anything it needs to, and waits for your go-ahead.',
        )
      : clarity >= 70
        ? tx('خیلی نزدیک! فقط چند جای کوچک را هنوز حدس می‌زند:', 'Close! It still has to guess a few small things:')
        : clarity >= 35
          ? tx('بهتر شد، ولی هنوز زیاد حدس می‌زند:', 'Better, but it is still guessing a lot:')
          : tx('Agent کار می‌کند، اما تقریباً همه‌چیز را حدس می‌زند:', 'The agent will work, but it is guessing almost everything:');

  return (
    <Frame
      title={tx('آزمایشگاه Prompt: از مبهم تا دقیق', 'Prompt lab: from vague to precise')}
      hint={tx(
        'مواد اولیه را یکی‌یکی اضافه کنید و ببینید Prompt و رفتار احتمالی Agent چطور عوض می‌شود.',
        'Add ingredients one by one and watch the prompt, and the agent’s likely behaviour, change.',
      )}
      mood={mood}
      tint="var(--sky-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small" onClick={() => setOn(Object.fromEntries(INGREDIENTS.map((i) => [i.id, true])))}>
            {tx('همه را اضافه کن', 'Add everything')}
          </button>
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setOn({})}>
            {tx('برگرد به مبهم', 'Back to vague')}
          </button>
        </>
      }
    >
      <div className="pl-toggles" role="group" aria-label={tx('مواد اولیه Prompt', 'Prompt ingredients')}>
        {INGREDIENTS.map((i) => (
          <button key={i.id} type="button" className="pl-tog" aria-pressed={!!on[i.id]} onClick={() => flip(i.id)}>
            <span className="pl-plus" aria-hidden>
              <svg width="12" height="12" viewBox="0 0 24 24">
                <path d="M12 5v14M5 12h14" stroke="#2a211b" strokeWidth="3.2" strokeLinecap="round" />
              </svg>
            </span>
            {tx(...i.label)}
          </button>
        ))}
      </div>

      <div className="pl-meter-row" aria-live="polite">
        <Mascot size={44} mood={mood} follow={false} />
        <div style={{ flex: 1 }}>
          <div className="w-row" style={{ justifyContent: 'space-between', fontWeight: 900, fontSize: 14 }}>
            <span>{tx('میزان وضوح', 'Clarity')}</span>
            <span>
              {num(clarity, lang)}
              {tx('٪', '%')}
            </span>
          </div>
          <div className="pl-meter" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clarity} aria-label={tx('میزان وضوح', 'Clarity')}>
            <motion.span
              initial={false}
              animate={{ transform: `scaleX(${clarity / 100})` }}
              transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
            />
          </div>
        </div>
      </div>

      <div className="pl-prompt">
        <div className="pl-prompt-head">
          <span style={{ flex: 1 }}>{tx('Prompt شما', 'Your prompt')}</span>
          <CopyButton text={prompt} />
        </div>
        <div className="pl-lines">
          <AnimatePresence initial={false} mode="popLayout">
            {lines.map((l) => {
              const ing = INGREDIENTS.find((i) => i.line === l);
              return (
                <motion.div
                  key={ing?.id ?? 'vague'}
                  layout={!reduce}
                  className={`pl-line ${ing && ing.id === last ? 'is-new' : ''}`}
                  initial={{ opacity: 0, transform: 'translateY(-6px)', filter: 'blur(3px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
                  exit={{ opacity: 0, transform: 'translateY(-4px)', filter: 'blur(3px)' }}
                  transition={{ duration: 0.25, ease: EASE }}
                  style={!ing ? { color: 'var(--ink-3)', fontStyle: 'italic' } : undefined}
                >
                  {l}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-card" style={{ marginTop: 14 }} aria-live="polite">
        <p style={{ margin: 0, fontWeight: 900 }}>{tx('احتمالاً Agent چه می‌کند؟', 'What will the agent probably do?')}</p>
        <p style={{ margin: '4px 0 0' }}>{tier}</p>
        {missing.length > 0 && (
          <ul className="pl-guess">
            {missing.slice(0, 3).map((m) => (
              <li key={m.id}>
                <span aria-hidden style={{ color: 'var(--coral-ink)', fontWeight: 900 }}>
                  ?
                </span>
                <span>{tx(...m.guess)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {lang === 'fa' && (
        <p className="w-muted" style={{ margin: '12px 0 0' }}>
          این Prompt را انگلیسی نوشتیم چون برای اصطلاحات فنی دقیق‌تر است، اما Agentها فارسی را هم خوب می‌فهمند. اگر راحت‌ترید، همین مواد اولیه را فارسی بنویسید؛ مهم «مواد» است، نه زبان.
        </p>
      )}
    </Frame>
  );
}
