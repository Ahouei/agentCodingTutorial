import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import type { Block, L, QuizItem, Tone } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { DUR, EASE_OUT } from '../../lib/motion';
import { ErrorBoundary } from '../ErrorBoundary';
import { Mascot } from '../Mascot';
import { WIDGETS } from '../widgets';
import { LabContext } from '../widgets/Frame';
import { CopyButton } from './CopyButton';
import { TermScope } from './glossaryCtx';
import { Rich } from './Rich';
import './blocks.css';

/** Reveal for things that are new to the eye (headings, labs, quizzes): a short lift, no blur (RD-08). */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(8px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: DUR.reveal, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export type BlockCtx = { slug: string; quizKey?: string; owner?: string };

export function BlockView({ block, ctx }: { block: Block; ctx?: BlockCtx }) {
  const { t, lang } = useApp();
  const tx = useTx();
  const scoped = (node: ReactNode) => (ctx?.owner ? <TermScope.Provider value={ctx.owner}>{node}</TermScope.Provider> : node);

  switch (block.type) {
    case 'p':
      return scoped(
        <p className="b-p">
          <Rich text={t(block.text)} />
        </p>,
      );
    case 'h':
      return (
        <h3 className="b-h">
          <Rich text={t(block.text)} />
        </h3>
      );
    case 'callout':
      return scoped(<Callout tone={block.tone} title={block.title} text={block.text} />);
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return scoped(
        <Tag className={`b-list ${block.ordered ? 'is-ordered' : ''}`}>
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={t(it)} />
            </li>
          ))}
        </Tag>,
      );
    }
    case 'steps':
      return scoped(<Steps items={block.items} />);
    case 'terms':
      return (
        <dl className="b-terms">
          {block.items.map((it) => (
            <div key={it.term} className="b-term" id={`term-${it.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
              <dt className="ltr">{it.term}</dt>
              <dd>
                <Rich text={t(it.def)} />
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'compare':
      return (
        <div className="b-table-wrap sticker" role="region" tabIndex={0} aria-label={t(block.headers[0]) || tx('جدول مقایسه', 'Comparison table')}>
          <table className="b-table">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} scope="col">
                    {t(h) ? <Rich text={t(h)} /> : <span className="sr-only">{tx('مورد', 'Item')}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row">
                        <Rich text={t(cell)} />
                      </th>
                    ) : (
                      <td key={c}>
                        <Rich text={t(cell)} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'prompt':
      return <PromptCard title={block.title} text={block.text} />;
    case 'code':
      return <CodeBlock lang={block.lang} code={block.code} caption={block.caption} />;
    case 'widget': {
      const W = WIDGETS[block.id];
      return (
        <div className="b-widget">
          <ErrorBoundary scope="lab" lang={lang} resetKey={block.id}>
            <LabContext.Provider value={{ id: block.id }}>
              <Suspense fallback={<div className="b-widget-skeleton sticker" />}>
                <W />
              </Suspense>
            </LabContext.Provider>
          </ErrorBoundary>
        </div>
      );
    }
    case 'quiz':
      return <QuizCard item={block} quizKey={ctx?.quizKey ?? `${ctx?.slug ?? 'x'}:q`} />;
    case 'path':
      return <PathBlock block={block} ctx={ctx} />;
    case 'review':
      return <Review title={block.title} items={block.items} slug={ctx?.slug ?? 'x'} />;
    case 'links':
      return (
        <ul className="b-links">
          {block.items.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noreferrer" className="chip">
                <span className="ltr">{l.label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className="b-ext">
                  <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="sr-only">{tx('(در برگه جدید)', '(opens in a new tab)')}</span>
              </a>
            </li>
          ))}
        </ul>
      );
  }
}

/* ───────── Codex / Lovable path ───────── */

function PathBlock({ block, ctx }: { block: Extract<Block, { type: 'path' }>; ctx?: BlockCtx }) {
  const { path, setPath } = useApp();
  const tx = useTx();
  const blocks = path === 'lovable' ? block.lovable : block.codex;
  const id = useId();
  return (
    <div className={`b-path is-${path}`}>
      <div className="b-path-head">
        <span className="b-path-label">{tx('مسیر ساخت شما', 'Your build path')}</span>
        <div className="b-path-switch" role="group" aria-label={tx('انتخاب مسیر ساخت', 'Choose build path')}>
          {(['codex', 'lovable'] as const).map((p) => (
            <button key={p} type="button" aria-pressed={path === p} aria-controls={id} onClick={() => setPath(p)}>
              <PathGlyph p={p} />
              {p === 'codex' ? 'Codex' : 'Lovable'}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          id={id}
          className="b-path-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.ui, ease: EASE_OUT }}
        >
          {blocks.map((b, i) => (
            <BlockView key={i} block={b} ctx={ctx ? { ...ctx, owner: `${ctx.owner}:${path}:${i}`, quizKey: undefined } : undefined} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function PathGlyph({ p }: { p: 'codex' | 'lovable' }) {
  return p === 'codex' ? (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor" />
    </svg>
  );
}

/* ───────── Callouts, steps, prompt, code ───────── */

const TONE_LABEL: Record<Tone, L> = {
  why: { fa: 'چرا؟', en: 'Why it matters' },
  tip: { fa: 'نکته', en: 'Tip' },
  warn: { fa: 'حواستان باشد', en: 'Heads up' },
  fix: { fa: 'تصور رایج، تصحیح‌شده', en: 'Common mix-up, corrected' },
};

function Callout({ tone, title, text }: { tone: Tone; title?: L; text: L }) {
  const { t } = useApp();
  return (
    <aside className={`b-callout tone-${tone}`}>
      <div className="b-callout-badge">
        <ToneGlyph tone={tone} />
        <span>{t(TONE_LABEL[tone])}</span>
      </div>
      {title && (
        <p className="b-callout-title">
          <Rich text={t(title)} />
        </p>
      )}
      <p className="b-callout-text">
        <Rich text={t(text)} />
      </p>
    </aside>
  );
}

function ToneGlyph({ tone }: { tone: Tone }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      {tone === 'why' && (
        <>
          <circle cx="12" cy="12" r="9" {...common} />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01" {...common} />
        </>
      )}
      {tone === 'tip' && <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z" {...common} />}
      {tone === 'warn' && <path d="M12 4 2.8 19.5h18.4ZM12 10v4M12 17h.01" {...common} />}
      {tone === 'fix' && <path d="m4 12.5 5 5L20 6.5" {...common} />}
    </svg>
  );
}

function Steps({ items }: { items: { title: L; text: L }[] }) {
  const { t, lang } = useApp();
  return (
    <ol className="b-steps">
      {items.map((s, i) => (
        <li key={i} className="b-step">
          <span className="b-step-num" aria-hidden>
            {num(i + 1, lang)}
          </span>
          <div>
            <p className="b-step-title">
              <Rich text={t(s.title)} />
            </p>
            <p className="b-step-text">
              <Rich text={t(s.text)} />
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function PromptCard({ title, text }: { title: L; text: L }) {
  const { t } = useApp();
  const tx = useTx();
  const body = t(text);
  const isLatin = !/[؀-ۿ]/.test(body);
  return (
    <figure className="b-prompt sticker">
      <figcaption className="b-prompt-head">
        <span className="b-prompt-avatar" aria-hidden>
          <Mascot size={30} mood="wink" follow={false} />
        </span>
        <span>
          <span className="eyebrow">{tx('Prompt آماده برای Agent شما', 'Ready-to-paste prompt')}</span>
          <span className="b-prompt-title">
            <Rich text={t(title)} />
          </span>
        </span>
        <CopyButton text={body} />
      </figcaption>
      <pre className="b-prompt-body" dir={isLatin ? 'ltr' : 'auto'} tabIndex={0} aria-label={t(title)}>
        {body}
      </pre>
    </figure>
  );
}

function CodeBlock({ lang: codeLang, code, caption }: { lang: string; code: string; caption?: L }) {
  const { t } = useApp();
  const tx = useTx();
  return (
    <figure className="b-code">
      <div className="b-code-head">
        <span className="b-code-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="b-code-lang ltr">{codeLang}</span>
        <CopyButton text={code} className="btn btn--small btn--ghost b-code-copy" />
      </div>
      <pre dir="ltr" tabIndex={0} aria-label={caption ? t(caption) : tx(`نمونه کد ${codeLang}`, `${codeLang} code`)}>
        <code>{code}</code>
      </pre>
      {caption && (
        <figcaption className="b-code-cap">
          <Rich text={t(caption)} />
        </figcaption>
      )}
    </figure>
  );
}

/* ───────── Quiz (RD-06): remembers the answer, explains every option ───────── */

export function QuizCard({ item, quizKey, eyebrow, compact }: { item: QuizItem; quizKey: string; eyebrow?: string; compact?: boolean }) {
  const { t, lang, quizzes, answerQuiz } = useApp();
  const tx = useTx();
  const qid = useId();
  const rec = quizzes[quizKey];
  const picked = rec ? rec.picked : null;
  const correct = picked === item.answer;
  const letters = lang === 'fa' ? ['الف', 'ب', 'ج', 'د', 'ه'] : ['A', 'B', 'C', 'D', 'E'];
  // Bit reacts out loud for a moment after each answer (not for answers restored from storage).
  const [talk, setTalk] = useState(false);
  const firstPick = useRef(picked);
  useEffect(() => {
    if (picked === null || picked === firstPick.current) return;
    firstPick.current = null;
    setTalk(true);
    const tm = window.setTimeout(() => setTalk(false), 1400);
    return () => window.clearTimeout(tm);
  }, [picked]);

  return (
    <div className={`b-quiz sticker ${compact ? 'is-compact' : ''}`}>
      <div className="b-quiz-head">
        <Mascot size={compact ? 44 : 54} mood={picked === null ? 'think' : correct ? 'happy' : 'wow'} follow={false} talking={talk} />
        <div>
          <span className="eyebrow">{eyebrow ?? tx('یک سؤال کوچک', 'Quick check')}</span>
          <p className="b-quiz-q" id={qid}>
            <Rich text={t(item.q)} />
          </p>
        </div>
      </div>
      <div className="b-quiz-options" role="group" aria-labelledby={qid}>
        {item.options.map((o, i) => {
          const state = picked === null ? '' : i === item.answer ? 'is-right' : i === picked ? 'is-wrong' : 'is-dim';
          return (
            <motion.button
              key={i}
              type="button"
              aria-pressed={picked === i}
              className={`b-quiz-opt ${state}`}
              onClick={() => answerQuiz(quizKey, { picked: i, correct: i === item.answer })}
              animate={picked === i && i !== item.answer ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="b-quiz-letter" aria-hidden>
                {letters[i] ?? i + 1}
              </span>
              <span className="b-quiz-text">
                <Rich text={t(o)} />
                {picked !== null && item.why?.[i] && (
                  <span className="b-quiz-why">
                    <Rich text={t(item.why[i])} />
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence initial={false}>
        {picked !== null && (
          <motion.div
            key="explain"
            className={`b-quiz-explain ${correct ? 'ok' : 'no'}`}
            initial={{ opacity: 0, transform: 'translateY(-6px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            aria-live="polite"
          >
            <strong>{correct ? tx('آفرین! درست است.', 'Yes! That is right.') : tx('نه دقیقاً.', 'Not quite.')}</strong> <Rich text={t(item.explain)} />
            {!correct && <span className="b-quiz-retry-note"> {tx('می‌توانید گزینه دیگری را امتحان کنید.', 'You can try another option.')}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Review({ title, items, slug }: { title: L; items: QuizItem[]; slug: string }) {
  const { t, lang, quizzes } = useApp();
  const tx = useTx();
  const answered = items.filter((_, i) => quizzes[`${slug}:r${i}`]).length;
  const right = items.filter((_, i) => quizzes[`${slug}:r${i}`]?.correct).length;
  return (
    <section className="b-review" aria-label={t(title)}>
      <div className="b-review-head">
        <Mascot size={64} mood={answered === items.length ? 'happy' : 'think'} follow={false} />
        <div>
          <span className="eyebrow">{tx('مرور', 'Review')}</span>
          <h3 className="b-review-title">
            <Rich text={t(title)} />
          </h3>
          <p className="b-review-score" aria-live="polite">
            {tx(
              `${num(answered, lang)} از ${num(items.length, lang)} جواب داده شده · ${num(right, lang)} درست`,
              `${answered} of ${items.length} answered · ${right} right`,
            )}
          </p>
        </div>
      </div>
      <div className="b-review-list">
        {items.map((it, i) => (
          <QuizCard key={i} item={it} quizKey={`${slug}:r${i}`} eyebrow={tx(`سؤال ${num(i + 1, lang)}`, `Question ${i + 1}`)} compact />
        ))}
      </div>
    </section>
  );
}
