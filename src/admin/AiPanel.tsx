/**
 * Admin → Bit & AI. Everything here is live (no redeploy): on/off, the model chain with prices,
 * limits and the monthly budget, Bit's persona prompt, spend and usage, and the line pools with
 * moderation (hide / delete) and on-demand generation. API keys are Worker secrets: this screen
 * only shows whether each one is set.
 */
import { useEffect, useMemo, useState } from 'react';
import { CHAPTERS } from '../content';
import { useApp, useTx } from '../lib/app';
import { api, ApiError } from './api';
import { Bar, Chip, Empty, ErrorNote, Loading, Section, Stat, useFmt } from './ui';
import { useLoad } from './useLoad';

type Provider = 'anthropic' | 'gemini' | 'openai' | 'deepseek' | 'xai';
type Candidate = { provider: Provider; model: string };
type AiConfig = {
  enabled: boolean;
  chain: Candidate[];
  effort: 'low' | 'medium' | 'high';
  persona: string;
  batch: number;
  maxPool: number;
  growPercent: number;
  userPerMinute: number;
  userGenPerDay: number;
  globalGenPerMinute: number;
  monthlyBudgetUsd: number;
  prices: Record<string, { in: number; out: number }>;
};
type AiState = {
  config: AiConfig;
  defaults: AiConfig;
  defaultPersona: string;
  promptVersion: string;
  keys: Record<Provider, boolean>;
  usage: {
    totals: { cost: number; requests: number; ai: number | null; ai_ok: number | null; pool: number | null; cache: number | null; denied: number | null; users: number };
    byModel: { provider: string; model: string; calls: number; failed: number; tin: number; tout: number; cost: number }[];
    daily: { d: number; cost: number; ai: number; pool: number }[];
    errors: { at: number; provider: string; model: string; error: string }[];
  };
  pools: { slug: string; section: string; lang: string; n: number; hidden: number; served: number }[];
};
type RegModel = { provider: Provider; model_id: string; display_name: string; source: string; created: number | null; price_in: number | null; price_out: number | null };
type CatStatus = { provider: Provider; synced_at: number; ok: number; error: string | null; models: number };
type SyncSummary = { provider: Provider; added: number; updated: number; deactivated: number; total: number; error?: string; skipped?: boolean };
type Registry = { models: RegModel[]; status: CatStatus[]; keys: Record<Provider, boolean> };

type Line = { id: number; section: string; text: string; provider: string; model: string; created_at: number; hidden: number; served: number };

const PROVIDERS: Provider[] = ['anthropic', 'gemini', 'openai', 'deepseek', 'xai'];
const KEY: Record<Provider, string> = { anthropic: 'ANTHROPIC_API_KEY', gemini: 'GEMINI_API_KEY', openai: 'OPENAI_API_KEY', deepseek: 'DEEPSEEK_API_KEY', xai: 'XAI_API_KEY' };
const PNAME: Record<Provider, string> = { anthropic: 'Anthropic (Claude)', gemini: 'Google Gemini', openai: 'OpenAI', deepseek: 'DeepSeek', xai: 'xAI (Grok)' };

