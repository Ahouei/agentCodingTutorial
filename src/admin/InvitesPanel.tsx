/**
 * Invites: 12-character codes for registration mode "invite only".
 * A code is shown in full exactly once, right after it is created (only its hash is stored);
 * the list shows its first four characters, label, uses, expiry and how many accounts it made.
 */
import { useState } from 'react';
import { href, useTx } from '../lib/app';
import { api } from './api';
import { Chip, Empty, ErrorNote, Loading, Section, useFmt } from './ui';
import { useLoad } from './useLoad';

type Invite = { id: string; hint: string; label: string; max_uses: number; uses: number; expires_at: number | null; created_at: number; created_by: string; revoked_at: number | null; accounts: number };
const pretty = (c: string) => `${c.slice(0, 4)}-${c.slice(4, 8)}-${c.slice(8, 12)}`;

export function InvitesPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<{ invites: Invite[]; mode: 'open' | 'invite' | 'closed' }>('/invites'));
  const [label, setLabel] = useState('');
  const [maxUses, setMaxUses] = useState(1);
  const [days, setDays] = useState(30);
  const [count, setCount] = useState(1);
  const [busy, setBusy] = useState(false);
  const [fresh, setFresh] = useState<string[] | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const create = async () => {
    setBusy(true);
    try {
      const r = await api.post<{ codes: { id: string; code: string }[] }>('/invites', { label, maxUses, expiresDays: days, count });
      setFresh(r.codes.map((c) => c.code));
      setLabel('');
      reload();
    } finally {
      setBusy(false);
    }
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard blocked: the code is selectable on screen */
    }
  };
  const status = (i: Invite) => {
    if (i.revoked_at) return <Chip>{tx('لغو شده', 'Revoked')}</Chip>;
    if (i.expires_at && i.expires_at < Date.now()) return <Chip>{tx('منقضی', 'Expired')}</Chip>;
    if (i.uses >= i.max_uses) return <Chip tone="sky">{tx('استفاده شده', 'Used up')}</Chip>;
    return <Chip tone="mint">{tx('فعال', 'Active')}</Chip>;
  };

  return (
    <>
      {data && data.mode !== 'invite' && (
        <p className="adm-warn">
          {data.mode === 'open'
            ? tx('ثبت‌نام الان «باز» است؛ کدها فقط وقتی لازم‌اند که حالت «فقط با دعوت» باشد. ', 'Registration is currently Open; codes only matter in Invite-only mode. ')
            : tx('ثبت‌نام الان «بسته» است؛ با کد هم کسی ثبت‌نام نمی‌کند. ', 'Registration is currently Closed; nobody can register, even with a code. ')}
          <a href={href.admin('settings')}>{tx('تغییر در تنظیمات', 'Change it in Settings')}</a>
        </p>
      )}

      <Section title={tx('ساخت کد دعوت', 'Create invite codes')} sub={tx('هر کد ۱۲ حرف است و فقط همین یک بار کامل نشان داده می‌شود. ثبت‌نام همیشه با تأیید ایمیل کامل می‌شود؛ کد فقط وقتی مصرف می‌شود که حساب واقعاً ساخته شود.', 'Each code has 12 characters and is shown in full only this once. Registration always completes with email confirmation; a code is used only when an account is actually created.')}>
        <div className="adm-invite-form">
          <label className="adm-field">
            <span>{tx('برچسب (اختیاری)', 'Label (optional)')}</span>
            <input className="adm-input" value={label} maxLength={80} onChange={(e) => setLabel(e.target.value)} placeholder={tx('مثلاً کلاس پاییز', 'e.g. autumn class')} />
          </label>
          <label className="adm-field">
            <span>{tx('دفعات استفاده هر کد', 'Uses per code')}</span>
            <input className="adm-input" type="number" dir="ltr" min={1} max={1000} value={maxUses} onChange={(e) => setMaxUses(Math.min(1000, Math.max(1, Math.round(Number(e.target.value) || 1))))} />
          </label>
          <label className="adm-field">
            <span>{tx('اعتبار (روز، ۰ = همیشه)', 'Valid for (days, 0 = forever)')}</span>
            <input className="adm-input" type="number" dir="ltr" min={0} max={365} value={days} onChange={(e) => setDays(Math.min(365, Math.max(0, Math.round(Number(e.target.value) || 0))))} />
          </label>
          <label className="adm-field">
            <span>{tx('تعداد کد', 'How many codes')}</span>
            <input className="adm-input" type="number" dir="ltr" min={1} max={50} value={count} onChange={(e) => setCount(Math.min(50, Math.max(1, Math.round(Number(e.target.value) || 1))))} />
          </label>
        </div>
        <div className="adm-actions">
          <button type="button" className="btn btn--small btn--primary" disabled={busy} onClick={create}>
            {busy ? tx('در حال ساخت…', 'Creating…') : tx('ساخت کد', 'Create codes')}
          </button>
        </div>
        {fresh && (
          <div className="adm-confirm" role="status">
            <p>
              <b>{tx('کدها را همین الان کپی کنید؛ دوباره کامل نشان داده نمی‌شوند.', 'Copy these now; they won’t be shown in full again.')}</b>
            </p>
            <ul className="adm-codes">
              {fresh.map((c) => (
                <li key={c}>
                  <code dir="ltr">{pretty(c)}</code>
                  <button type="button" className="btn btn--small" onClick={() => copy(pretty(c))}>
                    {copied === pretty(c) ? tx('کپی شد ✓', 'Copied ✓') : tx('کپی', 'Copy')}
                  </button>
                </li>
              ))}
            </ul>
            {fresh.length > 1 && (
              <button type="button" className="btn btn--small" onClick={() => copy(fresh.map(pretty).join('\n'))}>
                {tx('کپی همه', 'Copy all')}
              </button>
            )}{' '}
            <button type="button" className="btn btn--small btn--ghost" onClick={() => setFresh(null)}>
              {tx('بستن', 'Done')}
            </button>
          </div>
        )}
      </Section>

      <Section title={tx('کدهای دعوت', 'Invite codes')}>
        {error ? (
          <ErrorNote error={error} retry={reload} />
        ) : loading && !data ? (
          <Loading />
        ) : !data?.invites.length ? (
          <Empty>{tx('هنوز کدی ساخته نشده است.', 'No codes yet.')}</Empty>
        ) : (
          <div className="tbl-wrap">
            <table className="adm-tbl">
              <thead>
                <tr>
                  <th scope="col">{tx('کد', 'Code')}</th>
                  <th scope="col">{tx('برچسب', 'Label')}</th>
                  <th scope="col" className="num">
                    {tx('استفاده', 'Uses')}
                  </th>
                  <th scope="col" className="num">
                    {tx('حساب‌ها', 'Accounts')}
                  </th>
                  <th scope="col">{tx('انقضا', 'Expires')}</th>
                  <th scope="col">{tx('وضعیت', 'Status')}</th>
                  <th scope="col">{tx('سازنده', 'Created by')}</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {data.invites.map((i) => (
                  <tr key={i.id}>
                    <td>
                      <code dir="ltr">{i.hint}-••••-••••</code>
                    </td>
                    <td>{i.label || <span className="muted">—</span>}</td>
                    <td className="num">
                      {f.n(i.uses)}/{f.n(i.max_uses)}
                    </td>
                    <td className="num">{f.n(i.accounts)}</td>
                    <td className="nowrap">{i.expires_at ? f.date(i.expires_at) : <span className="muted">{tx('همیشه', 'never')}</span>}</td>
                    <td>{status(i)}</td>
                    <td className="ltr muted">{i.created_by}</td>
                    <td>
                      {!i.revoked_at && (
                        <button
                          type="button"
                          className="btn btn--small btn--ghost"
                          onClick={async () => {
                            await api.post(`/invites/${i.id}/revoke`).catch(() => {});
                            reload();
                          }}
                        >
                          {tx('لغو', 'Revoke')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </>
  );
}
