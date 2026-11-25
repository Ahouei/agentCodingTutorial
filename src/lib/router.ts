import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

/**
 * A small History-API router with real URLs (QA-29):
 *   /                       home
 *   /c/<slug>               chapter
 *   /c/<slug>/<section>     chapter, scrolled to a section
 *   /glossary               all terms
 *   /admin[/<section>]      admin panel (staff only; the API enforces it)
 *   anything else           not found (the Worker also answers 404)
 *
 * Back/forward restore the scroll position of the page you return to (QA-13).
 * Overlays (sheets) push their own history entry, so Back closes the overlay
 * first and never leaves the page by surprise (RD-05, spa-overlay-back-navigation).
 */

export type Route =
  | { name: 'home' }
  | { name: 'chapter'; slug: string; section?: string }
  | { name: 'glossary' }
  | { name: 'admin'; section: string }
  | { name: 'notfound' };

type HistState = { scrollY?: number; overlay?: string; key?: string };

export function parse(pathname: string): Route {
  const p = pathname.replace(/\/+$/, '') || '/';
  if (p === '/') return { name: 'home' };
  if (p === '/glossary') return { name: 'glossary' };
  const a = p.match(/^\/admin(?:\/([a-z]+))?$/);
  if (a) return { name: 'admin', section: a[1] ?? 'overview' };
  const m = p.match(/^\/c\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?$/);
  if (m) return { name: 'chapter', slug: m[1], section: m[2] };
  return { name: 'notfound' };
}

export const href = {
  home: '/',
  map: '/#map',
  glossary: '/glossary',
  admin: (section?: string) => `/admin${section && section !== 'overview' ? `/${section}` : ''}`,
  chapter: (slug: string, section?: string) => `/c/${slug}${section ? `/${section}` : ''}`,
};

const EVT = 'zth:route';
let navKind: 'push' | 'pop' | 'initial' = 'initial';
let restoreY: number | null = null;

function state(): HistState {
  const s = history.state as unknown;
  return s && typeof s === 'object' ? (s as HistState) : {};
}

/** Remember where we are before leaving this history entry. */
function rememberScroll() {
  history.replaceState({ ...state(), scrollY: Math.round(window.scrollY) }, '');
}

export function navigate(to: string, opts: { replace?: boolean } = {}) {
  const url = new URL(to, location.href);
  if (url.origin !== location.origin) {
    location.href = to;
    return;
  }
  const target = url.pathname + url.search + url.hash;
  const same = target === location.pathname + location.search + location.hash;
  if (same && !opts.replace) return;
  rememberScroll();
  const st: HistState = { key: Math.random().toString(36).slice(2) };
  if (opts.replace) history.replaceState(st, '', target);
  else history.pushState(st, '', target);
  navKind = 'push';
  restoreY = null;
  transition(() => window.dispatchEvent(new Event(EVT)));
}

/**
 * Route changes run inside a View Transition where supported (RD-08):
 * elements sharing a view-transition-name (the map node and the chapter badge)
 * morph; everything else crossfades. Skipped under reduced motion.
 */
function transition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduce) {
    update();
    return;
  }
  doc.startViewTransition(() => flushSync(update));
}

/** How the current route was reached: a click (push), Back/forward (pop) or first load. */
export function lastNavigation() {
  return { kind: navKind, restoreY };
}

let installed = false;
function install() {
  if (installed) return;
  installed = true;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  // Links shared before real URLs existed: /#/c/<slug>/<section> → /c/<slug>/<section>
  const legacy = location.hash.match(/^#\/c\/([a-z0-9-]+)(?:\/([a-z0-9-]+))?/);
  if (legacy) history.replaceState({}, '', href.chapter(legacy[1], legacy[2]));
  else if (location.hash === '#/') history.replaceState({}, '', '/');

  let lastPath = location.pathname;
  window.addEventListener('popstate', (e) => {
    const s = (e.state ?? {}) as HistState;
    if (location.pathname === lastPath) {
      // Same page: only an overlay or in-page hash changed.
      window.dispatchEvent(new CustomEvent('zth:overlay', { detail: s.overlay ?? null }));
      return;
    }
    navKind = 'pop';
    restoreY = typeof s.scrollY === 'number' ? s.scrollY : 0;
    transition(() => window.dispatchEvent(new Event(EVT)));
  });
  window.addEventListener(EVT, () => {
    lastPath = location.pathname;
  });

  // Keep the current entry's scroll position fresh, so Back always has it.
  let t = 0;
  window.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(t);
      t = window.setTimeout(rememberScroll, 150);
    },
    { passive: true },
  );

  // Same-origin <a href="/…"> clicks become client-side navigations.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const raw = a.getAttribute('href');
    if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return;
    const url = new URL(raw, location.href);
    if (url.pathname === location.pathname && url.hash) return; // in-page anchor
    e.preventDefault();
    navigate(raw);
  });
}

export function useRoute(): Route {
  install();
  const [route, setRoute] = useState<Route>(() => parse(location.pathname));
  useEffect(() => {
    const on = () => setRoute(parse(location.pathname));
    window.addEventListener(EVT, on);
    return () => window.removeEventListener(EVT, on);
  }, []);
  return route;
}

/**
 * Restore the scroll position for Back/forward once the page has rendered enough
 * height to scroll there (content and lazy labs can grow after first paint).
 */
export function restoreScrollWhenReady(y: number) {
  let tries = 0;
  const step = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max >= y - 4 || tries > 40) {
      window.scrollTo({ top: Math.min(y, Math.max(0, max)), behavior: 'instant' as ScrollBehavior });
      return;
    }
    tries += 1;
    window.setTimeout(step, 50);
  };
  requestAnimationFrame(step);
}

/* ───────── Overlays that Back can close ───────── */

/**
 * `const [open, setOpen] = useOverlay('sections')`
 * Opening pushes a history entry tagged with the overlay; closing from the UI
 * goes back (removing that entry). Back/swipe-back closes it without leaving the page.
 */
export function useOverlay(name: string): [boolean, (open: boolean) => void] {
  const [open, setOpenState] = useState(() => state().overlay === name);
  useEffect(() => {
    const on = (e: Event) => setOpenState((e as CustomEvent<string | null>).detail === name);
    window.addEventListener('zth:overlay', on);
    const onRoute = () => setOpenState(false);
    window.addEventListener(EVT, onRoute);
    return () => {
      window.removeEventListener('zth:overlay', on);
      window.removeEventListener(EVT, onRoute);
    };
  }, [name]);
  const setOpen = (next: boolean) => {
    const cur = state().overlay;
    if (next) {
      if (cur === name) return;
      rememberScroll();
      if (cur) history.replaceState({ ...state(), overlay: name }, '');
      else history.pushState({ ...state(), overlay: name }, '');
      // Tell every overlay (including one being replaced) which one is open now.
      window.dispatchEvent(new CustomEvent('zth:overlay', { detail: name }));
    } else if (cur === name) {
      history.back(); // popstate → zth:overlay(null) closes it
    } else {
      setOpenState(false);
    }
  };
  return [open, setOpen];
}
