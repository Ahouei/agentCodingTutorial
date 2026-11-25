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
    minutes: 14,
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
              fa: "Agent مثل یک پیمانکار خیلی سریع و خیلی باهوش است که شما را نمی‌شناسد. اگر فقط بگویید «یک وبسایت قشنگ برای کافه‌ام بساز»، او مجبور است صدها تصمیم را خودش حدس بزند: چند صفحه؟ منو آنلاین؟ رزرو میز؟ فارسی یا انگلیسی؟ رنگ‌ها؟ هر حدس اشتباه یعنی یک دور اصلاح، و هر دور اصلاح یعنی وقت، اعتبار مصرفی و حوصله.",
              en: "An agent is like a very fast, very smart contractor who has never met you. If you only say “build a nice website for my cafe,” it has to guess hundreds of decisions on its own: how many pages? an online menu? table booking? Persian or English? which colors? Every wrong guess costs a round of fixes, and every round costs time, usage credits and patience.",
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
                  fa: "این سایت قرار است چه مشکلی را حل کند؟ در یک جمله. مثلاً: «مشتری‌ها منوی روز و ساعت کاری کافه را ببینند و میز رزرو کنند.»",
                  en: "What problem does this site solve? One sentence. For example: “Customers can see today's menu and opening hours, and book a table.”",
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
            type: 'code',
            lang: 'markdown',
            caption: { fa: 'یک نمونه AGENTS.md کوتاه برای سایت کافه', en: 'A short AGENTS.md example for a cafe site' },
            code: `# Cafe Nilou website

## Project
Bilingual (Persian first, RTL) website for a small cafe.
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
            q: {
              fa: 'شما می‌خواهید یک فروشگاه آنلاین بسازید ولی وقت و بودجه کمی دارید. بهترین شروع کدام است؟',
              en: 'You want to build an online shop but have little time and budget. What is the best start?',
            },
            options: [
              { fa: 'همه قابلیت‌ها را در یک پیام بزرگ از Agent بخواهیم تا یکجا ساخته شود.', en: 'Ask the agent for every feature in one big message so it’s built in one go.' },
              { fa: 'یک MVP با Mustها تعریف کنیم: فهرست محصول، صفحه محصول و راه تماس برای سفارش؛ بقیه برای بعد.', en: 'Define an MVP with the Musts: product list, product page and a way to order; everything else later.' },
              { fa: 'بدون Brief شروع کنیم و ببینیم Agent چه پیشنهادی می‌دهد.', en: 'Start without a brief and see what the agent suggests.' },
            ],
            answer: 1,
            explain: {
              fa: 'MVP یعنی زودتر منتشر کردن چیزی که واقعاً کار می‌کند، و بعد رشد دادن آن. پیام‌های غول‌پیکر و شروع بدون Brief هر دو به دورهای اصلاح بی‌پایان می‌رسند.',
              en: 'An MVP gets something that really works out the door sooner, then grows it. Giant messages and no-brief starts both lead to endless rounds of fixes.',
            },
          },
          {
            type: 'links',
            items: [
              { label: 'AGENTS.md: open format for coding agents', url: 'https://agents.md' },
              { label: 'OpenAI Codex: Custom instructions with AGENTS.md', url: 'https://developers.openai.com/codex/guides/agents-md' },
              { label: 'Claude Code: How Claude remembers your project (CLAUDE.md)', url: 'https://code.claude.com/docs/en/memory' },
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
            type: 'prompt',
            title: { fa: 'قالب یک Prompt کامل برای یک قابلیت جدید', en: 'A full prompt template for a new feature' },
            text: {
              fa: "زمینه: در پروژه سایت کافه (AGENTS.md را بخوان) صفحه منو آماده است.\nهدف: یک بخش «پیشنهاد امروز» بالای صفحه منو اضافه کن تا مشتری‌ها آیتم ویژه هر روز را ببینند.\nمحدودیت‌ها: کتابخانه جدید اضافه نکن. طراحی بقیه صفحه را عوض نکن. متن‌ها فارسی و RTL باشند.\nتعریف تمام‌شدن:\n- روی موبایل و دسکتاپ درست نمایش داده شود.\n- اگر پیشنهاد امروز تعریف نشده باشد، بخش اصلاً نمایش داده نشود.\n- تست‌های فعلی پاس شوند.\nروش: اول برنامه‌ات را در چند خط بگو و اگر سؤالی داری بپرس. تا تأیید من کد ننویس. بعد روی یک Branch جدید کار کن.",
              en: "Context: in the cafe site project (read AGENTS.md) the menu page is done.\nGoal: add a “Today's special” section at the top of the menu page so customers see each day's featured item.\nConstraints: don't add new libraries. Don't change the rest of the page design. Texts in Persian and RTL.\nDefinition of done:\n- Displays correctly on mobile and desktop.\n- If no special is set for today, the section doesn't render at all.\n- Existing tests still pass.\nProcess: first tell me your plan in a few lines and ask any questions. Don't write code until I approve. Then work on a new branch.",
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
              { fa: "Agent Skills یک **استاندارد باز** است (agentskills.io). Claude Code و Codex هر دو طبق مستندات رسمی‌شان از آن پشتیبانی می‌کنند، پس یک Skill را می‌توانید در هر دو استفاده کنید.", en: "Agent Skills is an **open standard** (agentskills.io). Both Claude Code and Codex support it according to their official docs, so one skill can work in both." },
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
                  fa: "برای Claude Code: داخل پروژه در `.claude/skills/` یا برای همه پروژه‌ها در `~/.claude/skills/`. برای Codex: داخل پروژه در `.agents/skills/` یا برای همه پروژه‌ها در `~/.agents/skills/`. مسیرها ممکن است در نسخه‌های جدید تغییر کنند؛ مستندات رسمی را چک کنید.",
                  en: "For Claude Code: inside the project in `.claude/skills/`, or for every project in `~/.claude/skills/`. For Codex: inside the project in `.agents/skills/`, or for every project in `~/.agents/skills/`. Paths can change in new versions; check the official docs.",
                },
              },
              {
                title: { fa: 'جلسه تازه باز کنید و امتحان کنید', en: 'Start a fresh session and try it' },
                text: {
                  fa: "کاری بخواهید که با توضیح Skill جور باشد، یا مستقیم صدایش کنید: در Claude Code با `/نام-skill` و در Codex با `$نام-skill`.",
                  en: "Ask for something that matches the skill's description, or call it directly: `/skill-name` in Claude Code and `$skill-name` in Codex.",
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
              { term: 'Progressive Disclosure', def: { fa: 'بارگذاری تدریجی: اول فقط نام و توضیح، متن کامل فقط وقتی لازم است.', en: 'Loading in stages: names and descriptions first, full text only when needed.' } },
            ],
          },
          {
            type: 'quiz',
            q: {
              fa: 'کدام Prompt برای یک Agent بهتر است؟',
              en: 'Which prompt is better for an agent?',
            },
            options: [
              { fa: '«سایت را قشنگ‌تر کن.»', en: '“Make the site prettier.”' },
              { fa: '«دکمه‌های صفحه خانه را با رنگ اصلی برند (#E8603C) و گوشه گرد ۱۲ پیکسل یکسان کن، به صفحه‌های دیگر دست نزن، و قبل از تغییر برنامه‌ات را بگو.»', en: '“Make the home page buttons use the brand color (#E8603C) and a 12px radius, don’t touch other pages, and tell me your plan before changing anything.”' },
              { fa: '«تو یک طراح حرفه‌ای در سطح جهانی هستی، بهترین سایت دنیا را بساز.»', en: '“You are a world-class designer. Build the best website in the world.”' },
            ],
            answer: 1,
            explain: {
              fa: 'گزینه دوم زمینه، هدف دقیق، محدودیت و روش کار دارد و نتیجه‌اش قابل‌بررسی است. «قشنگ‌تر» و «بهترین سایت دنیا» قابل‌سنجش نیستند.',
              en: 'The second option has context, a precise goal, a limit and a process, and its result can be checked. “Prettier” and “the best website in the world” can’t be measured.',
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Agent Skills specification (agentskills.io)', url: 'https://agentskills.io/specification' },
              { label: 'Claude Code: Extend Claude with skills', url: 'https://code.claude.com/docs/en/skills' },
              { label: 'OpenAI Codex: Build skills', url: 'https://developers.openai.com/codex/skills' },
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
              fa: "معماران قبل از ساختن خانه نقشه می‌کشند، نه اینکه دیوار بچینند و بعد بپرسند «خوب است؟». همین منطق برای وبسایت هم درست است. طرح اولیه همچنین قراردادی بین شما و Agent است: بعداً می‌توانید بگویید «طبق طرح تأییدشده جلو برو».",
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
              fa: "AGENTS.md و Brief پروژه را بخوان. هنوز هیچ کد اصلی ننویس.\nیک پیشنهاد طراحی آماده کن شامل:\n۱. Sitemap همه صفحه‌ها.\n۲. Wireframe متنی برای صفحه خانه و صفحه منو (بالا به پایین، بخش به بخش).\n۳. Style direction: دو فونت (یکی فارسی)، پالت ۴ تا ۵ رنگ با کد، و حس کلی در سه کلمه، با دلیل هر انتخاب.\n۴. فهرست Componentهای مشترک.\n۵. یک Mockup ساده از صفحه خانه به شکل یک فایل HTML جدا در پوشه design/ تا در مرورگر ببینم.\nطراحی Mobile-first و RTL باشد. از گرادیان بنفش و چیدمان کلیشه‌ای سه کارت کنار هم دوری کن.\nبعد صبر کن تا نظر من را بشنوی.",
              en: "Read AGENTS.md and the project brief. Don't write any production code yet.\nPrepare a design proposal with:\n1. A sitemap of all pages.\n2. A text wireframe for the home page and the menu page (top to bottom, section by section).\n3. Style direction: two fonts (one Persian), a 4–5 color palette with hex codes, and the mood in three words, with a reason for each choice.\n4. A list of shared components.\n5. A simple mockup of the home page as a separate HTML file in a design/ folder so I can open it in a browser.\nDesign mobile-first and RTL. Avoid purple gradients and the cliché row of three identical cards.\nThen wait for my feedback.",
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
            q: {
              fa: 'Agent یک Mockup زیبا با متن Lorem ipsum به شما نشان داده. بهترین قدم بعدی چیست؟',
              en: 'The agent shows you a beautiful mockup filled with lorem ipsum. What is the best next step?',
            },
            options: [
              { fa: 'فوراً تأیید کنیم چون قشنگ است.', en: 'Approve right away because it looks nice.' },
              { fa: 'بخواهیم با متن و عکس واقعی و در عرض موبایل دوباره نشان دهد، بعد تصمیم بگیریم.', en: 'Ask to see it again with real text and photos at mobile width, then decide.' },
              { fa: 'مستقیم بگوییم کل سایت را بسازد؛ متن‌ها را بعداً عوض می‌کنیم.', en: 'Tell it to build the whole site; we’ll swap the text later.' },
            ],
            answer: 1,
            explain: {
              fa: 'متن واقعی (مخصوصاً فارسی) طول و شکل متفاوتی با متن نمونه دارد و ممکن است طرح را به‌هم بریزد. بررسی در عرض موبایل هم ضروری است چون بیشتر کاربران آنجا هستند.',
              en: 'Real text (especially Persian) has a different length and shape than filler and can break the layout. Checking at mobile width matters too, since most visitors are there.',
            },
          },
          {
            type: 'links',
            items: [
              { label: 'web.dev: Learn Design', url: 'https://web.dev/learn/design' },
              { label: 'web.dev: Learn Accessibility', url: 'https://web.dev/learn/accessibility' },
              { label: 'W3C: Understanding contrast (WCAG 2.2)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html' },
              { label: 'MDN: CSS logical properties (for RTL)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values' },
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
    minutes: 15,
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
              fa: "Agent با دسترسی‌هایی که شما داده‌اید کار می‌کند. هر وقت خواست کاری خارج از حلقه عادی انجام دهد، مثلاً حذف دیتابیس، تغییر DNS یا Push مستقیم روی `main`، قبل از تأیید دلیلش را بپرسید.",
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
            q: {
              fa: 'Agent برای حل یک باگ کوچک در فرم تماس پیشنهاد می‌دهد کل پروژه را با یک Framework جدید بازنویسی کند. شما چه می‌کنید؟',
              en: 'To fix a small bug in the contact form, the agent proposes rewriting the whole project in a new framework. What do you do?',
            },
            options: [
              { fa: 'قبول می‌کنیم؛ Agent بهتر می‌داند.', en: 'Accept; the agent knows best.' },
              { fa: 'متوقفش می‌کنیم و می‌خواهیم علت باگ را توضیح دهد و فقط همان را با کمترین تغییر حل کند.', en: 'Stop it, ask it to explain the cause, and fix only that bug with the smallest change.' },
              { fa: 'کل Repository را پاک می‌کنیم و از اول شروع می‌کنیم.', en: 'Delete the whole repository and start over.' },
            ],
            answer: 1,
            explain: {
              fa: 'این همان مارپیچ «همه چیز را از نو بنویس» است. تغییر کوچک و هدفمند ریسک کمتری دارد، قابل بررسی است، و مشکلات تازه نمی‌سازد.',
              en: 'That’s the “rewrite everything” spiral. A small, targeted change is less risky, easy to review, and doesn’t create new problems.',
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Andrej Karpathy: the original “vibe coding” post (Feb 2025)', url: 'https://x.com/karpathy/status/1886192184808149383' },
              { label: 'Claude Code: Common workflows', url: 'https://code.claude.com/docs/en/common-workflows' },
              { label: 'OpenAI Codex documentation', url: 'https://developers.openai.com/codex' },
              { label: 'GitHub Docs: About pull requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests' },
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
