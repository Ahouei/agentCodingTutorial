import type { Chapter } from '../types';

export const platform: Chapter[] = [
  // ───────────────────────────────────────────────────────────── GitHub
  {
    slug: 'github',
    act: 1,
    icon: 'branch',
    title: { fa: "GitHub و Version Control", en: "GitHub and version control" },
    tagline: {
      fa: "دفترچه خاطرات کد شما؛ هر تغییر ثبت می‌شود و هر اشتباه قابل برگشت است",
      en: "Your code's diary: every change recorded, every mistake reversible",
    },
    minutes: 14,
    mascotLine: {
      fa: "من خیلی کار می‌کنم، ولی همه‌اش را در GitHub ثبت می‌کنم تا شما همیشه بتوانید ببینید چه کرده‌ام و اگر لازم شد برگردید.",
      en: "I work fast, but I write everything down in GitHub, so you can always see what I did and roll it back if needed.",
    },
    sections: [
      {
        id: 'why-version-control',
        title: { fa: "چرا Version Control؟", en: "Why version control?" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "فرض کنید روی یک فایل Word کار می‌کنید و نسخه‌ها را این‌طوری ذخیره می‌کنید: «نهایی»، «نهایی-۲»، «نهایی-واقعاً-آخری». بعد از یک هفته دیگر نمی‌دانید کدام درست است و چه چیزی بین آن‌ها عوض شده. **Version Control** دقیقاً همین مشکل را برای کد حل می‌کند: هر تغییر را با تاریخ، توضیح و نام کسی که آن را انجام داده ثبت می‌کند.",
              en: "Imagine saving a document as 'final', 'final-2' and 'final-really-last'. A week later you no longer know which one is right or what changed between them. **Version control** solves exactly this for code: every change is recorded with a date, a description, and who made it.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "وقتی با یک AI Agent کار می‌کنید، این موضوع از «خوب است» به «ضروری است» تبدیل می‌شود. Agent در چند دقیقه ده‌ها فایل را تغییر می‌دهد. اگر تاریخچه نداشته باشید، نمی‌توانید بفهمید چه چیزی عوض شده، و اگر خراب شد، راهی برای برگشت ندارید.",
              en: "When you work with an AI agent, this goes from 'nice to have' to essential. An agent can change dozens of files in a few minutes. Without history you can't tell what changed, and if something breaks you have no way back.",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "سه دلیل اصلی", en: "Three core reasons" },
            text: {
              fa: "**۱. تاریخچه و Undo:** هر نقطه از گذشته قابل بازگشت است. **۲. همکاری:** چند نفر (یا چند Agent) هم‌زمان روی یک پروژه کار می‌کنند بی‌آنکه کار هم را خراب کنند. **۳. بازبینی:** کار Agent به صورت یک تغییر مشخص جلوی شما قرار می‌گیرد تا قبل از انتشار آن را ببینید و تأیید کنید.",
              en: "**1. History and undo:** any point in the past can be restored. **2. Collaboration:** several people (or agents) can work on one project without overwriting each other. **3. Review:** the agent's work arrives as a clear, specific change you can inspect and approve before it goes live.",
            },
          },
          {
            type: 'h',
            text: { fa: "Git یا GitHub؟", en: "Git or GitHub?" },
          },
          {
            type: 'p',
            text: {
              fa: "این دو را زیاد با هم اشتباه می‌گیرند. **Git** نرم‌افزاری است که روی کامپیوتر اجرا می‌شود و تاریخچه را نگه می‌دارد. **GitHub** یک سرویس آنلاین است که مخزن‌های Git را روی اینترنت نگه می‌دارد و امکاناتی مثل Pull Request، بازبینی کد، Issue و GitHub Actions را به آن اضافه می‌کند. یعنی Git موتور است و GitHub پارکینگ و کارگاه آنلاین آن.",
              en: "People mix these up a lot. **Git** is software that runs on a computer and keeps the history. **GitHub** is an online service that hosts Git repositories and adds things like pull requests, code review, issues and GitHub Actions. Git is the engine; GitHub is the online garage and workshop around it.",
            },
          },
        ],
      },
      {
        id: 'core-concepts',
        title: { fa: "مفاهیم اصلی، به زبان ساده", en: "The core ideas, in plain words" },
        blocks: [
          {
            type: 'terms',
            items: [
              {
                term: 'Repository (Repo)',
                def: {
                  fa: "پوشه پروژه به همراه کل تاریخچه‌اش. هر پروژه معمولاً یک Repo دارد.",
                  en: "The project folder together with its entire history. Each project usually has one repo.",
                },
              },
              {
                term: 'Commit',
                def: {
                  fa: "یک «عکس» از وضعیت پروژه با یک پیام کوتاه که می‌گوید چه چیزی و چرا عوض شد.",
                  en: "A snapshot of the project with a short message saying what changed and why.",
                },
              },
              {
                term: 'Branch',
                def: {
                  fa: "یک خط موازی برای کار روی یک تغییر، بدون اینکه نسخه اصلی دست بخورد.",
                  en: "A parallel line of work for one change, without touching the main version.",
                },
              },
              {
                term: 'main',
                def: {
                  fa: "شاخه اصلی پروژه. معمولاً همان نسخه‌ای است که روی سایت واقعی منتشر می‌شود.",
                  en: "The project's main branch. Usually the version that gets published to the live site.",
                },
              },
              {
                term: 'Pull Request (PR)',
                def: {
                  fa: "درخواست ادغام یک Branch در main. جایی است که تغییرات را می‌بینید، نظر می‌دهید و تأیید می‌کنید.",
                  en: "A request to merge a branch into main. It's where you see the changes, comment and approve.",
                },
              },
              {
                term: 'Merge',
                def: {
                  fa: "یکی کردن تغییرات یک Branch با Branch دیگر، معمولاً با main.",
                  en: "Combining the changes of one branch into another, usually into main.",
                },
              },
              {
                term: 'Clone / Push / Pull',
                def: {
                  fa: "Clone یعنی گرفتن یک نسخه کامل از Repo روی کامپیوتر. Push یعنی فرستادن Commitها به GitHub. Pull یعنی گرفتن آخرین تغییرات از GitHub.",
                  en: "Clone copies a whole repo to a computer. Push sends your commits up to GitHub. Pull brings the latest changes down from GitHub.",
                },
              },
              {
                term: 'README.md',
                def: {
                  fa: "فایل معرفی پروژه: پروژه چیست، چطور اجرا می‌شود و چطور منتشر می‌شود. Agentها هم آن را می‌خوانند.",
                  en: "The project's front page: what it is, how to run it and how to deploy it. Agents read it too.",
                },
              },
              {
                term: '.gitignore',
                def: {
                  fa: "فهرست فایل‌هایی که نباید وارد Repo شوند؛ مثل پوشه‌های ساخته‌شده و فایل‌های حاوی رمز و کلید.",
                  en: "A list of files that must never enter the repo, such as build folders and files holding passwords or keys.",
                },
              },
            ],
          },
          {
            type: 'p',
            text: {
              fa: "در عمل جریان کار همیشه شبیه هم است: از main یک Branch جدید می‌سازید، چند Commit روی آن می‌زنید، یک Pull Request باز می‌کنید، تغییرات را بازبینی می‌کنید و در آخر آن را Merge می‌کنید. در ابزار زیر خودتان این چرخه را امتحان کنید.",
              en: "In practice the flow is always the same: branch off main, make a few commits, open a pull request, review the changes, then merge. Try that cycle yourself in the playground below.",
            },
          },
          { type: 'widget', id: 'git-playground' },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: "پیام Commit خوب", en: "A good commit message" },
            text: {
              fa: "پیام Commit برای «شمای شش ماه بعد» نوشته می‌شود. «تغییرات» پیام بدی است؛ «افزودن فرم تماس با اعتبارسنجی ایمیل» پیام خوبی است. از Agent بخواهید پیام‌هایش را کوتاه و دقیق بنویسد.",
              en: "Commit messages are written for you, six months from now. 'changes' is a bad message; 'Add contact form with email validation' is a good one. Ask your agent to keep its messages short and specific.",
            },
          },
        ],
      },
      {
        id: 'public-private-safety',
        title: { fa: "Public یا Private، و چیزهایی که هرگز نباید Commit شوند", en: "Public or private, and what must never be committed" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "هر Repo یا **Public** است (همه دنیا کد را می‌بینند) یا **Private** (فقط شما و کسانی که دعوت می‌کنید). برای پروژه شخصی یا تجاری معمولاً Private شروع کنید؛ هر وقت خواستید می‌توانید آن را Public کنید.",
              en: "A repo is either **public** (the whole world can read the code) or **private** (only you and the people you invite). For personal or business projects, start private; you can make it public later.",
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "رمزها را هرگز Commit نکنید", en: "Never commit secrets" },
            text: {
              fa: "API Key، Token، رمز دیتابیس و فایل‌هایی مثل `.env` و `.dev.vars` نباید وارد Repo شوند، حتی Private. تاریخچه Git همه چیز را به خاطر می‌سپارد؛ اگر یک کلید یک بار Commit شود، حتی بعد از پاک کردن هم در تاریخچه می‌ماند و باید آن کلید را باطل و عوض کنید. نام این فایل‌ها را در `.gitignore` بگذارید و رمزها را در بخش Secrets سرویس‌ها نگه دارید.",
              en: "API keys, tokens, database passwords and files like `.env` and `.dev.vars` must never go into a repo, private or not. Git history remembers everything: once a key is committed, it stays in history even after you delete it, and you must revoke and replace it. List these files in `.gitignore` and keep secrets in each service's secrets settings.",
            },
          },
          {
            type: 'code',
            lang: 'gitignore',
            code: `node_modules
dist
.wrangler
.env
.dev.vars`,
            caption: {
              fa: "یک `.gitignore` ساده برای پروژه‌ای که روی Cloudflare Workers منتشر می‌شود",
              en: "A simple `.gitignore` for a project that deploys to Cloudflare Workers",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            text: {
              fa: "روی حساب GitHub حتماً **احراز هویت دومرحله‌ای (2FA)** را فعال کنید. این حساب قرار است کلید تمام پروژه‌های شما باشد.",
              en: "Turn on **two-factor authentication (2FA)** on your GitHub account. That account is about to hold the keys to all your projects.",
            },
          },
        ],
      },
      {
        id: 'source-of-truth',
        title: { fa: "GitHub، منبع حقیقت پروژه", en: "GitHub as the project's source of truth" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "در مسیری که در این دوره می‌سازیم، GitHub وسط همه چیز است. Agent کد را می‌نویسد و در GitHub Push می‌کند. Cloudflare به همان Repo وصل است و هر وقت تغییری روی main بیاید، خودش نسخه جدید را می‌سازد و منتشر می‌کند. شما هم در GitHub تغییرات را می‌بینید و تأیید می‌کنید. به همین دلیل می‌گوییم GitHub «منبع حقیقت» است: هر چیزی که روی سایت هست، باید اول در GitHub باشد.",
              en: "In the setup this course builds, GitHub sits in the middle of everything. The agent writes code and pushes it to GitHub. Cloudflare is connected to the same repo, and whenever main changes it builds and publishes the new version by itself. You review and approve changes in GitHub. That's why we call GitHub the 'source of truth': whatever is on the site must first exist in GitHub.",
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: "Agent روی یک Branch کار می‌کند", en: "The agent works on a branch" },
                text: {
                  fa: "تغییرات روی یک Branch جدا انجام می‌شود تا سایت فعلی دست نخورد.",
                  en: "Changes happen on a separate branch so the live site stays untouched.",
                },
              },
              {
                title: { fa: "یک Pull Request باز می‌کند", en: "It opens a pull request" },
                text: {
                  fa: "شما فهرست فایل‌های تغییرکرده و توضیح Agent را می‌بینید.",
                  en: "You see the list of changed files and the agent's explanation.",
                },
              },
              {
                title: { fa: "پیش‌نمایش و بازبینی", en: "Preview and review" },
                text: {
                  fa: "Cloudflare می‌تواند برای هر Branch یک آدرس پیش‌نمایش بسازد تا نتیجه را قبل از انتشار ببینید.",
                  en: "Cloudflare can build a preview URL for each branch so you see the result before it goes live.",
                },
              },
              {
                title: { fa: "Merge و انتشار خودکار", en: "Merge and automatic deploy" },
                text: {
                  fa: "بعد از تأیید شما، تغییر در main ادغام می‌شود و نسخه جدید روی سایت می‌آید.",
                  en: "Once you approve, the change merges into main and the new version goes live.",
                },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: "از Agent بخواهید Repo را درست راه بیندازد", en: "Ask your agent to set up the repo properly" },
            text: {
              fa: "یک Repository جدید و Private در GitHub با نام my-first-site بساز. یک README.md بنویس که توضیح بدهد پروژه چیست، چطور اجرا می‌شود و چطور منتشر می‌شود. یک .gitignore بگذار که node_modules، dist، .wrangler، .env و .dev.vars را نادیده بگیرد. برای هر تغییر یک Branch جدا بساز، پیام‌های Commit را کوتاه و دقیق بنویس، و به جای Push مستقیم روی main، یک Pull Request باز کن تا من بازبینی کنم.",
              en: "Create a new private GitHub repository called my-first-site. Write a README.md explaining what the project is, how to run it locally and how to deploy it. Add a .gitignore that ignores node_modules, dist, .wrangler, .env and .dev.vars. Use a separate branch for each change, write short, specific commit messages, and open a pull request for me to review instead of pushing straight to main.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "Agent شما یک API Key را اشتباهی Commit کرده و بعد در Commit بعدی آن را پاک کرده است. چه باید کرد؟",
              en: "Your agent accidentally committed an API key, then deleted it in the next commit. What should you do?",
            },
            options: [
              { fa: "هیچ؛ چون پاک شده دیگر مشکلی نیست.", en: "Nothing; it was deleted, so it's fine." },
              { fa: "Repo را Private کنیم و ادامه دهیم.", en: "Make the repo private and carry on." },
              {
                fa: "کلید را در سرویس مربوطه باطل کنیم، کلید جدید بسازیم و آن را در Secrets نگه داریم.",
                en: "Revoke the key at the provider, create a new one and store it in secrets.",
              },
              { fa: "پیام Commit را عوض کنیم.", en: "Change the commit message." },
            ],
            answer: 2,
            explain: {
              fa: "تاریخچه Git همه نسخه‌ها را نگه می‌دارد، پس آن کلید هنوز قابل پیدا شدن است. تنها راه امن، باطل کردن و تعویض کلید است.",
              en: "Git history keeps every version, so the key can still be found. The only safe fix is to revoke and replace it.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'GitHub Docs: About Git', url: 'https://docs.github.com/en/get-started/using-git/about-git' },
              { label: 'GitHub Docs: About pull requests', url: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests' },
              { label: 'GitHub Docs: Ignoring files', url: 'https://docs.github.com/en/get-started/git-basics/ignoring-files' },
              { label: 'GitHub Docs: Two-factor authentication', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/about-two-factor-authentication' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "در فصل قبل دیدیم وب از چه قطعاتی ساخته شده. GitHub جایی است که کد همه آن قطعات نگهداری می‌شود. در فصل بعد Cloudflare را می‌شناسیم که کد را از همین GitHub برمی‌دارد و روی اینترنت منتشر می‌کند، و در پرده دوم Agent را به GitHub وصل می‌کنیم تا خودش Branch بسازد و Pull Request باز کند.",
      en: "Last chapter showed the pieces the web is built from. GitHub is where the code for all those pieces lives. Next we meet Cloudflare, which takes the code from this same GitHub and publishes it to the internet, and in Act II we connect the agent to GitHub so it can create branches and open pull requests itself.",
    },
    takeaways: [
      { fa: "Git تاریخچه را نگه می‌دارد؛ GitHub آن را آنلاین و قابل همکاری می‌کند.", en: "Git keeps the history; GitHub puts it online and makes it collaborative." },
      { fa: "چرخه اصلی: Branch، Commit، Pull Request، بازبینی، Merge.", en: "The core cycle: branch, commit, pull request, review, merge." },
      { fa: "کار Agent را همیشه از طریق Pull Request ببینید و تأیید کنید.", en: "Always see and approve the agent's work through a pull request." },
      { fa: "رمزها و کلیدها هرگز وارد Repo نمی‌شوند؛ برای آن‌ها `.gitignore` و Secrets هست.", en: "Secrets never enter the repo; that's what `.gitignore` and secret stores are for." },
      { fa: "GitHub منبع حقیقت است: Cloudflare از همین‌جا منتشر می‌کند.", en: "GitHub is the source of truth: Cloudflare deploys from here." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Cloudflare
  {
    slug: 'cloudflare',
    act: 1,
    icon: 'cloud',
    voice: '/audio/voice2.mp3',
    title: { fa: "Cloudflare: خیلی بیشتر از DNS", en: "Cloudflare: far more than DNS" },
    tagline: {
      fa: "یک شبکه جهانی که هم دامنه شما را می‌گرداند، هم سایت و دیتابیس‌تان را میزبانی می‌کند",
      en: "One global network that runs your domain and hosts your site and data",
    },
    minutes: 18,
    mascotLine: {
      fa: "Cloudflare مثل یک شهر بزرگ است: هم تابلوی آدرس دارد، هم نگهبان، هم کارگاه و انبار. بیایید با محله‌هایش آشنا شویم.",
      en: "Cloudflare is like a big city: it has street signs, guards, workshops and warehouses. Let's tour the neighbourhoods.",
    },
    sections: [
      {
        id: 'what-is-cloudflare',
        title: { fa: "Cloudflare چیست؟", en: "What is Cloudflare?" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "Cloudflare یک **شبکه جهانی** است با مراکز داده در شهرهای زیادی در سراسر دنیا. بخش بزرگی از وب‌سایت‌های اینترنت امروز به نوعی از سرویس‌های آن استفاده می‌کنند. بیشتر آدم‌ها Cloudflare را با DNS می‌شناسند، ولی DNS فقط درِ ورودی است.",
              en: "Cloudflare is a **global network** with data centres in many cities around the world. A large share of today's websites use its services in one way or another. Most people know Cloudflare for DNS, but DNS is just the front door.",
            },
          },
          {
            type: 'terms',
            items: [
              {
                term: 'DNS',
                def: {
                  fa: "دفترچه تلفن اینترنت: نام دامنه شما را به آدرس سرورها ترجمه می‌کند. Cloudflare می‌تواند Nameserver دامنه شما باشد.",
                  en: "The internet's phone book: turns your domain name into server addresses. Cloudflare can be your domain's nameserver.",
                },
              },
              {
                term: 'CDN / Proxy',
                def: {
                  fa: "Cloudflare جلوی سایت شما می‌ایستد، محتوا را در نزدیک‌ترین نقطه به کاربر نگه می‌دارد و سایت را سریع‌تر می‌کند.",
                  en: "Cloudflare stands in front of your site, keeps content close to each visitor and makes it faster.",
                },
              },
              {
                term: 'SSL/TLS',
                def: {
                  fa: "همان قفل کنار آدرس سایت (HTTPS). Cloudflare گواهی آن را برای شما صادر و تمدید می‌کند.",
                  en: "The padlock next to the address (HTTPS). Cloudflare issues and renews the certificate for you.",
                },
              },
              {
                term: 'WAF / DDoS',
                def: {
                  fa: "نگهبان‌ها: جلوی حمله‌ها و ترافیک مخرب را قبل از رسیدن به سایت شما می‌گیرند.",
                  en: "The guards: they stop attacks and malicious traffic before it reaches your site.",
                },
              },
              {
                term: 'Developer Platform',
                def: {
                  fa: "کارگاه و انبارها: Workers برای اجرای کد، و D1، KV و R2 برای نگهداری داده.",
                  en: "The workshops and warehouses: Workers to run code, plus D1, KV and R2 to store data.",
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "چرا این دوره Cloudflare را انتخاب کرده؟", en: "Why this course uses Cloudflare" },
            text: {
              fa: "چون دامنه، DNS، HTTPS، میزبانی، دیتابیس و ذخیره فایل همه در یک جا هستند. برای شروع پروژه‌های کوچک تا متوسط، پلن رایگان آن سخاوتمند است و لازم نیست سرور اجاره کنید یا Web Server نصب و نگهداری کنید. و مهم‌تر از همه: Agent فقط باید به **یک** حساب وصل شود تا کل زیرساخت را راه بیندازد.",
              en: "Because domain, DNS, HTTPS, hosting, database and file storage all live in one place. For small to medium projects the free plan is generous, and you don't have to rent a server or install and maintain a web server. Most importantly, your agent only needs access to **one** account to set up the whole infrastructure.",
            },
          },
        ],
      },
      {
        id: 'workers-and-pages',
        title: { fa: "Workers: جایی که سایت و کد شما اجرا می‌شود", en: "Workers: where your site and code run" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "**Worker** یک تکه کد است که روی شبکه Cloudflare اجرا می‌شود، نه روی سروری که شما اجاره کرده باشید. به این سبک **Serverless** می‌گویند: سرور هست، ولی مدیریتش با شما نیست. کد شما در مرکز داده‌ای اجرا می‌شود که به کاربر نزدیک‌تر است (به این می‌گویند **Edge**).",
              en: "A **Worker** is a piece of code that runs on Cloudflare's network, not on a server you rent. This style is called **serverless**: there are servers, but managing them isn't your job. Your code runs in the data centre closest to each user (that's the **edge**).",
            },
          },
          {
            type: 'p',
            text: {
              fa: "Worker فقط برای Backend نیست. با قابلیت **Workers Static Assets** همان Worker می‌تواند فایل‌های Frontend شما (HTML، CSS، JavaScript و تصاویر) را هم سرو کند. یعنی یک سایت ساده یا یک Single Page App حتی بدون نوشتن یک خط کد سمت سرور روی Workers منتشر می‌شود، و هر وقت Backend لازم شد، همان پروژه را گسترش می‌دهید.",
              en: "Workers aren't only for the backend. With **Workers Static Assets**, the same Worker can also serve your frontend files (HTML, CSS, JavaScript and images). A simple site or single-page app can be deployed to Workers without writing any server code, and when you need a backend you extend the same project.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: "Pages یا Workers؟", en: "Pages or Workers?" },
            text: {
              fa: "در آموزش‌های قدیمی‌تر برای سایت‌ها همیشه **Cloudflare Pages** پیشنهاد می‌شد. Pages هنوز کار می‌کند، اما مستندات رسمی Cloudflare اکنون می‌گوید پروژه‌های جدید را با **Workers** شروع کنید؛ ویژگی‌ها و بهبودهای جدید روی Workers متمرکز است. در این دوره هم از Workers با Static Assets استفاده می‌کنیم.",
              en: "Older tutorials always recommended **Cloudflare Pages** for websites. Pages still works, but Cloudflare's official docs now say to start new projects on **Workers**, where new features and improvements are focused. This course uses Workers with static assets too.",
            },
          },
          {
            type: 'code',
            lang: 'jsonc',
            code: `{
  "name": "my-first-site",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}`,
            caption: {
              fa: "فایل `wrangler.jsonc`: به Cloudflare می‌گوید فایل‌های ساخته‌شده در پوشه `dist` را منتشر کند",
              en: "`wrangler.jsonc`: tells Cloudflare to publish the built files in the `dist` folder",
            },
          },
          {
            type: 'p',
            text: {
              fa: "**Wrangler** ابزار خط فرمان Cloudflare است. Agent با آن پروژه را می‌سازد، اجرا می‌کند و منتشر می‌کند. شما هم می‌توانید Repo را در داشبورد Cloudflare به Worker وصل کنید تا هر Push روی main خودکار منتشر شود.",
              en: "**Wrangler** is Cloudflare's command-line tool. The agent uses it to create, run and deploy the project. You can also connect the repo to the Worker in the Cloudflare dashboard so every push to main deploys automatically.",
            },
          },
        ],
      },
      {
        id: 'storage',
        title: { fa: "سه انبار: D1، KV و R2", en: "Three warehouses: D1, KV and R2" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "سایت‌ها معمولاً باید چیزی را نگه دارند: کاربران، سفارش‌ها، تنظیمات، عکس‌ها. Cloudflare برای هر نوع داده یک انبار مناسب دارد، و انتخاب درست یکی از تصمیم‌های مهمی است که باید بفهمید، حتی اگر Agent آن را پیاده کند.",
              en: "Sites usually need to keep something: users, orders, settings, images. Cloudflare has a suitable warehouse for each kind of data, and picking the right one is a decision you should understand even if the agent implements it.",
            },
          },
          {
            type: 'compare',
            headers: [
              { fa: "سرویس", en: "Service" },
              { fa: "چه نوع داده‌ای", en: "Kind of data" },
              { fa: "مثال", en: "Example" },
              { fa: "نکته", en: "Note" },
            ],
            rows: [
              [
                { fa: "D1", en: "D1" },
                { fa: "داده جدولی و مرتبط به هم (SQL، بر پایه SQLite)", en: "Structured, related data (SQL, built on SQLite)" },
                { fa: "کاربران، سفارش‌ها، نظرات", en: "Users, orders, comments" },
                { fa: "وقتی جست‌وجو، فیلتر و رابطه بین داده‌ها لازم است", en: "When you need queries, filters and relationships" },
              ],
              [
                { fa: "KV", en: "KV" },
                { fa: "جفت کلید و مقدار، با خواندن خیلی سریع در سراسر دنیا", en: "Key-value pairs, very fast reads worldwide" },
                { fa: "تنظیمات، Cache، Session، Feature Flag", en: "Settings, cache, sessions, feature flags" },
                { fa: "Eventually Consistent: تغییر ممکن است کمی طول بکشد تا همه جا دیده شود", en: "Eventually consistent: a change can take a little while to show up everywhere" },
              ],
              [
                { fa: "R2", en: "R2" },
                { fa: "فایل‌ها (Object Storage)، سازگار با S3", en: "Files (object storage), S3-compatible" },
                { fa: "عکس، ویدیو، PDF، فایل‌های آپلودی کاربران", en: "Images, videos, PDFs, user uploads" },
                { fa: "بدون هزینه Egress (خروج داده)", en: "No egress (data transfer out) fees" },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: "R2 دیتابیس نیست", en: "R2 is not a database" },
            text: {
              fa: "در صحبت‌های اولیه دوره از «R2 Database» نام برده شد. دقیق‌تر این است: **R2 فضای ذخیره فایل (Object Storage)** است، شبیه یک هارد بزرگ آنلاین. دیتابیس SQL در Cloudflare **D1** است و **KV** یک انبار کلید-مقدار. اگر جای این‌ها را اشتباه بگیرید، مثلاً لیست سفارش‌ها را در R2 بریزید، جست‌وجو و به‌روزرسانی‌شان سخت و کند می‌شود.",
              en: "The early voice notes mention an 'R2 database'. More precisely: **R2 is file storage (object storage)**, like a giant online drive. Cloudflare's SQL database is **D1**, and **KV** is a key-value store. Mix them up, for example by keeping orders in R2, and searching and updating them becomes slow and painful.",
            },
          },
          {
            type: 'widget',
            id: 'storage-picker',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: "برای بعد", en: "For later" },
            text: {
              fa: "وقتی پروژه‌تان بزرگ‌تر شد، این‌ها را هم خواهید دید: **Durable Objects** برای داده هم‌زمان و لحظه‌ای مثل چت و همکاری زنده، **Turnstile** به عنوان جایگزین کپچا برای جلوگیری از ربات‌ها، و **Workers AI** برای اجرای مدل‌های هوش مصنوعی روی همین شبکه. فعلاً فقط اسمشان را بدانید.",
              en: "As your project grows you'll meet these too: **Durable Objects** for real-time, coordinated data such as chat and live collaboration, **Turnstile** as a CAPTCHA replacement to stop bots, and **Workers AI** to run AI models on the same network. For now, just know the names.",
            },
          },
        ],
      },
      {
        id: 'plans-and-access',
        title: { fa: "هزینه و دسترسی", en: "Cost and access" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "Cloudflare برای DNS، HTTPS و Workers یک پلن رایگان دارد که برای شروع و بیشتر پروژه‌های کوچک کافی است. هر سرویس سقف استفاده رایگان خودش را دارد و اگر از آن رد شوید، یا درخواست‌ها محدود می‌شوند یا باید پلن پولی بگیرید. این سقف‌ها گاهی عوض می‌شوند، پس عدد دقیق را همیشه از صفحه رسمی Limits و Pricing هر سرویس بخوانید، نه از یک آموزش.",
              en: "Cloudflare has a free plan for DNS, HTTPS and Workers that's enough to start and for most small projects. Each service has its own free usage limits; go past them and requests are limited or you move to a paid plan. These limits change from time to time, so always read the exact numbers on each service's official limits and pricing pages, not in a tutorial.",
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "دسترسی منطقه‌ای", en: "Regional access" },
            text: {
              fa: "همان‌طور که در ویس‌های دوره هم گفته شد، Cloudflare در ایران سرور ندارد و در دوره‌های فیلترینگ شدید، اغلب جزو اولین سرویس‌هایی است که تحت تأثیر قرار می‌گیرد. اگر مخاطبان شما در ایران هستند، سایت را از اینترنت همان مخاطبان (اپراتورهای مختلف موبایل و ثابت) تست کنید و برای شرایط اختلال برنامه داشته باشید.",
              en: "As the course voice notes mention, Cloudflare has no servers inside Iran, and during heavy filtering it is often among the first services affected. If your audience is in Iran, test the site from their actual networks (different mobile and fixed-line providers) and plan for disruptions.",
            },
          },
          {
            type: 'prompt',
            title: { fa: "از Agent بخواهید معماری Cloudflare را پیشنهاد دهد", en: "Ask your agent to propose a Cloudflare architecture" },
            text: {
              fa: "می‌خواهم یک سایت کوچک فروش آنلاین روی Cloudflare بسازم: صفحه محصولات، سبد خرید، فرم سفارش و آپلود عکس محصول توسط من. قبل از نوشتن کد، معماری را پیشنهاد بده: کدام بخش روی Workers با Static Assets، چه داده‌ای در D1، چه چیزی در KV و چه فایل‌هایی در R2. برای هر انتخاب یک جمله دلیل بنویس، و بگو کدام بخش‌ها در پلن رایگان جا می‌شوند و کجا باید صفحه Limits رسمی را چک کنم. هنوز چیزی نساز.",
              en: "I want to build a small online shop on Cloudflare: product pages, a cart, an order form, and product photo uploads by me. Before writing any code, propose the architecture: what runs on Workers with static assets, what data goes in D1, what goes in KV and which files go in R2. Give a one-sentence reason for each choice, and tell me which parts fit the free plan and where I should check the official limits page. Don't build anything yet.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "عکس‌های محصولاتی که کاربران آپلود می‌کنند را کجا نگه داریم؟",
              en: "Where should product photos uploaded by users go?",
            },
            options: [
              { fa: "D1", en: "D1" },
              { fa: "KV", en: "KV" },
              { fa: "R2", en: "R2" },
              { fa: "داخل کد Worker", en: "Inside the Worker's code" },
            ],
            answer: 2,
            explain: {
              fa: "عکس فایل است، و R2 مخصوص ذخیره فایل (Object Storage) است. در D1 فقط آدرس یا نام فایل را کنار اطلاعات محصول نگه می‌دارید.",
              en: "A photo is a file, and R2 is built for file (object) storage. In D1 you just keep the file's name or URL alongside the product data.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare Workers', url: 'https://developers.cloudflare.com/workers/' },
              { label: 'Workers Static Assets', url: 'https://developers.cloudflare.com/workers/static-assets/' },
              { label: 'Workers best practices (Workers vs Pages)', url: 'https://developers.cloudflare.com/workers/best-practices/workers-best-practices/' },
              { label: 'Choosing a storage option', url: 'https://developers.cloudflare.com/workers/platform/storage-options/' },
              { label: 'Cloudflare D1', url: 'https://developers.cloudflare.com/d1/' },
              { label: 'How Workers KV works', url: 'https://developers.cloudflare.com/kv/concepts/how-kv-works/' },
              { label: 'Cloudflare R2', url: 'https://developers.cloudflare.com/r2/' },
              { label: 'Workers limits', url: 'https://developers.cloudflare.com/workers/platform/limits/' },
              { label: 'Workers pricing', url: 'https://developers.cloudflare.com/workers/platform/pricing/' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "Cloudflare به همه فصل‌های قبل وصل است: Nameserver دامنه شما می‌شود (فصل DNS)، کد را از GitHub برمی‌دارد (فصل GitHub) و نقش Hosting و Web Server را بازی می‌کند (فصل «وب چطور کار می‌کند»). در فصل‌های بعد Agent را می‌شناسیم و در پرده دوم یک API Token محدود از Cloudflare به آن می‌دهیم تا Worker، D1، KV و R2 را خودش راه بیندازد.",
      en: "Cloudflare ties into every earlier chapter: it becomes your domain's nameserver (DNS chapter), takes code from GitHub (GitHub chapter) and plays the role of hosting and web server ('How the web works'). Next we meet the agents, and in Act II we give one a limited Cloudflare API token so it can set up the Worker, D1, KV and R2 itself.",
    },
    takeaways: [
      { fa: "Cloudflare یعنی DNS، CDN، HTTPS، امنیت و یک پلتفرم کامل توسعه در یک جا.", en: "Cloudflare means DNS, CDN, HTTPS, security and a full developer platform in one place." },
      { fa: "پروژه‌های جدید را روی Workers (با Static Assets) شروع کنید؛ Pages هنوز کار می‌کند.", en: "Start new projects on Workers (with static assets); Pages still works." },
      { fa: "D1 برای داده جدولی، KV برای خواندن سریع کلید-مقدار، R2 برای فایل.", en: "D1 for structured data, KV for fast key-value reads, R2 for files." },
      { fa: "سقف‌های رایگان را از صفحه رسمی بخوانید، نه از حافظه.", en: "Read free limits from the official page, not from memory." },
      { fa: "اگر مخاطبتان در ایران است، از شبکه خود او تست کنید.", en: "If your audience is in Iran, test from their networks." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Generative vs Agentic
  {
    slug: 'generative-vs-agentic',
    act: 1,
    icon: 'brain',
    voice: '/audio/voice2.mp3',
    title: { fa: "از Generative AI تا Agentic AI", en: "From generative AI to agentic AI" },
    tagline: {
      fa: "فرق کسی که جواب می‌دهد با کسی که کار را انجام می‌دهد",
      en: "The difference between something that answers and something that does",
    },
    minutes: 15,
    mascotLine: {
      fa: "یک چت‌بات به شما می‌گوید چطور سایت بسازید. من سایت را می‌سازم، تستش می‌کنم و بعد از شما می‌پرسم خوب شد یا نه.",
      en: "A chatbot tells you how to build a site. I build it, test it, and then ask you whether it looks right.",
    },
    sections: [
      {
        id: 'ladder-of-ai',
        title: { fa: "پله‌های هوش مصنوعی", en: "The ladder of AI" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "«هوش مصنوعی» اسم جدیدی نیست. به معنای کلی، هر جا یک ماشین کاری را انجام دهد که قبلاً به فکر و تصمیم انسان نیاز داشت، با یک جور هوش مصنوعی طرفیم. فیلتر اسپم ایمیل، پیشنهاد فیلم و تشخیص چهره سال‌هاست با ما هستند. اما همه آن‌ها یک شکل نیستند؛ بیایید پله به پله برویم بالا.",
              en: "'Artificial intelligence' isn't new. Broadly, whenever a machine does something that used to need human judgement, we're dealing with some kind of AI. Spam filters, movie recommendations and face recognition have been around for years. But they're not all the same kind; let's climb the ladder one step at a time.",
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: "اتوماسیون با قانون", en: "Rule-based automation" },
                text: {
                  fa: "برنامه‌ای که دقیقاً همان قانون‌هایی را اجرا می‌کند که انسان نوشته: «اگر X شد، Y کن». هیچ یادگیری‌ای در کار نیست.",
                  en: "A program that follows exactly the rules a human wrote: 'if X, do Y'. No learning involved.",
                },
              },
              {
                title: { fa: "یادگیری ماشین (Machine Learning)", en: "Machine learning" },
                text: {
                  fa: "به جای نوشتن قانون، به ماشین مثال‌های زیادی نشان می‌دهیم تا خودش الگو را یاد بگیرد؛ مثل فیلتر اسپمی که با دیدن هزاران ایمیل اسپم تشخیص را یاد می‌گیرد.",
                  en: "Instead of writing rules, we show the machine many examples so it learns the pattern, like a spam filter that learns from thousands of spam emails.",
                },
              },
              {
                title: { fa: "Generative AI و مدل‌های زبانی (LLM)", en: "Generative AI and language models (LLMs)" },
                text: {
                  fa: "مدل‌هایی که روی حجم عظیمی از متن آموزش دیده‌اند و می‌توانند متن، کد، تصویر و صدای جدید بسازند. شما می‌پرسید، آن‌ها جواب می‌دهند. ChatGPT در اواخر ۲۰۲۲ همین را برای همه آشنا کرد.",
                  en: "Models trained on huge amounts of text that can create new text, code, images and audio. You ask, they answer. ChatGPT made this familiar to everyone in late 2022.",
                },
              },
              {
                title: { fa: "Agentic AI", en: "Agentic AI" },
                text: {
                  fa: "یک قدم جلوتر: به جای جواب دادن، کار را **انجام می‌دهد**. هدف را می‌گیرد، برنامه‌ریزی می‌کند، از ابزارها استفاده می‌کند، نتیجه را بررسی می‌کند و تا رسیدن به هدف ادامه می‌دهد.",
                  en: "One step further: instead of answering, it **does the work**. It takes a goal, plans, uses tools, checks the result and keeps going until the goal is met.",
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: "دقیق‌تر بگوییم", en: "To be precise" },
            text: {
              fa: "Agentic AI جایگزین Generative AI نیست و یک «نوع جدا» از آن هم نیست. یک Agent معمولاً **روی یک مدل زبانی (Generative)** ساخته می‌شود و این مدل مغز فکرکننده آن است. چیزی که آن را Agent می‌کند، لایه‌ای است که دور مدل کشیده شده: دسترسی به ابزارها (ترمینال، فایل‌ها، Git، مرورگر، API)، حافظه کاری و یک حلقه «برنامه‌ریزی، اقدام، مشاهده» که تکرار می‌شود.",
              en: "Agentic AI doesn't replace generative AI, and it isn't a separate kind of AI either. An agent is usually **built on top of a generative language model**, which acts as its thinking brain. What makes it an agent is the layer around the model: access to tools (terminal, files, Git, browser, APIs), working memory, and a repeating 'plan, act, observe' loop.",
            },
          },
          {
            type: 'terms',
            items: [
              {
                term: 'LLM',
                def: {
                  fa: "مدل زبانی بزرگ (Large Language Model): مدلی که روی حجم عظیمی از متن آموزش دیده و کلمه بعدی را پیش‌بینی می‌کند؛ مغز ChatGPT، Codex و Claude.",
                  en: "Large language model: a model trained on huge amounts of text that predicts what comes next; the brain behind ChatGPT, Codex and Claude.",
                },
              },
              {
                term: 'Agent',
                def: {
                  fa: "«عامل» یا «مأمور»: یک LLM به‌علاوه ابزار، حافظه و یک حلقه کاری که می‌تواند یک هدف را قدم‌به‌قدم انجام دهد.",
                  en: "An LLM plus tools, memory and a work loop, able to carry out a goal step by step.",
                },
              },
              {
                term: 'Tool use',
                def: {
                  fa: "توانایی Agent برای صدا زدن ابزارها: اجرای دستور در ترمینال، خواندن و نوشتن فایل، کار با Git یا فراخوانی یک API.",
                  en: "The agent's ability to call tools: run terminal commands, read and write files, use Git, or call an API.",
                },
              },
              {
                term: 'Context window',
                def: {
                  fa: "مقدار متنی که مدل در یک لحظه می‌تواند «جلوی چشمش» داشته باشد. وقتی گفت‌وگو خیلی طولانی شود، جزئیات اول آن کم‌رنگ می‌شوند.",
                  en: "How much text the model can keep in view at once. When a conversation gets very long, the early details fade.",
                },
              },
              {
                term: 'Hallucination',
                def: {
                  fa: "وقتی مدل با اطمینان چیزی را می‌گوید که درست نیست؛ مثلاً اسم یک تابع یا تنظیمی که وجود ندارد. دلیل اصلی اینکه همیشه نتیجه را بررسی و تست می‌کنیم.",
                  en: "When the model confidently states something untrue, such as a function or setting that doesn't exist. The main reason we always check and test the result.",
                },
              },
            ],
          },
        ],
      },
      {
        id: 'answer-vs-action',
        title: { fa: "جواب دادن در برابر انجام دادن", en: "Answering versus doing" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "کلمه **Agent** یعنی «عامل» یا «مأمور»: کسی که از طرف شما کاری را پیش می‌برد. تفاوت را با یک مثال ببینید. اگر به یک چت‌بات بگویید «یک سایت معرفی برای کافه من بساز»، یک تکه کد و یک توضیح تحویل می‌گیرید. بعد خودتان باید فایل بسازید، کد را کپی کنید، اجرا کنید، خطاها را پیدا کنید، دوباره بپرسید و آخر سر هم خودتان منتشرش کنید.",
              en: "**Agent** means someone who acts on your behalf. See the difference with an example. Ask a chatbot to 'build a website for my cafe' and you get a block of code and an explanation. Then you create the files, paste the code, run it, find the errors, ask again, and finally publish it yourself.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "همین درخواست از یک Agent یعنی: پروژه را می‌سازد، فایل‌ها را می‌نویسد، دستور ساخت را اجرا می‌کند، خطا را خودش می‌بیند و درست می‌کند، تغییرات را در GitHub می‌گذارد و حتی منتشر می‌کند. هر جا هم تصمیمی لازم باشد که مال شماست، می‌ایستد و می‌پرسد.",
              en: "Give the same request to an agent and it creates the project, writes the files, runs the build, sees and fixes its own errors, puts the changes on GitHub and can even deploy. Wherever a decision is yours to make, it stops and asks.",
            },
          },
          { type: 'widget', id: 'chat-vs-agent' },
          {
            type: 'compare',
            headers: [
              { fa: "", en: "" },
              { fa: "Generative AI (چت)", en: "Generative AI (chat)" },
              { fa: "Agentic AI", en: "Agentic AI" },
            ],
            rows: [
              [
                { fa: "ورودی شما", en: "What you give" },
                { fa: "یک سؤال یا درخواست", en: "A question or request" },
                { fa: "یک هدف و معیار پایان کار", en: "A goal and a definition of done" },
              ],
              [
                { fa: "خروجی", en: "What you get" },
                { fa: "متن، کد یا تصویر", en: "Text, code or images" },
                { fa: "کار انجام‌شده: فایل، Commit، سایت منتشرشده", en: "Finished work: files, commits, a deployed site" },
              ],
              [
                { fa: "ابزار", en: "Tools" },
                { fa: "معمولاً ندارد", en: "Usually none" },
                { fa: "ترمینال، فایل‌ها، Git، مرورگر، API", en: "Terminal, files, Git, browser, APIs" },
              ],
              [
                { fa: "خطاها", en: "Errors" },
                { fa: "شما پیدا و گزارش می‌کنید", en: "You find and report them" },
                { fa: "خودش اجرا می‌کند، می‌بیند و درست می‌کند", en: "It runs things, sees errors and fixes them" },
              ],
              [
                { fa: "نقش شما", en: "Your role" },
                { fa: "اجراکننده", en: "Doer" },
                { fa: "مدیر پروژه و بازبین", en: "Project lead and reviewer" },
              ],
            ],
          },
        ],
      },
      {
        id: 'agent-loop',
        title: { fa: "حلقه Agent: برنامه، اقدام، مشاهده", en: "The agent loop: plan, act, observe" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "مغز هر Agent یک حلقه ساده است که بارها تکرار می‌شود. **برنامه‌ریزی:** «برای رسیدن به هدف، قدم بعدی چیست؟» **اقدام:** یک ابزار را به کار می‌برد؛ فایلی می‌نویسد یا دستوری اجرا می‌کند. **مشاهده:** خروجی را می‌خواند؛ موفق بود؟ خطا داد؟ و دوباره برمی‌گردد به برنامه‌ریزی. این حلقه آن‌قدر می‌چرخد تا کار تمام شود یا Agent به جایی برسد که باید از شما بپرسد.",
              en: "At the heart of every agent is a simple loop repeated many times. **Plan:** 'what's the next step toward the goal?' **Act:** use a tool, such as writing a file or running a command. **Observe:** read the output; did it work, or did it error? Then back to planning. The loop keeps turning until the job is done or the agent reaches a point where it should ask you.",
            },
          },
          { type: 'widget', id: 'agent-loop' },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "چرا این حلقه برای شما مهم است؟", en: "Why this loop matters to you" },
            text: {
              fa: "چون کیفیت کار Agent به کیفیت «مشاهده» بستگی دارد. اگر Agent بتواند تست اجرا کند، Build بگیرد و صفحه را در مرورگر ببیند، خطاهایش را خودش پیدا می‌کند. پس هر چه ابزارهای بررسی بیشتری در اختیارش بگذارید (تست، پیش‌نمایش، لاگ)، نتیجه بهتری می‌گیرید.",
              en: "Because an agent's work is only as good as what it can observe. If it can run tests, build the project and look at the page in a browser, it catches its own mistakes. The more ways to check its work you give it (tests, previews, logs), the better the result.",
            },
          },
        ],
      },
      {
        id: 'limits',
        title: { fa: "محدودیت‌ها: Agent جادو نیست", en: "Limits: an agent isn't magic" },
        blocks: [
          {
            type: 'list',
            items: [
              {
                fa: "**Hallucination (توهم):** مدل گاهی با اطمینان کامل چیزی می‌گوید که درست نیست؛ مثلاً از تابع یا تنظیمی استفاده می‌کند که وجود ندارد. تست و بازبینی جلوی این را می‌گیرد.",
                en: "**Hallucination:** the model sometimes states something wrong with full confidence, such as a function or setting that doesn't exist. Tests and review catch this.",
              },
              {
                fa: "**محدودیت Context:** Agent در هر لحظه فقط مقدار محدودی متن را «در ذهن» دارد. در پروژه‌های بزرگ یا گفت‌وگوهای خیلی طولانی ممکن است جزئیات اول را فراموش کند. کارها را کوچک و مستند نگه دارید.",
                en: "**Context limits:** an agent can only hold a limited amount of text 'in mind' at once. In large projects or very long sessions it can forget early details. Keep tasks small and documented.",
              },
              {
                fa: "**هدف مبهم، نتیجه مبهم:** اگر بگویید «یک سایت قشنگ بساز»، Agent حدس می‌زند. هر چه هدف، مخاطب و معیار پایان کار روشن‌تر باشد، حدس کمتری لازم است.",
                en: "**Vague goal, vague result:** say 'make a nice website' and the agent guesses. The clearer the goal, audience and definition of done, the less guessing it needs.",
              },
              {
                fa: "**مسئولیت با شماست:** Agent می‌تواند دستور اجرا کند و تغییر منتشر کند. دسترسی‌ها را محدود بدهید و تغییرات مهم را قبل از انتشار ببینید.",
                en: "**You stay responsible:** an agent can run commands and publish changes. Give it limited access and look at important changes before they go live.",
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: "از Agent بخواهید اول برنامه بدهد", en: "Ask the agent for a plan first" },
            text: {
              fa: "هدف: یک صفحه معرفی یک‌صفحه‌ای برای کافه من با منو، ساعت کاری، نقشه و دکمه تماس، که روی موبایل عالی باشد. قبل از هر کاری، برنامه‌ات را قدم به قدم بنویس: چه فایل‌هایی می‌سازی، از چه ابزارهایی استفاده می‌کنی و چطور بررسی می‌کنی که کار درست انجام شده. هر جا اطلاعاتی از من لازم داری، فهرستش کن. تا برنامه را تأیید نکرده‌ام، شروع نکن.",
              en: "Goal: a one-page site for my cafe with the menu, opening hours, a map and a call button, and it must look great on mobile. Before doing anything, write your plan step by step: which files you'll create, which tools you'll use, and how you'll check the work is correct. List anything you need from me. Don't start until I approve the plan.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "کدام جمله درباره Agentic AI درست‌تر است؟",
              en: "Which statement about agentic AI is most accurate?",
            },
            options: [
              { fa: "Agentic AI یک فناوری کاملاً جدا از مدل‌های زبانی است.", en: "Agentic AI is a technology completely separate from language models." },
              { fa: "Agent معمولاً روی یک مدل زبانی ساخته می‌شود و با ابزارها و یک حلقه برنامه-اقدام-مشاهده کار را انجام می‌دهد.", en: "An agent is usually built on a language model and gets work done with tools and a plan-act-observe loop." },
              { fa: "Agent هیچ‌وقت اشتباه نمی‌کند چون خودش تست می‌کند.", en: "An agent never makes mistakes because it tests itself." },
              { fa: "Agent فقط به سؤال‌ها جواب متنی می‌دهد.", en: "An agent only gives text answers to questions." },
            ],
            answer: 1,
            explain: {
              fa: "مدل زبانی مغز Agent است؛ ابزارها و حلقه اقدام آن را عامل می‌کنند. با این حال Agent هم اشتباه می‌کند و بازبینی شما لازم است.",
              en: "The language model is the agent's brain; tools and the action loop make it an agent. It still makes mistakes, so your review matters.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Anthropic: Building effective agents', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
              { label: 'OpenAI: A practical guide to building agents', url: 'https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "تا اینجا زیرساخت را شناختیم: وب، دامنه، GitHub و Cloudflare. حالا فهمیدیم چه کسی قرار است با این زیرساخت کار کند: یک Agent که هدف می‌گیرد و با ابزارها اجرا می‌کند. در فصل بعد دو Agent معروف، Codex و Claude Code را می‌شناسیم، و در پرده دوم ابزارهایش (GitHub و Cloudflare) را به آن وصل می‌کنیم.",
      en: "So far we've met the infrastructure: the web, domains, GitHub and Cloudflare. Now we know who will work with it: an agent that takes a goal and executes it with tools. Next we meet two well-known agents, Codex and Claude Code, and in Act II we connect their tools (GitHub and Cloudflare).",
    },
    takeaways: [
      { fa: "Generative AI جواب می‌دهد و می‌سازد؛ Agentic AI هدف را می‌گیرد و کار را انجام می‌دهد.", en: "Generative AI answers and creates; agentic AI takes a goal and does the work." },
      { fa: "Agent روی یک مدل زبانی ساخته می‌شود، به اضافه ابزار و حلقه برنامه-اقدام-مشاهده.", en: "An agent is a language model plus tools plus a plan-act-observe loop." },
      { fa: "هر چه Agent بهتر بتواند کارش را بررسی کند، نتیجه بهتر است.", en: "The better an agent can check its work, the better the result." },
      { fa: "توهم و محدودیت Context واقعی‌اند؛ هدف روشن و بازبینی شما لازم است.", en: "Hallucination and context limits are real; clear goals and your review are required." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Meet the agents
  {
    slug: 'meet-the-agents',
    act: 1,
    icon: 'robot',
    voice: '/audio/voice2.mp3',
    title: { fa: "آشنایی با Codex و Claude Code", en: "Meet Codex and Claude Code" },
    tagline: {
      fa: "دو همکار قدرتمند برنامه‌نویسی؛ یکی را انتخاب کنید و عمیق یاد بگیرید",
      en: "Two powerful coding teammates: pick one and learn it deeply",
    },
    minutes: 14,
    mascotLine: {
      fa: "من خانواده بزرگی دارم! بیایید با دو تا از معروف‌ترین پسرعموهایم آشنا شوید.",
      en: "I come from a big family! Let me introduce two of my best-known cousins.",
    },
    sections: [
      {
        id: 'codex',
        title: { fa: "OpenAI Codex", en: "OpenAI Codex" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "**Codex** Agent برنامه‌نویسی شرکت OpenAI است و روی مدل‌های همین شرکت کار می‌کند. اگر حساب ChatGPT دارید، به احتمال زیاد به Codex هم دسترسی دارید؛ میزان استفاده به پلن شما بستگی دارد و پلن‌های پولی سقف بالاتر و امکانات بیشتری دارند. Codex در چند جا در دسترس است:",
              en: "**Codex** is OpenAI's coding agent, running on OpenAI's models. If you have a ChatGPT account you very likely have access to Codex too; how much you can use depends on your plan, and paid plans get higher limits and more features. Codex is available in several places:",
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: "**Codex در ChatGPT (Cloud):** کار را از داخل ChatGPT به Codex می‌سپارید و روی کامپیوترهای OpenAI اجرا می‌شود، حتی وقتی کامپیوتر شما خاموش است. به Repoهای GitHub شما وصل می‌شود و نتیجه را به شکل Pull Request تحویل می‌دهد.",
                en: "**Codex in ChatGPT (cloud):** you hand a task to Codex from ChatGPT and it runs on OpenAI's computers, even while yours is off. It connects to your GitHub repos and delivers results as pull requests.",
              },
              {
                fa: "**Codex CLI:** نسخه خط فرمان که روی کامپیوتر خودتان، داخل پوشه پروژه اجرا می‌شود.",
                en: "**Codex CLI:** the command-line version that runs on your own computer, inside your project folder.",
              },
              {
                fa: "**افزونه IDE:** داخل VS Code و ویرایشگرهای مشابه، کنار کدتان.",
                en: "**IDE extension:** inside VS Code and similar editors, right next to your code.",
              },
            ],
          },
          {
            type: 'p',
            text: {
              fa: "Codex دستورالعمل‌های دائمی پروژه را از فایلی به نام `AGENTS.md` در ریشه Repo می‌خواند: اینکه پروژه چیست، چطور تست می‌شود و چه قانون‌هایی دارد.",
              en: "Codex reads standing project instructions from a file called `AGENTS.md` at the root of the repo: what the project is, how to test it, and its rules.",
            },
          },
        ],
      },
      {
        id: 'claude-code',
        title: { fa: "Claude Code", en: "Claude Code" },
        blocks: [
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: "Claude، نه Cloud", en: "Claude, not 'Cloud'" },
            text: {
              fa: "در متن پیاده‌شده ویس‌ها، نرم‌افزار تبدیل گفتار به متن این اسم را «Cloud Code» نوشته است. نام درست **Claude Code** است: Agent برنامه‌نویسی شرکت **Anthropic** که روی مدل‌های **Claude** کار می‌کند. ربطی به Cloudflare یا کلمه Cloud ندارد.",
              en: "In the voice-note transcripts, the speech-to-text software wrote this as 'Cloud Code'. The correct name is **Claude Code**: the coding agent from **Anthropic**, running on **Claude** models. It has nothing to do with Cloudflare or the word 'cloud'.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "**Claude Code** کد شما را می‌خواند، فایل‌ها را ویرایش می‌کند، دستور اجرا می‌کند و با ابزارهای توسعه شما کار می‌کند. آن را در **ترمینال**، داخل **IDE** (افزونه‌های VS Code و JetBrains)، در **اپ دسکتاپ** و در **مرورگر** (claude.ai/code) که روی کامپیوترهای ابری Anthropic اجرا می‌شود، پیدا می‌کنید. Claude Code در اشتراک‌های Pro و Max شرکت Anthropic گنجانده شده و سقف استفاده‌اش با استفاده از Claude در همان حساب مشترک است.",
              en: "**Claude Code** reads your codebase, edits files, runs commands and works with your development tools. You'll find it in the **terminal**, inside your **IDE** (VS Code and JetBrains extensions), in a **desktop app**, and in the **browser** (claude.ai/code), where it runs on Anthropic's cloud machines. Claude Code is included in Anthropic's Pro and Max subscriptions, with usage limits shared with your Claude usage on the same account.",
            },
          },
          {
            type: 'p',
            text: {
              fa: "Claude Code دستورالعمل‌های پروژه را از فایل `CLAUDE.md` می‌خواند، و از **Agent Skills** پشتیبانی می‌کند: پوشه‌هایی با یک فایل `SKILL.md` که دانش و روش کار تکرارشونده را به Agent یاد می‌دهند. در پرده سوم سراغ Skillها می‌رویم.",
              en: "Claude Code reads project instructions from `CLAUDE.md`, and supports **Agent Skills**: folders with a `SKILL.md` file that teach the agent reusable know-how and workflows. We cover skills in Act III.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: "و دیگران", en: "And others" },
            text: {
              fa: "Agentهای خوب دیگری هم هستند؛ مثلاً **GitHub Copilot coding agent** که مستقیم داخل GitHub روی Issueها کار می‌کند، **Cursor** که یک ویرایشگر کد با Agent داخلی است، و **Gemini CLI** از Google. مفاهیم این دوره روی همه آن‌ها صدق می‌کند.",
              en: "There are other good agents too, such as **GitHub Copilot coding agent**, which works on issues directly inside GitHub, **Cursor**, a code editor with a built-in agent, and Google's **Gemini CLI**. The concepts in this course apply to all of them.",
            },
          },
        ],
      },
      {
        id: 'compare',
        title: { fa: "کنار هم", en: "Side by side" },
        blocks: [
          {
            type: 'compare',
            headers: [
              { fa: "", en: "" },
              { fa: "OpenAI Codex", en: "OpenAI Codex" },
              { fa: "Claude Code", en: "Claude Code" },
            ],
            rows: [
              [
                { fa: "سازنده و مدل", en: "Maker and model" },
                { fa: "OpenAI، مدل‌های GPT", en: "OpenAI, GPT models" },
                { fa: "Anthropic، مدل‌های Claude", en: "Anthropic, Claude models" },
              ],
              [
                { fa: "کجا اجرا می‌شود", en: "Where it runs" },
                { fa: "ChatGPT (ابری)، CLI، افزونه IDE", en: "ChatGPT (cloud), CLI, IDE extension" },
                { fa: "ترمینال، IDE، اپ دسکتاپ، وب (ابری)", en: "Terminal, IDE, desktop app, web (cloud)" },
              ],
              [
                { fa: "اتصال به GitHub", en: "GitHub connection" },
                { fa: "اتصال حساب GitHub در ChatGPT؛ نتیجه به شکل Pull Request", en: "Connect GitHub in ChatGPT; results as pull requests" },
                { fa: "Git و GitHub روی کامپیوتر شما، یا اتصال GitHub در نسخه وب؛ Branch و Pull Request", en: "Git and GitHub on your machine, or connect GitHub in the web version; branches and pull requests" },
              ],
              [
                { fa: "فایل دستورالعمل", en: "Instruction file" },
                { fa: "AGENTS.md", en: "AGENTS.md" },
                { fa: "CLAUDE.md", en: "CLAUDE.md" },
              ],
              [
                { fa: "دسترسی", en: "Access" },
                { fa: "همراه حساب ChatGPT؛ سقف بسته به پلن", en: "With a ChatGPT account; limits depend on plan" },
                { fa: "همراه اشتراک Pro یا Max، یا با API", en: "With a Pro or Max subscription, or via the API" },
              ],
              [
                { fa: "مناسب برای", en: "Good for" },
                { fa: "سپردن چند کار موازی در ابر و گرفتن Pull Request", en: "Handing off parallel tasks in the cloud and getting pull requests back" },
                { fa: "کار تعاملی و عمیق روی پروژه، کنار شما در ترمینال یا IDE", en: "Interactive, in-depth work on a project, alongside you in the terminal or IDE" },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "دسترسی منطقه‌ای", en: "Regional availability" },
            text: {
              fa: "هر دو شرکت فهرستی از کشورهای پشتیبانی‌شده دارند و این فهرست ممکن است تغییر کند. به تجربه نویسنده دوره، دسترسی به Claude از ایران سخت‌تر است و ChatGPT و Codex راحت‌تر در دسترس‌اند. قبل از خرید اشتراک، فهرست کشورهای پشتیبانی‌شده هر سرویس را چک کنید و از قوانین آن پیروی کنید. هر کدام که برای شما در دسترس است را انتخاب کنید؛ تقریباً همه مفاهیم این دوره برای هر دو یکسان است.",
              en: "Both companies publish a list of supported countries, and it can change. In the course author's experience, Claude is harder to reach from Iran while ChatGPT and Codex are easier. Before you buy a subscription, check each service's supported-countries list and follow its terms. Use whichever one is available to you; almost every concept in this course works the same for both.",
            },
          },
        ],
      },
      {
        id: 'choose',
        title: { fa: "کدام را انتخاب کنم؟", en: "Which one should I pick?" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "جواب کوتاه: هر کدام که به آن دسترسی دارید و راحت‌ترید. تفاوت این دو در مفهوم و ساختار زیاد نیست؛ هر دو هدف می‌گیرند، برنامه می‌ریزند، کد می‌نویسند، تست می‌گیرند و با GitHub کار می‌کنند. چیزی که واقعاً فرق ایجاد می‌کند، این است که **یکی را عمیق یاد بگیرید**: دستورهایش، فایل دستورالعملش، روش دادن دسترسی و محدودیت‌هایش.",
              en: "Short answer: whichever one you can access and feel comfortable with. The two don't differ much in concept or structure; both take goals, plan, write code, run tests and work with GitHub. What really makes the difference is **learning one deeply**: its commands, its instruction file, how to grant it access, and its limits.",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "چرا یکی و عمیق؟", en: "Why one, and deeply?" },
            text: {
              fa: "پرش بین ابزارها حس پیشرفت می‌دهد ولی مهارت نمی‌سازد. وقتی یک Agent را خوب بشناسید، می‌دانید کجا قوی است، کجا اشتباه می‌کند و چطور باید با آن حرف زد. این مهارت بعداً به هر Agent دیگری هم منتقل می‌شود.",
              en: "Hopping between tools feels like progress but doesn't build skill. Once you know one agent well, you know where it's strong, where it slips, and how to talk to it. That skill then carries over to any other agent.",
            },
          },
          {
            type: 'terms',
            items: [
              {
                term: 'CLI',
                def: { fa: "رابط خط فرمان: برنامه‌ای که با تایپ دستور در ترمینال کار می‌کند.", en: "Command-line interface: a program you use by typing commands in a terminal." },
              },
              {
                term: 'IDE',
                def: { fa: "محیط توسعه یکپارچه؛ ویرایشگر کد مثل VS Code.", en: "Integrated development environment: a code editor such as VS Code." },
              },
              {
                term: 'AGENTS.md / CLAUDE.md',
                def: { fa: "فایل دستورالعمل دائمی پروژه که Agent در شروع هر کار می‌خواند.", en: "The project's standing instructions file that the agent reads at the start of every task." },
              },
              {
                term: 'Cloud task',
                def: { fa: "کاری که Agent روی کامپیوتر ابری شرکت سازنده انجام می‌دهد، نه روی سیستم شما.", en: "A task the agent runs on the vendor's cloud machines instead of your computer." },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: "اولین گفت‌وگو با Agent", en: "Your first conversation with an agent" },
            text: {
              fa: "سلام. من برنامه‌نویس نیستم و می‌خواهم با کمک تو وب‌سایت بسازم. قبل از شروع کار: ۱) به زبان ساده بگو چه کارهایی می‌توانی در این محیط انجام بدهی (فایل نوشتن، اجرای دستور، کار با Git و GitHub، اینترنت) و چه کارهایی نه. ۲) بگو دستورالعمل‌های دائمی پروژه را از چه فایلی می‌خوانی. ۳) یک فایل دستورالعمل اولیه برای پروژه‌ام پیشنهاد بده که در آن نوشته باشد قبل از هر تغییر بزرگ برنامه‌ات را به من نشان بدهی.",
              en: "Hi. I'm not a programmer and I want to build websites with your help. Before we start: 1) explain in plain words what you can and can't do in this environment (write files, run commands, use Git and GitHub, access the internet). 2) Tell me which file you read standing project instructions from. 3) Suggest a starter instructions file for my project that says you must show me your plan before any big change.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "در متن ویس‌ها «Cloud Code» آمده است. منظور کدام محصول است؟",
              en: "The voice transcripts say 'Cloud Code'. Which product is meant?",
            },
            options: [
              { fa: "Cloudflare Workers", en: "Cloudflare Workers" },
              { fa: "Claude Code از Anthropic", en: "Claude Code by Anthropic" },
              { fa: "Google Cloud", en: "Google Cloud" },
              { fa: "OpenAI Codex", en: "OpenAI Codex" },
            ],
            answer: 1,
            explain: {
              fa: "نرم‌افزار تبدیل گفتار به متن «Claude» را «Cloud» شنیده است. منظور Claude Code، Agent برنامه‌نویسی Anthropic است.",
              en: "The speech-to-text software heard 'Claude' as 'Cloud'. It means Claude Code, Anthropic's coding agent.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'OpenAI Codex', url: 'https://openai.com/codex/' },
              { label: 'Using Codex with your ChatGPT plan', url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan' },
              { label: 'Codex docs: AGENTS.md', url: 'https://developers.openai.com/codex/guides/agents-md' },
              { label: 'Claude Code overview', url: 'https://code.claude.com/docs/en/overview' },
              { label: 'Claude Code: memory and CLAUDE.md', url: 'https://code.claude.com/docs/en/memory' },
              { label: 'Using Claude Code with your Pro or Max plan', url: 'https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan' },
              { label: 'OpenAI supported countries', url: 'https://help.openai.com/en/articles/7947663-chatgpt-supported-countries' },
              { label: 'Anthropic supported countries', url: 'https://www.anthropic.com/supported-countries' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "حالا می‌دانیم Agent چیست و کدام Agentها در دسترس‌اند. پرده اول اینجا تمام می‌شود. در پرده دوم حساب‌ها و ابزارها را آماده می‌کنیم و Agent انتخابی‌تان را با دسترسی محدود و امن به GitHub و Cloudflare وصل می‌کنیم، و در پرده سوم فایل AGENTS.md یا CLAUDE.md پروژه را می‌نویسیم.",
      en: "Now we know what an agent is and which ones are available. Act I ends here. In Act II we prepare accounts and tools and connect your chosen agent to GitHub and Cloudflare with limited, safe access, and in Act III we write the project's AGENTS.md or CLAUDE.md.",
    },
    takeaways: [
      { fa: "Codex از OpenAI است؛ در ChatGPT (ابری)، CLI و IDE کار می‌کند و AGENTS.md را می‌خواند.", en: "Codex is OpenAI's: it runs in ChatGPT (cloud), the CLI and IDEs, and reads AGENTS.md." },
      { fa: "Claude Code از Anthropic است؛ در ترمینال، IDE، دسکتاپ و وب کار می‌کند و CLAUDE.md را می‌خواند.", en: "Claude Code is Anthropic's: it runs in the terminal, IDEs, desktop and web, and reads CLAUDE.md." },
      { fa: "«Cloud Code» در متن ویس‌ها همان Claude Code است.", en: "'Cloud Code' in the transcripts means Claude Code." },
      { fa: "فهرست کشورهای پشتیبانی‌شده را چک کنید و از هر کدام که در دسترس است استفاده کنید.", en: "Check the supported-countries lists and use whichever is available to you." },
      { fa: "یکی را انتخاب کنید و عمیق یاد بگیرید؛ مهارت به بقیه منتقل می‌شود.", en: "Pick one and learn it deeply; the skill transfers." },
    ],
  },
];
