import type { Chapter, QuizItem } from '../types';

/** Act II review: five questions mixing the two workshop chapters. */
const REVIEW_ACT2: QuizItem[] = [
  {
    q: {
      fa: 'جایی که دامنه را می‌خرید و جایی که DNS آن را مدیریت می‌کند، چه رابطه‌ای دارند؟',
      en: 'How does the place you buy a domain relate to where its DNS is managed?',
    },
    options: [
      { fa: 'باید یک شرکت باشند وگرنه سایت باز نمی‌شود', en: 'They must be one company or the site breaks' },
      { fa: 'Registrar فقط برای دامنه‌های ‎.ir لازم است', en: 'A registrar is only needed for .ir domains' },
      { fa: 'دو نقش جدا هستند و می‌توانند دو شرکت باشند', en: 'They are separate roles, possibly two firms' },
      { fa: 'DNS Provider همیشه همان شرکت Hosting است', en: 'The DNS provider is always the web host' },
    ],
    answer: 2,
    explain: {
      fa: 'Registrar جای خرید دامنه است و DNS Provider جایی که به سؤال «این دامنه کجاست؟» جواب می‌دهد. می‌توانید دامنه را از یک شرکت بخرید و DNS را به Cloudflare بسپارید.',
      en: 'The registrar is where you buy; the DNS provider answers "where is this domain?". You can buy from one company and hand DNS to Cloudflare.',
    },
    why: [
      { fa: 'نه؛ خیلی‌ها دامنه را جایی می‌خرند و DNS را به Cloudflare می‌سپارند و سایت کاملاً کار می‌کند.', en: 'No; many people buy elsewhere and hand DNS to Cloudflare, and the site works fine.' },
      { fa: 'نه؛ هر دامنه‌ای، با هر پسوندی، از یک Registrar خریده می‌شود.', en: 'No; every domain, whatever its extension, is bought from a registrar.' },
      { fa: 'درست است. این دو نقش جدا هستند و در فصل دامنه‌ی اختصاصی Nameserverها را به Cloudflare می‌سپارید.', en: 'Correct. They are separate roles; in the custom-domain chapter you point nameservers to Cloudflare.' },
      { fa: 'نه؛ DNS و میزبانی دو کار جدا هستند و می‌توانند در دو شرکت باشند.', en: 'No; DNS and hosting are separate jobs and can live at two companies.' },
    ],
  },
  {
    q: {
      fa: 'هنگام نصب GitHub App برای Agent، کدام گزینه را انتخاب می‌کنید؟',
      en: 'When installing the GitHub App for your agent, which option do you pick?',
    },
    options: [
      { fa: 'فقط Repository کافه با Only select', en: 'Only select repositories: just the café repo' },
      { fa: 'All repositories، تا بعداً هیچ‌جا گیر نکنیم', en: 'All repositories, so nothing blocks us later' },
      { fa: 'نصب App روی یک حساب GitHub کاملاً تازه و خالی', en: 'Installing it on a brand-new empty account' },
      { fa: 'اصلاً App نصب نکنم و فقط رمز GitHub را بدهم', en: 'No app at all; just share my GitHub password' },
    ],
    answer: 0,
    explain: {
      fa: 'اصل کمترین دسترسی: Agent فقط Repositoryهایی را می‌بیند که App روی آن‌ها نصب است. هر وقت لازم شد، Repository تازه اضافه کنید.',
      en: 'Least privilege: the agent sees only the repositories the app is installed on. Add more whenever needed.',
    },
    why: [
      { fa: 'درست است. اگر اشتباهی رخ دهد، خسارت به همان یک Repository محدود می‌ماند.', en: 'Correct. If something goes wrong, the damage stays within that one repository.' },
      { fa: 'دسترسی بیش از حد است؛ یک اشتباه یا نشت می‌تواند همه‌ی Repositoryهای شما را درگیر کند.', en: 'Too much access; one mistake or leak could touch every repository you own.' },
      { fa: 'لازم نیست حساب تازه بسازید؛ محدود کردن App به یک Repository همان امنیت را می‌دهد.', en: 'No need for a new account; limiting the app to one repository gives the same safety.' },
      { fa: 'هرگز رمز را به کسی ندهید؛ GitHub App دقیقاً برای دسترسی محدود و قابل لغو ساخته شده.', en: 'Never share your password; a GitHub App exists for limited, revocable access.' },
    ],
  },
  {
    q: {
      fa: 'Token کلودفلر را بعد از ساختن کجا نگه می‌دارید؟',
      en: 'Where do you keep the Cloudflare token after creating it?',
    },
    options: [
      { fa: 'در اولین پیام چت، تا Agent حتماً آن را ببیند', en: 'In the first chat message so the agent sees it' },
      { fa: 'در فایل README تا هم‌تیمی‌ها پیدایش کنند', en: 'In the README so teammates can find it' },
      { fa: 'در یادداشت‌های گوشی تا همیشه دم دست باشد', en: 'In my phone notes so it is always handy' },
      { fa: 'در Secrets محیط Agent و در Password Manager', en: 'In the agent\'s secrets and a password manager' },
    ],
    answer: 3,
    explain: {
      fa: 'Token فقط یک بار نشان داده می‌شود؛ آن را مستقیم در Secrets محیط Agent بگذارید و یک نسخه در Password Manager نگه دارید.',
      en: 'The token is shown only once; put it straight into the agent environment\'s secrets and keep a copy in a password manager.',
    },
    why: [
      { fa: 'چیزی که در چت بفرستید ممکن است ذخیره و دیده شود؛ Token جایش در Secrets است.', en: 'Anything pasted into chat may be stored and seen; tokens belong in secrets.' },
      { fa: 'README عمومی‌ترین فایل Repository است و در تاریخچه‌ی Git هم می‌ماند.', en: 'The README is the most public file in a repository and stays in Git history.' },
      { fa: 'یادداشت‌های گوشی رمزگذاری و کنترل دسترسی مناسب ندارند.', en: 'Phone notes lack proper encryption and access control.' },
      { fa: 'درست است. Secrets برای Agent و Password Manager برای خودتان؛ نه در چت، نه در کد.', en: 'Correct. Secrets for the agent and a password manager for you; not in chat, not in code.' },
    ],
  },
  {
    q: {
      fa: 'وقتی Workers Builds و Preview builds روشن است، چه اتفاقی می‌افتد؟',
      en: 'With Workers Builds and preview builds on, what happens?',
    },
    options: [
      { fa: 'فقط وقتی دستی دکمه‌ای بزنید سایت منتشر می‌شود', en: 'The site deploys only when you press a button' },
      { fa: 'main منتشر می‌شود و هر شاخه Preview دارد', en: 'Main deploys and each branch gets a preview' },
      { fa: 'هر Push بدون Build مستقیم روی سایت می‌رود', en: 'Every push goes live with no build step at all' },
      { fa: 'هر شاخه جای سایت اصلی را مستقیم می‌گیرد', en: 'Every branch replaces the live site directly' },
    ],
    answer: 1,
    explain: {
      fa: 'Push به Production branch (معمولاً main) خودکار Build و Deploy می‌شود و شاخه‌های دیگر یک Preview URL جدا می‌گیرند تا قبل از Merge ببینید.',
      en: 'Pushes to the production branch (usually main) build and deploy automatically, and other branches get their own preview URL to check before merging.',
    },
    why: [
      { fa: 'هدف Workers Builds همین است که دیگر دستی دکمه نزنید؛ انتشار خودکار است.', en: 'The point of Workers Builds is that you no longer press buttons; deploying is automatic.' },
      { fa: 'درست است. main منتشر می‌شود و شاخه‌ها Preview می‌گیرند؛ Cloudflare لینک را در Pull Request کامنت می‌کند.', en: 'Correct. Main deploys and branches get previews; Cloudflare comments the link on the pull request.' },
      { fa: 'هر Push اول Build می‌شود؛ اگر Build شکست بخورد، سایت زنده دست نمی‌خورد.', en: 'Every push is built first; if the build fails, the live site is untouched.' },
      { fa: 'شاخه‌ها فقط Preview می‌گیرند؛ سایت اصلی فقط از Production branch منتشر می‌شود.', en: 'Branches only get previews; the live site deploys only from the production branch.' },
    ],
  },
  {
    q: {
      fa: 'در مسیر Lovable، کِی به Token کلودفلر نیاز پیدا می‌کنید؟',
      en: 'On the Lovable path, when do you need a Cloudflare token?',
    },
    options: [
      { fa: 'همیشه، حتی برای انتشار ساده روی lovable.app', en: 'Always, even just to publish on lovable.app' },
      { fa: 'فقط برای وصل کردن Lovable به GitHub', en: 'Only to connect Lovable to GitHub' },
      { fa: 'وقتی Agent مستقیم روی Cloudflare کار می‌کند', en: 'When an agent works on Cloudflare directly' },
      { fa: 'هیچ‌وقت؛ Lovable اجازه‌ی خروج کد نمی‌دهد', en: 'Never; Lovable does not let code leave' },
    ],
    answer: 2,
    explain: {
      fa: 'انتشار با دکمه‌ی Publish و Git sync هیچ‌کدام Token کلودفلر نمی‌خواهند. Token فقط وقتی لازم است که Agentی (مثلاً Codex) مستقیم Worker، DNS یا منابع Cloudflare را مدیریت کند.',
      en: 'Neither the Publish button nor Git sync needs a Cloudflare token. You need one only when an agent (such as Codex) manages Workers, DNS or Cloudflare resources directly.',
    },
    why: [
      { fa: 'انتشار روی lovable.app کاملاً داخل خود Lovable انجام می‌شود و به Cloudflare شما ربطی ندارد.', en: 'Publishing to lovable.app happens entirely inside Lovable and does not touch your Cloudflare.' },
      { fa: 'اتصال GitHub با Git sync و GitHub App انجام می‌شود، نه با Token کلودفلر.', en: 'GitHub is connected through Git sync and a GitHub App, not a Cloudflare token.' },
      { fa: 'درست است. Token برای Agentی است که خودش Worker و DNS را روی Cloudflare مدیریت می‌کند.', en: 'Correct. The token is for an agent that manages Workers and DNS on Cloudflare itself.' },
      { fa: 'اشتباه است؛ Lovable کد را با Git sync در GitHub شما نگه می‌دارد و می‌توانید جای دیگر منتشرش کنید.', en: 'Wrong; Lovable keeps your code in GitHub through Git sync, and you can host it elsewhere.' },
    ],
  },
];

