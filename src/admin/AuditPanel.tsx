/** Audit log as a first-class screen (admin-panel-design §3): who did what, to which record, when, old → new. */
import { useEffect, useState } from 'react';
import { useTx } from '../lib/app';
import { api, type AuditEntry } from './api';
import { Chip, Empty, ErrorNote, Loading, Section, useFmt } from './ui';

function describe(detail: string | null): string {
  if (!detail) return '';
  try {
    const d = JSON.parse(detail) as Record<string, unknown>;
    return Object.entries(d)
      .map(([k, v]) => {
        if (v && typeof v === 'object' && 'from' in (v as object) && 'to' in (v as object)) {
          const x = v as { from: unknown; to: unknown };
          return `${k}: ${JSON.stringify(x.from)} → ${JSON.stringify(x.to)}`;
        }
        return `${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`;
      })
      .join(' · ');
  } catch {
    return detail;
  }
}

const tone = (action: string) => (/delete|block|remove|unpublish/.test(action) ? 'coral' : /publish|make_admin|create/.test(action) ? 'mint' : /settings/.test(action) ? 'butter' : 'sky');

export function AuditPanel() {
  const tx = useTx();
  const f = useFmt();
  const [q, setQ] = useState('');
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [more, setMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const load = async (query: string, before?: number) => {
    setLoading(true);
    try {
      const r = await api.get<{ entries: AuditEntry[]; more: boolean }>(`/audit?q=${encodeURIComponent(query)}${before ? `&before=${before}` : ''}`);
      setEntries((e) => (before ? [...e, ...r.entries] : r.entries));
      setMore(r.more);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = window.setTimeout(() => load(q.trim()), 250);
    return () => window.clearTimeout(t);
  }, [q]);

  return (
    <Section title={tx('گزارش کارها', 'Audit log')} sub={tx('هر تغییری که مدیرها می‌دهند، با نام انجام‌دهنده و مقدار قبل و بعد.', 'Every change an admin makes, with who made it and the before → after values.')}>
      <div className="adm-toolbar">
        <input
          className="adm-input"
          type="search"
          dir="ltr"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tx('جست‌وجو: کار، ایمیل، رکورد…', 'Search: action, email, record…')}
          aria-label={tx('جست‌وجو در گزارش', 'Search the audit log')}
        />
      </div>
      {error ? (
        <ErrorNote error={error} retry={() => load(q.trim())} />
      ) : loading && !entries.length ? (
        <Loading />
      ) : !entries.length ? (
        <Empty>{q ? tx('چیزی پیدا نشد.', 'Nothing matches.') : tx('هنوز کاری ثبت نشده است.', 'Nothing recorded yet.')}</Empty>
      ) : (
        <>
          <div className="tbl-wrap">
            <table className="adm-tbl">
              <thead>
                <tr>
                  <th scope="col">{tx('زمان', 'When')}</th>
                  <th scope="col">{tx('چه کسی', 'Who')}</th>
                  <th scope="col">{tx('کار', 'Action')}</th>
                  <th scope="col">{tx('جزئیات', 'Details')}</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((e) => (
                  <tr key={e.id}>
                    <td className="nowrap" title={new Date(e.at).toISOString()}>
                      {f.dateTime(e.at)}
                    </td>
                    <td className="ltr nowrap">{e.actor_email}</td>
                    <td className="nowrap">
                      <Chip tone={tone(e.action)}>
                        <code>{e.action}</code>
                      </Chip>
                    </td>
                    <td className="adm-detailcell ltr">{describe(e.detail)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {more && (
            <div className="adm-actions">
              <button type="button" className="btn btn--small" disabled={loading} onClick={() => load(q.trim(), entries[entries.length - 1]?.id)}>
                {tx('موارد قدیمی‌تر', 'Older entries')}
              </button>
            </div>
          )}
        </>
      )}
    </Section>
  );
}
