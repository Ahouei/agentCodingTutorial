/**
 * Announcements: draft → preview → publish (admin-panel-design §2).
 * The preview is the learner banner component itself, in both languages.
 * Published announcements are read-only: unpublish, or duplicate into a new draft to change one.
 */
import { useEffect, useState } from 'react';
import { AnnouncementBanner } from '../components/Announcement';
import { Rich } from '../components/blocks/Rich';
import { useTx } from '../lib/app';
import { api, ApiError, type Announcement } from './api';
import { Chip, Empty, ErrorNote, Loading, Section, useFmt } from './ui';
import { useLoad } from './useLoad';

type Draft = { tone: string; title_fa: string; title_en: string; body_fa: string; body_en: string; link: string };
const BLANK: Draft = { tone: 'info', title_fa: '', title_en: '', body_fa: '', body_en: '', link: '' };

export function AnnouncementsPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<{ announcements: Announcement[] }>('/announcements'));
  const [selected, setSelected] = useState<string | 'new' | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const list = data?.announcements ?? [];
  const current = selected && selected !== 'new' ? list.find((a) => a.id === selected) ?? null : null;
  const live = list.find((a) => a.status === 'published');

  useEffect(() => {
    if (selected === null && data) setSelected(list.find((a) => a.status === 'draft')?.id ?? 'new');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const statusChip = (s: Announcement['status']) =>
    s === 'published' ? <Chip tone="mint">{tx('منتشر شده', 'Live')}</Chip> : s === 'draft' ? <Chip tone="butter">{tx('پیش‌نویس', 'Draft')}</Chip> : <Chip>{tx('بایگانی', 'Archived')}</Chip>;

  return (
    <>
      <Section
        title={tx('اطلاعیه‌ها', 'Announcements')}
        sub={tx(
          'یک نوار کوچک بالای همه صفحه‌ها برای یادگیرنده‌ها. اول پیش‌نویس، بعد پیش‌نمایش دقیق، بعد انتشار. هر بار فقط یکی منتشر است.',
          'A small banner on top of every learner page. Draft first, then an exact preview, then publish. Only one is live at a time.',
        )}
        actions={
          <button
            type="button"
            className="btn btn--small btn--primary"
            onClick={() => {
              setSelected('new');
              setMsg(null);
            }}
          >
            {tx('+ اطلاعیه تازه', '+ New announcement')}
          </button>
        }
      >
        <p className="adm-live">
          {live ? (
            <>
              {tx('الان منتشر است:', 'Live now:')} <b>
                <Rich text={tx(live.title_fa, live.title_en)} />
              </b> <span className="muted">· {f.rel(live.published_at)}</span>
            </>
          ) : (
            <span className="muted">{tx('الان اطلاعیه‌ای منتشر نیست.', 'Nothing is live right now.')}</span>
          )}
        </p>
        {error ? (
          <ErrorNote error={error} retry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : list.length ? (
          <div className="tbl-wrap">
            <table className="adm-tbl adm-tbl--rows">
              <thead>
                <tr>
                  <th scope="col">{tx('عنوان', 'Title')}</th>
                  <th scope="col">{tx('وضعیت', 'Status')}</th>
                  <th scope="col">{tx('تغییر', 'Updated')}</th>
                  <th scope="col">{tx('منتشرکننده', 'Published by')}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a.id} aria-current={selected === a.id ? 'true' : undefined}>
                    <td>
                      <button
                        type="button"
                        className="adm-rowlink"
                        onClick={() => {
                          setSelected(a.id);
                          setMsg(null);
                        }}
                      >
                        <Rich text={tx(a.title_fa, a.title_en)} />
                      </button>
                    </td>
                    <td>{statusChip(a.status)}</td>
                    <td className="nowrap muted">{f.rel(a.updated_at)}</td>
                    <td className="ltr muted">{a.published_by ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>{tx('هنوز اطلاعیه‌ای نساخته‌اید.', 'No announcements yet.')}</Empty>
        )}
      </Section>

      {selected && (selected === 'new' || current) && (
        <Editor
          // Remount when the stored version changes, so the form always starts from what is saved.
          key={`${selected}:${current?.updated_at ?? ''}`}
          a={current}
          msg={msg}
          setMsg={setMsg}
          hasLive={!!live && live.id !== current?.id}
          onSaved={(id) => {
            reload();
            if (id) setSelected(id);
          }}
          onDeleted={() => {
            setSelected('new');
            reload();
          }}
          statusChip={statusChip}
        />
      )}
    </>
  );
}

function Editor({
  a,
  msg,
  setMsg,
  hasLive,
  onSaved,
  onDeleted,
  statusChip,
}: {
  a: Announcement | null;
  msg: { ok: boolean; text: string } | null;
  setMsg: (m: { ok: boolean; text: string } | null) => void;
  hasLive: boolean;
  onSaved: (id?: string) => void;
  onDeleted: () => void;
  statusChip: (s: Announcement['status']) => React.ReactNode;
}) {
  const tx = useTx();
  const [d, setD] = useState<Draft>(() => (a ? { tone: a.tone, title_fa: a.title_fa, title_en: a.title_en, body_fa: a.body_fa, body_en: a.body_en, link: a.link } : BLANK));
  const [busy, setBusy] = useState(false);
  const [bad, setBad] = useState<string[]>([]);
  const [confirmPublish, setConfirmPublish] = useState(false);
  const editable = !a || a.status === 'draft';
  const dirty = !a || (['tone', 'title_fa', 'title_en', 'body_fa', 'body_en', 'link'] as const).some((k) => a[k] !== d[k]);
  const set = (k: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setD((x) => ({ ...x, [k]: e.target.value }));

  const run = async (fn: () => Promise<unknown>, done: string, after?: (r: unknown) => void) => {
    setBusy(true);
    setMsg(null);
    setBad([]);
    try {
      const r = await fn();
      setMsg({ ok: true, text: done });
      after?.(r);
    } catch (e) {
      const fields = e instanceof ApiError && Array.isArray(e.data.fields) ? (e.data.fields as string[]) : [];
      setBad(fields);
      setMsg({ ok: false, text: fields.length ? tx('چند فیلد درست نیست (قرمز).', 'Some fields need fixing (in red).') : tx('انجام نشد.', 'That did not work.') });
    } finally {
      setBusy(false);
    }
  };

  const save = () =>
    run(
      () => (a ? api.put(`/announcements/${a.id}`, d) : api.post<{ id: string }>('/announcements', d)),
      tx('پیش‌نویس ذخیره شد.', 'Draft saved.'),
      (r) => onSaved((r as { id?: string })?.id),
    );
  const publish = () =>
    run(
      async () => {
        let id = a?.id;
        if (!a) id = (await api.post<{ id: string }>('/announcements', d)).id;
        else if (dirty) await api.put(`/announcements/${a.id}`, d);
        await api.post(`/announcements/${id}/publish`);
        return { id };
      },
      tx('منتشر شد. یادگیرنده‌ها تا یک دقیقه دیگر آن را می‌بینند.', 'Published. Learners see it within a minute.'),
      (r) => {
        setConfirmPublish(false);
        onSaved((r as { id?: string }).id);
      },
    );

  const field = (k: keyof Draft, label: string, opts: { area?: boolean; dir?: 'rtl' | 'ltr'; max: number; hint?: string }) => (
    <label className={`adm-field ${bad.includes(k) ? 'is-bad' : ''}`}>
      <span>
        {label} <small className="muted">{`${d[k].length}/${opts.max}`}</small>
      </span>
      {opts.area ? (
        <textarea value={d[k]} onChange={set(k)} dir={opts.dir} maxLength={opts.max} rows={2} disabled={!editable} />
      ) : (
        <input value={d[k]} onChange={set(k)} dir={opts.dir} maxLength={opts.max} disabled={!editable} />
      )}
      {opts.hint && <small className="muted">{opts.hint}</small>}
    </label>
  );

  const preview = { id: a?.id ?? 'preview', ...d, title_fa: d.title_fa || tx('عنوان فارسی', 'Persian title'), title_en: d.title_en || 'English title' };

  return (
    <Section
      title={a ? tx('ویرایش اطلاعیه', 'Edit announcement') : tx('اطلاعیه تازه', 'New announcement')}
      actions={a ? statusChip(a.status) : <Chip tone="butter">{tx('پیش‌نویس', 'Draft')}</Chip>}
    >
      {!editable && (
        <p className="adm-warn">
          {tx('اطلاعیه منتشرشده یا بایگانی‌شده قابل ویرایش نیست. برای تغییر، از آن یک پیش‌نویس تازه بسازید.', 'A live or archived announcement is read-only. To change it, make a new draft from it.')}
        </p>
      )}
      <div className="adm-editor">
        <div className="adm-form">
          <fieldset className="adm-tones" disabled={!editable}>
            <legend>{tx('حال‌وهوا', 'Tone')}</legend>
            {(
              [
                ['info', tx('خبر', 'News')],
                ['celebrate', tx('جشن', 'Celebrate')],
                ['warn', tx('هشدار', 'Heads-up')],
              ] as const
            ).map(([v, label]) => (
              <label key={v} className="adm-radio">
                <input type="radio" name="tone" value={v} checked={d.tone === v} onChange={() => setD((x) => ({ ...x, tone: v }))} />
                {label}
              </label>
            ))}
          </fieldset>
          {field('title_fa', tx('عنوان فارسی', 'Persian title'), { dir: 'rtl', max: 120 })}
          {field('title_en', tx('عنوان انگلیسی', 'English title'), { dir: 'ltr', max: 120 })}
          {field('body_fa', tx('متن فارسی (اختیاری)', 'Persian text (optional)'), { area: true, dir: 'rtl', max: 400 })}
          {field('body_en', tx('متن انگلیسی (اختیاری)', 'English text (optional)'), { area: true, dir: 'ltr', max: 400 })}
          {field('link', tx('پیوند (اختیاری)', 'Link (optional)'), { dir: 'ltr', max: 300, hint: tx('مسیر داخلی مثل /c/be-found یا نشانی https://', 'An internal path like /c/be-found, or an https:// address') })}
        </div>
        <div className="adm-preview">
          <span className="eyebrow">{tx('پیش‌نمایش دقیق برای یادگیرنده', 'Exactly what learners see')}</span>
          <AnnouncementBanner a={preview} lang="fa" preview onDismiss={() => {}} />
          <AnnouncementBanner a={preview} lang="en" preview onDismiss={() => {}} />
        </div>
      </div>
      <div className="adm-actions">
        {editable && (
          <button type="button" className="btn btn--small" disabled={busy || !dirty} onClick={save}>
            {tx('ذخیره پیش‌نویس', 'Save draft')}
          </button>
        )}
        {editable && (
          <button type="button" className="btn btn--small btn--primary" disabled={busy} onClick={() => (hasLive ? setConfirmPublish(true) : publish())}>
            {tx('انتشار', 'Publish')}
          </button>
        )}
        {a?.status === 'published' && (
          <button type="button" className="btn btn--small" disabled={busy} onClick={() => run(() => api.post(`/announcements/${a.id}/unpublish`), tx('از سایت برداشته شد.', 'Taken down.'), () => onSaved())}>
            {tx('برداشتن از سایت', 'Unpublish')}
          </button>
        )}
        {a && a.status !== 'draft' && (
          <button
            type="button"
            className="btn btn--small"
            disabled={busy}
            onClick={() => run(() => api.post<{ id: string }>(`/announcements/${a.id}/duplicate`), tx('پیش‌نویس تازه ساخته شد.', 'New draft created.'), (r) => onSaved((r as { id: string }).id))}
          >
            {tx('ساخت پیش‌نویس از این', 'Make a draft from this')}
          </button>
        )}
        {a && a.status !== 'published' && (
          <button type="button" className="btn btn--small btn--ghost" disabled={busy} onClick={() => run(() => api.del(`/announcements/${a.id}`), tx('حذف شد.', 'Deleted.'), onDeleted)}>
            {tx('حذف', 'Delete')}
          </button>
        )}
      </div>
      {confirmPublish && (
        <div className="adm-confirm" role="alert">
          <p>{tx('یک اطلاعیه دیگر الان منتشر است. با انتشار این، آن یکی بایگانی می‌شود.', 'Another announcement is live. Publishing this one archives it.')}</p>
          <button type="button" className="btn btn--small btn--primary" disabled={busy} onClick={publish}>
            {tx('بله، منتشر کن', 'Yes, publish')}
          </button>{' '}
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setConfirmPublish(false)}>
            {tx('نه', 'Cancel')}
          </button>
        </div>
      )}
      {msg && (
        <p className={msg.ok ? 'adm-msg' : 'adm-error'} role="status">
          {msg.text}
        </p>
      )}
    </Section>
  );
}
