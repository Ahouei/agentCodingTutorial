import type { Chapter } from '../types';

/* ─────────────────────────────────────────────────────────────
   Five builders, one café: compare Claude Code, Codex, Lovable,
   Grok and DeepSeek. Main focus: Codex vs Lovable.
   Facts: docs/research/platforms.md (checked 2026-11-25).
   ───────────────────────────────────────────────────────────── */
export const comparePlatforms: Chapter = {
  slug: 'compare-platforms',
  act: 1,
  icon: 'map',
  title: { fa: 'پنج سازنده، یک کافه', en: 'Five builders, one café' },
  tagline: {
    fa: 'Codex یا Lovable؟ و Claude Code، Grok و DeepSeek کجا به کار می‌آیند',
    en: 'Codex or Lovable? And where Claude Code, Grok and DeepSeek fit in',
  },
  minutes: 35,
  mascotLine: {
    fa: 'سحر می‌خواهد کافه‌اش را آنلاین کند. بیایید با هم ببینیم هر ابزار این کار را چطور انجام می‌دهد، بعد یکی را انتخاب کنیم.',
    en: 'Sahar wants her café online. Let’s see how each tool would do it, then pick one together.',
  },
  mission: {
    outcome: {
      fa: 'می‌دانید برای هر نوع پروژه، مسیر Codex بهتر است یا مسیر Lovable، و ابزارهای دیگر کجا کمک می‌کنند.',
      en: 'You know whether the Codex path or the Lovable path suits each kind of project, and where the other tools help.',
    },
    cafe: {
      fa: 'سحر پنج سازنده را مقایسه می‌کند و یک مسیر را برای کافه انتخاب می‌کند.',
      en: 'Sahar compares the five builders and commits to one path for the café.',
    },
  },
  warmup: {
    q: {
      fa: 'Codex پیش از شروع کار در یک Repository کدام فایل را می‌خواند؟',
      en: 'Which file does Codex read before it starts working in a repository?',
    },
    options: [
      { fa: '`README.md` برای معرفی پروژه', en: '`README.md`, the project intro' },
      { fa: '`AGENTS.md` با دستورهای Agent', en: '`AGENTS.md`, the agent instructions' },
      { fa: '`wrangler.jsonc` برای انتشار سایت', en: '`wrangler.jsonc`, the deploy config' },
    ],
    answer: 1,
    explain: {
      fa: '`AGENTS.md` جایی است که قواعد پروژه را برای Agent می‌نویسید؛ Codex آن را پیش از هر کاری می‌خواند.',
      en: '`AGENTS.md` is where you write the project rules for the agent; Codex reads it before doing any work.',
    },
    why: [
      {
        fa: '`README.md` برای آدم‌هاست. ممکن است Agent نگاهی به آن بیندازد، اما فایل دستورالعمل رسمی‌اش نیست.',
        en: '`README.md` is for humans. An agent may glance at it, but it is not its official instruction file.',
      },
      {
        fa: 'درست است. همین فایل را می‌شود در Claude Code و Grok Build هم استفاده کرد.',
        en: 'Correct. The same file also works with Claude Code and Grok Build.',
      },
      {
        fa: '`wrangler.jsonc` تنظیمات انتشار روی Cloudflare است، نه راهنمای Agent.',
        en: '`wrangler.jsonc` holds Cloudflare deploy settings, not guidance for the agent.',
      },
    ],
  },
  sections: [
    {
      id: 'two-paths',
      title: { fa: 'دو مسیر اصلی: Codex و Lovable', en: 'The two main paths: Codex and Lovable' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'تا اینجا با Agentها آشنا شدید. حالا وقت انتخاب است. در این دوره دو مسیر اصلی را دنبال می‌کنیم: **Codex** که یک Agent برنامه‌نویس است و در Repository شما کار می‌کند، و **Lovable** که یک سازنده اپلیکیشن است و از گفت‌وگو، یک اپ زنده و آماده می‌سازد. هر دو با Agentic AI کار می‌کنند، اما حس کار با آن‌ها خیلی فرق دارد.',
            en: 'You have met the agents. Now it is time to choose. This course follows two main paths: **Codex**, a coding agent that works inside your repository, and **Lovable**, an app builder that turns a conversation into a live, running app. Both are agentic AI, but working with them feels very different.',
          },
        },
        {
          type: 'compare',
          headers: [
            { fa: '', en: '' },
            { fa: 'Codex', en: 'Codex' },
            { fa: 'Lovable', en: 'Lovable' },
          ],
          rows: [
            [
              { fa: 'حس کار', en: 'How it feels' },
              { fa: 'به یک برنامه‌نویس دستیار کار می‌سپارید؛ او کد می‌نویسد و تغییرات را برای بررسی می‌آورد.', en: 'You hand tasks to an assistant developer who writes code and brings changes for review.' },
              { fa: 'حرف می‌زنید و سایت را همان لحظه در پیش‌نمایش می‌بینید؛ با کلیک روی بخش‌ها هم می‌شود تغییر داد.', en: 'You talk and watch the site change in a live preview; you can also click parts of it to change them.' },
            ],
            [
              { fa: 'کد کجاست', en: 'Where the code lives' },
              { fa: 'در Repository خودتان روی GitHub، از روز اول.', en: 'In your own GitHub repository from day one.' },
              { fa: 'در پروژه Lovable؛ با همگام‌سازی دوطرفه با GitHub به Repository شما هم می‌رود.', en: 'In the Lovable project; two-way sync sends it to your GitHub repository too.' },
            ],
            [
              { fa: 'میزبانی', en: 'Hosting' },
              { fa: 'خودتان انتخاب می‌کنید؛ در این دوره Cloudflare Workers.', en: 'Your choice; in this course, Cloudflare Workers.' },
              { fa: 'داخلی: با دکمه Publish روی آدرس `lovable.app`؛ دامنه اختصاصی در پلن پولی.', en: 'Built in: Publish to a `lovable.app` address; custom domain on paid plans.' },
            ],
            [
              { fa: 'Backend و Database', en: 'Backend and database' },
              { fa: 'خودتان می‌سازید، مثلاً Worker و D1، با کمک Agent.', en: 'You build it, e.g. a Worker and D1, with the agent’s help.' },
              { fa: 'Backend داخلی (بر پایه Supabase): Database، ورود کاربر و فایل‌ها.', en: 'Built-in backend (Supabase-based): database, sign-in and file storage.' },
            ],
            [
              { fa: 'مدل هزینه', en: 'Cost model' },
              { fa: 'بخشی از اشتراک ChatGPT؛ کارهای ابری Codex از پلن Plus به بالا.', en: 'Part of a ChatGPT plan; Codex cloud tasks from Plus upward.' },
              { fa: 'اعتباری (Credit): هم ساختن و هم اجرای اپ از یک موجودی کم می‌شود.', en: 'Credits: building and running the app both draw from one balance.' },
            ],
            [
              { fa: 'کنترل در برابر سرعت', en: 'Control vs speed' },
              { fa: 'کنترل دقیق‌تر؛ نیاز به کمی آشنایی با Repository و انتشار.', en: 'More precise control; needs some comfort with repositories and deploys.' },
              { fa: 'سریع‌ترین راه تا یک اپ زنده؛ جزئیات فنی پنهان‌تر است.', en: 'Fastest route to a live app; the technical details are more hidden.' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'why',
          title: { fa: 'یک نکته جالب', en: 'A nice detail' },
          text: {
            fa: 'به گفته وبلاگ خود Lovable، اپ‌های تازه آن روی **Cloudflare Workers** اجرا می‌شوند. یعنی دو مسیر این دوره به یک جا می‌رسند: کدی که Lovable می‌سازد را می‌شود به GitHub برد و مثل مسیر Codex روی Cloudflare منتشر کرد.',
            en: 'According to Lovable’s own blog, its new apps run on **Cloudflare Workers**. So the two paths in this course meet: code Lovable builds can go to GitHub and be deployed on Cloudflare, just like the Codex path.',
          },
        },
        {
          type: 'terms',
          items: [
            {
              term: 'App builder',
              def: {
                fa: 'ابزاری مثل Lovable که از گفت‌وگو یک اپ کامل با پیش‌نمایش، Backend و میزبانی می‌سازد.',
                en: 'A tool like Lovable that turns a conversation into a full app with preview, backend and hosting.',
              },
            },
            {
              term: 'Coding agent',
              def: {
                fa: 'Agentی مثل Codex یا Claude Code که در Repository شما کد می‌نویسد، تست می‌کند و تغییر را برای بررسی می‌آورد.',
                en: 'An agent like Codex or Claude Code that writes code in your repository, tests it and brings the change for review.',
              },
            },
            {
              term: 'Credits',
              def: {
                fa: 'واحد مصرف در Lovable. هر پیام ساختن، اجرای Backend و قابلیت‌های AI از این موجودی کم می‌کند.',
                en: 'Lovable’s usage unit. Building, running the backend and AI features all draw from this balance.',
              },
            },
            {
              term: 'Git sync',
              def: {
                fa: 'همگام‌سازی دوطرفه Lovable با GitHub: تغییرات Lovable به GitHub می‌رود و Push شما به Lovable برمی‌گردد.',
                en: 'Lovable’s two-way GitHub sync: Lovable’s changes go to GitHub, and your pushes come back to Lovable.',
              },
            },
            {
              term: 'Instructions',
              def: {
                fa: 'دستورالعمل‌های ثابت پروژه در Lovable؛ همتای `AGENTS.md` در مسیر Codex.',
                en: 'Lovable’s standing project instructions; the counterpart of `AGENTS.md` on the Codex path.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'compare-visually',
      title: { fa: 'مقایسه تصویری پنج ابزار', en: 'The five tools, side by side' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'نمودار زیر پنج ابزار را روی هشت محور می‌سنجد: راحتی برای تازه‌کار، مالکیت کد، Backend آماده، میزبانی آماده، کنترل، قدرت Agent، هزینه، و دسترسی از ایران. روی هر ابزار بزنید تا شکلش را ببینید و دو تا را کنار هم مقایسه کنید.',
            en: 'The chart below rates the five tools on eight axes: beginner ease, code ownership, built-in backend, built-in hosting, control, agent strength, cost, and access from Iran. Tap a tool to see its shape and compare any two side by side.',
          },
        },
        { type: 'widget', id: 'platform-compare' },
        {
          type: 'callout',
          tone: 'warn',
          title: { fa: 'این امتیازها نظر دوره است', en: 'These scores are the course’s opinion' },
          text: {
            fa: 'امتیازهای ۱ تا ۵ قضاوت ویراستاری همین دوره است، نه عدد رسمی. واقعیت‌های پشت آن‌ها (پلن‌ها، قابلیت‌ها، کشورهای پشتیبانی‌شده) از مستندات رسمی در آذر ۱۴۰۵ (نوامبر ۲۰۲۶) گرفته شده و ممکن است عوض شود.',
            en: 'The 1–5 scores are this course’s editorial judgment, not official numbers. The facts behind them (plans, features, supported countries) come from official docs as of November 2026 and may change.',
          },
        },
      ],
    },
    {
      id: 'scenarios',
      title: { fa: 'شش سناریو، دو مسیر', en: 'Six scenarios, two paths' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'بالای هر سناریو می‌توانید بین مسیر Codex و Lovable جابه‌جا شوید. انتخاب شما در کل دوره به خاطر سپرده می‌شود.',
            en: 'In each scenario you can switch between the Codex and Lovable paths. Your choice is remembered across the course.',
          },
        },
        { type: 'h', text: { fa: '۱. صفحه معرفی (Landing page)', en: '1. A landing page' } },
        {
          type: 'path',
          codex: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'Brief و AGENTS.md', en: 'Brief and AGENTS.md' }, text: { fa: 'هدف، مخاطب و بخش‌های صفحه را بنویسید و در `AGENTS.md` بگذارید.', en: 'Write the goal, audience and page sections, and put them in `AGENTS.md`.' } },
                { title: { fa: 'ساخت در Repository', en: 'Build in the repository' }, text: { fa: 'Codex یک سایت ثابت می‌سازد و Pull Request می‌آورد.', en: 'Codex builds a static site and opens a pull request.' } },
                { title: { fa: 'انتشار', en: 'Deploy' }, text: { fa: 'روی Cloudflare Workers با Static Assets، بعد دامنه اختصاصی.', en: 'On Cloudflare Workers with static assets, then your custom domain.' } },
              ],
            },
          ],
          lovable: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'یک Prompt روشن', en: 'One clear prompt' }, text: { fa: 'صفحه را توصیف کنید؛ چند ثانیه بعد پیش‌نمایش زنده دارید.', en: 'Describe the page; seconds later you have a live preview.' } },
                { title: { fa: 'صیقل با نوار پیش‌نمایش', en: 'Polish with the preview toolbar' }, text: { fa: 'روی هر بخش بزنید و تغییر را بگویید یا متن را همان‌جا ویرایش کنید.', en: 'Click any part and describe the change, or edit text in place.' } },
                { title: { fa: 'Publish', en: 'Publish' }, text: { fa: 'روی `lovable.app` منتشر کنید؛ دامنه اختصاصی در پلن پولی.', en: 'Publish to `lovable.app`; a custom domain needs a paid plan.' } },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { fa: 'ترکیب پیشنهادی', en: 'Best combo' },
          text: {
            fa: 'برای یک صفحه ساده، Lovable سریع‌ترین است و Codex ارزان‌ترین میزبانی را می‌دهد. هر کدام به‌تنهایی کافی است.',
            en: 'For a simple page, Lovable is fastest and Codex gives the cheapest hosting. Either one alone is enough.',
          },
        },
        { type: 'h', text: { fa: '۲. وبلاگ', en: '2. A blog' } },
        {
          type: 'path',
          codex: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'نوشته‌ها به‌شکل فایل', en: 'Posts as files' }, text: { fa: 'هر نوشته یک فایل Markdown در Repository است؛ Codex صفحه‌ها را از آن‌ها می‌سازد.', en: 'Each post is a Markdown file in the repository; Codex builds pages from them.' } },
                { title: { fa: 'RSS و Sitemap', en: 'RSS and sitemap' }, text: { fa: 'از Agent بخواهید خوراک RSS و `sitemap.xml` بسازد.', en: 'Ask the agent for an RSS feed and `sitemap.xml`.' } },
                { title: { fa: 'هر Push، یک انتشار', en: 'Every push deploys' }, text: { fa: 'نوشته تازه را Commit کنید؛ Cloudflare خودکار منتشر می‌کند.', en: 'Commit a new post; Cloudflare deploys it automatically.' } },
              ],
            },
          ],
          lovable: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'نوشته‌ها در Database', en: 'Posts in the database' }, text: { fa: 'بخواهید نوشته‌ها در Backend داخلی ذخیره شوند.', en: 'Ask for posts to be stored in the built-in backend.' } },
                { title: { fa: 'صفحه مدیریت', en: 'An admin page' }, text: { fa: 'یک صفحه ورود‌دار برای نوشتن و ویرایش نوشته‌ها.', en: 'A signed-in page for writing and editing posts.' } },
                { title: { fa: 'بررسی SEO', en: 'SEO review' }, text: { fa: 'بررسی SEO داخلی Lovable را اجرا کنید (فصل «پیدا شدن» را ببینید).', en: 'Run Lovable’s built-in SEO review (see the “Be found” chapter).' } },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { fa: 'ترکیب پیشنهادی', en: 'Best combo' },
          text: {
            fa: 'نمونه اولیه را در Lovable بسازید، با GitHub همگام کنید، بعد Codex نوشته‌های Markdown و RSS را اضافه کند و روی Cloudflare منتشر شود.',
            en: 'Prototype in Lovable, sync to GitHub, then let Codex add Markdown posts and RSS and deploy on Cloudflare.',
          },
        },
        { type: 'h', text: { fa: '۳. فروشگاه کوچک با پرداخت', en: '3. A small shop with payments' } },
        {
          type: 'path',
          codex: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'صفحه پرداخت آماده', en: 'A hosted checkout' }, text: { fa: 'از سرویس پرداخت، صفحه پرداخت آماده‌اش را بگیرید؛ کارت را خودتان نگه ندارید.', en: 'Use the payment provider’s hosted checkout; never store card data yourself.' } },
                { title: { fa: 'Worker و Webhook', en: 'Worker and webhook' }, text: { fa: 'یک Worker پیام تأیید پرداخت را می‌گیرد و سفارش را در D1 ثبت می‌کند.', en: 'A Worker receives the payment confirmation and records the order in D1.' } },
                { title: { fa: 'Secretها جدا', en: 'Secrets kept apart' }, text: { fa: 'کلیدها فقط با `wrangler secret put`، هرگز در کد.', en: 'Keys only via `wrangler secret put`, never in code.' } },
              ],
            },
          ],
          lovable: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'پرداخت از Backend داخلی', en: 'Payments via the built-in backend' }, text: { fa: 'پرداخت جزو قابلیت‌های Backend داخلی Lovable است؛ آن را در گفت‌وگو بخواهید.', en: 'Payments are part of Lovable’s built-in backend features; ask for them in chat.' } },
                { title: { fa: 'بررسی امنیتی پیشرفته', en: 'Advanced security checks' }, text: { fa: 'پیش از انتشار، بررسی امنیتی را اجرا کنید؛ دسته «پرداخت» هم دارد.', en: 'Before publishing, run the security checks; they include a “payments” category.' } },
                { title: { fa: 'محدودیت کشورها', en: 'Country rules' }, text: { fa: 'هر سرویس پرداخت قوانین کشوری خودش را دارد؛ اول آن را بخوانید.', en: 'Each payment provider has its own country rules; read them first.' } },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { fa: 'پول یعنی دقت بیشتر', en: 'Money means extra care' },
          text: {
            fa: 'در هر دو مسیر، قبل از فروش واقعی یک خرید آزمایشی کامل انجام دهید و از Agent بخواهید بخش پرداخت را از نظر امنیتی بازبینی کند.',
            en: 'On either path, make a full test purchase before selling for real, and ask the agent to review the payment code for security.',
          },
        },
        { type: 'h', text: { fa: '۴. رزرو میز کافه سحر با Database', en: '4. Café Sahar’s table booking with a database' } },
        {
          type: 'path',
          codex: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'فرم و API', en: 'Form and API' }, text: { fa: 'فرم رزرو، یک Worker API و یک جدول در D1.', en: 'A booking form, a Worker API and a table in D1.' } },
                { title: { fa: 'محافظت از فرم', en: 'Protect the form' }, text: { fa: 'Turnstile جلوی ربات‌ها را می‌گیرد و توکنش روی سرور بررسی می‌شود.', en: 'Turnstile stops bots, and its token is checked on the server.' } },
                { title: { fa: 'تست و انتشار', en: 'Test and deploy' }, text: { fa: 'تست فرم، بعد Push و انتشار خودکار روی `cafe-sahar.ir`.', en: 'Test the form, then push and auto-deploy to `cafe-sahar.ir`.' } },
              ],
            },
          ],
          lovable: [
            {
              type: 'steps',
              items: [
                { title: { fa: 'یک درخواست', en: 'One request' }, text: { fa: '«یک فرم رزرو میز که در Database ذخیره شود و ایمیل تأیید بفرستد.»', en: '“A table-booking form saved to the database that sends a confirmation email.”' } },
                { title: { fa: 'قواعد دسترسی', en: 'Access rules' }, text: { fa: 'بررسی امنیتی پیش از انتشار، اشتباه در قواعد دسترسی Database (RLS) را نشان می‌دهد.', en: 'The pre-publish security check flags mistakes in database access rules (RLS).' } },
                { title: { fa: 'Publish و دامنه', en: 'Publish and domain' }, text: { fa: 'انتشار روی `lovable.app`، بعد وصل کردن `cafe-sahar.ir`.', en: 'Publish to `lovable.app`, then connect `cafe-sahar.ir`.' } },
              ],
            },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { fa: 'ترکیب پیشنهادی', en: 'Best combo' },
          text: {
            fa: 'فرم را در Lovable بسازید، به GitHub ببرید، Codex آن را دقیق‌تر کند، و روی Cloudflare با متغیرهای محیطی Supabase منتشر کنید. Lovable خودش این مسیر را مستند کرده، اما اول یک انتشار آزمایشی بگیرید.',
            en: 'Build the form in Lovable, take it to GitHub, let Codex refine it, and deploy on Cloudflare with the Supabase environment variables. Lovable documents this route, but do a test deploy first.',
          },
        },
        { type: 'h', text: { fa: '۵. داشبورد داخلی', en: '5. An internal dashboard' } },
        {
          type: 'path',
          codex: [
            {
              type: 'list',
              items: [
                { fa: 'Worker و D1 برای داده‌ها، با صفحه‌های جدول و نمودار.', en: 'A Worker and D1 for the data, with table and chart pages.' },
                { fa: 'فقط کارکنان: یک لایه ورود جلوی داشبورد بگذارید و از Agent بخواهید راه‌های رایج Cloudflare برای این کار را پیشنهاد دهد.', en: 'Staff only: put a sign-in layer in front, and ask the agent to suggest Cloudflare’s usual ways to do that.' },
              ],
            },
          ],
          lovable: [
            {
              type: 'list',
              items: [
                { fa: 'داشبورد را با Backend داخلی و ورود کاربر بسازید.', en: 'Build the dashboard with the built-in backend and sign-in.' },
                { fa: 'در پلن Business می‌شود اپ را فقط برای اعضای Workspace منتشر کرد.', en: 'On the Business plan you can publish an app to workspace members only.' },
              ],
            },
          ],
        },
        { type: 'h', text: { fa: '۶. اپ فارسی و راست‌به‌چپ', en: '6. A Persian, right-to-left app' } },
        {
          type: 'path',
          codex: [
            {
              type: 'p',
              text: {
                fa: 'در `AGENTS.md` بنویسید: `dir="rtl"` و `lang="fa"`، فونت فارسی، ویژگی‌های منطقی CSS (مثل `margin-inline-start`) و اعداد فارسی در متن. بعد روی گوشی واقعی تست کنید.',
                en: 'Write in `AGENTS.md`: `dir="rtl"` and `lang="fa"`, a Persian font, logical CSS properties (like `margin-inline-start`) and Persian digits in text. Then test on a real phone.',
              },
            },
          ],
          lovable: [
            {
              type: 'p',
              text: {
                fa: 'همین قواعد را در Instructions پروژه بنویسید تا در هر پیام رعایت شوند. رفتار Lovable با راست‌به‌چپ را مستندات رسمی توضیح نداده، پس حتماً روی گوشی تست کنید.',
                en: 'Write the same rules in the project Instructions so every message follows them. Lovable’s official docs don’t describe its right-to-left behaviour, so test on a phone.',
              },
            },
          ],
        },
        {
          type: 'prompt',
          title: { fa: 'از Agent بخواهید مسیر را با شما انتخاب کند', en: 'Ask your agent to pick a path with you' },
          text: {
            fa: 'من می‌خواهم برای «کافه سحر» یک وب‌سایت با منو، ساعت کاری و فرم رزرو میز بسازم و روی دامنه cafe-sahar.ir منتشر کنم. برنامه‌نویس نیستم.\n\nدو مسیر را برایم مقایسه کن:\nالف) Codex + GitHub + Cloudflare Workers و D1\nب) Lovable با Backend داخلی و Publish\n\nبرای هر کدام بگو: قدم‌ها، کجا کد من نگه داشته می‌شود، هزینه ماهانه تقریبی به‌صورت کلی، و اگر بعداً بخواهم مسیر را عوض کنم چه باید بکنم.\nکدی ننویس؛ فقط مقایسه و پیشنهاد.',
            en: 'I want to build a website for “Café Sahar” with a menu, opening hours and a table-booking form, and publish it on the domain cafe-sahar.ir. I am not a programmer.\n\nCompare two paths for me:\nA) Codex + GitHub + Cloudflare Workers and D1\nB) Lovable with its built-in backend and Publish\n\nFor each, tell me: the steps, where my code is kept, the rough monthly cost in general terms, and what I would need to do if I switch paths later.\nDon’t write code; just compare and recommend.',
          },
        },
      ],
    },
    {
      id: 'helpers',
      title: { fa: 'سه ابزار دیگر: کجا به کار می‌آیند', en: 'The other three: where they help' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'Codex و Lovable مسیرهای اصلی این دوره‌اند، اما سه ابزار دیگر هر کدام یک نقطه ضعف را پوشش می‌دهند. آن‌ها را جعبه‌ابزار کمکی خودتان بدانید.',
            en: 'Codex and Lovable are this course’s main paths, but the other three each cover a weak spot. Think of them as your backup toolbox.',
          },
        },
        {
          type: 'compare',
          headers: [
            { fa: 'ابزار', en: 'Tool' },
            { fa: 'قوت', en: 'Strengths' },
            { fa: 'ضعف', en: 'Weaknesses' },
            { fa: 'کی سراغش برویم', en: 'When to reach for it' },
          ],
          rows: [
            [
              { fa: 'Claude Code', en: 'Claude Code' },
              { fa: 'Agent بسیار توانا؛ ترمینال، IDE، اپ دسکتاپ و وب؛ `AGENTS.md` را هم می‌خواند.', en: 'A very capable agent; terminal, IDE, desktop and web; also reads `AGENTS.md`.' },
              { fa: 'میزبانی و Backend داخلی ندارد؛ نیاز به اشتراک Claude.', en: 'No built-in hosting or backend; needs a Claude subscription.' },
              { fa: 'کارهای پیچیده، بازبینی دوم کد، یا جایگزین هم‌سطح Codex.', en: 'Complex work, a second code review, or a like-for-like alternative to Codex.' },
            ],
            [
              { fa: 'Grok Build', en: 'Grok Build' },
              { fa: 'Agent ترمینال xAI با Plan mode، Skillها و `AGENTS.md`؛ امتحانش رایگان است.', en: 'xAI’s terminal agent with plan mode, skills and `AGENTS.md`; free to try.' },
              { fa: 'تازه‌تر و کم‌امتحان‌تر؛ قیمت پلن‌ها هنوز روشن نیست.', en: 'Newer and less proven; plan prices are not yet clear.' },
              { fa: 'وقتی Agent ترمینالی رایگان برای امتحان می‌خواهید.', en: 'When you want a free terminal agent to try.' },
            ],
            [
              { fa: 'DeepSeek', en: 'DeepSeek' },
              { fa: 'مدل‌های بسیار ارزان با API سازگار؛ داخل OpenCode، Cline، Aider و حتی Claude Code کار می‌کند.', en: 'Very cheap models with a compatible API; works inside OpenCode, Cline, Aider and even Claude Code.' },
              { fa: 'خودش سازنده سایت یا میزبان نیست؛ یک ابزار Agent کنارش لازم است.', en: 'Not a site builder or host itself; it needs an agent tool beside it.' },
              { fa: 'وقتی هزینه یا دسترسی مانع اصلی است.', en: 'When cost or access is the main obstacle.' },
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { fa: 'DeepSeek یعنی مغز، نه کارگاه', en: 'DeepSeek is a brain, not a workshop' },
          text: {
            fa: 'DeepSeek مدل است، نه Agent. آن را داخل یک Agent متن‌باز مثل **OpenCode** یا **Cline** وصل می‌کنید و همان چرخه «برنامه، اقدام، بررسی» را با هزینه‌ای خیلی کمتر دارید. وزن‌های مدل باز است، اما آن‌قدر بزرگ است که اجرای روی کامپیوتر شخصی برای تازه‌کار عملی نیست.',
            en: 'DeepSeek is a model, not an agent. You plug it into an open-source agent like **OpenCode** or **Cline** and get the same plan-act-check loop at a much lower cost. Its weights are open, but the models are so large that running them on a personal computer isn’t practical for beginners.',
          },
        },
      ],
    },
    {
      id: 'access-iran',
      title: { fa: 'دسترسی و پرداخت از ایران', en: 'Access and payment from Iran' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'این بخش فقط واقعیت‌ها را از مستندات رسمی می‌گوید تا با چشم باز انتخاب کنید:',
            en: 'This section only states facts from official documents, so you can choose with your eyes open:',
          },
        },
        {
          type: 'list',
          items: [
            { fa: 'فهرست کشورهای پشتیبانی‌شده **OpenAI** (Codex) و **Anthropic** (Claude Code) ایران را شامل نمی‌شود.', en: 'The supported-country lists of **OpenAI** (Codex) and **Anthropic** (Claude Code) do not include Iran.' },
            { fa: 'شرایط استفاده **Lovable** استفاده از کشورهای تحت تحریم جامع را منع می‌کند.', en: '**Lovable**’s terms prohibit use from countries under comprehensive sanctions.' },
            { fa: 'برای **Grok** وضعیت رسمی دسترسی از ایران پیدا نشد.', en: 'For **Grok**, no official statement on access from Iran was found.' },
            { fa: '**DeepSeek** بیانیه رسمی درباره ایران ندارد؛ روش‌های شارژ آن PayPal، کارت بانکی، Alipay و WeChat Pay است.', en: '**DeepSeek** has no official statement about Iran; it tops up via PayPal, bank card, Alipay and WeChat Pay.' },
          ],
        },
        {
          type: 'callout',
          tone: 'warn',
          title: { fa: 'شرایط هر سرویس را جدی بگیرید', en: 'Take each service’s terms seriously' },
          text: {
            fa: 'استفاده از سرویسی که کشور شما را پشتیبانی نمی‌کند ممکن است به بسته شدن حساب و از دست رفتن کارتان برسد. همیشه کدتان را در GitHub یا جای دیگری که مال خودتان است نگه دارید، تا با عوض شدن ابزار، پروژه از دست نرود. مفاهیم این دوره در همه این ابزارها یکی است.',
            en: 'Using a service that doesn’t support your country can lead to a closed account and lost work. Always keep your code in GitHub or somewhere you own, so a change of tool never costs you the project. The concepts in this course are the same in every one of these tools.',
          },
        },
        {
          type: 'quiz',
          q: {
            fa: 'سحر سریع‌ترین راه تا یک سایت زنده با فرم رزرو را می‌خواهد و Database هم لازم دارد. کدام مسیر مناسب‌تر است؟',
            en: 'Sahar wants the fastest route to a live site with a booking form, and she needs a database. Which path suits her best?',
          },
          options: [
            { fa: 'فقط DeepSeek، چون از همه ارزان‌تر است', en: 'DeepSeek alone, because it is the cheapest' },
            { fa: 'Lovable، چون Backend و میزبانی آماده دارد', en: 'Lovable: backend and hosting are built in' },
            { fa: 'Grok Build، چون رایگان امتحان می‌شود', en: 'Grok Build, because it is free to try out' },
            { fa: 'هیچ‌کدام؛ اول باید برنامه‌نویسی یاد بگیرد', en: 'None; she must first learn to program' },
          ],
          answer: 1,
          explain: {
            fa: 'Lovable از گفت‌وگو، اپ زنده با Database و میزبانی آماده می‌سازد؛ بعداً هم می‌شود کد را به GitHub برد.',
            en: 'Lovable turns a conversation into a live app with a database and hosting; the code can later move to GitHub.',
          },
          why: [
            {
              fa: 'DeepSeek مدل است، نه سازنده سایت؛ کنارش یک Agent، میزبان و Database هم لازم است.',
              en: 'DeepSeek is a model, not a site builder; it still needs an agent, a host and a database.',
            },
            {
              fa: 'درست است. برای «سریع‌ترین تا زنده»، Backend و Publish داخلی Lovable بیشترین کار را برایش انجام می‌دهند.',
              en: 'Correct. For “fastest to live”, Lovable’s built-in backend and Publish do the most work for her.',
            },
            {
              fa: 'Grok Build یک Agent ترمینال است؛ میزبانی و Database را باید جدا بچیند.',
              en: 'Grok Build is a terminal agent; she would still set up hosting and a database separately.',
            },
            {
              fa: 'لازم نیست. هدف همین دوره ساختن بدون پیش‌زمینه برنامه‌نویسی است.',
              en: 'Not needed. Building without a programming background is exactly what this course is for.',
            },
          ],
        },
        {
          type: 'links',
          items: [
            { label: 'Lovable: pricing', url: 'https://lovable.dev/pricing' },
            { label: 'Lovable: publish', url: 'https://docs.lovable.dev/features/publish' },
            { label: 'Lovable: GitHub sync', url: 'https://docs.lovable.dev/integrations/github' },
            { label: 'Lovable: host elsewhere', url: 'https://docs.lovable.dev/tips-tricks/external-deployment-hosting' },
            { label: 'Lovable: terms', url: 'https://lovable.dev/terms' },
            { label: 'OpenAI: Codex', url: 'https://developers.openai.com/codex' },
            { label: 'OpenAI: Codex and your plan', url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan' },
            { label: 'OpenAI: supported countries', url: 'https://help.openai.com/en/articles/7947663-chatgpt-supported-countries' },
            { label: 'Claude Code overview', url: 'https://code.claude.com/docs/en/overview' },
            { label: 'Anthropic: supported countries', url: 'https://www.anthropic.com/supported-countries' },
            { label: 'xAI: Grok Build', url: 'https://x.ai/cli' },
            { label: 'DeepSeek: pricing', url: 'https://api-docs.deepseek.com/quick_start/pricing' },
            { label: 'DeepSeek: OpenCode', url: 'https://api-docs.deepseek.com/quick_start/agent_integrations/opencode/' },
            { label: 'Cloudflare: TanStack Start', url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/' },
          ],
        },
        {
          type: 'review',
          title: { fa: 'مرور پرده اول', en: 'Act I review' },
          items: [
            {
              q: {
                fa: 'وقتی با Agent کار می‌کنید، کدام کار همچنان با خود شماست؟',
                en: 'When you work with an agent, which job is still yours?',
              },
              options: [
                { fa: 'تصمیم نهایی و بازبینی کار Agent', en: 'Final decisions and reviewing work' },
                { fa: 'نوشتن تک‌تک خط‌های کد پروژه', en: 'Writing every single line of the code' },
                { fa: 'راه‌اندازی دستی سرورها', en: 'Setting up the servers by hand' },
                { fa: 'هیچ کاری؛ همه کارها با Agent است', en: 'Nothing at all; the agent does it all' },
              ],
              answer: 0,
              explain: {
                fa: 'Agent بیشتر نقش‌ها را انجام می‌دهد، اما کارگردان شمایید: هدف، تصمیم و تأیید نهایی.',
                en: 'The agent covers most roles, but you are the director: goal, decisions and final approval.',
              },
              why: [
                { fa: 'درست است. چشم انسان روی نتیجه، کیفیت را تضمین می‌کند.', en: 'Correct. Your eyes on the result are what keep quality high.' },
                { fa: 'نوشتن کد همان کاری است که به Agent می‌سپارید.', en: 'Writing code is exactly what you hand to the agent.' },
                { fa: 'در مسیر این دوره، سروری را دستی راه نمی‌اندازید؛ Cloudflare و Agent این کار را می‌کنند.', en: 'On this course’s path you don’t set up servers by hand; Cloudflare and the agent do.' },
                { fa: 'Agentها اشتباه می‌کنند؛ بدون بازبینی شما، اشتباه‌ها منتشر می‌شوند.', en: 'Agents make mistakes; without your review, the mistakes get published.' },
              ],
            },
            {
              q: {
                fa: 'Nameserverهای دامنه را کجا عوض می‌کنید؟',
                en: 'Where do you change your domain’s nameservers?',
              },
              options: [
                { fa: 'در تنظیمات مرورگر خودتان', en: 'In your own browser settings' },
                { fa: 'در Repository پروژه در GitHub', en: 'In the project’s GitHub repository' },
                { fa: 'در فایل `wrangler.jsonc` پروژه', en: 'In the project’s `wrangler.jsonc` file' },
                { fa: 'در Registrar محل خرید دامنه', en: 'At the registrar where you bought it' },
              ],
              answer: 3,
              explain: {
                fa: 'Registrar همان جایی است که دامنه را خریده‌اید؛ Nameserverها را آنجا به Cloudflare می‌سپارید.',
                en: 'The registrar is where you bought the domain; that is where you point the nameservers to Cloudflare.',
              },
              why: [
                { fa: 'مرورگر فقط جواب DNS را می‌پرسد؛ تعیین نمی‌کند چه کسی جواب بدهد.', en: 'The browser only asks for DNS answers; it doesn’t decide who answers.' },
                { fa: 'GitHub جای کد است، نه تنظیمات دامنه.', en: 'GitHub holds code, not domain settings.' },
                { fa: 'این فایل تنظیمات انتشار Worker است و Nameserver را عوض نمی‌کند.', en: 'That file configures the Worker deploy; it doesn’t change nameservers.' },
                { fa: 'درست است. Registry هم از طریق Registrar باخبر می‌شود.', en: 'Correct. The registry learns about it through the registrar.' },
              ],
            },
            {
              q: {
                fa: 'یک Commit در Git دقیقاً چیست؟',
                en: 'What exactly is a commit in Git?',
              },
              options: [
                { fa: 'نسخه زنده سایت روی اینترنت', en: 'The live version of the site online' },
                { fa: 'عکسی ذخیره‌شده از کد با توضیح', en: 'A saved snapshot of code with a note' },
                { fa: 'درخواست ادغام یک شاخه در main', en: 'A request to merge a branch into main' },
                { fa: 'یک نسخه پشتیبان از کل Database', en: 'A backup copy of the whole database' },
              ],
              answer: 1,
              explain: {
                fa: 'هر Commit یک لحظه ذخیره‌شده از پروژه است که همیشه می‌شود به آن برگشت.',
                en: 'Each commit is a saved moment of the project you can always return to.',
              },
              why: [
                { fa: 'نسخه زنده حاصل انتشار است؛ Commit فقط در تاریخچه Git ثبت می‌شود.', en: 'The live version comes from a deploy; a commit only lives in Git history.' },
                { fa: 'درست است. پیام Commit می‌گوید چه چیزی و چرا تغییر کرد.', en: 'Correct. The commit message says what changed and why.' },
                { fa: 'این تعریف Pull Request است، نه Commit.', en: 'That describes a pull request, not a commit.' },
                { fa: 'Git کد را نسخه‌بندی می‌کند؛ پشتیبان Database جداست.', en: 'Git versions code; database backups are separate.' },
              ],
            },
            {
              q: {
                fa: 'عکس‌هایی که مشتری‌های کافه آپلود می‌کنند کجا ذخیره شوند؟',
                en: 'Where should photos uploaded by café customers be stored?',
              },
              options: [
                { fa: 'D1، چون Database اصلی است', en: 'D1, because it is the main database' },
                { fa: 'KV، چون همه‌جا سریع است', en: 'KV, because it is fast everywhere' },
                { fa: 'R2، چون انبار فایل است', en: 'R2, because it is file storage' },
                { fa: 'داخل کد سایت در GitHub', en: 'Inside the site code on GitHub' },
              ],
              answer: 2,
              explain: {
                fa: 'R2 برای فایل‌ها ساخته شده: عکس، ویدیو، PDF.',
                en: 'R2 is built for files: photos, videos, PDFs.',
              },
              why: [
                { fa: 'D1 برای داده‌های جدولی مثل رزروهاست، نه فایل‌های بزرگ.', en: 'D1 is for table data like bookings, not large files.' },
                { fa: 'KV برای مقدارهای کوچک مثل تنظیمات است.', en: 'KV is for small values like settings.' },
                { fa: 'درست است. نشانی فایل را می‌شود در D1 نگه داشت و خود فایل را در R2.', en: 'Correct. Keep the file’s address in D1 and the file itself in R2.' },
                { fa: 'فایل‌های کاربران نباید در Repository بروند؛ هم حجیم‌اند هم خصوصی.', en: 'User files don’t belong in the repository; they’re large and private.' },
              ],
            },
            {
              q: {
                fa: 'چه چیزی یک Agent را از یک چت‌بات ساده جدا می‌کند؟',
                en: 'What sets an agent apart from a plain chatbot?',
              },
              options: [
                { fa: 'جواب‌های طولانی‌تر و دقیق‌تری به شما می‌دهد', en: 'It gives longer, more detailed answers' },
                { fa: 'مدل زبانی کاملاً متفاوتی دارد', en: 'It runs a completely different model' },
                { fa: 'فقط روی کامپیوتر شخصی شما اجرا می‌شود', en: 'It only runs on a personal computer' },
                { fa: 'کار را با ابزارها انجام و بررسی می‌کند', en: 'It acts with tools and checks results' },
              ],
              answer: 3,
              explain: {
                fa: 'Agent برنامه می‌ریزد، با ابزارها (ترمینال، فایل، Git) اقدام می‌کند، نتیجه را می‌بیند و تکرار می‌کند.',
                en: 'An agent plans, acts with tools (terminal, files, Git), observes the result and repeats.',
              },
              why: [
                { fa: 'طول جواب ربطی ندارد؛ فرق در «انجام دادن» است.', en: 'Answer length isn’t it; the difference is doing the work.' },
                { fa: 'معمولاً روی همان نوع مدل زبانی ساخته شده؛ لایه ابزار و حلقه کار فرق دارد.', en: 'It is usually built on the same kind of model; the tools and work loop differ.' },
                { fa: 'Codex و Claude Code در وب و ابر هم کار می‌کنند.', en: 'Codex and Claude Code also run on the web and in the cloud.' },
                { fa: 'درست است. همین حلقه «برنامه، اقدام، بررسی» آن را Agent می‌کند.', en: 'Correct. That plan-act-check loop is what makes it an agent.' },
              ],
            },
          ],
        },
      ],
    },
  ],
  connects: {
    fa: 'فصل قبل Codex و Claude Code را معرفی کرد؛ اینجا مسیر خودتان را انتخاب کردید. از پرده دوم به بعد، هر جا قدم‌ها فرق کند، دو زبانه «Codex» و «Lovable» می‌بینید و انتخاب شما خودکار نشان داده می‌شود.',
    en: 'The previous chapter introduced Codex and Claude Code; here you chose your own path. From Act II on, wherever steps differ you’ll see “Codex” and “Lovable” tabs, with your choice shown automatically.',
  },
  takeaways: [
    { fa: 'Codex: کنترل بیشتر، کد در Repository شما، میزبانی دلخواه.', en: 'Codex: more control, code in your repository, hosting of your choice.' },
    { fa: 'Lovable: سریع‌ترین تا اپ زنده، با Backend و میزبانی داخلی.', en: 'Lovable: fastest to a live app, with built-in backend and hosting.' },
    { fa: 'این دو با هم کار می‌کنند: Lovable → GitHub → Codex → Cloudflare.', en: 'They combine: Lovable → GitHub → Codex → Cloudflare.' },
    { fa: 'DeepSeek داخل یک Agent متن‌باز، راه کم‌هزینه است؛ Claude Code و Grok گزینه‌های جایگزین‌اند.', en: 'DeepSeek inside an open-source agent is the low-cost route; Claude Code and Grok are alternatives.' },
  ],
};

