/**
 * Live settings (admin-panel-design §4): the knobs an operator may need at 2am,
 * stored in D1 and applied on the next request. The server validates every value again.
 */
import { useEffect, useState } from 'react';
import { useTx } from '../lib/app';
import { api, ApiError, type SettingsResponse, type SettingsValues } from './api';
import { ErrorNote, Loading, Section, useFmt } from './ui';
import { useLoad } from './useLoad';

type Key = keyof SettingsValues;

export function SettingsPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<SettingsResponse>('/settings'));
  const [v, setV] = useState<SettingsValues | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    if (data) setV(data.values);
  }, [data]);

  if (error) return <ErrorNote error={error} retry={reload} />;
  if ((loading && !data) || !data || !v) return <Loading />;

  const info: Record<Key, { label: string; help: string; unit?: string }> = {
    signin_enabled: {
      label: tx('ورود برای یادگیرنده‌ها', 'Sign-in for learners'),
      help: tx('کلید اضطراری. وقتی خاموش است فقط مدیرها پیوند ورود می‌گیرند؛ دوره بدون ورود کامل کار می‌کند.', 'Emergency switch. When off, only staff get sign-in links; the course works fully without signing in.'),
    },
    registration_mode: {
      label: tx('ثبت‌نام', 'Registration'),
      help: tx(
        'باز: هر کسی. فقط با دعوت: با کد ۱۲ حرفی از بخش «دعوت‌ها». بسته: هیچ حساب تازه‌ای. کسانی که حساب دارند همیشه وارد می‌شوند، و هر حساب فقط وقتی ساخته می‌شود که ایمیلش با پیوند تأیید شود.',
        'Open: anyone. Invite only: with a 12-character code from the Invites tab. Closed: no new accounts. Existing accounts can always sign in, and every account is created only once its email is confirmed through the link.',
      ),
    },
    start_ip_per_min: {
      label: tx('درخواست ورود از هر IP', 'Sign-in requests per IP'),
      help: tx('در هر دقیقه. جلوی ربات‌ها را می‌گیرد.', 'Per minute. Stops bots.'),
      unit: tx('در دقیقه', '/ minute'),
    },
    start_email_per_10min: {
      label: tx('ایمیل ورود به هر نشانی', 'Sign-in emails per address'),
      help: tx('در هر ۱۰ دقیقه. جلوی بمباران صندوق یک نفر را می‌گیرد.', 'Per 10 minutes. Stops someone flooding one inbox.'),
      unit: tx('در ۱۰ دقیقه', '/ 10 min'),
    },
    emails_per_day: {
      label: tx('سقف ایمیل روزانه', 'Daily email cap'),
      help: tx('کل ایمیل‌های ورود در هر روز (UTC). سقف هزینه Resend. صفر یعنی هیچ ایمیلی نرود.', 'All sign-in emails per UTC day. Your Resend cost cap. Zero sends none.'),
      unit: tx('در روز', '/ day'),
    },
  };
  const keys = Object.keys(info) as Key[];
  const changed = keys.filter((k) => v[k] !== data.values[k]);

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      await api.put('/settings', { values: Object.fromEntries(changed.map((k) => [k, v[k]])) });
      setMsg({ ok: true, text: tx('ذخیره شد. از درخواست بعدی اعمال می‌شود و در گزارش ثبت شد.', 'Saved. Applies from the next request, and is in the audit log.') });
      reload();
    } catch (e) {
      const keysBad = e instanceof ApiError && Array.isArray(e.data.keys) ? (e.data.keys as string[]).join(', ') : '';
      setMsg({ ok: false, text: tx('ذخیره نشد.', 'Not saved.') + (keysBad ? ` (${keysBad})` : '') });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Section title={tx('تنظیمات زنده', 'Live settings')} sub={tx('بدون انتشار دوباره، از درخواست بعدی اعمال می‌شوند.', 'No redeploy: they apply from the next request.')}>
      <div className="adm-settings">
        {keys.map((k) => {
          const def = data.defs[k];
          const meta = data.meta.find((m) => m.key === k);
          const isDefault = v[k] === data.defaults[k];
          return (
            <div key={k} className={`adm-setting ${changed.includes(k) ? 'is-changed' : ''}`}>
              <div className="adm-setting-text">
                <label htmlFor={`set-${k}`}>{info[k].label}</label>
                <p>{info[k].help}</p>
                <small className="muted">
                  {meta ? tx(`آخرین تغییر: ${f.rel(meta.updated_at)} · `, `Last changed ${f.rel(meta.updated_at)} by `) : tx('پیش‌فرض', 'Default')}
                  {meta && <span className="ltr">{meta.updated_by}</span>}
                  {!isDefault && def.type === 'int' && tx(` · پیش‌فرض ${f.n(def.def)}`, ` · default ${def.def}`)}
                </small>
              </div>
              {def.type === 'enum' ? (
                <div className="adm-seg" role="group" aria-label={info[k].label}>
                  {def.values.map((val) => (
                    <button key={val} type="button" aria-pressed={v[k] === val} onClick={() => setV({ ...v, [k]: val })}>
                      {val === 'open' ? tx('باز', 'Open') : val === 'invite' ? tx('فقط با دعوت', 'Invite only') : val === 'closed' ? tx('بسته', 'Closed') : val}
                    </button>
                  ))}
                </div>
              ) : def.type === 'bool' ? (
                <button
                  id={`set-${k}`}
                  type="button"
                  role="switch"
                  aria-checked={v[k] as boolean}
                  className="adm-switch"
                  onClick={() => setV({ ...v, [k]: !v[k] })}
                >
                  <span aria-hidden />
                  <b>{v[k] ? tx('روشن', 'On') : tx('خاموش', 'Off')}</b>
                </button>
              ) : (
                <span className="adm-num">
                  <input
                    id={`set-${k}`}
                    type="number"
                    inputMode="numeric"
                    dir="ltr"
                    min={def.type === 'int' ? def.min : 0}
                    max={def.type === 'int' ? def.max : 0}
                    step={1}
                    value={String(v[k])}
                    onChange={(e) => {
                      const n = Math.round(Number(e.target.value));
                      if (Number.isFinite(n) && def.type === 'int') setV({ ...v, [k]: Math.min(def.max, Math.max(def.min, n)) });
                    }}
                  />
                  <small className="muted">{info[k].unit}</small>
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="adm-actions">
        <button type="button" className="btn btn--small btn--primary" disabled={busy || !changed.length} onClick={save}>
          {changed.length ? tx(`ذخیره ${f.n(changed.length)} تغییر`, `Save ${changed.length} change${changed.length > 1 ? 's' : ''}`) : tx('بدون تغییر', 'No changes')}
        </button>
        {changed.length > 0 && (
          <button type="button" className="btn btn--small btn--ghost" disabled={busy} onClick={() => setV(data.values)}>
            {tx('برگرداندن', 'Undo')}
          </button>
        )}
      </div>
      {msg && (
        <p className={msg.ok ? 'adm-msg' : 'adm-error'} role="status">
          {msg.text}
        </p>
      )}
      <p className="adm-fine">
        {tx(
          'کلیدها (Resend، Turnstile) و نشانی مالک عمداً اینجا نیستند: Secretهای Worker هستند و تغییرشان تصمیم آگاهانه می‌خواهد.',
          'Keys (Resend, Turnstile) and the owner address are deliberately not here: they are Worker secrets, and changing them should be a deliberate decision.',
        )}
      </p>
    </Section>
  );
}
