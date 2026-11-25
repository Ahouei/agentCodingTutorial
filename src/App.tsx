import { MotionConfig } from 'motion/react';
import { lazy, Suspense, useLayoutEffect } from 'react';
import { SiteAnnouncement } from './components/Announcement';
import { SiteFooter } from './components/SiteFooter';
import { BitLoader } from './components/BitLoader';
import { ChapterPage } from './components/ChapterPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Glossary } from './components/Glossary';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { NotFound } from './components/NotFound';
import { AppProvider, useApp, useRoute, useTx } from './lib/app';
import { AccountProvider } from './lib/account';
import { lastNavigation, restoreScrollWhenReady } from './lib/router';

// The admin panel is its own chunk: learners never download it.
const AdminPage = lazy(() => import('./admin/AdminPage'));

/** One place decides where the page lands after a route change. */
function useLanding(routeKey: string, section?: string) {
  useLayoutEffect(() => {
    const nav = lastNavigation();
    if (nav.kind === 'pop' && nav.restoreY != null) {
      restoreScrollWhenReady(nav.restoreY); // Back/forward: exactly where you were
      return;
    }
    const target = section ?? (location.hash ? location.hash.slice(1) : '');
    if (target) {
      let tries = 0;
      const go = () => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ block: 'start' });
        else if (tries++ < 40) window.setTimeout(go, 50);
      };
      go();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
    // Move keyboard/screen-reader focus to the new page's heading (QA-09). Not on first load.
    if (nav.kind === 'push') {
      requestAnimationFrame(() => {
        const h = document.querySelector<HTMLElement>('main h1');
        if (h) {
          h.setAttribute('tabindex', '-1');
          h.focus({ preventScroll: true });
        }
      });
    }
  }, [routeKey, section]);
}

function Routes() {
  const route = useRoute();
  const { lang } = useApp();
  const tx = useTx();
  const key = route.name === 'chapter' ? `c/${route.slug}` : route.name === 'admin' ? `admin/${route.section}` : route.name;
  useLanding(key, route.name === 'chapter' ? route.section : undefined);

  return (
    <>
      <a className="skip" href="#main">
        {tx('رفتن به محتوا', 'Skip to content')}
      </a>
      <Header />
      {route.name !== 'admin' && <SiteAnnouncement />}
      <ErrorBoundary scope="page" lang={lang} resetKey={key}>
        {route.name === 'admin' ? (
          <Suspense
            fallback={
              <main id="main" className="wrap" style={{ minHeight: '60vh' }}>
                <BitLoader label={lang === 'fa' ? 'Bit دارد پنل را باز می‌کند…' : 'Bit is opening the panel…'} />
              </main>
            }
          >
            <AdminPage section={route.section} />
          </Suspense>
        ) : route.name === 'chapter' ? (
          <ChapterPage slug={route.slug} section={route.section} />
        ) : route.name === 'glossary' ? (
          <Glossary />
        ) : route.name === 'notfound' ? (
          <NotFound />
        ) : (
          <Home />
        )}
      </ErrorBoundary>
      {route.name !== 'admin' && <SiteFooter />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AccountProvider>
        {/* Respect the OS "reduce motion" setting everywhere: transforms are dropped, opacity stays. */}
        <MotionConfig reducedMotion="user">
          <Routes />
        </MotionConfig>
      </AccountProvider>
    </AppProvider>
  );
}