/* ─────────────────────────────────────────────────────────────
   Be found: launch lesson (QA-26). Titles, share cards, sitemap,
   Search Console, analytics, speed, Persian SEO, real URLs.
   ───────────────────────────────────────────────────────────── */
export const beFound: Chapter = {
  slug: 'be-found',
  act: 4,
  icon: 'globe',
  title: { fa: 'پیدا شدن: گوگل، کارت اشتراک و آمار', en: 'Be found: search, share cards and stats' },
  tagline: {
    fa: 'تا کسی پیدایتان نکند، سایت زنده هم دیده نمی‌شود',
    en: 'A live site nobody can find is still invisible',
  },
  minutes: 13,
  mascotLine: {
    fa: 'کافه سحر حالا روی دامنه خودش است. بیایید کاری کنیم گوگل پیدایش کند و لینکش در تلگرام یک کارت قشنگ نشان بدهد.',
    en: 'Café Sahar is on its own domain now. Let’s make Google find it and give its link a lovely card in Telegram.',
  },
  mission: {
    outcome: {
      fa: 'سایت شما عنوان و توضیح درست، کارت اشتراک، Sitemap و آمار بازدید دارد و در Google Search Console ثبت شده است.',
      en: 'Your site has proper titles and descriptions, share cards, a sitemap and visitor stats, and is registered in Google Search Console.',
    },
    cafe: {
      fa: 'کافه سحر در گوگل پیدا می‌شود و لینکش در تلگرام و واتس‌اپ یک کارت زیبا نشان می‌دهد.',
      en: 'Café Sahar shows up on Google, and its link shows a lovely card in Telegram and WhatsApp.',
    },
  },
  warmup: {
    q: {
      fa: 'وقتی یک Custom Domain را به Worker وصل می‌کنید، رکورد DNS و گواهی HTTPS را چه کسی می‌سازد؟',
      en: 'When you attach a Custom Domain to a Worker, who creates the DNS record and HTTPS certificate?',
    },
    options: [
      { fa: 'خودتان، دستی در پنل Registrar', en: 'You, by hand at the registrar' },
      { fa: 'Cloudflare، به‌صورت خودکار', en: 'Cloudflare, automatically' },
      { fa: 'مرورگر، در اولین بازدید', en: 'The browser, on the first visit' },
    ],
    answer: 1,
    explain: {
      fa: 'با Custom Domain، Cloudflare هم رکورد DNS را می‌سازد و هم گواهی را صادر و تمدید می‌کند.',
      en: 'With a Custom Domain, Cloudflare creates the DNS record and issues and renews the certificate.',
    },
    why: [
      { fa: 'در Registrar فقط Nameserverها را عوض کردید؛ بقیه با Cloudflare است.', en: 'At the registrar you only changed the nameservers; the rest is Cloudflare’s job.' },
      { fa: 'درست است. برای همین بعد از وصل کردن، قفل HTTPS خودکار ظاهر می‌شود.', en: 'Correct. That is why the HTTPS padlock appears automatically after attaching it.' },
      { fa: 'مرورگر فقط گواهی را بررسی می‌کند؛ آن را نمی‌سازد.', en: 'The browser only checks the certificate; it doesn’t create one.' },
    ],
  },
  sections: [
    {
      id: 'why-be-found',
      title: { fa: 'چرا پیدا شدن مهم است', en: 'Why being findable matters' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'سایت کافه سحر زنده است، اما هنوز فقط کسی آن را می‌بیند که آدرسش را دارد. بیشتر مشتری‌های تازه از دو راه می‌آیند: **جست‌وجو** (گوگل، بینگ و حالا دستیارهای هوش مصنوعی) و **لینکی که کسی برایشان فرستاده** (تلگرام، واتس‌اپ، اینستاگرام). این فصل هر دو را درست می‌کند.',
            en: 'Café Sahar’s site is live, but only people with the address can see it. Most new customers arrive two ways: **search** (Google, Bing and now AI assistants) and **a link someone sent them** (Telegram, WhatsApp, Instagram). This chapter fixes both.',
          },
        },
        {
          type: 'callout',
          tone: 'why',
          text: {
            fa: 'موتورهای جست‌وجو و اپ‌های پیام‌رسان صفحه را مثل آدم نمی‌بینند؛ چند برچسب مشخص در HTML را می‌خوانند. اگر آن برچسب‌ها نباشند یا همه صفحه‌ها یکی باشند، کافه شما در جست‌وجو گم می‌شود و لینکش یک مستطیل خالی نشان می‌دهد.',
            en: 'Search engines and messaging apps don’t see a page the way people do; they read a few specific tags in the HTML. If those tags are missing, or identical on every page, your café gets lost in search and its link shows an empty box.',
          },
        },
        {
          type: 'terms',
          items: [
            { term: 'SEO', def: { fa: 'بهینه‌سازی برای موتور جست‌وجو: کارهایی که کمک می‌کند سایت شما در نتایج گوگل و بینگ دیده شود.', en: 'Search engine optimization: the work that helps your site appear in Google and Bing results.' } },
            { term: '<title>', def: { fa: 'عنوان صفحه؛ در تب مرورگر و به‌شکل لینک آبی در نتایج جست‌وجو نمایش داده می‌شود.', en: 'The page title; shown in the browser tab and as the blue link in search results.' } },
            { term: 'meta description', def: { fa: 'یک خلاصه کوتاه از صفحه که گوگل ممکن است زیر عنوان نشان دهد.', en: 'A short summary of the page that Google may show under the title.' } },
            { term: 'Open Graph', def: { fa: 'برچسب‌های `og:` که به تلگرام، واتس‌اپ و دیگران می‌گویند کارت اشتراک چه عنوان، توضیح و تصویری داشته باشد.', en: 'The `og:` tags that tell Telegram, WhatsApp and others which title, description and image to show on a share card.' } },
            { term: 'sitemap.xml', def: { fa: 'فهرست همه صفحه‌های سایت برای موتورهای جست‌وجو.', en: 'A list of every page on your site, for search engines.' } },
            { term: 'robots.txt', def: { fa: 'فایلی که می‌گوید ربات‌های جست‌وجو کدام بخش‌ها را بخزند یا نخزند.', en: 'A file telling search crawlers which parts to crawl or skip.' } },
            { term: 'Core Web Vitals', def: { fa: 'سه سنجه سرعت و تجربه کاربر از گوگل: LCP، INP و CLS.', en: 'Google’s three speed and experience measures: LCP, INP and CLS.' } },
          ],
        },
      ],
    },
    {
      id: 'titles-and-cards',
      title: { fa: 'عنوان، توضیح و کارت اشتراک', en: 'Titles, descriptions and share cards' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: 'هر صفحه باید یک `<title>` و یک `meta description` **مخصوص خودش** داشته باشد. صفحه منو یک عنوان، صفحه رزرو یک عنوان دیگر. عنوان را کوتاه و روشن بنویسید، مثلاً «منوی کافه سحر · قهوه و کیک خانگی»، و توضیح را در یک یا دو جمله که مشتری را به کلیک دعوت کند.',
            en: 'Every page needs its **own** `<title>` and `meta description`. The menu page gets one title, the booking page another. Keep titles short and clear, e.g. “Café Sahar menu · coffee and homemade cake”, and write the description as one or two sentences that invite a click.',
          },
        },
        {
          type: 'p',
          text: {
            fa: 'برای کارت اشتراک، برچسب‌های **Open Graph** را اضافه کنید: `og:title`، `og:description`، `og:image` و `og:url`. تصویر کارت معمولاً ۱۲۰۰ در ۶۳۰ پیکسل است. برای X (توییتر) هم `twitter:card` با مقدار `summary_large_image` را بگذارید.',
            en: 'For share cards, add the **Open Graph** tags: `og:title`, `og:description`, `og:image` and `og:url`. The card image is usually 1200×630 pixels. For X (Twitter), also add `twitter:card` with the value `summary_large_image`.',
          },
        },
        {
          type: 'code',
          lang: 'html',
          code: '<title>منوی کافه سحر · قهوه و کیک خانگی</title>\n<meta name="description" content="منوی روز کافه سحر با قهوه دمی، کیک خانگی و صبحانه. هر روز ۸ صبح تا ۱۱ شب." />\n<meta property="og:title" content="منوی کافه سحر" />\n<meta property="og:description" content="قهوه دمی، کیک خانگی و صبحانه؛ هر روز ۸ تا ۲۳." />\n<meta property="og:image" content="https://cafe-sahar.ir/og/menu.png" />\n<meta property="og:url" content="https://cafe-sahar.ir/menu" />\n<meta name="twitter:card" content="summary_large_image" />',
          caption: { fa: 'برچسب‌های یک صفحه منو؛ هر صفحه مقدارهای خودش را دارد.', en: 'Tags for a menu page; every page has its own values.' },
        },
        {
          type: 'callout',
          tone: 'fix',
          title: { fa: 'چرا این دوره به آدرس‌های واقعی کوچ کرد', en: 'Why this course moved to real URLs' },
          text: {
            fa: 'نسخه اول همین سایت آدرس‌هایی مثل `/#/c/cloudflare` داشت. هر چیزی بعد از `#` اصلاً به سرور فرستاده نمی‌شود؛ پس سرور نمی‌تواند برای هر فصل عنوان و کارت جدا بفرستد و گوگل همه فصل‌ها را یک صفحه می‌بیند. برای همین به آدرس‌های واقعی مثل `/c/cloudflare` رفتیم و Worker برای هر فصل برچسب‌های خودش را در HTML می‌گذارد. ربات تلگرام هم JavaScript اجرا نمی‌کند؛ برچسب‌ها باید از همان اول در HTML باشند.',
            en: 'The first version of this very site used addresses like `/#/c/cloudflare`. Anything after `#` is never sent to the server, so the server can’t send a separate title and card per chapter, and Google sees all chapters as one page. That’s why we moved to real URLs like `/c/cloudflare`, with the Worker putting each chapter’s tags into the HTML. Telegram’s link preview doesn’t run JavaScript either; the tags must be in the HTML from the start.',
          },
        },
      ],
    },
    {
      id: 'sitemap-console',
      title: { fa: 'Sitemap، robots.txt و Search Console', en: 'Sitemap, robots.txt and Search Console' },
      blocks: [
        {
          type: 'steps',
          items: [
            {
              title: { fa: 'sitemap.xml بسازید', en: 'Create sitemap.xml' },
              text: { fa: 'فهرست همه صفحه‌های عمومی با آدرس کامل؛ با هر صفحه تازه به‌روز شود.', en: 'List every public page with its full address; update it with each new page.' },
            },
            {
              title: { fa: 'robots.txt را بررسی کنید', en: 'Check robots.txt' },
              text: { fa: 'مطمئن شوید صفحه‌های اصلی بسته نیستند و آدرس Sitemap در آن آمده است.', en: 'Make sure the main pages aren’t blocked and the sitemap address is listed in it.' },
            },
            {
              title: { fa: 'ثبت در Google Search Console', en: 'Register in Google Search Console' },
              text: { fa: 'یک Domain property بسازید؛ گوگل یک رکورد TXT می‌دهد که در DNS کافه روی Cloudflare اضافه می‌کنید.', en: 'Add a Domain property; Google gives you a TXT record to add to the café’s DNS on Cloudflare.' },
            },
            {
              title: { fa: 'Sitemap را معرفی کنید', en: 'Submit the sitemap' },
              text: { fa: 'در Search Console آدرس `sitemap.xml` را ثبت کنید و گزارش «صفحه‌ها» را ببینید.', en: 'Submit the `sitemap.xml` address in Search Console and watch the Pages report.' },
            },
            {
              title: { fa: 'بینگ را هم فراموش نکنید', en: 'Don’t forget Bing' },
              text: { fa: 'Bing Webmaster Tools می‌تواند سایت را مستقیم از Search Console وارد کند.', en: 'Bing Webmaster Tools can import your site straight from Search Console.' },
            },
          ],
        },
        {
          type: 'path',
          codex: [
            {
              type: 'p',
              text: {
                fa: 'از Codex بخواهید برای هر صفحه عنوان، توضیح و برچسب‌های Open Graph بگذارد، تصویر کارت بسازد، `sitemap.xml` و `robots.txt` را تولید کند و یک تست بنویسد که نبودن این برچسب‌ها را بگیرد. اگر سایت تک‌صفحه‌ای (SPA) است، از او بخواهید برچسب‌ها را در Worker به HTML هر آدرس اضافه کند، نه فقط با JavaScript.',
                en: 'Ask Codex to give every page a title, description and Open Graph tags, generate card images, produce `sitemap.xml` and `robots.txt`, and write a test that fails if these tags go missing. If the site is a single-page app (SPA), ask it to add the tags to each address’s HTML in the Worker, not only with JavaScript.',
              },
            },
          ],
          lovable: [
            {
              type: 'p',
              text: {
                fa: 'در Lovable، از **More → Analytics** به زبانه **SEO & AI** بروید و بررسی را اجرا کنید. این بررسی Sitemap، `robots.txt`، برچسب‌ها، داده ساخت‌یافته و آمادگی برای جست‌وجوی هوش مصنوعی را می‌سنجد و بیشتر ایرادها را با یک کلیک درست می‌کند (اعتبار مصرف می‌شود). Lovable برای هر پروژه `robots.txt` می‌سازد، اما Sitemap را نه همیشه، و برچسب‌های اولیه کلی‌اند. فقط اپ‌های **منتشرشده عمومی** در جست‌وجو می‌آیند؛ برای حضور واقعی، دامنه اختصاصی وصل کنید. Search Console را هم از همان زبانه وصل کنید.',
                en: 'In Lovable, open **More → Analytics**, go to the **SEO & AI** tab and run the review. It checks your sitemap, `robots.txt`, metadata, structured data and AI-search readiness, and can fix most findings in one click (credits apply). Lovable creates `robots.txt` for every project, but not always a sitemap, and the starting metadata is generic. Only **publicly published** apps appear in search; connect a custom domain to build real presence. You can connect Search Console from the same tab.',
              },
            },
          ],
        },
        {
          type: 'prompt',
          title: { fa: 'یک دور SEO برای کافه سحر', en: 'An SEO pass for Café Sahar' },
          text: {
            fa: 'برای سایت کافه سحر (https://cafe-sahar.ir) یک دور SEO انجام بده:\n۱. برای هر صفحه یک <title> و meta description مخصوص، به فارسی.\n۲. برچسب‌های Open Graph و twitter:card برای هر صفحه، با تصویر کارت ۱۲۰۰×۶۳۰.\n۳. فایل‌های sitemap.xml و robots.txt.\n۴. lang="fa" و dir="rtl" روی <html>.\n۵. یک تست که اگر صفحه‌ای عنوان یا og:image نداشت، خطا بدهد.\nبرچسب‌ها باید در خود HTML باشند، نه فقط با JavaScript اضافه شوند. اول برنامه‌ات را بگو و منتظر تأیید من بمان.',
            en: 'Do an SEO pass for the Café Sahar site (https://cafe-sahar.ir):\n1. A unique <title> and meta description for every page, in Persian.\n2. Open Graph and twitter:card tags for every page, with a 1200×630 card image.\n3. sitemap.xml and robots.txt files.\n4. lang="fa" and dir="rtl" on <html>.\n5. A test that fails if any page lacks a title or og:image.\nThe tags must be in the HTML itself, not only added by JavaScript. Tell me your plan first and wait for my approval.',
          },
        },
      ],
    },
    {
      id: 'measure-and-speed',
      title: { fa: 'آمار بازدید و سرعت', en: 'Visitor stats and speed' },
      blocks: [
        {
          type: 'p',
          text: {
            fa: '**Cloudflare Web Analytics** آمار بازدید را بدون کوکی و بدون دنبال کردن کاربران نشان می‌دهد: چند نفر آمدند، از کجا، و کدام صفحه‌ها را دیدند. برای سایتی که روی Cloudflare است، فعال کردنش چند کلیک است.',
            en: '**Cloudflare Web Analytics** shows visitor stats without cookies and without tracking people: how many came, from where, and which pages they viewed. For a site on Cloudflare, turning it on takes a few clicks.',
          },
        },
        {
          type: 'p',
          text: {
            fa: 'سرعت هم بخشی از پیدا شدن است. گوگل سه سنجه **Core Web Vitals** را می‌سنجد: **LCP** (بزرگ‌ترین بخش صفحه چقدر زود دیده می‌شود)، **INP** (صفحه چقدر سریع به کلیک جواب می‌دهد) و **CLS** (چقدر چیزها هنگام بارگذاری جابه‌جا می‌شوند). عکس‌های بزرگ کافه را فشرده کنید و از Agent بخواهید گزارش Lighthouse بگیرد.',
            en: 'Speed is part of being found too. Google measures three **Core Web Vitals**: **LCP** (how soon the largest part of the page shows), **INP** (how fast the page responds to a tap) and **CLS** (how much things jump around while loading). Compress the café’s big photos and ask the agent for a Lighthouse report.',
          },
        },
        {
          type: 'quiz',
          q: {
            fa: 'لینک کافه سحر در تلگرام فقط یک مستطیل خالی نشان می‌دهد. محتمل‌ترین علت چیست؟',
            en: 'Café Sahar’s link shows only an empty box in Telegram. What is the most likely cause?',
          },
          options: [
            { fa: 'سرعت سایت برای تلگرام خیلی کند است', en: 'The site is far too slow for Telegram' },
            { fa: 'فایل robots.txt کل سایت را بسته است', en: 'robots.txt is blocking the whole site' },
            { fa: 'برچسب‌های og: در HTML صفحه نیستند', en: 'The og: tags are missing from the HTML' },
            { fa: 'دامنه هنوز گواهی HTTPS نگرفته است', en: 'The domain has no HTTPS certificate yet' },
          ],
          answer: 2,
          explain: {
            fa: 'تلگرام کارت را از برچسب‌های Open Graph در HTML می‌سازد؛ JavaScript هم اجرا نمی‌کند.',
            en: 'Telegram builds the card from the Open Graph tags in the HTML, and it doesn’t run JavaScript.',
          },
          why: [
            { fa: 'کندی ممکن است پیش‌نمایش را دیر کند، اما معمولاً علت کارت خالی نیست.', en: 'Slowness can delay a preview, but it usually isn’t why the card is empty.' },
            { fa: 'ممکن است، اما کمتر رایج است؛ اول برچسب‌ها را بررسی کنید.', en: 'Possible but less common; check the tags first.' },
            { fa: 'درست است. اگر برچسب‌ها فقط با JavaScript اضافه شوند هم همین اتفاق می‌افتد.', en: 'Correct. The same happens if the tags are only added by JavaScript.' },
            { fa: 'با Custom Domain، Cloudflare گواهی را خودکار صادر می‌کند؛ این علت کارت خالی نیست.', en: 'With a Custom Domain, Cloudflare issues the certificate automatically; that isn’t the cause.' },
          ],
        },
      ],
    },
    {
      id: 'persian-seo',
      title: { fa: 'نکته‌های SEO فارسی', en: 'Persian SEO notes' },
      blocks: [
        {
          type: 'list',
          items: [
            { fa: 'روی تگ `<html>` حتماً `lang="fa"` و `dir="rtl"` بگذارید تا موتورها و صفحه‌خوان‌ها زبان را درست بفهمند.', en: 'Always set `lang="fa"` and `dir="rtl"` on `<html>` so search engines and screen readers understand the language.' },
            { fa: 'آدرس صفحه‌ها (Slug) را لاتین و کوتاه نگه دارید، مثل `/menu`. آدرس فارسی هنگام کپی در خیلی از اپ‌ها به رشته‌ای طولانی از `%D9...` تبدیل می‌شود.', en: 'Keep page addresses (slugs) short and Latin, like `/menu`. Persian addresses often turn into long `%D9...` strings when copied in many apps.' },
            { fa: 'اگر سایت دوزبانه است، برای هر زبان آدرس جدا بگذارید و با برچسب‌های `hreflang` به هم معرفی‌شان کنید.', en: 'If the site is bilingual, give each language its own address and link them with `hreflang` tags.' },
            { fa: 'متن واقعی فارسی بنویسید، نه متن داخل عکس؛ موتورها متن داخل عکس را نمی‌خوانند. برای هر عکس `alt` فارسی بگذارید.', en: 'Write real Persian text, not text inside images; search engines don’t read text in pictures. Give every image a Persian `alt`.' },
            { fa: 'از «ی» و «ک» فارسی و نیم‌فاصله درست استفاده کنید تا جست‌وجوهای مردم با متن شما جور شود.', en: 'Use Persian «ی» and «ک» and proper half-spaces, so people’s searches match your text.' },
          ],
        },
        {
          type: 'callout',
          tone: 'tip',
          title: { fa: 'صبور باشید', en: 'Be patient' },
          text: {
            fa: 'دیده شدن در گوگل چند روز تا چند هفته طول می‌کشد. بعد از ثبت در Search Console، گزارش‌ها را هفته‌ای یک بار نگاه کنید و صفحه‌های مفید تازه اضافه کنید؛ مثلاً معرفی هر نوشیدنی کافه.',
            en: 'Showing up on Google takes days to weeks. After registering in Search Console, check the reports once a week and keep adding useful pages, such as one per café drink.',
          },
        },
        {
          type: 'links',
          items: [
            { label: 'Google: SEO starter guide', url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide' },
            { label: 'Google: sitemaps', url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview' },
            { label: 'Google: robots.txt', url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro' },
            { label: 'Google Search Console', url: 'https://search.google.com/search-console/about' },
            { label: 'Bing Webmaster Tools', url: 'https://www.bing.com/webmasters/about' },
            { label: 'The Open Graph protocol', url: 'https://ogp.me/' },
            { label: 'Cloudflare Web Analytics', url: 'https://developers.cloudflare.com/web-analytics/' },
            { label: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
            { label: 'Lovable: SEO and AI search', url: 'https://docs.lovable.dev/features/seo' },
          ],
        },
      ],
    },
  ],
  connects: {
    fa: 'در فصل قبل کافه روی دامنه خودش رفت؛ اینجا کاری کردید که دیده شود. فصل بعد درباره امنیت و نگهداری است تا این سایت دیده‌شده، سالم هم بماند.',
    en: 'In the previous chapter the café moved to its own domain; here you made it visible. The next chapter covers security and upkeep, so this now-visible site stays healthy.',
  },
  takeaways: [
    { fa: 'هر صفحه، عنوان و توضیح مخصوص خودش.', en: 'Every page gets its own title and description.' },
    { fa: 'کارت اشتراک از برچسب‌های og: در HTML ساخته می‌شود، نه با JavaScript.', en: 'Share cards come from og: tags in the HTML, not from JavaScript.' },
    { fa: 'Sitemap بسازید و سایت را در Search Console و Bing ثبت کنید.', en: 'Make a sitemap and register the site in Search Console and Bing.' },
    { fa: 'آمار بدون کوکی با Cloudflare Web Analytics، و سرعت را با Core Web Vitals بسنجید.', en: 'Cookie-free stats with Cloudflare Web Analytics; measure speed with Core Web Vitals.' },
    { fa: 'آدرس‌های واقعی، نه #؛ Slug لاتین و کوتاه.', en: 'Real URLs, not #; short Latin slugs.' },
  ],
};
