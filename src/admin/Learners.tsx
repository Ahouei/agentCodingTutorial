/** Learners: one table to scan, search and sort; a sheet per learner with audited actions. */
import { useEffect, useMemo, useState } from 'react';
import { CHAPTERS } from '../content';
import { BottomSheet } from '../components/BottomSheet';
import { href, useApp, useTx } from '../lib/app';
import { useOverlay } from '../lib/router';
import { api, ApiError, type Me, type UserDetail, type UserRow } from './api';
import { Bar, Chip, Empty, ErrorNote, Loading, Section, useFmt } from './ui';
import { useLoad } from './useLoad';

type SortKey = 'email' | 'createdAt' | 'lastSeen' | 'done' | 'accuracy';
type Filter = 'all' | 'active' | 'staff' | 'blocked';

export function LearnersPanel({ me }: { me: Me }) {
  const tx = useTx();
  const f = useFmt();
  const [q, setQ] = useState('');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'createdAt', dir: -1 });
  const [openId, setOpenId] = useState<string | null>(null);
  const [sheet, setSheet] = useOverlay('learner');

  // Debounced server search (email contains).
  useEffect(() => {
    const t = window.setTimeout(() => setQuery(q.trim()), 250);
    return () => window.clearTimeout(t);
  }, [q]);
  const { data, error, loading, reload } = useLoad(() => api.get<{ total: number; users: UserRow[] }>(`/users?q=${encodeURIComponent(query)}`), [query]);

  const rows = useMemo(() => {
    const week = Date.now() - 7 * 86400000;
    const list = (data?.users ?? []).filter((u) =>
      filter === 'all' ? true : filter === 'active' ? (u.lastSeen ?? 0) > week : filter === 'staff' ? u.role !== 'learner' : u.status === 'blocked',
    );
    const val = (u: UserRow) =>
      sort.key === 'email' ? u.email : sort.key === 'accuracy' ? (u.answered ? u.correct / u.answered : -1) : ((u[sort.key] as number | null) ?? 0);
    return [...list].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      return (typeof x === 'string' ? x.localeCompare(y as string) : (x as number) - (y as number)) * sort.dir;
    });
  }, [data, filter, sort]);

  const th = (key: SortKey, label: string, cls = '') => (
    <th scope="col" className={cls} aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
      <button type="button" className="adm-sort" onClick={() => setSort((s) => ({ key, dir: s.key === key ? ((-s.dir) as 1 | -1) : key === 'email' ? 1 : -1 }))}>
        {label}
        <span aria-hidden>{sort.key === key ? (sort.dir === 1 ? '▲' : '▼') : '↕'}</span>
      </button>
    </th>
  );

  const open = (id: string) => {
    setOpenId(id);
    setSheet(true);
  };

  return (
    <Section
      title={tx('یادگیرنده‌ها', 'Learners')}
      sub={data ? tx(`${f.n(data.total)} حساب. فقط کسانی که وارد شده‌اند اینجا هستند؛ بقیه بی‌نام روی دستگاه خودشان یاد می‌گیرند.`, `${f.n(data.total)} accounts. Only people who signed in appear here; everyone else learns anonymously on their own device.`) : undefined}
    >
      <div className="adm-toolbar">
        <input
          className="adm-input"
          type="search"
          dir="ltr"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tx('جست‌وجوی ایمیل…', 'Search email…')}
          aria-label={tx('جست‌وجوی ایمیل', 'Search email')}
        />
        <div className="adm-seg" role="group" aria-label={tx('فیلتر', 'Filter')}>
          {(
            [
              ['all', tx('همه', 'All')],
              ['active', tx('فعال ۷ روز', 'Active 7d')],
              ['staff', tx('مدیرها', 'Staff')],
              ['blocked', tx('مسدود', 'Blocked')],
            ] as [Filter, string][]
          ).map(([k, label]) => (
            <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}>
              {label}
            </button>
          ))}
        </div>
      </div>
      {error ? (
        <ErrorNote error={error} retry={reload} />
      ) : loading && !data ? (
        <Loading />
      ) : !rows.length ? (
        <Empty>{q || filter !== 'all' ? tx('چیزی پیدا نشد.', 'Nothing matches.') : tx('هنوز هیچ‌کس وارد نشده است.', 'Nobody has signed in yet.')}</Empty>
      ) : (
        <div className="tbl-wrap">
          <table className="adm-tbl adm-tbl--rows">
            <thead>
              <tr>
                {th('email', tx('ایمیل', 'Email'))}
                {th('createdAt', tx('عضویت', 'Joined'))}
                {th('lastSeen', tx('آخرین بازدید', 'Last seen'))}
                {th('done', tx('فصل‌ها', 'Chapters'), 'w-bar')}
                {th('accuracy', tx('دقت', 'Accuracy'), 'num')}
                <th scope="col">{tx('وضعیت', 'Status')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id}>
                  <td>
                    <button type="button" className="adm-rowlink ltr" onClick={() => open(u.id)}>
                      {u.email}
                    </button>
                  </td>
                  <td className="nowrap muted">{f.date(u.createdAt)}</td>
                  <td className="nowrap">{f.rel(u.lastSeen)}</td>
                  <td className="w-bar">
                    <span className="adm-inline">
                      <Bar value={u.done / CHAPTERS.length} />
                      <span className="num">
                        {f.n(u.done)}/{f.n(CHAPTERS.length)}
                      </span>
                    </span>
                  </td>
                  <td className="num">{u.answered ? f.pct(u.correct, u.answered) : <span className="muted">—</span>}</td>
                  <td className="nowrap">
                    <RoleChips role={u.role} status={u.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <BottomSheet open={sheet && !!openId} onClose={() => setSheet(false)} modal title={tx('یادگیرنده', 'Learner')}>
        {openId && <LearnerDetail id={openId} me={me} onChanged={reload} onGone={() => setSheet(false)} />}
      </BottomSheet>
    </Section>
  );
}

function RoleChips({ role, status }: { role: UserRow['role']; status: UserRow['status'] }) {
  const tx = useTx();
  return (
    <>
      {role === 'owner' && <Chip tone="butter">{tx('مالک', 'Owner')}</Chip>}
      {role === 'admin' && <Chip tone="sky">{tx('مدیر', 'Admin')}</Chip>}
      {status === 'blocked' ? <Chip tone="coral">{tx('مسدود', 'Blocked')}</Chip> : role === 'learner' && <Chip>{tx('فعال', 'Active')}</Chip>}
    </>
  );
}

function LearnerDetail({ id, me, onChanged, onGone }: { id: string; me: Me; onChanged: () => void; onGone: () => void }) {
  const { t } = useApp();
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<UserDetail>(`/users/${id}`), [id]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | 'delete' | 'reset' | 'block'>(null);
  const [typed, setTyped] = useState('');

  if (error) return <ErrorNote error={error} retry={reload} />;
  if (loading && !data) return <Loading />;
  if (!data) return null;
  const u = data.user;
  const self = u.id === me.id;
  const isOwner = me.role === 'owner';
  const protectedTarget = u.role === 'owner' || self;
  const canModerate = !protectedTarget && (u.role !== 'admin' || isOwner);

  const act = async (action: string, extra: Record<string, unknown> = {}) => {
    setBusy(true);
    setMsg(null);
    try {
      await api.post(`/users/${id}/action`, { action, ...extra });
      setConfirm(null);
      setTyped('');
      onChanged();
      if (action === 'delete') return onGone();
      reload();
      setMsg(tx('انجام شد و در گزارش ثبت شد.', 'Done, and recorded in the audit log.'));
    } catch (e) {
      const code = e instanceof ApiError ? e.code : 'error';
      setMsg(
        code === 'owner_only'
          ? tx('فقط مالک می‌تواند.', 'Only the owner can do this.')
          : code === 'protected'
            ? tx('این حساب محافظت شده است.', 'This account is protected.')
            : tx('انجام نشد.', 'That did not work.') + ` (${code})`,
      );
    } finally {
      setBusy(false);
    }
  };

  const p = data.progress;
  const q = Object.values(p.quizzes);
  return (
    <div className="adm-detail">
      <p className="adm-detail-head">
        <b className="ltr">{u.email}</b> <RoleChips role={u.role} status={u.status} />
      </p>
      <dl className="adm-dl">
        <div>
          <dt>{tx('عضویت', 'Joined')}</dt>
          <dd>{f.date(u.createdAt)}</dd>
        </div>
        <div>
          <dt>{tx('آخرین همگام‌سازی', 'Last sync')}</dt>
          <dd>{f.rel(data.syncedAt)}</dd>
        </div>
        <div>
          <dt>{tx('فصل‌های تمام‌شده', 'Chapters done')}</dt>
          <dd>
            {f.n(Object.keys(p.done).length)}/{f.n(CHAPTERS.length)}
          </dd>
        </div>
        <div>
          <dt>{tx('سؤال‌ها', 'Questions')}</dt>
          <dd>
            {f.n(q.filter((x) => x.correct).length)}/{f.n(q.length)} {tx('درست', 'correct')}
          </dd>
        </div>
        <div>
          <dt>{tx('الان کجاست', 'Currently at')}</dt>
          <dd>{p.position ? <a href={href.chapter(p.position.slug, p.position.section)}>{t(CHAPTERS.find((c) => c.slug === p.position!.slug)?.title ?? { fa: p.position.slug, en: p.position.slug })}</a> : '—'}</dd>
        </div>
      </dl>

      <div className="adm-dots" aria-label={tx('فصل‌ها', 'Chapters')}>
        {CHAPTERS.map((c, i) => (
          <span key={c.slug} className={p.done[c.slug] ? 'on' : ''} title={`${i + 1}. ${t(c.title)}`} />
        ))}
      </div>

      <h3 className="adm-h3">{tx('نشست‌ها', 'Sessions')}</h3>
      {data.sessions.length ? (
        <div className="tbl-wrap">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">{tx('شناسه', 'Ref')}</th>
                <th scope="col">{tx('شروع', 'Started')}</th>
                <th scope="col">{tx('آخرین فعالیت', 'Last active')}</th>
                <th scope="col">{tx('وضعیت', 'State')}</th>
              </tr>
            </thead>
            <tbody>
              {data.sessions.map((s) => (
                <tr key={s.ref}>
                  <td>
                    <code>{s.ref}</code>
                  </td>
                  <td className="nowrap">{f.dateTime(s.createdAt)}</td>
                  <td className="nowrap">{f.rel(s.lastSeen)}</td>
                  <td>{s.live ? <Chip tone="mint">{tx('باز', 'Open')}</Chip> : <Chip>{tx('منقضی', 'Expired')}</Chip>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty>{tx('نشست بازی ندارد.', 'No sessions.')}</Empty>
      )}

      <h3 className="adm-h3">{tx('کارها', 'Actions')}</h3>
      <div className="adm-actions">
        <button type="button" className="btn btn--small" disabled={busy || !data.sessions.length} onClick={() => act('signout')}>
          {tx('خروج از همه دستگاه‌ها', 'Sign out everywhere')}
        </button>
        <button type="button" className="btn btn--small" disabled={busy} onClick={() => setConfirm('reset')}>
          {tx('صفر کردن پیشرفت', 'Reset progress')}
        </button>
        {canModerate &&
          (u.status === 'blocked' ? (
            <button type="button" className="btn btn--small" disabled={busy} onClick={() => act('unblock')}>
              {tx('رفع مسدودی', 'Unblock')}
            </button>
          ) : (
            <button type="button" className="btn btn--small" disabled={busy} onClick={() => setConfirm('block')}>
              {tx('مسدود کردن', 'Block')}
            </button>
          ))}
        {isOwner && !protectedTarget && (
          <button type="button" className="btn btn--small" disabled={busy} onClick={() => act(u.role === 'admin' ? 'remove_admin' : 'make_admin')}>
            {u.role === 'admin' ? tx('برداشتن مدیریت', 'Remove admin') : tx('مدیر کردن', 'Make admin')}
          </button>
        )}
        {canModerate && (
          <button type="button" className="btn btn--small btn--danger" disabled={busy} onClick={() => setConfirm('delete')}>
            {tx('حذف حساب', 'Delete account')}
          </button>
        )}
      </div>

      {confirm === 'reset' && (
        <div className="adm-confirm" role="alert">
          <p>{tx('پیشرفت ذخیره‌شده روی سرور پاک می‌شود. دستگاه یادگیرنده در همگام‌سازی بعدی دوباره پیشرفت خودش را می‌فرستد.', "The progress stored on the server is cleared. The learner's device sends its own progress again on the next sync.")}</p>
          <button type="button" className="btn btn--small" disabled={busy} onClick={() => act('reset_progress')}>
            {tx('بله، صفر کن', 'Yes, reset')}
          </button>{' '}
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirm(null)}>
            {tx('نه', 'Cancel')}
          </button>
        </div>
      )}
      {confirm === 'block' && (
        <div className="adm-confirm" role="alert">
          <p>{tx('از همه دستگاه‌ها خارج می‌شود و دیگر پیوند ورود نمی‌گیرد. دوره بدون ورود همچنان برایش باز است.', 'Signs them out everywhere and stops sign-in links. The course itself stays open without signing in.')}</p>
          <button type="button" className="btn btn--small" disabled={busy} onClick={() => act('block')}>
            {tx('بله، مسدود کن', 'Yes, block')}
          </button>{' '}
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirm(null)}>
            {tx('نه', 'Cancel')}
          </button>
        </div>
      )}
      {confirm === 'delete' && (
        <div className="adm-confirm" role="alert">
          <p>{tx('حساب، نشست‌ها و پیشرفت روی سرور برای همیشه پاک می‌شوند. برای تأیید، ایمیل را بنویسید:', 'The account, its sessions and its stored progress are deleted for good. Type the email to confirm:')}</p>
          <input className="adm-input" dir="ltr" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder={u.email} aria-label={tx('ایمیل برای تأیید', 'Email to confirm')} />
          <button type="button" className="btn btn--small btn--danger" disabled={busy || typed.trim() !== u.email} onClick={() => act('delete', { confirm: typed.trim() })}>
            {tx('حذف برای همیشه', 'Delete for good')}
          </button>{' '}
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirm(null)}>
            {tx('نه', 'Cancel')}
          </button>
        </div>
      )}
      {msg && (
        <p className="adm-msg" role="status">
          {msg}
        </p>
      )}

      <h3 className="adm-h3">{tx('سابقه', 'History')}</h3>
      {data.history.length ? (
        <ul className="adm-history">
          {data.history.map((h) => (
            <li key={h.id}>
              <span className="muted nowrap">{f.dateTime(h.at)}</span> <code>{h.action}</code> <span className="ltr muted">{h.actor_email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <Empty>{tx('هنوز کاری روی این حساب انجام نشده است.', 'No admin actions on this account yet.')}</Empty>
      )}
    </div>
  );
}