export const workshop: Chapter[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // Chapter: accounts-and-tools
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'accounts-and-tools',
    act: 2,
    icon: 'toolbox',
    title: { fa: 'جعبه‌ابزار: حساب‌ها و ابزارهایی که لازم دارید', en: 'The toolbox: accounts and tools you need' },
    tagline: {
      fa: 'قبل از اولین Prompt، کارگاه را مرتب کنید: ایمیل، GitHub، Cloudflare، دامنه و Codex یا Lovable.',
      en: 'Before the first prompt, tidy the workshop: email, GitHub, Cloudflare, a domain, and Codex or Lovable.',
    },
    minutes: 17,
    voice: {
      src: '/audio/voice3.mp3',
      from: 0,
      to: 65,
      transcript:
        'اگر اکانت ChatGPT داشته باشید، مخصوصاً اکانت‌های پولی، قاعدتاً به Codex هم دسترسی دارید؛ بخشی از ChatGPT که مشخصاً اسمش Codex است و آن‌جا می‌توانید کار کنید. اما قبل از این‌که بگویم چطور، هنوز دارم ابتدائیات و ملزومات را توضیح می‌دهم: این‌که برای کار با Agentic AI دقیقاً چه چیزهایی لازم داریم.',
    },
    mission: {
      outcome: {
        fa: 'همه‌ی حساب‌ها و ابزارهای لازم را امن و مرتب آماده کرده‌اید و می‌دانید کدام ابزار محلی را کِی لازم دارید.',
        en: 'All the accounts and tools you need are ready and secure, and you know which local tools you need and when.',
      },
      cafe: {
        fa: 'حساب‌های کافه سحر آماده است: ایمیل پروژه، GitHub، Cloudflare، دامنه‌ی cafe-sahar.ir و یک حساب Codex یا Lovable.',
        en: "Café Sahar's accounts are ready: a project email, GitHub, Cloudflare, the cafe-sahar.ir domain, and a Codex or Lovable account.",
      },
    },
    warmup: {
      q: {
        fa: 'از فصل قبل: کدام ابزار میزبانی سایت (Hosting) را خودش در دل خودش دارد؟',
        en: 'From the last chapter: which tool includes hosting for your site out of the box?',
      },
      options: [
        { fa: 'Codex، که کد را در Repository شما می‌نویسد', en: 'Codex, which writes code into your repository' },
        { fa: 'Lovable، که سایت را روی lovable.app منتشر می‌کند', en: 'Lovable, which publishes sites on lovable.app' },
        { fa: 'DeepSeek، یک مدل که باید در ابزاری دیگر اجرا شود', en: 'DeepSeek, a model that runs inside another tool' },
      ],
      answer: 1,
      explain: {
        fa: 'از این پنج ابزار فقط Lovable دکمه‌ی Publish و میزبانی داخلی دارد؛ بقیه کد می‌نویسند و میزبانی را جای دیگری (مثلاً Cloudflare) انجام می‌دهید.',
        en: 'Of the five tools, only Lovable has a Publish button and built-in hosting; the others write code and you host it elsewhere (for example on Cloudflare).',
      },
      why: [
        {
          fa: 'Codex کد را در Repository شما می‌نویسد و Push می‌کند، اما میزبانی را خودش انجام نمی‌دهد؛ سایت را روی Cloudflare منتشر می‌کنید.',
          en: 'Codex writes and pushes code to your repository but does not host it; you publish the site on Cloudflare.',
        },
        {
          fa: 'درست است. Lovable با دکمه‌ی Publish سایت را روی یک آدرس lovable.app منتشر می‌کند؛ دامنه‌ی اختصاصی پلن پولی می‌خواهد.',
          en: 'Correct. Lovable publishes to a lovable.app address with its Publish button; a custom domain needs a paid plan.',
        },
        {
          fa: 'DeepSeek یک مدل زبانی است؛ آن را داخل یک Agent مثل OpenCode یا Cline استفاده می‌کنید و میزبانی ندارد.',
          en: 'DeepSeek is a language model; you use it inside an agent such as OpenCode or Cline, and it has no hosting.',
        },
      ],
    },
    mascotLine: {
      fa: 'من آماده‌ی کارم! فقط قبلش چند تا کلید و حساب لازم داریم. بیایید با هم تیکشان بزنیم.',
      en: "I'm ready to work! We just need a few keys and accounts first. Let's tick them off together.",
    },
    sections: [
      {
        id: 'why-prepare',
        title: { fa: 'چرا اول کارگاه را می‌چینیم؟', en: 'Why set up the workshop first?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `در فصل‌های قبل دیدید که یک وب‌سایت از چند تکه ساخته می‌شود: کد، جایی برای نگه‌داری کد، جایی برای اجرا شدنش و یک دامنه که آدم‌ها با آن پیدایش کنند. Agent قرار است همه‌ی این تکه‌ها را به هم وصل کند، اما **خودش حساب باز نمی‌کند و کارت بانکی ندارد**. صاحب حساب‌ها شما هستید؛ Agent فقط با اجازه‌ای که شما می‌دهید کار می‌کند.`,
              en: `In earlier chapters you saw that a website is made of a few pieces: code, a place to keep the code, a place to run it, and a domain people use to find it. Your agent will wire these pieces together, but it **does not open accounts or hold a credit card**. You own the accounts; the agent only works with the access you grant it.`,
            },
          },
          {
            type: 'p',
            text: {
              fa: `اگر این حساب‌ها از قبل آماده و امن باشند، وسط کار گیر نمی‌کنید. هیچ‌چیز بدتر از این نیست که Agent وسط استقرار بگوید «به Cloudflare دسترسی ندارم» و شما تازه بروید ثبت‌نام کنید، ایمیل تأیید را پیدا نکنید و رمز را فراموش کرده باشید.`,
              en: `If these accounts are ready and secure in advance, you will not get stuck halfway. Few things are worse than an agent saying "I can't reach Cloudflare" mid-deploy while you go sign up, hunt for a verification email and reset a forgotten password.`,
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'یک قانون ساده', en: 'One simple rule' },
            text: {
              fa: `هر حسابی که به پروژه‌تان دسترسی دارد، **کلیدی به خانه‌ی شماست**. پس از روز اول آن‌ها را با یک ایمیل مشخص، رمزهای قوی و تأیید دومرحله‌ای (2FA) بسازید. بعداً درست کردنش خیلی سخت‌تر است.`,
              en: `Every account that touches your project is **a key to your house**. Create them from day one with a dedicated email, strong passwords and two-factor authentication (2FA). Fixing this later is much harder.`,
            },
          },
          { type: 'widget', id: 'setup-checklist' },
        ],
      },
      {
        id: 'core-accounts',
        title: { fa: 'حساب‌های اصلی، به ترتیب', en: 'The core accounts, in order' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `ترتیب مهم است، چون هر حساب به قبلی تکیه می‌کند. ایمیل پایه‌ی همه است و Password Manager جای امن همه‌ی رمزها.`,
              en: `Order matters, because each account leans on the one before it. Email is the foundation of all of them, and a password manager is the safe home for every password.`,
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'یک ایمیل مخصوص پروژه‌ها', en: 'A dedicated email for projects' },
                text: {
                  fa: `یک ایمیل جدا (مثلاً فقط برای کارهای فنی و پروژه‌ها) بسازید. صورتحساب‌ها، هشدارهای امنیتی و ایمیل‌های تأیید همه این‌جا می‌آیند و قاطی ایمیل شخصی نمی‌شوند. 2FA این ایمیل را حتماً روشن کنید؛ هر کس به این ایمیل برسد، می‌تواند رمز بقیه‌ی حساب‌ها را عوض کند.`,
                  en: `Create a separate email (for example, only for technical work and projects). Invoices, security alerts and verification emails all land here instead of mixing with personal mail. Turn on 2FA for it: whoever controls this inbox can reset every other account.`,
                },
              },
              {
                title: { fa: 'یک Password Manager', en: 'A password manager' },
                text: {
                  fa: `برای هر حساب یک رمز طولانی و یکتا بسازید و در Password Manager نگه دارید. کدهای پشتیبان (Recovery Codes) 2FA را هم همان‌جا ذخیره کنید. Tokenهایی که بعداً برای Agent می‌سازید هم جایشان همین‌جاست، نه در یادداشت‌های گوشی.`,
                  en: `Generate a long, unique password for every account and keep it in a password manager. Store your 2FA recovery codes there too. The tokens you create later for your agent belong there as well, not in your phone's notes app.`,
                },
              },
              {
                title: { fa: 'حساب GitHub با 2FA', en: 'A GitHub account with 2FA' },
                text: {
                  fa: `GitHub خانه‌ی کد شماست. ثبت‌نام کنید، نام کاربری‌ای انتخاب کنید که بعداً از آن خجالت نکشید و تأیید دومرحله‌ای را با یک اپ Authenticator یا Passkey فعال کنید.`,
                  en: `GitHub is your code's home. Sign up, pick a username you will not be embarrassed by later, and enable two-factor authentication with an authenticator app or a passkey.`,
                },
              },
              {
                title: { fa: 'حساب Cloudflare با 2FA', en: 'A Cloudflare account with 2FA' },
                text: {
                  fa: `Cloudflare هم DNS دامنه‌تان را نگه می‌دارد و هم سایت را اجرا می‌کند. با همان ایمیل پروژه ثبت‌نام کنید، ایمیل را تأیید کنید و 2FA را روشن کنید. برای شروع، پلن رایگان کافی است.`,
                  en: `Cloudflare will hold your domain's DNS and also run your site. Sign up with the project email, verify the address and enable 2FA. The free plan is enough to start.`,
                },
              },
              {
                title: { fa: 'یک دامنه', en: 'A domain' },
                text: {
                  fa: `دامنه را می‌توانید از هر Registrar معتبری بخرید، یا مستقیم از Cloudflare Registrar. پایین‌تر توضیح می‌دهیم چطور انتخاب کنید.`,
                  en: `You can buy a domain from any reputable registrar, or directly from Cloudflare Registrar. We cover how to choose below.`,
                },
              },
              {
                title: { fa: 'حساب سازنده‌ی سایت: Codex یا Lovable', en: 'A builder account: Codex or Lovable' },
                text: {
                  fa: `یکی از دو مسیر اصلی دوره را انتخاب کنید: **OpenAI Codex** از طریق حساب ChatGPT (کد در Repository خودتان، میزبانی روی Cloudflare)، یا **Lovable** (ساخت سایت با چت در مرورگر، با میزبانی و Database داخلی). **Claude Code** از طریق حساب Claude هم جایگزینی قوی برای Codex است. پلن‌ها و سقف‌ها زود عوض می‌شوند؛ قبل از خرید صفحه‌ی رسمی را ببینید.`,
                  en: `Pick one of the course's two main paths: **OpenAI Codex** through a ChatGPT account (code in your own repository, hosting on Cloudflare), or **Lovable** (build by chatting in the browser, with built-in hosting and database). **Claude Code** through a Claude account is a strong alternative to Codex. Plans and limits change often; check the official pages before you pay.`,
                },
              },
            ],
          },
          {
            type: 'path',
            codex: [
              {
                type: 'callout',
                tone: 'tip',
                title: { fa: 'کدام پلن برای Codex؟', en: 'Which plan for Codex?' },
                text: {
                  fa: `طبق راهنمای OpenAI، Codex در همه‌ی پلن‌های ChatGPT هست (حتی Free و Go) و سقف استفاده با پلن فرق می‌کند. اما **Codex Cloud**، یعنی کاری که روی کامپیوترهای OpenAI و حتی وقتی کامپیوتر شما خاموش است ادامه پیدا می‌کند، از پلن **Plus** به بالا (و پلن‌های سازمانی) فعال است. اگر Claude Code را ترجیح می‌دهید، در پلن‌های **Pro، Max، Ultra، Team و Enterprise** هست و سقفش با Claude مشترک است.`,
                  en: `According to OpenAI's help center, Codex is included in every ChatGPT plan (even Free and Go), with usage limits that vary by plan. **Codex Cloud**, which keeps working on OpenAI's computers even while yours sleeps, needs **Plus** or higher (or a business plan). If you prefer Claude Code, it comes with **Pro, Max, Ultra, Team and Enterprise**, sharing limits with Claude.`,
                },
              },
            ],
            lovable: [
              {
                type: 'callout',
                tone: 'tip',
                title: { fa: 'پلن‌ها و Credit در Lovable', en: 'Plans and credits in Lovable' },
                text: {
                  fa: `Lovable با **Credit** کار می‌کند: هر پیام و هر تغییر مقداری Credit مصرف می‌کند، و اجرای سایت منتشرشده (میزبانی، Database داخلی، امکانات AI در خود سایت) هم از همین موجودی برداشت می‌کند. پلن رایگان هر روز چند Credit می‌دهد که برای امتحان کافی است؛ دامنه‌ی اختصاصی، ویرایش و دانلود کد از پلن **Pro** به بالاست. قیمت‌ها و مقدارها را همیشه در صفحه‌ی رسمی Pricing چک کنید.`,
                  en: `Lovable runs on **credits**: each message and change uses some, and running the published site (hosting, the built-in database, AI features inside the app) draws from the same balance. The free plan gives a few credits a day, enough to try it; custom domains, code editing and code download start at **Pro**. Always check prices and amounts on the official pricing page.`,
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'پرداخت و محدودیت منطقه‌ای', en: 'Payments and regional limits' },
            text: {
              fa: `بعضی سرویس‌ها در همه‌ی کشورها در دسترس نیستند یا پرداختشان با هر کارتی ممکن نیست. برای نمونه، در زمان نوشتن این درس ایران در فهرست کشورهای پشتیبانی‌شده‌ی OpenAI و Anthropic نیست، و شرایط استفاده‌ی Lovable استفاده از کشورهای تحت تحریم جامع را مجاز نمی‌داند. قبل از شروع، فهرست رسمی هر سرویس را ببینید و از روش پرداختی استفاده کنید که با قوانین آن سرویس سازگار است؛ حسابی که بعداً به‌خاطر نقض قوانین بسته شود، کل پروژه را با خودش می‌برد. گزینه‌های جایگزین، مثل مدل‌های کم‌هزینه‌ی DeepSeek داخل یک Agent متن‌باز، را در فصل مقایسه‌ی پلتفرم‌ها دیدید.`,
              en: `Some services are not available in every country, and not every card works for payment. For example, at the time of writing Iran is not on OpenAI's or Anthropic's supported-country lists, and Lovable's terms do not allow use from comprehensively sanctioned countries. Before you start, check each service's official list and use a payment method that complies with its terms; an account closed later for breaking the terms takes the whole project down with it. You saw alternatives, such as low-cost DeepSeek models inside an open-source agent, in the platform comparison chapter.`,
            },
          },
        ],
      },
      {
        id: 'picking-a-domain',
        title: { fa: 'انتخاب و خرید دامنه', en: 'Choosing and buying a domain' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `دامنه آدرس دائمی شماست، پس کمی برایش وقت بگذارید. یک نام خوب **کوتاه، قابل تلفظ، بدون خط تیره و بدون املای گیج‌کننده** است. اگر کسی آن را یک بار بشنود، باید بتواند درست تایپش کند.`,
              en: `A domain is your permanent address, so give it a little time. A good name is **short, easy to say, without hyphens and without confusing spelling**. Someone who hears it once should be able to type it correctly.`,
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: `**پسوند (TLD) را آگاهانه انتخاب کنید:** \`.com\` آشناترین است؛ پسوندهایی مثل \`.dev\` یا \`.app\` برای پروژه‌های فنی خوب‌اند. قیمت تمدید هر پسوند فرق دارد، فقط به قیمت سال اول نگاه نکنید.`,
                en: `**Pick the extension (TLD) deliberately:** \`.com\` is the most familiar; \`.dev\` or \`.app\` suit technical projects. Renewal prices differ per extension, so do not look only at the first-year price.`,
              },
              {
                fa: `**تمدید خودکار را روشن کنید.** دامنه‌ای که منقضی شود، ممکن است دیگر هرگز به شما برنگردد.`,
                en: `**Turn on auto-renew.** A domain that expires may never come back to you.`,
              },
              {
                fa: `**حریم خصوصی WHOIS:** اطلاعات صاحب دامنه در یک بانک عمومی به نام WHOIS ثبت می‌شود. بیشتر Registrarها این اطلاعات را مخفی (Redact) می‌کنند تا ایمیل و آدرس شما پخش نشود. مطمئن شوید روشن است.`,
                en: `**WHOIS privacy:** a domain's owner details are recorded in a public directory called WHOIS. Most registrars redact them so your email and address are not published. Make sure it is on.`,
              },
              {
                fa: `**ایمیل مالک را تأیید کنید.** بعد از خرید، یک ایمیل تأیید می‌آید. اگر تأییدش نکنید، طبق قوانین ICANN ممکن است دامنه معلق شود.`,
                en: `**Verify the owner email.** After purchase you get a verification email. If you ignore it, ICANN rules can put the domain on hold.`,
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'خرید از Cloudflare Registrar', en: 'Buying from Cloudflare Registrar' },
            text: {
              fa: `Cloudflare Registrar دامنه را **به قیمت تمام‌شده** می‌فروشد (همان مبلغی که رجیستری و ICANN می‌گیرند، بدون سود اضافه) و WHOIS را به‌طور پیش‌فرض مخفی می‌کند. نکته: دامنه‌ای که این‌جا می‌خرید، حتماً باید از Nameserverهای Cloudflare استفاده کند. اگر دامنه را جای دیگری خریده‌اید هم مشکلی نیست؛ در فصل دامنه‌ی اختصاصی یاد می‌گیرید Nameserverها را به Cloudflare بسپارید.`,
              en: `Cloudflare Registrar sells domains **at cost** (what the registry and ICANN charge, with no markup) and redacts WHOIS by default. Note: a domain bought there must use Cloudflare's nameservers. If you bought your domain elsewhere, that is fine too; in the custom-domain chapter you will point its nameservers to Cloudflare.`,
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'یک اشتباه رایج', en: 'A common mix-up' },
            text: {
              fa: `جایی که دامنه را از آن **می‌خرید** (Registrar) با جایی که **DNS آن را مدیریت می‌کند** (DNS Provider) لزوماً یکی نیست. می‌توانید دامنه را از یک شرکت بخرید و DNS آن را به Cloudflare بسپارید. این دو نقش جدا هستند.`,
              en: `Where you **buy** a domain (the registrar) is not necessarily where its **DNS is managed** (the DNS provider). You can buy from one company and hand DNS to Cloudflare. They are separate roles.`,
            },
          },
        ],
      },
      {
        id: 'local-tools',
        title: { fa: 'ابزارهای روی کامپیوتر: کی لازم‌اند؟', en: 'Tools on your computer: when do you need them?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `خبر خوب: برای شروع **لازم نیست چیزی نصب کنید**. Codex Cloud و Claude Code روی کامپیوترهای خودشان در Cloud کار می‌کنند؛ Repository GitHub شما را برمی‌دارند، کد را می‌نویسند، تست می‌کنند و Push می‌کنند. Lovable هم کاملاً در مرورگر اجرا می‌شود و پیش‌نمایش زنده‌ی سایت را همان‌جا نشان می‌دهد. شما فقط در مرورگر یا اپ موبایل با آن‌ها حرف می‌زنید.`,
              en: `Good news: to start, **you do not need to install anything**. Codex Cloud and Claude Code cloud sessions run on their own machines: they clone your GitHub repository, write code, run tests and push. Lovable runs entirely in the browser and shows a live preview of the site right there. You just talk to them in a browser or mobile app.`,
            },
          },
          {
            type: 'p',
            text: {
              fa: `ولی وقتی پروژه بزرگ‌تر شد، ابزارهای محلی کمک می‌کنند: سایت را روی کامپیوتر خودتان ببینید، سریع‌تر آزمایش کنید و دقیق‌تر بفهمید Agent چه کرده.`,
              en: `As the project grows, local tools help: you can see the site on your own computer, experiment faster and understand exactly what the agent changed.`,
            },
          },
          {
            type: 'terms',
            items: [
              {
                term: 'VS Code',
                def: {
                  fa: 'یک Code Editor رایگان. برای خواندن فایل‌ها، دیدن تغییرات و اجرای Agent در کنار کد.',
                  en: 'A free code editor. For reading files, reviewing changes and running an agent next to your code.',
                },
              },
              {
                term: 'Git',
                def: {
                  fa: 'ابزار Version Control روی کامپیوتر خودتان؛ همان چیزی که GitHub بر پایه‌اش ساخته شده.',
                  en: 'The version control tool on your own computer; what GitHub is built on.',
                },
              },
              {
                term: 'Node.js',
                def: {
                  fa: 'محیط اجرای JavaScript بیرون از مرورگر. بیشتر ابزارهای وب مدرن، از جمله wrangler، با آن اجرا می‌شوند.',
                  en: 'A JavaScript runtime outside the browser. Most modern web tooling, wrangler included, runs on it.',
                },
              },
              {
                term: 'wrangler',
                def: {
                  fa: 'ابزار خط فرمان رسمی Cloudflare برای ساخت، اجرای محلی و Deploy کردن Workerها و ساختن D1 و KV و R2.',
                  en: "Cloudflare's official command-line tool to create, run locally and deploy Workers, and to create D1, KV and R2 resources.",
                },
              },
              {
                term: '2FA',
                def: {
                  fa: 'تأیید دومرحله‌ای: علاوه بر رمز، یک کد از اپ یا یک Passkey هم لازم است.',
                  en: 'Two-factor authentication: besides the password, a code from an app or a passkey is required.',
                },
              },
            ],
          },
          {
            type: 'compare',
            headers: [
              { fa: 'موقعیت', en: 'Situation' },
              { fa: 'فقط Agent در Cloud', en: 'Cloud agent only' },
              { fa: 'ابزارهای محلی هم لازم است', en: 'Add local tools' },
            ],
            rows: [
              [
                { fa: 'اولین سایت ساده', en: 'Your first simple site' },
                { fa: 'کافی است', en: 'Enough' },
                { fa: 'لازم نیست', en: 'Not needed' },
              ],
              [
                { fa: 'آزمایش سریع ظاهر سایت', en: 'Rapid visual tweaking' },
                { fa: 'با Preview URL ممکن است', en: 'Possible via preview URLs' },
                { fa: 'سریع‌تر و راحت‌تر', en: 'Faster and smoother' },
              ],
              [
                { fa: 'دیباگ خطاهای پیچیده', en: 'Debugging tricky errors' },
                { fa: 'سخت‌تر', en: 'Harder' },
                { fa: 'توصیه می‌شود', en: 'Recommended' },
              ],
              [
                { fa: 'کار با فایل‌های روی کامپیوتر', en: 'Working with files on your machine' },
                { fa: 'ممکن نیست', en: 'Not possible' },
                { fa: 'لازم است', en: 'Required' },
              ],
            ],
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# Check what is already installed (run in a terminal)
git --version
node --version
npx wrangler --version`,
            caption: {
              fa: 'اگر بعداً سراغ ابزارهای محلی رفتید، با این سه فرمان ببینید چه چیزهایی نصب است.',
              en: 'If you move to local tools later, these three commands show what is already installed.',
            },
          },
          {
            type: 'prompt',
            title: { fa: 'از Agent بخواهید وضعیت را چک کند', en: 'Ask your agent to check your setup' },
            text: {
              fa: `من تازه حساب‌های GitHub و Cloudflare را ساخته‌ام و می‌خواهم با تو وب‌سایت «کافه سحر» را روی دامنه‌ی cafe-sahar.ir بسازم (Repository: cafe-sahar). قبل از هر کاری، یک چک‌لیست کوتاه بده از چیزهایی که برای ساخت و Deploy این سایت روی Cloudflare Workers لازم داری (حساب‌ها، دسترسی‌ها، ابزارها). برای هر مورد بگو آیا در محیط فعلی‌ات در دسترس است یا نه، و اگر نیست دقیقاً چه کاری از من لازم است. هنوز هیچ کدی ننویس و هیچ منبعی نساز.`,
              en: `I have just created my GitHub and Cloudflare accounts and want to build the "Café Sahar" website with you on the cafe-sahar.ir domain (repository: cafe-sahar). Before anything else, give me a short checklist of what you need to build and deploy this site on Cloudflare Workers (accounts, access, tools). For each item, tell me whether it is available in your current environment, and if not, exactly what I need to do. Do not write any code or create any resources yet.`,
            },
          },
          {
            type: 'quiz',
            q: {
              fa: 'برای ساختن اولین نسخه‌ی سایت کافه سحر با Codex Cloud، کدام مورد واقعاً ضروری است؟',
              en: 'To build the first version of the Café Sahar site with Codex Cloud, which item is truly required?',
            },
            options: [
              { fa: 'نصب VS Code و Node.js روی کامپیوتر خودتان', en: 'Installing VS Code and Node.js on your computer' },
              { fa: 'خرید یک سرور مجازی (VPS) برای اجرای دائمی سایت', en: 'Buying a virtual server (VPS) to run the site' },
              { fa: 'یادگرفتن کامل JavaScript پیش از شروع کار', en: 'Mastering JavaScript before you start at all' },
              { fa: 'یک حساب GitHub با Repository در دسترس Agent', en: 'A GitHub account whose repo the agent can reach' },
            ],
            answer: 3,
            explain: {
              fa: `Codex Cloud روی کامپیوترهای خودش کار می‌کند، کد را از GitHub برمی‌دارد و همان‌جا Push می‌کند. ابزارهای محلی بعداً مفیدند و سرور جدا هم لازم نیست، چون Cloudflare Workers سایت را اجرا می‌کند.`,
              en: `Codex Cloud runs on its own machines, clones your code from GitHub and pushes back there. Local tools help later, and no separate server is needed because Cloudflare Workers runs the site.`,
            },
            why: [
              {
                fa: 'مفید است ولی ضروری نیست: Agent در Cloud روی کامپیوتر خودش کار می‌کند و به نصب چیزی روی سیستم شما نیاز ندارد.',
                en: "Useful but not required: the cloud agent works on its own machine and needs nothing installed on yours.",
              },
              {
                fa: 'لازم نیست: Cloudflare Workers سایت را روی شبکه‌ی Cloudflare اجرا می‌کند و سروری برای نگه‌داری ندارید.',
                en: 'Not needed: Cloudflare Workers runs the site on Cloudflare\'s network, with no server for you to maintain.',
              },
              {
                fa: 'لازم نیست: کار شما تعریف پروژه، بازبینی و تصمیم‌گیری است؛ کد را Agent می‌نویسد و کم‌کم یاد می‌گیرید.',
                en: 'Not needed: your job is defining, reviewing and deciding; the agent writes the code and you learn as you go.',
              },
              {
                fa: 'درست است. Codex Cloud کد را از Repository شما برمی‌دارد و تغییرات را همان‌جا Push می‌کند؛ بدون این دسترسی کاری پیش نمی‌رود.',
                en: 'Correct. Codex Cloud clones your repository and pushes changes back to it; without that access nothing moves.',
              },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'GitHub Docs: Configuring two-factor authentication', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication' },
              { label: 'Cloudflare Registrar', url: 'https://developers.cloudflare.com/registrar/' },
              { label: 'Cloudflare Registrar: WHOIS redaction', url: 'https://developers.cloudflare.com/registrar/account-options/whois-redaction/' },
              { label: 'OpenAI Help: Using Codex with your ChatGPT plan', url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan' },
              { label: 'Claude Help: Using Claude Code with your plan', url: 'https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan' },
              { label: 'Claude Code Docs: Get started in the cloud', url: 'https://code.claude.com/docs/en/web-quickstart' },
              { label: 'Lovable Docs: Plans and credits', url: 'https://docs.lovable.dev/introduction/plans-and-credits' },
              { label: 'Lovable: Pricing', url: 'https://lovable.dev/pricing' },
              { label: 'Cloudflare Docs: Install Wrangler', url: 'https://developers.cloudflare.com/workers/wrangler/install-and-update/' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: `این فصل همه‌ی مفاهیم پرده‌ی اول را به حساب‌های واقعی تبدیل می‌کند: GitHub همان Repository است که درباره‌اش خواندید، Cloudflare همان میزبان و DNS Provider، و دامنه همان آدرسی که DNS به آن معنا می‌دهد. در فصل بعد، این حساب‌ها را با دسترسی محدود و امن به Agent وصل می‌کنید.`,
      en: `This chapter turns Act I's concepts into real accounts: GitHub is the repository you read about, Cloudflare is the host and DNS provider, and the domain is the address DNS gives meaning to. In the next chapter you connect these accounts to your agent with limited, safe access.`,
    },
    takeaways: [
      { fa: 'صاحب حساب‌ها شما هستید؛ Agent فقط با اجازه‌ی شما کار می‌کند.', en: 'You own the accounts; the agent works only with the access you grant.' },
      { fa: 'یک ایمیل مخصوص، Password Manager و 2FA روی همه‌ی حساب‌ها، از روز اول.', en: 'A dedicated email, a password manager and 2FA on every account, from day one.' },
      { fa: 'Registrar (جای خرید دامنه) و DNS Provider دو نقش جدا هستند.', en: 'The registrar (where you buy) and the DNS provider are separate roles.' },
      { fa: 'برای شروع با Agentهای Cloud یا Lovable نصب چیزی لازم نیست؛ ابزارهای محلی برای بعد.', en: 'Cloud agents and Lovable need no installs to start; local tools come later.' },
      { fa: 'Codex با پلن ChatGPT و Lovable با Credit کار می‌کند؛ پیش از خرید، صفحه‌ی رسمی و قوانین کشورها را ببینید.', en: 'Codex comes with a ChatGPT plan and Lovable runs on credits; check official pages and country rules before paying.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Chapter: connect-agent
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'connect-agent',
    act: 2,
    icon: 'plug',
    voice: {
      src: '/audio/voice3.mp3',
      from: 65,
      to: 322,
      transcript:
        'این عامل برای این‌که کارها را درست انجام بدهد، باید به سرویس‌هایی که گفتیم وصل شود: Hosting Provider، Repository و هر چیز دیگری که لازم است. در مثال ما GitHub و Cloudflare. شما فقط با او چت می‌کنید: «یک وب‌سایت X می‌خواهم با این شرایط؛ این Repository من است، این دامنه‌ی من است و به Cloudflare دسترسی داری.» اول یک Design تحویل می‌دهد؛ تأیید که کنید کد را می‌نویسد، در GitHub Push می‌کند، Worker را بالا می‌آورد، GitHub را به Cloudflare وصل می‌کند و دامنه را به Worker. مثلاً یک ساعت بعد سایت باز می‌شود. اما جزئیات زیاد است و شیطان در جزئیات است.',
    },
    title: { fa: 'وصل کردن Agent به GitHub و Cloudflare', en: 'Connecting your agent to GitHub and Cloudflare' },
    tagline: {
      fa: 'به Agent دست و پا بدهید: دسترسی به کد و زیرساخت، اما فقط به اندازه‌ی لازم.',
      en: 'Give your agent hands: access to code and infrastructure, but only as much as it needs.',
    },
    minutes: 29,
    mission: {
      outcome: {
        fa: 'Agent شما با کمترین دسترسی لازم به GitHub و Cloudflare وصل است و هر Push خودکار منتشر می‌شود.',
        en: 'Your agent is connected to GitHub and Cloudflare with the least access it needs, and every push deploys automatically.',
      },
      cafe: {
        fa: 'Agent حالا به Repository کافه سحر (cafe-sahar) و به Cloudflare دسترسی دارد؛ سایت می‌تواند خودکار منتشر شود.',
        en: "The agent can now reach Café Sahar's repository (cafe-sahar) and Cloudflare; the site can deploy on its own.",
      },
    },
    warmup: {
      q: {
        fa: 'از فصل قبل: چرا برای حساب‌های پروژه یک ایمیل جدا با 2FA توصیه شد؟',
        en: 'From the last chapter: why use a separate email with 2FA for project accounts?',
      },
      options: [
        { fa: 'چون GitHub با ایمیل شخصی اصلاً ثبت‌نام نمی‌کند', en: 'Because GitHub rejects personal email sign-ups' },
        { fa: 'چون Cloudflare ایمیل‌های رایگان را اصلاً قبول ندارد', en: 'Because Cloudflare refuses free email addresses' },
        { fa: 'چون صاحب آن ایمیل رمز همه‌ی حساب‌ها را عوض می‌کند', en: 'Because whoever owns it can reset every account' },
      ],
      answer: 2,
      explain: {
        fa: 'ایمیل پروژه کلید بازیابی همه‌ی حساب‌هاست؛ اگر کسی به آن برسد، می‌تواند رمز GitHub و Cloudflare را عوض کند. پس جدا نگهش دارید و 2FA آن را روشن کنید.',
        en: 'The project email is the recovery key for every account; anyone who reaches it can reset GitHub and Cloudflare. Keep it separate and turn on its 2FA.',
      },
      why: [
        {
          fa: 'این‌طور نیست؛ GitHub با هر ایمیل معتبری ثبت‌نام می‌کند. دلیل اصلی، امنیت بازیابی رمزهاست.',
          en: 'Not true; GitHub accepts any valid email. The real reason is password-recovery security.',
        },
        {
          fa: 'این‌طور نیست؛ Cloudflare با ایمیل‌های رایگان هم کار می‌کند. نکته این است که آن ایمیل خوب محافظت شود.',
          en: 'Not true; Cloudflare works with free email too. What matters is that the email is well protected.',
        },
        {
          fa: 'درست است. هر کس به این ایمیل برسد، با «فراموشی رمز» به بقیه‌ی حساب‌ها هم می‌رسد؛ 2FA این در را می‌بندد.',
          en: 'Correct. Whoever reaches this inbox can use "forgot password" on every other account; 2FA closes that door.',
        },
      ],
    },
    mascotLine: {
      fa: 'وقتی به GitHub و Cloudflare وصلم کنید، خودم کد را Push می‌کنم و سایت را بالا می‌آورم. فقط کلید همه‌ی درها را به من ندهید!',
      en: "Once you plug me into GitHub and Cloudflare, I can push code and bring the site up myself. Just don't hand me the keys to every door!",
    },
    sections: [
      {
        id: 'why-connect',
        title: { fa: 'چرا Agent را وصل می‌کنیم؟', en: 'Why connect the agent at all?' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `یک Agent بدون اتصال، فقط می‌تواند کد بنویسد و به شما بدهد؛ بعدش کپی کردن، ذخیره کردن، آپلود و تنظیم سرور با خودتان است. اما وقتی Agent به **GitHub** و **Cloudflare** وصل باشد، می‌تواند خودش کد را در Repository شما Push کند، یک Worker بسازد، رکوردهای DNS را تنظیم کند، Database D1 یا فضای KV و R2 بسازد و حتی GitHub را به Cloudflare وصل کند تا هر Push خودکار منتشر شود.`,
              en: `An unconnected agent can only write code and hand it to you; copying, saving, uploading and configuring a server are then your job. Connected to **GitHub** and **Cloudflare**, it can push code to your repository itself, create a Worker, set DNS records, create a D1 database or KV and R2 storage, and even link GitHub to Cloudflare so every push deploys automatically.`,
            },
          },
          {
            type: 'p',
            text: {
              fa: `همان‌طور که در ویس آموزشی گفتیم: شما فقط چت می‌کنید، و ممکن است حدود یک ساعت بعد ببینید سایت روی دامنه‌تان بالا آمده. اما «شیطان در جزئیات است». این‌که Agent به چه چیزهایی دسترسی دارد و شما چطور کارش را بررسی می‌کنید، فرق یک تجربه‌ی لذت‌بخش با یک دردسر بزرگ است.`,
              en: `As the voice lesson puts it: you just chat, and maybe an hour later the site is live on your domain. But the devil is in the details. What the agent can access, and how you review its work, is the difference between a delightful experience and a big headache.`,
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: 'اصل کمترین دسترسی', en: 'The principle of least privilege' },
            text: {
              fa: `به Agent دقیقاً همان دسترسی‌ای را بدهید که برای این پروژه لازم دارد؛ نه بیشتر. اگر روزی Token لو برود یا Agent اشتباه کند، خسارت به همان چند Repository و همان یک دامنه محدود می‌ماند، نه کل حساب شما.`,
              en: `Give the agent exactly the access this project needs, no more. If a token ever leaks or the agent makes a mistake, the damage stays limited to those few repositories and that one domain, not your whole account.`,
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: `در مسیر Codex هر سه قدم این فصل لازم است: Codex را به GitHub وصل می‌کنید، یک Token محدود Cloudflare در Secrets محیطش می‌گذارید، و Workers Builds را روشن می‌کنید تا هر Push خودکار منتشر شود.`,
                  en: `On the Codex path you need all three steps in this chapter: connect Codex to GitHub, put a scoped Cloudflare token in its environment secrets, and turn on Workers Builds so every push deploys automatically.`,
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: `در مسیر Lovable کار سبک‌تر است: میزبانی (روی آدرس lovable.app) و Database داخلی از قبل آماده‌اند، پس برای شروع **به Token کلودفلر نیاز ندارید**. اتصال GitHub را با **Git sync** خود Lovable انجام می‌دهید تا کد همیشه یک نسخه در Repository خودتان داشته باشد. قدم Cloudflare فقط وقتی لازم می‌شود که بخواهید سایت را روی Cloudflare خودتان منتشر کنید.`,
                  en: `On the Lovable path it is lighter: hosting (on a lovable.app address) and a built-in database are ready, so to start **you need no Cloudflare token**. You connect GitHub with Lovable's own **Git sync** so your code always has a copy in your own repository. The Cloudflare step matters only if you want to publish on your own Cloudflare.`,
                },
              },
            ],
          },
        ],
      },
      {
        id: 'connect-github',
        title: { fa: 'قدم اول: وصل کردن GitHub', en: 'Step one: connecting GitHub' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `هر دو Agent برای وصل شدن به GitHub از یک **GitHub App** استفاده می‌کنند. شما در صفحه‌ی GitHub اجازه می‌دهید و انتخاب می‌کنید App به کدام Repositoryها دسترسی داشته باشد.`,
              en: `Both agents connect to GitHub through a **GitHub App**. You approve it on GitHub's own page and choose which repositories the app may access.`,
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'steps',
                items: [
                  {
                    title: { fa: 'یک Repository خالی بسازید', en: 'Create an empty repository' },
                    text: {
                      fa: `در GitHub یک Repository جدید با یک README بسازید. Private بودنش برای شروع انتخاب امن‌تری است.`,
                      en: `On GitHub, create a new repository with a README. Private is the safer choice to start.`,
                    },
                  },
                  {
                    title: { fa: 'Codex: از ChatGPT وصل شوید', en: 'Codex: connect from ChatGPT' },
                    text: {
                      fa: `در Codex یک Cloud environment بسازید؛ اگر GitHub وصل نباشد از شما می‌خواهد App مربوط را در GitHub نصب و تأیید کنید. بعد Repository پروژه را انتخاب می‌کنید و Codex محیط را برایش آماده می‌کند.`,
                      en: `In Codex, create a cloud environment; if GitHub is not connected yet, it asks you to install and authorize its app on GitHub. Then pick the project repository and Codex prepares the environment for it.`,
                    },
                  },
                  {
                    title: { fa: 'Claude Code: از claude.ai/code وصل شوید', en: 'Claude Code: connect from claude.ai/code' },
                    text: {
                      fa: `وارد claude.ai/code شوید و با GitHub ورود کنید. برای Repositoryهای Private، **Claude GitHub App** را روی حسابتان نصب کنید. اگر روی کامپیوترتان از \`gh\` استفاده می‌کنید، فرمان \`/web-setup\` هم راه دیگری برای اتصال است.`,
                      en: `Go to claude.ai/code and sign in with GitHub. For private repositories, install the **Claude GitHub App** on your account. If you already use \`gh\` on your computer, the \`/web-setup\` command is another way to connect.`,
                    },
                  },
                  {
                    title: { fa: 'فقط Repositoryهای لازم را انتخاب کنید', en: 'Select only the repositories needed' },
                    text: {
                      fa: `هنگام نصب App، به‌جای «All repositories» گزینه‌ی «Only select repositories» را بزنید و فقط Repository همین پروژه را تیک بزنید. بعداً هر وقت لازم شد، می‌توانید Repository اضافه کنید.`,
                      en: `When installing the app, choose "Only select repositories" instead of "All repositories" and tick just this project's repository. You can add more any time later.`,
                    },
                  },
                ],
              },
            ],
            lovable: [
              {
                type: 'steps',
                items: [
                  {
                    title: { fa: 'پروژه را در Lovable بسازید', en: 'Create the project in Lovable' },
                    text: {
                      fa: `در Lovable یک پروژه‌ی تازه بسازید و اولین Prompt را برای سایت کافه سحر بنویسید. هر تغییر در تاریخچه‌ی نسخه‌ها (Version history) ذخیره می‌شود.`,
                      en: `In Lovable, create a new project and write the first prompt for the Café Sahar site. Every change is saved in the version history.`,
                    },
                  },
                  {
                    title: { fa: 'GitHub را از تنظیمات پروژه وصل کنید', en: 'Connect GitHub from the project settings' },
                    text: {
                      fa: `از بخش Integrations یا GitHub در پروژه، حساب GitHub را وصل کنید و اجازه دهید Lovable یک Repository (مثلاً cafe-sahar) بسازد. هنگام نصب App، فقط حساب یا Repositoryهای لازم را انتخاب کنید.`,
                      en: `From the project's integrations or GitHub settings, connect your GitHub account and let Lovable create a repository (for example cafe-sahar). When installing the app, select only the accounts or repositories it needs.`,
                    },
                  },
                  {
                    title: { fa: 'Git sync دوطرفه را بشناسید', en: 'Understand two-way Git sync' },
                    text: {
                      fa: `تغییرات Lovable به GitHub می‌رود و تغییراتی که در شاخه‌ی فعال GitHub Push شود، به Lovable برمی‌گردد. همگام‌سازی روی **یک شاخه** کار می‌کند؛ پس اگر بعداً Codex هم روی همین Repository کار کند، روی همان شاخه یا با Pull Request هماهنگ کنید.`,
                      en: `Lovable's changes go to GitHub, and changes pushed to the active GitHub branch come back into Lovable. Sync works on **one branch** at a time, so if Codex later works on the same repository, coordinate on that branch or through pull requests.`,
                    },
                  },
                  {
                    title: { fa: 'Repository را پاک نکنید', en: 'Do not delete the repository' },
                    text: {
                      fa: `اگر Repository همگام‌شده را پاک کنید، همگام‌سازی قطع می‌شود. Repository را Private نگه دارید؛ این همان نسخه‌ی پشتیبان و راه خروج شما از Lovable است.`,
                      en: `Deleting the synced repository stops the sync. Keep the repository private; it is your backup copy and your way out of Lovable.`,
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'وصل شدن یعنی همه‌کاره شدن نیست', en: 'Connected does not mean all-powerful' },
            text: {
              fa: `Agent فقط به Repositoryهایی دسترسی دارد که App روی آن‌ها نصب است. اگر Agent می‌گوید Repositoryای را نمی‌بیند، معمولاً یعنی آن Repository در تنظیمات App انتخاب نشده؛ راه‌حلش اضافه کردن همان Repository است، نه دادن دسترسی به همه.`,
              en: `The agent can reach only the repositories the app is installed on. If it says it cannot see a repository, that repository usually is not selected in the app settings; the fix is to add that one repository, not to grant access to everything.`,
            },
          },
        ],
      },
      {
        id: 'connect-cloudflare',
        title: { fa: 'قدم دوم: وصل کردن Cloudflare با Token محدود', en: 'Step two: connecting Cloudflare with a scoped token' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `Cloudflare سه راه اصلی برای دادن دسترسی دارد. برای Agentهای Cloud، رایج‌ترین راه یک **API Token سفارشی** است که فقط مجوزهای لازم را دارد.`,
              en: `Cloudflare offers three main ways to grant access. For cloud agents, the most common is a **custom API token** that carries only the permissions needed.`,
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'callout',
                tone: 'tip',
                title: { fa: 'این بخش برای مسیر Codex ضروری است', en: 'This step is essential on the Codex path' },
                text: {
                  fa: `Codex خودش Worker می‌سازد، DNS تنظیم می‌کند و لاگ‌ها را می‌خواند؛ برای همه‌ی این‌ها Token لازم دارد. قدم‌های پایین را کامل انجام دهید.`,
                  en: `Codex creates the Worker, sets DNS and reads logs itself; it needs a token for all of that. Follow the steps below in full.`,
                },
              },
            ],
            lovable: [
              {
                type: 'callout',
                tone: 'tip',
                title: { fa: 'در Lovable این بخش اختیاری است', en: 'On Lovable this step is optional' },
                text: {
                  fa: `اگر سایت را با دکمه‌ی **Publish** روی lovable.app (و دامنه‌ی اختصاصی در پلن پولی) منتشر می‌کنید، Token کلودفلر لازم نیست. فقط وقتی Repository همگام‌شده را روی Cloudflare خودتان منتشر می‌کنید، Workers Builds با اتصال خودش کار می‌کند؛ Token را فقط برای Agentی بسازید که بعداً قرار است مستقیم روی Cloudflare کار کند.`,
                  en: `If you publish with the **Publish** button to lovable.app (plus a custom domain on a paid plan), you need no Cloudflare token. Only when you deploy the synced repository to your own Cloudflare does Workers Builds use its own connection; create a token only for an agent that will work on Cloudflare directly later.`,
                },
              },
            ],
          },
          {
            type: 'compare',
            headers: [
              { fa: 'روش', en: 'Method' },
              { fa: 'کجا مناسب است', en: 'Where it fits' },
              { fa: 'نکته', en: 'Note' },
            ],
            rows: [
              [
                { fa: 'API Token سفارشی', en: 'Custom API token' },
                { fa: 'Agent در Cloud (Codex یا Claude Code)', en: 'Cloud agents (Codex or Claude Code)' },
                { fa: 'به‌صورت Secret در Environment ذخیره کنید', en: 'Store as a secret in the environment' },
              ],
              [
                { fa: '`wrangler login`', en: '`wrangler login`' },
                { fa: 'Agent روی کامپیوتر خودتان', en: 'An agent on your own computer' },
                { fa: 'ورود از طریق مرورگر، بدون کپی Token', en: 'Browser sign-in, no token copying' },
              ],
              [
                { fa: 'سرور MCP رسمی Cloudflare', en: "Cloudflare's official MCP server" },
                { fa: 'Agentهایی که MCP را پشتیبانی می‌کنند', en: 'Agents that support MCP' },
                { fa: 'ورود با OAuth و انتخاب مجوزها', en: 'OAuth sign-in, you choose permissions' },
              ],
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'به صفحه‌ی API Tokens بروید', en: 'Open the API Tokens page' },
                text: {
                  fa: `در داشبورد Cloudflare به **My Profile** و بعد **API Tokens** بروید و **Create Token** را بزنید. یک قالب آماده انتخاب کنید یا از صفر یک Custom Token بسازید.`,
                  en: `In the Cloudflare dashboard go to **My Profile**, then **API Tokens**, and select **Create Token**. Pick a template or build a custom token from scratch.`,
                },
              },
              {
                title: { fa: 'فقط مجوزهای لازم را اضافه کنید', en: 'Add only the permissions you need' },
                text: {
                  fa: `برای یک سایت روی Workers معمولاً این‌ها کافی است: در سطح Account، **Workers Scripts: Edit**، **Account Settings: Read** و **Workers Tail: Read** (تا Agent بتواند با \`npx wrangler tail\` لاگ زنده را ببیند)؛ و فقط اگر لازم دارید، **D1: Edit**، **Workers KV Storage: Edit** و **Workers R2 Storage: Edit**. در سطح Zone، **DNS: Edit** و **Workers Routes: Edit**. «Edit» یعنی ساختن، خواندن، تغییر و حذف؛ «Read» یعنی فقط دیدن.`,
                  en: `For a site on Workers this is usually enough: at account level, **Workers Scripts: Edit**, **Account Settings: Read** and **Workers Tail: Read** (so the agent can watch live logs with \`npx wrangler tail\`); and only if needed, **D1: Edit**, **Workers KV Storage: Edit** and **Workers R2 Storage: Edit**. At zone level, **DNS: Edit** and **Workers Routes: Edit**. "Edit" means create, read, update and delete; "Read" means view only.`,
                },
              },
              {
                title: { fa: 'منابع را محدود کنید', en: 'Limit the resources' },
                text: {
                  fa: `در بخش Account Resources فقط حساب خودتان، و در Zone Resources فقط **همان یک دامنه** را انتخاب کنید، نه «All zones». در صورت امکان تاریخ انقضا هم بگذارید.`,
                  en: `Under Account Resources pick only your account, and under Zone Resources pick **just that one domain**, not "All zones". Set an expiry date if you can.`,
                },
              },
              {
                title: { fa: 'Token را مثل رمز نگه دارید', en: 'Treat the token like a password' },
                text: {
                  fa: `Token فقط یک بار نشان داده می‌شود. آن را مستقیم در بخش **Secrets یا Environment variables** محیط Agent (در Codex یا Claude Code) بگذارید، مثلاً با نام \`CLOUDFLARE_API_TOKEN\`، و یک نسخه در Password Manager نگه دارید.`,
                  en: `The token is shown only once. Put it straight into the agent environment's **secrets or environment variables** (in Codex or Claude Code), for example as \`CLOUDFLARE_API_TOKEN\`, and keep a copy in your password manager.`,
                },
              },
            ],
          },
          { type: 'widget', id: 'token-builder' },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'هرگز این کارها را نکنید', en: 'Never do these' },
            text: {
              fa: `Token را **در چت با Agent paste نکنید** و **هرگز در کد یا Repository قرار ندهید**؛ چیزی که Commit شود، در تاریخچه‌ی Git می‌ماند. از Global API Key استفاده نکنید، چون به همه‌چیز دسترسی دارد. Tokenها را هر چند وقت یک بار عوض (Rotate) کنید و هر Token بلااستفاده را حذف کنید. و مهم‌تر از همه: **کار Agent را بررسی کنید**؛ قبل از Merge تغییرات را ببینید و فهرست کارهایی را که روی Cloudflare انجام داده بخواهید.`,
              en: `**Do not paste the token into the chat** and **never put it in code or the repository**; anything committed stays in Git history. Do not use the Global API Key, because it can do everything. Rotate tokens periodically and delete unused ones. Above all, **review the agent's work**: look at changes before merging and ask for a list of what it did in Cloudflare.`,
            },
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# Option for an agent on your own computer: sign in through the browser
npx wrangler login