export function AiPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<AiState>('/ai'));
  const reg = useLoad(() => api.get<Registry>('/ai/models'));
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncSummary[] | null>(null);
  const [cfg, setCfg] = useState<AiConfig | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  useEffect(() => {
    if (data) setCfg(data.config);
  }, [data]);

  if (error) return <ErrorNote error={error} retry={reload} />;
  if ((loading && !data) || !data || !cfg) return <Loading />;

  const dirty = JSON.stringify(cfg) !== JSON.stringify(data.config);
  const anyKey = cfg.chain.some((c) => data.keys[c.provider]);
  const u = data.usage.totals;
  const set = <K extends keyof AiConfig>(k: K, v: AiConfig[K]) => setCfg({ ...cfg, [k]: v });
  const setCand = (i: number, patch: Partial<Candidate>) => set('chain', cfg.chain.map((c, j) => (j === i ? { ...c, ...patch } : c)));
  const move = (i: number, d: -1 | 1) => {
    const ch = [...cfg.chain];
    const j = i + d;
    if (j < 0 || j >= ch.length) return;
    [ch[i], ch[j]] = [ch[j], ch[i]];
    set('chain', ch);
  };

  const save = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.put<{ changed: string[]; promptVersion: string }>('/ai', { config: cfg });
      setMsg({ ok: true, text: tx(`ذخیره شد (${f.n(r.changed.length)} تغییر). از درخواست بعدی اعمال می‌شود.`, `Saved (${r.changed.length} changes). Applies from the next request.`) });
      reload();
    } catch (e) {
      const fields = e instanceof ApiError && Array.isArray(e.data.fields) ? (e.data.fields as string[]).join(', ') : '';
      setMsg({ ok: false, text: tx('ذخیره نشد', 'Not saved') + (fields ? ` (${fields})` : '') });
    } finally {
      setBusy(false);
    }
  };

  const numField = (k: keyof AiConfig, label: string, help: string, min: number, max: number, step = 1) => (
    <label className="adm-setting">
      <span className="adm-setting-text">
        <b>{label}</b>
        <p>{help}</p>
      </span>
      <span className="adm-num">
        <input type="number" dir="ltr" min={min} max={max} step={step} value={String(cfg[k])} onChange={(e) => set(k, Math.min(max, Math.max(min, Number(e.target.value) || 0)) as never)} />
      </span>
    </label>
  );

  return (
    <>
      {/* Status */}
      <div className="adm-stats">
        <Stat
          label={tx('Bit هوشمند', 'Smart Bit')}
          value={cfg.enabled && anyKey ? tx('روشن', 'On') : tx('خاموش', 'Off')}
          sub={!anyKey ? tx('کلید API تنظیم نشده', 'No API key set') : tx('فقط برای کاربران واردشده', 'Signed-in learners only')}
          tone={cfg.enabled && anyKey ? 'mint' : 'coral'}
        />
        <Stat
          label={tx('هزینه این ماه', 'Spend this month')}
          value={`$${(u.cost ?? 0).toFixed(2)}`}
          sub={<Bar value={cfg.monthlyBudgetUsd ? (u.cost ?? 0) / cfg.monthlyBudgetUsd : 1} tone={(u.cost ?? 0) / (cfg.monthlyBudgetUsd || 1) > 0.8 ? 'coral' : 'mint'} />}
        />
        <Stat label={tx('درخواست‌ها', 'Requests')} value={f.n(u.requests ?? 0)} sub={tx(`${f.n(u.users ?? 0)} کاربر`, `${u.users ?? 0} learners`)} tone="sky" />
        <Stat
          label={tx('از مخزن، بدون هزینه', 'From the pool, free')}
          value={f.pct((u.pool ?? 0) + (u.cache ?? 0), u.requests ?? 0)}
          sub={tx(`${f.n(u.ai ?? 0)} فراخوانی AI · ${f.n(u.denied ?? 0)} رد به‌خاطر سقف`, `${u.ai ?? 0} AI calls · ${u.denied ?? 0} over the cap`)}
          tone="butter"
        />
      </div>

      <Section title={tx('روشن/خاموش و کلیدها', 'On/off and keys')} sub={tx('کلیدها Secret هستند و فقط با wrangler تنظیم می‌شوند؛ اینجا فقط می‌بینید کدام تنظیم شده.', 'Keys are Worker secrets, set only with wrangler; here you only see which ones exist.')}>
        <div className="adm-settings">
          <div className="adm-setting">
            <div className="adm-setting-text">
              <b>{tx('Bit هوشمند برای کاربران واردشده', 'Smart Bit for signed-in learners')}</b>
              <p>{tx('خاموش باشد، Bit فقط جمله‌های آماده خودش را می‌گوید. مدیرها همیشه می‌توانند پایین‌تر پیش‌نمایش بسازند.', 'When off, Bit uses only his built-in lines. Admins can still generate previews below.')}</p>
            </div>
            <button type="button" role="switch" aria-checked={cfg.enabled} className="adm-switch" onClick={() => set('enabled', !cfg.enabled)}>
              <span aria-hidden />
              <b>{cfg.enabled ? tx('روشن', 'On') : tx('خاموش', 'Off')}</b>
            </button>
          </div>
        </div>
        <div className="adm-keys">
          {PROVIDERS.map((p) => (
            <span key={p} className={`adm-key ${data.keys[p] ? 'is-set' : ''}`}>
              <b>{PNAME[p]}</b>
              <code>{KEY[p]}</code>
              <Chip tone={data.keys[p] ? 'mint' : 'plain'}>{data.keys[p] ? tx('تنظیم شده', 'Set') : tx('ندارد', 'Missing')}</Chip>
            </span>
          ))}
        </div>
      </Section>

      <Section
        title={tx('مدل‌ها به ترتیب', 'Models, in order')}
        sub={tx(
          'فهرست مدل‌ها مستقیم از خود ارائه‌دهنده‌ها خوانده می‌شود (هر ۱۲ ساعت خودکار، یا با دکمه همگام‌سازی). فقط مدل‌هایی که واقعاً قابل استفاده‌اند و کلیدشان تنظیم شده انتخاب‌شدنی‌اند. اولی امتحان می‌شود؛ خطا یا محدودیت داشت، بعدی.',
          'The model list comes straight from each provider (refreshed automatically every 12 h, or with the sync button). Only callable models whose key is set can be picked. The first is tried; on an error or limit, the next.',
        )}
        actions={
          <button
            type="button"
            className="btn btn--small"
            disabled={syncing}
            onClick={async () => {
              setSyncing(true);
              try {
                const r = await api.post<{ providers: SyncSummary[] }>('/ai/models/sync');
                setSyncResult(r.providers);
                reg.reload();
              } catch {
                setSyncResult([]);
              } finally {
                setSyncing(false);
              }
            }}
          >
            {syncing ? tx('در حال همگام‌سازی…', 'Syncing…') : tx('همگام‌سازی مدل‌ها', 'Sync models now')}
          </button>
        }
      >
        <ModelStatus reg={reg.data} result={syncResult} />
        <div className="tbl-wrap">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{tx('ارائه‌دهنده', 'Provider')}</th>
                <th scope="col">{tx('مدل', 'Model')}</th>
                <th scope="col">{tx('قیمت (دلار/میلیون Token)', 'Price ($ / M tokens)')}</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {cfg.chain.map((c, i) => {
                const options = (reg.data?.models ?? []).filter((m) => m.provider === c.provider);
                const current = options.find((m) => m.model_id === c.model);
                return (
                  <tr key={i}>
                    <td className="num muted">{f.n(i + 1)}</td>
                    <td>
                      <select
                        className="adm-input"
                        value={c.provider}
                        aria-label={tx('ارائه‌دهنده', 'Provider')}
                        onChange={(e) => {
                          const p = e.target.value as Provider;
                          const first = (reg.data?.models ?? []).find((m) => m.provider === p);
                          setCand(i, { provider: p, model: first?.model_id ?? '' });
                        }}
                      >
                        {PROVIDERS.map((p) => (
                          <option key={p} value={p} disabled={!data.keys[p]}>
                            {PNAME[p]}
                            {data.keys[p] ? '' : tx(' (بدون کلید)', ' (no key)')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <ModelPicker value={c.model} options={options} loading={reg.loading && !reg.data} onChange={(model) => setCand(i, { model })} />
                    </td>
                    <td>
                      {current ? <PriceEditor m={current} onSaved={reg.reload} /> : <span className="muted">—</span>}
                    </td>
                    <td className="nowrap">
                      <button type="button" className="btn btn--small btn--ghost" onClick={() => move(i, -1)} disabled={i === 0} aria-label={tx('بالاتر', 'Up')}>
                        ↑
                      </button>
                      <button type="button" className="btn btn--small btn--ghost" onClick={() => move(i, 1)} disabled={i === cfg.chain.length - 1} aria-label={tx('پایین‌تر', 'Down')}>
                        ↓
                      </button>
                      <button type="button" className="btn btn--small btn--ghost" onClick={() => set('chain', cfg.chain.filter((_, j) => j !== i))} disabled={cfg.chain.length === 1} aria-label={tx('حذف', 'Remove')}>
                        ✕
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="adm-actions">
          {cfg.chain.length < 4 && (
            <button
              type="button"
              className="btn btn--small"
              onClick={() => {
                const keyed = PROVIDERS.find((p) => data.keys[p]) ?? 'anthropic';
                const first = (reg.data?.models ?? []).find((m) => m.provider === keyed);
                set('chain', [...cfg.chain, { provider: keyed, model: first?.model_id ?? '' }]);
              }}
            >
              {tx('+ مدل پشتیبان', '+ Fallback model')}
            </button>
          )}
          <label className="adm-radio">
            {tx('عمق فکر Claude', 'Claude effort')}{' '}
            <select className="adm-input" value={cfg.effort} onChange={(e) => set('effort', e.target.value as AiConfig['effort'])}>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </label>
        </div>
        <p className="adm-fine">
          {tx(
            'برای ارزان‌تر شدن، Claude Haiku 5.5 را بالای فهرست بگذارید (حدود ۴۰ برابر ارزان‌تر از Opus 5.5). مدلی که قیمتش معلوم نیست برای سقف بودجه گران حساب می‌شود (۱۰/۵۰ دلار) تا قیمتش را وارد کنید.',
            'For a lower bill, put Claude Haiku 5.5 first (about 40× cheaper than Opus 5.5). A model with an unknown price counts as expensive ($10/$50) against the budget until you enter its price.',
          )}
        </p>
      </Section>

      <Section title={tx('سقف‌ها و هزینه', 'Limits and budget')}>
        <div className="adm-settings">
          {numField('monthlyBudgetUsd', tx('سقف هزینه ماهانه (دلار)', 'Monthly budget (USD)'), tx('رسید، فراخوانی تازه نمی‌شود؛ Bit از مخزن و جمله‌های آماده می‌گوید.', 'Once reached, no new calls; Bit uses the pool and his built-in lines.'), 0, 1000, 0.5)}
          {numField('batch', tx('جمله در هر فراخوانی', 'Lines per call'), tx('یک فراخوانی چند جمله می‌سازد؛ ارزان‌تر از چند فراخوانی.', 'One call makes several lines; cheaper than several calls.'), 3, 8)}
          {numField('maxPool', tx('حداکثر جمله برای هر بخش', 'Max lines per section'), tx('برای هر بخش و زبان. پر شد، دیگر AI صدا زده نمی‌شود.', 'Per section and language. Once full, the AI isn’t called for it again.'), 6, 80)}
          {numField('growPercent', tx('درصد ضربه‌هایی که مخزن را بزرگ می‌کنند', 'Share of taps that grow the pool (%)'), tx('تا وقتی مخزن پر نشده. بقیه از مخزن جواب می‌گیرند.', 'Until the pool is full. The rest are served from the pool.'), 0, 100)}
          {numField('userPerMinute', tx('ضربه در دقیقه برای هر کاربر', 'Taps per learner per minute'), tx('جلوی ضربه‌های پشت‌سرهم را می‌گیرد.', 'Stops rapid-fire tapping.'), 1, 60)}
          {numField('userGenPerDay', tx('فراخوانی AI در روز برای هر کاربر', 'AI calls per learner per day'), tx('مدیرها مستثنی‌اند.', 'Staff are exempt.'), 0, 100)}
          {numField('globalGenPerMinute', tx('فراخوانی AI در دقیقه برای همه', 'AI calls per minute, everyone'), tx('برای محدودیت کلید مشترک ارائه‌دهنده.', 'Protects the provider key’s shared rate limit.'), 1, 200)}
        </div>
      </Section>

      <Section
        title={tx('شخصیت Bit (پرامپت سیستم)', "Bit's persona (system prompt)")}
        sub={tx(`نسخه پرامپت: ${data.promptVersion}. تغییر این متن مخزن‌های تازه شروع می‌کند (جمله‌های قبلی کنار می‌روند، پاک نمی‌شوند).`, `Prompt version: ${data.promptVersion}. Changing this text starts fresh pools (old lines are set aside, not deleted).`)}
        actions={
          <button type="button" className="btn btn--small btn--ghost" onClick={() => set('persona', '')} disabled={!cfg.persona}>
            {tx('برگشت به پیش‌فرض', 'Use the default')}
          </button>
        }
      >
        <textarea className="adm-input adm-persona" dir="ltr" rows={12} value={cfg.persona || data.defaultPersona} onChange={(e) => set('persona', e.target.value === data.defaultPersona ? '' : e.target.value)} aria-label={tx('پرامپت سیستم', 'System prompt')} />
        <p className="adm-fine">
          {tx(
            'دستور هر فراخوانی جدا ساخته می‌شود: عنوان فصل و بخش، خلاصه بخش، اصطلاح‌ها، زبان، و آخرین جمله‌ها تا تکراری نشود. خروجی باید JSON باشد و قبل از ذخیره بررسی می‌شود.',
            'Each call’s instruction is built separately: chapter and section titles, the section gist, key terms, the language, and recent lines to avoid repeats. Output must be JSON and is checked before it is stored.',
          )}
        </p>
      </Section>

      <div className="adm-actions adm-sticky-save">
        <button type="button" className="btn btn--small btn--primary" disabled={busy || !dirty} onClick={save}>
          {dirty ? tx('ذخیره تنظیمات AI', 'Save AI settings') : tx('بدون تغییر', 'No changes')}
        </button>
        {dirty && (
          <button type="button" className="btn btn--small btn--ghost" onClick={() => setCfg(data.config)}>
            {tx('برگرداندن', 'Undo')}
          </button>
        )}
        {msg && (
          <span className={msg.ok ? 'adm-msg' : 'adm-error'} role="status">
            {msg.text}
          </span>
        )}
      </div>

      <Usage data={data} />
      <Lines pools={data.pools} onChanged={reload} />
    </>
  );
}

function Usage({ data }: { data: AiState }) {
  const tx = useTx();
  const f = useFmt();
  const days = data.usage.daily;
  const max = Math.max(0.0001, ...days.map((d) => d.cost));
  return (
    <Section title={tx('مصرف', 'Usage')} sub={tx('هر درخواست ثبت می‌شود؛ جواب از مخزن هزینه صفر دارد.', 'Every request is logged; pool answers cost nothing.')}>
      {days.length ? (
        <div className="adm-daybars" aria-label={tx('هزینه ۱۴ روز اخیر', 'Spend over the last 14 days')}>
          {days.map((d) => (
            <span key={d.d} title={`${f.date(d.d * 86400000)}: $${d.cost.toFixed(3)} · AI ${d.ai} · pool ${d.pool}`}>
              <i style={{ transform: `scaleY(${Math.max(0.03, d.cost / max)})` }} />
            </span>
          ))}
        </div>
      ) : (
        <Empty>{tx('هنوز درخواستی نیامده است.', 'No requests yet.')}</Empty>
      )}
      {data.usage.byModel.length > 0 && (
        <div className="tbl-wrap" style={{ marginTop: 12 }}>
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">{tx('مدل', 'Model')}</th>
                <th scope="col" className="num">
                  {tx('فراخوانی', 'Calls')}
                </th>
                <th scope="col" className="num">
                  {tx('ناموفق', 'Failed')}
                </th>
                <th scope="col" className="num">
                  Tokens
                </th>
                <th scope="col" className="num">
                  {tx('هزینه', 'Cost')}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.usage.byModel.map((m) => (
                <tr key={m.provider + m.model}>
                  <td className="ltr">
                    {m.provider}/{m.model}
                  </td>
                  <td className="num">{f.n(m.calls)}</td>
                  <td className="num">{m.failed ? <Chip tone="coral">{f.n(m.failed)}</Chip> : '—'}</td>
                  <td className="num ltr">
                    {m.tin}↓ {m.tout}↑
                  </td>
                  <td className="num ltr">${m.cost.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {data.usage.errors.length > 0 && (
        <>
          <h3 className="adm-h3">{tx('خطاهای اخیر', 'Recent errors')}</h3>
          <ul className="adm-history">
            {data.usage.errors.map((e, i) => (
              <li key={i}>
                <span className="muted nowrap">{f.dateTime(e.at)}</span>{' '}
                <code>
                  {e.provider ?? '—'}/{e.model ?? '—'}
                </code>{' '}
                <span className="ltr">{e.error}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}

function Lines({ pools, onChanged }: { pools: AiState['pools']; onChanged: () => void }) {
  const { t } = useApp();
  const tx = useTx();
  const f = useFmt();
  const [slug, setSlug] = useState(CHAPTERS[0].slug);
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const chapter = CHAPTERS.find((c) => c.slug === slug)!;
  const [section, setSection] = useState(chapter.sections[0].id);
  useEffect(() => setSection(chapter.sections[0].id), [chapter]);
  const { data, error, loading, reload } = useLoad(() => api.get<{ lines: Line[] }>(`/ai/lines?slug=${slug}&lang=${lang}`), [slug, lang]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of pools) if (p.lang === lang) m[p.slug] = (m[p.slug] ?? 0) + p.n - (p.hidden ?? 0);
    return m;
  }, [pools, lang]);

  const gen = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const r = await api.post<{ lines: { id: number; text: string }[]; model: Candidate }>('/ai/generate', { slug, section, lang });
      setMsg({ ok: true, text: tx(`${f.n(r.lines.length)} جمله تازه با ${r.model.model}`, `${r.lines.length} new lines from ${r.model.model}`) });
      reload();
      onChanged();
    } catch (e) {
      const code = e instanceof ApiError ? e.code : 'error';
      setMsg({
        ok: false,
        text:
          code === 'monthly_budget'
            ? tx('سقف هزینه ماهانه پر شده است.', 'The monthly budget is used up.')
            : code === 'no_candidate' || code === 'no_key'
              ? tx('هیچ مدلی کلید API ندارد.', 'No model in the chain has an API key.')
              : tx(`ساخته نشد (${code}).`, `Generation failed (${code}).`),
      });
    } finally {
      setBusy(false);
    }
  };
  const act = async (l: Line, op: 'hide' | 'show' | 'delete') => {
    if (op === 'delete') await api.del(`/ai/lines/${l.id}`).catch(() => {});
    else await api.post(`/ai/lines/${l.id}`, { hidden: op === 'hide' }).catch(() => {});
    reload();
    onChanged();
  };
  const lines = data?.lines ?? [];
  const bySection = chapter.sections.map((s) => ({ s, lines: lines.filter((l) => l.section === s.id) }));

  return (
    <Section title={tx('جمله‌های Bit', "Bit's lines")} sub={tx('مخزن هر بخش. جمله نامناسب را پنهان یا پاک کنید؛ پنهان‌ها هرگز گفته نمی‌شوند.', 'The pool per section. Hide or delete anything unsuitable; hidden lines are never said.')}>
      <div className="adm-toolbar">
        <select className="adm-input" value={slug} onChange={(e) => setSlug(e.target.value)} aria-label={tx('فصل', 'Chapter')}>
          {CHAPTERS.map((c, i) => (
            <option key={c.slug} value={c.slug}>
              {f.n(i + 1)}. {t(c.title).replace(/\*\*|`/g, '')} ({f.n(counts[c.slug] ?? 0)})
            </option>
          ))}
        </select>
        <div className="adm-seg" role="group" aria-label={tx('زبان', 'Language')}>
          {(['fa', 'en'] as const).map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l === 'fa' ? 'فارسی' : 'English'}
            </button>
          ))}
        </div>
      </div>
      <div className="adm-toolbar">
        <select className="adm-input" value={section} onChange={(e) => setSection(e.target.value)} aria-label={tx('بخش', 'Section')}>
          {chapter.sections.map((s) => (
            <option key={s.id} value={s.id}>
              {t(s.title).replace(/\*\*|`/g, '')}
            </option>
          ))}
        </select>
        <button type="button" className="btn btn--small btn--primary" disabled={busy} onClick={gen}>
          {busy ? tx('در حال ساخت…', 'Generating…') : tx('ساخت جمله برای این بخش', 'Generate lines for this section')}
        </button>
        {msg && (
          <span className={msg.ok ? 'adm-msg' : 'adm-error'} role="status">
            {msg.text}
          </span>
        )}
      </div>
      {error ? (
        <ErrorNote error={error} retry={reload} />
      ) : loading && !data ? (
        <Loading />
      ) : !lines.length ? (
        <Empty>{tx('برای این فصل هنوز جمله‌ای ساخته نشده است.', 'No lines for this chapter yet.')}</Empty>
      ) : (
        bySection
          .filter((g) => g.lines.length)
          .map((g) => (
            <div key={g.s.id}>
              <h3 className="adm-h3">{t(g.s.title).replace(/\*\*|`/g, '')}</h3>
              <ul className="adm-lines">
                {g.lines.map((l) => (
                  <li key={l.id} className={l.hidden ? 'is-hidden' : ''}>
                    <p dir={lang === 'fa' ? 'rtl' : 'ltr'}>{l.text}</p>
                    <span className="muted">
                      {l.model} · {tx(`${f.n(l.served)} بار گفته شده`, `said ${l.served}×`)}
                    </span>
                    <span className="adm-line-actions">
                      <button type="button" className="btn btn--small btn--ghost" onClick={() => act(l, l.hidden ? 'show' : 'hide')}>
                        {l.hidden ? tx('نمایش', 'Show') : tx('پنهان', 'Hide')}
                      </button>
                      <button type="button" className="btn btn--small btn--ghost" onClick={() => act(l, 'delete')}>
                        {tx('حذف', 'Delete')}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </Section>
  );
}

/** A real picker: models from the registry, newest first, curated ones on top. No typing. */
function ModelPicker({ value, options, loading, onChange }: { value: string; options: RegModel[]; loading: boolean; onChange: (m: string) => void }) {
  const tx = useTx();
  const [q, setQ] = useState('');
  if (loading) return <span className="muted">{tx('در حال بارگیری…', 'Loading…')}</span>;
  if (!options.length) return <span className="adm-error">{tx('مدلی نیست؛ همگام‌سازی کنید', 'No models; sync first')}</span>;
  const shown = options.filter((m) => !q || `${m.display_name} ${m.model_id}`.toLowerCase().includes(q.toLowerCase()) || m.model_id === value);
  const hasValue = options.some((m) => m.model_id === value);
  return (
    <span className="adm-picker">
      {options.length > 12 && <input className="adm-input adm-input--sm" dir="ltr" value={q} onChange={(e) => setQ(e.target.value)} placeholder={tx('فیلتر', 'filter')} aria-label={tx('فیلتر مدل‌ها', 'Filter models')} />}
      <select className="adm-input" dir="ltr" value={hasValue ? value : ''} onChange={(e) => onChange(e.target.value)} aria-label={tx('مدل', 'Model')}>
        {!hasValue && <option value="">{tx('انتخاب کنید…', 'Choose…')}</option>}
        {shown.map((m) => (
          <option key={m.model_id} value={m.model_id}>
            {m.display_name === m.model_id ? m.model_id : `${m.display_name} — ${m.model_id}`}
            {m.price_in != null ? `  ($${m.price_in}/$${m.price_out})` : ''}
            {m.source !== 'catalogue' ? ' ★' : ''}
          </option>
        ))}
      </select>
    </span>
  );
}

function PriceEditor({ m, onSaved }: { m: RegModel; onSaved: () => void }) {
  const tx = useTx();
  const [pin, setPin] = useState(m.price_in == null ? '' : String(m.price_in));
  const [pout, setPout] = useState(m.price_out == null ? '' : String(m.price_out));
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  useEffect(() => {
    setPin(m.price_in == null ? '' : String(m.price_in));
    setPout(m.price_out == null ? '' : String(m.price_out));
  }, [m.model_id, m.price_in, m.price_out]);
  const dirty = pin !== (m.price_in == null ? '' : String(m.price_in)) || pout !== (m.price_out == null ? '' : String(m.price_out));
  return (
    <span className="adm-price">
      <input className="adm-input adm-input--sm" dir="ltr" type="number" min={0} step={0.01} value={pin} placeholder="in" onChange={(e) => setPin(e.target.value)} aria-label={tx('قیمت ورودی', 'Input price')} />
      <input className="adm-input adm-input--sm" dir="ltr" type="number" min={0} step={0.01} value={pout} placeholder="out" onChange={(e) => setPout(e.target.value)} aria-label={tx('قیمت خروجی', 'Output price')} />
      {dirty && pin !== '' && pout !== '' ? (
        <button
          type="button"
          className="btn btn--small"
          disabled={state === 'saving'}
          onClick={async () => {
            setState('saving');
            try {
              await api.put('/ai/models/price', { provider: m.provider, model: m.model_id, in: Number(pin), out: Number(pout) });
              setState('saved');
              onSaved();
            } catch {
              setState('error');
            }
          }}
        >
          {tx('ذخیره قیمت', 'Save price')}
        </button>
      ) : m.price_in == null ? (
        <Chip tone="butter">{tx('قیمت نامعلوم', 'price unknown')}</Chip>
      ) : state === 'saved' ? (
        <Chip tone="mint">✓</Chip>
      ) : null}
      {state === 'error' && <Chip tone="coral">{tx('ذخیره نشد', 'not saved')}</Chip>}
    </span>
  );
}

function ModelStatus({ reg, result }: { reg: Registry | null; result: SyncSummary[] | null }) {
  const tx = useTx();
  const f = useFmt();
  if (!reg) return null;
  const count = (p: Provider) => reg.models.filter((m) => m.provider === p).length;
  return (
    <div className="adm-keys" style={{ marginBottom: 12 }}>
      {PROVIDERS.map((p) => {
        const st = reg.status.find((s) => s.provider === p);
        const r = result?.find((x) => x.provider === p);
        const err = r?.error ?? (st && !st.ok ? st.error : null);
        return (
          <span key={p} className={`adm-key ${reg.keys[p] && !err ? 'is-set' : ''}`}>
            <b>{PNAME[p]}</b>
            <span>
              {!reg.keys[p] ? (
                <Chip>{tx('بدون کلید', 'no key')}</Chip>
              ) : err ? (
                <Chip tone="coral">{tx('خطا', 'error')}</Chip>
              ) : (
                <Chip tone="mint">{tx(`${f.n(count(p))} مدل`, `${count(p)} models`)}</Chip>
              )}{' '}
              {st && <small className="muted">{f.rel(st.synced_at)}</small>}
            </span>
            {err && <small className="adm-error ltr">{err}</small>}
            {r && !r.error && !r.skipped && <small className="muted ltr">+{r.added} ~{r.updated} −{r.deactivated}</small>}
          </span>
        );
      })}
    </div>
  );
}
