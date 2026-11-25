import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { num, useApp, useTx } from '../../lib/app';
import { EASE_OUT } from '../../lib/motion';
import { Mascot } from '../Mascot';
import { Frame, useLab } from './Frame';
import './set3.css';


type Status = 'idle' | 'running' | 'done' | 'failed' | 'skipped';
type Branch = 'main' | 'feature';
type Outcome = null | 'prod' | 'preview' | 'failed';

const STAGES = [
  { id: 'push', fa: 'Push', en: 'Push', cmd: 'git push' },
  { id: 'install', fa: 'نصب', en: 'Install', cmd: 'npm ci' },
  { id: 'build', fa: 'Build', en: 'Build', cmd: 'npm run build' },
  { id: 'test', fa: 'تست', en: 'Test', cmd: 'npm test' },
  { id: 'deploy', fa: 'انتشار', en: 'Deploy', cmd: 'wrangler deploy' },
  { id: 'live', fa: 'آنلاین', en: 'Live', cmd: 'https://…' },
] as const;

const STEP_MS = 650;
const PROD = 'cafe-sahar.ir';

export default function Pipeline() {
  const { lang } = useApp();
  const tx = useTx();
  const [branch, setBranch] = useState<Branch>('main');
  const [broken, setBroken] = useState(false);
  const [status, setStatus] = useState<Status[]>(STAGES.map(() => 'idle'));
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [versions, setVersions] = useState<{ id: number; note: string }[]>([{ id: 1, note: 'first launch' }]);
  const [liveId, setLiveId] = useState(1);
  const [previews, setPreviews] = useState<string[]>([]);
  const timers = useRef<number[]>([]);
  const lastVersion = useRef(1);
  const { complete } = useLab();

  // Done after a green run reaches production.
  useEffect(() => {
    if (outcome === 'prod') complete();
  }, [outcome, complete]);

  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

  const run = (fail: boolean) => {
    if (running) return;
    timers.current.forEach((id) => window.clearTimeout(id));
    setRunning(true);
    setOutcome(null);
    const next: Status[] = STAGES.map(() => 'idle');
    setStatus([...next]);
    const failAt = fail ? STAGES.findIndex((s) => s.id === 'test') : -1;

    STAGES.forEach((_, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStatus((prev) => {
            const copy = [...prev];
            if (failAt >= 0 && i > failAt) return copy;
            copy[i] = 'running';
            return copy;
          });
        }, i * STEP_MS),
        window.setTimeout(
          () => {
            setStatus((prev) => {
              const copy = [...prev];
              if (failAt >= 0 && i > failAt) return copy;
              if (i === failAt) {
                copy[i] = 'failed';
                for (let j = i + 1; j < copy.length; j++) copy[j] = 'skipped';
              } else copy[i] = 'done';
              return copy;
            });
            const last = failAt >= 0 ? i === failAt : i === STAGES.length - 1;
            if (last) {
              setRunning(false);
              if (failAt >= 0) setOutcome('failed');
              else if (branch === 'main') {
                // No side effects inside the updater: compute the id first.
                lastVersion.current += 1;
                const id = lastVersion.current;
                setVersions((v) => [{ id, note: 'update from main' }, ...v]);
                setLiveId(id);
                setOutcome('prod');
              } else {
                setPreviews((p) => [`${['a1b2c3d4', '9f8e7d6c', '5e4d3c2b', '0a9b8c7d'][p.length % 4]}-cafe-sahar.example.workers.dev`, ...p].slice(0, 3));
                setOutcome('preview');
              }
            }
          },
          i * STEP_MS + STEP_MS * 0.85,
        ),
      );
    });
  };

  const fixAndPush = () => {
    setBroken(false);
    run(false);
  };

  const msg = (() => {
    if (running) return tx('Pipeline در حال اجراست…', 'The pipeline is running…');
    if (outcome === 'failed')
      return tx(
        'تست شکست خورد، پس انتشار متوقف شد. سایت واقعی همچنان روی نسخه سالم قبلی است و هیچ کاربری خرابی را ندید. حالا خطا را درست کنید و دوباره Push کنید.',
        'A test failed, so the deploy was blocked. The live site is still on the previous healthy version and no visitor saw the breakage. Fix it and push again.',
      );
    if (outcome === 'prod')
      return tx(
        'همه مراحل سبز شد و نسخه جدید روی Production رفت. اگر بعداً مشکلی پیدا شد، با یک کلیک به نسخه قبلی برگردید.',
        'Everything went green and the new version is on production. If you find a problem later, roll back to an earlier version in one click.',
      );
    if (outcome === 'preview')
      return tx(
        'این شاخه main نبود، پس فقط یک Preview با آدرس جدا ساخته شد. سایت اصلی دست نخورد؛ اول Preview را بررسی کنید و بعد Merge کنید.',
        'This was not main, so only a preview with its own URL was built. The real site is untouched; review the preview first, then merge.',
      );
    return tx(
      'شاخه را انتخاب کنید و Push کنید. می‌توانید عمداً یک تست را خراب کنید تا ببینید Pipeline چطور از سایت محافظت می‌کند.',
      'Pick a branch and push. You can break a test on purpose to see how the pipeline protects your site.',
    );
  })();

  const mood = running ? 'think' : outcome === 'failed' ? 'wow' : outcome ? 'happy' : 'calm';

  return (
    <Frame
      title={tx('یک Push، یک Pipeline کامل', 'One push, one full pipeline')}
      goal={tx('یک انتشار سبز روی Production بگیرید', 'Get one green deploy to production')}
      tint="var(--mint-soft)"
    >
      <div className="w-row">
        <div className="w-toggle" role="group" aria-label={tx('شاخه', 'Branch')}>
          <button type="button" aria-pressed={branch === 'main'} onClick={() => setBranch('main')} disabled={running}>
            <span className="s3-host">main</span>
          </button>
          <button type="button" aria-pressed={branch === 'feature'} onClick={() => setBranch('feature')} disabled={running}>
            <span className="s3-host">feature/menu</span>
          </button>
        </div>
        <label className="br-check" style={{ background: broken ? 'var(--blush-soft)' : undefined }}>
          <input type="checkbox" checked={broken} onChange={(e) => setBroken(e.target.checked)} disabled={running} />
          {tx('یک تست را خراب کن', 'Break a test')}
        </label>
      </div>

      <ol className="pl-stages">
        {STAGES.map((s, i) => {
          const st = status[i];
          const cmd =
            s.id === 'deploy'
              ? branch === 'main'
                ? 'wrangler deploy'
                : 'preview upload'
              : s.id === 'live'
                ? branch === 'main'
                  ? PROD
                  : 'preview URL'
                : s.cmd;
          return (
            <li key={s.id} className="pl-stage" data-s={st}>
              <motion.span
                className="pl-dot"
                animate={{ transform: st === 'running' ? 'scale(1.08)' : 'scale(1)' }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                aria-hidden
              >
                {st === 'running' ? <span className="pl-spin" /> : st === 'done' ? '✓' : st === 'failed' ? '✕' : num(i + 1, lang)}
              </motion.span>
              <span className="pl-stage-name">{tx(s.fa, s.en)}</span>
              <span className="pl-stage-cmd">{cmd}</span>
              <span className="sr-only">
                {st === 'done' ? tx('انجام شد', 'done') : st === 'failed' ? tx('شکست خورد', 'failed') : st === 'running' ? tx('در حال اجرا', 'running') : st === 'skipped' ? tx('رد شد', 'skipped') : ''}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="s3-actions">
        <button type="button" className="btn btn--primary" onClick={() => run(broken)} disabled={running}>
          <span className="s3-host" style={{ fontWeight: 800 }}>
            git push
          </span>
        </button>
        {outcome === 'failed' && !running && (
          <button type="button" className="btn btn--mint" onClick={fixAndPush}>
            {tx('درست کن و دوباره Push کن', 'Fix and push again')}
          </button>
        )}
      </div>

      <div aria-live="polite" className={`s3-bubble ${outcome === 'failed' ? 'is-bad' : outcome ? 'is-good' : ''}`}>
        <Mascot size={44} mood={mood} follow={false} />
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={msg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            {msg}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="pl-live">
        <div className="w-card">
          <p className="w-label">
            Production · <span className="s3-host">{PROD}</span>
          </p>
          <ul className="pl-versions">
            {versions.map((v) => (
              <li key={v.id} className={v.id === liveId ? 'is-live' : ''}>
                <span className="s3-host" style={{ fontWeight: 800 }}>
                  v{v.id}
                </span>
                <span className="w-muted" style={{ fontSize: 12.5 }}>
                  {v.note === 'first launch' ? tx('اولین انتشار', 'first launch') : tx('به‌روزرسانی از main', 'update from main')}
                </span>
                <span style={{ marginInlineStart: 'auto' }}>
                  {v.id === liveId ? (
                    <span className="ns-status active">{tx('آنلاین', 'live')}</span>
                  ) : (
                    <button type="button" className="btn btn--small" onClick={() => setLiveId(v.id)} disabled={running}>
                      {tx('بازگشت به این نسخه', 'Roll back')}
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-card">
          <p className="w-label">
            {tx('Previewها', 'Previews')} <span className="s3-example">{tx('آدرس نمونه', 'example URLs')}</span>
          </p>
          {previews.length === 0 ? (
            <p className="w-muted" style={{ margin: 0 }}>
              {tx('یک Push روی شاخه feature/menu بزنید تا Preview ساخته شود.', 'Push to feature/menu to get a preview.')}
            </p>
          ) : (
            <ul className="pl-versions">
              {previews.map((p) => (
                <li key={p}>
                  <span className="s3-host" style={{ overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Frame>
  );
}
