import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useState, type ReactNode } from 'react';
import type { Block, L, Tone } from '../../content/types';
import { num, useApp, useTx } from '../../lib/app';
import { Mascot } from '../Mascot';
import { WIDGETS } from '../widgets';
import { CopyButton } from './CopyButton';
import { Rich } from './Rich';
import './blocks.css';

const EASE = [0.23, 1, 0.32, 1] as const;

/** Subtle reveal: a soft focus-pull rather than the overused slide-up. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)', transform: 'translateY(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function BlockView({ block }: { block: Block }) {
  const { t } = useApp();
  switch (block.type) {
    case 'p':
      return (
        <p className="b-p">
          <Rich text={t(block.text)} />
        </p>
      );
    case 'h':
      return <h3 className="b-h">{t(block.text)}</h3>;
    case 'callout':
      return <Callout tone={block.tone} title={block.title} text={block.text} />;
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag className={`b-list ${block.ordered ? 'is-ordered' : ''}`}>
          {block.items.map((it, i) => (
            <li key={i}>
              <Rich text={t(it)} />
            </li>
          ))}
        </Tag>
      );
    }
    case 'steps':
      return <Steps items={block.items} />;
    case 'terms':
      return (
        <dl className="b-terms">
          {block.items.map((it) => (
            <div key={it.term} className="b-term">
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
        <div className="b-table-wrap sticker" role="region" tabIndex={0} aria-label={t(block.headers[0])}>
          <table className="b-table">
            <thead>
              <tr>
                {block.headers.map((h, i) => (
                  <th key={i} scope="col">
                    {t(h)}
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
          <Suspense fallback={<div className="b-widget-skeleton sticker" />}>
            <W />
          </Suspense>
        </div>
      );
    }
    case 'quiz':
      return <Quiz q={block.q} options={block.options} answer={block.answer} explain={block.explain} />;
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
              </a>
            </li>
          ))}
        </ul>
      );
  }
}

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
      {title && <p className="b-callout-title">{t(title)}</p>}
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
            <p className="b-step-title">{t(s.title)}</p>
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
          <span className="b-prompt-title">{t(title)}</span>
        </span>
        <CopyButton text={body} />
      </figcaption>
      <pre className="b-prompt-body" dir={isLatin ? 'ltr' : 'auto'}>
        {body}
      </pre>
    </figure>
  );
}

function CodeBlock({ lang: codeLang, code, caption }: { lang: string; code: string; caption?: L }) {
  const { t } = useApp();
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
      <pre dir="ltr">
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

function Quiz({ q, options, answer, explain }: { q: L; options: L[]; answer: number; explain: L }) {
  const { t, lang } = useApp();
  const tx = useTx();
  const letters = lang === 'fa' ? ['الف', 'ب', 'ج', 'د', 'ه'] : ['A', 'B', 'C', 'D', 'E'];
  const [picked, setPicked] = useState<number | null>(null);
  const correct = picked === answer;

  return (
    <div className="b-quiz sticker">
      <div className="b-quiz-head">
        <Mascot size={54} mood={picked === null ? 'think' : correct ? 'happy' : 'wow'} follow={false} />
        <div>
          <span className="eyebrow">{tx('یک سؤال کوچک', 'Quick check')}</span>
          <p className="b-quiz-q">
            <Rich text={t(q)} />
          </p>
        </div>
      </div>
      <div className="b-quiz-options" role="radiogroup">
        {options.map((o, i) => {
          const state = picked === null ? '' : i === answer ? 'is-right' : i === picked ? 'is-wrong' : 'is-dim';
          return (
            <motion.button
              key={i}
              type="button"
              role="radio"
              aria-checked={picked === i}
              className={`b-quiz-opt ${state}`}
              onClick={() => setPicked(i)}
              animate={picked === i && i !== answer ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="b-quiz-letter" aria-hidden>
                {letters[i] ?? i + 1}
              </span>
              <span>
                <Rich text={t(o)} />
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
            transition={{ duration: 0.25, ease: EASE }}
            aria-live="polite"
          >
            <strong>{correct ? tx('آفرین! درست است.', 'Yes! That is right.') : tx('نه دقیقاً.', 'Not quite.')}</strong>{' '}
            <Rich text={t(explain)} />
            {!correct && (
              <button type="button" className="b-quiz-retry" onClick={() => setPicked(null)}>
                {tx('دوباره امتحان کنید', 'Try again')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
