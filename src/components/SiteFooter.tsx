import { BIT_TAPS } from '../content/bitLines';
import { useApp, useTx } from '../lib/app';
import { BitSays } from './BitSays';

/** The footer on every learner page: Bit waves and introduces Ehsan, who made the course. */
export function SiteFooter() {
  const tx = useTx();
  const { t } = useApp();
  return (
    <footer className="ft wrap">
      <BitSays
        className="ft-bit"
        size={54}
        wave
        sleepy
        cycleMs={6000}
        lines={[
          tx('این دوره را احسان ساخته، با کمی کمک از من! 👋', 'Ehsan made this course, with a little help from me! 👋'),
          tx('هر جا گیر کردید، برگردید؛ من همین‌جا هستم.', "Stuck somewhere? Come back; I'll be right here."),
          tx('سایت کافه سحر منتظر شماست. بزن بریم!', "Café Sahar's site is waiting for you. Let's go!"),
          tx('مرا قلقلک بده؛ هر بار یک نکته تازه می‌گویم.', 'Poke me; I share a new tip each time.'),
          ...BIT_TAPS.map((l) => t(l)),
        ]}
      />
      <div className="ft-meta">
        <p className="ft-credit">
          {tx('ساخته‌شده با ', 'Made with ')}
          <span aria-label={tx('عشق', 'love')} role="img">
            ❤️
          </span>
          {tx(' توسط ', ' by ')}
          <b>{tx('احسان', 'Ehsan')}</b>
        </p>
        <p>
          {tx('ساخته‌شده با React و Motion، منتشرشده روی Cloudflare Workers؛ همان مسیری که در دوره یاد می‌گیرید.', 'Built with React and Motion, deployed on Cloudflare Workers: the same path you learn in the course.')}
        </p>
        <p>
          {/* v3: the new trailer. The ?v= skips copies cached under the old file. */}
          <a href={tx('/media/trailer.mp4?v=3', '/media/trailer-en.mp4?v=3')} target="_blank" rel="noreferrer">
            {tx('تریلر ۲۰ ثانیه‌ای دوره', 'The 20-second trailer')}
          </a>{' '}
          <a href={tx('/media/trailer-vertical.mp4?v=3', '/media/trailer-en-vertical.mp4?v=3')} target="_blank" rel="noreferrer">
            {tx('(نسخه عمودی)', '(vertical)')}
          </a>
          {' · '}
          <a href="https://github.com/Ahouei/Ahouei-GetheredInOne-AIAgentSkills" target="_blank" rel="noreferrer">
            {tx('مجموعه Agent Skills دوره', "The course's agent skills collection")}
          </a>
        </p>
      </div>
    </footer>
  );
}
