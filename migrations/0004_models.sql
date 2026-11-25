-- Model registry (llm-provider-registry): every surface (the Bit chain picker, the server's chain
-- validation, cost tracking) reads this one table. Rows a person curates are source='seed';
-- rows the provider sync owns are source='catalogue'. Never delete: deactivate.
CREATE TABLE IF NOT EXISTS ai_models (
  id TEXT PRIMARY KEY,                 -- seed:<provider>:<model> | cat:<provider>:<model>
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,              -- exactly what is sent to the provider
  display_name TEXT NOT NULL,
  source TEXT NOT NULL,                -- seed | catalogue
  active INTEGER NOT NULL DEFAULT 1,
  created INTEGER,                     -- provider's publish time (epoch seconds), when known
  last_seen_at INTEGER,
  missing_streak INTEGER NOT NULL DEFAULT 0,
  price_in REAL,                       -- USD per million tokens (NULL = unknown)
  price_out REAL,
  UNIQUE (provider, model_id)
);
CREATE INDEX IF NOT EXISTS ai_models_provider ON ai_models (provider, active);

CREATE TABLE IF NOT EXISTS ai_catalogue (
  provider TEXT PRIMARY KEY,
  synced_at INTEGER NOT NULL,
  ok INTEGER NOT NULL,
  error TEXT,
  models INTEGER NOT NULL DEFAULT 0
);

-- Curated defaults with known prices (Anthropic: platform pricing; Gemini: editable, verify).
INSERT OR IGNORE INTO ai_models (id, provider, model_id, display_name, source, price_in, price_out) VALUES
  ('seed:anthropic:claude-opus-5-5', 'anthropic', 'claude-opus-5-5', 'Claude Opus 5.5', 'seed', 4, 20),
  ('seed:anthropic:claude-sonnet-5-5', 'anthropic', 'claude-sonnet-5-5', 'Claude Sonnet 5.5', 'seed', 2, 10),
  ('seed:anthropic:claude-haiku-5-5', 'anthropic', 'claude-haiku-5-5', 'Claude Haiku 5.5', 'seed', 0.1, 0.5),
  ('seed:gemini:gemini-3.8-flash', 'gemini', 'gemini-3.8-flash', 'Gemini 3.8 Flash', 'seed', 1.5, 7.5);
