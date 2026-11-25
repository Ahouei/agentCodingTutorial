# از صفر تا قهرمان · Zero to Hero

**ساخت هر نوع وب‌سایت و وب‌اپلیکیشن با Agentic AI و Vibe Coding**
An interactive, story-like course for building and publishing any kind of website with agentic AI, from the first idea to a live site on your own domain.

- ۱۸ فصل در ۴ پرده: دنیا را بشناس، کارگاه را بچین، بساز، منتشر کن
- ۱۷ تمرین تعاملی (مسیر یک درخواست در اینترنت، جست‌وجوی DNS، بازی Git، انتخاب D1/KV/R2، ساخت API Token امن، سازنده AGENTS.md، آزمایشگاه Prompt، حلقه Vibe Coding، Pipeline استقرار و…)
- فارسی (راست‌به‌چپ) با نسخه انگلیسی، حالت روشن و تیره، ذخیره پیشرفت در مرورگر
- Bit، ربات کوچک دوره، همراه شما در همه فصل‌هاست

## The path

| Act | Chapters |
| --- | --- |
| I · Understand the world | Welcome · How the web works · Domains & DNS · GitHub · Cloudflare · Generative vs agentic AI · Meet the agents (Codex, Claude Code) |
| II · Set up the workshop | Accounts & tools · Connect your agent to GitHub and Cloudflare |
| III · Build | Project brief & AGENTS.md · Prompts & agent skills · Design first · The vibe coding loop |
| IV · Ship it | Testing & debugging · CI/CD & deployment · Custom domain · Security & maintenance · Hero (capstone) |

Every chapter follows the same rhythm: **why** → **how** → **try it** (interactive lab) → **tell your agent** (copyable prompt) → **quick check** → **where this piece fits**.

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

`npm run build` first runs `npm run validate`, which fails if any syllabus topic is uncovered, a widget is unused or used twice, a translation is missing, or a quiz answer is out of range.

## Deploy to Cloudflare Workers

Either connect this repository in the Cloudflare dashboard (Workers & Pages → Create → Import a repository) so every push to `main` deploys and branches get preview URLs, or deploy from your machine:

```bash
npx wrangler login
```

```bash
npm run deploy
```

`wrangler.jsonc` serves `dist/` as static assets with single-page-app fallback.

## Voice notes

The first chapters can play the course author's original voice notes. Put the files at:

```
public/audio/voice1.mp3   → Welcome, How the web works
public/audio/voice2.mp3   → Cloudflare, Generative vs agentic AI, Meet the agents
public/audio/voice3.mp3   → Connect your agent
```

The player only appears when the file exists, so nothing breaks while they are missing.

## Editing content

Content lives in `src/content/chapters/*.ts` as typed data (`src/content/types.ts`), separate from the UI. Each string is `{ fa, en }`. See `AGENTS.md` for the rules an AI agent should follow when editing this repo.

## Credits

Course concept and voice lessons by the course author. Design guided by Emil Kowalski's animation principles and the skills in [Ahouei-GetheredInOne-AIAgentSkills](https://github.com/Ahouei/Ahouei-GetheredInOne-AIAgentSkills) (emil-design-eng, web-animation-design, premium-web-design, scroll-experience, interactive-portfolio, structured-curriculum-content, course-build-discipline).
