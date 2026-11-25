import type { Chapter, L } from '../types';

/** Small helper to keep the bilingual strings readable. */
const t = (fa: string, en: string): L => ({ fa, en });

export const shipping: Chapter[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Testing & debugging                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: 'testing-debugging',
    act: 4,
    icon: 'bug',
    title: t('تست و Debugging: اعتماد کن، ولی چک کن', 'Testing and debugging: trust, but verify'),
    tagline: t(
      'یاد بگیرید چطور مطمئن شوید چیزی که Agent ساخته واقعاً کار می‌کند، و وقتی کار نکرد چطور درستش کنید',
      'Learn to prove that what your agent built really works, and how to fix it when it does not',
    ),
    minutes: 16,
    mascotLine: t(
      'من خیلی با اعتمادبه‌نفس کد می‌نویسم، ولی اعتمادبه‌نفس با درست‌بودن فرق دارد! بیایید با هم چکش کنیم.',
      'I write code with a lot of confidence, but confidence is not the same as being right! Let us check it together.',
    ),
    sections: [
      {
        id: 'why-test',
        title: t('چرا وقتی Agent کد را نوشته، باز هم باید تست کنیم؟', 'Why test when an agent wrote the code?'),
        blocks: [
          {
            type: 'p',
            text: t(
              'وقتی Agent کارش تمام می‌شود، معمولاً با لحنی مطمئن می‌گوید «انجام شد». این جمله یعنی Agent **فکر می‌کند** کار تمام است، نه اینکه **ثابت کرده** کار درست است. مدل‌های زبانی گاهی چیزی را جا می‌اندازند، گاهی منظور شما را کمی متفاوت می‌فهمند و گاهی کدی می‌نویسند که روی کامپیوتر خودشان اجرا شده ولی روی گوشی شما به هم می‌ریزد.',
              'When an agent finishes, it usually says "done" in a confident tone. That means the agent **believes** the work is finished, not that it has **proven** the work is correct. Language models sometimes miss things, sometimes read your intent slightly differently, and sometimes write code that ran fine in their sandbox but breaks on your phone.',
            ),
          },
          {
            type: 'callout',
            tone: 'why',
            title: t('تست یعنی شاهد، نه حس', 'A test is evidence, not a feeling'),
            text: t(
              'تست راهی است که درستی کار را **با شواهد** نشان می‌دهد: صفحه روی موبایل باز شد، فرم پیام را در Database ذخیره کرد، دکمه با کیبورد هم کار می‌کند. هرچه پروژه بزرگ‌تر شود، این شواهد ارزشمندتر می‌شوند؛ چون هر تغییر تازه ممکن است چیزی را که دیروز سالم بود خراب کند.',
              'A test shows correctness **with evidence**: the page opened on mobile, the form saved the message to the database, the button works with the keyboard too. The bigger the project gets, the more valuable that evidence becomes, because every new change can break something that worked yesterday.',
            ),
          },
          {
            type: 'p',
            text: t(
              'خبر خوب این است که لازم نیست خودتان تست بنویسید. همان Agentی که کد را نوشته، می‌تواند تست هم بنویسد و اجرا کند. کار شما این است که **بخواهید**، نتیجه را **ببینید** و به جواب «همه‌چیز اوکی است» بدون خروجی واقعی قانع نشوید.',
              'The good news: you do not have to write tests yourself. The same agent that wrote the code can write and run tests. Your job is to **ask** for them, **look** at the results, and not settle for "everything is fine" without real output.',
            ),
          },
          {
            type: 'callout',
            tone: 'fix',
            title: t('برداشت اشتباه رایج', 'Common misconception'),
            text: t(
              '«اگر سایت روی کامپیوتر من باز شد، یعنی درست است.» نه لزوماً! ممکن است روی Safari آیفون، در صفحه کوچک، با اینترنت کند یا برای کسی که با Screen Reader کار می‌کند خراب باشد. یک بار باز شدن فقط یکی از ده‌ها حالت است.',
              '"If the site opens on my computer, it works." Not necessarily! It can still break in iPhone Safari, on a small screen, on a slow connection, or for someone using a screen reader. Opening once is just one of dozens of situations.',
            ),
          },
        ],
      },
      {
        id: 'kinds-of-tests',
        title: t('جعبه‌ابزار تست: از چشم شما تا ربات‌ها', 'The testing toolbox: from your eyes to robots'),
        blocks: [
          {
            type: 'p',
            text: t(
              'تست فقط یک چیز نیست. چند لایه دارد و هر لایه نوع خاصی از اشتباه را می‌گیرد. برای یک سایت یا وب‌اپ کوچک، این‌ها مهم‌ترین‌ها هستند:',
              'Testing is not one thing. It has layers, and each layer catches a different kind of mistake. For a small site or web app, these matter most:',
            ),
          },
          {
            type: 'terms',
            items: [
              {
                term: 'Manual check',
                def: t(
                  'خودتان سایت را روی گوشی واقعی و چند مرورگر (Chrome، Safari، Firefox) باز می‌کنید و مسیرهای اصلی را مثل یک کاربر طی می‌کنید.',
                  'You open the site on a real phone and a few browsers (Chrome, Safari, Firefox) and walk the main paths like a real visitor.',
                ),
              },
              {
                term: 'Unit test',
                def: t(
                  'تست یک تکه کوچک از کد به‌تنهایی؛ مثلاً تابعی که ایمیل را اعتبارسنجی می‌کند. سریع است و دقیق می‌گوید کجا خراب است.',
                  'A test of one small piece of code on its own, for example a function that validates an email. Fast, and it tells you exactly what broke.',
                ),
              },
              {
                term: 'End-to-end (E2E)',
                def: t(
                  'یک مرورگر خودکار (مثلاً با Playwright) مثل آدم واقعی صفحه را باز می‌کند، کلیک می‌کند، فرم پر می‌کند و نتیجه را بررسی می‌کند.',
                  'An automated browser (for example with Playwright) opens the page like a real person, clicks, fills in forms and checks the result.',
                ),
              },
              {
                term: 'Type check / Lint',
                def: t(
                  'ابزارهایی مثل TypeScript و ESLint که بدون اجرای برنامه، اشتباه‌های رایج و ناسازگاری‌ها را پیدا می‌کنند.',
                  'Tools like TypeScript and ESLint that catch common mistakes and mismatches without running the program.',
                ),
              },
              {
                term: 'Accessibility',
                def: t(
                  'بررسی اینکه همه بتوانند از سایت استفاده کنند: کار با کیبورد، Contrast کافی رنگ‌ها، متن جایگزین برای تصاویر.',
                  'Checking that everyone can use the site: keyboard navigation, enough color contrast, alt text for images.',
                ),
              },
              {
                term: 'Lighthouse',
                def: t(
                  'ابزار رایگان گوگل در Chrome DevTools که سرعت، دسترس‌پذیری، SEO و بهترین روش‌ها را امتیاز می‌دهد و پیشنهاد اصلاح می‌دهد.',
                  'A free Google tool in Chrome DevTools that scores performance, accessibility, SEO and best practices, and suggests fixes.',
                ),
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: t('یک قانون طلایی', 'One golden rule'),
            text: t(
              'از Agent بخواهید **ثابت کند** تست واقعاً چیزی را می‌سنجد: اول تست را بدون اصلاح اجرا کند و ببینید **قرمز** می‌شود، بعد اصلاح را اعمال کند و ببینید **سبز** می‌شود. تستی که هیچ‌وقت شکست نخورده، شاید اصلاً چیزی را چک نمی‌کند.',
              'Ask the agent to **prove** a test really measures something: run it without the fix and watch it go **red**, then apply the fix and watch it go **green**. A test you have never seen fail may not be checking anything at all.',
            ),
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# Typical commands your agent will run (names depend on the project)
npm run typecheck      # TypeScript: catch type mistakes
npm run lint           # ESLint: catch common bugs and style issues
npm test               # unit tests
npx playwright test    # end-to-end tests in real browsers`,
            caption: t(
              'دستورهای رایجی که Agent اجرا می‌کند. اسم‌ها بسته به پروژه فرق دارند؛ مهم این است که خروجی‌شان را ببینید.',
              'Common commands your agent runs. Names vary by project; what matters is that you see their output.',
            ),
          },
          {
            type: 'prompt',
            title: t('از Agent تست بخواهید', 'Ask your agent for tests'),
            text: t(
              'برای فرم تماس سایت تست بنویس و اجرا کن:\n۱. یک Unit test برای تابع اعتبارسنجی (ایمیل خالی، ایمیل نامعتبر، پیام خیلی بلند).\n۲. یک تست End-to-end با Playwright که فرم را روی صفحه موبایل (عرض ۳۹۰ پیکسل) پر می‌کند و پیام موفقیت را چک می‌کند.\nقبل از هر اصلاح، نشان بده که تست بدون اصلاح شکست می‌خورد. در پایان خروجی کامل دستورها را نشان بده، نه فقط خلاصه.',
              'Write and run tests for the site contact form:\n1. A unit test for the validation function (empty email, invalid email, very long message).\n2. A Playwright end-to-end test that fills the form at mobile width (390px) and checks the success message.\nBefore each fix, show that the test fails without it. At the end, show the full command output, not just a summary.',
            ),
          },
        ],
      },
      {
        id: 'debug-with-agent',
        title: t('Debugging با Agent: کارآگاه باشید، نه شاکی', 'Debugging with an agent: be a detective, not a complainer'),
        blocks: [
          {
            type: 'p',
            text: t(
              'جمله «سایت خراب است، درستش کن» برای Agent تقریباً هیچ اطلاعاتی ندارد. Agent مجبور می‌شود حدس بزند، و حدس معمولاً یعنی تغییرهای بزرگ و بی‌ربط. هرچه **شواهد** بیشتری بدهید، Agent سریع‌تر و دقیق‌تر به ریشه مشکل می‌رسد.',
              'Saying "the site is broken, fix it" gives the agent almost nothing. It has to guess, and guessing usually means big, unrelated changes. The more **evidence** you give, the faster and more precisely the agent finds the root cause.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('مشکل را دوباره بسازید (Reproduce)', 'Reproduce the problem'),
                text: t(
                  'دقیقاً چه کردید که مشکل پیش آمد؟ اگر بتوانید آن را دوباره و با همان قدم‌ها تکرار کنید، نصف راه را رفته‌اید.',
                  'What exactly did you do when it happened? If you can repeat it with the same steps, you are halfway there.',
                ),
              },
              {
                title: t('انتظار در برابر واقعیت', 'Expected versus actual'),
                text: t(
                  'بنویسید چه انتظاری داشتید و چه دیدید. «انتظار: پیام موفقیت. واقعیت: دکمه چرخید و هیچ اتفاقی نیفتاد.»',
                  'Write what you expected and what you saw. "Expected: a success message. Actual: the button spun and nothing happened."',
                ),
              },
              {
                title: t('شواهد جمع کنید', 'Collect evidence'),
                text: t(
                  'Screenshot، خطاهای قرمز Console مرورگر (F12)، درخواست ناموفق در تب Network، و لاگ‌های Worker با `npx wrangler tail` یا بخش Logs داشبورد Cloudflare.',
                  'A screenshot, red errors from the browser console (F12), the failed request in the Network tab, and Worker logs from `npx wrangler tail` or the Logs view in the Cloudflare dashboard.',
                ),
              },
              {
                title: t('هر پیام، یک باگ', 'One bug per message'),
                text: t(
                  'سه مشکل را در یک پیام قاطی نکنید. Agent روی یکی تمرکز کند، حلش کند، تأیید کنید، بعد سراغ بعدی بروید.',
                  'Do not mix three problems in one message. Let the agent focus on one, fix it, you confirm, then move to the next.',
                ),
              },
              {
                title: t('اول علت، بعد اصلاح', 'Root cause before fix'),
                text: t(
                  'از Agent بخواهید قبل از تغییر کد، توضیح دهد **چرا** این اتفاق افتاده. اگر توضیح منطقی نبود، اصلاح هم احتمالاً فقط علامت را پنهان می‌کند.',
                  'Ask the agent to explain **why** it happened before changing code. If the explanation does not make sense, the fix will probably just hide the symptom.',
                ),
              },
            ],
          },
          {
            type: 'widget',
            id: 'bug-report',
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# Stream live logs from your deployed Worker while you reproduce the bug
npx wrangler tail

# Only show errors
npx wrangler tail --status error`,
            caption: t(
              'وقتی مشکل را روی سایت منتشرشده تکرار می‌کنید، این دستور لاگ‌ها و خطاهای Worker را زنده نشان می‌دهد.',
              'While you reproduce the bug on the live site, this streams the Worker logs and errors in real time.',
            ),
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('مراقب «اصلاح‌های همه‌جانبه» باشید', 'Watch out for "fix everything" changes'),
            text: t(
              'اگر برای یک باگ کوچک، Agent بیست فایل را تغییر داد، دست نگه دارید. از او بخواهید کوچک‌ترین تغییر ممکن را انجام دهد و فهرست فایل‌های تغییرکرده را نشان دهد. تغییرهای کوچک را راحت‌تر می‌شود بررسی و در صورت لزوم برگرداند.',
              'If the agent changes twenty files for a small bug, stop. Ask for the smallest possible change and the list of changed files. Small changes are easier to review and to undo if needed.',
            ),
          },
          {
            type: 'quiz',
            q: t(
              'کدام پیام برای Agent بهترین شروع Debugging است؟',
              'Which message is the best way to start debugging with an agent?',
            ),
            options: [
              t('سایت کار نمی‌کند، لطفاً سریع درستش کن.', 'The site is not working, please fix it fast.'),
              t(
                'روی موبایل، بعد از زدن «ارسال» در فرم تماس، دکمه می‌چرخد و پیامی نمی‌آید. Console این خطا را نشان می‌دهد: ... اول علت را توضیح بده، بعد کوچک‌ترین اصلاح را پیشنهاد کن.',
                'On mobile, after tapping "Send" on the contact form, the button spins and no message appears. The console shows this error: ... Explain the cause first, then propose the smallest fix.',
              ),
              t('همه باگ‌های سایت را پیدا کن و درست کن.', 'Find and fix every bug on the site.'),
              t('کد را از اول بازنویسی کن تا باگ نداشته باشد.', 'Rewrite the code from scratch so it has no bugs.'),
            ],
            answer: 1,
            explain: t(
              'گزینه دوم قدم‌های تکرار، انتظار در برابر واقعیت، شواهد و درخواست «اول علت» را دارد. بقیه یا مبهم‌اند یا خطر تغییرهای بزرگ و بی‌ربط را بالا می‌برند.',
              'The second option has reproduction steps, expected versus actual, evidence and a "cause first" request. The others are vague or invite large, unrelated changes.',
            ),
          },
        ],
      },
      {
        id: 'testing-links',
        title: t('منابع رسمی', 'Official resources'),
        blocks: [
          {
            type: 'links',
            items: [
              { label: 'Playwright: Getting started', url: 'https://playwright.dev/docs/intro' },
              { label: 'Chrome DevTools: Lighthouse', url: 'https://developer.chrome.com/docs/lighthouse/overview' },
              { label: 'Cloudflare Workers: Real-time logs (wrangler tail)', url: 'https://developers.cloudflare.com/workers/observability/logs/real-time-logs/' },
              { label: 'Cloudflare Workers: Workers Logs', url: 'https://developers.cloudflare.com/workers/observability/logs/workers-logs/' },
              { label: 'MDN: Accessibility', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'در حلقه Vibe Coding، هر قدم با «پیش‌نمایش و بازخورد» تمام می‌شد؛ تست همان بازخورد است، اما با شواهد. تست‌هایی که اینجا می‌سازید، در فصل بعد به بخشی از CI/CD تبدیل می‌شوند تا با هر Push خودکار اجرا شوند و جلوی رسیدن کد خراب به سایت اصلی را بگیرند.',
      'In the vibe coding loop, every step ended with "preview and feedback"; testing is that feedback, backed by evidence. The tests you build here become part of CI/CD in the next chapter, running automatically on every push so broken code never reaches the live site.',
    ),
    takeaways: [
      t('«انجام شد» از طرف Agent یعنی ادعا؛ خروجی تست یعنی شاهد.', 'An agent saying "done" is a claim; test output is evidence.'),
      t('ترکیبی از بررسی دستی روی گوشی واقعی، Unit test، E2E و Lighthouse بیشتر اشتباه‌ها را می‌گیرد.', 'A mix of manual checks on a real phone, unit tests, E2E and Lighthouse catches most mistakes.'),
      t('تستی که هیچ‌وقت ندیده‌اید قرمز شود، قابل اعتماد نیست.', 'A test you have never seen fail is not trustworthy.'),
      t('گزارش باگ خوب: قدم‌ها، انتظار و واقعیت، شواهد، یک باگ در هر پیام، اول علت.', 'A good bug report: steps, expected and actual, evidence, one bug per message, cause first.'),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 2. CI/CD & deploy                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: 'cicd-deploy',
    act: 4,
    icon: 'rocket',
    title: t('CI/CD و Deploy: از Push تا سایت زنده', 'CI/CD and deployment: from push to live'),
    tagline: t(
      'کاری کنید که هر بار کد را Push می‌کنید، سایت خودش Build، تست و منتشر شود',
      'Make every push build, test and publish your site on its own',
    ),
    minutes: 18,
    mascotLine: t(
      'دیگر لازم نیست هر بار دستی سایت را بالا بیاوریم. یک خط تولید کوچک می‌سازیم که خودش همه کار را می‌کند!',
      'No more uploading the site by hand. We are going to build a tiny assembly line that does it all for us!',
    ),
    sections: [
      {
        id: 'what-is-cicd',
        title: t('CI/CD به زبان ساده', 'CI/CD in plain words'),
        blocks: [
          {
            type: 'p',
            text: t(
              'تصور کنید یک نانوایی دارید. هر بار که دستور پخت (کد) عوض می‌شود، یک نفر نان را می‌پزد، مزه می‌کند و اگر خوب بود، در ویترین می‌گذارد. **CI/CD** همین خط تولید است، فقط خودکار.',
              'Imagine a bakery. Every time the recipe (the code) changes, someone bakes the bread, tastes it and, if it is good, puts it in the shop window. **CI/CD** is that production line, only automatic.',
            ),
          },
          {
            type: 'terms',
            items: [
              {
                term: 'CI (Continuous Integration)',
                def: t(
                  'یکپارچه‌سازی مداوم: با هر Push، کد به‌صورت خودکار Build و تست می‌شود تا خرابی‌ها همان لحظه پیدا شوند.',
                  'Every push is built and tested automatically, so breakage is caught right away.',
                ),
              },
              {
                term: 'CD (Continuous Delivery / Deployment)',
                def: t(
                  'تحویل یا استقرار مداوم: کدی که تست‌ها را پاس کرده، آماده انتشار است (Delivery) یا خودکار منتشر می‌شود (Deployment).',
                  'Code that passes the tests is ready to release (delivery) or is released automatically (deployment).',
                ),
              },
              {
                term: 'Build',
                def: t(
                  'تبدیل کد منبع به فایل‌های نهایی که مرورگر می‌فهمد؛ مثلاً پوشه `dist` در پروژه‌های Vite.',
                  'Turning source code into the final files a browser understands, for example the `dist` folder in Vite projects.',
                ),
              },
              {
                term: 'Production / Preview',
                def: t(
                  'Production نسخه‌ای است که کاربران واقعی می‌بینند. Preview یک نسخه آزمایشی جداست با آدرس خودش، برای دیدن تغییرها قبل از انتشار.',
                  'Production is what real visitors see. A preview is a separate trial copy with its own URL, for checking changes before release.',
                ),
              },
              {
                term: 'Rollback',
                def: t(
                  'برگرداندن سایت به نسخه سالم قبلی، وقتی نسخه جدید مشکل دارد.',
                  'Returning the site to the previous healthy version when a new one has problems.',
                ),
              },
            ],
          },
          {
            type: 'callout',
            tone: 'why',
            title: t('چرا ارزشش را دارد؟', 'Why is it worth it?'),
            text: t(
              'بدون CI/CD، انتشار یعنی چند قدم دستی که هر بار ممکن است یکی‌اش فراموش شود. با CI/CD، مسیر همیشه یکسان است: Push، Build، تست، انتشار. هم خطای انسانی کم می‌شود، هم Agent می‌تواند با خیال راحت تغییرهای کوچک و پشت‌سرهم بدهد.',
              'Without CI/CD, releasing means several manual steps, any of which can be forgotten. With CI/CD the path is always the same: push, build, test, release. Human error drops, and your agent can ship small, frequent changes safely.',
            ),
          },
          {
            type: 'widget',
            id: 'pipeline',
          },
        ],
      },
      {
        id: 'workers-builds',
        title: t('راه اول: Workers Builds (ساده‌ترین مسیر)', 'Route one: Workers Builds (the simplest path)'),
        blocks: [
          {
            type: 'p',
            text: t(
              'Cloudflare یک CI/CD داخلی به اسم **Workers Builds** دارد. Repository گیت‌هاب را یک بار به Worker وصل می‌کنید و از آن به بعد، هر Push به Branch اصلی (Production branch، معمولاً `main`) به‌طور خودکار Build و Deploy می‌شود.',
              'Cloudflare has built-in CI/CD called **Workers Builds**. You connect your GitHub repository to a Worker once, and from then on every push to the production branch (usually `main`) is built and deployed automatically.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('Worker را به Repository وصل کنید', 'Connect the Worker to the repository'),
                text: t(
                  'در داشبورد Cloudflare به بخش Workers & Pages بروید، پروژه را از Repository گیت‌هاب Import کنید یا برای یک Worker موجود، در تنظیمات بخش Builds اتصال را برقرار کنید. Cloudflare برای دسترسی، یک GitHub App نصب می‌کند.',
                  'In the Cloudflare dashboard, go to Workers & Pages and import the project from your GitHub repository, or connect an existing Worker from its Builds settings. Cloudflare installs a GitHub App for access.',
                ),
              },
              {
                title: t('دستور Build و Deploy را چک کنید', 'Check the build and deploy commands'),
                text: t(
                  'برای پروژه Vite معمولاً Build command برابر `npm run build` و Deploy command برابر `npx wrangler deploy` است. Agent می‌تواند این‌ها را برایتان تنظیم و توضیح دهد.',
                  'For a Vite project the build command is usually `npm run build` and the deploy command `npx wrangler deploy`. Your agent can set these up and explain them.',
                ),
              },
              {
                title: t('Preview برای Branchها را روشن کنید', 'Turn on previews for branches'),
                text: t(
                  'با فعال‌کردن Preview builds، هر Push به Branchی غیر از Production یک آدرس پیش‌نمایش جدا می‌گیرد و برای Pull Requestها در گیت‌هاب کامنت وضعیت و لینک گذاشته می‌شود.',
                  'With preview builds enabled, every push to a non-production branch gets its own preview URL, and pull requests on GitHub receive a comment with the build status and link.',
                ),
              },
              {
                title: t('Merge = انتشار', 'Merge means release'),
                text: t(
                  'وقتی پیش‌نمایش را دیدید و راضی بودید، Pull Request را در `main` ادغام (Merge) کنید. همین، نسخه Production را به‌روز می‌کند.',
                  'Once you have checked the preview and are happy, merge the pull request into `main`. That updates production.',
                ),
              },
            ],
          },
          {
            type: 'code',
            lang: 'jsonc',
            code: `{
  // wrangler.jsonc for a static site or single-page app (React, Vue, Vite...)
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-site",
  "compatibility_date": "2026-11-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  },
  "observability": { "enabled": true }
}`,
            caption: t(
              'پیکربندی کوچک Worker برای یک سایت استاتیک یا SPA: فایل‌های پوشه `dist` منتشر می‌شوند و مسیرهای ناشناخته به صفحه اصلی برمی‌گردند.',
              'A small Worker config for a static site or SPA: files in `dist` are served, and unknown paths fall back to the main page.',
            ),
          },
          {
            type: 'callout',
            tone: 'tip',
            title: t('اول Preview، بعد Production', 'Preview first, then production'),
            text: t(
              'عادت کنید Agent روی یک Branch جدید کار کند و Pull Request باز کند. لینک Preview را روی گوشی باز کنید، تست‌ها را ببینید و فقط بعد Merge کنید. این ساده‌ترین بیمه برای سایت شماست.',
              'Get into the habit of having the agent work on a new branch and open a pull request. Open the preview link on your phone, check the tests, and only then merge. It is the simplest insurance your site can have.',
            ),
          },
        ],
      },
      {
        id: 'github-actions',
        title: t('راه دوم: GitHub Actions با Wrangler', 'Route two: GitHub Actions with Wrangler'),
        blocks: [
          {
            type: 'p',
            text: t(
              'اگر می‌خواهید کنترل بیشتری داشته باشید (مثلاً قبل از Deploy حتماً تست‌ها اجرا شوند یا چند مرحله سفارشی داشته باشید)، می‌توانید از **GitHub Actions** استفاده کنید. Cloudflare یک Action رسمی به اسم `cloudflare/wrangler-action` دارد.',
              'If you want more control (for example, tests must pass before deploy, or you need custom stages), you can use **GitHub Actions**. Cloudflare provides an official action called `cloudflare/wrangler-action`.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('یک API Token محدود بسازید', 'Create a scoped API token'),
                text: t(
                  'در داشبورد Cloudflare یک API Token با الگوی Edit Cloudflare Workers بسازید و آن را فقط به همان Account محدود کنید.',
                  'In the Cloudflare dashboard, create an API token from the Edit Cloudflare Workers template and limit it to just that account.',
                ),
              },
              {
                title: t('Token را در Secrets گیت‌هاب بگذارید', 'Store it as a GitHub secret'),
                text: t(
                  'در Repository به Settings بروید و در بخش Secrets and variables برای Actions، دو Secret بسازید: `CLOUDFLARE_API_TOKEN` و `CLOUDFLARE_ACCOUNT_ID`. هیچ‌وقت Token را داخل کد نگذارید.',
                  'In the repository Settings, under Secrets and variables for Actions, create two secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Never put the token in your code.',
                ),
              },
              {
                title: t('فایل Workflow را اضافه کنید', 'Add the workflow file'),
                text: t(
                  'یک فایل در مسیر `.github/workflows/deploy.yml` بسازید (یا از Agent بخواهید). نمونه پایین روی هر Push به `main`، نصب، تست، Build و Deploy را انجام می‌دهد.',
                  'Create a file at `.github/workflows/deploy.yml` (or ask your agent to). The example below installs, tests, builds and deploys on every push to `main`.',
                ),
              },
            ],
          },
          {
            type: 'code',
            lang: 'yaml',
            code: `name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm
      - run: npm ci
      - run: npm test          # stop here if a test fails
      - run: npm run build
      - name: Deploy to Cloudflare Workers
        uses: cloudflare/wrangler-action@v4
        with:
          apiToken: \${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: \${{ secrets.CLOUDFLARE_ACCOUNT_ID }}`,
            caption: t(
              'اگر هر مرحله شکست بخورد، مراحل بعدی اجرا نمی‌شوند؛ یعنی کد خراب هیچ‌وقت به سایت اصلی نمی‌رسد.',
              'If any step fails, the later steps do not run, so broken code never reaches the live site.',
            ),
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('فقط یکی را انتخاب کنید', 'Pick one, not both'),
            text: t(
              'اگر هم Workers Builds را وصل کنید و هم GitHub Actions را، هر Push دو بار Deploy می‌شود و ممکن است گیج‌کننده شود. برای شروع، Workers Builds کافی است؛ وقتی نیاز به مراحل سفارشی داشتید سراغ Actions بروید.',
              'If you connect both Workers Builds and GitHub Actions, every push deploys twice, which gets confusing. Workers Builds is enough to start; move to Actions when you need custom stages.',
            ),
          },
          {
            type: 'prompt',
            title: t('از Agent بخواهید خط تولید را بسازد', 'Ask your agent to build the pipeline'),
            text: t(
              'برای این پروژه CI/CD راه بینداز:\n- با GitHub Actions، روی هر Pull Request تست‌ها و Build اجرا شوند.\n- روی هر Push به main، اگر تست‌ها پاس شدند، با cloudflare/wrangler-action روی Cloudflare Workers منتشر شود.\n- از Secretهای CLOUDFLARE_API_TOKEN و CLOUDFLARE_ACCOUNT_ID استفاده کن و هیچ Tokenی داخل کد نگذار.\n- به من بگو دقیقاً چه Secretهایی را کجای گیت‌هاب باید بسازم و Token چه دسترسی‌هایی لازم دارد (کمترین دسترسی ممکن).',
              'Set up CI/CD for this project:\n- With GitHub Actions, run tests and the build on every pull request.\n- On every push to main, if tests pass, deploy to Cloudflare Workers with cloudflare/wrangler-action.\n- Use the CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID secrets and never put a token in the code.\n- Tell me exactly which secrets to create where on GitHub, and which permissions the token needs (least privilege).',
            ),
          },
        ],
      },
      {
        id: 'rollback',
        title: t('وقتی نسخه جدید خراب بود: Rollback', 'When a release goes wrong: rollback'),
        blocks: [
          {
            type: 'p',
            text: t(
              'هر Deploy روی Cloudflare Workers یک **Version** جدید می‌سازد و Cloudflare تاریخچه نسخه‌ها را نگه می‌دارد. اگر نسخه جدید مشکل داشت، لازم نیست با عجله کد را درست کنید؛ اول سایت را به نسخه سالم قبلی برگردانید، بعد با آرامش Debug کنید.',
              'Every deploy to Cloudflare Workers creates a new **version**, and Cloudflare keeps the version history. If a new version misbehaves, you do not have to rush a code fix; first return the site to the previous healthy version, then debug calmly.',
            ),
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# See recent deployments
npx wrangler deployments list

# Roll back to the version before the current one
npx wrangler rollback

# Or roll back to a specific version ID
npx wrangler rollback <VERSION_ID>`,
            caption: t(
              'همین کار را از داشبورد هم می‌توانید انجام دهید: صفحه Worker، تب Deployments.',
              'You can do the same from the dashboard: your Worker page, Deployments tab.',
            ),
          },
          {
            type: 'callout',
            tone: 'fix',
            title: t('Rollback داده‌ها را برنمی‌گرداند', 'Rollback does not restore data'),
            text: t(
              'Rollback فقط **کد** را برمی‌گرداند. منابع متصل مثل Database در D1 یا فایل‌های R2 تغییر نمی‌کنند. اگر نسخه خراب داده‌ای را عوض کرده، باید جداگانه بازیابی‌اش کنید (در فصل امنیت و نگهداری، با Time Travel در D1 آشنا می‌شوید).',
              'A rollback only restores **code**. Connected resources such as a D1 database or R2 files are not changed. If the bad version changed data, you need to restore it separately (you will meet D1 Time Travel in the security and maintenance chapter).',
            ),
          },
          {
            type: 'quiz',
            q: t(
              'در Workers Builds، یک Push به Branchی به اسم `new-header` (که Production branch نیست) معمولاً چه نتیجه‌ای دارد؟',
              'With Workers Builds, what does a push to a branch called `new-header` (not the production branch) usually do?',
            ),
            options: [
              t('سایت اصلی فوراً به‌روز می‌شود.', 'The live site updates immediately.'),
              t('هیچ اتفاقی نمی‌افتد.', 'Nothing happens.'),
              t(
                'اگر Preview builds روشن باشد، یک نسخه پیش‌نمایش با آدرس جدا ساخته می‌شود و سایت اصلی دست نمی‌خورد.',
                'If preview builds are on, a preview with its own URL is created and the live site is untouched.',
              ),
              t('همه Branchها حذف می‌شوند.', 'All branches are deleted.'),
            ],
            answer: 2,
            explain: t(
              'Push به Production branch سایت اصلی را به‌روز می‌کند. Push به بقیه Branchها، وقتی Preview builds فعال است، فقط یک پیش‌نمایش جدا می‌سازد تا قبل از Merge بتوانید بررسی کنید.',
              'A push to the production branch updates the live site. Pushes to other branches, with preview builds on, only create a separate preview so you can check before merging.',
            ),
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare Workers Builds', url: 'https://developers.cloudflare.com/workers/ci-cd/builds/' },
              { label: 'Workers Builds: Build branches and previews', url: 'https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/' },
              { label: 'Deploy Workers with GitHub Actions', url: 'https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/' },
              { label: 'Workers: Rollbacks', url: 'https://developers.cloudflare.com/workers/versions-and-deployments/rollbacks/' },
              { label: 'Workers: Static assets', url: 'https://developers.cloudflare.com/workers/static-assets/' },
              { label: 'GitHub Actions: Using secrets', url: 'https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'این فصل GitHub (فصل Version Control)، Cloudflare Workers و تست‌های فصل قبل را به یک خط تولید خودکار وصل می‌کند. حالا سایت شما روی یک آدرس `workers.dev` زنده است؛ در فصل بعد آن را روی دامنه اختصاصی خودتان می‌برید.',
      'This chapter wires GitHub (from the version control chapter), Cloudflare Workers and the tests from the previous chapter into one automatic pipeline. Your site now lives on a `workers.dev` address; next you move it onto your own domain.',
    ),
    takeaways: [
      t('CI یعنی هر Push خودکار Build و تست شود؛ CD یعنی کد سالم خودکار منتشر شود.', 'CI means every push is built and tested automatically; CD means healthy code is released automatically.'),
      t('Workers Builds ساده‌ترین شروع است: Push به main یعنی انتشار، Branchهای دیگر یعنی Preview.', 'Workers Builds is the easiest start: a push to main releases, other branches get previews.'),
      t('برای کنترل بیشتر، GitHub Actions با cloudflare/wrangler-action و Tokenی که در Secrets نگه داشته شده.', 'For more control, GitHub Actions with cloudflare/wrangler-action and a token kept in Secrets.'),
      t('اگر نسخه جدید خراب بود، اول Rollback، بعد Debug. Rollback داده را برنمی‌گرداند.', 'If a release breaks, roll back first, then debug. A rollback does not restore data.'),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 3. Custom domain                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: 'custom-domain',
    act: 4,
    icon: 'signpost',
    title: t('دامنه اختصاصی و HTTPS', 'Your own domain and HTTPS'),
    tagline: t(
      'سایت را از آدرس آزمایشی به دامنه خودتان ببرید، با قفل سبز HTTPS و بدون خراب‌شدن ایمیل‌ها',
      'Move the site from its test address to your own domain, with HTTPS and without breaking email',
    ),
    minutes: 15,
    mascotLine: t(
      'وقتشه سایتمون یک اسم واقعی داشته باشه! فقط با دقت تابلوها را عوض می‌کنیم تا هیچ نامه‌ای گم نشود.',
      'Time to give our site a real name! We will just change the signposts carefully so no letters get lost.',
    ),
    sections: [
      {
        id: 'the-big-picture',
        title: t('نقشه کلی: سه بازیگر', 'The big picture: three players'),
        blocks: [
          {
            type: 'p',
            text: t(
              'در فصل دامنه و DNS دیدیم که Registrar جایی است که دامنه را خریده‌اید و Nameserver کسی است که به دنیا می‌گوید هر زیردامنه به کجا اشاره می‌کند. حالا می‌خواهیم مدیریت DNS دامنه را به Cloudflare بسپاریم و بعد دامنه را به Worker وصل کنیم.',
              'In the domains and DNS chapter we saw that the registrar is where you bought the domain, and the nameserver tells the world where each hostname points. Now we hand DNS management to Cloudflare, then attach the domain to the Worker.',
            ),
          },
          {
            type: 'terms',
            items: [
              {
                term: 'Zone',
                def: t(
                  'در Cloudflare، هر دامنه‌ای که اضافه می‌کنید (مثل `example.com`) یک Zone است؛ یعنی Cloudflare DNS و ترافیک آن را مدیریت می‌کند.',
                  'In Cloudflare, every domain you add (like `example.com`) is a zone, meaning Cloudflare manages its DNS and traffic.',
                ),
              },
              {
                term: 'Nameserver',
                def: t(
                  'سرورهایی که جواب رسمی DNS دامنه شما را می‌دهند. Cloudflare دو Nameserver مخصوص حساب شما معرفی می‌کند.',
                  'Servers that give the official DNS answers for your domain. Cloudflare assigns two nameservers to your account.',
                ),
              },
              {
                term: 'Custom Domain (Workers)',
                def: t(
                  'وصل‌کردن یک دامنه یا زیردامنه به Worker. Cloudflare رکورد DNS و گواهی HTTPS را خودش می‌سازد.',
                  'Attaching a domain or subdomain to a Worker. Cloudflare creates the DNS record and the HTTPS certificate for you.',
                ),
              },
              {
                term: 'Apex / www',
                def: t(
                  'Apex خود دامنه است (`example.com`) و `www.example.com` یک زیردامنه. بهتر است یکی اصلی باشد و دیگری به آن Redirect شود.',
                  'The apex is the bare domain (`example.com`); `www.example.com` is a subdomain. Make one the main address and redirect the other to it.',
                ),
              },
              {
                term: 'SSL/TLS (HTTPS)',
                def: t(
                  'رمزنگاری ارتباط بین مرورگر و سایت؛ همان قفل کنار آدرس. بدون آن، مرورگرها سایت را «ناامن» نشان می‌دهند.',
                  'Encryption between the browser and the site: the padlock next to the address. Without it, browsers mark the site "Not secure".',
                ),
              },
            ],
          },
          {
            type: 'widget',
            id: 'nameserver-switch',
          },
        ],
      },
      {
        id: 'move-dns',
        title: t('قدم‌به‌قدم: انتقال DNS به Cloudflare', 'Step by step: moving DNS to Cloudflare'),
        blocks: [
          {
            type: 'callout',
            tone: 'warn',
            title: t('قبل از هر کاری: از رکوردهای فعلی نسخه بگیرید', 'Before anything: copy your current records'),
            text: t(
              'اگر دامنه‌تان الان ایمیل دارد (مثلاً با Google Workspace یا سرویس ایمیل هاستینگ)، رکوردهای **MX**، **SPF**، **DKIM** و **DMARC** حیاتی‌اند. اگر بعد از جابه‌جایی جا بیفتند، ایمیل‌ها نمی‌رسند یا اسپم می‌شوند. از پنل فعلی DNS یک Screenshot یا خروجی کامل بگیرید.',
              'If your domain already has email (for example Google Workspace or your host’s mail), its **MX**, **SPF**, **DKIM** and **DMARC** records are vital. If they go missing after the move, mail stops arriving or lands in spam. Take a screenshot or full export of your current DNS panel.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('دامنه را به Cloudflare اضافه کنید', 'Add the domain to Cloudflare'),
                text: t(
                  'در داشبورد Cloudflare، دامنه را اضافه کنید و پلن رایگان را انتخاب کنید. Cloudflare تلاش می‌کند رکوردهای فعلی را خودکار پیدا کند.',
                  'In the Cloudflare dashboard, add your domain and choose the free plan. Cloudflare tries to find your existing records automatically.',
                ),
              },
              {
                title: t('رکوردها را با نسخه خودتان مقایسه کنید', 'Compare the records with your copy'),
                text: t(
                  'اسکن خودکار ممکن است همه رکوردها را پیدا نکند. هر رکوردی که در نسخه شما هست ولی اینجا نیست (به‌خصوص رکوردهای ایمیل) را دستی اضافه کنید.',
                  'The automatic scan may miss some records. Add any record from your copy that is missing here, especially the email ones.',
                ),
              },
              {
                title: t('Nameserverها را در Registrar عوض کنید', 'Change the nameservers at your registrar'),
                text: t(
                  'Cloudflare دو Nameserver به شما می‌دهد. در پنل Registrar (جایی که دامنه را خریده‌اید) Nameserverهای قبلی را با این دو جایگزین کنید. اگر DNSSEC در Registrar روشن است، طبق راهنمای Cloudflare اول آن را خاموش کنید.',
                  'Cloudflare gives you two nameservers. In your registrar’s panel (where you bought the domain), replace the old nameservers with these two. If DNSSEC is on at the registrar, turn it off first as Cloudflare’s guide explains.',
                ),
              },
              {
                title: t('صبر کنید تا Zone فعال شود', 'Wait for the zone to become active'),
                text: t(
                  'تغییر Nameserver باید در شبکه جهانی DNS پخش شود (Propagation). معمولاً زود انجام می‌شود ولی ممکن است بیشتر طول بکشد. Cloudflare وقتی فعال شد خبرتان می‌کند.',
                  'The nameserver change has to spread through the global DNS (propagation). It is often quick but can take longer. Cloudflare tells you when the zone is active.',
                ),
              },
            ],
          },
          {
            type: 'callout',
            tone: 'fix',
            title: t('«Propagation» یعنی خرابی نیست', 'Propagation is not breakage'),
            text: t(
              'در زمان Propagation ممکن است شما سایت جدید را ببینید و دوستتان هنوز قدیمی را. این طبیعی است: Resolverهای مختلف جواب‌های قبلی را برای مدتی (TTL) نگه می‌دارند. با عجله تنظیمات را عوض نکنید؛ صبر کنید.',
              'During propagation you may see the new site while a friend still sees the old one. That is normal: different resolvers keep earlier answers for a while (the TTL). Do not rush to change settings; wait.',
            ),
          },
        ],
      },
      {
        id: 'attach-worker',
        title: t('وصل‌کردن دامنه به Worker', 'Attaching the domain to your Worker'),
        blocks: [
          {
            type: 'p',
            text: t(
              'وقتی Zone فعال شد، دامنه را به Worker وصل می‌کنیم. برای سایتی که کاملاً روی Worker است، بهترین گزینه **Custom Domain** است: Worker خودش «مبدأ» (Origin) سایت است، Cloudflare رکورد DNS را می‌سازد و گواهی HTTPS را خودکار صادر می‌کند. لازم نیست سرور جداگانه یا تنظیم دستی گواهی داشته باشید.',
              'Once the zone is active, attach the domain to the Worker. For a site that runs entirely on a Worker, the best option is a **Custom Domain**: the Worker itself is the origin, and Cloudflare creates the DNS record and issues the HTTPS certificate automatically. No separate server, no manual certificates.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('از داشبورد', 'From the dashboard'),
                text: t(
                  'در Workers & Pages، Worker خود را باز کنید، به تنظیمات بخش Domains & Routes بروید و یک Custom Domain اضافه کنید، مثلاً `example.com`.',
                  'In Workers & Pages, open your Worker, go to its Domains & Routes settings and add a Custom Domain, for example `example.com`.',
                ),
              },
              {
                title: t('یا از فایل پیکربندی', 'Or from the config file'),
                text: t(
                  'می‌توانید دامنه را در `wrangler.jsonc` تعریف کنید تا با هر Deploy همان تنظیم بماند (نمونه پایین).',
                  'You can declare the domain in `wrangler.jsonc` so every deploy keeps the same setting (example below).',
                ),
              },
              {
                title: t('www را به دامنه اصلی Redirect کنید', 'Redirect www to the main address'),
                text: t(
                  'Custom Domain فقط دقیقاً همان نام را می‌گیرد. برای اینکه `www.example.com` هم کار کند، یک Redirect Rule در Cloudflare بسازید که آن را به `example.com` بفرستد (یا برعکس).',
                  'A Custom Domain only matches that exact hostname. To make `www.example.com` work too, create a Redirect Rule in Cloudflare that sends it to `example.com` (or the other way round).',
                ),
              },
              {
                title: t('تست کنید', 'Test it'),
                text: t(
                  'آدرس را با `https://` روی گوشی و کامپیوتر باز کنید، قفل HTTPS را ببینید و یک ایمیل تستی به دامنه بفرستید تا مطمئن شوید ایمیل هم سالم است.',
                  'Open the address with `https://` on phone and computer, check the padlock, and send a test email to your domain to confirm mail still works.',
                ),
              },
            ],
          },
          {
            type: 'code',
            lang: 'jsonc',
            code: `{
  "name": "my-site",
  "compatibility_date": "2026-11-01",
  "assets": { "directory": "./dist", "not_found_handling": "single-page-application" },
  "routes": [
    { "pattern": "example.com", "custom_domain": true }
  ]
}`,
            caption: t(
              'تعریف Custom Domain در فایل پیکربندی. `example.com` را با دامنه خودتان عوض کنید.',
              'Declaring a Custom Domain in the config file. Replace `example.com` with your domain.',
            ),
          },
          {
            type: 'callout',
            tone: 'tip',
            title: t('SSL/TLS mode را کی باید عوض کنید؟', 'When do you touch the SSL/TLS mode?'),
            text: t(
              'برای Custom Domain روی Worker، چیزی برای تنظیم نیست؛ Worker خودش مبدأ است و گواهی خودکار ساخته می‌شود. اما اگر بعداً بخشی از سایت را به یک سرور جداگانه (Origin) ببرید، حالت SSL/TLS را روی **Full (strict)** بگذارید تا ارتباط Cloudflare با سرور هم رمزنگاری و تأییدشده باشد. حالت Flexible را برای سایت‌های جدی انتخاب نکنید.',
              'For a Custom Domain on a Worker there is nothing to set; the Worker is the origin and the certificate is automatic. But if you later send part of the site to a separate server (an origin), set the SSL/TLS mode to **Full (strict)** so the link between Cloudflare and that server is encrypted and verified too. Avoid Flexible for serious sites.',
            ),
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('یک نکته درباره دسترسی', 'A note on reachability'),
            text: t(
              'همان‌طور که در فصل‌های قبل گفتیم، دسترسی به سرویس‌های Cloudflare در بعضی کشورها، از جمله ایران، ممکن است با محدودیت یا فیلترینگ روبه‌رو شود. اگر مخاطبان اصلی‌تان در چنین جایی هستند، قبل از انتشار نهایی، دسترسی سایت را از شبکه‌های مختلف همان منطقه بسنجید.',
              'As mentioned in earlier chapters, Cloudflare services can face restrictions or filtering in some countries, including Iran. If your main audience is in such a place, test reachability from several local networks before the final launch.',
            ),
          },
          {
            type: 'prompt',
            title: t('از Agent بخواهید دامنه را وصل کند', 'Ask your agent to attach the domain'),
            text: t(
              'دامنه example.com روی Cloudflare فعال شده است. لطفاً:\n۱. آن را به‌عنوان Custom Domain به Worker همین پروژه وصل کن (از طریق wrangler.jsonc).\n۲. یک Redirect Rule برای www.example.com به example.com پیشنهاد بده و بگو چه رکورد DNS لازم دارد.\n۳. قبل از هر تغییر DNS، فهرست رکوردهای فعلی، به‌خصوص MX و TXT ایمیل، را به من نشان بده و هیچ‌کدام را حذف نکن.\n۴. در پایان با curl نشان بده که https://example.com پاسخ 200 می‌دهد.',
              'The domain example.com is active on Cloudflare. Please:\n1. Attach it as a Custom Domain to this project’s Worker (via wrangler.jsonc).\n2. Propose a Redirect Rule from www.example.com to example.com and tell me which DNS record it needs.\n3. Before any DNS change, show me the current records, especially the email MX and TXT ones, and do not delete any of them.\n4. At the end, show with curl that https://example.com returns 200.',
            ),
          },
          {
            type: 'quiz',
            q: t(
              'قبل از عوض‌کردن Nameserverها، مهم‌ترین کار برای اینکه ایمیل‌های دامنه از کار نیفتند چیست؟',
              'Before changing nameservers, what is the most important thing to do so the domain’s email keeps working?',
            ),
            options: [
              t('پاک‌کردن همه رکوردهای قدیمی برای شروع تمیز', 'Delete all old records for a clean start'),
              t(
                'گرفتن نسخه از رکوردهای فعلی و اطمینان از اینکه MX، SPF، DKIM و DMARC در Cloudflare هم وجود دارند',
                'Copy the current records and make sure MX, SPF, DKIM and DMARC also exist in Cloudflare',
              ),
              t('خاموش‌کردن HTTPS', 'Turn off HTTPS'),
              t('ساختن Worker جدید', 'Create a new Worker'),
            ],
            answer: 1,
            explain: t(
              'بعد از تغییر Nameserver، فقط رکوردهایی که در Cloudflare هستند جواب داده می‌شوند. اگر رکوردهای ایمیل جا بیفتند، ایمیل‌ها نمی‌رسند.',
              'After the nameserver change, only records that exist in Cloudflare get answered. If the email records are missing, mail stops arriving.',
            ),
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare: Add a site', url: 'https://developers.cloudflare.com/fundamentals/manage-domains/add-site/' },
              { label: 'Cloudflare DNS: Full setup (change nameservers)', url: 'https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/' },
              { label: 'Workers: Custom Domains', url: 'https://developers.cloudflare.com/workers/configuration/routing/custom-domains/' },
              { label: 'Redirect www to root domain', url: 'https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/' },
              { label: 'SSL/TLS encryption modes', url: 'https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'اینجا همه مفاهیم پرده اول به هم می‌رسند: Registrar و Nameserver از فصل DNS، Worker از فصل Cloudflare، و خط تولید فصل قبل. از این به بعد، هر Push به main مستقیم روی دامنه واقعی شما دیده می‌شود. فصل بعد درباره امن و سالم نگه‌داشتن همین سایت زنده است.',
      'Here the ideas from Act I meet: the registrar and nameservers from the DNS chapter, the Worker from the Cloudflare chapter, and the pipeline from the previous chapter. From now on, every push to main shows up on your real domain. Next: keeping that live site safe and healthy.',
    ),
    takeaways: [
      t('قبل از جابه‌جایی DNS از همه رکوردها، به‌خصوص ایمیل، نسخه بگیرید.', 'Copy every DNS record, especially email ones, before moving DNS.'),
      t('دامنه را به Cloudflare اضافه کنید، Nameserverها را در Registrar عوض کنید و تا فعال‌شدن Zone صبر کنید.', 'Add the domain to Cloudflare, change nameservers at the registrar, and wait for the zone to activate.'),
      t('Custom Domain روی Worker، رکورد DNS و گواهی HTTPS را خودکار می‌سازد.', 'A Custom Domain on a Worker creates the DNS record and HTTPS certificate automatically.'),
      t('برای www یک Redirect Rule بسازید؛ اگر سرور جدا دارید از Full (strict) استفاده کنید.', 'Add a Redirect Rule for www; use Full (strict) if you have a separate origin server.'),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 4. Security & maintenance                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: 'security-maintenance',
    act: 4,
    icon: 'shield',
    title: t('امنیت و نگهداری: سایت زنده، سایت سالم', 'Security and upkeep: a live site, a healthy site'),
    tagline: t(
      'عادت‌های ساده‌ای که سایت را امن، به‌روز و قابل بازیابی نگه می‌دارند',
      'Simple habits that keep your site safe, up to date and recoverable',
    ),
    minutes: 17,
    mascotLine: t(
      'سایت را ساختیم، حالا باید مثل یک باغچه به آن رسیدگی کنیم. کمی مراقبت منظم، از یک نجات اضطراری خیلی ارزان‌تر است.',
      'We built the site; now we tend it like a garden. A little regular care is far cheaper than an emergency rescue.',
    ),
    sections: [
      {
        id: 'security-basics',
        title: t('امنیت پایه: قفل‌های اصلی خانه', 'Security basics: the main locks on the house'),
        blocks: [
          {
            type: 'p',
            text: t(
              'بیشتر نفوذها به سایت‌های کوچک از راه‌های پیچیده اتفاق نمی‌افتند؛ از رمز عبور لورفته، Tokenی که در گیت‌هاب جا مانده یا فرمی که هر ورودی را قبول می‌کند. خبر خوب: بستن همین درها کار سختی نیست.',
              'Most break-ins on small sites do not come through clever attacks; they come through a leaked password, a token left in GitHub, or a form that accepts anything. Good news: closing those doors is not hard.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('2FA روی همه حساب‌ها', '2FA on every account'),
                text: t(
                  'ورود دومرحله‌ای را روی GitHub، Cloudflare، Registrar دامنه، ایمیل و حساب ChatGPT یا Claude روشن کنید. این‌ها کلیدهای کل پروژه‌اند.',
                  'Turn on two-factor sign-in for GitHub, Cloudflare, your domain registrar, your email and your ChatGPT or Claude account. These are the keys to the whole project.',
                ),
              },
              {
                title: t('Tokenها با کمترین دسترسی', 'Least-privilege tokens'),
                text: t(
                  'هر API Token فقط همان دسترسی‌ای را داشته باشد که لازم دارد، فقط برای همان Account یا Zone. Tokenهای بلااستفاده را حذف و Tokenهای قدیمی را دوره‌ای عوض کنید.',
                  'Each API token should have only the access it needs, for only that account or zone. Delete unused tokens and rotate old ones periodically.',
                ),
              },
              {
                title: t('Secretها هرگز در کد', 'Secrets never in code'),
                text: t(
                  'کلیدهای API، رمزها و Tokenها را با `npx wrangler secret put` روی Worker بگذارید. برای توسعه محلی از فایل `.dev.vars` استفاده کنید و حتماً آن را در `.gitignore` بیاورید.',
                  'Put API keys, passwords and tokens on the Worker with `npx wrangler secret put`. For local development use a `.dev.vars` file, and make sure it is in `.gitignore`.',
                ),
              },
              {
                title: t('به ورودی‌ها اعتماد نکنید', 'Never trust input'),
                text: t(
                  'هر چیزی که از کاربر می‌آید (فرم، آدرس، فایل) را روی سرور اعتبارسنجی کنید: طول، نوع و قالب. برای Database از Query پارامتری استفاده کنید، نه چسباندن متن.',
                  'Validate everything that comes from users (forms, URLs, files) on the server: length, type and format. For the database, use parameterized queries, never pasted-together strings.',
                ),
              },
              {
                title: t('احراز هویت را خودتان اختراع نکنید', 'Do not invent your own login system'),
                text: t(
                  'برای ورود کاربران و رمزنگاری از کتابخانه‌ها و سرویس‌های شناخته‌شده استفاده کنید. اگر Agent پیشنهاد داد «یک رمزنگاری ساده خودمان بنویسیم»، نه بگویید.',
                  'For user sign-in and encryption, use well-known libraries and providers. If the agent suggests "writing our own simple encryption", say no.',
                ),
              },
            ],
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# Store a secret on your deployed Worker (you will be asked for the value)
npx wrangler secret put RESEND_API_KEY

# Local development only: .dev.vars (never commit this file)
echo 'RESEND_API_KEY="test-value"' > .dev.vars
echo '.dev.vars*' >> .gitignore`,
            caption: t(
              'Secret روی Worker رمزنگاری‌شده نگه داشته می‌شود و در کد یا Repository دیده نمی‌شود.',
              'The secret is stored encrypted on the Worker and never appears in your code or repository.',
            ),
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('اگر Token لو رفت', 'If a token leaks'),
            text: t(
              'اگر یک Token یا کلید را اشتباهی در گیت‌هاب Push کردید یا در چت جایی گذاشتید، پاک‌کردن فایل کافی نیست؛ تاریخچه گیت آن را نگه می‌دارد. همان لحظه Token را در داشبورد سرویس **باطل** کنید و یک Token جدید بسازید.',
              'If you push a token or key to GitHub by mistake, or paste it into a chat, deleting the file is not enough; git history keeps it. Immediately **revoke** the token in the service’s dashboard and create a new one.',
            ),
          },
        ],
      },
      {
        id: 'edge-protection',
        title: t('سپرهای Cloudflare: ربات‌ها، حمله‌ها و HTTPS', 'Cloudflare shields: bots, attacks and HTTPS'),
        blocks: [
          {
            type: 'p',
            text: t(
              'چون سایت شما پشت Cloudflare است، چند سپر آماده در اختیار دارید که فقط باید روشنشان کنید:',
              'Because your site sits behind Cloudflare, you have several ready-made shields you just need to switch on:',
            ),
          },
          {
            type: 'terms',
            items: [
              {
                term: 'Turnstile',
                def: t(
                  'جایگزین CAPTCHA که بدون آزار کاربر، ربات‌ها را از فرم‌ها دور می‌کند. حتماً توکن آن را روی سرور با Siteverify API تأیید کنید؛ ویجت سمت کاربر به‌تنهایی محافظت نمی‌کند.',
                  'A CAPTCHA alternative that keeps bots off your forms without annoying people. Always verify its token on the server with the Siteverify API; the client-side widget alone does not protect you.',
                ),
              },
              {
                term: 'WAF',
                def: t(
                  'فایروال برنامه وب که درخواست‌های مخرب شناخته‌شده را قبل از رسیدن به سایت مسدود می‌کند.',
                  'A web application firewall that blocks known malicious requests before they reach your site.',
                ),
              },
              {
                term: 'Rate limiting',
                def: t(
                  'محدودکردن تعداد درخواست از یک منبع در یک بازه زمانی؛ مثلاً جلوگیری از ارسال صدها فرم در دقیقه.',
                  'Limiting how many requests one source can make in a time window, for example stopping hundreds of form posts per minute.',
                ),
              },
              {
                term: 'Always Use HTTPS',
                def: t(
                  'تنظیمی که همه درخواست‌های `http://` را به `https://` می‌برد تا هیچ ارتباطی بدون رمزنگاری نماند.',
                  'A setting that sends every `http://` request to `https://` so no connection stays unencrypted.',
                ),
              },
              {
                term: 'Security headers',
                def: t(
                  'سربرگ‌هایی مثل Content-Security-Policy و X-Content-Type-Options که به مرورگر می‌گویند چه چیزهایی مجاز است و جلوی دسته‌ای از حمله‌ها را می‌گیرند.',
                  'Headers such as Content-Security-Policy and X-Content-Type-Options that tell the browser what is allowed and block whole classes of attacks.',
                ),
              },
            ],
          },
          {
            type: 'prompt',
            title: t('از Agent یک بازبینی امنیتی بخواهید', 'Ask your agent for a security review'),
            text: t(
              'یک بازبینی امنیتی کامل از این پروژه انجام بده و فقط گزارش بده، هنوز چیزی را تغییر نده:\n- آیا Secret، Token یا رمزی در کد یا تاریخچه گیت هست؟\n- آیا همه ورودی‌های فرم روی سرور اعتبارسنجی می‌شوند؟ Queryهای Database پارامتری هستند؟\n- آیا Turnstile توکن را روی سرور با Siteverify تأیید می‌کند؟\n- چه Security headerهایی کم است؟\n- وابستگی‌های قدیمی یا دارای آسیب‌پذیری شناخته‌شده کدام‌اند؟\nنتیجه را به‌صورت جدول با شدت (بالا، متوسط، پایین) و پیشنهاد اصلاح بده.',
              'Do a full security review of this project and only report, do not change anything yet:\n- Is there any secret, token or password in the code or git history?\n- Are all form inputs validated on the server? Are database queries parameterized?\n- Does Turnstile verify its token on the server with Siteverify?\n- Which security headers are missing?\n- Which dependencies are outdated or have known vulnerabilities?\nGive the result as a table with severity (high, medium, low) and a suggested fix.',
            ),
          },
          {
            type: 'callout',
            tone: 'fix',
            title: t('«سایت من کوچک است، کسی کاری با آن ندارد»', '"My site is small, nobody cares about it"'),
            text: t(
              'ربات‌ها سایت را به‌خاطر اهمیتش هدف نمی‌گیرند؛ کل اینترنت را خودکار اسکن می‌کنند. فرم بی‌محافظ یک سایت کوچک هم ظرف چند روز پر از اسپم می‌شود. امنیت پایه برای همه سایت‌هاست.',
              'Bots do not target sites for being important; they scan the whole internet automatically. Even a small site’s unprotected form fills with spam within days. Basic security is for every site.',
            ),
          },
        ],
      },
      {
        id: 'maintenance',
        title: t('نگهداری: به‌روزرسانی، پشتیبان، پایش', 'Upkeep: updates, backups, monitoring'),
        blocks: [
          {
            type: 'p',
            text: t(
              'سایت بعد از انتشار «تمام» نمی‌شود. کتابخانه‌ها نسخه جدید می‌گیرند، آسیب‌پذیری‌ها کشف می‌شوند و داده‌ها رشد می‌کنند. چند ابزار ساده این کارها را تقریباً خودکار می‌کنند:',
              'A site is not "finished" after launch. Libraries get new versions, vulnerabilities are discovered and data grows. A few simple tools make this almost automatic:',
            ),
          },
          {
            type: 'list',
            items: [
              t(
                '**Dependabot در گیت‌هاب:** برای وابستگی‌های قدیمی یا آسیب‌پذیر Pull Request به‌روزرسانی باز می‌کند. CI شما آن را تست می‌کند و شما فقط بررسی و Merge می‌کنید.',
                '**Dependabot on GitHub:** opens update pull requests for outdated or vulnerable dependencies. Your CI tests them and you just review and merge.',
              ),
              t(
                '**پشتیبان D1 با Time Travel:** همیشه روشن است و می‌توانید Database را به هر دقیقه دلخواه در یک بازه گذشته برگردانید (طول این بازه به پلن Workers بستگی دارد). برای نگه‌داری طولانی‌تر، خروجی دوره‌ای در R2 بگیرید.',
                '**D1 backups with Time Travel:** always on, and you can restore a database to any minute within a past window (the window length depends on your Workers plan). For longer retention, export periodically to R2.',
              ),
              t(
                '**پایش و لاگ‌ها:** با `"observability": { "enabled": true }` در پیکربندی، لاگ‌های Worker در داشبورد ذخیره و قابل جست‌وجو می‌شوند. Analytics هم ترافیک و خطاها را نشان می‌دهد.',
                '**Monitoring and logs:** with `"observability": { "enabled": true }` in your config, Worker logs are stored and searchable in the dashboard. Analytics shows traffic and errors.',
              ),
              t(
                '**Uptime check:** یک سرویس پایش ساده که هر چند دقیقه سایت را باز می‌کند و اگر جواب نداد خبرتان می‌کند.',
                '**Uptime checks:** a simple monitoring service that opens your site every few minutes and alerts you if it does not answer.',
              ),
              t(
                '**هزینه‌ها:** مصرف را در داشبورد Cloudflare ببینید و Notification تنظیم کنید تا قبل از غافلگیری خبردار شوید.',
                '**Costs:** watch usage in the Cloudflare dashboard and set up notifications so nothing surprises you.',
              ),
              t(
                '**حافظه Agent به‌روز:** وقتی تصمیم مهمی گرفتید یا ساختار پروژه عوض شد، `AGENTS.md` یا `CLAUDE.md` را به‌روز کنید تا Agent دفعه بعد با اطلاعات درست شروع کند. یک `CHANGELOG.md` ساده هم تاریخچه تغییرها را برای خودتان نگه می‌دارد.',
                '**Keep the agent briefed:** when you make an important decision or the structure changes, update `AGENTS.md` or `CLAUDE.md` so the agent starts with the right context next time. A simple `CHANGELOG.md` keeps the history for you too.',
              ),
            ],
          },
          {
            type: 'code',
            lang: 'yaml',
            code: `# .github/dependabot.yml: weekly update PRs for npm packages and GitHub Actions
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"`,
            caption: t(
              'با همین فایل کوچک، گیت‌هاب هر هفته برای به‌روزرسانی‌ها Pull Request می‌سازد.',
              'With this small file, GitHub opens pull requests for updates every week.',
            ),
          },
          {
            type: 'code',
            lang: 'bash',
            code: `# See the current point-in-time bookmark of a D1 database
npx wrangler d1 time-travel info my-database

# Restore to a moment in the past (destructive: overwrites the current data)
npx wrangler d1 time-travel restore my-database --timestamp=2026-11-20T10:00:00Z`,
            caption: t(
              'بازیابی D1 با Time Travel. این کار داده فعلی را بازنویسی می‌کند، پس اول bookmark فعلی را یادداشت کنید تا امکان برگشت داشته باشید.',
              'Restoring D1 with Time Travel. It overwrites current data, so note the current bookmark first so you can undo.',
            ),
          },
          {
            type: 'h',
            text: t('چک‌لیست ماهانه نگهداری', 'Monthly maintenance checklist'),
          },
          {
            type: 'list',
            ordered: true,
            items: [
              t('Pull Requestهای Dependabot را بررسی و Merge کنید (بعد از سبز شدن CI).', 'Review and merge Dependabot pull requests (after CI is green).'),
              t('لاگ‌ها و Analytics را برای خطاهای تکراری یا ترافیک عجیب نگاه کنید.', 'Scan logs and analytics for repeated errors or odd traffic.'),
              t('یک بار مسیرهای اصلی سایت را روی گوشی امتحان کنید.', 'Walk through the main paths of the site on your phone.'),
              t('فهرست API Tokenها را مرور کنید؛ بلااستفاده‌ها را حذف کنید.', 'Review your API tokens; delete unused ones.'),
              t('مطمئن شوید پشتیبان‌گیری کار می‌کند (مثلاً `wrangler d1 time-travel info`).', 'Check that backups work (for example `wrangler d1 time-travel info`).'),
              t('مصرف و هزینه را در داشبورد ببینید.', 'Check usage and costs in the dashboard.'),
              t('`AGENTS.md` یا `CLAUDE.md` و `CHANGELOG.md` را به‌روز کنید.', 'Update `AGENTS.md` or `CLAUDE.md` and `CHANGELOG.md`.'),
            ],
          },
          {
            type: 'quiz',
            q: t(
              'یک Secret مثل کلید API سرویس ایمیل را کجا باید نگه داریم؟',
              'Where should a secret such as an email service API key live?',
            ),
            options: [
              t('داخل فایل کد، چون راحت‌تر است', 'In the code file, because it is easier'),
              t('در بخش vars فایل wrangler.jsonc', 'In the vars section of wrangler.jsonc'),
              t(
                'روی Worker با `wrangler secret put`، و برای توسعه محلی در `.dev.vars` که در `.gitignore` است',
                'On the Worker with `wrangler secret put`, and for local development in `.dev.vars`, listed in `.gitignore`',
              ),
              t('در README تا همه بدانند', 'In the README so everyone knows'),
            ],
            answer: 2,
            explain: t(
              'Secretها روی Worker رمزنگاری‌شده ذخیره می‌شوند و در کد دیده نمی‌شوند. vars برای مقادیر غیرمحرمانه است و هر چیزی که در Repository باشد ممکن است لو برود.',
              'Secrets are stored encrypted on the Worker and never appear in code. vars is for non-sensitive values, and anything in the repository can leak.',
            ),
          },
          {
            type: 'links',
            items: [
              { label: 'Workers: Secrets', url: 'https://developers.cloudflare.com/workers/configuration/secrets/' },
              { label: 'Turnstile: Get started', url: 'https://developers.cloudflare.com/turnstile/get-started/' },
              { label: 'WAF: Rate limiting rules', url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/' },
              { label: 'D1: Time Travel and backups', url: 'https://developers.cloudflare.com/d1/reference/time-travel/' },
              { label: 'Workers Logs (observability)', url: 'https://developers.cloudflare.com/workers/observability/logs/workers-logs/' },
              { label: 'GitHub: Dependabot', url: 'https://docs.github.com/en/code-security/dependabot' },
              { label: 'GitHub: Two-factor authentication', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'امنیت از فصل اتصال Agent شروع شده بود، وقتی Tokenهای محدود ساختیم. اینجا آن را کامل می‌کنیم و به سایت زنده روی دامنه اختصاصی می‌رسانیم. نگهداری هم همان حلقه Vibe Coding است، فقط آهسته‌تر و منظم: بررسی، تغییر کوچک، تست، انتشار.',
      'Security began in the chapter where we connected the agent and created scoped tokens. Here we complete it for a live site on your own domain. Upkeep is the same vibe coding loop, just slower and regular: review, small change, test, release.',
    ),
    takeaways: [
      t('2FA روی همه حساب‌ها و Tokenهای با کمترین دسترسی، بیشترین خطرها را از بین می‌برند.', '2FA everywhere and least-privilege tokens remove most of the risk.'),
      t('Secretها با `wrangler secret put`؛ `.dev.vars` هرگز در گیت.', 'Secrets via `wrangler secret put`; `.dev.vars` never in git.'),
      t('Turnstile بدون تأیید سمت سرور محافظتی نمی‌کند.', 'Turnstile protects nothing without server-side verification.'),
      t('Dependabot، Time Travel در D1، لاگ‌ها و یک چک‌لیست ماهانه، سایت را سالم نگه می‌دارند.', 'Dependabot, D1 Time Travel, logs and a monthly checklist keep the site healthy.'),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 5. Hero: the finale                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: 'hero',
    act: 4,
    icon: 'trophy',
    title: t('قهرمان شدید! حالا مأموریت اول', 'You made it! Now, your first mission'),
    tagline: t(
      'کل مسیر را در یک نگاه ببینید و اولین پروژه واقعی‌تان را از ایده تا دامنه اختصاصی بسازید',
      'See the whole journey at a glance, and build your first real project from idea to your own domain',
    ),
    minutes: 12,
    mascotLine: t(
      'باورم نمی‌شود! از صفر شروع کردیم و حالا شما می‌دانید یک سایت واقعی چطور از ایده به اینترنت می‌رسد. بریم اولین مأموریت را با هم انجام دهیم!',
      'I can hardly believe it! We started from zero, and now you know how a real site travels from idea to the internet. Let us do your first mission together!',
    ),
    sections: [
      {
        id: 'journey-recap',
        title: t('کل مسیر در یک تصویر', 'The whole journey in one picture'),
        blocks: [
          {
            type: 'p',
            text: t(
              'یادتان هست اول کار گفتیم ساختن یک سایت قبلاً به یک تیم کامل نیاز داشت: طراح، برنامه‌نویس Frontend و Backend، کسی برای سرور و انتشار، و کسی برای پشتیبانی؟ حالا شما و یک Agent همان تیم هستید. اما Agent فقط به اندازه کسی که هدایتش می‌کند خوب است، و شما حالا می‌دانید چطور هدایتش کنید.',
              'Remember how we started: building a site used to need a whole team, a designer, frontend and backend developers, someone for servers and releases, someone for support? Now you and an agent are that team. But an agent is only as good as the person guiding it, and you now know how to guide it.',
            ),
          },
          {
            type: 'widget',
            id: 'hero-finale',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              t('**فهمیدن:** وب چطور کار می‌کند، دامنه و DNS، گیت‌هاب، Cloudflare و تفاوت Generative AI با Agentic AI.', '**Understand:** how the web works, domains and DNS, GitHub, Cloudflare, and generative versus agentic AI.'),
              t('**آماده‌سازی:** حساب‌ها، ابزارها و اتصال امن Agent به GitHub و Cloudflare.', '**Prepare:** accounts, tools, and a safe connection between the agent, GitHub and Cloudflare.'),
              t('**ساختن:** تعریف پروژه، Prompt خوب، تأیید طرح و حلقه Vibe Coding.', '**Build:** defining the project, good prompts, approving a design, and the vibe coding loop.'),
              t('**انتشار:** تست، CI/CD، دامنه اختصاصی، امنیت و نگهداری.', '**Ship:** testing, CI/CD, your own domain, security and upkeep.'),
            ],
          },
          {
            type: 'callout',
            tone: 'why',
            title: t('مهارت اصلی شما چیست؟', 'What is your real skill now?'),
            text: t(
              'مهارت شما «تایپ کد» نیست؛ **تصمیم‌گیری و قضاوت** است: بدانید چه می‌خواهید، آن را واضح بگویید، کار را در قدم‌های کوچک پیش ببرید، با شواهد بررسی کنید و امن منتشر کنید. این مهارت با هر Agent و هر ابزار جدیدی که بیاید، به کارتان می‌آید.',
              'Your skill is not "typing code"; it is **judgment**: know what you want, say it clearly, move in small steps, check with evidence and release safely. That skill carries over to every agent and every new tool that comes along.',
            ),
          },
        ],
      },
      {
        id: 'first-mission',
        title: t('مأموریت اول: یک سایت واقعی با فرم تماس', 'Mission one: a real site with a contact form'),
        blocks: [
          {
            type: 'p',
            text: t(
              'پیشنهاد ما برای اولین پروژه: یک **سایت شخصی یا صفحه معرفی یک کسب‌وکار کوچک** با یک فرم تماس که پیام‌ها را در D1 ذخیره می‌کند، با Turnstile محافظت می‌شود و روی دامنه خودتان منتشر می‌شود. کوچک است، ولی تقریباً همه چیزهایی را که یاد گرفتید لمس می‌کند.',
              'Our suggestion for a first project: a **personal site or a small business landing page** with a contact form that saves messages to D1, is protected by Turnstile, and is published on your own domain. It is small, but it touches almost everything you learned.',
            ),
          },
          {
            type: 'steps',
            items: [
              {
                title: t('بریف پروژه را بنویسید', 'Write the project brief'),
                text: t(
                  'هدف، مخاطب، صفحه‌ها، لحن و رنگ‌ها و معیار موفقیت را بنویسید (فصل تعریف پروژه). آن را در `AGENTS.md` یا `CLAUDE.md` بگذارید.',
                  'Write the goal, audience, pages, tone, colors and success criteria (project brief chapter). Put it in `AGENTS.md` or `CLAUDE.md`.',
                ),
              },
              {
                title: t('Repository و اتصال‌ها', 'Repository and connections'),
                text: t(
                  'یک Repository جدید بسازید و مطمئن شوید Agent به آن و به Cloudflare با Tokenهای محدود دسترسی دارد (فصل اتصال Agent).',
                  'Create a new repository and make sure the agent can reach it and Cloudflare with scoped tokens (connecting the agent chapter).',
                ),
              },
              {
                title: t('اول طرح، بعد کد', 'Design first, then code'),
                text: t(
                  'از Agent بخواهید اول طرح و ساختار صفحه را پیشنهاد دهد، آن را بررسی و اصلاح کنید و فقط بعد از تأیید، ساختن شروع شود (فصل طراحی).',
                  'Ask the agent to propose the design and page structure first, review and refine it, and only start building after you approve (design chapter).',
                ),
              },
              {
                title: t('حلقه Vibe Coding', 'The vibe coding loop'),
                text: t(
                  'قدم‌به‌قدم بسازید: صفحه اصلی، بعد بخش‌ها، بعد فرم، بعد اتصال فرم به D1. هر قدم را روی Preview ببینید و Commit کنید.',
                  'Build step by step: home page, then sections, then the form, then connecting the form to D1. Check each step on a preview and commit.',
                ),
              },
              {
                title: t('تست و امنیت', 'Tests and security'),
                text: t(
                  'تست E2E برای فرم، Turnstile با تأیید سمت سرور، Secretها با `wrangler secret put` و یک بازبینی امنیتی از Agent.',
                  'An E2E test for the form, Turnstile with server-side verification, secrets via `wrangler secret put`, and a security review from the agent.',
                ),
              },
              {
                title: t('CI/CD و دامنه', 'CI/CD and domain'),
                text: t(
                  'Workers Builds یا GitHub Actions را وصل کنید، بعد دامنه را به‌عنوان Custom Domain اضافه کنید و www را Redirect کنید.',
                  'Connect Workers Builds or GitHub Actions, then add your domain as a Custom Domain and redirect www.',
                ),
              },
              {
                title: t('جشن، بعد چک‌لیست ماهانه', 'Celebrate, then the monthly checklist'),
                text: t(
                  'لینک را برای دوستانتان بفرستید! و یادتان باشد ماهی یک بار چک‌لیست نگهداری را مرور کنید.',
                  'Send the link to your friends! And remember to run the maintenance checklist once a month.',
                ),
              },
            ],
          },
          {
            type: 'prompt',
            title: t('Prompt اصلی مأموریت', 'The master mission prompt'),
            text: t(
              'تو قرار است با من یک سایت واقعی را از صفر تا انتشار بسازی. لطفاً قدم‌به‌قدم کار کن و بعد از هر مرحله منتظر تأیید من بمان.\n\nپروژه: یک سایت [شخصی / معرفی کسب‌وکار] برای [نام]، مخاطب: [چه کسانی]، زبان: [فارسی با پشتیبانی RTL / انگلیسی].\nصفحه‌ها و بخش‌ها: [معرفی، خدمات یا نمونه‌کارها، درباره، تماس].\nحس و ظاهر: [سه صفت، مثلاً گرم، ساده، حرفه‌ای]، رنگ‌های پیشنهادی: [...].\nفرم تماس: نام، ایمیل، پیام؛ اعتبارسنجی روی سرور؛ ذخیره در Cloudflare D1؛ محافظت با Turnstile و تأیید توکن روی سرور.\nزیرساخت: Repository گیت‌هاب [آدرس]؛ Cloudflare Workers با Static assets؛ دامنه [example.com].\n\nقوانین کار:\n۱. اول یک برنامه و طرح اولیه پیشنهاد بده و تا تأیید من کد ننویس.\n۲. روی Branch جدا کار کن و برای هر قدم Pull Request باز کن.\n۳. تست بنویس و اجرا کن و خروجی واقعی را نشان بده.\n۴. هیچ Secret یا Tokenی را در کد نگذار؛ بگو کدام Secretها را باید بسازم.\n۵. روی موبایل و برای دسترس‌پذیری بررسی کن.\n۶. در پایان CI/CD را راه بینداز، دامنه را وصل کن و یک AGENTS.md با تصمیم‌های پروژه بنویس.',
              'You are going to build a real site with me, from zero to launch. Please work step by step and wait for my approval after each stage.\n\nProject: a [personal / small business] site for [name]; audience: [who]; language: [Persian with RTL support / English].\nPages and sections: [intro, services or portfolio, about, contact].\nLook and feel: [three adjectives, for example warm, simple, professional]; suggested colors: [...].\nContact form: name, email, message; server-side validation; saved to Cloudflare D1; protected by Turnstile with server-side token verification.\nInfrastructure: GitHub repository [URL]; Cloudflare Workers with static assets; domain [example.com].\n\nWorking rules:\n1. First propose a plan and an initial design, and write no code until I approve.\n2. Work on a separate branch and open a pull request for each step.\n3. Write and run tests and show the real output.\n4. Never put a secret or token in the code; tell me which secrets I need to create.\n5. Check on mobile and for accessibility.\n6. At the end, set up CI/CD, attach the domain, and write an AGENTS.md with the project decisions.',
            ),
          },
          {
            type: 'quiz',
            q: t(
              'در مأموریت اول، چرا از Agent می‌خواهیم «اول برنامه و طرح، بعد کد»؟',
              'In the first mission, why do we ask the agent for "plan and design first, then code"?',
            ),
            options: [
              t('چون Agent بدون طرح نمی‌تواند کد بنویسد', 'Because the agent cannot write code without a design'),
              t(
                'چون اصلاح یک طرح خیلی ارزان‌تر از بازنویسی کد است و مطمئن می‌شویم Agent منظور ما را درست فهمیده',
                'Because fixing a design is far cheaper than rewriting code, and it confirms the agent understood us',
              ),
              t('چون Cloudflare این را لازم دارد', 'Because Cloudflare requires it'),
              t('فقط برای اینکه کار طولانی‌تر شود', 'Just to make the work take longer'),
            ],
            answer: 1,
            explain: t(
              'تأیید طرح، سوءتفاهم‌ها را قبل از اینکه به کد تبدیل شوند پیدا می‌کند. تغییر یک طرح چند دقیقه است، ولی بازنویسی کد ساخته‌شده خیلی بیشتر زمان می‌برد.',
              'Approving the design catches misunderstandings before they become code. Changing a design takes minutes; rewriting built code takes far longer.',
            ),
          },
        ],
      },
      {
        id: 'whats-next',
        title: t('بعد از قهرمانی: قدم‌های بعدی', 'After the finish line: what comes next'),
        blocks: [
          {
            type: 'p',
            text: t(
              'وقتی مأموریت اول را تمام کردید، پروژه‌های بزرگ‌تر خیلی کمتر ترسناک‌اند. همان روش، همان حلقه، فقط قطعه‌های بیشتر:',
              'Once mission one is done, bigger projects feel much less scary. Same method, same loop, just more pieces:',
            ),
          },
          {
            type: 'list',
            items: [
              t('**ورود کاربران (Auth):** با سرویس‌ها و کتابخانه‌های شناخته‌شده، نه رمزنگاری دست‌ساز.', '**User sign-in (auth):** with well-known providers and libraries, not hand-made crypto.'),
              t('**پرداخت آنلاین:** با درگاه‌های معتبر و تست کامل در حالت آزمایشی قبل از پول واقعی.', '**Online payments:** with reputable payment providers, fully tested in test mode before real money.'),
              t('**Durable Objects:** برای چیزهای هم‌زمان و زنده مثل چت، همکاری هم‌زمان یا بازی.', '**Durable Objects:** for live, coordinated things like chat, real-time collaboration or games.'),
              t('**Workers AI:** اضافه‌کردن قابلیت‌های هوش مصنوعی مستقیم داخل اپ خودتان.', '**Workers AI:** adding AI features directly inside your own app.'),
              t(
                '**کمی کد خواندن در هر پروژه:** لازم نیست برنامه‌نویس شوید، ولی هر بار یک فایل را با کمک Agent بخوانید و بپرسید «این خط چه می‌کند؟». کم‌کم چشمتان باز می‌شود.',
                '**Read a little code each project:** you do not need to become a programmer, but each time read one file with the agent and ask "what does this line do?". Little by little, you start to see.',
              ),
              t(
                '**جامعه:** پروژه‌ها را به اشتراک بگذارید، از دیگران یاد بگیرید و Skillهای مفید را جمع کنید تا Agentتان هر بار باهوش‌تر شروع کند.',
                '**Community:** share your projects, learn from others, and collect useful skills so your agent starts smarter every time.',
              ),
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: t('یک پیام آخر', 'One last message'),
            text: t(
              'اولین سایت شما کامل نخواهد بود، و این کاملاً اشکالی ندارد. مهم این است که منتشرش کنید، از آن یاد بگیرید و دومی را بهتر بسازید. قهرمان کسی نیست که اشتباه نمی‌کند؛ کسی است که با یک حلقه درست، اشتباه‌ها را سریع پیدا و اصلاح می‌کند.',
              'Your first site will not be perfect, and that is completely fine. What matters is that you ship it, learn from it, and make the second one better. A hero is not someone who never makes mistakes; it is someone with a good loop who finds and fixes them quickly.',
            ),
          },
          {
            type: 'terms',
            items: [
              {
                term: 'Capstone',
                def: t(
                  'پروژه پایانی که همه مهارت‌های دوره را در یک کار واقعی کنار هم می‌گذارد.',
                  'A final project that puts every skill from the course together in one real piece of work.',
                ),
              },
              {
                term: 'Durable Objects',
                def: t(
                  'قابلیتی در Cloudflare برای نگه‌داشتن وضعیت و هماهنگی بین کاربران، مناسب برای چت و همکاری زنده.',
                  'A Cloudflare feature for keeping state and coordinating between users, suited to chat and live collaboration.',
                ),
              },
              {
                term: 'Workers AI',
                def: t(
                  'اجرای مدل‌های هوش مصنوعی روی شبکه Cloudflare، قابل صدا زدن مستقیم از Worker شما.',
                  'Running AI models on Cloudflare’s network, callable directly from your Worker.',
                ),
              },
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare D1: Get started', url: 'https://developers.cloudflare.com/d1/get-started/' },
              { label: 'Cloudflare Durable Objects', url: 'https://developers.cloudflare.com/durable-objects/' },
              { label: 'Cloudflare Workers AI', url: 'https://developers.cloudflare.com/workers-ai/' },
              { label: 'Turnstile: Validate the token', url: 'https://developers.cloudflare.com/turnstile/get-started/server-side-validation/' },
              { label: 'Cloudflare Workers documentation', url: 'https://developers.cloudflare.com/workers/' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'این فصل همه فصل‌های قبل را به هم وصل می‌کند: هر قدم مأموریت اول دقیقاً به یکی از فصل‌ها برمی‌گردد. هر وقت جایی گیر کردید، به همان فصل برگردید. و هر پروژه تازه، دوباره همین مسیر است: فهمیدن، آماده‌سازی، ساختن، انتشار.',
      'This chapter ties every earlier chapter together: each step of mission one maps to one of them. Whenever you get stuck, go back to that chapter. And every new project is this same path again: understand, prepare, build, ship.',
    ),
    takeaways: [
      t('شما و Agent حالا یک تیم کامل هستید؛ مهارت اصلی شما قضاوت و هدایت است.', 'You and an agent are now a full team; your core skill is judgment and direction.'),
      t('مأموریت اول: سایت کوچک با فرم تماس روی D1، Turnstile، CI/CD و دامنه اختصاصی.', 'Mission one: a small site with a D1 contact form, Turnstile, CI/CD and your own domain.'),
      t('همیشه: اول طرح، قدم‌های کوچک، تست با شواهد، انتشار امن.', 'Always: design first, small steps, evidence-backed tests, safe release.'),
      t('اولین سایت قرار نیست کامل باشد؛ قرار است منتشر شود.', 'Your first site does not need to be perfect; it needs to ship.'),
    ],
  },
];
