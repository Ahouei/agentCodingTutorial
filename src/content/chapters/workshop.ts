import type { Chapter } from '../types';

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
      fa: 'قبل از اولین Prompt، کارگاه را مرتب کنید: ایمیل، GitHub، Cloudflare، دامنه و Agent.',
      en: 'Before the first prompt, tidy the workshop: email, GitHub, Cloudflare, a domain and an agent.',
    },
    minutes: 14,
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
              fa: `در فصل‌های قبل دیدید که یک وبسایت از چند تکه ساخته می‌شود: کد، جایی برای نگه‌داری کد، جایی برای اجرا شدنش و یک دامنه که آدم‌ها با آن پیدایش کنند. Agent قرار است همه‌ی این تکه‌ها را به هم وصل کند، اما **خودش حساب باز نمی‌کند و کارت بانکی ندارد**. صاحب حساب‌ها شما هستید؛ Agent فقط با اجازه‌ای که شما می‌دهید کار می‌کند.`,
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
                title: { fa: 'اشتراک یک AI Agent', en: 'An AI agent subscription' },
                text: {
                  fa: `یک Agent برنامه‌نویس لازم دارید: **OpenAI Codex** از طریق حساب ChatGPT، یا **Claude Code** از طریق حساب Claude. هر دو پلن‌های مختلف دارند و امکانات و سقف استفاده‌شان با پلن فرق می‌کند؛ قبل از خرید صفحه‌ی رسمی پلن‌ها را ببینید.`,
                  en: `You need a coding agent: **OpenAI Codex** through a ChatGPT account, or **Claude Code** through a Claude account. Both come in several plans, and features and usage limits differ by plan; check the official plan pages before you pay.`,
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: 'کدام پلن Agent؟', en: 'Which agent plan?' },
            text: {
              fa: `طبق مستندات OpenAI، Codex در پلن‌های مختلف ChatGPT هست، اما اجرای کار در Cloud (یعنی Codex Cloud که روی کامپیوترهای OpenAI کار می‌کند) فقط در پلن‌های پولی واجد شرایط مثل Plus و Pro و پلن‌های سازمانی است. طبق مستندات Anthropic، Cloud sessionهای Claude Code در پلن‌هایی مثل Pro و Max و Team در دسترس است. این‌ها زود عوض می‌شوند، پس پیش از خرید لینک‌های پایین را چک کنید.`,
              en: `According to OpenAI's docs, Codex is available across ChatGPT plans, but running tasks in the cloud (Codex Cloud, on OpenAI-managed computers) needs an eligible paid plan such as Plus or Pro, or a business plan. According to Anthropic's docs, Claude Code cloud sessions are available on plans such as Pro, Max and Team. These details change often, so check the links below before buying.`,
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: 'پرداخت و محدودیت منطقه‌ای', en: 'Payments and regional limits' },
            text: {
              fa: `بعضی سرویس‌ها در همه‌ی کشورها در دسترس نیستند یا پرداختشان با هر کارتی ممکن نیست. قبل از شروع، فهرست کشورهای پشتیبانی‌شده‌ی هر سرویس را در سایت رسمی‌اش ببینید و از روش پرداختی استفاده کنید که با قوانین آن سرویس سازگار است. حسابی که بعداً به‌خاطر نقض قوانین بسته شود، کل پروژه را با خودش می‌برد.`,
              en: `Some services are not available in every country, and not every card works for payment. Before you start, check each service's list of supported countries on its official site and use a payment method that complies with its terms. An account closed later for breaking the terms takes the whole project down with it.`,
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
              fa: `خبر خوب: برای شروع **لازم نیست چیزی نصب کنید**. Codex Cloud و Claude Code روی کامپیوترهای خودشان در Cloud کار می‌کنند؛ مخزن GitHub شما را برمی‌دارند، کد را می‌نویسند، تست می‌کنند و Push می‌کنند. شما فقط در مرورگر یا اپ موبایل با آن‌ها حرف می‌زنید.`,
              en: `Good news: to start, **you do not need to install anything**. Codex Cloud and Claude Code cloud sessions run on their own machines: they clone your GitHub repository, write code, run tests and push. You just talk to them in a browser or mobile app.`,
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
              fa: `من تازه حساب‌های GitHub و Cloudflare را ساخته‌ام و می‌خواهم اولین وبسایتم را با تو بسازم. قبل از هر کاری، یک چک‌لیست کوتاه بده از چیزهایی که برای ساخت و Deploy یک سایت ساده روی Cloudflare Workers لازم داری (حساب‌ها، دسترسی‌ها، ابزارها). برای هر مورد بگو آیا در محیط فعلی‌ات در دسترس است یا نه، و اگر نیست دقیقاً چه کاری از من لازم است. هنوز هیچ کدی ننویس و هیچ منبعی نساز.`,
              en: `I have just created my GitHub and Cloudflare accounts and want to build my first website with you. Before anything else, give me a short checklist of what you need to build and deploy a simple site on Cloudflare Workers (accounts, access, tools). For each item, tell me whether it is available in your current environment, and if not, exactly what I need to do. Do not write any code or create any resources yet.`,
            },
          },
          {
            type: 'quiz',
            q: {
              fa: 'برای ساختن اولین سایت با Codex Cloud یا Claude Code در Cloud، کدام مورد واقعاً ضروری است؟',
              en: 'To build your first site with Codex Cloud or Claude Code in the cloud, which item is truly required?',
            },
            options: [
              { fa: 'نصب VS Code و Node.js روی کامپیوتر', en: 'Installing VS Code and Node.js on your computer' },
              { fa: 'یک حساب GitHub که Agent به مخزنش دسترسی داشته باشد', en: 'A GitHub account whose repository the agent can access' },
              { fa: 'خرید یک سرور مجازی (VPS)', en: 'Buying a virtual private server (VPS)' },
              { fa: 'یادگرفتن کامل زبان JavaScript', en: 'Mastering JavaScript first' },
            ],
            answer: 1,
            explain: {
              fa: `Agentهای Cloud روی کامپیوترهای خودشان کار می‌کنند و کد را از GitHub برمی‌دارند و همان‌جا Push می‌کنند. ابزارهای محلی بعداً مفیدند، اما برای شروع ضروری نیستند. سرور جدا هم لازم نیست، چون Cloudflare Workers اجرای سایت را بر عهده می‌گیرد.`,
              en: `Cloud agents run on their own machines, clone your code from GitHub and push back there. Local tools help later but are not required to start. No separate server is needed either, because Cloudflare Workers runs the site.`,
            },
          },
          {
            type: 'links',
            items: [
              { label: 'GitHub Docs: Configuring two-factor authentication', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication' },
              { label: 'Cloudflare Registrar', url: 'https://developers.cloudflare.com/registrar/' },
              { label: 'Cloudflare Registrar: WHOIS redaction', url: 'https://developers.cloudflare.com/registrar/account-options/whois-redaction/' },
              { label: 'OpenAI Help: Using Codex with your ChatGPT plan', url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan' },
              { label: 'Claude Code Docs: Get started in the cloud', url: 'https://code.claude.com/docs/en/web-quickstart' },
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
      { fa: 'برای شروع با Agentهای Cloud نصب چیزی لازم نیست؛ ابزارهای محلی برای بعد.', en: 'Cloud agents need no installs to start; local tools come later.' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Chapter: connect-agent
  // ───────────────────────────────────────────────────────────────────────────
  {
    slug: 'connect-agent',
    act: 2,
    icon: 'plug',
    voice: '/audio/voice3.mp3',
    title: { fa: 'وصل کردن Agent به GitHub و Cloudflare', en: 'Connecting your agent to GitHub and Cloudflare' },
    tagline: {
      fa: 'به Agent دست و پا بدهید: دسترسی به کد و زیرساخت، اما فقط به اندازه‌ی لازم.',
      en: 'Give your agent hands: access to code and infrastructure, but only as much as it needs.',
    },
    minutes: 18,
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
              fa: `یک Agent بدون اتصال، فقط می‌تواند کد بنویسد و به شما بدهد؛ بعدش کپی کردن، ذخیره کردن، آپلود و تنظیم سرور با خودتان است. اما وقتی Agent به **GitHub** و **Cloudflare** وصل باشد، می‌تواند خودش کد را در Repository شما Push کند، یک Worker بسازد، رکوردهای DNS را تنظیم کند، دیتابیس D1 یا فضای KV و R2 بسازد و حتی GitHub را به Cloudflare وصل کند تا هر Push خودکار منتشر شود.`,
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
              fa: `به Agent دقیقاً همان دسترسی‌ای را بدهید که برای این پروژه لازم دارد؛ نه بیشتر. اگر روزی Token لو برود یا Agent اشتباه کند، خسارت به همان چند مخزن و همان یک دامنه محدود می‌ماند، نه کل حساب شما.`,
              en: `Give the agent exactly the access this project needs, no more. If a token ever leaks or the agent makes a mistake, the damage stays limited to those few repositories and that one domain, not your whole account.`,
            },
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
              fa: `هر دو Agent برای وصل شدن به GitHub از یک **GitHub App** استفاده می‌کنند. شما در صفحه‌ی GitHub اجازه می‌دهید و انتخاب می‌کنید App به کدام مخزن‌ها دسترسی داشته باشد.`,
              en: `Both agents connect to GitHub through a **GitHub App**. You approve it on GitHub's own page and choose which repositories the app may access.`,
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: 'یک Repository خالی بسازید', en: 'Create an empty repository' },
                text: {
                  fa: `در GitHub یک مخزن جدید با یک README بسازید. Private بودنش برای شروع انتخاب امن‌تری است.`,
                  en: `On GitHub, create a new repository with a README. Private is the safer choice to start.`,
                },
              },
              {
                title: { fa: 'Codex: از ChatGPT وصل شوید', en: 'Codex: connect from ChatGPT' },
                text: {
                  fa: `در Codex یک Cloud environment بسازید؛ اگر GitHub وصل نباشد از شما می‌خواهد App مربوط را در GitHub نصب و تأیید کنید. بعد مخزن پروژه را انتخاب می‌کنید و Codex محیط را برایش آماده می‌کند.`,
                  en: `In Codex, create a cloud environment; if GitHub is not connected yet, it asks you to install and authorize its app on GitHub. Then pick the project repository and Codex prepares the environment for it.`,
                },
              },
              {
                title: { fa: 'Claude Code: از claude.ai/code وصل شوید', en: 'Claude Code: connect from claude.ai/code' },
                text: {
                  fa: `وارد claude.ai/code شوید و با GitHub ورود کنید. برای مخزن‌های Private، **Claude GitHub App** را روی حسابتان نصب کنید. اگر روی کامپیوترتان از \`gh\` استفاده می‌کنید، فرمان \`/web-setup\` هم راه دیگری برای اتصال است.`,
                  en: `Go to claude.ai/code and sign in with GitHub. For private repositories, install the **Claude GitHub App** on your account. If you already use \`gh\` on your computer, the \`/web-setup\` command is another way to connect.`,
                },
              },
              {
                title: { fa: 'فقط مخزن‌های لازم را انتخاب کنید', en: 'Select only the repositories needed' },
                text: {
                  fa: `هنگام نصب App، به‌جای «All repositories» گزینه‌ی «Only select repositories» را بزنید و فقط مخزن همین پروژه را تیک بزنید. بعداً هر وقت لازم شد، می‌توانید مخزن اضافه کنید.`,
                  en: `When installing the app, choose "Only select repositories" instead of "All repositories" and tick just this project's repository. You can add more any time later.`,
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: 'وصل شدن یعنی همه‌کاره شدن نیست', en: 'Connected does not mean all-powerful' },
            text: {
              fa: `Agent فقط به مخزن‌هایی دسترسی دارد که App روی آن‌ها نصب است. اگر Agent می‌گوید مخزنی را نمی‌بیند، معمولاً یعنی آن مخزن در تنظیمات App انتخاب نشده؛ راه‌حلش اضافه کردن همان مخزن است، نه دادن دسترسی به همه.`,
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
                  fa: `برای یک سایت روی Workers معمولاً این‌ها کافی است: در سطح Account، **Workers Scripts: Edit** و **Account Settings: Read**؛ و فقط اگر لازم دارید، **D1: Edit**، **Workers KV Storage: Edit** و **Workers R2 Storage: Edit**. در سطح Zone، **DNS: Edit** و **Workers Routes: Edit**. «Edit» یعنی ساختن، خواندن، تغییر و حذف؛ «Read» یعنی فقط دیدن.`,
                  en: `For a site on Workers this is usually enough: at account level, **Workers Scripts: Edit** and **Account Settings: Read**; and only if needed, **D1: Edit**, **Workers KV Storage: Edit** and **Workers R2 Storage: Edit**. At zone level, **DNS: Edit** and **Workers Routes: Edit**. "Edit" means create, read, update and delete; "Read" means view only.`,
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
                fa: `در **Settings** و بخش **Builds** گزینه‌ی **Connect** را بزنید، GitHub را انتخاب کنید و Cloudflare GitHub App را برای همان مخزن تأیید کنید.`,
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
            type: 'terms',
            items: [
              {
                term: 'GitHub App',
                def: {
                  fa: 'برنامه‌ای که با اجازه‌ی شما و فقط روی مخزن‌های انتخاب‌شده در GitHub کار می‌کند.',
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
              fa: `حالا داستانی که در ویس تعریف کردیم ممکن می‌شود. شما در چت می‌گویید: «یک وبسایت X می‌خواهم با ویژگی‌های Y و Z. این Repository من است، این دامنه‌ی من است و تو به Cloudflare دسترسی داری.» Agent اول یک **طرح (Design)** پیشنهاد می‌دهد. شما بررسی و اصلاح و تأیید می‌کنید. بعد کد را می‌نویسد، در GitHub Push می‌کند، Worker را روی Cloudflare می‌سازد، اتصال GitHub به Cloudflare را برقرار می‌کند و دامنه را به Worker وصل می‌کند.`,
              en: `Now the story from the voice lesson becomes possible. You say in chat: "I want website X with features Y and Z. Here is my repository, here is my domain, and you have Cloudflare access." The agent first proposes a **design**. You review, adjust and approve it. Then it writes the code, pushes to GitHub, creates the Worker on Cloudflare, links GitHub to Cloudflare and connects your domain to the Worker.`,
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
            type: 'prompt',
            title: { fa: 'Prompt اولین مأموریت', en: 'First-mission prompt' },
            text: {
              fa: `می‌خواهم یک وبسایت یک‌صفحه‌ای برای [موضوع] بسازم، با این بخش‌ها: [بخش‌ها]. مخاطبش [مخاطب] است و ظاهرش باید [سبک] باشد.
Repository: [owner/repo]
دامنه: [example.com] (DNS آن روی Cloudflare است)
تو از طریق CLOUDFLARE_API_TOKEN در Environment به Cloudflare دسترسی داری.

قدم‌ها:
1. اول فقط یک طرح بده: ساختار صفحه، رنگ‌ها، فونت‌ها و فهرست فایل‌ها. تا تأیید نکرده‌ام کد ننویس.
2. بعد از تأیید، کد را روی یک شاخه‌ی جدید بنویس و Pull Request باز کن.
3. سایت را با Cloudflare Workers (Static Assets) راه بینداز و Workers Builds را به این Repository وصل کن.
4. دامنه را فقط وقتی به Worker وصل کن که من Pull Request را بررسی کرده باشم.
5. در پایان فهرست همه‌ی کارهایی را که روی Cloudflare انجام دادی (Worker، DNS، منابع) به من بده.

هرگز Token را در کد، فایل یا خروجی چاپ نکن.`,
              en: `I want to build a one-page website for [topic], with these sections: [sections]. Its audience is [audience] and the look should be [style].
Repository: [owner/repo]
Domain: [example.com] (its DNS is on Cloudflare)
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
          {
            type: 'quiz',
            q: {
              fa: 'Agent برای ساخت و Deploy یک Worker روی یک دامنه به Token نیاز دارد. بهترین انتخاب کدام است؟',
              en: 'Your agent needs a token to build and deploy a Worker on one domain. What is the best choice?',
            },
            options: [
              { fa: 'Global API Key را در چت paste کنم تا سریع‌تر شود', en: 'Paste the Global API Key into the chat to save time' },
              { fa: 'یک Token با مجوز Edit روی همه‌ی Zoneها و همه‌ی محصولات', en: 'A token with Edit on all zones and all products' },
              { fa: 'یک Custom Token با فقط مجوزهای Workers و DNS، محدود به همان دامنه، ذخیره‌شده به‌صورت Secret', en: 'A custom token with only Workers and DNS permissions, limited to that domain, stored as a secret' },
              { fa: 'Token را در فایل config داخل Repository بنویسم', en: 'Write the token into a config file in the repository' },
            ],
            answer: 2,
            explain: {
              fa: `Token محدود به همان دامنه و همان کارها، اگر لو برود، خسارت کمی دارد. ذخیره به‌صورت Secret هم یعنی نه در چت می‌ماند و نه در تاریخچه‌ی Git.`,
              en: `A token limited to that domain and those tasks does little damage if it leaks. Storing it as a secret keeps it out of the chat and out of Git history.`,
            },
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
            ],
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
      { fa: 'در GitHub فقط مخزن‌های لازم را انتخاب کنید؛ در Cloudflare یک Custom Token محدود به یک دامنه بسازید.', en: 'Select only the needed repositories on GitHub; create a custom Cloudflare token limited to one domain.' },
      { fa: 'Token جایش در Secrets محیط Agent است، نه در چت و نه در کد.', en: "A token belongs in the agent environment's secrets, not in chat and not in code." },
      { fa: 'با Workers Builds هر Push به main منتشر می‌شود و هر شاخه یک Preview URL می‌گیرد.', en: 'With Workers Builds every push to main deploys and every branch gets a preview URL.' },
      { fa: 'کار Agent را همیشه بررسی کنید و Tokenها را دوره‌ای عوض کنید.', en: "Always review the agent's work and rotate tokens periodically." },
    ],
  },
];
