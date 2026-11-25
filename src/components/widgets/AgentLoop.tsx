import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { DUR, EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set2.css';

const EASE = EASE_OUT;
const MOVE = EASE_IN_OUT;

type PhaseId = 'plan' | 'act' | 'observe' | 'adjust';
const PHASES: PhaseId[] = ['plan', 'act', 'observe', 'adjust'];
const TINT: Record<PhaseId, string> = {
  plan: 'var(--sky)',
  act: 'var(--butter)',
  observe: 'var(--mint)',
  adjust: 'var(--blush)',
};

type Pair = [fa: string, en: string];
type Step = { text: Pair; bad?: boolean; good?: boolean };

/** Scenario text lives here as fa/en pairs; the log stores only lap + phase and translates at render (QA-12). */
const LAPS: Record<PhaseId, Step>[] = [
  {
    plan: {
      text: [
        'درخواست و کد کافه سحر را می‌خواند. برنامه: فرم رزرو با نام، تلفن، تاریخ و تعداد نفر؛ یک Endpoint در Worker که رزرو را در D1 ذخیره کند. برنامه را به شما نشان می‌دهد.',
        "Reads the request and Café Sahar's code. Plan: a booking form with name, phone, date and party size; a Worker endpoint that saves it to D1. Shows you the plan.",
      ],
    },
    act: {
      text: ['فرم رزرو را می‌سازد، مسیر POST /api/bookings را اضافه می‌کند و جدول bookings را در D1 می‌سازد.', 'Writes the booking form, adds POST /api/bookings and creates the bookings table in D1.'],
    },
    observe: {
      text: ['تست‌ها را اجرا می‌کند: یک تست رد شد! فرم رزرو برای دیروز را هم قبول می‌کند.', 'Runs the tests: one fails! The form accepts a booking for yesterday.'],
      bad: true,
    },
    adjust: {
      text: ['خطا را می‌خواند و تصمیم می‌گیرد تاریخ را در سمت سرور (Worker) هم بررسی کند.', 'Reads the error and decides to check the date on the server (the Worker) too.'],
    },
  },
  {
    plan: { text: ['برنامه اصلاح: بررسی تاریخ در Worker، و یک تست برای همین مورد.', 'Plans the fix: date validation in the Worker, plus a test for it.'] },
    act: { text: ['Worker را ویرایش می‌کند و تست جدید را می‌نویسد.', 'Edits the Worker and writes the new test.'] },
    observe: {
      text: ['دوباره تست می‌گیرد: همه تست‌ها سبز. صفحه را در مرورگر موبایل هم باز می‌کند: رزرو ثبت می‌شود.', 'Runs the tests again: all green. Opens the page in a mobile browser too: the booking goes through.'],
      good: true,
    },
    adjust: { text: ['چیزی برای اصلاح نمانده. هدف محقق شد.', 'Nothing left to fix. The goal is met.'] },
  },
];

type LogLine = { lap: number; phase: PhaseId };

export default function AgentLoop() {
  const { lang } = useApp();
  const tx = useTx();
  const reduce = useReducedMotion();
  const rtl = lang === 'fa';

  const [lap, setLap] = useState(0); // laps completed
  const [ticks, setTicks] = useState(0); // phases elapsed overall (drives Bit's angle)
  const [running, setRunning] = useState(false);
  const [log, setLog] = useState<LogLine[]>([]);
  const [finished, setFinished] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const label: Record<PhaseId, [string, string]> = {
    plan: [tx('برنامه', 'Plan'), tx('قدم بعدی چیست؟', "what's next?")],
    act: [tx('اقدام', 'Act'), tx('با ابزارها', 'use tools')],
    observe: [tx('مشاهده', 'Observe'), tx('تست و نتیجه', 'check results')],
    adjust: [tx('اصلاح', 'Adjust'), tx('تصمیم بعدی', 'decide')],
  };

  const runLap = () => {
    if (running || lap >= LAPS.length) return;
    const thisLap = lap;
    setRunning(true);
    PHASES.forEach((p, i) => {
      const t = window.setTimeout(
        () => {
          setTicks((n) => n + (i === 0 && thisLap === 0 ? 0 : 1));
          setLog((l) => [...l, { lap: thisLap + 1, phase: p }]);
          if (i === PHASES.length - 1) {
            setLap(thisLap + 1);
            setRunning(false);
          }
        },
        reduce ? 0 : i * 1100,
      );
      timers.current.push(t);
    });
  };

  const { complete } = useLab();
  const finish = () => {
    setTicks((n) => n + 1);
    setFinished(true);
    complete();
  };

  const reset = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    setLap(0);
    setTicks(0);
    setRunning(false);
    setLog([]);
    setFinished(false);
  };

  const current: PhaseId = PHASES[ticks % 4];
  const angle = ticks * 90 * (rtl ? -1 : 1);
  const stepOf = (l: LogLine) => LAPS[l.lap - 1][l.phase];
  const lastBad = log.length > 0 && !!stepOf(log[log.length - 1]).bad;

  // Node positions on the ring. RTL mirrors the direction of travel.
  const pos: Record<PhaseId, { x: string; y: string }> = {
    plan: { x: '50%', y: '13%' },
    act: { x: rtl ? '13%' : '87%', y: '50%' },
    observe: { x: '50%', y: '87%' },
    adjust: { x: rtl ? '87%' : '13%', y: '50%' },
  };

  const checkpoint =
    log.length === 0
      ? -1
      : finished
        ? 2
        : log.length === 1
          ? 0
          : -1;

  const checkpoints = [
    tx('برنامه را قبل از کار بزرگ تأیید کنید.', 'Approve the plan before big work starts.'),
    tx('وقتی چیزی مبهم است، Agent می‌پرسد و شما تصمیم می‌گیرید.', 'When something is unclear, the agent asks and you decide.'),
    tx('نتیجه (Preview یا Pull Request) را قبل از انتشار بازبینی کنید.', 'Review the result (preview or pull request) before it goes live.'),
  ];

  const button = finished ? null : lap < LAPS.length ? (
    <button type="button" className="btn btn--primary" onClick={runLap} disabled={running}>
      {running ? tx('در حال اجرا…', 'Running…') : lap === 0 ? tx('اجرای دور اول', 'Run lap 1') : tx('اجرای دور دوم', 'Run lap 2')}
    </button>
  ) : (
    <button type="button" className="btn btn--mint" onClick={finish}>
      {tx('پایان: تحویل به شما', 'Finish: hand it to you')}
    </button>
  );

  return (
    <Frame
      title={tx('حلقه Agent: «فرم رزرو میز کافه سحر»', 'The agent loop: "Café Sahar\'s booking form"')}
      goal={tx('هر دو دور را اجرا کنید و کار را تحویل بگیرید', 'Run both laps and take the hand-off')}
      hint={tx('ببینید وقتی تستی رد می‌شود، Agent چطور خودش برمی‌گردد و درستش می‌کند.', 'Watch how the agent loops back on its own when a test fails.')}
      mood={finished ? 'happy' : lastBad ? 'wow' : running ? 'think' : 'calm'}
      tint="var(--mint-soft)"
      footer={
        <>
          <span className="w-row">
            {(log.length > 0 || finished) && (
              <button type="button" className="btn btn--small btn--ghost" onClick={reset}>
                {tx('شروع دوباره', 'Start over')}
              </button>
            )}
            <span className="w-muted">
              {tx('دور', 'Lap')} {num(Math.min(lap + (running ? 1 : 0), 2), lang)} {tx('از', 'of')} {num(2, lang)}
            </span>
          </span>
          {button}
        </>
      }
    >
      <div className="al-wrap">
        <div className="al-ring" role="img" aria-label={tx('حلقه برنامه، اقدام، مشاهده، اصلاح', 'Loop of plan, act, observe, adjust')}>
          <div className="al-track" aria-hidden />
          {/* direction arrows */}
          <svg className="al-spinner" viewBox="0 0 100 100" aria-hidden style={{ inset: '13%', overflow: 'visible' }}>
            {[45, 135, 225, 315].map((a) => (
              <g key={a} transform={`rotate(${rtl ? -a : a} 50 50)`}>
                <path d="M54 0 l-4 -3 v6 Z" transform={rtl ? 'translate(100 0) scale(-1 1)' : undefined} fill="var(--ink-3)" />
              </g>
            ))}
          </svg>
          {PHASES.map((p) => {
            const on = (log.length > 0 || running) && current === p && !finished;
            return (
              <div
                key={p}
                className={`al-node ${on ? 'is-on' : ''}`}
                style={{ left: pos[p].x, top: pos[p].y, background: on ? TINT[p] : 'var(--card)', color: on ? '#2a211b' : undefined }}
              >
                <span>{label[p][0]}</span>
                <small style={on ? { color: '#4a3d33' } : undefined}>{label[p][1]}</small>
              </div>
            );
          })}
          {/* Bit orbits the inner circle; the wrapper rotates, Bit counter-rotates to stay upright. */}
          <motion.div
            className="al-spinner"
            style={{ inset: '28%' }}
            animate={{ rotate: angle }}
            transition={{ duration: reduce ? 0 : 0.8, ease: MOVE }}
            aria-hidden
          >
            <motion.div className="al-bit" animate={{ rotate: -angle }} transition={{ duration: reduce ? 0 : 0.8, ease: MOVE }}>
              <Mascot size={40} mood={finished ? 'happy' : lastBad ? 'wow' : 'think'} follow={false} />
            </motion.div>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gap: 12, minWidth: 0 }}>
          {log.length === 0 && !running ? (
            <p className="w-card" style={{ margin: 0 }}>
              {tx(
                'درخواست: «برای کافه سحر یک فرم رزرو میز بساز که رزروها را ذخیره کند.» Agent این هدف را در چند دور از حلقه پیش می‌برد، نه در یک حرکت.',
                'The request: "Add a table booking form to Café Sahar that saves bookings." The agent gets there in several laps of the loop, not in one move.',
              )}
            </p>
          ) : (
            <ul className="al-log" aria-live="polite">
              <AnimatePresence initial={false}>
                {log.map((l, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, transform: 'translateY(6px)' }}
                    animate={{ opacity: 1, transform: 'translateY(0px)' }}
                    transition={{ duration: DUR.ui, ease: EASE }}
                  >
                    <span className="al-tag" style={{ background: TINT[l.phase] }}>
                      {label[l.phase][0]}
                    </span>
                    <span style={stepOf(l).bad ? { color: 'var(--coral-ink)', fontWeight: 800 } : stepOf(l).good ? { color: 'var(--mint-ink)', fontWeight: 800 } : undefined}>
                      {tx(...stepOf(l).text)}
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}

          <AnimatePresence>
            {finished && (
              <motion.div
                className="al-check"
                initial={{ opacity: 0, transform: 'translateY(6px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: DUR.reveal, ease: EASE }}
              >
                <span aria-hidden>✋</span>
                <span>
                  {tx(
                    'از حلقه خارج می‌شود: یک Pull Request با خلاصه تغییرات و لینک Preview می‌سازد و از شما می‌خواهد بازبینی کنید. تا شما تأیید نکنید، چیزی روی سایت اصلی نمی‌رود.',
                    'It exits the loop: opens a pull request with a summary and a preview link, and asks you to review. Nothing reaches the live site until you approve.',
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <p style={{ margin: '0 0 8px', fontWeight: 900 }}>{tx('جاهایی که شما در حلقه هستید (Human-in-the-loop)', 'Where you stay in the loop (human-in-the-loop)')}</p>
        <ol className="al-log" style={{ listStyle: 'none' }}>
          {checkpoints.map((c, i) => (
            <li key={i}>
              <span className="al-tag" style={{ background: checkpoint === i ? 'var(--coral)' : 'var(--paper-2)' }}>
                {tx(['۱', '۲', '۳'][i], String(i + 1))}
              </span>
              <span style={checkpoint === i ? { fontWeight: 800 } : undefined}>{c}</span>
            </li>
          ))}
        </ol>
      </div>
    </Frame>
  );
}
