import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { L } from '../../content/types';
import { useApp, useTx } from '../../lib/app';
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set4.css';

/**
 * "One skill, three homes". Part 1: carry the same SKILL.md into Claude, Codex and Lovable and
 * see where it lives, how it is called and how it is shared. Part 2: sort Café Sahar's know-how
 * into "always-on rules" (CLAUDE.md / AGENTS.md / Lovable Instructions) or "on-demand skill".
 * Facts match the official docs: code.claude.com/docs/en/skills, developers.openai.com/codex/skills,
 * docs.lovable.dev/features/skills, support.claude.com/en/articles/12512180.
 */

type Home = 'claude' | 'codex' | 'lovable';
const HOMES: Home[] = ['claude', 'codex', 'lovable'];
const NAME: Record<Home, string> = { claude: 'Claude', codex: 'Codex', lovable: 'Lovable' };

type Row = { label: L; value: Record<Home, L> };
const ROWS: Row[] = [
  {
    label: { fa: 'خانه Skill', en: 'Where it lives' },
    value: {
      claude: { fa: 'Claude Code: پوشه `.claude/skills/` در پروژه یا `~/.claude/skills/` برای همه پروژه‌ها. اپ Claude: ‏Customize ← Skills، فایل ZIP را بارگذاری کنید.', en: 'Claude Code: the `.claude/skills/` folder in the project, or `~/.claude/skills/` for every project. Claude app: Customize → Skills, upload a ZIP.' },
      codex: { fa: 'پوشه `.agents/skills/` در Repository یا `~/.agents/skills/` برای همه پروژه‌ها.', en: 'The `.agents/skills/` folder in the repository, or `~/.agents/skills/` for every project.' },
      lovable: { fa: 'بدون پوشه: Workspace settings ← Skills (برای کل تیم) یا Account settings ← Personal skills (فقط شما).', en: 'No folder: Workspace settings → Skills (whole team) or Account settings → Personal skills (just you).' },
    },
  },
  {
    label: { fa: 'صدا زدن', en: 'Calling it' },
    value: {
      claude: { fa: 'بنویسید `/name` یا فقط کاری بخواهید که با description جور است.', en: 'Type `/name`, or just ask for something that matches its description.' },
      codex: { fa: 'بنویسید `$name` (یا `/skills` برای فهرست) یا بگذارید خودش انتخاب کند.', en: 'Type `$name` (or `/skills` for the list), or let it pick on its own.' },
      lovable: { fa: 'در چت `/` بزنید و Skill را انتخاب کنید، یا بگذارید خودکار به کار برود.', en: 'Type `/` in the chat and pick it, or let Lovable apply it automatically.' },
    },
  },
  {
    label: { fa: 'ساختن', en: 'Making one' },
    value: {
      claude: { fa: 'خودتان SKILL.md بنویسید، یا از Claude بخواهید با Skill سازنده (skill-creator) برایتان بسازد.', en: 'Write SKILL.md yourself, or ask Claude to build one with the skill-creator skill.' },
      codex: { fa: 'Skill داخلی `$skill-creator` می‌پرسد و SKILL.md را می‌سازد؛ `$skill-installer` هم Skill آماده نصب می‌کند.', en: 'The built-in `$skill-creator` asks questions and writes SKILL.md; `$skill-installer` adds ready-made ones.' },
      lovable: { fa: 'Add ← Build with Lovable، یا Write manually، یا Import from GitHub، یا Upload ZIP.', en: 'Add → Build with Lovable, Write manually, Import from GitHub, or Upload ZIP.' },
    },
  },
  {
    label: { fa: 'قانون‌های همیشگی', en: 'Always-on rules' },
    value: {
      claude: { fa: 'فایل `CLAUDE.md` (و `AGENTS.md`) در هر جلسه خوانده می‌شود.', en: '`CLAUDE.md` (and `AGENTS.md`) is read in every session.' },
      codex: { fa: 'فایل `AGENTS.md` در هر جلسه خوانده می‌شود.', en: '`AGENTS.md` is read in every session.' },
      lovable: { fa: 'Instructions (نام قبلی Knowledge) در سطح Workspace، پروژه و شخصی؛ همیشه در Context.', en: 'Instructions (formerly Knowledge) at workspace, project and personal level; always in context.' },
    },
  },
];

