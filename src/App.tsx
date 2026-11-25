import { MotionConfig } from 'motion/react';
import { ChapterPage } from './components/ChapterPage';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { AppProvider, useRoute, useTx } from './lib/app';

function Routes() {
  const route = useRoute();
  const tx = useTx();
  return (
    <>
      <a className="skip" href="#main">
        {tx('رفتن به محتوا', 'Skip to content')}
      </a>
      <Header />
      {route.name === 'chapter' ? <ChapterPage slug={route.slug} section={route.section} /> : <Home />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      {/* Respect the OS "reduce motion" setting everywhere: transforms are dropped, opacity stays. */}
      <MotionConfig reducedMotion="user">
        <Routes />
      </MotionConfig>
    </AppProvider>
  );
}
