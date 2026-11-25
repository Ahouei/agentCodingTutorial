import { href, useApp, useTx } from '../lib/app';
import { usePageTitle } from '../lib/title';
import { Mascot } from './Mascot';

export function NotFound() {
  const tx = useTx();
  const { lang } = useApp();
  usePageTitle(tx('صفحه پیدا نشد', 'Page not found'), lang);
  return (
    <main id="main" className="wrap ch-missing">
      <Mascot size={120} mood="wow" />
      <h1 className="display">{tx('این صفحه پیدا نشد', 'This page was not found')}</h1>
      <p className="muted">{tx('شاید آدرس عوض شده باشد. از نقشه راه ادامه دهید.', 'The address may have changed. Continue from the map.')}</p>
      <a className="btn btn--primary" href={href.home}>
        {tx('بازگشت به نقشه', 'Back to the map')}
      </a>
    </main>
  );
}
