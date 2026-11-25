# Build plan: Zero to Hero v2

The owner's picks from the redesign/QA review (`docs/redesign/`), turned into one queue.
Duplicates are merged into one unit (noted as "=").
Status: `todo` · `doing` · `done` (with commit) · `blocked` (with reason).
Update this file in the same commit as the work. A fresh session resumes from here.

## Ground rules from the owner

- **Do not change the existing design or Bit's character.** Bit stays, the sticker style stays. Add fixes, don't redesign (RD-04, RD-05).
- **Mobile must stay beautiful**, and navigation must be complete: Back closes overlays first, scroll position is restored on Back, deep links work (RD-05).
- **Café Sahar is the one main project everywhere.** Keep the six older demo businesses as one extra practice exercise (RD-01).
- **Both palettes are user-selectable** (Candy and Kashi), independent of light/dark (RD-09).
- **Accounts are optional.** Everything works signed-out; signing in syncs progress and position across devices (RD-10). Worker + Turnstile + Resend.
- **Lovable is a first-class path.** Where steps differ, chapters show a Codex path and a Lovable path. Add a graphical comparison of Claude Code, Codex, Lovable, Grok and DeepSeek, focused on Codex vs Lovable; the others are options that fill gaps.
- **No duplicate work; careful, verified, excellent.** Every unit: build → validate → browser-check → commit → deploy → check live.

## Phase 0 · Operations

| ID | Item | Status |
|---|---|---|
| OP-01 | Push work as `main` | done (main = 3a5af45) |
| OP-04 | Minimum TLS 1.2 on ahouei.site | done (TLS 1.1 refused, 1.2 OK) |
| OP-05 | SSL mode Full (strict) | done (no own-origin records in zone; start + drule unchanged) |
| OP-02 | Deploy on every push | done: .github/workflows/deploy.yml; deploys once the owner adds CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID repo secrets |
| OP-03 | Voice MP3s on the site | blocked: Drive files are private; owner to share or upload |

## Phase 1 · Robustness, accessibility, motion (code)

| ID | Item | Status |
|---|---|---|
| QA-01 | Safe storage reads (shape-checked) + error boundaries around app and each lab | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-09 | Per-page `document.title`, focus to chapter h1 on navigation | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-10 | Header progress pill scrolls to map on home | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-13 | Restore home scroll position on Back | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-14 | Single scroll offset for section links | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-16 | Contrast: headline ink, `--ink-3` text → #7a6b5c | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-17 | All controls ≥ 44px | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-18 | Focusable code blocks, heading levels, table header, accessible names | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-08 | Motion: reveal only headings/labs/quiz, still small Bits, tokens in `lib/motion.ts`, shared-element chapter transition | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-07 | Lab standard: goal chip, footer (Reset start / action end), done stamp → chapter | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-03 | Token lab: any danger permission → "Huge" | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-04 | Token lab + content: add Workers Tail Read | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-07 | Vibe loop: commit once | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-08 | Live regions: DNS countdown, brief preview | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-11 | Storage game: hints that don't give the answer | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-12 | Lab feedback translated at render time | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-15 | Nameserver lab: tracked timeout | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-12 | Copy pass on labs and buttons | done (verified locally: nav 23/23, axe 0, sweep clean) |

## Phase 2 · Content

| ID | Item | Status |
|---|---|---|
| QA-02 = RD-06 | Quizzes: similar-length options, balanced answer positions, explanation per option; act reviews (5 questions × 4 acts); validator guard | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-04 | Mission brief (outcome · time · café gain) + warm-up question from previous chapter; `<bdi>` for Latin runs | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-01 | Café Sahar in every lab and prompt; one extra exercise with the six other businesses | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-22 = RD-07A/B/C | New labs: which agent for me · find 5 design flaws · find the leaked secret | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-05 | Claude Code plans | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-06 | GitHub chapter cross-reference | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-19 | Reading times | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-20 | Persian spelling consistency (+ validator rule) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-21 | Typable placeholder | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-25 | Dependabot link | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-23 | Voice notes: per-chapter timestamps + transcript panel | done (player waits for the MP3s, OP-03) |
| QA-26 | New chapter: be found (titles, share previews, sitemap, Search Console, analytics) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-27 | Plan B for Iran (hosting alternatives) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| LOV | Lovable path across chapters (`path` block: Codex / Lovable) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| CMP | New chapter + lab: compare Claude Code, Codex, Lovable, Grok, DeepSeek | done (verified locally: nav 23/23, axe 0, sweep clean) |

## Phase 3 · Platform

| ID | Item | Status |
|---|---|---|
| QA-29 | Real URLs (`/c/<slug>/<section>`), Worker injects per-page title/description/OG | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-31 | Real 404 status | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-28 | Share previews (OG/Twitter tags + images) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-30 | Security headers (CSP, HSTS, nosniff, Referrer-Policy, Permissions-Policy) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| QA-24 | Immutable caching for hashed assets | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-05 | Mobile: bottom bar + sections sheet + tap-a-term glossary; Back closes sheets; scroll restore | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-02 | Hero: ink headline, progress line, resume card (exact section) | done (verified locally: nav 23/23, axe 0, sweep clean) |
| RD-09 | Palettes: Candy / Kashi selectable × light/dark; dark sticker fix | done (verified locally: nav 23/23, axe 0, sweep clean) |

## Phase 4 · Accounts and finishing

| ID | Item | Status |
|---|---|---|
| RD-10 | Optional sign-in (email magic link via Resend, Turnstile), D1 users/sessions/progress, offline-first merge; earned "done" (quiz + lab); certificate with live URL | done in code; Turnstile widget created (site key in wrangler.jsonc, TURNSTILE_SECRET_KEY set on the Worker); sign-in switches on when RESEND_API_KEY is added and ahouei.site is verified in Resend |

## Phase 5 · Media

| ID | Item | Status |
|---|---|---|
| RD-11 | Remotion trailer (Bit builds the café) + 1200×630 share card per chapter | done: 21 share cards in public/og; trailer public/media/trailer.mp4 (20s, 1080×1080, 831 KB; source in video/) |

## Skipped by the owner

- RD-03 Journey map "you are here" redesign.
