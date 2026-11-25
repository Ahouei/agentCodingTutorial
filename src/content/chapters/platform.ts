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
    minutes: 17,
    mascotLine: {
      fa: "من خیلی کار می‌کنم، ولی همه‌اش را در GitHub ثبت می‌کنم تا شما همیشه بتوانید ببینید چه کرده‌ام و اگر لازم شد برگردید.",
      en: "I work fast, but I write everything down in GitHub, so you can always see what I did and roll it back if needed.",
    },
    voice: {
      src: '/audio/voice1.mp3',
      from: 255,
      to: 315,
      transcript:
        "سومین چیزی که الزاماً جزو ملزومات نیست، ولی وقتی بخواهید حرفه‌ای کار کنید حتماً به آن نیاز پیدا می‌کنید، یک Code Repository است تا کدهای مرجع وب‌سایتتان را در آن نگه دارید. اینجا دارم درباره GitHub صحبت می‌کنم. GitHub یک Code Repository خیلی قوی است: خیلی ساده و در عین حال کارآمد و فراگیر، با یک عالمه امکانات مختلف که در اختیار شما می‌گذارد و می‌توانید از آن‌ها استفاده کنید.",
    },
    mission: {
      outcome: {
        fa: "می‌فهمید Git و GitHub چطور هر تغییر را ثبت می‌کنند، و چطور کار Agent را قبل از انتشار در یک Pull Request ببینید و تأیید کنید.",
        en: "You'll understand how Git and GitHub record every change, and how to review and approve the agent's work in a pull request before it goes live.",
      },
      cafe: {
        fa: "کد کافه سحر یک خانه پیدا می‌کند: یک Repository در GitHub به اسم `cafe-sahar`.",
        en: "Café Sahar's code gets a home: a GitHub repository called `cafe-sahar`.",
      },
    },
    warmup: {
      q: {
        fa: "از فصل قبل: دامنه `cafe-sahar.ir` را از کجا می‌خرید؟",
        en: "From last chapter: where do you buy the domain `cafe-sahar.ir`?",
      },
      options: [
        { fa: "از Registry که مدیر کل پسوند .ir است", en: "From the registry that runs the .ir ending" },
        { fa: "از یک Registrar، مثل یک فروشنده مجاز", en: "From a registrar, an authorised seller" },
        { fa: "از DNS Provider که به سؤال‌ها جواب می‌دهد", en: "From the DNS provider that answers lookups" },
      ],
      answer: 1,
      explain: {
        fa: "دامنه را از Registrar می‌خرید. Registry کل پسوند را اداره می‌کند و DNS Provider فقط به سؤال «این دامنه کجاست؟» جواب می‌دهد.",
        en: "You buy from a registrar. The registry runs the whole ending, and the DNS provider only answers 'where is this domain?'.",
      },
      why: [
        {
          fa: "Registry مدیر پسوند است و معمولاً مستقیم به شما دامنه نمی‌فروشد.",
          en: "The registry runs the ending and usually doesn't sell to you directly.",
        },
        {
          fa: "درست است: Registrar فروشنده مجازی است که دامنه را به نام شما ثبت می‌کند.",
          en: "Right: a registrar is the authorised seller that registers the name for you.",
        },
        {
          fa: "DNS Provider جواب سؤال‌های DNS را می‌دهد؛ مالکیت دامنه را نمی‌فروشد.",
          en: "A DNS provider answers DNS questions; it doesn't sell domain ownership.",
        },
      ],
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
              fa: "این دو را زیاد با هم اشتباه می‌گیرند. **Git** نرم‌افزاری است که روی کامپیوتر اجرا می‌شود و تاریخچه را نگه می‌دارد. **GitHub** یک سرویس آنلاین است که Repositoryهای Git را روی اینترنت نگه می‌دارد و امکاناتی مثل Pull Request، بازبینی کد، Issue و GitHub Actions را به آن اضافه می‌کند. یعنی Git موتور است و GitHub پارکینگ و کارگاه آنلاین آن.",
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
              fa: "API Key، Token، رمز Database و فایل‌هایی مثل `.env` و `.dev.vars` نباید وارد Repo شوند، حتی Private. تاریخچه Git همه چیز را به خاطر می‌سپارد؛ اگر یک کلید یک بار Commit شود، حتی بعد از پاک کردن هم در تاریخچه می‌ماند و باید آن کلید را باطل و عوض کنید. نام این فایل‌ها را در `.gitignore` بگذارید و رمزها را در بخش Secrets سرویس‌ها نگه دارید.",
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
              fa: "یک Repository جدید و Private در GitHub با نام cafe-sahar برای وب‌سایت کافه سحر بساز. یک README.md بنویس که توضیح بدهد پروژه چیست، چطور اجرا می‌شود و چطور منتشر می‌شود. یک .gitignore بگذار که node_modules، dist، .wrangler، .env و .dev.vars را نادیده بگیرد. برای هر تغییر یک Branch جدا بساز، پیام‌های Commit را کوتاه و دقیق بنویس، و به جای Push مستقیم روی main، یک Pull Request باز کن تا من بازبینی کنم.",
              en: "Create a new private GitHub repository called cafe-sahar for the Café Sahar website. Write a README.md explaining what the project is, how to run it locally and how to deploy it. Add a .gitignore that ignores node_modules, dist, .wrangler, .env and .dev.vars. Use a separate branch for each change, write short, specific commit messages, and open a pull request for me to review instead of pushing straight to main.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "Agent کافه سحر یک API Key را اشتباهی Commit کرده و در Commit بعدی پاکش کرده است. اول چه کنید؟",
              en: "Café Sahar's agent accidentally committed an API key, then deleted it in the next commit. What comes first?",
            },
            options: [
              { fa: "کاری لازم نیست، چون در Commit بعدی پاک شده است", en: "Nothing, since the next commit already removed it" },
              { fa: "Repository را Private کنیم و کار را همین‌طور ادامه دهیم", en: "Make the repository private and simply carry on" },
              { fa: "فقط پیام آن Commit را به چیز دیگری عوض کنیم", en: "Just rewrite that commit's message to hide it" },
              { fa: "کلید را باطل و کلید نو را در Secrets ذخیره کنیم", en: "Revoke the key and store a fresh one in secrets" },
            ],
            answer: 3,
            explain: {
              fa: "تاریخچه Git همه نسخه‌ها را نگه می‌دارد، پس آن کلید هنوز قابل پیدا شدن است. تنها راه امن، باطل کردن و تعویض کلید است.",
              en: "Git history keeps every version, so the key can still be found. The only safe fix is to revoke and replace it.",
            },
            why: [
              {
                fa: "پاک کردن در Commit بعدی، نسخه قبلی را از تاریخچه حذف نمی‌کند؛ کلید هنوز آنجاست.",
                en: "Deleting it later doesn't remove the earlier version from history; the key is still there.",
              },
              {
                fa: "Private کردن دسترسی‌های بعدی را کم می‌کند، ولی کسی که کلید را دیده هنوز آن را دارد.",
                en: "Going private limits future access, but anyone who already saw the key still has it.",
              },
              {
                fa: "پیام Commit فقط توضیح است؛ محتوای فایل‌ها با عوض کردن پیام تغییر نمی‌کند.",
                en: "The message is only a description; changing it doesn't change the files.",
              },
              {
                fa: "درست است: کلید لورفته را بی‌اثر کنید، بعد کلید جدید را فقط در Secrets نگه دارید.",
                en: "Right: make the leaked key useless first, then keep the new one only in secrets.",
              },
            ],
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
      fa: "در فصل قبل دیدیم دامنه و DNS چطور اسم سایت را به سرور می‌رسانند، و پیش‌تر هم دیدیم وب از چه قطعاتی ساخته شده. GitHub جایی است که کد همه آن قطعات نگهداری می‌شود. در فصل بعد Cloudflare را می‌شناسیم که کد را از همین GitHub برمی‌دارد و روی اینترنت منتشر می‌کند، و در پرده دوم Agent را به GitHub وصل می‌کنیم تا خودش Branch بسازد و Pull Request باز کند.",
      en: "Last chapter showed how a domain and DNS lead visitors to your server, and before that we saw the pieces the web is built from. GitHub is where the code for all those pieces lives. Next we meet Cloudflare, which takes the code from this same GitHub and publishes it to the internet, and in Act II we connect the agent to GitHub so it can create branches and open pull requests itself.",
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
    voice: {
      src: '/audio/voice2.mp3',
      from: 0,
      to: 200,
      transcript:
        "برای اینکه یک وب‌سایت راه بیندازید، یک سری زیرساخت نرم‌افزاری روی سرور هم لازم دارید. بسته به وب‌سایت، این می‌تواند فقط یک Web Server باشد که یک صفحه Static را Load کند، یا Frontend و Backend و خیلی وقت‌ها یک Database هم لازم باشد. Cloudflare همه این‌ها را سرویس‌دهی می‌کند و تا حد خیلی خوبی هم رایگان. تنها مشکلش برای ما ایرانی‌ها این است که در ایران سرور ندارد و با کمال تعجب، یکی از اولین جاهایی است که در فیلترینگ شدید تحت تأثیر قرار می‌گیرد؛ چون بخش بزرگی از اینترنت امروز را تشکیل می‌دهد.",
    },
    mission: {
      outcome: {
        fa: "می‌فهمید Cloudflare چه سرویس‌هایی دارد و برای هر نوع داده (جدول، کلید-مقدار، فایل) کدام انبار مناسب است.",
        en: "You'll know what Cloudflare offers and which storage fits each kind of data: tables, key-value pairs or files.",
      },
      cafe: {
        fa: "تصمیم می‌گیریم کافه سحر کجا اجرا شود: یک Worker برای سایت و D1 برای رزرو میزها.",
        en: "We decide where Café Sahar runs: a Worker for the site and D1 for table bookings.",
      },
    },
    warmup: {
      q: {
        fa: "از فصل قبل: Agent تغییرات کافه را چطور برای بازبینی شما می‌فرستد؟",
        en: "From last chapter: how does the agent send the café's changes for your review?",
      },
      options: [
        { fa: "مستقیم روی main Push می‌کند و منتشر می‌شود", en: "It pushes straight to main and goes live" },
        { fa: "روی یک Branch کار می‌کند و Pull Request باز می‌کند", en: "It works on a branch and opens a pull request" },
        { fa: "فایل‌ها را برایتان ایمیل می‌کند تا خودتان کپی کنید", en: "It emails you the files to copy over yourself" },
      ],
      answer: 1,
      explain: {
        fa: "Branch و Pull Request یعنی تغییرات جدا می‌ماند تا شما ببینید و تأیید کنید؛ بعد Merge و منتشر می‌شود.",
        en: "A branch and a pull request keep changes separate until you see and approve them; then they merge and go live.",
      },
      why: [
        {
          fa: "Push مستقیم روی main یعنی تغییر بدون بازبینی شما روی سایت می‌رود.",
          en: "Pushing straight to main puts changes live without your review.",
        },
        {
          fa: "درست است: Branch کار را جدا نگه می‌دارد و Pull Request جای بازبینی است.",
          en: "Right: the branch keeps work separate and the pull request is where you review.",
        },
        {
          fa: "کپی دستی فایل‌ها همان دردسری است که GitHub و Agent حذفش می‌کنند.",
          en: "Copying files by hand is exactly the chore GitHub and the agent remove.",
        },
      ],
    },
    title: { fa: "Cloudflare: خیلی بیشتر از DNS", en: "Cloudflare: far more than DNS" },
    tagline: {
      fa: "یک شبکه جهانی که هم دامنه شما را می‌گرداند، هم سایت و Database شما را میزبانی می‌کند",
      en: "One global network that runs your domain and hosts your site and data",
    },
    minutes: 20,
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
              fa: "چون دامنه، DNS، HTTPS، میزبانی، Database و ذخیره فایل همه در یک جا هستند. برای شروع پروژه‌های کوچک تا متوسط، پلن رایگان آن سخاوتمند است و لازم نیست سرور اجاره کنید یا Web Server نصب و نگهداری کنید. و مهم‌تر از همه: Agent فقط باید به **یک** حساب وصل شود تا کل زیرساخت را راه بیندازد.",
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
  "name": "cafe-sahar",
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
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: "Lovable هم روی همین Workers اجرا می‌شود", en: "Lovable runs on Workers too" },
            text: {
              fa: "به گفته وبلاگ رسمی Lovable، اپ‌هایی که از اواسط ۲۰۲۶ در Lovable ساخته می‌شوند روی **Cloudflare Workers** اجرا می‌شوند. یعنی چه مسیر Codex را بروید و چه Lovable، آخرش با همین مفاهیم سروکار دارید، و می‌توانید کد ساخته‌شده در Lovable را به GitHub ببرید و روی Workers حساب خودتان هم منتشر کنید.",
              en: "According to Lovable's official blog, apps created in Lovable since mid-2026 run on **Cloudflare Workers**. So whether you take the Codex path or the Lovable path, you end up with the same ideas, and you can take code built in Lovable to GitHub and deploy it on Workers in your own account.",
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
            title: { fa: "R2 یک Database نیست", en: "R2 is not a database" },
            text: {
              fa: "در صحبت‌های اولیه دوره از «R2 Database» نام برده شد. دقیق‌تر این است: **R2 فضای ذخیره فایل (Object Storage)** است، شبیه یک هارد بزرگ آنلاین. Database از نوع SQL در Cloudflare **D1** است و **KV** یک انبار کلید-مقدار. اگر جای این‌ها را اشتباه بگیرید، مثلاً رزروهای کافه را در R2 بریزید، جست‌وجو و به‌روزرسانی‌شان سخت و کند می‌شود.",
              en: "The early voice notes mention an 'R2 database'. More precisely: **R2 is file storage (object storage)**, like a giant online drive. Cloudflare's SQL database is **D1**, and **KV** is a key-value store. Mix them up, for example by keeping the café's bookings in R2, and searching and updating them becomes slow and painful.",
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
              fa: "می‌خواهم وب‌سایت کافه سحر (cafe-sahar.ir) را روی Cloudflare بسازم: صفحه منو، ساعت کاری، فرم رزرو میز و آپلود عکس غذاها توسط من. قبل از نوشتن کد، معماری را پیشنهاد بده: کدام بخش روی Workers با Static Assets، چه داده‌ای در D1، چه چیزی در KV و چه فایل‌هایی در R2. برای هر انتخاب یک جمله دلیل بنویس، و بگو کدام بخش‌ها در پلن رایگان جا می‌شوند و کجا باید صفحه Limits رسمی را چک کنم. هنوز چیزی نساز.",
              en: "I want to build the Café Sahar website (cafe-sahar.ir) on Cloudflare: a menu page, opening hours, a table-booking form, and dish photos that I upload. Before writing any code, propose the architecture: what runs on Workers with static assets, what data goes in D1, what goes in KV and which files go in R2. Give a one-sentence reason for each choice, and tell me which parts fit the free plan and where I should check the official limits page. Don't build anything yet.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "سحر می‌خواهد عکس غذاهای منو را آپلود کند. این عکس‌ها را کجا نگه داریم؟",
              en: "Sahar wants to upload photos of the menu dishes. Where should the photos live?",
            },
            options: [
              { fa: "در KV، کنار تنظیمات سایت", en: "In KV, next to the site settings" },
              { fa: "در R2، به‌صورت فایل", en: "In R2, as separate files" },
              { fa: "در D1، داخل جدول منو", en: "In D1, inside the menu table" },
              { fa: "داخل کد خود Worker", en: "Inside the Worker's own code" },
            ],
            answer: 1,
            explain: {
              fa: "عکس فایل است، و R2 مخصوص ذخیره فایل (Object Storage) است. در D1 فقط نام یا آدرس عکس را کنار اطلاعات غذا نگه می‌دارید.",
              en: "A photo is a file, and R2 is built for file (object) storage. In D1 you just keep the photo's name or URL next to the dish data.",
            },
            why: [
              {
                fa: "KV برای مقدارهای کوچک و خواندن سریع است، نه برای نگهداری فایل‌های عکس.",
                en: "KV is for small values read fast, not for storing image files.",
              },
              {
                fa: "درست است: R2 انبار فایل است و برای عکس و ویدیو ساخته شده.",
                en: "Right: R2 is file storage, built for images and video.",
              },
              {
                fa: "D1 برای داده جدولی است؛ در جدول منو فقط آدرس عکس را بگذارید، نه خود فایل را.",
                en: "D1 is for table data; keep only the photo's address in the menu table, not the file.",
              },
              {
                fa: "هر عکس جدید یعنی انتشار دوباره کد؛ و سحر نمی‌تواند خودش عکس اضافه کند.",
                en: "Every new photo would mean redeploying code, and Sahar couldn't add photos herself.",
              },
            ],
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
      {
        id: 'plan-b-iran',
        title: { fa: "اگر Cloudflare برای مخاطبان شما فیلتر شد", en: "If Cloudflare is filtered for your audience" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "Cloudflare برای مخاطب جهانی عالی است، ولی اگر مشتری‌های کافه سحر بیشتر در ایران هستند، باید یک **نقشه دوم** داشته باشید. خبر خوب این است که سایتی که درست ساخته شده، به یک سرویس قفل نیست: همان خروجی Build را می‌شود روی یک میزبان دیگر هم گذاشت.",
              en: "Cloudflare is great for a global audience, but if most of Café Sahar's customers are in Iran, you need a **plan B**. The good news: a well-built site isn't locked to one service. The same build output can be placed on another host too.",
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { fa: "خروجی را قابل‌حمل نگه دارید", en: "Keep the output portable" },
                text: {
                  fa: "بخش‌های ثابت سایت با `npm run build` به یک پوشه `dist` تبدیل می‌شوند که روی هر میزبان فایل ثابت کار می‌کند. از Agent بخواهید وابستگی غیرضروری به یک سرویس خاص اضافه نکند.",
                  en: "The static parts of the site become a `dist` folder with `npm run build`, which works on any static host. Ask the agent not to add needless ties to one specific service.",
                },
              },
              {
                title: { fa: "یک میزبان ایرانی انتخاب کنید", en: "Pick an Iranian host" },
                text: {
                  fa: "سرویس‌هایی مثل **Liara** (میزبانی ابری و PaaS با ابزار خط فرمان `liara deploy`) و **همروش / Darkube** (PaaS برای اپ‌های کانتینری و Database مدیریت‌شده) وجود دارند. **ابرآروان** هم CDN و فضای ابری ارائه می‌دهد؛ فهرست دقیق خدماتش را از سایت خودش ببینید.",
                  en: "Services such as **Liara** (cloud hosting and PaaS with a `liara deploy` command-line tool) and **Hamravesh / Darkube** (PaaS for container apps and managed databases) exist. **ArvanCloud** also offers CDN and cloud services; check its own site for the exact product list.",
                },
              },
              {
                title: { fa: "دامنه‌ها را جدا کنید", en: "Split the domains" },
                text: {
                  fa: "مثلاً `cafe-sahar.com` روی Cloudflare برای مخاطب جهانی، و `cafe-sahar.ir` جدا، رو به میزبان ایرانی. دو دامنه، دو میزبان؛ مگر اینکه با Geo-DNS کار کرده باشید، این دو را در یک Zone قاطی نکنید.",
                  en: "For example `cafe-sahar.com` on Cloudflare for a global audience, and a separate `cafe-sahar.ir` pointing to the Iranian host. Two domains, two hosts; unless you know geo-DNS, don't mix them in one zone.",
                },
              },
              {
                title: { fa: "Backend را بسنجید", en: "Decide about the backend" },
                text: {
                  fa: "چیزی که روی Workers و D1 است، بین‌المللی می‌ماند. برای نسخه ایرانی یا از Database همان میزبان ایرانی استفاده کنید، یا آن نسخه را فقط‌خواندنی (مثلاً فقط منو و ساعت کاری) نگه دارید.",
                  en: "Anything on Workers and D1 stays international. For the Iranian copy, either use the Iranian host's own database or keep that copy read-only (for example, just the menu and opening hours).",
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "قبل از اعلام، از شبکه مخاطب تست کنید", en: "Test from your audience's network before announcing" },
            text: {
              fa: "دسترس‌پذیری هر سرویس از داخل ایران با زمان تغییر می‌کند. نسخه ایرانی را از چند اپراتور موبایل و اینترنت ثابت باز کنید. قوانین ثبت دامنه `.ir` را هم از سایت رسمی IRNIC (nic.ir) بخوانید؛ منابع مختلف درباره شرایطش یکسان نمی‌گویند.",
              en: "Whether a service can be reached from inside Iran changes over time. Open the Iranian copy from several mobile and fixed-line providers. For `.ir` registration rules, read IRNIC's official site (nic.ir); sources don't agree on the current conditions.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            text: {
              fa: "یک نکته برای Agent: در فایل دستورالعمل پروژه بنویسید که سایت باید هم روی Workers و هم به شکل فایل‌های ثابت قابل انتشار باشد. این‌طوری نقشه دوم همیشه یک دستور فاصله دارد.",
              en: "A tip for your agent: write in the project's instruction file that the site must deploy both to Workers and as plain static files. That keeps plan B one command away.",
            },
          },
          {
            type: 'links',
            items: [
              { label: 'Liara docs', url: 'https://docs.liara.ir/' },
              { label: 'Hamravesh', url: 'https://hamravesh.com/' },
              { label: 'IANA: .ir domain', url: 'https://www.iana.org/domains/root/db/ir' },
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
      { fa: "اگر مخاطبتان در ایران است، از شبکه خود او تست کنید و یک نقشه دوم (میزبان ایرانی و دامنه .ir جدا) آماده داشته باشید.", en: "If your audience is in Iran, test from their networks and keep a plan B ready: an Iranian host on a separate .ir domain." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Generative vs Agentic
  {
    slug: 'generative-vs-agentic',
    act: 1,
    icon: 'brain',
    voice: {
      src: '/audio/voice2.mp3',
      from: 270,
      to: 437,
      transcript:
        "Agentic با Generativeهای ساده چه فرقی دارد؟ چیزی که حدود چهار سال پیش همه به عنوان هوش مصنوعی با آن برخورد داشتند، Generative AI بود. هوش مصنوعی در تعریف کلی، هر کاری است که توسط ماشین و بدون دخالت انسان انجام می‌شود. بعد مدل‌های زبانی آمدند و Generative AIها روی آن‌ها ساخته شدند و دنیای جدیدی باز شد. کمی بعدتر Agentic AIها آمدند؛ Agent یعنی مأمور و عامل. اینجا دیگر شما فقط سؤال نمی‌پرسید و جواب نمی‌گیرید: کاری را می‌خواهید و خودش انجامش می‌دهد، دقیق و از صفر تا صد.",
    },
    mission: {
      outcome: {
        fa: "فرق «جواب دادن» و «انجام دادن» را می‌فهمید و می‌دانید حلقه برنامه، اقدام و مشاهده یک Agent چطور کار می‌کند.",
        en: "You'll understand the difference between answering and doing, and how an agent's plan, act and observe loop works.",
      },
      cafe: {
        fa: "کافه سحر یک Agent استخدام می‌کند، نه فقط یک چت‌بات که کد تحویل بدهد.",
        en: "Café Sahar hires an agent, not just a chatbot that hands over code.",
      },
    },
    warmup: {
      q: {
        fa: "از فصل قبل: رزروهای میز کافه سحر را در کدام انبار Cloudflare نگه داریم؟",
        en: "From last chapter: which Cloudflare store should keep Café Sahar's table bookings?",
      },
      options: [
        { fa: "R2، چون برای نگهداری فایل‌ها ساخته شده", en: "R2, because it's built for storing files" },
        { fa: "D1، چون داده جدولی و قابل جست‌وجوست", en: "D1, because it's searchable table data" },
        { fa: "KV، چون خواندنش در همه‌جا خیلی سریع است", en: "KV, because reads are very fast everywhere" },
      ],
      answer: 1,
      explain: {
        fa: "رزروها ردیف‌های مرتبط با تاریخ، ساعت و نام‌اند و باید فیلتر و جست‌وجو شوند؛ این کار D1 است.",
        en: "Bookings are related rows with a date, time and name that you filter and search; that's D1's job.",
      },
      why: [
        {
          fa: "R2 انبار فایل است؛ جست‌وجو بین رزروها در آن سخت و کند می‌شود.",
          en: "R2 stores files; searching bookings there would be slow and awkward.",
        },
        {
          fa: "درست است: D1 یک Database از نوع SQL برای داده جدولی است.",
          en: "Right: D1 is an SQL database for table data.",
        },
        {
          fa: "KV سریع است ولی Eventually Consistent؛ برای رزروی که نباید دوبار ثبت شود مناسب نیست.",
          en: "KV is fast but eventually consistent; risky for bookings that must not double up.",
        },
      ],
    },
    title: { fa: "از Generative AI تا Agentic AI", en: "From generative AI to agentic AI" },
    tagline: {
      fa: "فرق کسی که جواب می‌دهد با کسی که کار را انجام می‌دهد",
      en: "The difference between something that answers and something that does",
    },
    minutes: 21,
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
              fa: "کلمه **Agent** یعنی «عامل» یا «مأمور»: کسی که از طرف شما کاری را پیش می‌برد. تفاوت را با یک مثال ببینید. اگر به یک چت‌بات بگویید «یک سایت معرفی برای کافه سحر بساز»، یک تکه کد و یک توضیح تحویل می‌گیرید. بعد خودتان باید فایل بسازید، کد را کپی کنید، اجرا کنید، خطاها را پیدا کنید، دوباره بپرسید و آخر سر هم خودتان منتشرش کنید.",
              en: "**Agent** means someone who acts on your behalf. See the difference with an example. Ask a chatbot to 'build a website for Café Sahar' and you get a block of code and an explanation. Then you create the files, paste the code, run it, find the errors, ask again, and finally publish it yourself.",
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
              fa: "هدف: یک صفحه معرفی یک‌صفحه‌ای برای کافه سحر (cafe-sahar.ir) با منو، ساعت کاری، نقشه و دکمه تماس، که روی موبایل عالی باشد. قبل از هر کاری، برنامه‌ات را قدم به قدم بنویس: چه فایل‌هایی می‌سازی، از چه ابزارهایی استفاده می‌کنی و چطور بررسی می‌کنی که کار درست انجام شده. هر جا اطلاعاتی از من لازم داری، فهرستش کن. تا برنامه را تأیید نکرده‌ام، شروع نکن.",
              en: "Goal: a one-page site for Café Sahar (cafe-sahar.ir) with the menu, opening hours, a map and a call button, and it must look great on mobile. Before doing anything, write your plan step by step: which files you'll create, which tools you'll use, and how you'll check the work is correct. List anything you need from me. Don't start until I approve the plan.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "کدام جمله درباره Agentic AI درست‌تر است؟",
              en: "Which statement about agentic AI is most accurate?",
            },
            options: [
              { fa: "روی مدل زبانی ساخته می‌شود و با ابزار و حلقه کار می‌کند", en: "It runs on a language model, using tools and a work loop" },
              { fa: "یک فناوری کاملاً جداست و هیچ ربطی به مدل‌های زبانی ندارد", en: "It's a separate technology with no link to language models" },
              { fa: "هرگز اشتباه نمی‌کند، چون همه کارهایش را خودش تست می‌کند", en: "It never makes mistakes, because it tests all its own work" },
              { fa: "فقط به سؤال‌ها جواب متنی می‌دهد و هیچ ابزاری اجرا نمی‌کند", en: "It only answers questions in text and never runs any tools" },
            ],
            answer: 0,
            explain: {
              fa: "مدل زبانی مغز Agent است؛ ابزارها و حلقه اقدام آن را عامل می‌کنند. با این حال Agent هم اشتباه می‌کند و بازبینی شما لازم است.",
              en: "The language model is the agent's brain; tools and the action loop make it an agent. It still makes mistakes, so your review matters.",
            },
            why: [
              {
                fa: "درست است: مدل زبانی فکر می‌کند، ابزارها اجرا می‌کنند و حلقه تا تمام شدن کار می‌چرخد.",
                en: "Right: the model thinks, the tools act, and the loop runs until the job is done.",
              },
              {
                fa: "Agentها معمولاً روی همان مدل‌های زبانی ساخته می‌شوند؛ جدا نیستند.",
                en: "Agents are usually built on those same language models; they aren't separate.",
              },
              {
                fa: "تست خطا را کم می‌کند، ولی توهم و برداشت اشتباه هنوز پیش می‌آید؛ بازبینی شما لازم است.",
                en: "Tests reduce errors, but hallucinations and misunderstandings still happen; you still review.",
              },
              {
                fa: "این توصیف یک چت‌بات Generative است؛ Agent ابزار اجرا می‌کند و کار را انجام می‌دهد.",
                en: "That describes a generative chatbot; an agent runs tools and does the work.",
              },
            ],
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
      fa: "تا اینجا زیرساخت را شناختیم: وب، دامنه، GitHub و Cloudflare. حالا فهمیدیم چه کسی قرار است با این زیرساخت کار کند: یک Agent که هدف می‌گیرد و با ابزارها اجرا می‌کند. در فصل بعد دو مسیر اصلی ساخت را می‌شناسیم، Codex و Lovable، به همراه Claude Code، و در پرده دوم ابزارها (GitHub و Cloudflare) را به Agent وصل می‌کنیم.",
      en: "So far we've met the infrastructure: the web, domains, GitHub and Cloudflare. Now we know who will work with it: an agent that takes a goal and executes it with tools. Next we meet the two main build paths, Codex and Lovable, plus Claude Code, and in Act II we connect the tools (GitHub and Cloudflare) to the agent.",
    },
    takeaways: [
      { fa: "Generative AI جواب می‌دهد و می‌سازد؛ Agentic AI هدف را می‌گیرد و کار را انجام می‌دهد.", en: "Generative AI answers and creates; agentic AI takes a goal and does the work." },
      { fa: "Agent روی یک مدل زبانی ساخته می‌شود، به اضافه ابزار و حلقه برنامه-اقدام-مشاهده.", en: "An agent is a language model plus tools plus a plan-act-observe loop." },
      { fa: "هر چه Agent بهتر بتواند کارش را بررسی کند، نتیجه بهتر است.", en: "The better an agent can check its work, the better the result." },
      { fa: "توهم و محدودیت Context واقعی‌اند؛ هدف روشن و بازبینی شما لازم است.", en: "Hallucination and context limits are real; clear goals and your review are required." },
    ],
  },

  // ───────────────────────────────────────────────────────────── Meet the agents (Codex, Lovable and friends)
  {
    slug: 'meet-the-agents',
    act: 1,
    icon: 'robot',
    voice: {
      src: '/audio/voice2.mp3',
      from: 215,
      to: 275,
      transcript:
        "برای Setup نیاز به یک سرویس هوش مصنوعی داریم؛ آن هم حالتی که از Agentic AI استفاده می‌کنید، نه یک Generative AI ساده. معروف‌ترینشان، اگر خیلی کلی بخواهم بگویم، ChatGPT Codex یا OpenAI Codex و Claude Code هستند. من خودم با Claude خیلی راحت‌ترم، چون واقعاً عالی کار می‌کند؛ ولی در ایران دسترسی به آن خیلی سخت است. OpenAI هنوز این‌طور نشده، پس سراغ Codex می‌رویم. در مفهوم و ساختار، کلیت این‌ها تفاوت چندانی با هم ندارد.",
    },
    title: { fa: "Codex، Lovable و دوستان", en: "Codex, Lovable and friends" },
    tagline: {
      fa: "دو مسیر اصلی ساخت: Agent کدنویس یا سازنده اپ؛ یکی را انتخاب کنید و عمیق یاد بگیرید",
      en: "Two main ways to build: a coding agent or an app builder. Pick one and learn it deeply",
    },
    minutes: 23,
    mascotLine: {
      fa: "من خانواده بزرگی دارم! امروز دو تا از کاربردی‌ترین‌هایشان را می‌شناسید: Codex که در کد شما کار می‌کند، و Lovable که از یک گفت‌وگو اپ زنده می‌سازد.",
      en: "I come from a big family! Today you meet two of the most useful members: Codex, which works in your code, and Lovable, which turns a conversation into a live app.",
    },
    mission: {
      outcome: {
        fa: "می‌دانید Codex و Lovable هر کدام چطور کار می‌کنند، کد کجا می‌ماند، میزبانی با کیست و کدام مسیر به پروژه شما می‌خورد.",
        en: "You'll know how Codex and Lovable each work, where the code lives, who handles hosting, and which path fits your project.",
      },
      cafe: {
        fa: "سحر مسیر ساخت کافه را انتخاب می‌کند: Codex یا Lovable.",
        en: "Sahar chooses the café's build path: Codex or Lovable.",
      },
    },
    warmup: {
      q: {
        fa: "از فصل قبل: چه چیزی یک Agent را از یک چت‌بات ساده جدا می‌کند؟",
        en: "From last chapter: what sets an agent apart from a plain chatbot?",
      },
      options: [
        { fa: "یک مدل زبانی کاملاً متفاوت و جدید", en: "A completely different, newer language model" },
        { fa: "ابزارها و حلقه برنامه، اقدام و مشاهده", en: "Tools and a plan, act and observe loop" },
        { fa: "اینکه هرگز و در هیچ کاری اشتباه نمی‌کند", en: "The fact that it never makes mistakes" },
      ],
      answer: 1,
      explain: {
        fa: "Agent معمولاً روی همان نوع مدل زبانی ساخته می‌شود؛ ابزارها و حلقه کاری آن را عامل می‌کنند.",
        en: "An agent usually runs on the same kind of language model; tools and the work loop make it an agent.",
      },
      why: [
        {
          fa: "مغز هر دو معمولاً یک مدل زبانی است؛ تفاوت در لایه دور آن است.",
          en: "Both usually have a language model as the brain; the difference is the layer around it.",
        },
        {
          fa: "درست است: ابزار برای اجرا و حلقه برای بررسی نتیجه و ادامه دادن.",
          en: "Right: tools to act, and a loop to check the result and keep going.",
        },
        {
          fa: "Agentها هم اشتباه می‌کنند؛ به همین دلیل بازبینی شما لازم است.",
          en: "Agents make mistakes too; that's why your review matters.",
        },
      ],
    },
    sections: [
      {
        id: 'two-paths',
        title: { fa: "دو مسیر برای ساختن", en: "Two ways to build" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "برای ساختن یک وب‌سایت با هوش مصنوعی دو مسیر اصلی وجود دارد. در مسیر اول یک **Agent کدنویس** مثل **Codex** داخل Repository شما کار می‌کند: کد می‌نویسد، تست می‌گیرد و Pull Request باز می‌کند، و شما سایت را روی میزبانی که خودتان انتخاب کرده‌اید (در این دوره Cloudflare) منتشر می‌کنید. در مسیر دوم یک **سازنده اپ** مثل **Lovable** از یک گفت‌وگو، یک اپ زنده با پیش‌نمایش می‌سازد و میزبانی، Database و انتشار را هم خودش فراهم می‌کند.",
              en: "There are two main ways to build a website with AI. In the first, a **coding agent** such as **Codex** works inside your repository: it writes code, runs tests and opens pull requests, and you publish the site on a host you choose (Cloudflare in this course). In the second, an **app builder** such as **Lovable** turns a conversation into a live app with a preview, and also provides hosting, a database and publishing.",
            },
          },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "چرا هر دو را یاد می‌گیریم؟", en: "Why learn both?" },
            text: {
              fa: "چون هر کدام جایی می‌درخشد. Lovable سریع‌ترین راه از ایده تا یک اپ قابل‌دیدن است؛ Codex بیشترین کنترل و کمترین وابستگی را می‌دهد. خیلی از پروژه‌های واقعی هر دو را ترکیب می‌کنند: نمونه اولیه در Lovable، انتقال به GitHub، ادامه با Codex و انتشار روی Cloudflare. در فصل‌های بعد هر جا قدم‌ها فرق کنند، هر دو مسیر را کنار هم می‌بینید.",
              en: "Because each shines somewhere. Lovable is the fastest way from an idea to an app you can see; Codex gives the most control and the least lock-in. Many real projects combine them: prototype in Lovable, move to GitHub, continue with Codex and deploy on Cloudflare. In later chapters, wherever the steps differ, you'll see both paths side by side.",
            },
          },
        ],
      },
      {
        id: 'codex',
        title: { fa: "OpenAI Codex: Agent داخل کد شما", en: "OpenAI Codex: an agent inside your code" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "**Codex** Agent برنامه‌نویسی شرکت OpenAI است و روی مدل‌های همین شرکت کار می‌کند. طبق راهنمای رسمی OpenAI، Codex در همه پلن‌های ChatGPT، حتی Free و Go، در دسترس است و سقف استفاده به پلن بستگی دارد. **Codex Cloud** (اجرای کارها روی کامپیوترهای OpenAI) برای Plus و پلن‌های بالاتر است. Codex را در این جاها پیدا می‌کنید:",
              en: "**Codex** is OpenAI's coding agent, running on OpenAI's models. According to OpenAI's help center, Codex is included in all ChatGPT plans, Free and Go too, with usage limits that depend on the plan. **Codex Cloud** (running tasks on OpenAI's machines) is for Plus and higher plans. You'll find Codex in these places:",
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: "**Codex در وب و ابر:** کار را می‌سپارید و روی کامپیوترهای OpenAI اجرا می‌شود، حتی وقتی کامپیوتر شما خاموش است. به Repositoryهای GitHub وصل می‌شود و نتیجه را به شکل Pull Request تحویل می‌دهد.",
                en: "**Codex on the web and in the cloud:** you hand off a task and it runs on OpenAI's machines, even while yours is off. It connects to your GitHub repositories and delivers results as pull requests.",
              },
              {
                fa: "**اپ دسکتاپ ChatGPT (حالت Codex):** کار با Codex کنار بقیه گفت‌وگوهای ChatGPT.",
                en: "**The ChatGPT desktop app (Codex mode):** work with Codex alongside your other ChatGPT conversations.",
              },
              {
                fa: "**Codex CLI و افزونه IDE:** روی کامپیوتر خودتان، در ترمینال یا داخل VS Code و ویرایشگرهای مشابه.",
                en: "**Codex CLI and the IDE extension:** on your own computer, in a terminal or inside VS Code and similar editors.",
              },
            ],
          },
          {
            type: 'p',
            text: {
              fa: "Codex دستورالعمل‌های دائمی پروژه را از فایل `AGENTS.md` در ریشه Repository می‌خواند و Skillها را از پوشه `.agents/skills`. **میزبانی جزو Codex نیست:** کد در GitHub شما می‌ماند و خودتان آن را روی Cloudflare منتشر می‌کنید؛ همان مسیری که این دوره قدم‌به‌قدم می‌سازد.",
              en: "Codex reads standing project instructions from `AGENTS.md` at the root of the repository, and skills from the `.agents/skills` folder. **Hosting isn't part of Codex:** the code stays in your GitHub and you publish it on Cloudflare yourself, which is exactly the path this course builds step by step.",
            },
          },
        ],
      },
      {
        id: 'lovable',
        title: { fa: "Lovable: از گفت‌وگو تا اپ زنده", en: "Lovable: from a conversation to a live app" },
        blocks: [
          {
            type: 'p',
            text: {
              fa: "**Lovable** یک سازنده اپ با هوش مصنوعی است: در چت توضیح می‌دهید چه می‌خواهید و Lovable Frontend و در صورت نیاز Backend را می‌سازد، با یک پیش‌نمایش زنده که همان لحظه می‌بینید. هر تغییر به شکل یک نسخه ذخیره می‌شود و می‌توانید به هر نسخه قبلی برگردید.",
              en: "**Lovable** is an AI app builder: you describe what you want in chat, and Lovable builds the frontend and, when needed, the backend, with a live preview you see right away. Every change is saved as a version you can roll back to.",
            },
          },
          {
            type: 'list',
            items: [
              {
                fa: "**سه حالت گفت‌وگو:** **Chat** برای مشورت بدون تغییر کد، **Plan** که برنامه‌ای قابل‌ویرایش می‌نویسد تا تأییدش کنید، و **Build** که تغییر را از اول تا آخر پیاده و بررسی می‌کند.",
                en: "**Three chat modes:** **Chat** to discuss without changing code, **Plan** to write an editable plan for you to approve, and **Build** to implement and verify a change end to end.",
              },
              {
                fa: "**ویرایش دیداری:** با نوار ابزار پیش‌نمایش، یک بخش از صفحه را انتخاب می‌کنید و تغییرش را توضیح می‌دهید یا متن را همان‌جا ویرایش می‌کنید.",
                en: "**Visual editing:** with the preview toolbar you select part of the page and describe the change, or edit text in place.",
              },
              {
                fa: "**Instructions:** معادل `AGENTS.md`؛ متن دستورالعملی که در سطح Workspace، پروژه یا شخص همیشه در نظر گرفته می‌شود.",
                en: "**Instructions:** the equivalent of `AGENTS.md`: instruction text kept at workspace, project or personal level and always taken into account.",
              },
              {
                fa: "**Backend داخلی:** Database، ورود کاربران، فایل و توابع سمت سرور، بر پایه Supabase. می‌توانید Supabase خودتان را هم وصل کنید.",
                en: "**Built-in backend:** database, sign-in, file storage and server functions, built on Supabase. You can also connect your own Supabase.",
              },
              {
                fa: "**GitHub دوطرفه:** تغییرات Lovable به GitHub می‌رود و تغییراتی که در GitHub روی Branch فعال Push شود، به Lovable برمی‌گردد. پس کد مال شماست.",
                en: "**Two-way GitHub sync:** changes in Lovable go to GitHub, and changes pushed to the active branch in GitHub come back into Lovable. The code is yours.",
              },
              {
                fa: "**انتشار:** با دکمه Publish روی آدرسی مثل `cafe-sahar.lovable.app` منتشر می‌شود و قبلش بررسی امنیتی خودکار اجرا می‌شود. دامنه اختصاصی مثل `cafe-sahar.ir` در پلن‌های پولی ممکن است.",
                en: "**Publishing:** the Publish button puts it on an address like `cafe-sahar.lovable.app`, after automatic security checks. A custom domain such as `cafe-sahar.ir` needs a paid plan.",
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "هزینه با «Credit» حساب می‌شود", en: "Costs are counted in credits" },
            text: {
              fa: "Lovable یک پلن رایگان با Credit روزانه دارد و پلن‌های پولی Credit ماهانه می‌دهند. نکته مهم: همان Credit هم برای **ساختن** خرج می‌شود و هم برای **اجرای** اپ (میزبانی Backend و امکانات هوش مصنوعی داخل اپ). قبل از شروع پروژه جدی، صفحه قیمت رسمی را بخوانید و مصرف Credit را زیر نظر بگیرید.",
              en: "Lovable has a free plan with daily credits, and paid plans give monthly credits. The key point: the same credits pay for **building** and for **running** the app (backend hosting and in-app AI features). Before a serious project, read the official pricing page and keep an eye on credit use.",
            },
          },
          {
            type: 'callout',
            tone: 'fix',
            title: { fa: "Lovable یعنی قفل شدن؟ نه لزوماً", en: "Does Lovable lock you in? Not necessarily" },
            text: {
              fa: "خیلی‌ها فکر می‌کنند هر چه در Lovable بسازید همان‌جا گیر می‌افتد. مستندات رسمی Lovable می‌گوید می‌توانید کد را صادر کنید و روی میزبان دیگری، از جمله Cloudflare، منتشر کنید. فقط یادتان باشد بعد از رفتن، مسئولیت استقرار، امنیت و پشتیبان‌گیری با خودتان است، و قبل از جابه‌جایی کامل یک انتشار آزمایشی بگیرید.",
              en: "Many people assume whatever you build in Lovable is stuck there. Lovable's official docs say you can export the code and host it elsewhere, including on Cloudflare. Just remember that once you leave, deployment, security and backups become your job, and do a test deploy before moving for good.",
            },
          },
        ],
      },
      {
        id: 'claude-code',
        title: { fa: "Claude Code و دیگر دوستان", en: "Claude Code and other friends" },
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
              fa: "**Claude Code** یک Agent کدنویس قوی است، هم‌خانواده Codex: کد شما را می‌خواند، فایل‌ها را ویرایش می‌کند و دستور اجرا می‌کند. آن را در **ترمینال**، داخل **IDE** (VS Code و JetBrains)، در **اپ دسکتاپ** و در **وب** پیدا می‌کنید. Claude Code در اشتراک‌های **Pro، Max و Ultra** و پلن‌های **Team و Enterprise** هست و سقف استفاده‌اش با استفاده از Claude در همان حساب مشترک است. دستورالعمل‌ها را از `CLAUDE.md` می‌خواند، `AGENTS.md` را هم می‌تواند بخواند و از Skillها پشتیبانی می‌کند.",
              en: "**Claude Code** is a strong coding agent in the same family as Codex: it reads your code, edits files and runs commands. You'll find it in the **terminal**, inside your **IDE** (VS Code and JetBrains), in a **desktop app** and on the **web**. Claude Code comes with **Pro, Max and Ultra** subscriptions and **Team and Enterprise** plans, with usage limits shared with your Claude usage on the same account. It reads instructions from `CLAUDE.md`, can also read `AGENTS.md`, and supports skills.",
            },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { fa: "و دیگران", en: "And others" },
            text: {
              fa: "**Grok Build** از xAI یک Agent ترمینالی است که فعلاً می‌شود رایگان امتحانش کرد. **DeepSeek** مدل‌های خیلی ارزانی دارد که داخل Agentهای متن‌باز مثل OpenCode، Cline و Aider، و حتی خود Claude Code، استفاده می‌شوند. GitHub Copilot و Cursor هم گزینه‌های رایج‌اند. در فصل بعد هر پنج پلتفرم را کنار هم مقایسه می‌کنیم.",
              en: "**Grok Build** from xAI is a terminal agent you can try for free for now. **DeepSeek** has very low-cost models used inside open-source agents such as OpenCode, Cline and Aider, and even inside Claude Code. GitHub Copilot and Cursor are common options too. Next chapter compares all five platforms side by side.",
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
              { fa: "Codex", en: "Codex" },
              { fa: "Lovable", en: "Lovable" },
              { fa: "Claude Code", en: "Claude Code" },
            ],
            rows: [
              [
                { fa: "نوع", en: "Kind" },
                { fa: "Agent کدنویس", en: "Coding agent" },
                { fa: "سازنده اپ", en: "App builder" },
                { fa: "Agent کدنویس", en: "Coding agent" },
              ],
              [
                { fa: "کجا کار می‌کنید", en: "Where you work" },
                { fa: "وب، اپ دسکتاپ، CLI، IDE", en: "Web, desktop app, CLI, IDE" },
                { fa: "چت و پیش‌نمایش زنده در مرورگر", en: "Chat and live preview in the browser" },
                { fa: "ترمینال، IDE، دسکتاپ، وب", en: "Terminal, IDE, desktop, web" },
              ],
              [
                { fa: "کد کجا می‌ماند", en: "Where the code lives" },
                { fa: "Repository شما در GitHub", en: "Your GitHub repository" },
                { fa: "در Lovable، با همگام‌سازی دوطرفه GitHub", en: "In Lovable, with two-way GitHub sync" },
                { fa: "Repository شما در GitHub", en: "Your GitHub repository" },
              ],
              [
                { fa: "Backend و Database", en: "Backend and database" },
                { fa: "خودتان انتخاب می‌کنید (مثلاً D1)", en: "You choose (for example D1)" },
                { fa: "داخلی، بر پایه Supabase", en: "Built in, based on Supabase" },
                { fa: "خودتان انتخاب می‌کنید", en: "You choose" },
              ],
              [
                { fa: "میزبانی", en: "Hosting" },
                { fa: "ندارد؛ Cloudflare یا هر میزبان دیگر", en: "Not included: Cloudflare or any host" },
                { fa: "دارد: lovable.app، دامنه اختصاصی با پلن پولی", en: "Included: lovable.app, custom domain on paid plans" },
                { fa: "ندارد؛ Cloudflare یا هر میزبان دیگر", en: "Not included: Cloudflare or any host" },
              ],
              [
                { fa: "فایل دستورالعمل", en: "Instruction file" },
                { fa: "AGENTS.md", en: "AGENTS.md" },
                { fa: "Instructions در تنظیمات پروژه", en: "Instructions in project settings" },
                { fa: "CLAUDE.md (و AGENTS.md)", en: "CLAUDE.md (and AGENTS.md)" },
              ],
              [
                { fa: "هزینه", en: "Cost" },
                { fa: "همراه پلن ChatGPT؛ سقف بسته به پلن", en: "With a ChatGPT plan; limits depend on plan" },
                { fa: "Credit؛ هم برای ساختن، هم برای اجرا", en: "Credits, for building and for running" },
                { fa: "همراه پلن‌های Claude", en: "With Claude plans" },
              ],
              [
                { fa: "مناسب برای", en: "Good for" },
                { fa: "کنترل کامل و انتشار روی زیرساخت خودتان", en: "Full control and your own infrastructure" },
                { fa: "سریع‌ترین راه از ایده تا اپ قابل‌دیدن", en: "The fastest way from idea to a visible app" },
                { fa: "کار تعاملی و عمیق روی کد", en: "Interactive, in-depth work on code" },
              ],
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { fa: "دسترسی منطقه‌ای و قوانین", en: "Regional access and terms" },
            text: {
              fa: "طبق صفحه‌های رسمی، ایران در فهرست کشورهای پشتیبانی‌شده OpenAI و Anthropic نیست، و قوانین Lovable استفاده از کشورهای تحت تحریم جامع را مجاز نمی‌داند. این فهرست‌ها ممکن است تغییر کنند؛ قبل از ساختن حساب یا خرید اشتراک، شرایط و فهرست کشورهای هر سرویس را خودتان بخوانید و از آن پیروی کنید. مفاهیم این دوره برای همه این ابزارها یکسان است، و در فصل بعد گزینه‌هایی مثل DeepSeek را هم می‌بینید که شرایط متفاوتی دارند.",
              en: "According to their official pages, Iran is not on OpenAI's or Anthropic's supported-countries lists, and Lovable's terms don't allow use from countries under comprehensive sanctions. These lists can change; before creating an account or buying a plan, read each service's terms and country list yourself and follow them. The ideas in this course are the same for all these tools, and next chapter also covers options such as DeepSeek that have different conditions.",
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
              fa: "جواب کوتاه: اگر می‌خواهید زود یک چیز زنده ببینید و از ترمینال و میزبانی فرار می‌کنید، Lovable. اگر کنترل کامل، کد در Repository خودتان و انتشار روی Cloudflare را می‌خواهید، Codex. دو سؤال زیر و ابزار انتخاب کمکتان می‌کند. هر کدام را که انتخاب کنید، در فصل‌های بعد هر جا قدم‌ها فرق کند، مسیر خودتان را می‌بینید.",
              en: "Short answer: if you want to see something live quickly and would rather avoid terminals and hosting, Lovable. If you want full control, the code in your own repository and deployment on Cloudflare, Codex. The picker below helps. Whichever you choose, later chapters show your path wherever the steps differ.",
            },
          },
          {
            type: 'path',
            codex: [
              {
                type: 'steps',
                items: [
                  {
                    title: { fa: "وارد ChatGPT شوید و Codex را باز کنید", en: "Sign in to ChatGPT and open Codex" },
                    text: {
                      fa: "Codex را در وب یا اپ دسکتاپ باز کنید. برای کارهای ابری، پلن Plus یا بالاتر لازم است.",
                      en: "Open Codex on the web or in the desktop app. Cloud tasks need Plus or higher.",
                    },
                  },
                  {
                    title: { fa: "GitHub را وصل کنید", en: "Connect GitHub" },
                    text: {
                      fa: "دسترسی را فقط به Repository `cafe-sahar` بدهید، نه به همه Repositoryها.",
                      en: "Grant access only to the `cafe-sahar` repository, not to all of them.",
                    },
                  },
                  {
                    title: { fa: "یک AGENTS.md بگذارید", en: "Add an AGENTS.md" },
                    text: {
                      fa: "پروژه، زبان فارسی و راست‌به‌چپ و قانون «اول برنامه، بعد کد» را در آن بنویسید.",
                      en: "Describe the project, Persian right-to-left text and the rule 'plan first, then code'.",
                    },
                  },
                  {
                    title: { fa: "اولین کار را با درخواست برنامه شروع کنید", en: "Start the first task by asking for a plan" },
                    text: {
                      fa: "برنامه را بخوانید و تأیید کنید، بعد Pull Request را بازبینی و Merge کنید.",
                      en: "Read and approve the plan, then review and merge the pull request.",
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
                    title: { fa: "در lovable.dev حساب بسازید", en: "Sign up at lovable.dev" },
                    text: {
                      fa: "قبلش شرایط استفاده و کشورهای مجاز را بخوانید. پلن رایگان برای امتحان کافی است.",
                      en: "Read the terms and allowed countries first. The free plan is enough to try it.",
                    },
                  },
                  {
                    title: { fa: "پروژه را با Plan شروع کنید", en: "Start the project in Plan mode" },
                    text: {
                      fa: "کافه سحر را توضیح دهید: منو، ساعت کاری، رزرو میز، فارسی و راست‌به‌چپ. برنامه را بخوانید و تأیید کنید.",
                      en: "Describe Café Sahar: menu, opening hours, table booking, Persian right-to-left. Read and approve the plan.",
                    },
                  },
                  {
                    title: { fa: "Instructions پروژه را بنویسید", en: "Write the project Instructions" },
                    text: {
                      fa: "همان چیزهایی که در AGENTS.md می‌نوشتید: لحن، زبان، رنگ‌ها و قانون‌ها.",
                      en: "The same things you'd put in AGENTS.md: tone, language, colours and rules.",
                    },
                  },
                  {
                    title: { fa: "GitHub را وصل کنید، بعد Publish", en: "Connect GitHub, then publish" },
                    text: {
                      fa: "با همگام‌سازی GitHub یک نسخه از کد در حساب خودتان دارید؛ بعد روی `lovable.app` منتشر کنید.",
                      en: "GitHub sync keeps a copy of the code in your own account; then publish to `lovable.app`.",
                    },
                  },
                ],
              },
            ],
          },
          { type: 'widget', id: 'agent-picker' },
          {
            type: 'callout',
            tone: 'why',
            title: { fa: "چرا یکی و عمیق؟", en: "Why one, and deeply?" },
            text: {
              fa: "پرش بین ابزارها حس پیشرفت می‌دهد ولی مهارت نمی‌سازد. وقتی یک ابزار را خوب بشناسید، می‌دانید کجا قوی است، کجا اشتباه می‌کند و چطور باید با آن حرف زد. این مهارت بعداً به هر ابزار دیگری هم منتقل می‌شود.",
              en: "Hopping between tools feels like progress but doesn't build skill. Once you know one tool well, you know where it's strong, where it slips, and how to talk to it. That skill then carries over to any other tool.",
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
              {
                term: 'App builder',
                def: { fa: "ابزاری مثل Lovable که از گفت‌وگو یک اپ کامل با پیش‌نمایش، Backend و انتشار می‌سازد.", en: "A tool such as Lovable that turns a conversation into a full app with preview, backend and publishing." },
              },
              {
                term: 'Credits',
                def: { fa: "واحد مصرف در Lovable؛ برای ساختن و اجرای اپ خرج می‌شود.", en: "Lovable's usage unit, spent on building and on running the app." },
              },
            ],
          },
          {
            type: 'prompt',
            title: { fa: "اولین گفت‌وگو، در هر کدام از دو مسیر", en: "Your first conversation, on either path" },
            text: {
              fa: "سلام. من برنامه‌نویس نیستم و می‌خواهم با کمک تو وب‌سایت کافه سحر (cafe-sahar.ir) را بسازم: منو، ساعت کاری و فرم رزرو میز، فارسی و راست‌به‌چپ. قبل از شروع کار: ۱) به زبان ساده بگو چه کارهایی در این محیط می‌توانی انجام بدهی و چه کارهایی نه. ۲) بگو دستورالعمل‌های دائمی پروژه را کجا بنویسم که همیشه بخوانی. ۳) یک برنامه کوتاه برای نسخه اول پیشنهاد بده و تا تأیید نکرده‌ام چیزی نساز.",
              en: "Hi. I'm not a programmer and I want to build the Café Sahar website (cafe-sahar.ir) with your help: menu, opening hours and a table-booking form, in Persian, right to left. Before we start: 1) explain in plain words what you can and can't do in this environment. 2) Tell me where to write standing project instructions so you always read them. 3) Suggest a short plan for the first version and don't build anything until I approve it.",
            },
          },
          {
            type: 'quiz',
            q: {
              fa: "سحر می‌خواهد همین هفته صفحه رزرو آنلاین داشته باشد، با ترمینال کار نکرده و می‌خواهد میزبانی هم برایش انجام شود. شروع مناسب‌تر کدام است؟",
              en: "Sahar wants online booking this week, has never used a terminal, and wants hosting handled for her. Which start fits best?",
            },
            options: [
              { fa: "نصب Codex CLI و کار در ترمینال", en: "Install the Codex CLI and use a terminal" },
              { fa: "گرفتن کلید API و اسکریپت با DeepSeek", en: "Get an API key and script it with DeepSeek" },
              { fa: "Lovable: توضیح، پیش‌نمایش و Publish", en: "Lovable: describe, preview and publish" },
              { fa: "Claude Code در ترمینال و میزبانی دستی", en: "Claude Code in a terminal, then self-host" },
            ],
            answer: 2,
            explain: {
              fa: "با این شرایط، Lovable همه چیز را در مرورگر نگه می‌دارد و میزبانی هم دارد. بعدها اگر کنترل بیشتری خواست، کد از طریق GitHub قابل انتقال است.",
              en: "Given these constraints, Lovable keeps everything in the browser and includes hosting. Later, if she wants more control, the code can move out through GitHub.",
            },
            why: [
              {
                fa: "Codex قوی است، ولی ترمینال و میزبانی جداگانه برای این هفته و این تجربه سنگین است.",
                en: "Codex is strong, but a terminal plus separate hosting is a lot for this week and this experience level.",
              },
              {
                fa: "DeepSeek مدل است، نه سازنده اپ؛ هنوز یک ابزار Agent و میزبانی لازم است.",
                en: "DeepSeek is a model, not an app builder; you'd still need an agent tool and hosting.",
              },
              {
                fa: "درست است: همه چیز در مرورگر، با پیش‌نمایش زنده و انتشار داخلی.",
                en: "Right: everything in the browser, with a live preview and built-in publishing.",
              },
              {
                fa: "Claude Code هم مثل Codex به ترمینال و میزبانی جدا نیاز دارد.",
                en: "Like Codex, Claude Code needs a terminal and separate hosting.",
              },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'OpenAI Codex', url: 'https://developers.openai.com/codex' },
              { label: 'Using Codex with your ChatGPT plan', url: 'https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan' },
              { label: 'Codex docs: AGENTS.md', url: 'https://developers.openai.com/codex/guides/agents-md' },
              { label: 'Lovable docs: getting started', url: 'https://docs.lovable.dev/introduction/getting-started' },
              { label: 'Lovable pricing', url: 'https://lovable.dev/pricing' },
              { label: 'Lovable docs: GitHub sync', url: 'https://docs.lovable.dev/integrations/github' },
              { label: 'Lovable docs: publish', url: 'https://docs.lovable.dev/features/publish' },
              { label: 'Claude Code overview', url: 'https://code.claude.com/docs/en/overview' },
              { label: 'Using Claude Code with your Pro, Max or Ultra plan', url: 'https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan' },
              { label: 'OpenAI supported countries', url: 'https://help.openai.com/en/articles/7947663-chatgpt-supported-countries' },
              { label: 'Anthropic supported countries', url: 'https://www.anthropic.com/supported-countries' },
              { label: 'Lovable terms', url: 'https://lovable.dev/terms' },
            ],
          },
        ],
      },
    ],
    connects: {
      fa: "حالا می‌دانیم Agent چیست و دو مسیر اصلی ساخت کدام‌اند. در فصل بعد هر پنج پلتفرم (Claude Code، Codex، Lovable، Grok و DeepSeek) را کنار هم می‌سنجیم. بعد در پرده دوم حساب‌ها را آماده می‌کنیم و ابزار انتخابی‌تان را با دسترسی محدود و امن به GitHub و Cloudflare وصل می‌کنیم.",
      en: "Now we know what an agent is and the two main ways to build. Next chapter weighs all five platforms (Claude Code, Codex, Lovable, Grok and DeepSeek) side by side. Then in Act II we prepare accounts and connect your chosen tool to GitHub and Cloudflare with limited, safe access.",
    },
    takeaways: [
      { fa: "Codex یک Agent کدنویس است: داخل Repository شما کار می‌کند و میزبانی با خودتان است.", en: "Codex is a coding agent: it works inside your repository, and hosting is up to you." },
      { fa: "Lovable یک سازنده اپ است: از گفت‌وگو اپ زنده می‌سازد و میزبانی و Backend دارد.", en: "Lovable is an app builder: it turns a conversation into a live app, with hosting and a backend." },
      { fa: "کد Lovable با GitHub همگام می‌شود، پس بعداً می‌توانید با Codex ادامه دهید و روی Cloudflare منتشر کنید.", en: "Lovable syncs code to GitHub, so you can later continue with Codex and deploy on Cloudflare." },
      { fa: "«Cloud Code» در متن ویس‌ها همان Claude Code است، یک Agent کدنویس قوی دیگر.", en: "'Cloud Code' in the transcripts means Claude Code, another strong coding agent." },
      { fa: "قبل از ساختن حساب، شرایط و فهرست کشورهای هر سرویس را خودتان بخوانید.", en: "Before you sign up, read each service's terms and country list yourself." },
    ],
  },
];
