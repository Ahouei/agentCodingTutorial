import type { Chapter } from '../types';

/**
 * Act III: Build.
 * project-brief → prompts-and-skills → design-first → vibe-coding-loop
 */
export const building: Chapter[] = [
  // ───────────────────────────────────────────── project-brief
  {
    slug: 'project-brief',
    act: 3,
    icon: 'map',
    title: { fa: 'تعریف پروژه: نقشه قبل از سفر', en: 'Define the project: a map before the trip' },
    tagline: {
      fa: 'قبل از اولین پیام به Agent، بدانید دقیقاً چه می‌خواهید',
      en: 'Know exactly what you want before your first message to the agent',
    },
    minutes: 15,
    mission: {
      outcome: { fa: "می‌توانید برای هر پروژه یک Brief یک‌صفحه‌ای بنویسید و آن را به دستورالعمل دائمی Agent تبدیل کنید.", en: "You can write a one-page brief for any project and turn it into the agent's standing instructions." },
      cafe: { fa: "Brief کافه سحر و فایل AGENTS.md آن نوشته می‌شود.", en: "Café Sahar's brief and its AGENTS.md get written." },
    },
    warmup: {
      q: { fa: "از فصل قبل: Cloudflare API Token را کجا باید نگه دارید؟", en: "From the last chapter: where should your Cloudflare API token live?" },
      options: [
        { fa: "در Secrets یا متغیرهای محیطی Agent", en: "In the agent environment's secrets" },
        { fa: "داخل کد پروژه در Repository", en: "Inside the project code in the repo" },
        { fa: "در متن چت تا Agent آن را مستقیم ببیند", en: "Pasted into the chat for the agent" },
      ],
      answer: 0,
      explain: { fa: "Token فقط یک بار نشان داده می‌شود؛ مستقیم در Secrets محیط Agent بگذاریدش.", en: "The token is shown only once; put it straight into the agent environment's secrets." },
      why: [
        { fa: "درست. آنجا از چت و تاریخچه Git بیرون می‌ماند.", en: "Right. It stays out of the chat and out of Git history." },
        { fa: "هر چیزی که Commit شود برای همیشه در تاریخچه Git می‌ماند.", en: "Anything committed stays in Git history forever." },
        { fa: "متن چت ذخیره می‌شود و Token لو می‌رود؛ هرگز Paste نکنید.", en: "Chats are stored, so the token leaks; never paste it." },
      ],
    },
    mascotLine: {
      fa: 'من خیلی سریع می‌سازم، ولی فقط وقتی بدانم «چه چیزی» را. بیایید اول با هم نقشه را بکشیم!',
      en: 'I build really fast, but only once I know what to build. Let’s draw the map together first!',
    },
    sections: [
      {
        id: 'why-a-brief',
        title: { fa: 'چرا اول باید پروژه را تعریف کنیم؟', en: 'Why define the project first?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "Agent مثل یک پیمانکار خیلی سریع و خیلی باهوش است که شما را نمی‌شناسد. اگر فقط بگویید «یک وب‌سایت قشنگ برای کافه‌ام بساز»، او مجبور است صدها تصمیم را خودش حدس بزند: چند صفحه؟ منو آنلاین؟ رزرو میز؟ فارسی یا انگلیسی؟ رنگ‌ها؟ هر حدس اشتباه یعنی یک دور اصلاح، و هر دور اصلاح یعنی وقت، اعتبار مصرفی و حوصله.",
              en: "An agent is like a very fast, very smart contractor who has never met you. If you only say “build a nice website for my café,” it has to guess hundreds of decisions on its own: how many pages? an online menu? table booking? Persian or English? which colors? Every wrong guess costs a round of fixes, and every round costs time, usage credits and patience.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "**Project Brief** (شرح پروژه) یک سند کوتاه است که جواب این سؤال‌ها را از قبل می‌دهد. لازم نیست حرفه‌ای یا طولانی باشد؛ یک صفحه کافی است. ولی همین یک صفحه، فرق بین «یک چیزی ساخت» و «دقیقاً چیزی که می‌خواستم را ساخت» است.",
              en: "A **project brief** is a short document that answers those questions up front. It doesn't need to be formal or long; one page is enough. But that one page is the difference between “it built something” and “it built exactly what I wanted.”",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'چرا این‌قدر مهم است؟', en: 'Why it matters so much' },
            text: {
              fa: "در Vibe Coding، **فکر کردن کار شماست و تایپ کردن کار Agent**. هر چه فکر روشن‌تر باشد، خروجی بهتر است. Brief خوب همچنین به شما کمک می‌کند بعداً قضاوت کنید که کار تمام شده یا نه، چون معیار موفقیت را از قبل نوشته‌اید.",
              en: "In vibe coding, **thinking is your job and typing is the agent's job**. The clearer the thinking, the better the output. A good brief also lets you judge later whether the work is done, because you wrote the success criteria in advance.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'یک تصور اشتباه رایج', en: 'A common misconception' },
            text: {
              fa: "«AI خودش می‌فهمد چه می‌خواهم.» نه دقیقاً. مدل فقط چیزی را می‌داند که در پیام‌ها، فایل‌های پروژه و ابزارهایش به آن داده شده. ذهن شما را نمی‌خواند. چیزی که ننوشته‌اید، برای Agent وجود ندارد.",
              en: "“The AI will figure out what I want.” Not quite. The model only knows what's in your messages, the project files and its tools. It can't read your mind. If you didn't write it down, it doesn't exist for the agent.",
            },
          },
        ],
      },
      {
        id: 'brief-ingredients',
        title: { fa: 'مواد اولیه یک Brief خوب', en: 'The ingredients of a good brief' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'هدف (Goal)', en: 'Goal' },
                text: {
                  fa: "این سایت قرار است چه مشکلی را حل کند؟ در یک جمله. مثلاً: «مشتری‌های کافه سحر منوی روز و ساعت کاری کافه را ببینند و میز رزرو کنند.»",
                  en: "What problem does this site solve? One sentence. For example: “Café Sahar's customers can see today's menu and opening hours, and book a table.”",
                },
              },
              {
                title: { fa: 'مخاطب (Audience)', en: 'Audience' },
                text: {
                  fa: "چه کسی از آن استفاده می‌کند؟ بیشتر با موبایل یا دسکتاپ؟ چه زبانی؟ چقدر با تکنولوژی راحت است؟",
                  en: "Who will use it? Mostly on mobile or desktop? Which language? How comfortable are they with technology?",
                },
              },
              {
                title: { fa: 'نوع پروژه', en: 'Project type' },
                text: {
                  fa: "Landing Page (یک صفحه معرفی)، Blog، Portfolio (نمونه‌کار)، فروشگاه (Shop)، Web App (برنامه با ورود کاربر و داده) یا Dashboard. نوع پروژه تعیین می‌کند که به Backend و Database نیاز دارید یا نه.",
                  en: "Landing page, blog, portfolio, shop, web app (with user accounts and data) or dashboard. The type decides whether you need a backend and a database at all.",
                },
              },
              {
                title: { fa: 'صفحه‌ها (Pages)', en: 'Pages' },
                text: {
                  fa: "فهرست صفحه‌ها: خانه، منو، درباره ما، تماس، رزرو. همین فهرست بعداً Sitemap شما می‌شود.",
                  en: "List the pages: home, menu, about, contact, booking. This list later becomes your sitemap.",
                },
              },
              {
                title: { fa: 'قابلیت‌ها با اولویت', en: 'Features, prioritized' },
                text: {
                  fa: "قابلیت‌ها را سه دسته کنید: **Must** (بدون آن منتشر نمی‌کنیم)، **Should** (خوب است داشته باشیم)، **Later** (نسخه‌های بعد). این تقسیم‌بندی نجات‌دهنده است.",
                  en: "Sort features into three buckets: **Must** (we won't launch without it), **Should** (nice to have), **Later** (future versions). This split will save you.",
                },
              },
              {
                title: { fa: 'محتوایی که دارید', en: 'Content you already have' },
                text: {
                  fa: "متن‌ها، عکس‌ها، لوگو، رنگ برند، شماره تماس، آدرس. محتوای واقعی کیفیت طراحی را چند برابر می‌کند.",
                  en: "Texts, photos, logo, brand colors, phone number, address. Real content makes the design several times better.",
                },
              },
              {
                title: { fa: 'حس و ظاهر (Look & Feel)', en: 'Look & feel' },
                text: {
                  fa: "سه صفت برای حس سایت (مثلاً گرم، دنج، مینیمال) و دو سه سایت مرجع که دوستشان دارید.",
                  en: "Three adjectives for the mood (for example warm, cozy, minimal) and two or three reference sites you like.",
                },
              },
              {
                title: { fa: 'زبان‌ها و جهت متن', en: 'Languages and text direction' },
                text: {
                  fa: "اگر سایت فارسی است، صریح بنویسید: **راست‌به‌چپ (RTL)**، فونت فارسی مناسب (مثل Vazirmatn)، و اعداد فارسی یا انگلیسی. اگر دوزبانه است، این را از روز اول بگویید، چون اضافه کردنش در آخر کار سخت‌تر است.",
                  en: "If the site is in Persian, say it explicitly: **right-to-left (RTL)**, a proper Persian font (such as Vazirmatn), and Persian or Latin digits. If it's bilingual, say so on day one, because adding it at the end is much harder.",
                },
              },
              {
                title: { fa: 'محدودیت‌ها (Constraints)', en: 'Constraints' },
                text: {
                  fa: "بودجه، مهلت، و زیرساخت: مثلاً «فقط با پلن رایگان Cloudflare، کد روی GitHub، بدون سرور اختصاصی». Agent باید این مرزها را بداند تا راه‌حل گران یا پیچیده پیشنهاد ندهد.",
                  en: "Budget, deadline and infrastructure: for example “Cloudflare free plan only, code on GitHub, no dedicated server.” The agent needs these limits so it doesn't propose something expensive or overly complex.",
                },
              },
              {
                title: { fa: 'معیار موفقیت', en: 'Success criteria' },
                text: {
                  fa: "از کجا بفهمیم کار تمام است؟ مثلاً: «روی موبایل خوب دیده شود، زیر سه ثانیه باز شود، فرم رزرو ایمیل بفرستد.»",
                  en: "How will we know it's done? For example: “Looks good on mobile, loads fast, the booking form sends an email.”",
                },
              },
            ],
          },
          { type: 'widget', id: 'brief-builder' },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'کوچک شروع کنید: MVP', en: 'Start small: the MVP' },
            text: {
              fa: "**MVP** یعنی Minimum Viable Product: کوچک‌ترین نسخه‌ای که واقعاً به درد مخاطب می‌خورد. اول فقط Mustها را بسازید و منتشر کنید. بعد یکی‌یکی Shouldها را اضافه کنید. پروژه‌ای که از روز اول همه چیز را می‌خواهد، معمولاً هیچ‌وقت تمام نمی‌شود.",
              en: "**MVP** means Minimum Viable Product: the smallest version that's genuinely useful to your audience. Build and launch only the Musts first. Then add the Shoulds one at a time. A project that wants everything on day one usually never ships.",
            },
          },
        ],
      },
      {
        id: 'agents-md',
        title: { fa: 'از Brief تا فایل دستورالعمل: AGENTS.md و CLAUDE.md', en: 'From brief to instruction file: AGENTS.md and CLAUDE.md' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "هر جلسه گفتگو با Agent با یک حافظه تازه شروع می‌شود. پس چطور Agent هر بار یادش بماند که پروژه فارسی است، روی Cloudflare اجرا می‌شود و دستور تست چیست؟ جواب: یک فایل دستورالعمل در ریشه Repository که Agent قبل از شروع کار آن را می‌خواند.",
              en: "Every agent session starts with a fresh memory. So how does the agent remember, every time, that the project is in Persian, runs on Cloudflare, and which command runs the tests? Answer: an instruction file at the root of the repository that the agent reads before it starts working.",
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: "**AGENTS.md**: یک قالب باز و ساده، مثل «README برای Agentها». Codex قبل از انجام هر کاری آن را می‌خواند و بسیاری از ابزارهای دیگر هم از آن پشتیبانی می‌کنند.",
                en: "**AGENTS.md**: a simple open format, like “a README for agents.” Codex reads it before doing any work, and many other tools support it too.",
              },
              {
                fa: "**CLAUDE.md**: فایل دستورالعمل اختصاصی Claude Code. طبق مستندات Anthropic، Claude Code می‌تواند AGENTS.md موجود در Repository را هم به‌عنوان دستورالعمل پروژه استفاده کند.",
                en: "**CLAUDE.md**: Claude Code's own instruction file. According to Anthropic's docs, Claude Code can also use a repository's existing AGENTS.md as the project instructions.",
              },
              {
                fa: "اگر با هر دو ابزار کار می‌کنید، یک AGENTS.md اصلی نگه دارید تا دو نسخه متفاوت از حقیقت نداشته باشید.",
                en: "If you use both tools, keep one main AGENTS.md so you don't end up with two different versions of the truth.",
              },
            ],
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: "در مسیر Codex، دستورالعمل‌ها در فایل **AGENTS.md** در ریشه Repository می‌نشینند. Codex قبل از هر کار آن را می‌خواند، و چون فایل در Git است، هر تغییرش هم تاریخچه دارد.",
                  en: "On the Codex path, instructions live in **AGENTS.md** at the repository root. Codex reads it before any work, and because it's in Git, every change to it has a history.",
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: "در Lovable همین نقش را **Instructions** (نام قبلی: Knowledge) بازی می‌کند: متن ساده در سه سطح Workspace، Project و Personal، هر کدام تا ۱۰٬۰۰۰ کاراکتر، که همیشه در زمینه کار Agent قرار می‌گیرد. اگر بین سطح‌ها تداخل باشد، اولویت با Personal، بعد Project و بعد Workspace است.",
                  en: "In Lovable, **Instructions** (formerly Knowledge) play the same role: plain text at three levels, workspace, project and personal, up to 10,000 characters each, always included in the agent's context. On conflict, personal wins, then project, then workspace.",
                },
              },
              {
                type: 'callout',
                tone: 'tip',
                text: {
                  fa: "Brief کافه سحر را در Instructions پروژه بچسبانید. طبق مستندات Lovable، در گفتگوهای خیلی طولانی ممکن است دستورالعمل‌ها همیشه رعایت نشوند؛ پس نکته‌های حیاتی (مثل RTL و فونت فارسی) را در Prompt همان کار هم تکرار کنید.",
                  en: "Paste Café Sahar's brief into the project Instructions. Lovable's docs note that instructions may not be followed consistently in very long conversations, so repeat critical points (like RTL and the Persian font) in the task's prompt too.",
                },
              },
            ],
          },
          {
            type: 'code',
            lang: 'markdown',
            caption: { fa: 'یک نمونه AGENTS.md کوتاه برای سایت کافه سحر', en: 'A short AGENTS.md example for the Café Sahar site' },
            code: `# Café Sahar website

## Project
Bilingual (Persian first, RTL) website for Café Sahar, a small neighbourhood café (domain: cafe-sahar.ir).
Goal: show today's menu and opening hours, and let people book a table.

## Stack
- Static frontend built with Vite
- Hosted on Cloudflare Workers (static assets), free plan
- Bookings stored in Cloudflare D1

## Commands
- Install: npm install
- Dev server: npm run dev
- Tests: npm test
- Deploy: handled by Cloudflare on push to main (do not deploy manually)

## Conventions
- Persian is the default language; use logical CSS (margin-inline-start, not margin-left)
- Font: Vazirmatn for Persian text
- Keep components small; one component per file

## Do
- Propose a plan and wait for approval before large changes
- Work on a new branch for every feature and open a pull request

## Don't
- Never commit secrets or API tokens
- Don't add new paid services or new dependencies without asking`,
          },
          {
            type: 'callout',
            tone: 'tip',
            text: {
              fa: "AGENTS.md را کوتاه و دقیق نگه دارید. این فایل در هر جلسه خوانده می‌شود، پس هر خط اضافه یعنی شلوغی ذهن Agent. فقط چیزهایی را بنویسید که اگر Agent نداند، اشتباه می‌کند.",
              en: "Keep AGENTS.md short and precise. It's read in every session, so every extra line clutters the agent's head. Only write what the agent would get wrong if it didn't know.",
            },
          },
          {
            type: 'prompt',
            title: { fa: 'از Agent بخواهید Brief را به AGENTS.md تبدیل کند', en: 'Ask the agent to turn your brief into AGENTS.md' },
            text: {
              fa: "این Brief پروژه من است:\n[متن Brief را اینجا بچسبانید]\n\nلطفاً هنوز هیچ کدی ننویس. فقط:\n۱. اگر جایی از Brief مبهم است، حداکثر ۵ سؤال از من بپرس.\n۲. بعد از جواب من، یک فایل AGENTS.md کوتاه در ریشه Repository بساز شامل: خلاصه پروژه، Stack، دستورهای نصب/اجرا/تست، قراردادها، و فهرست Do و Don't.\n۳. فایل را در یک Branch جدید Commit کن و خلاصه‌اش را برایم بنویس.",
              en: "Here is my project brief:\n[paste your brief here]\n\nPlease don't write any code yet. Just:\n1. If anything in the brief is unclear, ask me up to 5 questions.\n2. After I answer, create a short AGENTS.md at the repository root with: project summary, stack, install/run/test commands, conventions, and a Do and Don't list.\n3. Commit it on a new branch and summarize it for me.",
            },
          },
        ],
      },
      {
        id: 'brief-check',
        title: { fa: 'واژه‌ها و یک سؤال', en: 'Key terms and a quick check' },
        blocks: [
          {
            type: 'terms',
            items: [
              { term: 'Project Brief', def: { fa: 'سند کوتاهی که هدف، مخاطب، قابلیت‌ها، محدودیت‌ها و معیار موفقیت پروژه را مشخص می‌کند.', en: 'A short document stating the goal, audience, features, constraints and success criteria.' } },
              { term: 'MVP', def: { fa: 'کوچک‌ترین نسخه قابل‌استفاده محصول که زودتر منتشر می‌شود.', en: 'The smallest usable version of the product, shipped early.' } },
              { term: 'Sitemap', def: { fa: 'فهرست و ساختار صفحه‌های سایت و ارتباطشان با هم.', en: 'The list and structure of a site’s pages and how they link together.' } },
              { term: 'AGENTS.md', def: { fa: 'فایل دستورالعمل باز برای Agentهای کدنویس، در ریشه Repository.', en: 'An open-format instruction file for coding agents, kept at the repository root.' } },
              { term: 'CLAUDE.md', def: { fa: 'فایل دستورالعمل پروژه برای Claude Code.', en: 'The project instruction file for Claude Code.' } },
              { term: 'RTL', def: { fa: 'Right-to-Left؛ جهت راست‌به‌چپ متن، مثل فارسی و عربی.', en: 'Right-to-left text direction, as in Persian and Arabic.' } },
            ],
          },
          {
            type: 'quiz',
            q: { fa: "شما می‌خواهید یک فروشگاه آنلاین بسازید ولی وقت و بودجه کمی دارید. بهترین شروع کدام است؟", en: "You want to build an online shop but have little time and budget. What is the best start?" },
            options: [
              { fa: "یک MVP فقط با Mustها تعریف کنیم و بقیه را برای نسخه‌های بعد بگذاریم.", en: "Define an MVP with only the Musts and leave the rest for later versions." },
              { fa: "همه قابلیت‌ها را در یک پیام بلند بخواهیم تا Agent همه را یکجا بسازد.", en: "Ask for every feature in one long message so the agent builds it all at once." },
              { fa: "بدون Brief شروع کنیم و بگذاریم Agent قابلیت‌های لازم را حدس بزند.", en: "Start without a brief and let the agent guess which features you need." },
              { fa: "اول ظاهر همه صفحه‌ها را کامل کنیم و قابلیت‌ها را آخر کار بگذاریم.", en: "Perfect the look of every page first and add features at the very end." },
            ],
            answer: 0,
            explain: { fa: "MVP یعنی زودتر منتشر کردن چیزی که واقعاً کار می‌کند، و بعد رشد دادن آن.", en: "An MVP gets something that really works out the door sooner, then grows it." },
            why: [
              { fa: "درست. اول Mustها منتشر می‌شوند و بقیه یکی‌یکی اضافه می‌شوند.", en: "Right. The Musts ship first and the rest is added one by one." },
              { fa: "پیام غول‌پیکر یعنی حدس‌های زیاد، تغییرات بزرگ و بررسی سخت.", en: "A giant message means many guesses, huge changes and hard reviews." },
              { fa: "بدون Brief، Agent صدها تصمیم را حدس می‌زند و اصلاح‌ها تمام نمی‌شوند.", en: "Without a brief the agent guesses hundreds of decisions and fixes never end." },
              { fa: "ظاهر بدون قابلیت اصلی به کار مشتری نمی‌آید؛ اول Mustها، بعد ظرافت.", en: "A polished look without core features doesn't help customers; Musts first." },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'AGENTS.md: open format for coding agents', url: 'https://agents.md' },
              { label: 'OpenAI Codex: Custom instructions with AGENTS.md', url: 'https://developers.openai.com/codex/guides/agents-md' },
              { label: 'Claude Code: How Claude remembers your project (CLAUDE.md)', url: 'https://code.claude.com/docs/en/memory' },
              { label: 'Lovable docs: Instructions (formerly Knowledge)', url: 'https://docs.lovable.dev/features/knowledge' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "در پرده دوم Agent را به GitHub و Cloudflare وصل کردید؛ حالا با Brief به او می‌گویید با این دسترسی‌ها «چه» بسازد. همین Brief و فایل AGENTS.md، پایه Promptهای فصل بعد، طرح اولیه فصل طراحی و معیار شما برای تست و تحویل در پرده چهارم است.",
      en: "In Act II you connected the agent to GitHub and Cloudflare; now the brief tells it what to build with that access. This brief and your AGENTS.md become the base for the prompts in the next chapter, the design proposal after that, and your yardstick for testing and shipping in Act IV.",
    },
    takeaways: [
      { fa: 'Agent ذهن شما را نمی‌خواند؛ هر چیزی که مهم است را بنویسید.', en: 'The agent can’t read your mind; write down everything that matters.' },
      { fa: 'قابلیت‌ها را Must / Should / Later کنید و با MVP شروع کنید.', en: 'Sort features into Must / Should / Later and start with an MVP.' },
      { fa: 'زبان فارسی و RTL را از روز اول در Brief بنویسید.', en: 'State Persian and RTL in the brief from day one.' },
      { fa: 'Brief را به یک AGENTS.md کوتاه در ریشه Repository تبدیل کنید تا Agent در هر جلسه آن را بخواند.', en: 'Turn the brief into a short AGENTS.md at the repo root so the agent reads it every session.' },
    ],
  },

  // ───────────────────────────────────────────── prompts-and-skills
  {
    slug: 'prompts-and-skills',
    act: 3,
    icon: 'chat',
    title: { fa: 'Prompt نویسی برای Agent و Agent Skills', en: 'Prompting agents, and Agent Skills' },
    tagline: {
      fa: 'یاد بگیرید طوری حرف بزنید که Agent دقیقاً همان کار را انجام دهد',
      en: 'Learn to talk so the agent does exactly the right job',
    },
    minutes: 16,
    mission: {
      outcome: { fa: "می‌توانید Promptی بنویسید که Agent دقیقاً همان کار درست را انجام دهد، و Skill مناسب را با خیال راحت نصب کنید.", en: "You can write prompts that get exactly the right job done, and install the right skills safely." },
      cafe: { fa: "اولین Prompt خوب نوشته می‌شود: صفحه منوی کافه.", en: "The first good prompt gets written: the café's menu page." },
    },
    warmup: {
      q: { fa: "از فصل قبل: Codex قبل از شروع کار کدام فایل را می‌خواند؟", en: "From the last chapter: which file does Codex read before it starts?" },
      options: [
        { fa: "فایل README.md در ریشه پروژه", en: "README.md at the project root" },
        { fa: "فایل CLAUDE.md داخل پوشه .claude پروژه", en: "CLAUDE.md in the project's .claude folder" },
        { fa: "فایل AGENTS.md در ریشه Repository", en: "AGENTS.md at the repository root" },
      ],
      answer: 2,
      explain: { fa: "AGENTS.md را کوتاه نگه دارید؛ در هر جلسه خوانده می‌شود.", en: "Keep AGENTS.md short; it's read in every session." },
      why: [
        { fa: "README برای انسان‌هاست؛ Agent دستورالعمل اختصاصی خودش را می‌خواهد.", en: "README is for humans; the agent wants its own instruction file." },
        { fa: "CLAUDE.md مخصوص Claude Code است، نه Codex.", en: "CLAUDE.md belongs to Claude Code, not to Codex." },
        { fa: "درست. AGENTS.md قالب باز است و Codex اول آن را می‌خواند.", en: "Right. AGENTS.md is the open format Codex reads first." },
      ],
    },
    mascotLine: {
      fa: 'من عاشق دستورهای روشنم! بگویید چه، چرا و کِی تمام است، تا من هم بدانم کجا بایستم.',
      en: 'I love clear instructions! Tell me what, why and when it’s done, so I know where to stop.',
    },
    sections: [
      {
        id: 'agent-prompts-are-different',
        title: { fa: 'Prompt برای Agent با Prompt برای چت فرق دارد', en: 'Prompting an agent is not like prompting a chat' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "در چت معمولی، شما یک سؤال می‌پرسید و یک جواب متنی می‌گیرید. اگر جواب بد باشد، فقط چند ثانیه از دست رفته. ولی Agent **کار انجام می‌دهد**: فایل می‌سازد، کد تغییر می‌دهد، دستور اجرا می‌کند و حتی Push می‌کند. یک Prompt مبهم در اینجا می‌تواند ده‌ها فایل را عوض کند.",
              en: "In a normal chat, you ask a question and get a text answer. If the answer is bad, you lost a few seconds. An agent, however, **does work**: it creates files, changes code, runs commands and may even push. A vague prompt here can change dozens of files.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "پس Prompt برای Agent بیشتر شبیه **سفارش کار به یک همکار** است تا پرسیدن یک سؤال: زمینه، هدف، محدودیت و تعریف «تمام شد» لازم دارد.",
              en: "So prompting an agent is more like **handing a task to a colleague** than asking a question: it needs context, a goal, limits and a definition of “done.”",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'Prompt Engineering جادو نیست', en: 'Prompt engineering is not magic words' },
            text: {
              fa: "خیلی‌ها فکر می‌کنند کلمات جادویی یا عبارت‌های عجیب لازم است. واقعیت ساده‌تر است: Prompt خوب همان چیزی است که برای یک همکار انسانی تازه‌وارد هم می‌نوشتید. شفاف، کامل و قابل‌سنجش.",
              en: "Many people think you need magic phrases or strange tricks. Reality is simpler: a good prompt is what you would write for a new human colleague. Clear, complete and checkable.",
            },
          },
        ],
      },
      {
        id: 'prompt-ingredients',
        title: { fa: 'شش جزء یک Prompt خوب', en: 'Six ingredients of a good prompt' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'زمینه (Context)', en: 'Context' },
                text: {
                  fa: "کجای پروژه هستیم؟ چه فایل یا صفحه‌ای درگیر است؟ قبلاً چه کردیم؟ اگر AGENTS.md دارید، لازم نیست همه چیز را تکرار کنید؛ فقط زمینه همین کار را بگویید.",
                  en: "Where are we in the project? Which file or page is involved? What did we do before? If you have an AGENTS.md, you don't need to repeat everything; just give the context for this task.",
                },
              },
              {
                title: { fa: 'هدف (Goal)', en: 'Goal' },
                text: {
                  fa: "دقیقاً چه چیزی باید عوض شود و **چرا**. دانستن «چرا» به Agent کمک می‌کند در جزئیات تصمیم درست بگیرد.",
                  en: "Exactly what should change and **why**. Knowing the why helps the agent make good decisions on details.",
                },
              },
              {
                title: { fa: 'محدودیت‌ها (Constraints)', en: 'Constraints' },
                text: {
                  fa: "به چه چیزهایی نباید دست بزند؟ کتابخانه جدید مجاز است؟ ظاهر بقیه صفحه‌ها باید ثابت بماند؟",
                  en: "What must it not touch? Are new libraries allowed? Should the other pages stay exactly as they are?",
                },
              },
              {
                title: { fa: 'تعریف تمام‌شدن (Acceptance Criteria)', en: 'Definition of done (acceptance criteria)' },
                text: {
                  fa: "فهرست شرط‌هایی که اگر برقرار باشند، کار تمام است. مثلاً: «روی موبایل ۳۶۰ پیکسل به‌هم نریزد»، «تست‌ها پاس شوند»، «فرم خالی ارسال نشود».",
                  en: "A list of conditions that mean the job is finished. For example: “doesn't break at 360px mobile width,” “tests pass,” “the empty form can't be submitted.”",
                },
              },
              {
                title: { fa: 'مثال (Examples)', en: 'Examples' },
                text: {
                  fa: "یک نمونه متن، یک عکس از سایت مرجع، یا یک نمونه ورودی و خروجی. یک مثال اغلب از یک پاراگراف توضیح بهتر کار می‌کند.",
                  en: "A sample text, a screenshot of a reference site, or a sample input and output. One example often works better than a paragraph of explanation.",
                },
              },
              {
                title: { fa: 'روش کار (Process)', en: 'Process' },
                text: {
                  fa: "«اول برنامه‌ات را بگو و منتظر تأیید من بمان.» «اگر سؤالی داری، قبل از شروع بپرس.» این دو جمله جلوی خیلی از دردسرها را می‌گیرند.",
                  en: "“Tell me your plan first and wait for my approval.” “If you have questions, ask before you start.” These two sentences prevent a lot of trouble.",
                },
              },
            ],
          },
          { type: 'widget', id: 'prompt-lab' },
          {
            type: 'compare',
            headers: [
              { fa: '', en: '' },
              { fa: 'Prompt ضعیف', en: 'Weak prompt' },
              { fa: 'Prompt خوب', en: 'Good prompt' },
            ],
            rows: [
              [
                { fa: 'متن', en: 'Text' },
                { fa: '«صفحه تماس را درست کن.»', en: '“Fix the contact page.”' },
                {
                  fa: '«در صفحه تماس، فرم را طوری تغییر بده که ایمیل و پیام اجباری باشند و خطا به فارسی زیر همان فیلد نمایش داده شود. به بقیه صفحه‌ها دست نزن. اول برنامه‌ات را بگو.»',
                  en: '“On the contact page, make email and message required and show the error in Persian under the field. Don’t touch other pages. Tell me your plan first.”',
                },
              ],
              [
                { fa: 'نتیجه', en: 'Result' },
                { fa: 'Agent حدس می‌زند «درست» یعنی چه؛ شاید ظاهر را عوض کند، شاید چیز دیگری.', en: 'The agent guesses what “fix” means; it may restyle the page or change something else.' },
                { fa: 'تغییر کوچک، قابل‌بررسی و دقیقاً همان چیزی که می‌خواستید.', en: 'A small, reviewable change that is exactly what you wanted.' },
              ],
            ],
          },
          {
            type: 'list',
            items: [
              { fa: "**هر پیام، یک کار.** «منو را عوض کن، فونت را تغییر بده و صفحه وبلاگ هم اضافه کن» سه کار است؛ سه پیام بفرستید.", en: "**One task per message.** “Change the menu, switch the font and add a blog page” is three tasks; send three messages." },
              { fa: "**اجازه سؤال بدهید.** جمله «اگر چیزی مبهم است، قبل از شروع بپرس» خیلی از حدس‌های غلط را حذف می‌کند.", en: "**Invite questions.** “If anything is unclear, ask before starting” removes many wrong guesses." },
              { fa: "**برنامه قبل از اجرا.** برای کارهای بزرگ، اول Plan بخواهید، بخوانید، اصلاح کنید و بعد بگویید «اجرا کن».", en: "**Plan before execution.** For big tasks, ask for a plan, read it, adjust it, then say “go.”" },
              { fa: "**مثبت بنویسید.** به جای «شلوغ نکن» بگویید «حداکثر سه رنگ و فاصله‌گذاری زیاد».", en: "**Say what you want.** Instead of “don't make it cluttered,” say “at most three colors and generous spacing.”" },
            ],
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: "در Codex، «اول برنامه» را با خود Prompt می‌خواهید: «برنامه‌ات را بگو و منتظر تأیید من بمان». Skillها هم در پوشه `.agents/skills/` پروژه قرار می‌گیرند (یا `~/.agents/skills/` برای همه پروژه‌ها).",
                  en: "In Codex you ask for “plan first” in the prompt itself: “tell me your plan and wait for my approval.” Skills go in the project's `.agents/skills/` folder (or `~/.agents/skills/` for every project).",
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: "در Lovable، چت پروژه سه حالت دارد و انتخاب حالت درست، خودش نیمی از یک Prompt خوب است:",
                  en: "In Lovable, the project chat has three modes, and picking the right one is half of a good prompt:",
                },
              },
              {
                type: 'list',
                items: [
                  { fa: "**Chat**: گفتگو و پرسیدن، بدون هیچ تغییری در کد.", en: "**Chat**: discuss and ask, with no code changes." },
                  { fa: "**Plan**: Lovable بررسی می‌کند و یک برنامه قابل‌ویرایش می‌نویسد که شما تأییدش می‌کنید؛ در این حالت کد هرگز تغییر نمی‌کند. برنامه‌های تأییدشده در `.lovable/plan/` ذخیره می‌شوند و هر پیام ۱ اعتبار (Credit) مصرف می‌کند.", en: "**Plan**: Lovable investigates and writes an editable plan that you approve; in this mode code is never changed. Approved plans are stored in `.lovable/plan/`, and each message costs 1 credit." },
                  { fa: "**Build** (نام قبلی: Agent mode): تغییرات را از اول تا آخر پیاده و بررسی می‌کند.", en: "**Build** (formerly Agent mode): implements and verifies changes end to end." },
                ],
              },
              {
                type: 'p',
                text: {
                  fa: "طبق مستندات Lovable، کنار Instructions که همیشه حاضرند، **Skills** هم وجود دارند که فقط وقتی لازم است بارگذاری می‌شوند؛ همان ایده Progressive Disclosure. با زدن `/` در چت هم می‌توانید یک Skill را مستقیم صدا بزنید (بخش «یک ایده، سه خانه» پایین‌تر).",
                  en: "According to Lovable's docs, next to Instructions, which are always present, there are also **Skills**, which load only when needed: the same progressive-disclosure idea. You can also call a skill directly by typing `/` in the chat (see “One idea, three homes” below).",
                },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: 'قالب یک Prompt کامل برای یک قابلیت جدید', en: 'A full prompt template for a new feature' },
            text: {
              fa: "زمینه: در پروژه سایت کافه سحر (AGENTS.md را بخوان) صفحه منو آماده است.\nهدف: یک بخش «پیشنهاد امروز» بالای صفحه منو اضافه کن تا مشتری‌ها آیتم ویژه هر روز را ببینند.\nمحدودیت‌ها: کتابخانه جدید اضافه نکن. طراحی بقیه صفحه را عوض نکن. متن‌ها فارسی و RTL باشند.\nتعریف تمام‌شدن:\n- روی موبایل و دسکتاپ درست نمایش داده شود.\n- اگر پیشنهاد امروز تعریف نشده باشد، بخش اصلاً نمایش داده نشود.\n- تست‌های فعلی پاس شوند.\nروش: اول برنامه‌ات را در چند خط بگو و اگر سؤالی داری بپرس. تا تأیید من کد ننویس. بعد روی یک Branch جدید کار کن.",
              en: "Context: in the Café Sahar site project (read AGENTS.md) the menu page is done.\nGoal: add a “Today's special” section at the top of the menu page so customers see each day's featured item.\nConstraints: don't add new libraries. Don't change the rest of the page design. Texts in Persian and RTL.\nDefinition of done:\n- Displays correctly on mobile and desktop.\n- If no special is set for today, the section doesn't render at all.\n- Existing tests still pass.\nProcess: first tell me your plan in a few lines and ask any questions. Don't write code until I approve. Then work on a new branch.",
            },
          },
        ],
      },
      {
        id: 'agent-skills',
        title: { fa: 'Agent Skills: دانش قابل‌استفاده دوباره', en: 'Agent Skills: reusable know-how' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "فرض کنید هر بار که طراحی می‌خواهید، باید ده خط درباره فونت، فاصله‌گذاری، انیمیشن و دسترس‌پذیری بنویسید. خسته‌کننده است، نه؟ **Agent Skill** دقیقاً برای همین است: یک پوشه که دانش و روش کار یک موضوع را در خودش بسته‌بندی کرده و Agent هر وقت لازم شد، آن را باز می‌کند.",
              en: "Imagine having to write ten lines about fonts, spacing, animation and accessibility every time you ask for a design. Tiring, right? An **Agent Skill** exists exactly for this: a folder that packages the know-how for one topic, which the agent opens whenever it's relevant.",
            },
          },
          {
            type: 'list',
            items: [
              { fa: "هر Skill یک پوشه است که حداقل یک فایل **SKILL.md** دارد: بالای آن `name` و `description`، و پایینش دستورالعمل‌ها.", en: "Each skill is a folder with at least a **SKILL.md** file: `name` and `description` at the top, instructions below." },
              { fa: "می‌تواند پوشه‌های اختیاری هم داشته باشد: `scripts/` برای کد اجرایی، `references/` برای مستندات، `assets/` برای قالب‌ها.", en: "It can include optional folders: `scripts/` for executable code, `references/` for documentation, `assets/` for templates." },
              { fa: "Agent در شروع فقط نام و توضیح Skillها را می‌بیند. وقتی کار شما با توضیح یک Skill جور شد، متن کامل آن را می‌خواند. به این روش **Progressive Disclosure** می‌گویند و باعث می‌شود Skillهای زیاد ذهن Agent را شلوغ نکنند.", en: "At startup the agent only sees each skill's name and description. When your task matches a description, it reads the full instructions. This is called **progressive disclosure**, and it keeps many skills from cluttering the agent's context." },
              { fa: "Agent Skills یک **استاندارد باز** است (agentskills.io). طبق مستندات رسمی، Claude (هم Claude Code و هم اپ Claude)، Codex و Lovable همه همین شکل SKILL.md را می‌فهمند؛ پس یک Skill را یک بار می‌نویسید و هر جا خواستید استفاده می‌کنید.", en: "Agent Skills is an **open standard** (agentskills.io). Per their official docs, Claude (both Claude Code and the Claude app), Codex and Lovable all understand the same SKILL.md shape, so you write a skill once and use it anywhere." },
            ],
          },
          {
            type: 'code',
            lang: 'markdown',
            caption: { fa: 'ساختار یک SKILL.md ساده', en: 'The shape of a simple SKILL.md' },
            code: `---
name: persian-rtl-review
description: Reviews a web page for Persian and RTL quality. Use when the user asks to check Persian text, right-to-left layout, Persian fonts or digits.
---

1. Check that the html element has lang="fa" and dir="rtl".
2. Look for physical CSS (margin-left, padding-right) that should be logical (margin-inline-start).
3. Check that a Persian font such as Vazirmatn is loaded and used for body text.
4. Report each issue with the file, the line and a suggested fix.`,
          },
          {
            type: 'h',
            text: { fa: 'یک ایده، سه خانه: Skill در Claude، Codex و Lovable', en: 'One idea, three homes: skills in Claude, Codex and Lovable' },
          },
          {
            type: 'p',
            text: {
              fa: "هر سه ابزار دو جور «حافظه» برای دانش شما دارند. **قانون‌های همیشگی** که در هر پیام حاضرند: در Claude فایل `CLAUDE.md`، در Codex فایل `AGENTS.md` و در Lovable بخش **Instructions** (نام قبلی Knowledge). و **Skillها** که فقط وقتی کار با توضیحشان جور شد باز می‌شوند. قانون کوتاه و همیشگی را در اولی بگذارید؛ روش بلند و گاه‌به‌گاه را در Skill.",
              en: "All three tools have two kinds of “memory” for your know-how. **Always-on rules**, present in every message: `CLAUDE.md` in Claude, `AGENTS.md` in Codex, and **Instructions** (formerly Knowledge) in Lovable. And **skills**, which open only when a task matches their description. Put short, always-true rules in the first; put long, occasional procedures in a skill.",
            },
          },
          { type: 'widget', id: 'skill-homes' },
          {
            type: 'compare',
            headers: [
              { fa: '', en: '' },
              { fa: 'Claude', en: 'Claude' },
              { fa: 'Codex', en: 'Codex' },
              { fa: 'Lovable', en: 'Lovable' },
            ],
            rows: [
              [
                { fa: 'Skill کجا زندگی می‌کند', en: 'Where skills live' },
                { fa: 'Claude Code: `.claude/skills/` یا `~/.claude/skills/`. اپ Claude: ‏Customize ← Skills (بارگذاری ZIP).', en: 'Claude Code: `.claude/skills/` or `~/.claude/skills/`. Claude app: Customize → Skills (upload a ZIP).' },
                { fa: '`.agents/skills/` در Repository یا `~/.agents/skills/`.', en: '`.agents/skills/` in the repository, or `~/.agents/skills/`.' },
                { fa: 'Workspace settings ← Skills برای تیم؛ Account settings ← Personal skills برای خودتان.', en: 'Workspace settings → Skills for the team; Account settings → Personal skills for yourself.' },
              ],
              [
                { fa: 'صدا زدن دستی', en: 'Calling one yourself' },
                { fa: '`/name`', en: '`/name`' },
                { fa: '`$name` یا `/skills`', en: '`$name` or `/skills`' },
                { fa: '`/` در چت و انتخاب از فهرست', en: '`/` in the chat, then pick from the list' },
              ],
              [
                { fa: 'استفاده خودکار', en: 'Automatic use' },
                { fa: 'بله، وقتی کار با description جور باشد.', en: 'Yes, when the task matches the description.' },
                { fa: 'بله؛ قابل خاموش‌کردن برای هر Skill.', en: 'Yes; can be turned off per skill.' },
                { fa: 'بله؛ مدیر Workspace می‌تواند برای هر Skill خاموشش کند.', en: 'Yes; a workspace admin can turn it off per skill.' },
              ],
              [
                { fa: 'آوردن Skill آماده', en: 'Bringing in a ready skill' },
                { fa: 'کپی پوشه (Claude Code) یا ZIP (اپ).', en: 'Copy the folder (Claude Code) or a ZIP (app).' },
                { fa: 'کپی پوشه یا `$skill-installer`.', en: 'Copy the folder, or `$skill-installer`.' },
                { fa: 'Import from GitHub (Repository عمومی) یا Upload ZIP.', en: 'Import from GitHub (public repository) or Upload ZIP.' },
              ],
              [
                { fa: 'قانون‌های همیشگی', en: 'Always-on rules' },
                { fa: '`CLAUDE.md`', en: '`CLAUDE.md`' },
                { fa: '`AGENTS.md`', en: '`AGENTS.md`' },
                { fa: 'Instructions', en: 'Instructions' },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'Skill، MCP و Prompt سه چیز متفاوت‌اند', en: 'Skills, MCP and prompts are three different things' },
            text: {
              fa: "**Prompt** کار همین لحظه را می‌گوید. **Skill** یاد می‌دهد یک نوع کار را *چطور* انجام دهد (دستورالعمل، و گاهی اسکریپت). **MCP** و Connectorها به Agent *دسترسی* به یک ابزار یا سرویس بیرونی می‌دهند (مثلاً GitHub یا یک Database). یک Skill خوب می‌تواند بگوید «از فلان ابزار این‌طور استفاده کن»، ولی خودش آن دسترسی را نمی‌سازد.",
              en: "A **prompt** says what to do right now. A **skill** teaches *how* to do a kind of task (instructions, and sometimes scripts). **MCP** and connectors give the agent *access* to an outside tool or service (GitHub, a database). A good skill can say “use that tool like this”, but it doesn't create the access itself.",
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: "در Codex ساده‌ترین شروع: `$skill-creator` را صدا بزنید و بگویید «یک Skill برای بررسی فارسی و RTL صفحه‌های کافه سحر بساز». سؤال می‌پرسد، SKILL.md را در `.agents/skills/` می‌سازد و دفعه بعد با `$persian-rtl-review` صدایش می‌کنید.",
                  en: "The easiest start in Codex: call `$skill-creator` and say “make a skill that reviews Café Sahar's pages for Persian and RTL quality.” It asks questions, writes SKILL.md in `.agents/skills/`, and next time you call it with `$persian-rtl-review`.",
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: "در Lovable، بعد از کاری که دوست داشتید تکرار شود، از Workspace settings ← Skills ← Add گزینه **Build with Lovable** را بزنید؛ Lovable با `/skill-creator` سؤال می‌پرسد و Skill را برای همه پروژه‌های Workspace منتشر می‌کند. اگر Skill را قبلاً در Claude ساخته‌اید، خروجی `.skill` یا ZIP آن را با **Upload ZIP** بیاورید؛ همان شکل SKILL.md است.",
                  en: "In Lovable, after a task you'd like repeated, go to Workspace settings → Skills → Add and choose **Build with Lovable**; it asks questions with `/skill-creator` and publishes the skill to every project in the workspace. If you already built the skill in Claude, export it as `.skill` or ZIP and bring it in with **Upload ZIP**: it's the same SKILL.md shape.",
                },
              },
            ],
          },
          {
            type: 'h',
            text: { fa: 'نصب یک Skill', en: 'Installing a skill' },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'Skill را پیدا و **کامل بخوانید**', en: 'Find the skill and **read all of it**' },
                text: {
                  fa: "مجموعه Skillهای این دوره در GitHub است: `Ahouei-GetheredInOne-AIAgentSkills` (لینکش پایین همین فصل است). مثلاً برای طراحی: `frontend-design`، `premium-web-design` و `emil-design-eng`؛ برای تست: `webapp-testing`.",
                  en: "This course's skills collection is on GitHub: `Ahouei-GetheredInOne-AIAgentSkills` (linked at the end of this chapter). For design, for example: `frontend-design`, `premium-web-design` and `emil-design-eng`; for testing: `webapp-testing`.",
                },
              },
              {
                title: { fa: 'پوشه را در جای درست کپی کنید', en: 'Copy the folder to the right place' },
                text: {
                  fa: "برای Claude Code: داخل پروژه در `.claude/skills/` یا برای همه پروژه‌ها در `~/.claude/skills/`. برای Codex: داخل پروژه در `.agents/skills/` یا برای همه پروژه‌ها در `~/.agents/skills/`. برای Lovable: پوشه‌ای کپی نمی‌شود؛ در Workspace settings ← Skills ← Add گزینه Import from GitHub را بزنید و نشانی پوشه همان Skill در GitHub را بدهید. مسیرها و نام منوها ممکن است تغییر کنند؛ مستندات رسمی را چک کنید.",
                  en: "For Claude Code: inside the project in `.claude/skills/`, or for every project in `~/.claude/skills/`. For Codex: inside the project in `.agents/skills/`, or for every project in `~/.agents/skills/`. For Lovable: nothing to copy; in Workspace settings → Skills → Add, choose Import from GitHub and paste the address of that skill's folder on GitHub. Paths and menu names can change; check the official docs.",
                },
              },
              {
                title: { fa: 'جلسه تازه باز کنید و امتحان کنید', en: 'Start a fresh session and try it' },
                text: {
                  fa: "کاری بخواهید که با توضیح Skill جور باشد، یا مستقیم صدایش کنید: در Claude Code با `/skill-name`، در Codex با `$skill-name` و در Lovable با زدن `/` در چت؛ به جای `skill-name` نام همان Skill را بنویسید (مثلاً `/frontend-design`).",
                  en: "Ask for something that matches the skill's description, or call it directly: `/skill-name` in Claude Code, `$skill-name` in Codex, and `/` in the Lovable chat, replacing `skill-name` with the skill's own name (for example `/frontend-design`).",
                },
              },
            ],
          },
          {
            type: 'code',
            lang: 'bash',
            caption: { fa: 'کپی یک Skill به پروژه (Claude Code)', en: 'Copy one skill into a project (Claude Code)' },
            code: `git clone https://github.com/Ahouei/Ahouei-GetheredInOne-AIAgentSkills.git
mkdir -p .claude/skills
cp -R Ahouei-GetheredInOne-AIAgentSkills/skills/frontend-design .claude/skills/`,
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'فقط Skillهایی را نصب کنید که خوانده‌اید', en: 'Only install skills you have read' },
            text: {
              fa: "Skill یعنی **دستورالعمل + کد** که Agent شما با دسترسی‌های شما اجرا می‌کند. یک Skill مخرب می‌تواند به Agent بگوید فایل پاک کند یا رمزها را جایی بفرستد. قبل از نصب، SKILL.md و هر اسکریپت داخلش را بخوانید. همه Skillها را یکجا نصب نکنید؛ فقط آن‌هایی که لازم دارید.",
              en: "A skill is **instructions + code** that your agent runs with your permissions. A malicious skill could tell the agent to delete files or send secrets somewhere. Before installing, read SKILL.md and every script inside. Don't install everything at once; only what you need.",
            },
          },
        ],
      },
      {
        id: 'prompts-check',
        title: { fa: 'واژه‌ها و یک سؤال', en: 'Key terms and a quick check' },
        blocks: [
          {
            type: 'terms',
            items: [
              { term: 'Prompt', def: { fa: 'پیام یا دستوری که به مدل یا Agent می‌دهید.', en: 'The message or instruction you give a model or agent.' } },
              { term: 'Acceptance Criteria', def: { fa: 'شرط‌های قابل‌سنجشی که مشخص می‌کنند کار تمام شده است.', en: 'Checkable conditions that define when a task is done.' } },
              { term: 'Context', def: { fa: 'همه اطلاعاتی که Agent در لحظه کار در اختیار دارد: پیام‌ها، فایل‌ها و خروجی ابزارها.', en: 'Everything the agent has at hand while working: messages, files and tool output.' } },
              { term: 'Agent Skill', def: { fa: 'پوشه‌ای با فایل SKILL.md که دانش و روش یک کار را برای Agent بسته‌بندی می‌کند.', en: 'A folder with a SKILL.md that packages know-how for one kind of task.' } },
              { term: 'SKILL.md', def: { fa: 'فایل اصلی Skill: نام، توضیح و دستورالعمل‌ها.', en: 'The main skill file: name, description and instructions.' } },
              { term: 'CLAUDE.md', def: { fa: 'فایل قانون‌های همیشگی پروژه برای Claude Code؛ مثل AGENTS.md برای Codex و Instructions در Lovable.', en: "Claude Code's file of always-on project rules; like AGENTS.md for Codex and Instructions in Lovable." } },
              { term: 'Progressive Disclosure', def: { fa: 'بارگذاری تدریجی: اول فقط نام و توضیح، متن کامل فقط وقتی لازم است.', en: 'Loading in stages: names and descriptions first, full text only when needed.' } },
            ],
          },
          {
            type: 'quiz',
            q: { fa: "کدام Prompt برای یک Agent بهتر است؟", en: "Which prompt is better for an agent?" },
            options: [
              { fa: "«سایت را قشنگ‌تر و حرفه‌ای‌تر کن تا مشتری‌ها بیشتر خوششان بیاید.»", en: "“Make the site prettier and more professional so customers like it more.”" },
              { fa: "«تو بهترین طراح دنیا هستی؛ بهترین سایت ممکن را برای کافه بساز.»", en: "“You are the world's best designer; build the best possible café site.”" },
              { fa: "«دکمه‌های خانه را با رنگ برند (#E8603C) یکدست کن و اول برنامه‌ات را بگو.»", en: "“Give the home buttons the brand color (#E8603C); tell me your plan first.”" },
              { fa: "«همه صفحه‌های سایت را از نو طراحی کن و هر چیزی را که خودت لازم دانستی عوض کن.»", en: "“Redesign every page from scratch and change anything you personally think is needed.”" },
            ],
            answer: 2,
            explain: { fa: "Prompt خوب هدف دقیق، مقدار مشخص و روش کار دارد و نتیجه‌اش قابل‌بررسی است.", en: "A good prompt has a precise goal, a concrete value and a process, so its result can be checked." },
            why: [
              { fa: "«قشنگ‌تر» قابل‌سنجش نیست؛ Agent باید حدس بزند منظورتان چیست.", en: "“Prettier” can't be checked; the agent has to guess what you mean." },
              { fa: "تعیین نقش بدون هدف و محدودیت، نتیجه را دقیق‌تر نمی‌کند.", en: "A role with no goal or limits doesn't make the result more precise." },
              { fa: "درست. هدف دقیق، رنگ مشخص و «اول برنامه» یعنی تغییر کوچک و قابل‌بررسی.", en: "Right. A precise goal, a set color and “plan first” mean a small, checkable change." },
              { fa: "اجازه بی‌حد یعنی تغییرات بزرگ و غیرقابل‌پیش‌بینی در کل سایت.", en: "Unlimited licence means big, unpredictable changes across the whole site." },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Agent Skills specification (agentskills.io)', url: 'https://agentskills.io/specification' },
              { label: 'Claude Code: Extend Claude with skills', url: 'https://code.claude.com/docs/en/skills' },
              { label: 'OpenAI Codex: Build skills', url: 'https://developers.openai.com/codex/skills' },
              { label: 'Lovable: Define reusable instructions with skills', url: 'https://docs.lovable.dev/features/skills' },
              { label: 'Claude Help Center: Use skills in Claude', url: 'https://support.claude.com/en/articles/12512180' },
              { label: 'Lovable docs: Plan mode', url: 'https://docs.lovable.dev/features/plan-mode' },
              { label: 'Anthropic: Skill authoring best practices', url: 'https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices' },
              { label: 'Course skills collection on GitHub', url: 'https://github.com/Ahouei/Ahouei-GetheredInOne-AIAgentSkills' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "Brief فصل قبل به Agent می‌گوید «کل پروژه چیست»؛ Prompt خوب می‌گوید «همین الان چه کاری». Skillها هم دانش تکراری را از Promptهای شما بیرون می‌برند. در فصل بعد از همین مهارت‌ها برای گرفتن یک طرح اولیه استفاده می‌کنید، قبل از اینکه حتی یک خط کد نوشته شود.",
      en: "The brief from the last chapter tells the agent what the whole project is; a good prompt tells it what to do right now. Skills take repeated know-how out of your prompts. In the next chapter you use these skills to get a design proposal before a single line of code is written.",
    },
    takeaways: [
      { fa: 'Prompt برای Agent یعنی سفارش کار: زمینه، هدف، محدودیت، تعریف تمام‌شدن.', en: 'An agent prompt is a work order: context, goal, constraints, definition of done.' },
      { fa: 'هر پیام یک کار؛ برای کارهای بزرگ اول Plan بخواهید.', en: 'One task per message; for big tasks ask for a plan first.' },
      { fa: 'Skill یعنی پوشه‌ای با SKILL.md که Agent فقط وقتی لازم است بازش می‌کند.', en: 'A skill is a folder with a SKILL.md that the agent opens only when needed.' },
      { fa: 'هیچ Skillی را بدون خواندن کاملش نصب نکنید.', en: 'Never install a skill you haven’t fully read.' },
    ],
  },

  // ───────────────────────────────────────────── design-first
  {
    slug: 'design-first',
    act: 3,
    icon: 'palette',
    title: { fa: 'اول طراحی، بعد کد', en: 'Design first, then code' },
    tagline: {
      fa: 'طرح اولیه را ببینید، نقد کنید و تأیید کنید، قبل از اینکه کدی نوشته شود',
      en: 'See, critique and approve the design before any code is written',
    },
    minutes: 15,
    mission: {
      outcome: { fa: "می‌توانید قبل از اینکه کدی نوشته شود، یک طرح را بررسی، نقد و صریح تأیید کنید.", en: "You can review, critique and explicitly approve a design before any code exists." },
      cafe: { fa: "طراحی کافه سحر تأیید می‌شود: رنگ‌ها، هدر و Mobile-first.", en: "Café Sahar's design is approved: colors, header and mobile-first." },
    },
    warmup: {
      q: { fa: "از فصل قبل: Agent Skill دقیقاً چیست؟", en: "From the last chapter: what exactly is an Agent Skill?" },
      options: [
        { fa: "یک افزونه پولی که باید آن را خرید", en: "A paid add-on you have to buy first" },
        { fa: "پوشه‌ای با SKILL.md از دانش یک کار", en: "A folder with a SKILL.md of know-how" },
        { fa: "یک مدل زبانی تازه و قوی‌تر از قبلی", en: "A newer language model that codes better" },
      ],
      answer: 1,
      explain: { fa: "Skill یعنی دستورالعمل به‌علاوه کد؛ قبل از نصب، کاملش را بخوانید.", en: "A skill is instructions plus code; read all of it before installing." },
      why: [
        { fa: "Skill فقط یک پوشه است و بسیاری از آن‌ها رایگان و متن‌باز هستند.", en: "A skill is just a folder, and many are free and open." },
        { fa: "درست. Agent فقط وقتی لازم باشد متن کاملش را می‌خواند.", en: "Right. The agent reads it in full only when needed." },
        { fa: "Skill مدل را عوض نمی‌کند؛ فقط روش انجام یک کار را یاد می‌دهد.", en: "A skill doesn't change the model; it teaches a method." },
      ],
    },
    mascotLine: {
      fa: 'عوض کردن یک طرح روی کاغذ پنج دقیقه است؛ عوض کردنش بعد از کدنویسی یک روز. بیایید اول نقاشی کنیم!',
      en: 'Changing a design on paper takes five minutes; changing it after the code is written takes a day. Let’s sketch first!',
    },
    sections: [
      {
        id: 'why-design-first',
        title: { fa: 'چرا قبل از کد، طرح بخواهیم؟', en: 'Why ask for a design before code?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "اگر مستقیم بگویید «بساز»، Agent همزمان دو کار سخت را انجام می‌دهد: تصمیم‌گیری طراحی و پیاده‌سازی. وقتی نتیجه را می‌بینید و از ساختار صفحه خوشتان نمی‌آید، باید کلی کد دور ریخته شود. ولی اگر اول یک **پیشنهاد طراحی** بخواهید، روی چیزی بحث می‌کنید که عوض کردنش تقریباً مجانی است.",
              en: "If you just say “build it,” the agent makes two hard kinds of decisions at once: design and implementation. When you see the result and dislike the page structure, a lot of code gets thrown away. If you first ask for a **design proposal**, you're discussing something that is almost free to change.",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            text: {
              fa: "معماران قبل از ساختن خانه نقشه می‌کشند، نه اینکه دیوار بچینند و بعد بپرسند «خوب است؟». همین منطق برای وب‌سایت هم درست است. طرح اولیه همچنین قراردادی بین شما و Agent است: بعداً می‌توانید بگویید «طبق طرح تأییدشده جلو برو».",
              en: "Architects draw plans before building a house; they don't stack walls and then ask “is this OK?” The same logic applies to websites. The design is also a contract between you and the agent: later you can say “follow the approved design.”",
            },
          },
          {
            type: 'h',
            text: { fa: 'یک پیشنهاد طراحی خوب شامل چیست؟', en: 'What a good design proposal contains' },
          },
          {
            type: 'list',
            items: [
              { fa: "**Sitemap**: فهرست صفحه‌ها و اینکه کاربر از کجا به کجا می‌رود.", en: "**Sitemap**: the list of pages and how users move between them." },
              { fa: "**Wireframe**: اسکلت هر صفحه؛ چه چیزی بالا، چه چیزی پایین، بدون رنگ و جزئیات.", en: "**Wireframe**: the skeleton of each page; what goes on top and what below, without colors or details." },
              { fa: "**Mockup**: نسخه ظاهری‌تر با رنگ، فونت و تصویر. Agent می‌تواند آن را به شکل یک صفحه HTML ساده یا تصویر بسازد تا ببینید.", en: "**Mockup**: a more visual version with colors, fonts and images. The agent can build it as a simple HTML page or an image for you to look at." },
              { fa: "**Style direction**: فونت‌ها، پالت رنگ، حس کلی (مثلاً گرم و دنج)، و دلیل هر انتخاب.", en: "**Style direction**: fonts, color palette, overall mood (for example warm and cozy), and the reason for each choice." },
              { fa: "**Components**: اجزای تکرارشونده مثل دکمه، کارت، منوی بالا، فرم.", en: "**Components**: reusable parts such as buttons, cards, the top menu, forms." },
            ],
          },
          {
            type: 'prompt',
            title: { fa: 'درخواست طرح اولیه (هنوز کد نه)', en: 'Ask for a design proposal (no code yet)' },
            text: {
              fa: "AGENTS.md و Brief پروژه کافه سحر را بخوان. هنوز هیچ کد اصلی ننویس.\nیک پیشنهاد طراحی آماده کن شامل:\n۱. Sitemap همه صفحه‌ها.\n۲. Wireframe متنی برای صفحه خانه و صفحه منو (بالا به پایین، بخش به بخش).\n۳. Style direction: دو فونت (یکی فارسی)، پالت ۴ تا ۵ رنگ با کد، و حس کلی در سه کلمه، با دلیل هر انتخاب.\n۴. فهرست Componentهای مشترک.\n۵. یک Mockup ساده از صفحه خانه به شکل یک فایل HTML جدا در پوشه design/ تا در مرورگر ببینم.\nطراحی Mobile-first و RTL باشد. از گرادیان بنفش و چیدمان کلیشه‌ای سه کارت کنار هم دوری کن.\nبعد صبر کن تا نظر من را بشنوی.",
              en: "Read AGENTS.md and the Café Sahar project brief. Don't write any production code yet.\nPrepare a design proposal with:\n1. A sitemap of all pages.\n2. A text wireframe for the home page and the menu page (top to bottom, section by section).\n3. Style direction: two fonts (one Persian), a 4–5 color palette with hex codes, and the mood in three words, with a reason for each choice.\n4. A list of shared components.\n5. A simple mockup of the home page as a separate HTML file in a design/ folder so I can open it in a browser.\nDesign mobile-first and RTL. Avoid purple gradients and the cliché row of three identical cards.\nThen wait for my feedback.",
            },
          },
        ],
      },
      {
        id: 'review-the-design',
        title: { fa: 'چطور یک طرح را بررسی کنیم', en: 'How to review a design' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "لازم نیست طراح باشید تا طرح خوب را تشخیص دهید. کافی است با چشم مخاطب نگاه کنید و این چک‌لیست را یکی‌یکی جلو بروید:",
              en: "You don't need to be a designer to spot a good design. Look at it through your audience's eyes and go through this checklist one by one:",
            },
          },
          {
            type: 'list',
            ordered: true,
            items: [
              { fa: "**به هدف خدمت می‌کند؟** مهم‌ترین کار (مثلاً دیدن منو یا رزرو) در نگاه اول پیداست؟", en: "**Does it serve the goal?** Is the most important action (seeing the menu, booking) obvious at first glance?" },
              { fa: "**اول موبایل:** طرح را در عرض گوشی ببینید. بیشتر کاربران از موبایل می‌آیند.", en: "**Mobile first:** look at it at phone width. Most visitors come on mobile." },
              { fa: "**خوانایی:** اندازه متن کافی است؟ پاراگراف‌ها خیلی پهن نیستند؟ فاصله خطوط راحت است؟", en: "**Readability:** is the text big enough? Are paragraphs not too wide? Is the line spacing comfortable?" },
              { fa: "**کنتراست و دسترس‌پذیری:** متن روی پس‌زمینه به‌راحتی خوانده می‌شود؟ دکمه‌ها برای انگشت به اندازه کافی بزرگ‌اند؟", en: "**Contrast and accessibility:** is text easy to read against its background? Are buttons big enough for a finger?" },
              { fa: "**تایپوگرافی فارسی و RTL:** فونت فارسی واقعی استفاده شده؟ جهت آیکون‌ها (مثلاً فلش «بعدی») در RTL درست است؟ اعداد یکدست‌اند؟", en: "**Persian typography and RTL:** is a real Persian font used? Do directional icons (like a “next” arrow) point the right way in RTL? Are digits consistent?" },
              { fa: "**محتوای واقعی:** به جای Lorem ipsum متن و عکس واقعی شما گذاشته شده؟ طرحی که با متن الکی قشنگ است، با متن واقعی ممکن است به‌هم بریزد.", en: "**Real content:** are your real texts and photos used instead of lorem ipsum? A design that looks good with filler text can fall apart with real content." },
              { fa: "**سرعت:** تصویرهای غول‌پیکر، ویدیوی پس‌زمینه یا انیمیشن سنگین دارد؟ هر کدام هزینه سرعت دارند.", en: "**Speed:** does it rely on huge images, background video or heavy animation? Each one costs load time." },
              { fa: "**شخصیت:** شبیه هزار سایت دیگر است یا حس برند شما را دارد؟", en: "**Personality:** does it look like a thousand other sites, or does it feel like your brand?" },
            ],
          },
          { type: 'widget', id: 'design-flaws' },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'مراقب «ظاهر AI» باشید', en: 'Watch out for the “AI look”' },
            text: {
              fa: "طرح‌هایی که AI بدون راهنمایی می‌سازد اغلب شبیه هم‌اند: گرادیان بنفش به آبی، یک ردیف سه کارت مساوی با آیکون، دو دکمه کنار هم زیر یک تیتر وسط‌چین. اگر این را دیدید، از Agent بخواهید چیدمان و رنگ را بر اساس شخصیت برند شما دوباره فکر کند، یا یک Skill طراحی مثل `frontend-design` یا `premium-web-design` نصب کنید.",
              en: "Designs an AI makes without guidance often look alike: purple-to-blue gradients, a row of three equal icon cards, two side-by-side buttons under a centered headline. If you see this, ask the agent to rethink layout and color from your brand's personality, or install a design skill such as `frontend-design` or `premium-web-design`.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: '«قشنگ» کافی نیست', en: '“Pretty” is not enough' },
            text: {
              fa: "طراحی وب فقط زیبایی نیست؛ اول باید کار کند. طرحی که قشنگ است ولی کاربر دکمه رزرو را پیدا نمی‌کند، طرح بدی است. همیشه اول هدف را بسنجید، بعد سلیقه را.",
              en: "Web design isn't only beauty; first it has to work. A pretty design where people can't find the booking button is a bad design. Always judge the goal first, then taste.",
            },
          },
        ],
      },
      {
        id: 'feedback-and-approval',
        title: { fa: 'بازخورد دادن و تأیید کردن', en: 'Giving feedback and approving' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'دقیق باشید', en: 'Be specific' },
                text: {
                  fa: "به جای «خوشم نیامد» بگویید «تیتر صفحه خانه خیلی بزرگ است و منو را به پایین هل داده؛ منو باید بدون اسکرول دیده شود».",
                  en: "Instead of “I don't like it,” say “the home headline is too large and pushes the menu down; the menu should be visible without scrolling.”",
                },
              },
              {
                title: { fa: 'مرجع تصویری بدهید', en: 'Give visual references' },
                text: {
                  fa: "اسکرین‌شات یا لینک سایتی که حسش را دوست دارید، و بگویید دقیقاً **چه چیزش** را دوست دارید: رنگ؟ فاصله‌ها؟ فونت؟",
                  en: "Share a screenshot or link of a site whose feel you like, and say exactly **what** you like about it: the colors? the spacing? the font?",
                },
              },
              {
                title: { fa: 'هر دور، چند نکته محدود', en: 'A few points per round' },
                text: {
                  fa: "در هر دور بازخورد، سه چهار نکته مهم بگویید. بیست نکته یکجا باعث می‌شود بعضی‌ها فراموش شوند یا با هم تداخل کنند.",
                  en: "Give three or four important points per round. Twenty points at once means some get forgotten or conflict with each other.",
                },
              },
              {
                title: { fa: 'صریح تأیید کنید', en: 'Approve explicitly' },
                text: {
                  fa: "وقتی راضی شدید، به وضوح بگویید «تأیید شد» و چه چیزی باید ثابت بماند. Agent باید بداند از مرحله طراحی به مرحله ساخت رفته‌اید.",
                  en: "When you're happy, clearly say “approved” and what must stay fixed. The agent needs to know you've moved from design to building.",
                },
              },
            ],
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: "با Codex، Mockup را به شکل یک فایل HTML در پوشه `design/` بخواهید، در مرورگر بازش کنید و با اسکرین‌شات و توضیح دقیق بازخورد بدهید. تأیید هم در همان گفتگو انجام می‌شود، با جمله صریح «تأیید شد».",
                  en: "With Codex, ask for the mockup as an HTML file in a `design/` folder, open it in a browser, and give feedback with screenshots and precise notes. Approval happens in the same chat, with an explicit “approved.”",
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: "در Lovable طرح از همان اول یک پیش‌نمایش زنده است. با **Preview toolbar** می‌توانید یک جزء را انتخاب کنید و تغییرش را توضیح دهید، متن را همان‌جا ویرایش کنید، روی صفحه یادداشت بکشید یا نظر بگذارید. درخواست‌های «انتخاب جزء» اعتبار مصرف می‌کنند.",
                  en: "In Lovable the design is a live preview from the start. With the **preview toolbar** you can select an element and describe the change, edit text in place, draw annotations or leave comments. Select-element requests consume credits.",
                },
              },
              {
                type: 'callout',
                tone: 'tip',
                text: {
                  fa: "برای اینکه طراحی از ساخت جدا بماند، اول در **Plan mode** درباره ساختار و سبک کافه سحر حرف بزنید و برنامه را تأیید کنید؛ بعد به Build بروید.",
                  en: "To keep design separate from building, first discuss Café Sahar's structure and style in **Plan mode** and approve the plan; then switch to Build.",
                },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: 'تأیید با تغییرات', en: 'Approve with changes' },
            text: {
              fa: "طرح تأیید شد، با این تغییرات:\n- نگه دار: پالت رنگ، فونت Vazirmatn، ساختار صفحه منو.\n- تغییر بده: تیتر صفحه خانه کوچک‌تر شود تا دکمه «دیدن منو» بدون اسکرول روی موبایل دیده شود.\n- تغییر بده: عکس‌های گالری به جای سه ستون مساوی، یک عکس بزرگ و دو عکس کوچک کنارش باشند.\n\nحالا پیاده‌سازی را شروع کن: Style direction را در یک فایل یادداشت طراحی (مثلاً design/DESIGN.md) ثبت کن تا مرجع بماند، روی یک Branch جدید کار کن، و بعد از هر صفحه یک خلاصه کوتاه بده.",
              en: "Design approved, with these changes:\n- Keep: the color palette, the Vazirmatn font, the menu page structure.\n- Change: make the home headline smaller so the “See the menu” button is visible on mobile without scrolling.\n- Change: in the gallery, use one large photo with two small ones beside it instead of three equal columns.\n\nNow start implementing: record the style direction in a design notes file (for example design/DESIGN.md) so it stays as a reference, work on a new branch, and give me a short summary after each page.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            text: {
              fa: "طرح تأییدشده را در Repository نگه دارید (مثلاً در `design/`). وقتی چند هفته بعد قابلیت جدیدی می‌خواهید، به Agent بگویید «با طرح موجود در design/ هماهنگ باشد» تا ظاهر سایت یکدست بماند.",
              en: "Keep the approved design in the repository (for example in `design/`). Weeks later, when you want a new feature, tell the agent “match the design in design/” so the site stays consistent.",
            },
          },
        ],
      },
      {
        id: 'design-check',
        title: { fa: 'واژه‌ها و یک سؤال', en: 'Key terms and a quick check' },
        blocks: [
          {
            type: 'terms',
            items: [
              { term: 'Wireframe', def: { fa: 'اسکلت ساده صفحه بدون رنگ و جزئیات؛ فقط چیدمان.', en: 'A plain skeleton of a page, without colors or detail; layout only.' } },
              { term: 'Mockup', def: { fa: 'نمای ظاهری صفحه با رنگ، فونت و تصویر، قبل از پیاده‌سازی واقعی.', en: 'A visual view of the page with colors, fonts and images, before real implementation.' } },
              { term: 'Mobile-first', def: { fa: 'طراحی اول برای صفحه کوچک موبایل، بعد گسترش برای صفحه‌های بزرگ‌تر.', en: 'Designing for small phone screens first, then expanding for larger screens.' } },
              { term: 'Contrast', def: { fa: 'میزان تفاوت روشنایی متن و پس‌زمینه؛ برای خوانایی و دسترس‌پذیری مهم است.', en: 'The brightness difference between text and background; key for readability and accessibility.' } },
              { term: 'Accessibility (a11y)', def: { fa: 'قابل‌استفاده بودن سایت برای همه، از جمله افراد کم‌بینا یا کاربران صفحه‌کلید.', en: 'Making the site usable by everyone, including people with low vision or keyboard-only users.' } },
              { term: 'Component', def: { fa: 'یک جزء تکرارشونده رابط کاربری مثل دکمه، کارت یا فرم.', en: 'A reusable UI part such as a button, card or form.' } },
            ],
          },
          {
            type: 'quiz',
            q: { fa: "Agent یک Mockup زیبا با متن Lorem ipsum به شما نشان داده. بهترین قدم بعدی چیست؟", en: "The agent shows you a beautiful mockup filled with lorem ipsum. What is the best next step?" },
            options: [
              { fa: "فوراً تأیید کنیم، چون Mockup زیباست و وقت را هدر نمی‌دهیم.", en: "Approve right away, because it looks lovely and it saves time." },
              { fa: "بگوییم کل سایت را بسازد و متن‌های واقعی را بعداً جایگزین کنیم.", en: "Have it build the whole site and swap in the real text later." },
              { fa: "فقط رنگ‌ها را عوض کنیم، چون متن در مرحله طراحی مهم نیست.", en: "Only change the colors, since text doesn't matter at this stage." },
              { fa: "بخواهیم با متن و عکس واقعی و در عرض موبایل دوباره نشانش دهد.", en: "Ask to see it again with real text and photos at phone width." },
            ],
            answer: 3,
            explain: { fa: "متن واقعی (مخصوصاً فارسی) طول و شکل دیگری دارد و ممکن است طرح را به‌هم بریزد؛ موبایل هم جایی است که بیشتر مشتری‌ها هستند.", en: "Real text (especially Persian) has a different length and shape and can break the layout; and mobile is where most visitors are." },
            why: [
              { fa: "Lorem ipsum شکل واقعی متن فارسی را نشان نمی‌دهد؛ تأیید زودهنگام است.", en: "Lorem ipsum hides the real shape of Persian text; approving now is premature." },
              { fa: "متن واقعی بعداً ممکن است طرح را به‌هم بریزد و کد دور ریخته شود.", en: "Real text can break the layout later, and the code gets thrown away." },
              { fa: "طول و شکل متن روی چیدمان اثر دارد؛ رنگ تنها کافی نیست.", en: "Text length and shape shape the layout; colors alone aren't enough." },
              { fa: "درست. محتوای واقعی در عرض موبایل همان چیزی است که مشتری می‌بیند.", en: "Right. Real content at phone width is what customers will actually see." },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'web.dev: Learn Design', url: 'https://web.dev/learn/design' },
              { label: 'web.dev: Learn Accessibility', url: 'https://web.dev/learn/accessibility' },
              { label: 'W3C: Understanding contrast (WCAG 2.2)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html' },
              { label: 'MDN: CSS logical properties (for RTL)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values' },
              { label: 'Lovable docs: Preview toolbar', url: 'https://docs.lovable.dev/features/preview-toolbar' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "Brief گفت «چه»، Promptها گفتند «چطور حرف بزنیم»، و حالا طرح تأییدشده می‌گوید «دقیقاً چه شکلی». این طرح نقطه شروع حلقه Vibe Coding در فصل بعد است: Agent صفحه به صفحه می‌سازد و شما هر بار نتیجه را با همین طرح مقایسه می‌کنید.",
      en: "The brief said what, the prompts said how to talk, and now the approved design says exactly what it looks like. This design is the starting point of the vibe coding loop in the next chapter: the agent builds page by page, and you compare each result against it.",
    },
    takeaways: [
      { fa: 'اول Sitemap، Wireframe و Style direction بخواهید؛ کد بعداً.', en: 'Ask for a sitemap, wireframe and style direction first; code comes later.' },
      { fa: 'طرح را با چشم مخاطب، روی موبایل و با محتوای واقعی بررسی کنید.', en: 'Review the design through your audience’s eyes, on mobile, with real content.' },
      { fa: 'بازخورد دقیق و محدود بدهید و صریح بگویید «تأیید شد».', en: 'Give specific, limited feedback and clearly say “approved.”' },
      { fa: 'طرح تأییدشده را در Repository نگه دارید تا مرجع بماند.', en: 'Keep the approved design in the repository as a reference.' },
    ],
  },

  // ───────────────────────────────────────────── vibe-coding-loop
  {
    slug: 'vibe-coding-loop',
    act: 3,
    icon: 'loop',
    title: { fa: 'حلقه Vibe Coding', en: 'The vibe coding loop' },
    tagline: {
      fa: 'قدم‌های کوچک، بازبینی مداوم، ذخیره مکرر',
      en: 'Small steps, constant review, frequent saves',
    },
    minutes: 21,
    mission: {
      outcome: { fa: "می‌توانید در دورهای کوچک بسازید، ببینید، بازبینی کنید و آگاهانه ذخیره کنید.", en: "You can work in small laps: build, look, review and save on purpose." },
      cafe: { fa: "منو و رزرو میز کافه ساخته می‌شوند، Commit به Commit.", en: "The café's menu and table booking get built, commit by commit." },
    },
    warmup: {
      q: { fa: "از فصل قبل: چرا اول طرح را تأیید می‌کنیم؟", en: "From the last chapter: why approve a design first?" },
      options: [
        { fa: "چون Agent بدون طرح اصلاً کد نمی‌نویسد", en: "Because agents can't code without one" },
        { fa: "چون طرح همیشه از کد نهایی زیباتر است", en: "Because designs always look better than the final code" },
        { fa: "چون عوض کردن طرح ارزان‌تر از کد است", en: "Because changing a design costs less than code" },
      ],
      answer: 2,
      explain: { fa: "طرح تأییدشده قرارداد شما با Agent است: «طبق طرح جلو برو».", en: "The approved design is your contract with the agent: “follow the design.”" },
      why: [
        { fa: "Agent بدون طرح هم کد می‌نویسد، فقط با حدس‌های بیشتر.", en: "Agents code without one too, just with more guessing." },
        { fa: "زیبایی معیار نیست؛ هدف، اصلاح ارزان‌تر است.", en: "Looks aren't the point; cheaper fixes are." },
        { fa: "درست. بحث روی طرح تقریباً مجانی است؛ دور ریختن کد نه.", en: "Right. Debating a design is nearly free; scrapping code isn't." },
      ],
    },
    mascotLine: {
      fa: 'بیایید بچرخیم! شما می‌گویید، من می‌سازم، با هم نگاه می‌کنیم، ذخیره می‌کنیم، و دوباره از اول. هر دور یک قدم جلوتر.',
      en: 'Let’s go round! You ask, I build, we look together, we save, and again. Each lap is one step forward.',
    },
    sections: [
      {
        id: 'what-is-vibe-coding',
        title: { fa: 'Vibe Coding دقیقاً یعنی چه؟', en: 'What vibe coding really means' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "اصطلاح **Vibe Coding** را Andrej Karpathy (از بنیان‌گذاران OpenAI و مدیر سابق AI در Tesla) در فوریه ۲۰۲۵ رایج کرد: به جای نوشتن خط به خط کد، چیزی را که می‌خواهید به زبان طبیعی توصیف می‌کنید و AI کد را می‌نویسد. شما بیشتر با نتیجه سروکار دارید تا با جزئیات کد.",
              en: "The term **vibe coding** was popularized by Andrej Karpathy (an OpenAI co-founder and former head of AI at Tesla) in February 2025: instead of writing code line by line, you describe what you want in natural language and the AI writes the code. You deal more with the result than with the code's details.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'Vibe Coding یعنی «بی‌خیالی» نیست', en: 'Vibe coding doesn’t mean “not caring”' },
            text: {
              fa: "Karpathy این اصطلاح را برای پروژه‌های تفریحی و سریع به کار برد، جایی که حتی کد را نمی‌خوانی. برای یک سایت واقعی که مشتری دارد، نسخه مسئولانه‌اش را می‌خواهیم: هنوز کد را خط به خط نمی‌نویسید، ولی **هر تغییر را می‌بینید، تست می‌کنید و آگاهانه ذخیره می‌کنید**. شما کارگردانید، نه تماشاچی.",
              en: "Karpathy used the term for quick weekend projects where you don't even read the code. For a real site with real customers we want the responsible version: you still don't write the code line by line, but you **see every change, test it and save it deliberately**. You're the director, not a spectator.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "قلب این روش یک **حلقه کوچک** است که بارها و بارها تکرار می‌شود. هر دور حلقه باید کوتاه باشد: از چند دقیقه تا حداکثر یک ساعت.",
              en: "The heart of the method is a **small loop** repeated over and over. Each lap should be short: a few minutes to an hour at most.",
            },
          },
          { type: 'widget', id: 'vibe-loop' },
        ],
      },
      {
        id: 'the-loop',
        title: { fa: 'پنج قدم حلقه', en: 'The five steps of the loop' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { fa: '۱. بخواه (Ask)', en: '1. Ask' },
                text: {
                  fa: "یک کار کوچک و مشخص با Prompt خوب: زمینه، هدف، محدودیت و تعریف تمام‌شدن. برای کار بزرگ‌تر، اول Plan بخواهید.",
                  en: "One small, clear task with a good prompt: context, goal, constraints and definition of done. For bigger work, ask for a plan first.",
                },
              },
              {
                title: { fa: '۲. Agent می‌سازد (Build)', en: '2. Agent builds' },
                text: {
                  fa: "Agent فایل‌ها را تغییر می‌دهد، دستورها را اجرا می‌کند و در حالت ایده‌آل تست‌ها را هم اجرا می‌کند. در این مرحله وسط کارش نپرید، مگر ببینید مسیرش کاملاً اشتباه است.",
                  en: "The agent edits files, runs commands and, ideally, runs the tests. Don't jump in mid-task unless you can see it's heading completely the wrong way.",
                },
              },
              {
                title: { fa: '۳. ببین (Preview)', en: '3. Preview' },
                text: {
                  fa: "نتیجه را واقعاً ببینید: در مرورگر محلی، یا در Preview URL که Cloudflare برای هر Branch می‌سازد. روی موبایل هم نگاه کنید. «Agent گفت انجام شد» با «من دیدم کار می‌کند» فرق دارد.",
                  en: "Actually look at the result: in a local browser, or at the preview URL Cloudflare builds for each branch. Check on mobile too. “The agent said it's done” is not the same as “I saw it working.”",
                },
              },
              {
                title: { fa: '۴. بازبینی و بازخورد (Review)', en: '4. Review & feedback' },
                text: {
                  fa: "خلاصه تغییرات (Diff) را بخوانید: کدام فایل‌ها عوض شدند؟ چیزی خارج از درخواست شما تغییر کرده؟ اگر مشکل هست، بازخورد دقیق بدهید و به قدم ۲ برگردید.",
                  en: "Read the change summary (the diff): which files changed? Did anything outside your request change? If something's wrong, give precise feedback and go back to step 2.",
                },
              },
              {
                title: { fa: '۵. ذخیره کن (Commit / Merge)', en: '5. Commit / merge' },
                text: {
                  fa: "وقتی راضی شدید، Commit کنید و Pull Request را Merge کنید. حالا این نسخه یک نقطه امن است که همیشه می‌توانید به آن برگردید. بعد، دور بعدی حلقه.",
                  en: "When you're happy, commit and merge the pull request. Now this version is a safe point you can always return to. Then, the next lap.",
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'چرا قدم‌های کوچک؟', en: 'Why small steps?' },
            text: {
              fa: "تغییر کوچک یعنی بررسی آسان، پیدا کردن سریع خطا و برگشت ارزان. اگر Agent در یک دور ده قابلیت بسازد و یکی خراب باشد، پیدا کردنش مثل گشتن دنبال سوزن در انبار کاه است. اگر در هر دور یک قابلیت باشد، دقیقاً می‌دانید چه چیزی خرابش کرد.",
              en: "A small change means easy review, quick bug-finding and cheap rollback. If the agent builds ten features in one lap and one is broken, finding it is like searching for a needle in a haystack. With one feature per lap, you know exactly what broke it.",
            },
          },
          {
            type: 'h',
            text: { fa: 'Branch و Pull Request برای هر قابلیت', en: 'A branch and a pull request per feature' },
          },
          {
            type: 'p',
            text: {
              fa: "یادتان هست Git در پرده اول؟ اینجا به کار می‌آید. برای هر قابلیت از Agent بخواهید یک **Branch** جدید بسازد و در پایان یک **Pull Request** باز کند. نسخه اصلی (`main`) همیشه سالم می‌ماند، و Cloudflare می‌تواند برای Branch یک نسخه پیش‌نمایش جدا بسازد تا قبل از انتشار ببینیدش.",
              en: "Remember Git from Act I? Here it pays off. For each feature, have the agent create a new **branch** and open a **pull request** at the end. The main version (`main`) always stays healthy, and Cloudflare can build a separate preview for the branch so you can see it before it goes live.",
            },
          },
          {
            type: 'code',
            lang: 'text',
            caption: { fa: 'یک دور کامل حلقه، روی تاریخچه Git', en: 'One full lap of the loop, as Git history' },
            code: `main ──●────────────────────●──  (live site)
         \\                  /
          feature/todays-special
           ●── build ──● fix ──●   → pull request → review → merge`,
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: "در مسیر Codex، ذخیره یعنی Commit، و هر قابلیت روی یک Branch با یک Pull Request جلو می‌رود. نقطه امن شما آخرین Merge روی `main` است.",
                  en: "On the Codex path, saving means a commit, and each feature moves forward on its own branch with a pull request. Your safe point is the last merge into `main`.",
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: "در Lovable هر تغییر خودکار در **Version history** ذخیره می‌شود. نسخه‌های سالم را **Bookmark** کنید و هر وقت لازم شد از چت یا تاریخچه به آن‌ها برگردید. با **GitHub sync** دوطرفه، تغییرات Lovable به GitHub می‌رود و Push روی Branch فعال هم به Lovable برمی‌گردد؛ پس هر دو مسیر در GitHub به هم می‌رسند.",
                  en: "In Lovable every change is saved automatically to **version history**. **Bookmark** known-good versions and revert to them from the chat or the history whenever needed. With two-way **GitHub sync**, Lovable's changes go to GitHub and pushes to the active branch come back into Lovable, so both paths meet in GitHub.",
                },
              },
              {
                type: 'callout',
                tone: 'warn',
                text: {
                  fa: "Git sync در Lovable در هر لحظه فقط با یک Branch کار می‌کند، و پاک کردن Repository همگام‌سازی را قطع می‌کند.",
                  en: "Lovable's Git sync works with one branch at a time, and deleting the repository stops the sync.",
                },
              },
            ],
          },
        ],
      },
      {
        id: 'stay-on-track',
        title: { fa: 'Agent را در مسیر نگه دارید', en: 'Keep the agent on track' },
        blocks: [
          {
            type: 'list',
            items: [
              {
                fa: "**مراقب مارپیچ «همه چیز را از نو بنویس» باشید.** اگر Agent برای یک باگ کوچک می‌خواهد کل صفحه یا ساختار پروژه را بازنویسی کند، متوقفش کنید. بگویید «فقط همین مشکل را با کمترین تغییر ممکن حل کن».",
                en: "**Beware the “rewrite everything” spiral.** If the agent wants to rewrite a whole page or the project structure for a small bug, stop it. Say “fix only this problem with the smallest possible change.”",
              },
              {
                fa: "**اگر دو سه بار پشت سر هم یک مشکل حل نشد،** دست نگه دارید. از Agent بخواهید علت را توضیح دهد، نه اینکه دوباره حدس بزند. یا به آخرین نسخه سالم برگردید و مسئله را کوچک‌تر بپرسید.",
                en: "**If the same problem fails two or three times in a row,** pause. Ask the agent to explain the cause instead of guessing again. Or go back to the last good version and ask a smaller question.",
              },
              {
                fa: "**جلسه تازه، ذهن تازه.** هر گفتگو یک Context Window محدود دارد. وقتی گفتگو خیلی طولانی شده، Agent ممکن است چیزهای اول را فراموش کند یا گیج شود. برای هر قابلیت جدید یک جلسه تازه باز کنید؛ AGENTS.md و تاریخچه Git همه چیز لازم را به او می‌دهند.",
                en: "**Fresh session, fresh mind.** Every conversation has a limited context window. When it gets very long, the agent may forget early details or get confused. Start a new session for each new feature; AGENTS.md and the Git history give it what it needs.",
              },
              {
                fa: "**زیاد ذخیره کنید.** هر وقت چیزی کار کرد، Commit. Commit مجانی است؛ از دست دادن یک روز کار، نه.",
                en: "**Save often.** Whenever something works, commit. Commits are free; losing a day of work isn't.",
              },
              {
                fa: "**بخواهید توضیح بدهد.** در پایان هر دور بپرسید «به زبان ساده بگو چه چیزی را عوض کردی و چرا». هم اشتباه‌ها زودتر پیدا می‌شوند، هم شما قدم به قدم یاد می‌گیرید.",
                en: "**Ask it to explain.** At the end of each lap ask “in plain language, what did you change and why?” Mistakes surface sooner, and you learn step by step.",
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'حواستان به دسترسی‌ها باشد', en: 'Mind the permissions' },
            text: {
              fa: "Agent با دسترسی‌هایی که شما داده‌اید کار می‌کند. هر وقت خواست کاری خارج از حلقه عادی انجام دهد، مثلاً حذف Database، تغییر DNS یا Push مستقیم روی `main`، قبل از تأیید دلیلش را بپرسید.",
              en: "The agent works with the permissions you gave it. Whenever it wants to do something outside the normal loop, such as deleting a database, changing DNS or pushing straight to `main`, ask why before you approve.",
            },
          },
          {
            type: 'prompt',
            title: { fa: 'پایان یک دور: توضیح و ذخیره', en: 'End of a lap: explain and save' },
            text: {
              fa: "قبل از اینکه جلوتر برویم:\n۱. به زبان ساده و در چند خط توضیح بده چه فایل‌هایی را عوض کردی و چرا.\n۲. اگر چیزی خارج از درخواست من تغییر کرده، صریح بگو.\n۳. تست‌ها را اجرا کن و نتیجه را بگو.\n۴. اگر همه چیز سالم است، تغییرات را با یک پیام Commit روشن روی همین Branch ذخیره کن و یک Pull Request باز کن. Merge نکن؛ خودم بعد از دیدن Preview این کار را می‌کنم.",
              en: "Before we move on:\n1. In plain language and a few lines, explain which files you changed and why.\n2. If anything outside my request changed, say so explicitly.\n3. Run the tests and tell me the result.\n4. If all is well, commit the changes on this branch with a clear commit message and open a pull request. Don't merge; I'll do that after checking the preview.",
            },
          },
          {
            type: 'prompt',
            title: { fa: 'ترمز اضطراری: وقتی Agent گیر کرده', en: 'Emergency brake: when the agent is stuck' },
            text: {
              fa: "صبر کن، دیگر کد را تغییر نده. این مشکل سه بار حل نشده.\nاول توضیح بده فکر می‌کنی علت اصلی چیست و چه شواهدی داری. بعد دو راه‌حل با کمترین تغییر ممکن پیشنهاد بده. منتظر انتخاب من بمان.",
              en: "Stop, don't change any more code. This problem has failed three times.\nFirst explain what you think the root cause is and what evidence you have. Then propose two fixes with the smallest possible change. Wait for me to choose.",
            },
          },
        ],
      },
      {
        id: 'loop-check',
        title: { fa: 'واژه‌ها و یک سؤال', en: 'Key terms and a quick check' },
        blocks: [
          {
            type: 'terms',
            items: [
              { term: 'Vibe Coding', def: { fa: 'ساختن نرم‌افزار با توصیف خواسته به زبان طبیعی و سپردن نوشتن کد به AI.', en: 'Building software by describing what you want in natural language and letting AI write the code.' } },
              { term: 'Iteration', def: { fa: 'یک دور کامل از حلقه: خواستن، ساختن، دیدن، بازبینی، ذخیره.', en: 'One full lap of the loop: ask, build, preview, review, save.' } },
              { term: 'Diff', def: { fa: 'فهرست دقیق تفاوت‌های کد قبل و بعد از تغییر.', en: 'The exact list of differences in the code before and after a change.' } },
              { term: 'Pull Request (PR)', def: { fa: 'درخواست ادغام تغییرات یک Branch در main، همراه با امکان بررسی.', en: 'A request to merge a branch’s changes into main, with room for review.' } },
              { term: 'Context Window', def: { fa: 'مقدار متنی که مدل در یک لحظه می‌تواند در نظر بگیرد؛ گفتگوهای خیلی طولانی از آن بیرون می‌زنند.', en: 'How much text the model can consider at once; very long conversations overflow it.' } },
              { term: 'Preview Deployment', def: { fa: 'نسخه آزمایشی سایت روی یک آدرس جدا، برای دیدن تغییرات قبل از انتشار.', en: 'A test version of the site at a separate URL, to see changes before they go live.' } },
            ],
          },
          {
            type: 'quiz',
            q: { fa: "Agent برای حل یک باگ کوچک در فرم تماس پیشنهاد می‌دهد کل پروژه را با یک Framework جدید بازنویسی کند. شما چه می‌کنید؟", en: "To fix a small bug in the contact form, the agent proposes rewriting the whole project in a new framework. What do you do?" },
            options: [
              { fa: "قبول کنیم، چون Agent حتماً بهتر از ما می‌داند چه چیزی لازم است.", en: "Accept, since the agent surely knows better than us what's needed." },
              { fa: "متوقفش کنیم و بخواهیم فقط همان باگ را با کمترین تغییر حل کند.", en: "Stop it and ask it to fix only that bug with the smallest change." },
              { fa: "کل Repository را پاک کنیم و پروژه را از صفر دوباره شروع کنیم.", en: "Delete the whole repository and restart the project from zero." },
              { fa: "بازنویسی را قبول کنیم ولی بخواهیم این بار سریع‌تر تمامش کند.", en: "Accept the rewrite, but ask it to finish faster this time." },
            ],
            answer: 1,
            explain: { fa: "این همان مارپیچ «همه چیز را از نو بنویس» است. تغییر کوچک و هدفمند ریسک کمتری دارد و قابل بررسی است.", en: "That’s the “rewrite everything” spiral. A small, targeted change is less risky and easy to review." },
            why: [
              { fa: "این همان مارپیچ «همه چیز را از نو بنویس» است؛ ریسک بزرگ برای باگ کوچک.", en: "That's the “rewrite everything” spiral: a huge risk for a small bug." },
              { fa: "درست. تغییر کوچک و هدفمند قابل بررسی است و مشکل تازه نمی‌سازد.", en: "Right. A small, targeted change is reviewable and creates no new problems." },
              { fa: "پاک کردن Repository یعنی از دست دادن همه نقطه‌های امن و تاریخچه.", en: "Deleting the repository throws away every safe point and all history." },
              { fa: "سرعت مشکل نیست؛ اندازه تغییر است که ریسک می‌سازد.", en: "Speed isn't the problem; the size of the change is the risk." },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Andrej Karpathy: the original “vibe coding” post (Feb 2025)', url: 'https://x.com/karpathy/status/1886192184808149383' },
              { label: 'Claude Code: Common workflows', url: 'https://code.claude.com/docs/en/common-workflows' },
              { label: 'OpenAI Codex documentation', url: 'https://developers.openai.com/codex' },
              { label: 'Lovable docs: GitHub integration', url: 'https://docs.lovable.dev/integrations/github' },
              { label: 'GitHub Docs: About pull requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests' },
            ],
          },
        ],
      },
      {
        id: 'act-3-review',
        title: { fa: 'مرور پرده سوم', en: 'Act III review' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "پنج سؤال از چهار فصل پرده سوم، قاطی با هم. جواب دادن (حتی اشتباه) بهتر از دوباره خواندن به یادتان می‌ماند.",
              en: "Five questions from the four chapters of Act III, mixed together. Answering (even wrongly) sticks better than re-reading.",
            },
          },
          {
            type: 'review',
            title: { fa: 'مرور پرده سوم: بساز', en: 'Act III review: Build' },
            items: [
              {
                q: { fa: "در Brief کافه سحر، «فرم رزرو باید ایمیل تأیید بفرستد» کدام بخش است؟", en: "In Café Sahar’s brief, “the booking form must send a confirmation email” is which part?" },
                options: [
                  { fa: "مخاطب (Audience) پروژه", en: "The project's audience" },
                  { fa: "حس و ظاهر (Look & Feel)", en: "The look and feel" },
                  { fa: "محدودیت بودجه پروژه", en: "The project's budget limit" },
                  { fa: "معیار موفقیت پروژه", en: "A success criterion" },
                ],
                answer: 3,
                explain: { fa: "معیار موفقیت را از قبل بنویسید تا بعداً بتوانید قضاوت کنید کار تمام شده یا نه.", en: "Write success criteria in advance so you can judge later whether the work is done." },
                why: [
                  { fa: "مخاطب می‌گوید چه کسی استفاده می‌کند، نه چه چیزی باید کار کند.", en: "Audience says who uses it, not what must work." },
                  { fa: "حس و ظاهر درباره رنگ و فضاست، نه رفتار فرم.", en: "Look and feel is about mood and color, not form behavior." },
                  { fa: "بودجه درباره هزینه است؛ این جمله یک رفتار قابل‌سنجش است.", en: "Budget is about cost; this is a checkable behavior." },
                  { fa: "درست. شرطی قابل‌سنجش که می‌گوید کار تمام شده یا نه.", en: "Right. A checkable condition that says whether it's done." },
                ],
              },
              {
                q: { fa: "برای یک قابلیت بزرگ مثل رزرو میز، بهترین شروع کدام است؟", en: "For a big feature like table booking, what is the best start?" },
                options: [
                  { fa: "اول Plan بخواهیم و بعد از تأیید بسازد", en: "Ask for a plan, then build after approval" },
                  { fa: "همه جزئیات را در یک پیام بلند بنویسیم", en: "Write every detail into one long message" },
                  { fa: "به Agent بگوییم هر طور خواست بسازد", en: "Tell the agent to build it however it likes" },
                  { fa: "صبر کنیم تا Agent خودش پیشنهاد دهد", en: "Wait for the agent to suggest it on its own" },
                ],
                answer: 0,
                explain: { fa: "در Codex با جمله «اول برنامه‌ات را بگو» و در Lovable با Plan mode.", en: "In Codex say “plan first”; in Lovable use Plan mode." },
                why: [
                  { fa: "درست. Plan را می‌خوانید، اصلاح می‌کنید و بعد «اجرا کن».", en: "Right. You read the plan, adjust it, then say “go.”" },
                  { fa: "پیام بلند جای Plan را نمی‌گیرد؛ هنوز حدس زیادی باقی است.", en: "A long message isn't a plan; lots of guessing remains." },
                  { fa: "بدون محدودیت، نتیجه نه قابل پیش‌بینی است و نه قابل بررسی.", en: "Without limits the result is neither predictable nor reviewable." },
                  { fa: "Agent کار را با درخواست شما شروع می‌کند، نه خودبه‌خود.", en: "The agent starts from your request, not on its own." },
                ],
              },
              {
                q: { fa: "قبل از نصب یک Skill از اینترنت، چه کاری لازم است؟", en: "Before installing a skill from the internet, what is needed?" },
                options: [
                  { fa: "فقط نام و ستاره‌های Repository را ببینیم", en: "Just check its name and the repo's stars" },
                  { fa: "همه Skillهای مجموعه را یکجا نصب کنیم", en: "Install every skill in the collection at once" },
                  { fa: "SKILL.md و همه اسکریپت‌هایش را بخوانیم", en: "Read its SKILL.md and every script inside" },
                  { fa: "از Agent بخواهیم بدون بررسی اجرایش کند", en: "Have the agent run it without any review" },
                ],
                answer: 2,
                explain: { fa: "Skill یعنی دستورالعمل به‌علاوه کد؛ فقط چیزی را نصب کنید که خوانده‌اید.", en: "A skill is instructions plus code; install only what you have read." },
                why: [
                  { fa: "ستاره امنیت را تضمین نمی‌کند؛ محتوای Skill مهم است.", en: "Stars don't guarantee safety; the content does." },
                  { fa: "Skill اضافه یعنی ریسک و شلوغی بی‌دلیل.", en: "Extra skills mean needless risk and clutter." },
                  { fa: "درست. Skill با دسترسی‌های شما اجرا می‌شود.", en: "Right. A skill runs with your permissions." },
                  { fa: "اجرای بدون بررسی ممکن است فایل پاک کند یا رمز بفرستد.", en: "Running it unreviewed could delete files or leak secrets." },
                ],
              },
              {
                q: { fa: "Agent برای کافه سحر گرادیان بنفش و سه کارت مساوی پیشنهاد داده. چه کنیم؟", en: "For Café Sahar the agent proposes a purple gradient and three equal cards. What now?" },
                options: [
                  { fa: "تأیید کنیم چون این ظاهر حرفه‌ای است", en: "Approve it, since that look is professional" },
                  { fa: "بخواهیم از شخصیت کافه دوباره فکر کند", en: "Ask it to rethink from the café's personality" },
                  { fa: "فقط رنگ گرادیان را کمی تیره‌تر کنیم", en: "Just make the gradient a little darker" },
                  { fa: "طراحی را کنار بگذاریم و مستقیم کد بنویسیم", en: "Skip the design entirely and start writing code" },
                ],
                answer: 1,
                explain: { fa: "یک Skill طراحی مثل `frontend-design` هم در این مرحله کمک می‌کند.", en: "A design skill such as `frontend-design` helps at this stage too." },
                why: [
                  { fa: "این همان «ظاهر AI» است و شبیه هزار سایت دیگر.", en: "That's the “AI look,” like a thousand other sites." },
                  { fa: "درست. چیدمان و رنگ باید از برند شما بیایند.", en: "Right. Layout and color should come from your brand." },
                  { fa: "تیره کردن گرادیان مشکل کلیشه را حل نمی‌کند.", en: "A darker gradient doesn't fix the cliché." },
                  { fa: "بدون طرح تأییدشده، اصلاحات گران‌تر می‌شوند.", en: "Without an approved design, fixes get more expensive." },
                ],
              },
              {
                q: { fa: "چه زمانی بهتر است یک جلسه تازه با Agent باز کنیم؟", en: "When is it best to start a fresh session with the agent?" },
                options: [
                  { fa: "بعد از هر پیام، فقط برای اطمینان بیشتر", en: "After every single message, to be safe" },
                  { fa: "هیچ‌وقت؛ یک گفتگو برای کل پروژه", en: "Never; one chat for the whole project" },
                  { fa: "فقط وقتی Agent خطای امنیتی داد", en: "Only after the agent shows a security error" },
                  { fa: "برای هر قابلیت جدید یا گفتگوی طولانی", en: "For each new feature or a very long chat" },
                ],
                answer: 3,
                explain: { fa: "جلسه تازه، ذهن تازه؛ زمینه در AGENTS.md و تاریخچه Git می‌ماند.", en: "Fresh session, fresh mind; the context lives in AGENTS.md and Git history." },
                why: [
                  { fa: "پیام‌به‌پیام، زمینه همان قابلیت از بین می‌رود.", en: "Per message, you lose the context of the current feature." },
                  { fa: "گفتگوی خیلی طولانی از Context Window بیرون می‌زند.", en: "A very long chat overflows the context window." },
                  { fa: "خطای امنیتی یک مورد خاص است، نه قاعده کلی.", en: "A security error is a special case, not the rule." },
                  { fa: "درست. AGENTS.md و Git زمینه را به Agent برمی‌گردانند.", en: "Right. AGENTS.md and Git bring the context back." },
                ],
              },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "این حلقه همه چیزهای قبلی را به هم وصل می‌کند: Brief و AGENTS.md زمینه می‌دهند، Prompt خوب هر دور را شروع می‌کند، طرح تأییدشده معیار بازبینی است، و GitHub هر قدم را ذخیره می‌کند. در پرده چهارم همین حلقه را با تست خودکار، CI/CD و Preview Deployment محکم‌تر می‌کنیم تا هر Merge با خیال راحت منتشر شود.",
      en: "This loop ties everything together: the brief and AGENTS.md give context, a good prompt starts each lap, the approved design is the review yardstick, and GitHub saves every step. In Act IV we harden the same loop with automated tests, CI/CD and preview deployments, so every merge ships with confidence.",
    },
    takeaways: [
      { fa: 'Vibe Coding مسئولانه یعنی: AI می‌نویسد، شما می‌بینید، تست می‌کنید و آگاهانه ذخیره می‌کنید.', en: 'Responsible vibe coding: the AI writes, you look, test and save deliberately.' },
      { fa: 'حلقه: بخواه، بساز، ببین، بازبینی کن، ذخیره کن. هر دور کوچک.', en: 'The loop: ask, build, preview, review, save. Every lap small.' },
      { fa: 'برای هر قابلیت یک Branch و یک Pull Request.', en: 'One branch and one pull request per feature.' },
      { fa: 'گفتگوی طولانی را با یک جلسه تازه عوض کنید و جلوی بازنویسی‌های بی‌دلیل را بگیرید.', en: 'Swap long conversations for fresh sessions, and stop pointless rewrites.' },
      { fa: 'همیشه بخواهید Agent تغییراتش را به زبان ساده توضیح دهد.', en: 'Always ask the agent to explain its changes in plain language.' },
    ],
  },
];
