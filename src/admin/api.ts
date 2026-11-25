/** Tiny client for /api/admin/*. The server is the only authority on who may do what. */
import type { Progress } from '../lib/progressMerge';
import type { AnnouncementData } from '../components/Announcement';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public data: Record<string, unknown> = {},
  ) {
    super(code);
  }
}

async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
  const r = await fetch(`/api/admin${path}`, {
    method,
    credentials: 'same-origin',
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const j = (await r.json().catch(() => ({}))) as Record<string, unknown>;
  if (!r.ok || typeof j.error === 'string') throw new ApiError(r.status, String(j.error ?? r.status), j);
  return j as T;
}

export const api = {
  get: <T>(path: string) => call<T>('GET', path),
  post: <T>(path: string, body: unknown = {}) => call<T>('POST', path, body),
  put: <T>(path: string, body: unknown) => call<T>('PUT', path, body),
  del: <T>(path: string) => call<T>('DELETE', path),
};

export type Role = 'learner' | 'admin' | 'owner';
export type Me = { email: string; role: Role; id: string };

export type Overview = {
  users: { total: number; new7: number; new30: number; blocked: number; admins: number; active7: number; liveSessions: number };
  signups: { d: number; n: number }[];
  signin24h: { sent: number; used: number };
  emailsToday: { sent: number; cap: number };
  settings: SettingsValues;
  learning: {
    learners: number;
    done: Record<string, number>;
    labs: Record<string, number>;
    quizzes: Record<string, { n: number; correct: number }>;
    position: Record<string, number>;
    doneHist: Record<string, number>;
  };
  now: number;
};

export type UserRow = {
  id: string;
  email: string;
  createdAt: number;
  role: Role;
  status: 'active' | 'blocked';
  lastSeen: number | null;
  sessions: number;
  syncedAt: number | null;
  done: number;
  labs: number;
  answered: number;
  correct: number;
  position: string | null;
};

export type UserDetail = {
  user: { id: string; email: string; createdAt: number; role: Role; status: 'active' | 'blocked' };
  progress: Progress;
  syncedAt: number | null;
  sessions: { ref: string; createdAt: number; lastSeen: number; expiresAt: number; live: boolean }[];
  history: AuditEntry[];
};

export type SettingsValues = {
  signin_enabled: boolean;
  registration_mode: 'open' | 'invite' | 'closed';
  start_ip_per_min: number;
  start_email_per_10min: number;
  emails_per_day: number;
};
export type SettingDef = { type: 'bool'; def: boolean } | { type: 'int'; def: number; min: number; max: number } | { type: 'enum'; def: string; values: string[] };
export type SettingsResponse = {
  values: SettingsValues;
  defaults: SettingsValues;
  defs: Record<keyof SettingsValues, SettingDef>;
  meta: { key: string; updated_at: number; updated_by: string }[];
};

export type Announcement = AnnouncementData & {
  status: 'draft' | 'published' | 'archived';
  created_at: number;
  created_by: string;
  updated_at: number;
  published_at: number | null;
  published_by: string | null;
};

export type AuditEntry = {
  id: number;
  at: number;
  actor_email: string;
  action: string;
  target_type?: string;
  target_id?: string;
  detail: string | null;
};
