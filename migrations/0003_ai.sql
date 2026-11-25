-- Bit's AI lines (signed-in learners only). Applied once; never edit — add a new file.

-- The semantic cache: a pool of lines per (chapter, section, language, prompt version).
-- Learners are served from the pool; the AI is called only to grow it (or when an admin asks).
CREATE TABLE IF NOT EXISTS bit_lines (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pool_key TEXT NOT NULL,          -- slug:section:lang:pv<hash>
  slug TEXT NOT NULL,
  section TEXT NOT NULL,
  lang TEXT NOT NULL,
  text TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_version TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0, -- admin moderation: hidden lines are never served
  served INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS bit_lines_pool ON bit_lines (pool_key, hidden);

-- The exact-prompt cache: hash(task|provider|model|normalized prompt|params) → raw reply.
CREATE TABLE IF NOT EXISTS ai_cache (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

-- Every AI request (including pool and cache hits, cost 0) for spend caps and the admin dashboard.
CREATE TABLE IF NOT EXISTS ai_usage (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  at INTEGER NOT NULL,
  user_id TEXT,
  task TEXT NOT NULL,            -- bit_line
  source TEXT NOT NULL,          -- pool | cache | ai | fallback | denied
  provider TEXT,
  model TEXT,
  tokens_in INTEGER NOT NULL DEFAULT 0,
  tokens_out INTEGER NOT NULL DEFAULT 0,
  cost_usd REAL NOT NULL DEFAULT 0,
  ok INTEGER NOT NULL DEFAULT 1,
  error TEXT
);
CREATE INDEX IF NOT EXISTS ai_usage_at ON ai_usage (at);
CREATE INDEX IF NOT EXISTS ai_usage_user ON ai_usage (user_id, at);
