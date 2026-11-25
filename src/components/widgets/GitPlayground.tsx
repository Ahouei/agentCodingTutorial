import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Mascot, type Mood } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set1.css';

type Branch = 'main' | 'feature';
type Commit = { id: number; branch: Branch; parents: number[]; msg: string };
type Log = { fa: string; en: string; cmd: string; k?: number };
type State = {
  commits: Commit[];
  head: Branch;
  tips: { main: number; feature: number | null };
  log: Log[];
  mood: Mood;
};

const MAX = 14;
const STEP = 58;
const PAD = 36;
const LANE: Record<Branch, number> = { main: 40, feature: 100 };
const COLOR: Record<Branch, string> = { main: 'var(--butter)', feature: 'var(--mint)' };

const MAIN_MSGS = ['Add hero section', 'Fix typo in menu', 'Add Persian font', 'Improve mobile layout', 'Tweak colors', 'Add footer', 'Update README'];
const FEATURE_MSGS = ['Add booking page', 'Style booking form', 'Validate booking form', 'Add booking confirmation', 'Polish booking texts'];

function initial(): State {
  return {
    commits: [{ id: 0, branch: 'main', parents: [], msg: 'Initial commit' }],
    head: 'main',
    tips: { main: 0, feature: null },
    log: [
      {
        fa: 'Repository ساخته شد و اولین عکس (Commit) از پروژه گرفته شد.',
        en: 'The repository was created and the first snapshot (commit) was saved.',
        cmd: 'git init && git commit -m "Initial commit"',
      },
    ],
    mood: 'happy',
  };
}

function ancestors(commits: Commit[], id: number): Set<number> {
  const seen = new Set<number>();
  const stack = [id];
  while (stack.length) {
    const c = stack.pop()!;
    if (seen.has(c)) continue;
    seen.add(c);
    const found = commits.find((x) => x.id === c);
    if (found) stack.push(...found.parents);
  }
  return seen;
}

