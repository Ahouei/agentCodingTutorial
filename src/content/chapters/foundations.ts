import type { Chapter } from '../types';

export const foundations: Chapter[] = [
  // ───────────────────────────────────────────── 1. Welcome
  {
    slug: 'welcome',
    act: 1,
    icon: 'spark',
    voice: '/audio/voice1.mp3',
    title: { fa: 'سلام! از صفر تا قهرمان', en: 'Hello! From zero to hero' },
    tagline: {
      fa: 'قرار است با یک AI Agent، سایت واقعی بسازید و منتشر کنید',
      en: 'You are about to build and publish real websites with an AI agent',
    },
    minutes: 8,
    mascotLine: {
      fa: 'سلام! من «بیت» هستم، همسفر کوچک شما. قول می‌دهم آخر این مسیر، سایت خودتان را روی دامنه خودتان ببینیم.',
      en: "Hi! I'm Bit, your tiny travel buddy. By the end of this trip, we'll see your own site live on your own domain.",
    },
    sections: [
      {
        id: 'where-we-are-heading',
        title: { fa: 'قرار است به کجا برسیم؟', en: 'Where we are heading' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'این دوره برای کسی است که یک ایده دارد (یک وبسایت شخصی، یک فروشگاه کوچک، یک Web App برای کار خودش یا مشتری‌اش) ولی **برنامه‌نویس، طراح یا مدیر سرور نیست**. هدف این است که در پایان مسیر بتوانید با کمک یک AI Agent، یک پروژه واقعی را از ایده تا انتشار روی دامنه اختصاصی جلو ببرید و بعد هم نگهش دارید.',
              en: "This course is for anyone with an idea (a personal site, a small shop, a web app for their own work or a client) who is **not a programmer, designer or server admin**. By the end, you'll be able to take a real project from idea to a live site on your own domain with an AI agent, and keep it running afterwards.",
            },
          },
          {
            type: 'p',
            text: {
              fa: 'رویکرد ما **Vibe Coding** است: شما با زبان عادی توضیح می‌دهید چه می‌خواهید، Agent کد را می‌نویسد، اجرا می‌کند، تست می‌کند و منتشر می‌کند؛ و شما نتیجه را می‌بینید، بازخورد می‌دهید و تصمیم می‌گیرید. لازم نیست تک‌تک خط‌های کد را بفهمید، ولی باید **بفهمید هر قطعه چه کاری می‌کند و چرا وجود دارد**.',
              en: "Our approach is **vibe coding**: you describe what you want in plain language, the agent writes the code, runs it, tests it and ships it, and you look at the result, give feedback and make the calls. You don't need to understand every line of code, but you do need to **understand what each piece does and why it exists**.",
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: 'بفهمید یک وبسایت از چه قطعه‌هایی ساخته شده: Frontend، Backend، Database، Hosting، Domain و DNS.',
                en: 'Understand the pieces a website is made of: frontend, backend, database, hosting, domain and DNS.',
              },
              {
                fa: 'حساب‌ها و ابزارهای لازم را آماده کنید و Agent را به‌صورت امن به GitHub و Cloudflare وصل کنید.',
                en: 'Set up the accounts and tools you need, and connect your agent safely to GitHub and Cloudflare.',
              },
              {
                fa: 'پروژه را درست تعریف کنید، Prompt خوب بنویسید و طرح اولیه را بررسی و تأیید کنید.',
                en: 'Define the project well, write good prompts, and review and approve a first design.',
              },
              {
                fa: 'در یک حلقه تکرارشونده بسازید، تست کنید، Deploy کنید و سایت را روی دامنه خودتان امن نگه دارید.',
                en: 'Build in a repeating loop, test, deploy, and keep the site secure on your own domain.',
              },
            ],
          },
        ],
      },
      {
        id: 'old-way-new-way',
        title: { fa: 'دیروز یک تیم، امروز شما و یک Agent', en: 'Yesterday a team, today you and an agent' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'تا همین چند سال پیش، ساختن یک وبسایت که از یک حدی بزرگ‌تر بود چند تخصص لازم داشت: یک نفر **طراحی** می‌کرد، یک نفر **Frontend** را پیاده می‌کرد، یک نفر **Backend** را می‌نوشت، یک نفر سایت را روی سرور **Deploy** می‌کرد، یک نفر **SEO** انجام می‌داد و یک نفر هم **پشتیبانی** می‌کرد. هر کدام از این‌ها یک شغل محترم و جدی است.',
              en: 'Until a few years ago, building any website beyond a certain size took several specialists: someone **designed** it, someone built the **frontend**, someone wrote the **backend**, someone **deployed** it to a server, someone handled **SEO**, and someone did **support**. Each of these is a real, respected profession.',
            },
          },
          {
            type: 'widget',
            id: 'team-to-agent',
          },
          {
            type: 'p',
            text: {
              fa: 'امروز بخش بزرگی از این کارها را یک **AI Agent** می‌تواند انجام دهد. ولی دقت کنید: نقش شما حذف نمی‌شود، **عوض می‌شود**. شما مدیر پروژه، صاحب محصول، بازبین و تصمیم‌گیرنده نهایی هستید. Agent سریع و پرکار است؛ شما جهت را تعیین می‌کنید.',
              en: "Today an **AI agent** can do a large share of that work. But notice: your role doesn't disappear, it **changes**. You become the project lead, the product owner, the reviewer and the final decision maker. The agent is fast and tireless; you set the direction.",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'چرا هنوز به شما نیاز است؟', en: 'Why you are still needed' },
            text: {
              fa: 'Agent نمی‌داند کسب‌وکار شما چه می‌خواهد، مخاطب‌تان کیست و «خوب» از نظر شما یعنی چه. این‌ها را فقط شما می‌دانید. هر چه تصویر روشن‌تری به Agent بدهید، نتیجه بهتری می‌گیرید.',
              en: "The agent doesn't know what your business needs, who your audience is, or what 'good' means to you. Only you know that. The clearer the picture you give it, the better the result.",
            },
          },
        ],
      },
      {
        id: 'honest-expectations',
        title: { fa: 'انتظار واقع‌بینانه: شیطان در جزئیات است', en: 'Honest expectations: the devil is in the details' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'Agent همیشه «یک چیزی» تحویل می‌دهد، ولی آن چیز همیشه خوب نیست. گاهی مدل زبانی ضعیف است، گاهی خوب توضیح نداده‌ایم، و گاهی هم همه چیز درست است ولی برداشت Agent در آن لحظه با منظور ما فرق دارد. راه‌حل، ناامید شدن نیست؛ **بازبینی و اصلاح** است.',
              en: "An agent always delivers something, but that something isn't always good. Sometimes the model is weak, sometimes we explained badly, and sometimes everything is fine yet the agent's reading of the moment differs from what we meant. The fix isn't giving up; it's **reviewing and correcting**.",
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'سه دام رایج', en: 'Three common traps' },
            text: {
              fa: '۱) قبول کردن همه چیز بدون نگاه کردن. ۲) دادن کارهای خیلی بزرگ در یک پیام. ۳) دادن دسترسی بیش از حد به Agent (مثلاً کلید کامل حساب Cloudflare). در این دوره برای هر سه، روش درست را تمرین می‌کنیم.',
              en: '1) Accepting everything without looking. 2) Asking for huge chunks of work in one message. 3) Giving the agent more access than it needs (for example, a full-access Cloudflare key). This course practises the right habit for all three.',
            },
          },
          {
            type: 'p',
            text: {
              fa: 'برای همین در این دوره روی **مفاهیم پایه** وقت می‌گذاریم. لازم نیست برنامه‌نویس شوید، ولی باید آن‌قدر بدانید که بتوانید سؤال درست بپرسید، خروجی را بسنجید و وقتی چیزی خراب شد، بفهمید کجا را نگاه کنید.',
              en: "That's why we spend time on **core concepts**. You don't need to become a programmer, but you need to know enough to ask the right question, judge the output, and know where to look when something breaks.",
            },
          },
        ],
      },
      {
        id: 'course-map',
        title: { fa: 'نقشه سفر و روش استفاده از دوره', en: 'The map, and how to use this course' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'پرده اول: دنیا را بشناس', en: 'Act I: Understand the world' },
                text: {
                  fa: 'وب چطور کار می‌کند، Domain و DNS، GitHub، Cloudflare و تفاوت Generative AI با Agentic AI.',
                  en: 'How the web works, domains and DNS, GitHub, Cloudflare, and generative versus agentic AI.',
                },
              },
              {
                title: { fa: 'پرده دوم: کارگاه را بچین', en: 'Act II: Set up the workshop' },
                text: {
                  fa: 'حساب‌ها و ابزارها را آماده می‌کنیم و Agent را با کمترین دسترسی لازم به GitHub و Cloudflare وصل می‌کنیم.',
                  en: 'Prepare accounts and tools, and connect the agent to GitHub and Cloudflare with the least access it needs.',
                },
              },
              {
                title: { fa: 'پرده سوم: بساز', en: 'Act III: Build' },
                text: {
                  fa: 'تعریف پروژه، Prompt و Agent Skills، طرح اولیه و حلقه Vibe Coding.',
                  en: 'Project brief, prompts and agent skills, a first design, and the vibe coding loop.',
                },
              },
              {
                title: { fa: 'پرده چهارم: منتشر کن', en: 'Act IV: Ship it' },
                text: {
                  fa: 'Testing، Debugging، CI/CD، دامنه اختصاصی، امنیت و نگهداری.',
                  en: 'Testing, debugging, CI/CD, your own domain, security and maintenance.',
                },
              },
            ],
          },
          {
            type: 'h',
            text: { fa: 'هر فصل را این‌طور بخوانید', en: 'Read each chapter like this' },
          },
          {
            type: 'list',
            ordered: true,
            items: [
              { fa: '**چرا**: اول بفهمید این موضوع چرا مهم است.', en: '**Why**: first understand why the topic matters.' },
              { fa: '**چطور**: ببینید در عمل چطور انجام می‌شود.', en: '**How**: see how it is done in practice.' },
              { fa: '**امتحان کنید**: با ابزار تعاملی فصل بازی کنید.', en: '**Try it**: play with the chapter’s interactive widget.' },
              { fa: '**Prompt را کپی کنید**: آن را به Agent خودتان بدهید.', en: '**Copy the prompt**: hand it to your own agent.' },
              { fa: '**کوییز**: با یک سؤال کوتاه، فهم‌تان را بسنجید.', en: '**Quiz**: check your understanding with one short question.' },
            ],
          },
          {
            type: 'terms',
            items: [
              {
                term: 'AI Agent',
                def: {
                  fa: 'هوش مصنوعی‌ای که فقط جواب نمی‌دهد؛ برنامه‌ریزی می‌کند، با ابزارها کار انجام می‌دهد و نتیجه را بررسی می‌کند.',
                  en: 'An AI that does more than answer: it plans, uses tools to do the work, and checks the result.',
                },
              },
              {
                term: 'Vibe Coding',
                def: {
                  fa: 'ساختن نرم‌افزار با توصیف خواسته به زبان عادی و هدایت Agent، به‌جای نوشتن کد با دست.',
                  en: 'Building software by describing what you want in plain language and steering an agent, rather than typing code yourself.',
                },
              },
              {
                term: 'Deploy',
                def: {
                  fa: 'منتشر کردن نسخه‌ای از پروژه روی اینترنت تا دیگران بتوانند آن را باز کنند.',
                  en: 'Publishing a version of your project to the internet so others can open it.',
                },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: 'اولین گفت‌وگو با Agent', en: 'Your first chat with an agent' },
            text: {
              fa: 'من می‌خواهم با کمک تو یک وبسایت بسازم ولی برنامه‌نویس نیستم. قبل از هر کاری، با چند سؤال کوتاه از من بپرس: هدف سایت چیست، مخاطبش کیست، چه صفحه‌هایی لازم دارد و چه حس و ظاهری باید داشته باشد. هنوز هیچ کدی ننویس؛ فقط در آخر یک خلاصه یک‌صفحه‌ای از پروژه به من بده تا تأییدش کنم.',
              en: "I want to build a website with your help, but I'm not a programmer. Before anything else, ask me a few short questions: what the site is for, who it's for, which pages it needs, and how it should look and feel. Don't write any code yet; at the end, give me a one-page summary of the project for me to approve.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: 'در Vibe Coding نقش اصلی شما چیست؟',
              en: 'In vibe coding, what is your main role?',
            },
            options: [
              { fa: 'نوشتن تک‌تک خط‌های کد', en: 'Typing every line of code' },
              { fa: 'تعیین جهت، بازبینی خروجی و تصمیم‌گیری', en: 'Setting direction, reviewing output and making decisions' },
              { fa: 'هیچ؛ Agent همه چیز را خودش درست انجام می‌دهد', en: 'Nothing; the agent gets everything right on its own' },
            ],
            answer: 1,
            explain: {
              fa: 'Agent کار اجرایی را انجام می‌دهد، ولی هدف، معیار «خوب» و تأیید نهایی با شماست. خروجی بدون بازبینی، همان دام اول است.',
              en: "The agent does the hands-on work, but the goal, the definition of 'good' and the final approval are yours. Unreviewed output is trap number one.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'OpenAI Codex documentation', url: 'https://developers.openai.com/codex' },
              { label: 'Claude Code documentation', url: 'https://code.claude.com/docs/en/overview' },
              { label: 'MDN: Learn web development', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: 'این فصل نقشه کلی سفر بود. در فصل بعد از پایه شروع می‌کنیم: وقتی یک آدرس را در مرورگر تایپ می‌کنید، واقعاً چه اتفاقی می‌افتد و یک وبسایت از چه لایه‌هایی ساخته شده است.',
      en: "This chapter was the big-picture map. Next we start from the ground: what really happens when you type an address into a browser, and which layers a website is built from.",
    },
    takeaways: [
      { fa: 'کارهایی که قبلاً یک تیم انجام می‌داد، حالا بخش بزرگش از Agent برمی‌آید.', en: 'Much of what used to take a team can now be done by an agent.' },
      { fa: 'شما مدیر و بازبین پروژه می‌مانید؛ Agent جای قضاوت شما را نمی‌گیرد.', en: 'You stay the lead and reviewer; the agent does not replace your judgement.' },
      { fa: 'Agent اشتباه می‌کند؛ کیفیت کار در جزئیات و بازبینی ساخته می‌شود.', en: 'Agents make mistakes; quality comes from details and review.' },
      { fa: 'هر فصل: چرا، چطور، امتحان، Prompt، کوییز.', en: 'Each chapter: why, how, try it, prompt, quiz.' },
    ],
  },

  // ───────────────────────────────────────────── 2. How the web works
  {
    slug: 'how-the-web-works',
    act: 1,
    icon: 'globe',
    voice: '/audio/voice1.mp3',
    title: { fa: 'وب چطور کار می‌کند؟', en: 'How the web works' },
    tagline: {
      fa: 'از تایپ یک آدرس تا دیدن صفحه: Frontend، Backend، Database و Hosting',
      en: 'From typing an address to seeing a page: frontend, backend, database and hosting',
    },
    minutes: 12,
    mascotLine: {
      fa: 'بیایید یک درخواست کوچک را دنبال کنیم و ببینیم از مرورگر تا سرور و برگشت، کجاها می‌رود!',
      en: "Let's follow one little request and see everywhere it travels, from your browser to a server and back!",
    },
    sections: [
      {
        id: 'what-happens',
        title: { fa: 'وقتی یک آدرس را تایپ می‌کنید', en: 'When you type an address' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'وب در اصل یک گفت‌وگوی ساده است: **مرورگر** شما (Client) یک **درخواست** (Request) می‌فرستد و یک **سرور** یک **پاسخ** (Response) برمی‌گرداند. این گفت‌وگو با زبانی به اسم **HTTP** انجام می‌شود و وقتی رمزگذاری شده باشد، به آن **HTTPS** می‌گوییم.',
              en: 'At heart, the web is a simple conversation: your **browser** (the client) sends a **request**, and a **server** sends back a **response**. They talk in a language called **HTTP**, and when the conversation is encrypted we call it **HTTPS**.',
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'تایپ آدرس', en: 'You type a URL' },
                text: {
                  fa: 'مثلاً `https://example.com/about`. این آدرس می‌گوید با چه پروتکلی، از کدام دامنه، کدام صفحه را می‌خواهید.',
                  en: 'For example `https://example.com/about`. It says which protocol, which domain, and which page you want.',
                },
              },
              {
                title: { fa: 'پیدا کردن آدرس سرور (DNS)', en: 'Finding the server (DNS)' },
                text: {
                  fa: 'کامپیوترها با IP کار می‌کنند، نه با اسم. DNS اسم دامنه را به IP تبدیل می‌کند. (فصل بعد کامل درباره‌اش حرف می‌زنیم.)',
                  en: "Computers talk in IP addresses, not names. DNS turns the domain name into an IP. (We cover it fully in the next chapter.)",
                },
              },
              {
                title: { fa: 'اتصال امن و ارسال درخواست', en: 'Secure connection and request' },
                text: {
                  fa: 'مرورگر با سرور یک اتصال امن (TLS) برقرار می‌کند و درخواست HTTP را می‌فرستد.',
                  en: 'The browser opens a secure (TLS) connection to the server and sends the HTTP request.',
                },
              },
              {
                title: { fa: 'سرور جواب می‌دهد', en: 'The server answers' },
                text: {
                  fa: 'سرور یا یک فایل آماده را برمی‌گرداند، یا با کمک Backend و Database جواب را همان لحظه می‌سازد.',
                  en: 'The server either returns a ready-made file, or builds the answer on the spot with the backend and database.',
                },
              },
              {
                title: { fa: 'مرورگر صفحه را می‌سازد', en: 'The browser draws the page' },
                text: {
                  fa: 'مرورگر HTML و CSS و JavaScript را می‌خواند و صفحه‌ای را که می‌بینید روی صفحه نمایش می‌کشد.',
                  en: 'The browser reads the HTML, CSS and JavaScript and paints the page you see.',
                },
              },
            ],
          },
          { type: 'widget', id: 'request-journey' },
          {
            type: 'terms',
            items: [
              { term: 'URL', def: { fa: 'آدرس کامل یک منبع در وب، شامل پروتکل، دامنه و مسیر.', en: 'The full address of a resource on the web: protocol, domain and path.' } },
              { term: 'HTTP / HTTPS', def: { fa: 'زبان گفت‌وگوی مرورگر و سرور. HTTPS همان HTTP است با رمزگذاری TLS.', en: 'The language browsers and servers speak. HTTPS is HTTP encrypted with TLS.' } },
              { term: 'Request / Response', def: { fa: 'درخواستی که مرورگر می‌فرستد و پاسخی که سرور برمی‌گرداند.', en: 'What the browser asks for, and what the server sends back.' } },
              { term: 'Status code', def: { fa: 'عدد کوتاهی در پاسخ که نتیجه را می‌گوید؛ مثلاً `200` یعنی موفق و `404` یعنی پیدا نشد.', en: 'A short number in the response that says how it went, e.g. `200` means OK and `404` means not found.' } },
            ],
          },
        ],
      },
      {
        id: 'three-layers',
        title: { fa: 'سه لایه: Frontend، Backend و Database', en: 'Three layers: frontend, backend and database' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: '**Frontend** هر چیزی است که در مرورگر کاربر اجرا می‌شود و دیده می‌شود: ساختار صفحه با **HTML**، ظاهر با **CSS** و رفتار و تعامل با **JavaScript**. دکمه‌ها، فرم‌ها، انیمیشن‌ها، همه Frontend هستند.',
              en: "The **frontend** is everything that runs and shows up in the user's browser: structure with **HTML**, looks with **CSS**, and behaviour with **JavaScript**. Buttons, forms, animations: all frontend.",
            },
          },
          {
            type: 'p',
            text: {
              fa: '**Backend** کدی است که روی سرور اجرا می‌شود و کاربر آن را نمی‌بیند: ورود کاربر (Auth)، ذخیره سفارش، ارسال ایمیل، صحبت با سرویس‌های دیگر از طریق **API**. هر جا «منطق» و «راز» (مثل کلید یک سرویس پرداخت) هست، جایش در Backend است، نه در Frontend.',
              en: "The **backend** is code that runs on a server, out of the user's sight: logging users in (auth), saving orders, sending email, talking to other services through **APIs**. Wherever there is logic or a secret (like a payment provider key), it belongs in the backend, never the frontend.",
            },
          },
          {
            type: 'p',
            text: {
              fa: '**Database** جایی است که داده‌ها به‌صورت ماندگار ذخیره می‌شوند: کاربران، محصولات، پیام‌ها. Backend داده را در Database می‌نویسد و از آن می‌خواند.',
              en: 'The **database** is where data is stored permanently: users, products, messages. The backend writes data to it and reads data from it.',
            },
          },
          {
            type: 'compare',
            headers: [
              { fa: 'لایه', en: 'Layer' },
              { fa: 'کجا اجرا می‌شود', en: 'Where it runs' },
              { fa: 'نمونه کار', en: 'Example job' },
            ],
            rows: [
              [
                { fa: 'Frontend', en: 'Frontend' },
                { fa: 'مرورگر کاربر', en: "The user's browser" },
                { fa: 'نمایش منو، باز شدن پنجره، اعتبارسنجی فرم', en: 'Showing a menu, opening a dialog, checking a form' },
              ],
              [
                { fa: 'Backend', en: 'Backend' },
                { fa: 'سرور', en: 'A server' },
                { fa: 'ثبت سفارش، ورود کاربر، فراخوانی API پرداخت', en: 'Placing an order, logging in, calling a payment API' },
              ],
              [
                { fa: 'Database', en: 'Database' },
                { fa: 'سرور یا سرویس داده', en: 'A server or data service' },
                { fa: 'نگه داشتن لیست کاربران و سفارش‌ها', en: 'Keeping the list of users and orders' },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'راز را در Frontend نگذارید', en: 'Never put secrets in the frontend' },
            text: {
              fa: 'هر چیزی که به مرورگر فرستاده شود، هر کسی می‌تواند ببیند. کلید API، رمز Database و توکن‌ها باید فقط در Backend یا در بخش Secrets سرویس میزبان بمانند. اگر Agent کلیدی را در کد Frontend گذاشت، همان لحظه جلویش را بگیرید.',
              en: "Anything sent to the browser can be read by anyone. API keys, database passwords and tokens must live only in the backend or the host's secrets store. If your agent puts a key in frontend code, stop it right there.",
            },
          },
        ],
      },
      {
        id: 'server-and-hosting',
        title: { fa: 'Web Server و Hosting', en: 'Web servers and hosting' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: '**Web Server** یک **نرم‌افزار** است که درخواست‌های HTTP را تحویل می‌گیرد و جواب می‌دهد؛ مثلاً فایل‌های سایت را می‌فرستد یا درخواست را به Backend می‌سپارد. Nginx و Apache نمونه‌های معروف آن هستند.',
              en: 'A **web server** is a piece of **software** that receives HTTP requests and answers them: it sends your site files, or hands the request to the backend. Nginx and Apache are well-known examples.',
            },
          },
          {
            type: 'p',
            text: {
              fa: '**Hosting** خدمتی است که جای اجرای همه این‌ها را فراهم می‌کند: کامپیوترهایی همیشه روشن و وصل به اینترنت. **Hosting Provider** شرکتی است که این خدمت را می‌دهد. گاهی یک سرور خام (VPS) می‌گیرید و Web Server و بقیه چیزها را خودتان نصب و تنظیم می‌کنید؛ گاهی یک سرویس آماده می‌گیرید که فقط کد یا فایل‌ها را به آن می‌دهید.',
              en: "**Hosting** is the service that gives all of this a place to run: always-on computers connected to the internet. A **hosting provider** is the company that sells that service. Sometimes you rent a bare server (a VPS) and install the web server and everything else yourself; sometimes you use a managed service where you just hand over your code or files.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'تصحیح یک اصطلاح رایج', en: 'Clearing up a common mix-up' },
            text: {
              fa: 'در صحبت روزمره «سرور»، «Web Server» و «Hosting» را به جای هم به کار می‌بریم. دقیقش این است: **سرور** کامپیوتر (یا ماشین مجازی) است، **Web Server** نرم‌افزاری است که روی آن اجرا می‌شود، و **Hosting** خدمتی است که آن را برایتان فراهم و نگهداری می‌کند. در سرویس‌های مدرن Serverless، اصلاً سروری را مدیریت نمی‌کنید؛ سرور هست، ولی مسئولیتش با ارائه‌دهنده است.',
              en: "In everyday talk, 'server', 'web server' and 'hosting' get used interchangeably. Precisely: a **server** is the computer (or virtual machine), a **web server** is the software running on it, and **hosting** is the service that provides and maintains it for you. With modern serverless platforms you don't manage a server at all; servers still exist, but they're the provider's job.",
            },
          },
        ],
      },
      {
        id: 'static-vs-dynamic',
        title: { fa: 'سایت استاتیک یا Web App پویا؟', en: 'Static site or dynamic web app?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'یک **سایت استاتیک** (Static) مجموعه‌ای از فایل‌های آماده است: HTML، CSS، JavaScript و تصویر. سرور فقط همان فایل‌ها را می‌فرستد. سایت شخصی، صفحه معرفی کسب‌وکار، رزومه یا یک One Page اغلب استاتیک‌اند. این‌ها **Backend و Database لازم ندارند**، برای همین ارزان، سریع و کم‌دردسرند.',
              en: "A **static site** is a set of ready-made files: HTML, CSS, JavaScript and images. The server just sends those files. Personal sites, business intro pages, résumés and one-pagers are often static. They **need no backend and no database**, which makes them cheap, fast and low-maintenance.",
            },
          },
          {
            type: 'p',
            text: {
              fa: 'یک **Web App پویا** (Dynamic) برای هر کاربر یا هر لحظه جواب متفاوتی می‌سازد: ورود کاربر، سبد خرید، داشبورد، فرم‌هایی که ذخیره می‌شوند. این‌ها Backend دارند و معمولاً Database هم لازم دارند.',
              en: 'A **dynamic web app** builds a different answer for each user or moment: logins, shopping carts, dashboards, forms that save data. These have a backend and usually need a database too.',
            },
          },
          { type: 'widget', id: 'stack-layers' },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'از ساده شروع کنید', en: 'Start simple' },
            text: {
              fa: 'اگر پروژه‌تان را می‌شود استاتیک ساخت، استاتیک بسازید. هر لایه اضافه یعنی هزینه، نگهداری و ریسک امنیتی بیشتر. هر وقت واقعاً به ورود کاربر یا ذخیره داده نیاز داشتید، Backend و Database را اضافه کنید.',
              en: "If your project can be static, keep it static. Every extra layer means more cost, upkeep and security risk. Add a backend and database when you genuinely need logins or saved data.",
            },
          },
          {
            type: 'h',
            text: { fa: 'گزینه مدرن: Serverless و Edge', en: 'The modern option: serverless and the edge' },
          },
          {
            type: 'p',
            text: {
              fa: 'در مدل **Serverless** کد Backend شما فقط وقتی درخواستی می‌رسد اجرا می‌شود و ارائه‌دهنده خودش مقیاس، به‌روزرسانی و نگهداری سرورها را انجام می‌دهد. وقتی این کد روی شبکه‌ای از دیتاسنترها در سراسر دنیا و نزدیک کاربر اجرا شود، می‌گوییم روی **Edge** اجرا می‌شود. **Cloudflare Workers** دقیقاً همین است، و می‌تواند هم فایل‌های استاتیک سایت را سرو کند و هم Backend را اجرا کند. در فصل Cloudflare مفصل درباره‌اش حرف می‌زنیم.',
              en: "In the **serverless** model, your backend code runs only when a request arrives, and the provider handles scaling, patching and the servers themselves. When that code runs on a worldwide network of data centres close to each user, we say it runs at the **edge**. **Cloudflare Workers** is exactly this, and it can both serve your static files and run your backend. We dig into it in the Cloudflare chapter.",
            },
          },
          {
            type: 'prompt',
            title: { fa: 'از Agent بخواهید معماری را توضیح دهد', en: 'Ask your agent to explain the architecture' },
            text: {
              fa: 'می‌خواهم این سایت را بسازم: [ایده‌تان را در یک یا دو جمله بنویسید]. قبل از نوشتن کد، به زبان ساده بگو: آیا این پروژه می‌تواند استاتیک باشد یا Backend لازم دارد؟ اگر Backend لازم است، دقیقاً برای کدام قابلیت؟ آیا Database لازم دارد و چه داده‌ای در آن ذخیره می‌شود؟ ساده‌ترین معماری ممکن را پیشنهاد بده و دلیل هر لایه را توضیح بده.',
              en: "I want to build this site: [describe your idea in one or two sentences]. Before writing any code, explain in plain language: can this project be static, or does it need a backend? If it needs a backend, for which feature exactly? Does it need a database, and what data would live there? Propose the simplest architecture that works and explain why each layer is there.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: 'یک وبسایت رزومه شخصی با چند صفحه ثابت و یک لینک ایمیل، حداقل به چه چیزی نیاز دارد؟',
              en: 'A personal résumé site with a few fixed pages and an email link needs, at minimum:',
            },
            options: [
              { fa: 'Frontend، Backend و Database', en: 'A frontend, a backend and a database' },
              { fa: 'فقط فایل‌های استاتیک و یک جای Hosting', en: 'Just static files and somewhere to host them' },
              { fa: 'یک VPS اختصاصی با Nginx', en: 'A dedicated VPS running Nginx' },
            ],
            answer: 1,
            explain: {
              fa: 'محتوای ثابت را بدون Backend و Database هم می‌شود سرو کرد. لینک ایمیل (`mailto:`) هم کار Frontend است. افزودن لایه‌های بیشتر فقط هزینه و پیچیدگی می‌آورد.',
              en: "Fixed content can be served with no backend or database. An email link (`mailto:`) is plain frontend. Extra layers would only add cost and complexity.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'MDN: An overview of HTTP', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview' },
              { label: 'MDN: What is a web server?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_web_server' },
              { label: 'MDN: Learn web development', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development' },
              { label: 'Cloudflare Workers documentation', url: 'https://developers.cloudflare.com/workers/' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: 'دیدیم که قبل از رسیدن درخواست به سرور، یک مرحله «پیدا کردن آدرس» هست. فصل بعد دقیقاً همین است: Domain و DNS و اینکه چطور اسم سایت شما به سرور درست وصل می‌شود.',
      en: "We saw there's an 'address lookup' step before a request ever reaches a server. The next chapter is exactly that: domains, DNS, and how your site's name gets connected to the right server.",
    },
    takeaways: [
      { fa: 'وب یعنی Request از مرورگر و Response از سرور، با HTTP/HTTPS.', en: 'The web is a browser request and a server response, over HTTP/HTTPS.' },
      { fa: 'Frontend در مرورگر اجرا می‌شود؛ Backend و رازها روی سرور می‌مانند.', en: 'The frontend runs in the browser; the backend and secrets stay on the server.' },
      { fa: 'Web Server نرم‌افزار است؛ Hosting خدمتی است که جای اجرا را فراهم می‌کند.', en: 'A web server is software; hosting is the service that gives it a place to run.' },
      { fa: 'سایت استاتیک Backend و Database نمی‌خواهد؛ از ساده شروع کنید.', en: 'Static sites need no backend or database; start simple.' },
    ],
  },

  // ───────────────────────────────────────────── 3. Domains & DNS
  {
    slug: 'domains-dns',
    act: 1,
    icon: 'signpost',
    title: { fa: 'Domain، DNS و Nameserver', en: 'Domains, DNS and nameservers' },
    tagline: {
      fa: 'اسم سایت شما چطور به سرور درست می‌رسد',
      en: "How your site's name finds the right server",
    },
    minutes: 12,
    mascotLine: {
      fa: 'DNS مثل دفترچه تلفن اینترنت است. بیایید ببینیم چه کسی این دفترچه را نگه می‌دارد!',
      en: "DNS is the internet's phone book. Let's find out who keeps that book!",
    },
    sections: [
      {
        id: 'what-is-a-domain',
        title: { fa: 'Domain چیست؟', en: 'What is a domain?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'کامپیوترها همدیگر را با **IP Address** پیدا می‌کنند؛ عددهایی مثل `203.0.113.10` که به خاطر سپردنشان سخت است. **Domain** یک اسم قابل‌خواندن است، مثل `example.com`، که به‌جای آن عدد استفاده می‌کنیم. تقریباً هر وبسایت جدی به یک Domain نیاز دارد.',
              en: "Computers find each other by **IP address**: numbers like `203.0.113.10` that are hard to remember. A **domain** is a human-readable name, like `example.com`, that we use instead. Nearly every serious website needs one.",
            },
          },
          {
            type: 'p',
            text: {
              fa: 'یک Domain از راست به چپ خوانده می‌شود: بخش آخر (`.com`، `.ir`، `.dev`) **TLD** یا دامنه سطح بالاست. بخش قبلی (`example`) اسمی است که شما ثبت می‌کنید. هر چیزی که جلوتر بیاید، مثل `blog.example.com` یا `shop.example.com`، یک **Subdomain** است که خودتان بدون خرید جداگانه می‌سازید.',
              en: "A domain reads from right to left: the last part (`.com`, `.ir`, `.dev`) is the **TLD**, or top-level domain. The part before it (`example`) is the name you register. Anything added in front, like `blog.example.com` or `shop.example.com`, is a **subdomain** that you create yourself without buying anything extra.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'شما Domain را «اجاره» می‌کنید', en: 'You rent a domain, you don’t own it forever' },
            text: {
              fa: 'ثبت Domain معمولاً سالانه است و باید تمدید شود. **تمدید خودکار** را روشن کنید و ایمیل حساب را همیشه فعال نگه دارید؛ از دست دادن دامنه به خاطر یک تمدید فراموش‌شده خیلی رایج است.',
              en: 'Domain registrations are usually yearly and must be renewed. Turn on **auto-renew** and keep your account email active; losing a domain to a forgotten renewal is very common.',
            },
          },
          {
            type: 'terms',
            items: [
              { term: 'IP Address', def: { fa: 'آدرس عددی یک دستگاه در اینترنت (IPv4 یا IPv6).', en: 'The numeric address of a device on the internet (IPv4 or IPv6).' } },
              { term: 'TLD', def: { fa: 'بخش آخر دامنه، مثل `.com` یا `.ir`.', en: 'The last part of a domain, such as `.com` or `.ir`.' } },
              { term: 'Subdomain', def: { fa: 'زیربخشی از دامنه شما، مثل `blog.example.com`.', en: 'A section under your domain, such as `blog.example.com`.' } },
              { term: 'Nameserver', def: { fa: 'سروری که به سؤال‌های DNS درباره یک دامنه، جواب رسمی (Authoritative) می‌دهد.', en: 'A server that gives the official (authoritative) answers to DNS questions about a domain.' } },
            ],
          },
        ],
      },
      {
        id: 'who-is-who',
        title: { fa: 'Registry، Registrar و DNS Provider: چه کسی چه کاره است؟', en: 'Registry, registrar and DNS provider: who does what?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'سه بازیگر مختلف در داستان Domain هستند و قاطی کردن‌شان منبع بیشتر سردرگمی‌هاست:',
              en: 'Three different players appear in the domain story, and mixing them up causes most of the confusion:',
            },
          },
          {
            type: 'compare',
            headers: [
              { fa: 'بازیگر', en: 'Player' },
              { fa: 'کارش چیست', en: 'What it does' },
              { fa: 'شما با آن چه کار دارید', en: 'What you do with it' },
            ],
            rows: [
              [
                { fa: 'Registry', en: 'Registry' },
                { fa: 'مدیر یک TLD است (مثلاً `.com`) و فهرست رسمی دامنه‌های آن را نگه می‌دارد، از جمله اینکه Nameserverهای هر دامنه کدام‌اند.', en: 'Runs a TLD (e.g. `.com`) and keeps its official list of domains, including which nameservers each one uses.' },
                { fa: 'مستقیم با آن کار ندارید.', en: 'You never deal with it directly.' },
              ],
              [
                { fa: 'Registrar', en: 'Registrar' },
                { fa: 'فروشنده‌ای که Domain را از طرف شما نزد Registry ثبت می‌کند.', en: 'The seller that registers the domain with the registry on your behalf.' },
                { fa: 'Domain را از آن می‌خرید، تمدید می‌کنید و Nameserverها را آنجا تعیین می‌کنید.', en: 'You buy and renew the domain there, and set its nameservers there.' },
              ],
              [
                { fa: 'DNS Provider (Authoritative Nameserver)', en: 'DNS provider (authoritative nameserver)' },
                { fa: 'به سؤال‌های DNS درباره دامنه و همه Subdomainهایش جواب می‌دهد.', en: 'Answers DNS questions about the domain and all its subdomains.' },
                { fa: 'رکوردهای DNS (مثل A و CNAME) را آنجا می‌سازید و ویرایش می‌کنید.', en: 'You create and edit your DNS records (A, CNAME…) there.' },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'دقیق‌تر بگوییم', en: 'Let’s be precise' },
            text: {
              fa: 'Nameserver خودش را به دنیا «اعلام» نمی‌کند. روند این است: شما در پنل **Registrar** می‌نویسید Nameserverهای دامنه‌تان کدام‌اند؛ Registrar این را به **Registry** می‌دهد؛ Registry آن را در Nameserverهای TLD منتشر می‌کند (به این **NS Delegation** می‌گویند). از آن به بعد هر کس دامنه شما را جست‌وجو کند، به Nameserverهایی که تعیین کرده‌اید فرستاده می‌شود و آن‌ها برای دامنه و همه Subdomainها جواب می‌دهند. Registrar و DNS Provider می‌توانند یک شرکت باشند یا دو شرکت جدا.',
              en: "A nameserver doesn't 'announce' itself to the world. Here's the real flow: in your **registrar**'s panel you set which nameservers your domain uses; the registrar passes that to the **registry**; the registry publishes it in the TLD's own nameservers (this is called **NS delegation**). From then on, anyone looking up your domain is sent to the nameservers you chose, and those answer for the domain and every subdomain. Your registrar and DNS provider can be the same company or two different ones.",
            },
          },
        ],
      },
      {
        id: 'how-lookup-works',
        title: { fa: 'یک جست‌وجوی DNS قدم به قدم', en: 'A DNS lookup, step by step' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'وقتی `www.example.com` را باز می‌کنید، دستگاه شما سؤال را به یک **Resolver** می‌دهد (معمولاً مال اینترنت‌دهنده یا سرویسی مثل `1.1.1.1`). Resolver اگر جواب را از قبل در حافظه (Cache) نداشته باشد، این مسیر را می‌رود:',
              en: "When you open `www.example.com`, your device asks a **resolver** (usually your ISP's, or a service like `1.1.1.1`). If the resolver doesn't already have the answer cached, it walks this path:",
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'Root', en: 'Root' },
                text: { fa: 'از سرورهای ریشه می‌پرسد: «`.com` را چه کسی می‌داند؟»', en: "Asks the root servers: 'Who knows about `.com`?'" },
              },
              {
                title: { fa: 'TLD', en: 'TLD' },
                text: { fa: 'از Nameserverهای `.com` می‌پرسد: «Nameserverهای `example.com` کدام‌اند؟»', en: "Asks the `.com` nameservers: 'Which nameservers handle `example.com`?'" },
              },
              {
                title: { fa: 'Authoritative', en: 'Authoritative' },
                text: { fa: 'از Nameserver رسمی دامنه (مثلاً Cloudflare) می‌پرسد: «IP آدرس `www.example.com` چیست؟» و جواب نهایی را می‌گیرد.', en: "Asks the domain's own nameserver (say, Cloudflare): 'What is the IP of `www.example.com`?' and gets the final answer." },
              },
              {
                title: { fa: 'Cache', en: 'Cache' },
                text: { fa: 'جواب را برای مدتی که **TTL** تعیین کرده نگه می‌دارد تا دفعه بعد سریع‌تر جواب دهد.', en: 'Keeps the answer for as long as its **TTL** allows, so the next lookup is faster.' },
              },
            ],
          },
          { type: 'widget', id: 'dns-lookup' },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'چرا تغییرات DNS «فوری» نیستند؟', en: 'Why DNS changes are not instant' },
            text: {
              fa: 'چون Resolverها در سراسر دنیا جواب‌ها را تا پایان TTL نگه می‌دارند. برای همین بعد از تغییر یک رکورد یا Nameserver، بعضی‌ها نسخه جدید را زودتر می‌بینند و بعضی دیرتر. به این **Propagation** می‌گویند. تغییر رکوردها معمولاً سریع دیده می‌شود، ولی تغییر Nameserver ممکن است تا چند ساعت (و گاهی بیشتر) طول بکشد. صبور باشید و قبل از تغییرهای مهم، TTL را پایین بیاورید.',
              en: "Because resolvers all over the world keep answers until their TTL runs out. So after you change a record or your nameservers, some people see the new version sooner and others later. This is called **propagation**. Record changes usually show up quickly, but a nameserver change can take hours (occasionally longer). Be patient, and lower the TTL before important changes.",
            },
          },
        ],
      },
      {
        id: 'dns-records',
        title: { fa: 'رکوردهای DNS که باید بشناسید', en: 'DNS records you should know' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'در پنل DNS Provider، هر خط یک **رکورد** است: یک اسم، یک نوع، یک مقدار و یک TTL. این‌ها مهم‌ترین نوع‌ها هستند:',
              en: "In your DNS provider's panel, each line is a **record**: a name, a type, a value and a TTL. These are the types that matter most:",
            },
          },
          {
            type: 'compare',
            headers: [
              { fa: 'نوع', en: 'Type' },
              { fa: 'چه می‌گوید', en: 'What it says' },
              { fa: 'مثال', en: 'Example' },
            ],
            rows: [
              [
                { fa: 'A', en: 'A' },
                { fa: 'این اسم به این IPv4 اشاره می‌کند.', en: 'This name points to this IPv4 address.' },
                { fa: '`example.com → 203.0.113.10`', en: '`example.com → 203.0.113.10`' },
              ],
              [
                { fa: 'AAAA', en: 'AAAA' },
                { fa: 'همان A، ولی برای IPv6.', en: 'Same as A, but for IPv6.' },
                { fa: '`example.com → 2001:db8::10`', en: '`example.com → 2001:db8::10`' },
              ],
              [
                { fa: 'CNAME', en: 'CNAME' },
                { fa: 'این اسم، نام مستعار یک اسم دیگر است.', en: 'This name is an alias of another name.' },
                { fa: '`www → example.com`', en: '`www → example.com`' },
              ],
              [
                { fa: 'MX', en: 'MX' },
                { fa: 'ایمیل‌های این دامنه را به کدام سرور ایمیل بفرستید.', en: "Which mail server receives this domain's email." },
                { fa: '`example.com → mail.provider.com`', en: '`example.com → mail.provider.com`' },
              ],
              [
                { fa: 'TXT', en: 'TXT' },
                { fa: 'متن آزاد؛ برای تأیید مالکیت دامنه و تنظیمات امنیتی ایمیل (SPF، DKIM، DMARC).', en: 'Free text; used to prove domain ownership and for email security (SPF, DKIM, DMARC).' },
                { fa: '`v=spf1 include:... ~all`', en: '`v=spf1 include:... ~all`' },
              ],
              [
                { fa: 'NS', en: 'NS' },
                { fa: 'کدام Nameserverها مسئول این دامنه هستند.', en: 'Which nameservers are in charge of this domain.' },
                { fa: '`example.com → ada.ns.cloudflare.com`', en: '`example.com → ada.ns.cloudflare.com`' },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'رکوردهای ایمیل را خراب نکنید', en: "Don't break your email records" },
            text: {
              fa: 'اگر روی دامنه‌تان ایمیل دارید، وقتی Nameserver را عوض می‌کنید یا به Agent اجازه ویرایش DNS می‌دهید، مطمئن شوید رکوردهای MX و TXT قبلی دقیقاً منتقل شده‌اند. از Agent بخواهید قبل از هر تغییر DNS، فهرست تغییرات را نشان دهد و منتظر تأیید شما بماند.',
              en: "If your domain has email, make sure the existing MX and TXT records come across exactly when you switch nameservers or let an agent edit DNS. Ask the agent to show you the list of DNS changes before applying any, and to wait for your approval.",
            },
          },
          {
            type: 'terms',
            items: [
              { term: 'TTL', def: { fa: 'مدتی (به ثانیه) که Resolverها می‌توانند یک جواب DNS را در حافظه نگه دارند.', en: 'How long (in seconds) resolvers may keep a DNS answer cached.' } },
              { term: 'Propagation', def: { fa: 'زمانی که طول می‌کشد تا تغییر DNS همه‌جا دیده شود.', en: 'The time it takes for a DNS change to be seen everywhere.' } },
              { term: 'Resolver', def: { fa: 'سرویسی که از طرف دستگاه شما، جواب DNS را پیدا می‌کند.', en: 'The service that looks up DNS answers on behalf of your device.' } },
            ],
          },
        ],
      },
      {
        id: 'why-cloudflare-dns',
        title: { fa: 'چرا Nameserverها را به Cloudflare می‌سپاریم؟', en: 'Why hand your nameservers to Cloudflare?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: 'وقتی Nameserverهای دامنه را روی Cloudflare می‌گذارید (به این **Full Setup** می‌گویند)، Cloudflare به DNS Provider رسمی شما تبدیل می‌شود. از آن به بعد فقط یک دفترچه آدرس نیست: می‌تواند ترافیک سایت را از شبکه خودش عبور دهد (**Proxy**، همان ابر نارنجی)، گواهی **SSL/TLS** را خودکار فراهم کند، جلوی حمله‌ها را بگیرد و دامنه یا Subdomainها را مستقیم به **Workers** شما وصل کند.',
              en: "When you point your domain's nameservers to Cloudflare (a **full setup**), Cloudflare becomes your authoritative DNS provider. From then on it's more than an address book: it can route your site's traffic through its network (the **proxy**, the orange cloud), provide **SSL/TLS** certificates automatically, block attacks, and connect your domain or subdomains straight to your **Workers**.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'تغییر Nameserver را بعداً با هم انجام می‌دهیم', en: 'We switch nameservers together later' },
            text: {
              fa: 'لازم نیست الان چیزی را عوض کنید. در فصل «دامنه اختصاصی» قدم به قدم دامنه را به Cloudflare اضافه می‌کنیم، Nameserverها را در Registrar عوض می‌کنیم و سایت را به آن وصل می‌کنیم. فعلاً فقط بدانید هر بخش چه کاره است.',
              en: "You don't need to change anything yet. In the 'custom domain' chapter we'll add your domain to Cloudflare, change the nameservers at your registrar and connect the site, step by step. For now, just know which piece does what.",
            },
          },
          {
            type: 'prompt',
            title: { fa: 'از Agent بخواهید DNS فعلی را بررسی کند', en: 'Ask your agent to audit your current DNS' },
            text: {
              fa: 'دامنه من `example.com` است. با ابزارهایی مثل `dig` یا `nslookup` بررسی کن: Nameserverهای فعلی‌اش کدام‌اند، چه رکوردهای A، AAAA، CNAME، MX و TXT دارد و TTL هر کدام چقدر است. نتیجه را در یک جدول ساده به من نشان بده و توضیح بده هر رکورد احتمالاً برای چه کاری است. هیچ چیزی را تغییر نده.',
              en: "My domain is `example.com`. Using tools like `dig` or `nslookup`, check: which nameservers it currently uses, which A, AAAA, CNAME, MX and TXT records it has, and the TTL of each. Show me the result in a simple table and explain what each record is probably for. Don't change anything.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: 'می‌خواهید DNS دامنه‌تان را Cloudflare مدیریت کند. Nameserverهای جدید را کجا وارد می‌کنید؟',
              en: 'You want Cloudflare to manage your DNS. Where do you enter the new nameservers?',
            },
            options: [
              { fa: 'در پنل Registrar، همان جایی که دامنه را خریده‌اید', en: "In your registrar's panel, where you bought the domain" },
              { fa: 'در یک رکورد CNAME در Cloudflare', en: 'In a CNAME record inside Cloudflare' },
              { fa: 'مستقیم با تماس با Registry', en: 'By contacting the registry directly' },
            ],
            answer: 0,
            explain: {
              fa: 'Nameserverها در Registrar تعیین می‌شوند؛ Registrar آن را به Registry می‌دهد و Registry آن را برای TLD منتشر می‌کند. رکوردهای داخل Cloudflare فقط بعد از این مرحله اعتبار پیدا می‌کنند.',
              en: "Nameservers are set at the registrar; it passes them to the registry, which publishes them for the TLD. The records inside Cloudflare only take effect after that step.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare Learning: What is DNS?', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/' },
              { label: 'Cloudflare Learning: DNS records', url: 'https://www.cloudflare.com/learning/dns/dns-records/' },
              { label: 'Cloudflare DNS: Full setup', url: 'https://developers.cloudflare.com/dns/zone-setups/full-setup/' },
              { label: 'MDN: What is a domain name?', url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: 'حالا می‌دانید اسم سایت چطور به سرور می‌رسد. قطعه بعدی پازل، جایی است که کد سایت در آن زندگی می‌کند و تاریخچه‌اش نگه داشته می‌شود: GitHub. بعد از آن به Cloudflare می‌رسیم که هم DNS و هم میزبانی را یک‌جا می‌دهد.',
      en: "Now you know how a site's name reaches a server. The next piece of the puzzle is where your site's code lives and keeps its history: GitHub. After that comes Cloudflare, which gives you DNS and hosting in one place.",
    },
    takeaways: [
      { fa: 'Domain اسم قابل‌خواندن یک IP است و سالانه تمدید می‌شود.', en: 'A domain is a readable name for an IP, renewed yearly.' },
      { fa: 'از Registrar می‌خرید؛ Registry مدیر TLD است؛ DNS Provider به سؤال‌ها جواب می‌دهد.', en: 'You buy from a registrar; the registry runs the TLD; the DNS provider answers the questions.' },
      { fa: 'A و AAAA به IP، CNAME به اسم دیگر، MX به ایمیل و TXT به تأیید و امنیت مربوط است.', en: 'A/AAAA point to IPs, CNAME to another name, MX to email, TXT to verification and security.' },
      { fa: 'تغییرات DNS به خاطر TTL و Cache کم‌کم همه‌جا دیده می‌شوند.', en: 'DNS changes spread gradually because of TTLs and caching.' },
    ],
  },
];