type Item = { id: string; text: L; kind: 'rule' | 'skill'; why: L };
const ITEMS: Item[] = [
  {
    id: 'rtl',
    kind: 'rule',
    text: { fa: 'همه متن‌ها فارسی و راست‌به‌چپ باشند.', en: 'All text is Persian and right-to-left.' },
    why: { fa: 'در هر پیام صدق می‌کند؛ پس قانون همیشگی است.', en: 'It applies to every message, so it is an always-on rule.' },
  },
  {
    id: 'launch',
    kind: 'skill',
    text: { fa: 'چک‌لیست قبل از انتشار نسخه تازه سایت.', en: 'The checklist before publishing a new version.' },
    why: { fa: 'فقط موقع انتشار لازم است؛ یک Skill کامل.', en: 'Only needed when publishing: a perfect skill.' },
  },
  {
    id: 'brand',
    kind: 'rule',
    text: { fa: 'رنگ برند کافه #E8603C و فونت Vazirmatn است.', en: "The café's brand color is #E8603C and its font is Vazirmatn." },
    why: { fa: 'هر تغییر ظاهری باید آن را رعایت کند؛ همیشگی.', en: 'Every visual change must follow it: always-on.' },
  },
  {
    id: 'menu-post',
    kind: 'skill',
    text: { fa: 'روش نوشتن پست «منوی هفته» برای اینستاگرام.', en: 'How to write the weekly-menu post for Instagram.' },
    why: { fa: 'یک کار تکراری و مشخص که هر از گاهی پیش می‌آید؛ Skill.', en: 'A specific, repeated task that comes up now and then: a skill.' },
  },
  {
    id: 'a11y',
    kind: 'skill',
    text: { fa: 'بررسی دسترس‌پذیری یک صفحه، قدم به قدم.', en: 'Reviewing a page for accessibility, step by step.' },
    why: { fa: 'دستورالعمل بلندی است که فقط هنگام بازبینی لازم است؛ Skill.', en: 'Long instructions needed only during a review: a skill.' },
  },
];