export default function GitPlayground() {
  const tx = useTx();
  const [st, setSt] = useState<State>(initial);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { complete } = useLab();

  const { commits, head, tips } = st;
  const full = commits.length >= MAX;
  const hasFeature = tips.feature !== null;
  const mainAnc = ancestors(commits, tips.main);
  const featureMerged = !hasFeature || mainAnc.has(tips.feature!);
  const canMerge = hasFeature && head === 'main' && !featureMerged && !full;

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
  }, [commits.length]);

  const push = (s: State, entry: Log, mood: Mood = 'happy'): State => ({
    ...s,
    log: [{ ...entry, k: (s.log[0]?.k ?? 0) + 1 }, ...s.log].slice(0, 4),
    mood,
  });

  const commit = () =>
    setSt((s) => {
      if (s.commits.length >= MAX) return s;
      const pool = s.head === 'main' ? MAIN_MSGS : FEATURE_MSGS;
      const n = s.commits.filter((c) => c.branch === s.head).length;
      const msg = pool[n % pool.length];
      const parent = s.tips[s.head]!;
      const c: Commit = { id: s.commits.length, branch: s.head, parents: [parent], msg };
      return push(
        { ...s, commits: [...s.commits, c], tips: { ...s.tips, [s.head]: c.id } },
        {
          fa: `روی شاخه ${s.head} یک عکس جدید ذخیره کردید: «${msg}». هر وقت خواستید می‌توانید به این لحظه برگردید.`,
          en: `You saved a new snapshot on ${s.head}: "${msg}". You can always come back to this moment.`,
          cmd: `git add . && git commit -m "${msg}"`,
        },
      );
    });

  const branch = () =>
    setSt((s) =>
      push(
        { ...s, head: 'feature', tips: { ...s.tips, feature: s.tips.main } },
        {
          fa: 'یک شاخه تازه به اسم feature ساختید و رفتید رویش. حالا هر آزمایشی بکنید، main سالم می‌ماند.',
          en: 'You created a new branch called feature and moved onto it. Experiment freely: main stays safe.',
          cmd: 'git switch -c feature',
        },
        'wow',
      ),
    );

  const switchTo = (b: Branch) =>
    setSt((s) =>
      push(
        { ...s, head: b },
        {
          fa: `رفتید روی شاخه ${b}. فایل‌های پروژه حالا نسخه این شاخه را نشان می‌دهند.`,
          en: `You switched to ${b}. Your project files now show this branch's version.`,
          cmd: `git switch ${b}`,
        },
        'calm',
      ),
    );

  const merge = () => {
    complete(); // a feature branch merged into main: the lab's goal
    setSt((s) => {
      const c: Commit = { id: s.commits.length, branch: 'main', parents: [s.tips.main, s.tips.feature!], msg: "Merge branch 'feature'" };
      return push(
        { ...s, commits: [...s.commits, c], tips: { ...s.tips, main: c.id } },
        {
          fa: 'کارهای شاخه feature به main اضافه شد. روی GitHub، دکمه Merge یک Pull Request دقیقاً همین کار را می‌کند.',
          en: 'The work from feature was merged into main. On GitHub, the Merge button of a pull request does exactly this.',
          cmd: 'git merge --no-ff feature',
        },
        'happy',
      );
    });
  };

  const reset = () => setSt(initial());

  const width = PAD * 2 + (commits.length - 1) * STEP + 70;
  const height = hasFeature ? 140 : 82;
  const xOf = (id: number) => PAD + id * STEP;
  const yOf = (c: Commit) => LANE[c.branch];

  return (
    <Frame
      title={tx('زمین بازی Git: Commit، Branch و Merge', 'Git playground: commit, branch and merge')}
      goal={tx('Commit بزنید، شاخه بسازید، برگردید روی main و Merge کنید', 'Commit, branch, switch back to main and merge')}
      footer={
        <button type="button" className="btn btn--small btn--ghost" onClick={reset}>
          {tx('از اول', 'Reset')}
        </button>
      }
      tint="var(--mint-soft)"
      mood={st.mood}
    >
      <div className="git-scroll" ref={scrollRef} role="img" aria-label={tx('نمودار Commitها', 'Commit graph')}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', maxWidth: 'none' }}>
          {/* lanes */}
          <text x={8} y={LANE.main - 18} fontSize="11" fontWeight="800" fill="var(--ink-2)" fontFamily="var(--font-mono)">
            main
          </text>
          {hasFeature && (
            <text x={8} y={LANE.feature + 30} fontSize="11" fontWeight="800" fill="var(--ink-2)" fontFamily="var(--font-mono)">
              feature
            </text>
          )}
          {/* edges */}
          {commits.flatMap((c) =>
            c.parents.map((pid) => {
              const p = commits[pid];
              const x1 = xOf(p.id);
              const y1 = yOf(p);
              const x2 = xOf(c.id);
              const y2 = yOf(c);
              const d = y1 === y2 ? `M${x1} ${y1} L${x2} ${y2}` : `M${x1} ${y1} C${x1 + STEP * 0.6} ${y1}, ${x2 - STEP * 0.6} ${y2}, ${x2} ${y2}`;
              return (
                <motion.path
                  key={`${pid}-${c.id}`}
                  d={d}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                />
              );
            }),
          )}
          {/* feature branch pointer before its first commit */}
          {hasFeature && commits[tips.feature!].branch === 'main' && (
            <path
              d={`M${xOf(tips.feature!)} ${LANE.main + 12} Q${xOf(tips.feature!)} ${LANE.feature} ${xOf(tips.feature!) + 22} ${LANE.feature}`}
              fill="none"
              stroke="var(--ink-3)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          )}
          {/* commits */}
          {commits.map((c) => {
            const isMerge = c.parents.length > 1;
            const isHead = tips[head] === c.id;
            return (
              <motion.g
                key={c.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              >
                {isHead && <circle cx={xOf(c.id)} cy={yOf(c)} r={17} fill="none" stroke="var(--coral)" strokeWidth="3" />}
                <circle cx={xOf(c.id)} cy={yOf(c)} r={11} fill={COLOR[c.branch]} stroke="var(--ink)" strokeWidth="2.5" />
                {isMerge && <circle cx={xOf(c.id)} cy={yOf(c)} r={4} fill="var(--ink)" />}
                <title>{c.msg}</title>
              </motion.g>
            );
          })}
          {/* branch tags */}
          {(['main', 'feature'] as Branch[]).map((b) => {
            const id = tips[b];
            if (id === null) return null;
            const c = commits[id];
            const x = b === 'feature' && c.branch === 'main' ? xOf(id) + 24 : xOf(id) + 18;
            const y = b === 'feature' ? LANE.feature : LANE.main;
            const label = head === b ? `${b} · HEAD` : b;
            const w = label.length * 7 + 14;
            return (
              <g key={b} transform={`translate(${x} ${y - 26})`}>
                <rect width={w} height={18} rx={9} fill={head === b ? 'var(--coral)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="1.5" />
                <text x={w / 2} y={13} textAnchor="middle" fontSize="11" fontWeight="800" fontFamily="var(--font-mono)" fill={head === b ? '#2a211b' : 'var(--ink)'}>
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="w-muted" style={{ margin: '8px 0 0', fontSize: 13 }}>
        {tx('در نمودار، زمان مثل ابزارهای Git از چپ به راست جلو می‌رود.', 'In the graph, time flows left to right, as in Git tools.')}
      </p>

      <div className="git-buttons">
        <button type="button" className="btn btn--small btn--butter" onClick={commit} disabled={full}>
          {tx('Commit (ذخیره عکس)', 'Commit (save snapshot)')}
        </button>
        <button type="button" className="btn btn--small" onClick={branch} disabled={hasFeature}>
          {tx('ساخت شاخه feature', 'New branch “feature”')}
        </button>
        <button type="button" className="btn btn--small" onClick={() => switchTo(head === 'main' ? 'feature' : 'main')} disabled={!hasFeature}>
          {head === 'main' ? tx('برو روی feature', 'Switch to feature') : tx('برو روی main', 'Switch to main')}
        </button>
        <button type="button" className="btn btn--small btn--mint" onClick={merge} disabled={!canMerge}>
          {tx('Merge در main', 'Merge into main')}
        </button>
      </div>
      {hasFeature && !featureMerged && head === 'feature' && (
        <p className="w-muted" style={{ margin: '8px 0 0' }}>
          {tx('برای Merge اول باید برگردید روی main؛ کارها همیشه «به داخل» شاخه فعلی Merge می‌شوند.', 'To merge, switch back to main first: work is always merged into the branch you are on.')}
        </p>
      )}
      {full && (
        <p className="w-muted" style={{ margin: '8px 0 0' }}>
          {tx('زمین بازی پر شد! «از اول» را بزنید.', 'The playground is full! Press Reset.')}
        </p>
      )}

      <ul className="git-log" aria-live="polite">
        <AnimatePresence initial={false}>
          {st.log.map((l, i) => (
            <motion.li
              key={l.k ?? 0}
              layout
              initial={{ opacity: 0, transform: 'translateY(-6px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
            >
              {i === 0 && (
                <span style={{ flex: 'none' }}>
                  <Mascot size={30} mood={st.mood} follow={false} />
                </span>
              )}
              <span style={{ minWidth: 0 }}>
                {tx(l.fa, l.en)}
                <code>$ {l.cmd}</code>
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Frame>
  );
}
