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
type Line = { id: number; section: string; text: string; provider: string; model: string; created_at: number; hidden: number; served: number };

const PROVIDERS: Provider[] = ['anthropic', 'gemini', 'openai', 'deepseek', 'xai'];
const KEY: Record<Provider, string> = { anthropic: 'ANTHROPIC_API_KEY', gemini: 'GEMINI_API_KEY', openai: 'OPENAI_API_KEY', deepseek: 'DEEPSEEK_API_KEY', xai: 'XAI_API_KEY' };
const PNAME: Record<Provider, string> = { anthropic: 'Anthropic (Claude)', gemini: 'Google Gemini', openai: 'OpenAI', deepseek: 'DeepSeek', xai: 'xAI (Grok)' };

export function AiPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useLoad(() => api.get<AiState>('/ai'));
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
  const price = (model: string) => cfg.prices[model] ?? { in: 0, out: 0 };
  const setPrice = (model: string, k: 'in' | 'out', v: number) => set('prices', { ...cfg.prices, [model]: { ...price(model), [k]: v } });

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

      <Section title={tx('مدل‌ها به ترتیب', 'Models, in order')} sub={tx('اولی امتحان می‌شود؛ اگر کلید نداشت، محدود شد یا جواب به‌دردبخور نداد، بعدی. قیمت‌ها (دلار به ازای هر میلیون Token) فقط برای حساب هزینه‌اند؛ با صفحه قیمت ارائه‌دهنده یکی‌شان کنید.', 'The first is tried; if it has no key, is rate-limited or gives nothing usable, the next. Prices ($ per million tokens) are only for cost tracking; keep them in line with the provider’s pricing page.')}>
        <div className="tbl-wrap">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">{tx('ارائه‌دهنده', 'Provider')}</th>
                <th scope="col">{tx('مدل', 'Model')}</th>
                <th scope="col">{tx('ورودی $/M', 'In $/M')}</th>
                <th scope="col">{tx('خروجی $/M', 'Out $/M')}</th>
                <th scope="col">{tx('کلید', 'Key')}</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>
              {cfg.chain.map((c, i) => (
                <tr key={i}>
                  <td className="num muted">{f.n(i + 1)}</td>
                  <td>
                    <select className="adm-input" value={c.provider} onChange={(e) => setCand(i, { provider: e.target.value as Provider })} aria-label={tx('ارائه‌دهنده', 'Provider')}>
                      {PROVIDERS.map((p) => (
                        <option key={p} value={p}>
                          {PNAME[p]}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input className="adm-input" dir="ltr" value={c.model} onChange={(e) => setCand(i, { model: e.target.value.trim() })} aria-label={tx('مدل', 'Model')} />
                  </td>
                  <td>
                    <input className="adm-input adm-input--sm" dir="ltr" type="number" min={0} step={0.01} value={price(c.model).in} onChange={(e) => setPrice(c.model, 'in', Number(e.target.value) || 0)} aria-label="in" />
                  </td>
                  <td>
                    <input className="adm-input adm-input--sm" dir="ltr" type="number" min={0} step={0.01} value={price(c.model).out} onChange={(e) => setPrice(c.model, 'out', Number(e.target.value) || 0)} aria-label="out" />
                  </td>
                  <td>{data.keys[c.provider] ? <Chip tone="mint">✓</Chip> : <Chip tone="coral">{tx('ندارد', 'none')}</Chip>}</td>
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
              ))}
            </tbody>
          </table>
        </div>
        <div className="adm-actions">
          {cfg.chain.length < 4 && (
            <button type="button" className="btn btn--small" onClick={() => set('chain', [...cfg.chain, { provider: 'anthropic', model: 'claude-haiku-5-5' }])}>
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
            'برای ارزان‌تر شدن، claude-haiku-5-5 را بالای فهرست بگذارید (حدود ۴۰ برابر ارزان‌تر از claude-opus-5-5). جمله‌ها در مخزن ذخیره می‌شوند، پس هزینه با تعداد کاربر زیاد نمی‌شود.',
            'For a lower bill, put claude-haiku-5-5 first (about 40× cheaper than claude-opus-5-5). Lines are pooled, so cost doesn’t grow with the number of learners.',
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