export default function SkillHomes() {
  const { t, lang } = useApp();
  const tx = useTx();
  const lab = useLab();
  const [home, setHome] = useState<Home>('claude');
  const [visited, setVisited] = useState<Set<Home>>(() => new Set<Home>(['claude']));
  const [placed, setPlaced] = useState<Record<string, 'rule' | 'skill'>>({});
  const [last, setLast] = useState<{ id: string; ok: boolean } | null>(null);

  const allVisited = visited.size === HOMES.length;
  const correct = ITEMS.filter((i) => placed[i.id] === i.kind).length;
  const allSorted = correct === ITEMS.length;

  useEffect(() => {
    if (allVisited && allSorted) lab.complete();
  }, [allVisited, allSorted, lab]);

  const go = (h: Home) => {
    setHome(h);
    setVisited((v) => new Set(v).add(h));
  };
  const place = (it: Item, kind: 'rule' | 'skill') => {
    if (placed[it.id] === it.kind) return;
    const ok = kind === it.kind;
    setLast({ id: it.id, ok });
    if (ok) setPlaced((p) => ({ ...p, [it.id]: kind }));
  };
  const reset = () => {
    setPlaced({});
    setLast(null);
    setHome('claude');
    setVisited(new Set<Home>(['claude']));
  };
  const idx = HOMES.indexOf(home);
  const code = (s: string) =>
    s.split('`').map((part, i) =>
      i % 2 ? (
        <code key={i} className="inline-code" dir="ltr">
          {part}
        </code>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  const lastItem = last ? ITEMS.find((i) => i.id === last.id) : null;

  return (
    <Frame
      title={tx('یک Skill، سه خانه', 'One skill, three homes')}
      goal={tx('Skill را به هر سه خانه ببرید و پنج دانسته کافه را دسته‌بندی کنید', 'Carry the skill to all three homes and sort the café’s five know-hows')}
      hint={tx(
        'یک فایل SKILL.md در Claude، Codex و Lovable یکسان کار می‌کند. فقط «خانه»اش فرق دارد. روی هر خانه بزنید.',
        'The same SKILL.md works in Claude, Codex and Lovable. Only its “home” differs. Tap each home.',
      )}
      tint="var(--butter-soft)"
      footer={
        <>
          <button type="button" className="btn btn--small btn--ghost" onClick={reset}>
            {tx('از اول', 'Reset')}
          </button>
          <span className="sk-progress" aria-live="polite">
            {tx(`${visited.size} از ۳ خانه · ${correct} از ۵ دسته‌بندی`, `${visited.size}/3 homes · ${correct}/5 sorted`).replace(/\d/g, (d) => (lang === 'fa' ? '۰۱۲۳۴۵۶۷۸۹'[Number(d)] : d))}
          </span>
        </>
      }
    >
      {/* Part 1: the travelling SKILL.md */}
      <div className="sk-homes" role="group" aria-label={tx('خانه‌های Skill', 'Skill homes')}>
        {HOMES.map((h) => (
          <button
            key={h}
            type="button"
            aria-pressed={home === h}
            className={`sk-home sk-home--${h} ${visited.has(h) ? 'is-visited' : ''}`}
            onClick={() => go(h)}
          >
            <span className="sk-roof" aria-hidden />
            <b>{NAME[h]}</b>
            {home === h && (
              <motion.span layoutId="sk-file" className="sk-file" transition={{ duration: 0.45, ease: EASE_IN_OUT }} aria-hidden>
                SKILL.md
              </motion.span>
            )}
          </button>
        ))}
      </div>
      <div className="sk-table" aria-live="polite" aria-label={NAME[home]}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.dl
            key={home}
            initial={{ opacity: 0, transform: `translateX(${(lang === 'fa' ? -1 : 1) * 10 * (idx ? 1 : -1)}px)` }}
            animate={{ opacity: 1, transform: 'translateX(0px)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {ROWS.map((r) => (
              <div key={t(r.label)} className="sk-row">
                <dt>{t(r.label)}</dt>
                <dd>{code(t(r.value[home]))}</dd>
              </div>
            ))}
          </motion.dl>
        </AnimatePresence>
      </div>

      {/* Part 2: always-on rules or on-demand skill? */}
      <p className="sk-q">
        {tx('هر دانسته کافه سحر کجا می‌رود: «قانون همیشگی» یا «Skill وقتی لازم شد»؟', 'Where does each piece of Café Sahar know-how go: an “always-on rule” or an “on-demand skill”?')}
      </p>
      <ul className="sk-items">
        {ITEMS.map((it) => {
          const done = placed[it.id] === it.kind;
          return (
            <li key={it.id} className={`sk-item ${done ? `is-${it.kind}` : ''}`}>
              <span className="sk-text">{t(it.text)}</span>
              {done ? (
                <span className="sk-tag">{it.kind === 'rule' ? tx('قانون همیشگی', 'Always-on rule') : tx('Skill', 'Skill')}</span>
              ) : (
                <span className="sk-btns">
                  <motion.button
                    type="button"
                    className="btn btn--small"
                    onClick={() => place(it, 'rule')}
                    animate={last?.id === it.id && !last.ok && it.kind !== 'rule' ? { x: [0, -5, 5, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tx('همیشگی', 'Always-on')}
                  </motion.button>
                  <motion.button
                    type="button"
                    className="btn btn--small"
                    onClick={() => place(it, 'skill')}
                    animate={last?.id === it.id && !last.ok && it.kind !== 'skill' ? { x: [0, -5, 5, -3, 3, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tx('Skill', 'Skill')}
                  </motion.button>
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div aria-live="polite">
        {lastItem && !(allSorted && allVisited) && (
          <p className="w-card" style={{ marginBottom: 0, background: last!.ok ? 'var(--mint-soft)' : 'var(--blush-soft)' }}>
            {last!.ok ? '✓ ' : tx('نه دقیقاً: ', 'Not quite: ')}
            {t(lastItem.why)}
          </p>
        )}
        {allSorted && !allVisited && (
          <p className="w-card" style={{ marginBottom: 0 }}>
            {tx('عالی! حالا SKILL.md را به خانه‌هایی که هنوز ندیده‌اید هم ببرید.', 'Great! Now carry SKILL.md to the homes you haven’t visited yet.')}
          </p>
        )}
        {allSorted && allVisited && (
          <div className="s4-result" style={{ marginTop: 12 }}>
            <div className="s4-result-head">
              <Mascot size={48} mood="happy" follow={false} />
              <h4>{tx('حالا فرقشان را می‌دانید.', 'Now you know the difference.')}</h4>
            </div>
            <p style={{ margin: 0 }}>
              {tx(
                'قانون‌های همیشگی کوتاه و در CLAUDE.md، AGENTS.md یا Instructions؛ روش‌های بلند و گاه‌به‌گاه در Skill. یک Skill خوب را یک بار بنویسید و در هر سه ابزار استفاده کنید.',
                'Short always-on rules go in CLAUDE.md, AGENTS.md or Instructions; long, occasional procedures go in a skill. Write a good skill once and use it in all three tools.',
              )}
            </p>
          </div>
        )}
      </div>
    </Frame>
  );
}
