-- Optional accounts (RD-10). Applied once; never edit an applied migration — add a new file.
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS login_tokens (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  used_at INTEGER,
  ip TEXT
);
CREATE INDEX IF NOT EXISTS login_tokens_exp ON login_tokens (expires_at);
CREATE TABLE IF NOT EXISTS sessions (
  id_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL,
  last_seen INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user ON sessions (user_id);
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
  data TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rate (
  key TEXT PRIMARY KEY,
  n INTEGER NOT NULL,
  exp INTEGER NOT NULL
);
