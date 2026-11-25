# Platforms research: Lovable, Codex, Claude Code, Grok, DeepSeek (+ Plan B hosting for Iran)

Checked: **2026-11-25**. Every factual line carries a source. Lines marked **unverified** could not be confirmed on an official page and must not be stated as fact in the course. Section 6 scores are the course's **editorial judgment**, not facts.

---

## 1. Lovable in depth

**What it is.** An AI app builder: "Simply chat to instantly build websites and web apps, with no technical knowledge needed." ([lovable.dev/pricing FAQ](https://lovable.dev/pricing)) It provides "a high-quality AI agent, a visual editor, preview environments, and fully managed infrastructure." ([docs: deployment & ownership](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md))

**Prompt → app.** You describe the app in the project chat; Lovable generates frontend and, when needed, the backend. ([docs: built-in backend](https://docs.lovable.dev/features/cloud.md)) Every change is saved as a version you can restore. ([docs: quick start](https://docs.lovable.dev/introduction/getting-started))

**Stack it generates.**
- New apps created **from May 13, 2026 use TanStack Start** (server-side rendering, server functions); older apps use **React + Vite** and build to static files. ([docs: ownership](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md), [Lovable blog: TanStack Start](https://lovable.dev/blog/building-apps-using-tanstack-start))
- Per Lovable's blog, the new stack's runtime is **Cloudflare Workers** (previously static hosting on Cloudflare Pages), with secrets as Workers bindings and Supabase for database/auth/storage/realtime. ([Lovable blog](https://lovable.dev/blog/building-apps-using-tanstack-start))
- Tailwind CSS / shadcn/ui as defaults: **unverified** on an official page in this pass.

**Backend options.**
- **Built-in backend ("Cloud")**: database, auth, storage, realtime, edge/server functions, secrets, logs; "utilizes Supabase's open-source foundation"; enabled by default per workspace, Lovable enables it (or asks) when a feature needs it. ([docs: built-in backend](https://docs.lovable.dev/features/cloud.md))
- **Your own Supabase**: integration available on all plans; no one-click migration from Cloud to your own Supabase (export data, connect Supabase to a new project, rebuild schema). ([docs: Supabase integration](https://docs.lovable.dev/integrations/supabase))
- Backend permissions (enable Cloud, modify database, backward-incompatible migrations default **Never allow**, etc.). ([docs: built-in backend](https://docs.lovable.dev/features/cloud.md))

**Git sync (GitHub).** Two-way: "Changes made in Lovable sync to GitHub; changes pushed to the active GitHub branch sync back into Lovable"; one branch at a time; github.com on all plans; GitLab and Bitbucket also supported. ([docs: GitHub](https://docs.lovable.dev/integrations/github.md), [docs: Git sync overview](https://docs.lovable.dev/integrations/git-sync-overview)) Deleting the repo stops sync. ([search summary of docs: Git sync overview](https://docs.lovable.dev/integrations/git-sync-overview.md)) Download codebase as zip: paid plans. ([docs: GitHub](https://docs.lovable.dev/integrations/github.md))

**Modes.** Project chat has three modes: **Chat** (discuss, no code changes), **Plan** (investigate, write an editable plan you approve; never modifies code; 1 credit per message plus subagent research), **Build** (previously Agent mode; implements and verifies changes end to end). ([docs: Plan mode](https://docs.lovable.dev/features/plan-mode), [docs: Build mode](https://docs.lovable.dev/features/agent-mode)) Approved plans are stored in `.lovable/plan/`. ([docs: Plan mode](https://docs.lovable.dev/features/plan-mode))

**Visual editing.** The **preview toolbar** (replaces the older "Visual edits") lets you select elements and describe a change, edit text inline, draw annotations, and leave comments; all plans. Select-element requests consume credits. ([docs: preview toolbar](https://docs.lovable.dev/features/preview-toolbar))

**Instructions (≈ AGENTS.md).** "Instructions (previously Knowledge)": workspace, project and personal levels, plain text, up to 10,000 characters each; always included in context. **Skills** load on demand. Priority on conflict: personal → project → workspace. ([docs: Instructions](https://docs.lovable.dev/features/knowledge))

**Version history / revert.** Every change is saved to version history; bookmark known-good versions; revert from a chat message or history. ([docs: from idea to app](https://docs.lovable.dev/tips-tricks/from-idea-to-app), [docs: project chat](https://docs.lovable.dev/features/projects/chat), [docs: glossary](https://docs.lovable.dev/glossary))

**Publishing.** Publish button → address `your-app.lovable.app`; automatic security checks run in the publish dialog; with built-in backend and unresolved critical findings Lovable shows a review dialog (Review / Publish anyway / Try to fix). ([docs: publish](https://docs.lovable.dev/features/publish))

**Custom domains.** Paid plans. Three paths: buy through Lovable, connect a domain you own (add Lovable's DNS records, keep `MX`; remove conflicting A/AAAA/CNAME on that hostname), or transfer to Lovable; SSL automatic; propagation up to 72 hours. ([docs: publish](https://docs.lovable.dev/features/publish), [docs: launch on a custom domain](https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain), [docs: hosting](https://docs.lovable.dev/features/hosting))

**Security scan.** Automatic checks (database access rules / RLS, public MCP tool access, vulnerable dependencies) run before publishing; **advanced checks** read all code (7 categories: sign-in, access permissions, private data, keys, user input, app actions, payments); findings labeled Critical/Warning/Info. ([docs: security overview](https://docs.lovable.dev/features/security)) "Security center" is a Business+ feature. ([docs: subscription plans](https://docs.lovable.dev/introduction/subscription-plans))

**Export and host elsewhere (e.g. Cloudflare).**
- "You are never locked in… export your code, migrate your data, self-host parts or all of your stack." ([docs: ownership](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md))
- TanStack Start apps need a host that runs the server part; Nitro auto-detects platforms "including Vercel, Netlify, and Cloudflare Pages"; build `npm run build`, Node.js 22, output `dist`; set `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`; add the new URL to auth redirect URLs. Older React+Vite apps: static `dist/` with `index.html` fallback. Publish button keeps publishing only to Lovable hosting. ([docs: external deployment](https://docs.lovable.dev/tips-tricks/external-deployment-hosting))
- Cloudflare's own guide: `wrangler deploy` auto-detects TanStack Start and generates config (`main: @tanstack/react-start/server-entry`); or add `@cloudflare/vite-plugin` and remove `nitro()`. ([Cloudflare docs: TanStack Start](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/))
- **Feasible path for the course:** Lovable → Git sync to GitHub → Cloudflare Workers (Workers Builds from the repo, or `npx wrangler deploy`) with Supabase/Cloud env vars set. Exact preset interplay between Lovable's `@lovable.dev/vite-tanstack-config` and Cloudflare's plugin: **unverified on an official page** (a third-party post says the Lovable wrapper bundles the Cloudflare Vite plugin: [Staticbot](https://www.staticbot.dev/blog/lovable-tanstack-cloudflare-workers-deep-dive)). Tell learners to verify with a test deploy first, as Lovable's docs advise. ([docs: external deployment](https://docs.lovable.dev/tips-tricks/external-deployment-hosting))

**Pricing and credits (official).**
- Free; **Pro $25/month, 100 credits**; **Business $50/month, 100 credits**; Enterprise volume-based; yearly billing "2 months free"; students up to 50% off Pro. ([lovable.dev/pricing](https://lovable.dev/pricing))
- One credit balance covers building, chat, hosting/Cloud, AI features in deployed apps, and connectors. ([docs: credits](https://docs.lovable.dev/introduction/plans-and-credits.md))
- Free: 5 daily build credits up to 30/month; monthly Cloud grant 20 credits and AI grant 4 credits on Free/Pro/Business. ([docs: subscription plans](https://docs.lovable.dev/introduction/subscription-plans))
- Example costs: "Make the button gray" 0.50; "Add authentication" 1.20; "Build me a landing page, use images" 1.70; Plan mode 1 credit/message. ([lovable.dev/pricing](https://lovable.dev/pricing))
- Expiry: monthly plan credits expire 2 months after issue; top-ups last 12 months. ([lovable.dev/pricing](https://lovable.dev/pricing))
- Custom domains, code editing, code download, badge removal: Pro and up. ([docs: subscription plans](https://docs.lovable.dev/introduction/subscription-plans))

**Limits / pitfalls.**
- Usage-based cost: building **and** running (Cloud hosting, AI gateway) draw credits. ([docs: credits](https://docs.lovable.dev/introduction/plans-and-credits.md))
- Instructions may not be followed consistently in very long conversations. ([docs: Instructions](https://docs.lovable.dev/features/knowledge))
- Leaving Lovable makes you responsible for CI/CD, infra, auth, secrets, backups. ([docs: ownership](https://docs.lovable.dev/tips-tricks/deployment-hosting-ownership.md))

**Iran / sanctions (official).** Terms (updated Aug 28, 2026): "You may not use the Services if you are located in, ordinarily resident in, or acting on behalf of a person or entity located in, a country or territory subject to comprehensive embargoes or sanctions." ([lovable.dev/terms](https://lovable.dev/terms)) Lovable's partner terms name Iran explicitly among such countries. ([partner program terms](https://lovable.dev/solution-partner-program-terms)) Billing runs via Stripe. ([docs: credits](https://docs.lovable.dev/introduction/plans-and-credits.md))

---

## 2. OpenAI Codex

- Codex is "included across ChatGPT plans, including Free and Go"; usage limits vary by plan. **Codex Cloud** is for eligible Plus, all Pro tiers, Business, Enterprise, Healthcare, Education; not Free or Go. ([OpenAI Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan))
- Surfaces: **ChatGPT desktop app (Codex mode), Codex CLI, Codex IDE extension, Codex web**; Cloud tasks continue while your computer sleeps; startable from desktop, web, mobile. ([OpenAI Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan))
- Cloud setup covers connecting repositories, environments, credentials and network access. ([OpenAI Help: Codex Cloud](https://help.openai.com/en/articles/20001545-using-codex-cloud))
- Auto-review: a separate reviewer can approve eligible actions. ([OpenAI Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan))
- AGENTS.md is read before work. ([OpenAI: AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)) Skills live in `.agents/skills` / `~/.agents/skills`. ([OpenAI: skills](https://developers.openai.com/codex/skills)) (from earlier verified course research)
- Current models include GPT-6.2 (Nov 17, 2026) in Codex. ([developers.openai.com/codex](https://developers.openai.com/codex))
- **Availability:** OpenAI's supported-countries list does **not** include Iran; "Accessing … outside of the countries and territories listed below may result in your account being blocked or suspended." ([OpenAI Help: supported countries](https://help.openai.com/en/articles/7947663-chatgpt-supported-countries))

## 3. Claude Code

- Runs in terminal, IDE extensions (VS Code, Cursor and forks, JetBrains), desktop app, and web. ([Claude Code overview](https://code.claude.com/docs/en/overview), [Claude Help](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan))
- Plans: **Pro, Max, Ultra** (individual) and **Team, Enterprise**; limits shared between Claude and Claude Code; Pro/Max have 5-hour and weekly limits. ([Claude Help](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan))
- Terminal CLI, VS Code and JetBrains also support third-party providers. ([Claude Code overview](https://code.claude.com/docs/en/overview))
- CLAUDE.md for project memory; reads AGENTS.md; skills in `.claude/skills` / `~/.claude/skills`. ([memory](https://code.claude.com/docs/en/memory), [skills](https://code.claude.com/docs/en/skills)) (from earlier verified course research)
- **Availability:** Anthropic's Supported Regions Policy: available only in listed countries; Iran is not listed. ([Anthropic supported countries](https://www.anthropic.com/supported-countries))
- Notable: DeepSeek publishes an official guide to run **Claude Code against DeepSeek models** via `ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic`. ([DeepSeek: Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/))

## 4. Grok (xAI)

- **Grok Build**: xAI's terminal coding agent/CLI, "now powered by Grok 4.7"; "Available to try for Free"; install `curl -fsSL https://x.ai/cli/install.sh | bash`. ([x.ai/cli](https://x.ai/cli))
- Features listed: plan mode (edits blocked until approval), subagents with worktrees, skills, plugins/marketplace, hooks, MCP servers, **AGENTS.md**, memory, git integration, headless mode for CI, code review, web search, sandboxed execution. ([x.ai/cli](https://x.ai/cli))
- Launched in beta mid-May 2026. ([Gigazine](https://gigazine.net/gsc_news/en/20260515-grok-build-beta/), [The Decoder](https://the-decoder.com/x-ai-plays-catch-up-with-grok-build-its-first-terminal-based-coding-agent/))
- Coding model `grok-build-0.1` (early access) has a models page. ([docs.x.ai](https://docs.x.ai/docs/models/grok-build-0.1))
- Paid tiers (SuperGrok, X Premium+) and API prices: **unverified** (third-party trackers conflict: [Engadget](https://engadget.com/2173482/xai-coding-agent-grok-build), [morphllm](https://www.morphllm.com/grok-api-pricing)).
- Iran availability: **unverified**.
- **For this course:** a capable terminal agent with the same concepts (plan, skills, AGENTS.md); newer and less proven than Codex/Claude Code per press commentary ([eWeek](https://www.eweek.com/news/xai-grok-build-coding-agent/)); no built-in hosting.

## 5. DeepSeek

- **Models (official, checked today):** `deepseek-flash` (DeepSeek-V4.1-Flash-1017; vision supported) and `deepseek-v4-pro` (DeepSeek-V4-Pro-0813); 1M context; max output 384K; OpenAI-format base URL `https://api.deepseek.com` and Anthropic-format `https://api.deepseek.com/anthropic`; tool calls, JSON output, Responses API. ([DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing))
- **Prices per 1M tokens (peak / off-peak):** Flash input cache-miss $0.30 / $0.15, output $1.20 / $0.60; V4-Pro input cache-miss $1.32 / $0.66, output $3.96 / $1.98; cache hits far cheaper. Off-peak = half price; peak hours 01:00–04:00 and 06:00–10:00 UTC Mon–Fri. ([DeepSeek pricing](https://api-docs.deepseek.com/quick_start/pricing))
- **Open weights:** V4 released with MIT-licensed weights on Hugging Face/ModelScope (press: [The Register](https://www.theregister.com/2026/04/24/deepseek_v4/), [VentureBeat](https://venturebeat.com/technology/deepseek-v4-arrives-with-near-state-of-the-art-intelligence-at-1-6th-the-cost-of-opus-4-7-gpt-5-5)); exact current repo names: **unverified** on huggingface.co. Models are very large (hundreds of billions to >1T params), so local hosting is not realistic for beginners.
- **Inside agent tools (official docs):** OpenCode (`/connect` → deepseek) ([DeepSeek: OpenCode](https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/)); Claude Code via Anthropic-format API ([DeepSeek: Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/)); Cline provider ([Cline docs](https://docs.cline.bot/provider-config/deepseek)); Aider `--model deepseek` ([Aider docs](https://aider.chat/docs/troubleshooting/models-and-keys.html)).
- **Payment:** top-up via PayPal, bank card, Alipay, or WeChat Pay; balance doesn't expire. ([DeepSeek FAQ](https://api-docs.deepseek.com/faq)) Whether these work for Iranian residents: **unverified**; no official DeepSeek statement on Iran found.
- **Strengths:** very low cost; plugs into many agents; open weights. **Weaknesses:** not a hosting/app builder; you need an agent tool; no website builder or deploy flow of its own.

---

## 6. Comparison for a non-programmer building a site

| Axis | Codex | Lovable | Claude Code | Grok Build | DeepSeek |
|---|---|---|---|---|---|
| Ease for beginners | Chat + agent; you still handle repo/hosting ([Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)) | Chat → live app, visual toolbar ([docs](https://docs.lovable.dev/features/preview-toolbar)) | Terminal/IDE/desktop/web ([overview](https://code.claude.com/docs/en/overview)) | Terminal CLI ([x.ai/cli](https://x.ai/cli)) | Needs an agent tool + API key ([docs](https://api-docs.deepseek.com/)) |
| Code ownership/export | Your repo | Git sync all plans; download on paid ([docs](https://docs.lovable.dev/integrations/github.md)) | Your repo | Your repo | Your repo (via tool) |
| Backend/database | You choose (e.g. Cloudflare D1) | Built-in Cloud (Supabase-based) ([docs](https://docs.lovable.dev/features/cloud.md)) | You choose | You choose | You choose |
| Built-in hosting | No | Yes, lovable.app ([docs](https://docs.lovable.dev/features/publish)) | No | No | No |
| Custom domain | Via your host (Cloudflare) | Paid plans ([docs](https://docs.lovable.dev/introduction/subscription-plans)) | Via your host | Via your host | Via your host |
| Cost model | ChatGPT plan; Cloud from Plus ([Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)) | Credits; Pro $25 ([pricing](https://lovable.dev/pricing)) | Pro/Max/Ultra/Team/Ent ([Help](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)) | Free to try; paid tiers unverified ([x.ai/cli](https://x.ai/cli)) | Pay per token, cheap ([pricing](https://api-docs.deepseek.com/quick_start/pricing)) |
| Control/precision | High | Medium (abstracted) | High | High | Depends on tool |
| Agentic autonomy | Cloud tasks, multi-agent ([Help](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)) | Build mode end-to-end ([docs](https://docs.lovable.dev/features/agent-mode)) | High | Subagents, plan mode ([x.ai/cli](https://x.ai/cli)) | Depends on tool |
| GitHub integration | Repo connect ([Help](https://help.openai.com/en/articles/20001545-using-codex-cloud)) | Two-way sync ([docs](https://docs.lovable.dev/integrations/github.md)) | GitHub App / git | git integration ([x.ai/cli](https://x.ai/cli)) | via tool |
| Works with Cloudflare | Yes (wrangler, MCP) | Export → Workers; stack runs on Workers ([blog](https://lovable.dev/blog/building-apps-using-tanstack-start)) | Yes | Yes (CLI) | via tool |
| Access from Iran / payment | Iran not on supported list ([Help](https://help.openai.com/en/articles/7947663-chatgpt-supported-countries)) | Terms bar sanctioned countries ([terms](https://lovable.dev/terms)) | Iran not supported ([Anthropic](https://www.anthropic.com/supported-countries)) | unverified | No official Iran statement; PayPal/card/Alipay/WeChat ([FAQ](https://api-docs.deepseek.com/faq)) |
| Open-weight / offline | No | No | No | No | Yes, MIT weights (press) |

**Radar scores 1–5 (editorial judgment of this course, not facts).**

| Axis | Codex | Lovable | Claude Code | Grok | DeepSeek | Why (one line) |
|---|---|---|---|---|---|---|
| Beginner ease | 3 | 5 | 3 | 2 | 2 | Lovable shows a live app from chat; others need repo/terminal/tool setup. |
| Code ownership | 5 | 4 | 5 | 5 | 5 | Lovable exports fully, but download/edit code needs a paid plan. |
| Backend included | 2 | 5 | 2 | 2 | 1 | Only Lovable ships database/auth by default. |
| Hosting included | 1 | 5 | 1 | 1 | 1 | Only Lovable publishes for you. |
| Control/precision | 5 | 3 | 5 | 4 | 3 | Code-first agents edit exactly what you ask; Lovable abstracts. |
| Agent strength (coding) | 5 | 4 | 5 | 4 | 4 | Codex/Claude Code are mature; Grok newer; DeepSeek strong value but tool-dependent. |
| Cost efficiency | 4 | 3 | 3 | 3 | 5 | DeepSeek per-token is far cheapest; Lovable credits also pay for running the app. |
| Access from Iran | 2 | 1 | 1 | 2 | 3 | All US services exclude Iran officially; DeepSeek has no stated ban (still unverified). |

---

## 7. Scenarios (Codex flow vs Lovable flow)

1. **Landing page.** Codex: brief → AGENTS.md → Codex builds static site in repo → Cloudflare Workers static assets → custom domain. Lovable: prompt → preview toolbar polish → Publish to lovable.app → custom domain (Pro). Combine: none needed; Lovable fastest, Codex cheapest to host.
2. **Blog.** Codex: static site generator or React + Markdown in repo; deploy on Workers. Lovable: ask for a blog with posts in the built-in database; posts editable via an admin page. Combine: Lovable prototype → Git sync → Codex adds Markdown/RSS → Cloudflare.
3. **Small shop with payments.** Codex: Stripe Checkout + Worker webhook + D1; careful secrets. Lovable: payments are a built-in-backend feature category ([docs](https://docs.lovable.dev/features/cloud.md)); run advanced security checks (Payments category) before publishing ([docs](https://docs.lovable.dev/features/security)). Note: payment providers' own country restrictions apply.
4. **Café Sahar booking form with database.** Codex: form → Worker API → D1 table → Turnstile → email via provider; tests; deploy. Lovable: "add a booking form saved to the database with email confirmation"; Cloud DB with RLS; security check flags RLS mistakes ([docs](https://docs.lovable.dev/features/publish)). Combine: build in Lovable, export to GitHub, refine with Codex, deploy on Cloudflare with Supabase env vars ([docs](https://docs.lovable.dev/tips-tricks/external-deployment-hosting)).
5. **Internal dashboard.** Lovable Business "workspace publish" (logged-in members only) ([pricing](https://lovable.dev/pricing)); Codex: Worker + Cloudflare Access (verify) + D1.
6. **Persian RTL app.** Both: state `dir="rtl"`, Persian font, logical CSS in instructions (Lovable Instructions / AGENTS.md). RTL-specific Lovable behavior: **unverified**; test on a phone.

**Where the others help:** Claude Code as an alternative/second reviewer agent (same AGENTS.md concepts); Grok Build as a free-to-try terminal agent; **DeepSeek as a low-cost model inside OpenCode, Cline, Aider or even Claude Code** when subscription/payment is the obstacle ([DeepSeek: OpenCode](https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/), [DeepSeek: Claude Code](https://api-docs.deepseek.com/quick_start/agent_integrations/claude_code/)).

---

## 8. Plan B hosting for an Iranian audience

| Option | What exists (verified) | Source |
|---|---|---|
| **Liara** | Iranian cloud: PaaS ("managed cloud hosting"), WordPress, AI API, cloud VMs, DBaaS, email, object storage, DNS; CLI `@liara/cli` with `liara deploy`; React/Vue/Angular getting-started repos | [docs.liara.ir](https://docs.liara.ir/), [npm @liara/cli](https://www.npmjs.com/package/%40liara%2Fcli) |
| **Hamravesh** | Kubernetes-based cloud; **Darkube** PaaS for containerized apps, managed databases, managed Kubernetes, Hamgit (managed GitLab) with free runners | [hamravesh.com](https://hamravesh.com/) |
| **ArvanCloud** | CDN, DNS, cloud servers, object storage, edge computing, containers (third-party descriptions; official site did not render for automated fetch) | [SoftwareOne listing](https://platform.softwareone.com/vendor/arvancloud/VND-1094-4045), [Wikipedia: Abr Arvan](https://EN.wikipedia.com/wiki/Abr_Arvan) |
| **.ir domain (IRNIC)** | Registry for .ir; registration via IRNIC account/approved registrars; eligibility rules conflict across sources → **check nic.ir** | [IANA .ir](https://www.iana.org/domains/root/db/ir), [WIPO](https://www.wipo.int/en/web/amc/domain-name-disputes/cctld/ir) |

**Mirroring strategy (course guidance, not a vendor claim):**
1. Keep the static parts portable: `npm run build` → `dist/` works on any static host or object storage + CDN (for older React+Vite style apps; TanStack Start needs a server/PaaS) ([Lovable docs](https://docs.lovable.dev/tips-tricks/external-deployment-hosting)).
2. Deploy the same build to an Iranian PaaS/object storage (e.g. Liara static/Node app, Hamravesh Darkube container).
3. **DNS split:** international domain (e.g. `cafe-sahar.com`) on Cloudflare; a separate `.ir` domain pointing to the Iranian host. Don't mix both in one zone unless you know geo-DNS.
4. Backend: anything on Cloudflare (Workers/D1) stays international; for an Iran mirror use the Iranian provider's database or make the mirror read-only.
5. Availability of any service from inside Iran changes over time: **test from the audience's network** before announcing.

---

## Unverified (do not state as fact)

- Lovable default Tailwind/shadcn; exact Lovable↔Cloudflare build preset behavior; Lovable RTL handling.
- Grok paid tiers, API prices, Iran availability.
- DeepSeek current Hugging Face repo names; payment methods working for Iranian residents.
- ArvanCloud product list from its own site (fetch failed); IRNIC current eligibility rules.
