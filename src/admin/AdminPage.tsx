/**
 * Admin panel (/admin). Loaded only when visited (code-split), so learners never download it.
 * Access is decided by the server on every request; this page only reflects that answer.
 */
import { useEffect, useRef, useState } from 'react';
import { Mascot } from '../components/Mascot';
import { useAccount } from '../lib/account';
import { href, useTx } from '../lib/app';
import { usePageTitle } from '../lib/title';
import { useApp } from '../lib/app';
import { api, ApiError, type Me } from './api';
import { AnnouncementsPanel } from './Announcements';
import { AuditPanel } from './AuditPanel';
import { AiPanel } from './AiPanel';
import { InvitesPanel } from './InvitesPanel';
import { ContentPanel, OverviewPanel } from './Insights';
import { LearnersPanel } from './Learners';
import { SettingsPanel } from './SettingsPanel';
import { Loading } from './ui';
import './admin.css';

const SECTIONS = ['overview', 'learners', 'invites', 'content', 'announcements', 'ai', 'settings', 'audit'] as const;
type SectionId = (typeof SECTIONS)[number];

export default function AdminPage({ section }: { section: string }) {
  const tx = useTx();
  const { lang } = useApp();
  const acc = useAccount();
  const [me, setMe] = useState<Me | null>(null);
  const [state, setState] = useState<'loading' | 'ok' | 'signed-out' | 'forbidden' | 'unavailable'>('loading');
  usePageTitle(tx('پنل مدیریت', 'Admin panel'), lang);

  useEffect(() => {
    let alive = true;
    api
      .get<Me>('/me')
      .then((m) => {
        if (!alive) return;
        setMe(m);
        setState('ok');
      })
      .catch((e) => {
        if (!alive) return;
        const s = e instanceof ApiError ? e.status : 0;
        setState(s === 401 ? 'signed-out' : s === 403 ? 'forbidden' : 'unavailable');
      });
    return () => {
      alive = false;
    };
  }, [acc.status]);

  const labels: Record<SectionId, string> = {
    overview: tx('نمای کلی', 'Overview'),
    learners: tx('یادگیرنده‌ها', 'Learners'),
    content: tx('محتوا', 'Content'),
    announcements: tx('اطلاعیه‌ها', 'Announcements'),
    ai: tx('Bit و AI', 'Bit & AI'),
    invites: tx('دعوت‌ها', 'Invites'),
    settings: tx('تنظیمات', 'Settings'),
    audit: tx('گزارش کارها', 'Audit log'),
  };
  const current: SectionId = (SECTIONS as readonly string[]).includes(section) ? (section as SectionId) : 'overview';
  // On phones the section tabs scroll sideways: keep the current one in view.
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    nav.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current, state]);

  if (state !== 'ok' || !me) {
    return (
      <main id="main" className="adm adm--gate wrap">
        <h1 className="adm-title">{tx('پنل مدیریت', 'Admin panel')}</h1>
        {state === 'loading' ? (
          <Loading />
        ) : (
          <div className="adm-gate">
            <Mascot size={72} mood="think" follow={false} />
            <p>
              {state === 'signed-out'
                ? tx('برای دیدن پنل، با ایمیل مدیر وارد شوید (دکمه آدمک بالای صفحه).', 'Sign in with an admin email to open the panel (the person icon at the top).')
                : state === 'forbidden'
                  ? tx('این حساب دسترسی مدیریت ندارد.', 'This account does not have admin access.')
                  : tx('پنل الان در دسترس نیست. کمی بعد دوباره امتحان کنید.', 'The panel is not available right now. Try again shortly.')}
            </p>
            <a className="btn btn--small" href={href.home}>
              {tx('بازگشت به دوره', 'Back to the course')}
            </a>
          </div>
        )}
      </main>
    );
  }

  return (
    <main id="main" className="adm wrap">
      <div className="adm-top">
        <h1 className="adm-title">{tx('پنل مدیریت', 'Admin panel')}</h1>
        <p className="adm-who">
          <span className="ltr">{me.email}</span> · <b>{me.role === 'owner' ? tx('مالک', 'Owner') : tx('مدیر', 'Admin')}</b>
        </p>
      </div>
      <div className="adm-layout">
        <nav ref={nav} className="adm-nav" aria-label={tx('بخش‌های پنل', 'Panel sections')}>
          {SECTIONS.map((s) => (
            <a key={s} href={href.admin(s)} aria-current={s === current ? 'page' : undefined}>
              {labels[s]}
            </a>
          ))}
        </nav>
        <div className="adm-main">
          {current === 'overview' && <OverviewPanel />}
          {current === 'learners' && <LearnersPanel me={me} />}
          {current === 'content' && <ContentPanel />}
          {current === 'announcements' && <AnnouncementsPanel />}
          {current === 'ai' && <AiPanel />}
          {current === 'invites' && <InvitesPanel />}
          {current === 'settings' && <SettingsPanel />}
          {current === 'audit' && <AuditPanel />}
        </div>
      </div>
    </main>
  );
}