# Check which account and permissions wrangler is using
npx wrangler whoami`,
            caption: {
              fa: 'اگر Agent روی کامپیوتر خودتان اجرا می‌شود، با wrangler login بدون کپی کردن Token وارد شوید.',
              en: 'If your agent runs on your own computer, wrangler login signs you in without copying a token.',
            },
          },
        ],
      },
      {
        id: 'deploy-on-push',
        title: { fa: 'قدم سوم: هر Push، یک انتشار خودکار', en: 'Step three: every push, an automatic deploy' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `حالا GitHub و Cloudflare را مستقیم به هم وصل می‌کنیم. با **Workers Builds**، هر Push به شاخه‌ی اصلی (Production branch، معمولاً \`main\`) خودکار Build و Deploy می‌شود. اگر Preview builds را روشن کنید، هر شاخه‌ی دیگر یک **Preview URL** جدا می‌گیرد و Cloudflare آن را زیر Pull Request در GitHub کامنت می‌کند. یعنی قبل از Merge، نسخه‌ی جدید را واقعاً می‌بینید.`,
              en: `Now we link GitHub and Cloudflare directly. With **Workers Builds**, every push to the production branch (usually \`main\`) builds and deploys automatically. If you turn on preview builds, every other branch gets its own **preview URL**, and Cloudflare comments it on the GitHub pull request. You see the new version for real before merging.`,
            },
          },
          {
            type: 'list',
            ordered: true,
            items: [
              {
                fa: `در داشبورد Cloudflare به **Workers & Pages** بروید و Worker خود را باز کنید (یا یک پروژه‌ی جدید را از Repository بسازید).`,
                en: `In the Cloudflare dashboard, go to **Workers & Pages** and open your Worker (or create a new project from your repository).`,
              },
              {
                fa: `در **Settings** و بخش **Builds** گزینه‌ی **Connect** را بزنید، GitHub را انتخاب کنید و Cloudflare GitHub App را برای همان Repository تأیید کنید.`,
                en: `Under **Settings**, then **Builds**, select **Connect**, choose GitHub and authorize the Cloudflare GitHub App for that repository.`,
              },
              {
                fa: `Production branch را بررسی کنید و Preview builds را روشن کنید.`,
                en: `Check the production branch and turn on preview builds.`,
              },
              {
                fa: `یک تغییر کوچک Push کنید و ببینید Build اجرا و سایت به‌روز می‌شود.`,
                en: `Push a small change and watch the build run and the site update.`,
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'این کار را هم می‌توانید به Agent بسپارید', en: 'You can delegate this too' },
            text: {
              fa: `بخشی از این تنظیمات را Agent با Token شما انجام می‌دهد، ولی نصب Cloudflare GitHub App یک تأیید یک‌باره در GitHub می‌خواهد که باید خودتان بزنید. اگر Agent گفت «Git integration وصل نیست»، معمولاً همین قدم جا مانده.`,
              en: `The agent can do part of this with your token, but installing the Cloudflare GitHub App needs a one-time approval on GitHub that you must click yourself. If the agent says the Git integration is not connected, this step is usually what is missing.`,
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: {
                  fa: `در مسیر Codex، همین Workers Builds موتور انتشار شماست: Codex روی یک شاخه کار می‌کند و Pull Request باز می‌کند، Cloudflare یک Preview URL می‌دهد، شما بررسی و Merge می‌کنید و نسخه‌ی تازه روی cafe-sahar.ir منتشر می‌شود.`,
                  en: `On the Codex path, Workers Builds is your publishing engine: Codex works on a branch and opens a pull request, Cloudflare gives a preview URL, you review and merge, and the new version goes live on cafe-sahar.ir.`,
                },
              },
            ],
            lovable: [
              {
                type: 'p',
                text: {
                  fa: `در مسیر Lovable دو انتخاب دارید. **ساده:** دکمه‌ی Publish، که سایت را روی lovable.app منتشر می‌کند (دامنه‌ی اختصاصی در پلن پولی)؛ Lovable پیش از انتشار بررسی‌های امنیتی هم اجرا می‌کند. **روی Cloudflare خودتان:** Repository همگام‌شده را با همین مراحل به Workers Builds وصل کنید. اپ‌های تازه‌ی Lovable روی TanStack Start ساخته می‌شوند که wrangler آن را تشخیص می‌دهد؛ متغیرهای Database (مثل آدرس و کلید عمومی Supabase) را هم در تنظیمات Worker بگذارید و اول یک انتشار آزمایشی بگیرید.`,
                  en: `On the Lovable path you have two choices. **Simple:** the Publish button, which puts the site on lovable.app (custom domain on a paid plan); Lovable runs security checks before publishing. **On your own Cloudflare:** connect the synced repository to Workers Builds with these same steps. New Lovable apps are built on TanStack Start, which wrangler detects; add the database variables (such as the Supabase URL and publishable key) in the Worker settings and do a test deploy first.`,
                },
              },
            ],
          },
          {
            type: 'terms',
            items: [
              {
                term: 'GitHub App',
                def: {
                  fa: 'برنامه‌ای که با اجازه‌ی شما و فقط روی Repositoryهای انتخاب‌شده در GitHub کار می‌کند.',
                  en: 'An app that works in GitHub with your permission and only on the repositories you select.',
                },
              },
              {
                term: 'API Token',
                def: {
                  fa: 'یک کلید محدود برای دسترسی برنامه‌ها به حساب Cloudflare، با مجوزها و منابع مشخص.',
                  en: 'A limited key that lets programs access your Cloudflare account, with defined permissions and resources.',
                },
              },
              {
                term: 'Secret',
                def: {
                  fa: 'مقداری حساس (مثل Token) که جدا از کد و به‌شکل رمزشده نگه داشته می‌شود.',
                  en: 'A sensitive value (like a token) kept encrypted and separate from code.',
                },
              },
              {
                term: 'Workers Builds',
                def: {
                  fa: 'سیستم CI/CD داخلی Cloudflare که با هر Push، Worker را Build و Deploy می‌کند.',
                  en: "Cloudflare's built-in CI/CD that builds and deploys your Worker on every push.",
                },
              },
              {
                term: 'Preview URL',
                def: {
                  fa: 'آدرسی جدا برای دیدن نسخه‌ی یک شاخه، بدون دست زدن به سایت اصلی.',
                  en: "A separate address to see a branch's version without touching the live site.",
                },
              },
              {
                term: 'Git sync',
                def: {
                  fa: 'همگام‌سازی دوطرفه‌ی Lovable با GitHub: تغییرات Lovable به Repository می‌رود و Pushهای شاخه‌ی فعال به Lovable برمی‌گردد.',
                  en: "Lovable's two-way sync with GitHub: Lovable's changes go to the repository, and pushes to the active branch come back into Lovable.",
                },
              },
              {
                term: 'MCP',
                def: {
                  fa: 'پروتکلی استاندارد که به Agent اجازه می‌دهد ابزارهای یک سرویس (مثل Cloudflare) را صدا بزند.',
                  en: "A standard protocol that lets an agent call a service's tools (such as Cloudflare's).",
                },
              },
            ],
          },
        ],
      },
      {
        id: 'first-mission',
        title: { fa: 'اولین مأموریت: همه‌چیز کنار هم', en: 'The first mission: everything together' },
        blocks: [
          {
            type: 'p',
            text: {
              fa: `حالا داستانی که در ویس تعریف کردیم ممکن می‌شود. شما در چت می‌گویید: «برای کافه سحر یک وب‌سایت می‌خواهم با منو، ساعت کاری و فرم رزرو. این Repository من است (cafe-sahar)، این دامنه‌ی من است (cafe-sahar.ir) و تو به Cloudflare دسترسی داری.» Agent اول یک **طرح (Design)** پیشنهاد می‌دهد. شما بررسی و اصلاح و تأیید می‌کنید. بعد کد را می‌نویسد، در GitHub Push می‌کند، Worker را روی Cloudflare می‌سازد، اتصال GitHub به Cloudflare را برقرار می‌کند و دامنه را به Worker وصل می‌کند.`,
              en: `Now the story from the voice lesson becomes possible. You say in chat: "I want a website for Café Sahar with a menu, opening hours and a booking form. Here is my repository (cafe-sahar), here is my domain (cafe-sahar.ir), and you have Cloudflare access." The agent first proposes a **design**. You review, adjust and approve it. Then it writes the code, pushes to GitHub, creates the Worker on Cloudflare, links GitHub to Cloudflare and connects your domain to the Worker.`,
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'اولین خروجی همیشه کامل نیست', en: 'The first result is rarely perfect' },
            text: {
              fa: `اگر نتیجه‌ی اول خوب نبود، معمولاً یکی از این سه دلیل را دارد: توضیح ما کافی نبوده، مدل در آن لحظه برداشت دیگری کرده، یا هر دو. این شکست نیست؛ بخشی از حلقه‌ی کار است. بازخورد دقیق بدهید و دوباره بخواهید. در پرده‌ی سوم یاد می‌گیرید از اول چطور بهتر توضیح بدهید.`,
              en: `If the first result is not good, it usually comes down to three causes: our explanation was not enough, the model understood it differently at that moment, or both. That is not failure; it is part of the loop. Give precise feedback and ask again. In Act III you learn how to explain better from the start.`,
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'prompt',
                title: { fa: 'Prompt اولین مأموریت با Codex', en: 'First-mission prompt for Codex' },
                text: {
                  fa: `می‌خواهم وب‌سایت یک‌صفحه‌ای «کافه سحر» را بسازم، با این بخش‌ها: معرفی، منو، ساعت کاری و فرم رزرو. مخاطبش مردم محله و مشتری‌های کافه‌اند و ظاهرش باید گرم و دنج باشد. سایت فارسی و راست‌به‌چپ است.
Repository: [نام-کاربری-شما]/cafe-sahar
دامنه: cafe-sahar.ir (DNS آن روی Cloudflare است)
تو از طریق CLOUDFLARE_API_TOKEN در Environment به Cloudflare دسترسی داری.

قدم‌ها:
1. اول فقط یک طرح بده: ساختار صفحه، رنگ‌ها، فونت‌ها و فهرست فایل‌ها. تا تأیید نکرده‌ام کد ننویس.
2. بعد از تأیید، کد را روی یک شاخه‌ی جدید بنویس و Pull Request باز کن.
3. سایت را با Cloudflare Workers (Static Assets) راه بینداز و Workers Builds را به این Repository وصل کن.
4. دامنه را فقط وقتی به Worker وصل کن که من Pull Request را بررسی کرده باشم.
5. در پایان فهرست همه‌ی کارهایی را که روی Cloudflare انجام دادی (Worker، DNS، منابع) به من بده.

هرگز Token را در کد، فایل یا خروجی چاپ نکن.`,
                  en: `I want to build the one-page "Café Sahar" website, with these sections: intro, menu, opening hours and a booking form. Its audience is neighbours and café regulars, and the look should be warm and cosy. The site is in Persian, right-to-left.
Repository: [your-username]/cafe-sahar
Domain: cafe-sahar.ir (its DNS is on Cloudflare)
You have Cloudflare access through CLOUDFLARE_API_TOKEN in the environment.

Steps:
1. First, give me only a design: page structure, colors, fonts and a file list. Do not write code until I approve.
2. After approval, write the code on a new branch and open a pull request.
3. Deploy the site with Cloudflare Workers (static assets) and connect Workers Builds to this repository.
4. Connect the domain to the Worker only after I have reviewed the pull request.
5. At the end, list everything you did in Cloudflare (Worker, DNS, resources).

Never print the token in code, files or output.`,
                },
              },
            ],
            lovable: [
              {
                type: 'prompt',
                title: { fa: 'Prompt اولین مأموریت با Lovable (در حالت Plan)', en: 'First-mission prompt for Lovable (in Plan mode)' },
                text: {
                  fa: `می‌خواهم وب‌سایت یک‌صفحه‌ای «کافه سحر» را بسازم، با این بخش‌ها: معرفی، منو، ساعت کاری و فرم رزرو. مخاطبش مردم محله و مشتری‌های کافه‌اند و ظاهرش باید گرم و دنج باشد. سایت فارسی و راست‌به‌چپ است (dir="rtl" و یک فونت فارسی خوانا).

قدم‌ها:
1. اول یک برنامه بده: بخش‌های صفحه، رنگ‌ها، فونت‌ها و این‌که فرم رزرو کجا ذخیره می‌شود. تا برنامه را تأیید نکرده‌ام چیزی نساز.
2. بعد از تأیید، صفحه را بساز. رزروها را در Database داخلی ذخیره کن و دسترسی را طوری تنظیم کن که فقط من (صاحب سایت) رزروها را ببینم.
3. پروژه با GitHub همگام است (Repository: cafe-sahar)؛ تغییرات بزرگ را جدا و قابل برگشت نگه دار.
4. قبل از انتشار، بررسی امنیتی را اجرا کن و هر مورد Critical را برایم توضیح بده.`,
                  en: `I want to build the one-page "Café Sahar" website, with these sections: intro, menu, opening hours and a booking form. Its audience is neighbours and café regulars, and the look should be warm and cosy. The site is in Persian, right-to-left (dir="rtl" and a readable Persian font).

Steps:
1. First give me a plan: page sections, colors, fonts, and where the booking form is stored. Do not build anything until I approve the plan.
2. After approval, build the page. Store bookings in the built-in database and set access so only I (the owner) can see them.
3. The project syncs with GitHub (repository: cafe-sahar); keep big changes separate and easy to revert.
4. Before publishing, run the security checks and explain any critical finding to me.`,
                },
              },
            ],
          },
          {
            type: 'quiz',
            q: {
              fa: 'Agent برای ساخت Worker کافه سحر روی دامنه‌ی cafe-sahar.ir به Token نیاز دارد. بهترین انتخاب کدام است؟',
              en: 'Your agent needs a token to build the Café Sahar Worker on cafe-sahar.ir. What is the best choice?',
            },
            options: [
              { fa: 'Global API Key را در چت بفرستم تا کار سریع‌تر شود', en: 'Paste the Global API Key into the chat to save time' },
              { fa: 'Token سفارشی و محدود به همین دامنه، در Secrets', en: 'A custom token for this zone only, kept in secrets' },
              { fa: 'Tokenی با مجوز Edit روی همه‌ی دامنه‌ها و همه‌ی محصولات', en: 'A token with Edit rights on every zone and product' },
              { fa: 'Token را در یک فایل config داخل Repository ذخیره کنم', en: 'Save the token in a config file inside the repo' },
            ],
            answer: 1,
            explain: {
              fa: `Token محدود به همان دامنه و همان کارها، اگر لو برود، خسارت کمی دارد. ذخیره به‌صورت Secret هم یعنی نه در چت می‌ماند و نه در تاریخچه‌ی Git.`,
              en: `A token limited to that domain and those tasks does little damage if it leaks. Storing it as a secret keeps it out of the chat and out of Git history.`,
            },
            why: [
              {
                fa: 'خطرناک است: Global API Key به همه‌چیز حساب دسترسی دارد و چیزی که در چت بفرستید، دیگر دست خودتان نیست.',
                en: 'Dangerous: the Global API Key can do everything in the account, and anything pasted into chat is out of your control.',
              },
              {
                fa: 'درست است. کمترین دسترسی لازم، محدود به یک دامنه و نگه‌داری در Secrets محیط Agent؛ اگر لو برود، خسارت کوچک می‌ماند.',
                en: 'Correct. Least privilege, limited to one domain and kept in the agent environment\'s secrets; a leak stays small.',
              },
              {
                fa: 'بیش از حد است: اگر این Token لو برود یا Agent اشتباه کند، همه‌ی دامنه‌ها و محصولات حساب در خطرند.',
                en: 'Too much: if this token leaks or the agent slips, every domain and product in the account is at risk.',
              },
              {
                fa: 'اشتباه است: هر چیزی که Commit شود در تاریخچه‌ی Git می‌ماند، حتی اگر بعداً فایل را پاک کنید.',
                en: 'Wrong: anything committed stays in Git history, even if you delete the file later.',
              },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare Docs: Create an API token', url: 'https://developers.cloudflare.com/fundamentals/api/get-started/create-token/' },
              { label: 'Cloudflare Docs: API token permissions', url: 'https://developers.cloudflare.com/fundamentals/api/reference/permissions/' },
              { label: 'Cloudflare Docs: Workers Builds', url: 'https://developers.cloudflare.com/workers/ci-cd/builds/' },
              { label: 'Cloudflare Docs: Build branches and previews', url: 'https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/' },
              { label: "Cloudflare Docs: Cloudflare's MCP servers", url: 'https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/' },
              { label: 'OpenAI Help: Using Codex Cloud', url: 'https://help.openai.com/en/articles/20001545-using-codex-cloud' },
              { label: 'Claude Code Docs: Use Claude Code in the cloud', url: 'https://code.claude.com/docs/en/claude-code-on-the-web' },
              { label: 'Lovable Docs: GitHub integration', url: 'https://docs.lovable.dev/integrations/github' },
              { label: 'Lovable Docs: Publish your app', url: 'https://docs.lovable.dev/features/publish' },
              { label: 'Lovable Docs: Deploy and host elsewhere', url: 'https://docs.lovable.dev/tips-tricks/external-deployment-hosting' },
            ],
          },
          {
            type: 'review',
            title: { fa: 'مرور پرده‌ی دوم', en: 'Act II review' },
            items: REVIEW_ACT2,
          },
        ],
      },
    ],
    connects: {
      fa: `این فصل پل بین «آماده‌سازی» و «ساختن» است. حساب‌هایی که در فصل قبل ساختید، حالا با دسترسی محدود دست Agent هستند. در پرده‌ی سوم یاد می‌گیرید پروژه را دقیق تعریف کنید و Prompt خوب بنویسید تا Agent از همین دسترسی‌ها درست استفاده کند؛ و در پرده‌ی چهارم همین Workers Builds پایه‌ی CI/CD و انتشار روی دامنه‌ی اختصاصی می‌شود.`,
      en: `This chapter bridges preparing and building. The accounts you created in the previous chapter are now in the agent's hands with limited access. In Act III you learn to define the project precisely and write good prompts so the agent uses this access well; in Act IV, the same Workers Builds becomes the foundation for CI/CD and launching on your own domain.`,
    },
    takeaways: [
      { fa: 'اتصال Agent به GitHub و Cloudflare یعنی خودش Push، Deploy و تنظیم DNS را انجام می‌دهد.', en: 'Connecting the agent to GitHub and Cloudflare lets it push, deploy and set DNS itself.' },
      { fa: 'در GitHub فقط Repositoryهای لازم را انتخاب کنید؛ در Cloudflare یک Custom Token محدود به یک دامنه بسازید.', en: 'Select only the needed repositories on GitHub; create a custom Cloudflare token limited to one domain.' },
      { fa: 'Token جایش در Secrets محیط Agent است، نه در چت و نه در کد.', en: "A token belongs in the agent environment's secrets, not in chat and not in code." },
      { fa: 'با Workers Builds هر Push به main منتشر می‌شود و هر شاخه یک Preview URL می‌گیرد.', en: 'With Workers Builds every push to main deploys and every branch gets a preview URL.' },
      { fa: 'کار Agent را همیشه بررسی کنید و Tokenها را دوره‌ای عوض کنید.', en: "Always review the agent's work and rotate tokens periodically." },
      { fa: 'در مسیر Lovable، Git sync کد را در GitHub نگه می‌دارد و Token کلودفلر فقط برای انتشار روی Cloudflare خودتان لازم است.', en: 'On the Lovable path, Git sync keeps the code in GitHub, and a Cloudflare token is needed only to publish on your own Cloudflare.' },
    ],
  },
];
