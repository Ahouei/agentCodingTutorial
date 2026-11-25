# AGENTS.md

Instructions for AI coding agents (Codex, Claude Code and others) working on this repository.

## What this is

"Zero to Hero" (از صفر تا قهرمان): an interactive, story-like course that teaches people with no programming background to build and publish any kind of website or web app with agentic AI and vibe coding, using GitHub and Cloudflare. Persian is the primary language (RTL); English is the second language.

## Stack

- Vite + React 19 + TypeScript, animation with `motion` (Motion for React).
- No router library: a tiny hash router in `src/lib/app.tsx` (`#/` and `#/c/<slug>[/<section>]`).
- Fonts are self-hosted through Fontsource (no Google Fonts requests).
- Deployed as static assets on Cloudflare Workers (`wrangler.jsonc`).

## Commands

- `npm run dev`: local dev server
- `npm run validate`: content checks (must pass)
- `npm run build`: validate, type-check and build to `dist/`
- `npm run deploy`: build and `wrangler deploy`

## Where things live

- `src/content/types.ts`: the content schema. Every user-facing string is `{ fa, en }`.
- `src/content/chapters/*.ts`: chapter content, grouped by act. Content only, no UI.
- `src/content/index.ts`: acts and chapter order.
- `src/components/blocks/`: renders content blocks (paragraph, callout, steps, quiz, prompt...).
- `src/components/widgets/`: one interactive lab per file, registered in `widgets/index.tsx`, wrapped in `Frame`.
- `scripts/validate-content.ts`: syllabus coverage, widget usage, translations, quiz answers.

## Rules

- Persian first. Every new string needs both `fa` and `en`. Keep technical terms in Latin script inside Persian text.
- RTL-safe CSS: logical properties (`margin-inline-start`, `inset-inline-end`), never hard-coded left/right unless mirrored on purpose.
- Motion: animate `transform` and `opacity` only; ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for enter/exit, `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement; UI responses under 300ms; never animate from `scale(0)`; gate hover effects behind `(hover: hover) and (pointer: fine)`. `MotionConfig reducedMotion="user"` is set app-wide; CSS keyframes need their own `prefers-reduced-motion` rule.
- Facts about products (Cloudflare, GitHub, OpenAI, Anthropic) must match current official docs. Avoid hard numbers (prices, limits) unless verified, and link the docs.
- Correct a common misconception with a `callout` of tone `fix`.
- Browser storage is only for per-viewer conveniences (language, theme, progress, drafts) and every access is wrapped in try/catch.
- Run `npm run build` before you say a change is done.
