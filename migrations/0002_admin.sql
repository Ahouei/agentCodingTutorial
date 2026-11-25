-- Admin panel. Applied once; never edit an applied migration — add a new file.
-- role: learner | admin   (the owner is OWNER_EMAIL, a Worker secret, and cannot be demoted from the panel)
-- status: active | blocked (blocked accounts cannot sign in; their sessions are removed)
ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'learner';
ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT 'active';

-- Every state-changing admin action writes one row. actor_id/actor_email come from the session, never the request.
CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  at INTEGER NOT NULL,
  actor_id TEXT NOT NULL,
  actor_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  detail TEXT
);
CREATE INDEX IF NOT EXISTS audit_at ON audit_log (at);
CREATE INDEX IF NOT EXISTS audit_actor ON audit_log (actor_id);

-- Live-editable operational settings (sanitized on write). Missing key = built-in default.
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  updated_by TEXT NOT NULL
);

-- Learner-facing announcements: draft → preview → publish. At most one is published.
CREATE TABLE IF NOT EXISTS announcements (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'draft',
  tone TEXT NOT NULL DEFAULT 'info',
  title_fa TEXT NOT NULL,
  title_en TEXT NOT NULL,
  body_fa TEXT NOT NULL DEFAULT '',
  body_en TEXT NOT NULL DEFAULT '',
  link TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL,
  created_by TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  published_at INTEGER,
  published_by TEXT
);
CREATE INDEX IF NOT EXISTS announcements_status ON announcements (status);
