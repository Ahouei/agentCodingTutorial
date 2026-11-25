import { href, useApp, useTx } from '../lib/app';
import { usePageTitle } from '../lib/title';
import { BitSays } from './BitSays';

export function NotFound() {
  const tx = useTx();
  const { lang } = useApp();
  usePageTitle(tx('صفحه پیدا نشد', 'Page not found'), lang);
  return (
    <main id="main" className="wrap ch-missing">
      <BitSays
        className="nf-bit"
        size={110}
        mood="think"
        cycleMs={5000}
        lines={[
          tx('هوم… همه‌جا را گشتم، این صفحه نبود! 🔍', 'Hmm… I searched everywhere; this page isn’t here! 🔍'),
          tx('شاید آدرس عوض شده. بیا از نقشه راه برویم.', 'Maybe the address changed. Let’s go from the map.'),
        ]}
      />
      <h1 className="display">{tx('این صفحه پیدا نشد', 'This page was not found')}</h1>
      <p className="muted">{tx('شاید آدرس عوض شده باشد. از نقشه راه ادامه دهید.', 'The address may have changed. Continue from the map.')}</p>
      <a className="btn btn--primary" href={href.home}>
        {tx('بازگشت به نقشه', 'Back to the map')}
      </a>
    </main>
  );
}
