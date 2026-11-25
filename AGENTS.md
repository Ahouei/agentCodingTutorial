# AGENTS.md

Instructions for AI coding agents (Codex, Claude Code and others) working on this repository.

## What this is

"Zero to Hero" (از صفر تا قهرمان): an interactive, story-like course that teaches people with no programming background to build and publish any kind of website or web app with agentic AI and vibe coding, using GitHub and Cloudflare. Persian is the primary language (RTL); English is the second language.

## Stack

- Vite + React 19 + TypeScript, animation with `motion` (Motion for React); tokens in `src/lib/motion.ts`.
- No router library: `src/lib/router.ts` uses real URLs (`/`, `/c/<slug>[/<section>]`, `/glossary`, `/admin[/<section>]`), restores scroll on Back, and lets Back close overlays (`useOverlay`). Old `#/c/…` links redirect.
- Fonts are self-hosted through Fontsource (no Google Fonts requests).
- A Cloudflare Worker (`worker/index.ts`) sits in front of the built files: per-page title/description/Open Graph, real 404s, security headers (strict CSP: no inline scripts), immutable caching for hashed assets.
- Optional accounts (`worker/api.ts`): passwordless email sign-in (Resend + Turnstile), D1 (`migrations/`), progress sync with a shared merge (`src/lib/progressMerge.ts`). Everything works signed-out.
- Admin panel (`/admin`, code-split in `src/admin/`, API in `worker/admin.ts`): overview + chapter funnel, learners table, question/lab insights, announcements (draft → preview → publish), live settings (`worker/settings.ts`), audit log. The owner is the `OWNER_EMAIL` Worker secret; admins are `users.role = 'admin'`.

## Commands

- `npm run dev`: local dev server
- `npm run validate`: content checks (must pass)
- `npm run build`: validate content, generate page metadata/sitemap, type-check app and Worker, build to `dist/`
- `node scripts/og-cards.cjs`: regenerate the 1200×630 share cards in `public/og/` (after content titles change)
- `npm run deploy`: build and `wrangler deploy` (CI does this on every push to `main`)

## Where things live

- `src/content/types.ts`: the content schema. Every user-facing string is `{ fa, en }`.
- `src/content/chapters/*.ts`: chapter content, grouped by act. Content only, no UI.
- `src/content/index.ts`: acts and chapter order.
- `src/components/blocks/`: renders content blocks (paragraph, callout, steps, quiz, prompt...).
- `src/components/widgets/`: one interactive lab per file, registered in `widgets/index.tsx`, wrapped in `Frame` (goal chip, footer, `useLab().complete()` at success).
- `BUILD_PLAN.md`: the owner's prioritized queue and its status. Update it with the work.
- `scripts/validate-content.ts`: syllabus coverage, widget usage, translations, quiz answers.

## Rules

- Persian first. Every new string needs both `fa` and `en`. Keep technical terms in Latin script inside Persian text.
- RTL-safe CSS: logical properties (`margin-inline-start`, `inset-inline-end`), never hard-coded left/right unless mirrored on purpose.
- Motion: animate `transform` and `opacity` only; ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for enter/exit, `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement; UI responses under 300ms; never animate from `scale(0)`; gate hover effects behind `(hover: hover) and (pointer: fine)`. `MotionConfig reducedMotion="user"` is set app-wide; CSS keyframes need their own `prefers-reduced-motion` rule.
- Facts about products (Cloudflare, GitHub, OpenAI, Anthropic) must match current official docs. Avoid hard numbers (prices, limits) unless verified, and link the docs.
- Correct a common misconception with a `callout` of tone `fix`.
- Café Sahar (`cafe-sahar.ir`) is the single running example in every chapter and lab.
- Where steps differ by tool, use a `path` block (Codex / Lovable). Quizzes: 4 options of similar length, answer position varied, a `why` per option (the validator enforces this).
- Do not redesign: keep the sticker style and Bit. Bit is the platform's signature character and is alive everywhere (owner request). `Mascot` moods: happy, calm, think, wow, wink, sleep, love, cheer. Idle life is CSS (breathing, per-Bit blink rhythm, antenna, glances, dark-mode antenna glow) and pauses off-screen; reactions are one interruptible squash-and-stretch hop (`useAnimate`) on every mood change or `poke`. `talking` = syllable-rhythm mouth, `wave` = arm raised from the shoulder (−95°, so it clears the head). Roles: `<TapBit>` (tap for a tip from `content/bitLines.ts`), `<BitSays>` (typewriter bubble), `useIdle` naps (Zzz) and a wake-up line, reading milestones on the progress line, `<BitLoader>` for lazy labs/panels, cheering on chapter completion, the 404 search. The trailer's Bit (`video/src/Trailer.tsx`) mirrors these moves frame by frame. All motion stops under reduced motion; pass `ambient={false}` only for a still icon.
- Bit's AI lines (`worker/ai/`): signed-in learners only, served from a per-section pool (`bit_lines`); the AI is called only to grow a pool, inside per-learner, global and monthly-budget limits. Providers via `worker/ai/gateway.ts` (Claude through the official SDK; Gemini and OpenAI-compatible via REST), keys are Worker secrets, everything else is live in Admin → Bit & AI. Prompts are built server-side from `worker/bitContext.json` (generated by `scripts/gen-meta.ts`), never from client text. Every request writes an `ai_usage` row. Models come from the self-maintaining registry (`worker/ai/registry.ts`, table `ai_models`): synced from each provider's list endpoint twice a day (cron), on stale read and with Admin → "Sync models now"; curated rows (`source='seed'`) are never touched by the sync; the admin picks models from dropdowns, and the server rejects any (provider, model) that isn't an active registry row. Never add a free-text model field.
- Admin routes: every `/api/admin/*` request re-reads the caller's role from D1 (never from the request); every state change writes an `audit_log` row; settings are sanitized in `worker/settings.ts`.
- Never edit an applied D1 migration; add a new file.
- Browser storage is only for per-viewer conveniences (language, theme, progress, drafts) and every access is wrapped in try/catch.
- Run `npm run build` before you say a change is done.
