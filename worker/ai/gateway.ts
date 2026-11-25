/**
 * One normalized call for every provider (multi-model-ai-gateway §4):
 *   callProvider(env, candidate, req) → { text, tokensIn, tokensOut }
 * Claude goes through the official SDK (@anthropic-ai/sdk) with structured JSON output and, on the
 * models that support it, the server-side refusal fallback. Gemini and the OpenAI-compatible APIs
 * (OpenAI, DeepSeek, xAI) go through their REST endpoints. Errors are typed so the caller can tell
 * "try the next candidate" from "stop".
 */
import Anthropic from '@anthropic-ai/sdk';
import { KEY_NAME, type AiKeys, type Candidate } from './config';

export type GenRequest = {
  system: string;
  user: string;
  /** JSON schema the reply must follow. */
  schema: Record<string, unknown>;
  maxTokens: number;
  effort: 'low' | 'medium' | 'high';
};
export type GenResult = { text: string; tokensIn: number; tokensOut: number };

/** `retryable`: the next candidate may succeed (rate limit, outage, refusal). Otherwise the request itself is bad. */
export class ProviderError extends Error {
  constructor(
    message: string,
    public retryable: boolean,
  ) {
    super(message);
  }
}

// Claude models that accept the server-side refusal fallback (`fallbacks: "default"`).
const FALLBACK_MODELS = /^claude-(opus-5|sonnet-5-5|fable-5|mythos-5)/;

async function anthropic(key: string, model: string, req: GenRequest): Promise<GenResult> {
  const client = new Anthropic({ apiKey: key, maxRetries: 1, timeout: 25_000 });
  const output_config = { effort: req.effort, format: { type: 'json_schema' as const, schema: req.schema } };
  const messages = [{ role: 'user' as const, content: req.user }];
  try {
    if (FALLBACK_MODELS.test(model)) {
      const res = await client.beta.messages.create({
        model,
        max_tokens: req.maxTokens,
        system: req.system,
        messages,
        output_config,
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
      });
      if (res.stop_reason === 'refusal') throw new ProviderError('refused', true);
      if (res.stop_reason === 'max_tokens') throw new ProviderError('truncated', true);
      const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
      return { text, tokensIn: res.usage.input_tokens, tokensOut: res.usage.output_tokens };
    }
    const res = await client.messages.create({ model, max_tokens: req.maxTokens, system: req.system, messages, output_config });
    if (res.stop_reason === 'refusal') throw new ProviderError('refused', true);
    if (res.stop_reason === 'max_tokens') throw new ProviderError('truncated', true);
    const text = res.content.map((b) => (b.type === 'text' ? b.text : '')).join('');
    return { text, tokensIn: res.usage.input_tokens, tokensOut: res.usage.output_tokens };
  } catch (e) {
    if (e instanceof ProviderError) throw e;
    if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) throw new ProviderError('auth', true);
    if (e instanceof Anthropic.NotFoundError) throw new ProviderError('model_not_found', true);
    if (e instanceof Anthropic.BadRequestError) throw new ProviderError(`bad_request: ${e.message.slice(0, 160)}`, true);
    if (e instanceof Anthropic.RateLimitError) throw new ProviderError('rate_limited', true);
    if (e instanceof Anthropic.APIError) throw new ProviderError(`api_${e.status ?? 'error'}`, true);
    throw new ProviderError('network', true);
  }
}

async function gemini(key: string, model: string, req: GenRequest): Promise<GenResult> {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: req.system }] },
      contents: [{ role: 'user', parts: [{ text: req.user }] }],
      generationConfig: { responseMimeType: 'application/json', responseJsonSchema: req.schema, maxOutputTokens: req.maxTokens, temperature: 1 },
    }),
  }).catch(() => null);
  if (!res) throw new ProviderError('network', true);
  if (!res.ok) throw await httpError(res);
  const j = (await res.json().catch(() => null)) as {
    candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
    usageMetadata?: { promptTokenCount?: number; candidatesTokenCount?: number; thoughtsTokenCount?: number };
  } | null;
  const c = j?.candidates?.[0];
  if (!c || c.finishReason === 'SAFETY') throw new ProviderError('refused', true);
  if (c.finishReason === 'MAX_TOKENS') throw new ProviderError('truncated', true);
  const u = j?.usageMetadata ?? {};
  return { text: (c.content?.parts ?? []).map((p) => p.text ?? '').join(''), tokensIn: u.promptTokenCount ?? 0, tokensOut: (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0) };
}

/** Short, key-free description of an HTTP error from a provider (shown in Admin → Bit & AI). */
async function httpError(res: Response): Promise<ProviderError> {
  const body = (await res.json().catch(() => null)) as { error?: { message?: unknown } } | null;
  const m = typeof body?.error?.message === 'string' ? body.error.message.replace(/[A-Za-z0-9_-]{24,}/g, '…').slice(0, 140) : '';
  return new ProviderError(`${res.status === 429 ? 'rate_limited' : `api_${res.status}`}${m ? `: ${m}` : ''}`, true);
}

const OPENAI_COMPAT: Record<'openai' | 'deepseek' | 'xai', { url: string; tokenField: 'max_tokens' | 'max_completion_tokens' }> = {
  openai: { url: 'https://api.openai.com/v1/chat/completions', tokenField: 'max_completion_tokens' },
  deepseek: { url: 'https://api.deepseek.com/chat/completions', tokenField: 'max_tokens' },
  xai: { url: 'https://api.x.ai/v1/chat/completions', tokenField: 'max_tokens' },
};

async function openaiCompat(kind: 'openai' | 'deepseek' | 'xai', key: string, model: string, req: GenRequest): Promise<GenResult> {
  const cfg = OPENAI_COMPAT[kind];
  const res = await fetch(cfg.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      [cfg.tokenField]: req.maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: req.system },
        { role: 'user', content: req.user },
      ],
    }),
  }).catch(() => null);
  if (!res) throw new ProviderError('network', true);
  if (!res.ok) throw await httpError(res);
  const j = (await res.json().catch(() => null)) as {
    choices?: { message?: { content?: string }; finish_reason?: string }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  } | null;
  const ch = j?.choices?.[0];
  if (ch?.finish_reason === 'length') throw new ProviderError('truncated', true);
  return { text: ch?.message?.content ?? '', tokensIn: j?.usage?.prompt_tokens ?? 0, tokensOut: j?.usage?.completion_tokens ?? 0 };
}

export async function callProvider(env: AiKeys, c: Candidate, req: GenRequest): Promise<GenResult> {
  const key = env[KEY_NAME[c.provider]];
  if (!key) throw new ProviderError('no_key', true);
  if (c.provider === 'anthropic') return anthropic(key, c.model, req);
  if (c.provider === 'gemini') return gemini(key, c.model, req);
  return openaiCompat(c.provider, key, c.model, req);
}

/** Output-token ceiling tiered by price: generous for cheap models, tighter for premium ones (gateway §5). */
export function maxTokensFor(outPrice: number, batch: number) {
  // ~160 characters of Persian per line + JSON overhead, plus room for (low-effort) thinking.
  const base = batch * 120 + 1500;
  return outPrice >= 15 ? Math.min(base, 3000) : Math.min(base + 1500, 5000);
}
