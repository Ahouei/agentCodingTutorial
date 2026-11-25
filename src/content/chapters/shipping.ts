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
    minutes: 21,
    mascotLine: t(
      'من خیلی با اعتمادبه‌نفس کد می‌نویسم، ولی اعتمادبه‌نفس با درست‌بودن فرق دارد! بیایید با هم چکش کنیم.',
      'I write code with a lot of confidence, but confidence is not the same as being right! Let us check it together.',
    ),
    mission: {
      outcome: t(
        'بعد از این فصل می‌توانید از Agent شواهد واقعی بخواهید (تستی که اول قرمز و بعد سبز می‌شود) و یک باگ را با گزارش دقیق، از ریشه حل کنید.',
        'After this chapter you can ask your agent for real evidence (a test that goes red, then green) and fix a bug at its root with a precise report.',
      ),
      cafe: t(
        'تست‌های کافه سحر سبز می‌شوند و باگ فرم رزرو روی موبایل برطرف می‌شود.',
        'Café Sahar’s tests turn green and the mobile booking-form bug is fixed.',
      ),
    },
    warmup: {
      q: t(
        'در حلقه Vibe Coding، بعد از اینکه Agent تغییری ساخت و Preview را دیدید، قدم درست بعدی چیست؟',
        'In the vibe coding loop, after the agent builds a change and you check the preview, what is the right next step?',
      ),
      options: [
        t('بخواهید همه‌چیز از اول بازنویسی شود تا کاملاً به سلیقه‌تان باشد', 'Ask for a full rewrite so everything matches your taste'),
        t('بازخورد مشخص بدهید و وقتی درست شد، Commit کنید', 'Give specific feedback, and commit once it looks right'),
        t('بدون نگاه به Preview، مستقیم در main ادغام کنید', 'Merge straight into main without looking at the preview'),
        t('یک گفت‌وگوی تازه باز کنید و کل سایت را دوباره توضیح دهید', 'Open a new chat and describe the whole site all over again'),
      ],
      answer: 1,
      explain: t(
        'حلقه سالم کوچک و قدم‌به‌قدم است: بازخورد دقیق، تغییر کوچک، و ذخیره نسخه سالم با Commit.',
        'A healthy loop is small and step by step: precise feedback, a small change, and saving the healthy version with a commit.',
      ),
      why: [
        t('بازنویسی کامل چیزهایی را که کار می‌کردند خراب می‌کند و بررسی‌اش سخت است.', 'A full rewrite breaks parts that already worked and is hard to review.'),
        t('درست است: بازخورد دقیق و Commit بعد از هر قدم سالم، شما را همیشه یک قدم از نسخه خوب دور نگه می‌دارد.', 'Right: precise feedback and a commit after each healthy step keep you one step from a good version.'),
        t('Merge بدون دیدن Preview یعنی اشتباه‌ها مستقیم به سایت زنده می‌رسند.', 'Merging without the preview sends mistakes straight to the live site.'),
        t('گفت‌وگوی تازه فقط وقتی لازم است که Context خیلی طولانی شده؛ نه بعد از هر تغییر.', 'A fresh chat helps only when the context gets very long, not after every change.'),
      ],
    },
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
              'برای فرم رزرو میز کافه سحر (cafe-sahar.ir) تست بنویس و اجرا کن:\n۱. یک Unit test برای تابع اعتبارسنجی (نام خالی، شماره تماس نامعتبر، تاریخ گذشته، تعداد نفر صفر).\n۲. یک تست End-to-end با Playwright که فرم را روی صفحه موبایل (عرض ۳۹۰ پیکسل) پر می‌کند و چک می‌کند پیام «رزرو ثبت شد» دیده شود و یک ردیف تازه در جدول bookings در D1 ذخیره شود.\nقبل از هر اصلاح، نشان بده که تست بدون اصلاح شکست می‌خورد. در پایان خروجی کامل دستورها را نشان بده، نه فقط خلاصه.',
              'Write and run tests for the Café Sahar table-booking form (cafe-sahar.ir):\n1. A unit test for the validation function (empty name, invalid phone number, a date in the past, zero guests).\n2. A Playwright end-to-end test that fills the form at mobile width (390px), checks that the "Booking received" message appears, and that a new row is saved in the D1 bookings table.\nBefore each fix, show that the test fails without it. At the end, show the full command output, not just a summary.',
            ),
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Codex:** Codex داخل Repository شما کار می‌کند و دستورهای تست را خودش اجرا می‌کند. از او بخواهید تست‌ها را در یک Pull Request بیاورد و خروجی کامل `npm test` و `npx playwright test` را نشان دهد. با Codex Cloud کار روی سرورهای OpenAI ادامه پیدا می‌کند، حتی وقتی کامپیوترتان خاموش است، و شما نتیجه را در PR بررسی می‌کنید.',
                  '**On the Codex path:** Codex works inside your repository and runs the test commands itself. Ask it to bring the tests in a pull request and show the full output of `npm test` and `npx playwright test`. With Codex Cloud the work keeps running on OpenAI’s servers even while your computer sleeps, and you review the result in the PR.',
                ),
              },
            ],
            lovable: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Lovable:** هنگام انتشار، Lovable بررسی‌های امنیتی خودکار اجرا می‌کند (مثل قوانین دسترسی به Database، ابزارهایی که عمومی در دسترس‌اند و وابستگی‌های آسیب‌پذیر) و یافته‌ها را با برچسب Critical، Warning یا Info نشان می‌دهد. این بررسی‌ها درباره **امنیت** است، نه درباره اینکه رزرو میز واقعاً کار می‌کند. پس همچنان Preview را روی یک گوشی واقعی باز کنید و یک رزرو کامل ثبت کنید، و در حالت Build از Lovable بخواهید جریان رزرو را از ابتدا تا انتها بررسی کند و بگوید دقیقاً چه چیزی را چک کرده است.',
                  '**On the Lovable path:** when you publish, Lovable runs automatic security checks (such as database access rules, tools that are publicly reachable, and vulnerable dependencies) and labels findings Critical, Warning or Info. Those checks are about **security**, not about whether booking a table actually works. So still open the preview on a real phone and make a full booking, and in Build mode ask Lovable to verify the booking flow end to end and tell you exactly what it checked.',
                ),
              },
              {
                type: 'callout',
                tone: 'tip',
                title: t('ترکیب دو مسیر', 'Combining the two paths'),
                text: t(
                  'Lovable پروژه را دوطرفه با GitHub همگام می‌کند. یعنی می‌توانید از Codex بخواهید در همان Repository تست‌های Playwright اضافه کند؛ تغییرها به Lovable هم برمی‌گردند.',
                  'Lovable syncs the project with GitHub both ways. So you can ask Codex to add Playwright tests in the same repository, and the changes flow back into Lovable.',
                ),
              },
            ],
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
                  'Screenshot، خطاهای قرمز Console مرورگر (F12)، درخواست ناموفق در تب Network، و لاگ‌های Worker با `npx wrangler tail` یا بخش Logs داشبورد Cloudflare. اگر Agent با API Token کار می‌کند، آن Token برای `wrangler tail` به مجوز **Workers Tail Read** نیاز دارد.',
                  'A screenshot, red errors from the browser console (F12), the failed request in the Network tab, and Worker logs from `npx wrangler tail` or the Logs view in the Cloudflare dashboard. If your agent works with an API token, that token needs the **Workers Tail Read** permission for `wrangler tail`.',
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
              'وقتی مشکل را روی سایت منتشرشده تکرار می‌کنید، این دستور لاگ‌ها و خطاهای Worker را زنده نشان می‌دهد. با API Token، مجوز Workers Tail Read لازم است.',
              'While you reproduce the bug on the live site, this streams the Worker logs and errors in real time. With an API token, it needs the Workers Tail Read permission.',
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
              'کدام پیام برای Agent بهترین شروع Debugging فرم رزرو کافه سحر است؟',
              'Which message is the best way to start debugging Café Sahar’s booking form with an agent?',
            ),
            options: [
              t(
                'روی موبایل «ارسال» فقط می‌چرخد و رزرو ذخیره نمی‌شود؛ خطای Console پیوست است. اول علت را بگو.',
                'On mobile, Send just spins and nothing saves; console error attached. Find the cause first.',
              ),
              t(
                'فرم رزرو برای بعضی‌ها خراب است. لطفاً کل سایت را بگرد و هر مشکلی پیدا کردی درستش کن.',
                'The booking form seems broken for some people. Please check the whole site and fix it.',
              ),
              t(
                'فرم رزرو را با یک کتابخانه جدید کاملاً از اول بازنویسی کن تا این جور باگ‌ها کلاً از بین بروند.',
                'Rewrite the booking form from scratch with a new library so this kind of bug goes away.',
              ),
              t(
                'امروز همه باگ‌های سایت را پیدا و درست کن و ضمناً ظاهر صفحه‌ها را هم کمی مرتب‌تر کن.',
                'Find and fix every bug on the site today, and also clean up the styles while you are in there.',
              ),
            ],
            answer: 0,
            explain: t(
              'پیام خوب قدم‌های تکرار، انتظار در برابر واقعیت، شواهد و درخواست «اول علت» را دارد. پیام‌های مبهم یا خیلی بزرگ، Agent را به حدس زدن و تغییرهای بی‌ربط می‌کشانند.',
              'A good message has reproduction steps, expected versus actual, evidence and a "cause first" request. Vague or oversized requests push the agent into guessing and unrelated changes.',
            ),
            why: [
              t(
                'درست است: کجا، چه اتفاقی، چه شواهدی، و اینکه قبل از هر تغییری علت را توضیح دهد.',
                'Right: where, what happened, the evidence, and the cause explained before any change.',
              ),
              t(
                'خیلی مبهم است: Agent باید حدس بزند کجا و کی خراب می‌شود و ممکن است کد بی‌ربط را عوض کند.',
                'Too vague: the agent has to guess where and when it breaks, and may change unrelated code.',
              ),
              t(
                'بازنویسی، چیزهای سالم را دور می‌ریزد و علت واقعی را پنهان می‌کند؛ یک اصلاح کوچک امن‌تر است.',
                'A rewrite throws away what works and hides the real cause; a small fix is safer to review.',
              ),
              t(
                'چند باگ و تغییر ظاهری در یک درخواست، تغییرها را بزرگ و بررسی‌شان را سخت می‌کند.',
                'Mixing many bugs and style changes in one request makes the change huge and hard to check.',
              ),
            ],
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
    minutes: 21,
    mascotLine: t(
      'دیگر لازم نیست هر بار دستی سایت را بالا بیاوریم. یک خط تولید کوچک می‌سازیم که خودش همه کار را می‌کند!',
      'No more uploading the site by hand. We are going to build a tiny assembly line that does it all for us!',
    ),
    mission: {
      outcome: t(
        'بعد از این فصل یک خط تولید خودکار دارید: هر Push ساخته، تست و منتشر می‌شود و اگر نسخه‌ای خراب بود، با یک Rollback برمی‌گردید.',
        'After this chapter you have an automatic pipeline: every push is built, tested and released, and a bad release is one rollback away.',
      ),
      cafe: t(
        'هر Push به main، کافه سحر را خودکار به‌روز و منتشر می‌کند.',
        'Every push to main updates and publishes Café Sahar automatically.',
      ),
    },
    warmup: {
      q: t(
        'چرا از Agent می‌خواهیم تست را اول بدون اصلاح اجرا کند؟',
        'Why do we ask the agent to run a test before applying the fix?',
      ),
      options: [
        t('تا کل مجموعه تست‌ها کمی سریع‌تر و سبک‌تر اجرا شود', 'So the whole test suite runs a little faster'),
        t('چون تست‌ها اجازه ندارند بار اول پاس شوند', 'Because tests are not allowed to pass the first time'),
        t('تا قرمز شدنش را ببینیم و بدانیم چیزی را می‌سنجد', 'To see it fail first, proving it checks something'),
        t('تا اگر شکست خورد، Agent دیگر اصلاح را ننویسد', 'So the agent can skip the fix if the test fails'),
      ],
      answer: 2,
      explain: t(
        'تستی که هیچ‌وقت ندیده‌اید قرمز شود، ممکن است اصلاً چیزی را چک نکند. قرمز بعد سبز یعنی شاهد واقعی.',
        'A test you have never seen fail may check nothing at all. Red, then green, is real evidence.',
      ),
      why: [
        t('سرعت ربطی به این کار ندارد؛ هدف اثبات است، نه سرعت.', 'Speed has nothing to do with it; the goal is proof, not speed.'),
        t('چنین قانونی وجود ندارد؛ تست فقط باید نشان دهد خطا را می‌گیرد.', 'There is no such rule; the test just has to show it catches the error.'),
        t('درست است: قرمز شدن بدون اصلاح ثابت می‌کند تست واقعاً همان مشکل را می‌سنجد.', 'Right: failing without the fix proves the test really measures that problem.'),
        t('برعکس: شکست تست یعنی اصلاح لازم است، نه اینکه کنار گذاشته شود.', 'The opposite: a failing test means the fix is needed, not skipped.'),
      ],
    },
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
  "name": "cafe-sahar",
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
        id: 'publish-paths',
        title: t('دو مسیر انتشار: Codex یا Lovable', 'Two ways to publish: Codex or Lovable'),
        blocks: [
          {
            type: 'p',
            text: t(
              'خط تولید بالا مسیر Codex است: کد در GitHub، انتشار با Cloudflare. اگر کافه سحر را با Lovable ساخته‌اید، مسیر کمی فرق دارد. هر دو را ببینید، چون در عمل خیلی‌ها ترکیبشان می‌کنند.',
              'The pipeline above is the Codex path: code in GitHub, release with Cloudflare. If you built Café Sahar with Lovable, the path differs a little. Look at both, because in practice many people combine them.',
            ),
          },
          {
            type: 'path',
            codex: [
              {
                type: 'steps',
                items: [
                  {
                    title: t('Codex روی Branch کار می‌کند', 'Codex works on a branch'),
                    text: t(
                      'Codex تغییر را در Repository `cafe-sahar` روی یک Branch جدا می‌سازد و Pull Request باز می‌کند.',
                      'Codex makes the change in the `cafe-sahar` repository on its own branch and opens a pull request.',
                    ),
                  },
                  {
                    title: t('Preview خودکار', 'Automatic preview'),
                    text: t(
                      'Workers Builds برای همان Branch یک آدرس Preview می‌سازد و لینکش را در Pull Request می‌گذارد.',
                      'Workers Builds builds a preview URL for that branch and posts the link on the pull request.',
                    ),
                  },
                  {
                    title: t('Merge یعنی انتشار', 'Merge means release'),
                    text: t(
                      'بعد از بررسی Preview و تست‌ها، Merge در `main` نسخه Production کافه را به‌روز می‌کند.',
                      'After checking the preview and tests, merging into `main` updates the café’s production site.',
                    ),
                  },
                ],
              },
            ],
            lovable: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Lovable:** دکمه **Publish** پروژه را روی آدرسی مثل `cafe-sahar.lovable.app` منتشر می‌کند. در پنجره انتشار، بررسی‌های امنیتی خودکار اجرا می‌شوند و اگر Backend داخلی فعال باشد و یافته Critical حل‌نشده‌ای مانده باشد، Lovable قبل از انتشار یک پنجره بازبینی نشان می‌دهد. یادتان باشد میزبانی و Backend داخلی Lovable هم از اعتبار (Credit) حساب شما مصرف می‌کنند.',
                  '**On the Lovable path:** the **Publish** button releases the project at an address like `cafe-sahar.lovable.app`. Automatic security checks run in the publish dialog, and if the built-in backend is on and a critical finding is unresolved, Lovable shows a review dialog before publishing. Remember that Lovable’s hosting and built-in backend also draw on your account’s credits.',
                ),
              },
              {
                type: 'callout',
                tone: 'tip',
                title: t('مسیر ترکیبی: Lovable بسازد، Cloudflare منتشر کند', 'Combined path: Lovable builds, Cloudflare publishes'),
                text: t(
                  'Lovable پروژه را دوطرفه با GitHub همگام می‌کند. همان Repository را می‌توانید به Workers Builds وصل کنید تا Cloudflare منتشرش کند. اپ‌های جدید Lovable با TanStack Start ساخته می‌شوند و طبق راهنمای Cloudflare، `wrangler deploy` آن را خودکار تشخیص می‌دهد. متغیرهای Supabase را در Cloudflare تنظیم کنید، آدرس جدید را به فهرست Redirect URLهای ورود اضافه کنید و اول یک انتشار آزمایشی بگیرید. دکمه Publish در Lovable همچنان فقط روی میزبانی خود Lovable منتشر می‌کند.',
                  'Lovable syncs the project with GitHub both ways. You can connect that same repository to Workers Builds so Cloudflare publishes it. New Lovable apps are built on TanStack Start, and per Cloudflare’s guide `wrangler deploy` detects it automatically. Set the Supabase variables in Cloudflare, add the new address to the sign-in redirect URLs, and do a trial deploy first. Lovable’s Publish button still only publishes to Lovable’s own hosting.',
                ),
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('یک خانه اصلی انتخاب کنید', 'Choose one main home'),
            text: t(
              'اگر هم `lovable.app` و هم Cloudflare نسخه‌ای از کافه را منتشر کنند، خیلی زود دو سایت متفاوت خواهید داشت. تصمیم بگیرید کدام «سایت اصلی» است و دامنه `cafe-sahar.ir` فقط به همان اشاره کند.',
              'If both `lovable.app` and Cloudflare publish a copy of the café, you soon have two different sites. Decide which one is "the" site, and point `cafe-sahar.ir` only at that one.',
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
              'در Workers Builds، یک Push به Branch `new-menu` (که Production branch نیست) معمولاً چه نتیجه‌ای دارد؟',
              'With Workers Builds, what does a push to the branch `new-menu` (not the production branch) usually do?',
            ),
            options: [
              t('سایت اصلی کافه فوراً برای همه بازدیدکننده‌ها به‌روز می‌شود.', 'It updates the live café site right away for every visitor.'),
              t('تا وقتی Branch را در main ادغام نکنید هیچ اتفاقی نمی‌افتد.', 'Nothing at all happens until you merge the branch into main.'),
              t('با Preview روشن، آدرس جدایی ساخته می‌شود و سایت اصلی می‌ماند.', 'With previews on, it builds a separate URL; the live site stays.'),
              t('بقیه Branchها حذف می‌شوند تا فقط `new-menu` در Repository بماند.', 'It deletes the other branches so only `new-menu` stays in the repo.'),
            ],
            answer: 2,
            explain: t(
              'Push به Production branch سایت اصلی را به‌روز می‌کند. Push به بقیه Branchها، وقتی Preview builds فعال است، فقط یک پیش‌نمایش جدا می‌سازد تا قبل از Merge بررسی کنید.',
              'A push to the production branch updates the live site. Pushes to other branches, with preview builds on, only create a separate preview so you can check before merging.',
            ),
            why: [
              t('فقط Push یا Merge به Production branch (معمولاً main) سایت اصلی را عوض می‌کند.', 'Only a push or merge to the production branch (usually main) changes the live site.'),
              t('اگر Preview builds خاموش باشد درست است؛ با Preview روشن، همان Push یک پیش‌نمایش می‌سازد.', 'True only with preview builds off; with them on, that push builds a preview.'),
              t('درست است: یک آدرس Preview جدا، بدون دست‌زدن به سایت زنده کافه.', 'Right: a separate preview URL, without touching the live café site.'),
              t('Workers Builds هیچ Branchی را حذف نمی‌کند؛ فقط Build و Deploy می‌کند.', 'Workers Builds never deletes branches; it only builds and deploys.'),
            ],
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
              { label: 'Lovable: Publish your app', url: 'https://docs.lovable.dev/features/publish' },
              { label: 'Lovable: Deploy and host outside Lovable', url: 'https://docs.lovable.dev/tips-tricks/external-deployment-hosting' },
              { label: 'Cloudflare Workers: TanStack Start', url: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'این فصل GitHub (فصل Version Control)، Cloudflare Workers و تست‌های فصل قبل را به یک خط تولید خودکار وصل می‌کند، چه کد از Codex بیاید چه از Lovable. حالا کافه سحر روی یک آدرس `workers.dev` (یا `lovable.app`) زنده است؛ در فصل بعد آن را روی `cafe-sahar.ir` می‌برید.',
      'This chapter wires GitHub (from the version control chapter), Cloudflare Workers and the tests from the previous chapter into one automatic pipeline, whether the code comes from Codex or from Lovable. Café Sahar now lives on a `workers.dev` (or `lovable.app`) address; next you move it onto `cafe-sahar.ir`.',
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
    minutes: 25,
    mascotLine: t(
      'وقتشه سایتمون یک اسم واقعی داشته باشه! فقط با دقت تابلوها را عوض می‌کنیم تا هیچ نامه‌ای گم نشود.',
      'Time to give our site a real name! We will just change the signposts carefully so no letters get lost.',
    ),
    mission: {
      outcome: t(
        'بعد از این فصل سایت روی دامنه خودتان با HTTPS باز می‌شود، بدون اینکه ایمیل‌های دامنه از کار بیفتند، و یک نقشه B برای مخاطبان داخل ایران دارید.',
        'After this chapter your site opens on your own domain with HTTPS, the domain’s email still works, and you have a plan B for visitors inside Iran.',
      ),
      cafe: t(
        'cafe-sahar.ir با قفل HTTPS زنده می‌شود.',
        'cafe-sahar.ir goes live with the HTTPS padlock.',
      ),
    },
    warmup: {
      q: t(
        'در Workers Builds، Push به یک Branch غیر از main (با Preview builds روشن) چه می‌کند؟',
        'With Workers Builds and preview builds on, what does a push to a branch other than main do?',
      ),
      options: [
        t('یک آدرس Preview جدا می‌سازد و سایت اصلی می‌ماند', 'Builds a separate preview URL; the live site stays'),
        t('سایت اصلی را فوراً با نسخه Branch جدید عوض می‌کند', 'Replaces the live site right away with the new branch'),
        t('Branch اصلی را حذف می‌کند تا فقط Branch جدید بماند', 'Deletes the main branch so only the new one is left'),
        t('هیچ کاری نمی‌کند، چون فقط main ساخته می‌شود', 'Nothing at all, because only main is ever built'),
      ],
      answer: 0,
      explain: t(
        'Preview یعنی دیدن تغییر روی آدرس جدا، قبل از اینکه با Merge به سایت اصلی برسد.',
        'A preview lets you see the change on its own URL before a merge sends it to the live site.',
      ),
      why: [
        t('درست است: هر Branch آدرس Preview خودش را می‌گیرد و Production دست نمی‌خورد.', 'Right: each branch gets its own preview URL and production is untouched.'),
        t('فقط Production branch سایت اصلی را عوض می‌کند.', 'Only the production branch changes the live site.'),
        t('Workers Builds هیچ Branchی را حذف نمی‌کند.', 'Workers Builds never deletes a branch.'),
        t('با Preview builds روشن، Branchهای دیگر هم ساخته می‌شوند.', 'With preview builds on, other branches are built too.'),
      ],
    },
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
                  'در Cloudflare، هر دامنه‌ای که اضافه می‌کنید (مثل `cafe-sahar.ir`) یک Zone است؛ یعنی Cloudflare DNS و ترافیک آن را مدیریت می‌کند.',
                  'In Cloudflare, every domain you add (like `cafe-sahar.ir`) is a zone, meaning Cloudflare manages its DNS and traffic.',
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
                  'Apex خود دامنه است (`cafe-sahar.ir`) و `www.cafe-sahar.ir` یک زیردامنه. بهتر است یکی اصلی باشد و دیگری به آن Redirect شود.',
                  'The apex is the bare domain (`cafe-sahar.ir`); `www.cafe-sahar.ir` is a subdomain. Make one the main address and redirect the other to it.',
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
                  'در Workers & Pages، Worker خود را باز کنید، به تنظیمات بخش Domains & Routes بروید و یک Custom Domain اضافه کنید، مثلاً `cafe-sahar.ir`.',
                  'In Workers & Pages, open your Worker, go to its Domains & Routes settings and add a Custom Domain, for example `cafe-sahar.ir`.',
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
                  'Custom Domain فقط دقیقاً همان نام را می‌گیرد. برای اینکه `www.cafe-sahar.ir` هم کار کند، یک Redirect Rule در Cloudflare بسازید که آن را به `cafe-sahar.ir` بفرستد (یا برعکس).',
                  'A Custom Domain only matches that exact hostname. To make `www.cafe-sahar.ir` work too, create a Redirect Rule in Cloudflare that sends it to `cafe-sahar.ir` (or the other way round).',
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
  "name": "cafe-sahar",
  "compatibility_date": "2026-11-01",
  "assets": { "directory": "./dist", "not_found_handling": "single-page-application" },
  "routes": [
    { "pattern": "cafe-sahar.ir", "custom_domain": true }
  ]
}`,
            caption: t(
              'تعریف Custom Domain در فایل پیکربندی برای کافه سحر. برای پروژه خودتان، `cafe-sahar.ir` را با دامنه خودتان عوض کنید.',
              'Declaring a Custom Domain in the config file for Café Sahar. For your own project, replace `cafe-sahar.ir` with your domain.',
            ),
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Codex:** همان قدم‌های بالا. از Codex بخواهید `routes` را در `wrangler.jsonc` اضافه کند، Pull Request بدهد و بعد از Deploy با `curl` نشان دهد `https://cafe-sahar.ir` جواب 200 می‌دهد. Custom Domain روی Cloudflare هزینه جداگانه‌ای ندارد.',
                  '**On the Codex path:** the steps above. Ask Codex to add `routes` to `wrangler.jsonc`, open a pull request, and after the deploy show with `curl` that `https://cafe-sahar.ir` returns 200. A Custom Domain on Cloudflare has no separate charge.',
                ),
              },
            ],
            lovable: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Lovable:** دامنه اختصاصی در Lovable به پلن پولی (Pro به بالا) نیاز دارد. سه راه دارید: دامنه را از خود Lovable بخرید، دامنه‌ای را که دارید وصل کنید (رکوردهای DNS که Lovable می‌دهد را اضافه کنید، رکوردهای MX را نگه دارید و رکوردهای A، AAAA یا CNAME متضاد روی همان نام را بردارید) یا دامنه را به Lovable منتقل کنید. گواهی HTTPS خودکار است و فعال شدن ممکن است تا ۷۲ ساعت طول بکشد.',
                  '**On the Lovable path:** a custom domain in Lovable needs a paid plan (Pro and up). You have three options: buy the domain through Lovable, connect a domain you own (add the DNS records Lovable gives you, keep your MX records, and remove conflicting A, AAAA or CNAME records on that name), or transfer the domain to Lovable. HTTPS is automatic, and activation can take up to 72 hours.',
                ),
              },
              {
                type: 'callout',
                tone: 'tip',
                title: t('اگر DNS روی Cloudflare است', 'If your DNS is on Cloudflare'),
                text: t(
                  'اگر Nameserverهای `cafe-sahar.ir` را به Cloudflare داده‌اید، رکوردهایی که Lovable می‌خواهد را در پنل DNS همان Cloudflare اضافه کنید. همان قانون طلایی اینجا هم هست: هیچ رکورد ایمیلی را پاک نکنید.',
                  'If the nameservers of `cafe-sahar.ir` point to Cloudflare, add the records Lovable asks for in Cloudflare’s DNS panel. The same golden rule applies: delete no email records.',
                ),
              },
            ],
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
              'همان‌طور که در فصل‌های قبل گفتیم، دسترسی به سرویس‌های Cloudflare در بعضی کشورها، از جمله ایران، ممکن است با محدودیت یا فیلترینگ روبه‌رو شود. اگر مخاطبان اصلی‌تان در چنین جایی هستند، قبل از انتشار نهایی، دسترسی سایت را از شبکه‌های مختلف همان منطقه بسنجید و بخش «نقشه B» پایین همین فصل را بخوانید.',
              'As mentioned in earlier chapters, Cloudflare services can face restrictions or filtering in some countries, including Iran. If your main audience is in such a place, test reachability from several local networks before the final launch, and read the "Plan B" section at the end of this chapter.',
            ),
          },
          {
            type: 'prompt',
            title: t('از Agent بخواهید دامنه را وصل کند', 'Ask your agent to attach the domain'),
            text: t(
              'دامنه cafe-sahar.ir روی Cloudflare فعال شده است. لطفاً:\n۱. آن را به‌عنوان Custom Domain به Worker همین پروژه وصل کن (از طریق wrangler.jsonc).\n۲. یک Redirect Rule برای www.cafe-sahar.ir به cafe-sahar.ir پیشنهاد بده و بگو چه رکورد DNS لازم دارد.\n۳. قبل از هر تغییر DNS، فهرست رکوردهای فعلی، به‌خصوص MX و TXT ایمیل، را به من نشان بده و هیچ‌کدام را حذف نکن.\n۴. در پایان با curl نشان بده که https://cafe-sahar.ir پاسخ 200 می‌دهد.',
              'The domain cafe-sahar.ir is active on Cloudflare. Please:\n1. Attach it as a Custom Domain to this project’s Worker (via wrangler.jsonc).\n2. Propose a Redirect Rule from www.cafe-sahar.ir to cafe-sahar.ir and tell me which DNS record it needs.\n3. Before any DNS change, show me the current records, especially the email MX and TXT ones, and do not delete any of them.\n4. At the end, show with curl that https://cafe-sahar.ir returns 200.',
            ),
          },
          {
            type: 'quiz',
            q: t(
              'قبل از عوض‌کردن Nameserverهای cafe-sahar.ir، مهم‌ترین کار برای سالم ماندن ایمیل‌های دامنه چیست؟',
              'Before changing the nameservers of cafe-sahar.ir, what matters most so the domain’s email keeps working?',
            ),
            options: [
              t('اول همه رکوردهای قدیمی را پاک کنید تا Zone کاملاً تمیز شروع شود.', 'Delete all the old records first to start with a clean zone.'),
              t('HTTPS را تا فعال شدن کامل Nameserverهای جدید خاموش کنید.', 'Turn off HTTPS until the new nameservers are fully active.'),
              t('یک Worker تازه بسازید تا دامنه جایی برای رفتن داشته باشد.', 'Create a brand-new Worker so the domain has somewhere to go.'),
              t('از رکوردها نسخه بگیرید و MX، SPF، DKIM و DMARC را چک کنید.', 'Copy all records and confirm MX, SPF, DKIM, DMARC exist.'),
            ],
            answer: 3,
            explain: t(
              'بعد از تغییر Nameserver، فقط رکوردهایی که در Cloudflare هستند جواب داده می‌شوند. اگر رکوردهای ایمیل جا بیفتند، ایمیل‌ها نمی‌رسند.',
              'After the nameserver change, only records that exist in Cloudflare get answered. If the email records are missing, mail stops arriving.',
            ),
            why: [
              t('پاک کردن رکوردها دقیقاً همان چیزی است که ایمیل را از کار می‌اندازد.', 'Deleting records is exactly what breaks email.'),
              t('HTTPS ربطی به ایمیل ندارد و خاموش کردنش فقط سایت را ناامن می‌کند.', 'HTTPS has nothing to do with email; turning it off only makes the site insecure.'),
              t('Worker برای سایت است؛ ایمیل به رکوردهای MX و همراهانش وابسته است.', 'The Worker is for the site; email depends on MX and its companion records.'),
              t('درست است: نسخه کامل از رکوردها و اطمینان از وجود رکوردهای ایمیل در Cloudflare.', 'Right: a full copy of the records, and making sure the email records exist in Cloudflare.'),
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Cloudflare: Add a site', url: 'https://developers.cloudflare.com/fundamentals/manage-domains/add-site/' },
              { label: 'Cloudflare DNS: Full setup (change nameservers)', url: 'https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/' },
              { label: 'Workers: Custom Domains', url: 'https://developers.cloudflare.com/workers/configuration/routing/custom-domains/' },
              { label: 'Redirect www to root domain', url: 'https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/' },
              { label: 'SSL/TLS encryption modes', url: 'https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/' },
              { label: 'Lovable: Launch on a custom domain', url: 'https://docs.lovable.dev/tips-tricks/launch-on-a-custom-domain' },
            ],
          },
        ],
      },
      {
        id: 'plan-b-iran',
        title: t('نقشه B: اگر Cloudflare برای مخاطبان داخل ایران در دسترس نبود', 'Plan B: if Cloudflare is unreachable for visitors in Iran'),
        blocks: [
          {
            type: 'p',
            text: t(
              'Cloudflare در ایران سرور ندارد و در دوره‌های فیلترینگ شدید، معمولاً جزو اولین سرویس‌هایی است که آسیب می‌بیند. اگر بیشتر مشتری‌های کافه سحر داخل ایران هستند، خوب است یک **نسخه آینه (Mirror)** روی یک میزبان ایرانی داشته باشید. ایده ساده است: همان Build سایت را دو جا منتشر کنید و هر دامنه را به یکی وصل کنید.',
              'Cloudflare has no servers inside Iran, and during heavy filtering it is often among the first services affected. If most of Café Sahar’s customers are in Iran, it is worth keeping a **mirror** on an Iranian host. The idea is simple: publish the same site build in two places and point each domain at one of them.',
            ),
          },
          {
            type: 'compare',
            headers: [t('گزینه', 'Option'), t('چه چیزی ارائه می‌دهد', 'What it offers'), t('مناسب برای', 'Good for')],
            rows: [
              [
                t('**Liara (لیارا)**', '**Liara**'),
                t('میزبانی ابری ایرانی (PaaS)، Object Storage، Database مدیریت‌شده، DNS و ابزار خط فرمان با دستور `liara deploy`.', 'Iranian cloud hosting (PaaS), object storage, managed databases, DNS, and a command-line tool with `liara deploy`.'),
                t('آینه کامل سایت، چه استاتیک چه با سرور', 'A full mirror, static or with a server'),
              ],
              [
                t('**Hamravesh (هم‌روش) / Darkube**', '**Hamravesh / Darkube**'),
                t('ابر مبتنی بر Kubernetes؛ Darkube برای اجرای اپ‌های Container، به‌همراه Database مدیریت‌شده.', 'Kubernetes-based cloud; Darkube runs containerized apps, with managed databases.'),
                t('اپ‌هایی که به‌صورت Container آماده‌اند', 'Apps already packaged as containers'),
              ],
              [
                t('**ArvanCloud (ابرآروان)**', '**ArvanCloud**'),
                t('معمولاً CDN، DNS، سرور ابری و Object Storage معرفی می‌شود؛ فهرست دقیق و به‌روز را در سایت خود سرویس ببینید.', 'Usually described as CDN, DNS, cloud servers and object storage; check the provider’s own site for the current list.'),
                t('بعد از بررسی سایت سرویس', 'After checking the provider’s site'),
              ],
              [
                t('**دامنه .ir (IRNIC)**', '**.ir domain (IRNIC)**'),
                t('ثبت دامنه .ir از طریق ایرنیک یا نمایندگان رسمی آن؛ شرایط ثبت را در سایت ایرنیک بخوانید.', 'Registering .ir through IRNIC or its approved registrars; read the current rules on IRNIC’s site.'),
                t('آدرس محلی و آشنا برای مخاطب ایرانی', 'A familiar local address for Iranian visitors'),
              ],
            ],
          },
          {
            type: 'steps',
            items: [
              {
                title: t('Build را قابل‌حمل نگه دارید', 'Keep the build portable'),
                text: t(
                  'خروجی `npm run build` (پوشه `dist`) برای یک سایت استاتیک روی هر میزبان یا Object Storage کار می‌کند. اپ‌هایی که سرور دارند (مثل اپ‌های جدید Lovable با TanStack Start) به یک PaaS نیاز دارند، نه فقط فضای فایل.',
                  'The output of `npm run build` (the `dist` folder) works on any host or object storage for a static site. Apps with a server part (such as new Lovable apps on TanStack Start) need a PaaS, not just file storage.',
                ),
              },
              {
                title: t('همان Build را روی میزبان ایرانی منتشر کنید', 'Publish the same build on the Iranian host'),
                text: t(
                  'مثلاً با `liara deploy` روی Liara، یا به‌صورت Container روی Darkube. از Agent بخواهید یک اسکریپت انتشار جدا برای آینه بنویسد تا هر بار همان نسخه دو جا برود.',
                  'For example with `liara deploy` on Liara, or as a container on Darkube. Ask your agent for a separate deploy script for the mirror so the same version goes to both places each time.',
                ),
              },
              {
                title: t('دامنه‌ها را جدا کنید', 'Split the domains'),
                text: t(
                  'در این دوره `cafe-sahar.ir` روی Cloudflare است. اگر مخاطب اصلی‌تان داخل ایران است، می‌توانید نقش‌ها را عوض کنید: یک دامنه بین‌المللی (مثلاً `cafe-sahar.com`) روی Cloudflare و Worker، و `cafe-sahar.ir` روی آینه ایرانی. هر دامنه در پنل DNS خودش مدیریت شود؛ قاطی‌کردن هر دو در یک Zone فقط برای کسی است که Geo-DNS را خوب می‌شناسد.',
                  'In this course `cafe-sahar.ir` sits on Cloudflare. If your main audience is inside Iran, you can swap the roles: an international domain (for example `cafe-sahar.com`) on Cloudflare and the Worker, and `cafe-sahar.ir` on the Iranian mirror. Manage each domain in its own DNS panel; mixing both in one zone is only for people who know geo-DNS well.',
                ),
              },
              {
                title: t('درباره Backend تصمیم بگیرید', 'Decide about the backend'),
                text: t(
                  'D1 و Workerهای Cloudflare روی شبکه بین‌المللی می‌مانند. برای فرم رزرو روی آینه، یا از Database همان میزبان ایرانی استفاده کنید یا آینه را فقط‌خواندنی نگه دارید (منو و ساعت کاری، با شماره تماس برای رزرو).',
                  'D1 and Cloudflare Workers stay on the international network. For booking on the mirror, either use the Iranian host’s own database or keep the mirror read-only (menu and opening hours, with a phone number for bookings).',
                ),
              },
              {
                title: t('از شبکه مخاطب تست کنید', 'Test from your audience’s network'),
                text: t(
                  'دسترسی هر سرویس از داخل ایران با گذشت زمان تغییر می‌کند. قبل از اعلام، هر دو آدرس را از چند اپراتور موبایل و اینترنت خانگی باز کنید.',
                  'Whether a service is reachable from inside Iran changes over time. Before announcing, open both addresses from several mobile carriers and home connections.',
                ),
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: t('دو نسخه یعنی دو برابر دقت', 'Two copies mean twice the care'),
            text: t(
              'هر تغییری باید به هر دو نسخه برسد، وگرنه منو یا ساعت کاری در یکی قدیمی می‌ماند. برای همین انتشار هر دو را در همان خط تولید CI/CD بگذارید و در `AGENTS.md` بنویسید که پروژه یک آینه دارد.',
              'Every change has to reach both copies, or the menu or opening hours go stale in one of them. So put both deploys in the same CI/CD pipeline, and note in `AGENTS.md` that the project has a mirror.',
            ),
          },
          {
            type: 'prompt',
            title: t('از Agent بخواهید آینه را آماده کند', 'Ask your agent to prepare the mirror'),
            text: t(
              'کافه سحر روی Cloudflare Workers منتشر شده است. می‌خواهم یک آینه روی Liara برای بازدیدکننده‌های داخل ایران داشته باشم:\n۱. بررسی کن Build ما (`npm run build` و پوشه dist) بدون Worker هم کامل کار می‌کند یا نه، و هر بخشی که به Worker یا D1 وابسته است را فهرست کن.\n۲. پیشنهاد بده آینه فقط‌خواندنی باشد (منو، ساعت کاری، شماره تماس) و فرم رزرو در آن به تماس تلفنی تبدیل شود.\n۳. یک اسکریپت انتشار جدا برای Liara بنویس و آن را به همان GitHub Actions اضافه کن، ولی هیچ Token یا Secretی را در کد نگذار؛ بگو کدام Secret را کجا بسازم.\n۴. در AGENTS.md یک بخش «آینه ایران» اضافه کن.\nقبل از هر تغییر، برنامه را نشان بده و منتظر تأیید من بمان.',
              'Café Sahar is published on Cloudflare Workers. I want a mirror on Liara for visitors inside Iran:\n1. Check whether our build (`npm run build` and the dist folder) fully works without the Worker, and list every part that depends on the Worker or D1.\n2. Propose a read-only mirror (menu, opening hours, phone number) where the booking form becomes a phone call.\n3. Write a separate deploy script for Liara and add it to the same GitHub Actions workflow, but put no token or secret in the code; tell me which secret to create where.\n4. Add a "Iran mirror" section to AGENTS.md.\nShow me the plan before changing anything and wait for my approval.',
            ),
          },
          {
            type: 'links',
            items: [
              { label: 'Liara documentation', url: 'https://docs.liara.ir/' },
              { label: 'Hamravesh', url: 'https://hamravesh.com/' },
              { label: 'IANA: .ir delegation record', url: 'https://www.iana.org/domains/root/db/ir.html' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'اینجا همه مفاهیم پرده اول به هم می‌رسند: Registrar و Nameserver از فصل DNS، Worker از فصل Cloudflare، و خط تولید فصل قبل. از این به بعد، هر Push به main مستقیم روی cafe-sahar.ir دیده می‌شود. فصل بعد درباره این است که مردم کافه را در گوگل پیدا کنند (Title و Description، پیش‌نمایش اشتراک، Sitemap و Search Console)، و بعد از آن سراغ امن و سالم نگه‌داشتن سایت زنده می‌رویم.',
      'Here the ideas from Act I meet: the registrar and nameservers from the DNS chapter, the Worker from the Cloudflare chapter, and the pipeline from the previous chapter. From now on, every push to main shows up on cafe-sahar.ir. Next: helping people find the café on Google (titles and descriptions, share previews, a sitemap and Search Console), and after that, keeping the live site safe and healthy.',
    ),
    takeaways: [
      t('قبل از جابه‌جایی DNS از همه رکوردها، به‌خصوص ایمیل، نسخه بگیرید.', 'Copy every DNS record, especially email ones, before moving DNS.'),
      t('دامنه را به Cloudflare اضافه کنید، Nameserverها را در Registrar عوض کنید و تا فعال‌شدن Zone صبر کنید.', 'Add the domain to Cloudflare, change nameservers at the registrar, and wait for the zone to activate.'),
      t('Custom Domain روی Worker، رکورد DNS و گواهی HTTPS را خودکار می‌سازد.', 'A Custom Domain on a Worker creates the DNS record and HTTPS certificate automatically.'),
      t('برای www یک Redirect Rule بسازید؛ اگر سرور جدا دارید از Full (strict) استفاده کنید.', 'Add a Redirect Rule for www; use Full (strict) if you have a separate origin server.'),
      t('برای مخاطبان داخل ایران، یک آینه روی میزبان ایرانی با دامنه جدا، نقشه B شماست.', 'For visitors inside Iran, a mirror on an Iranian host with its own domain is your plan B.'),
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
    minutes: 20,
    mascotLine: t(
      'سایت را ساختیم، حالا باید مثل یک باغچه به آن رسیدگی کنیم. کمی مراقبت منظم، از یک نجات اضطراری خیلی ارزان‌تر است.',
      'We built the site; now we tend it like a garden. A little regular care is far cheaper than an emergency rescue.',
    ),
    mission: {
      outcome: t(
        'بعد از این فصل می‌دانید چطور قفل‌های اصلی (2FA، Secretها، Turnstile) را ببندید، اگر کلیدی لو رفت چه کنید، و سایت را با یک چک‌لیست ماهانه سالم نگه دارید.',
        'After this chapter you know how to lock the main doors (2FA, secrets, Turnstile), what to do when a key leaks, and how to keep the site healthy with a monthly checklist.',
      ),
      cafe: t(
        'فرم رزرو کافه سحر با Turnstile محافظت می‌شود و هیچ Secretی در کد نیست.',
        'Café Sahar’s booking form is protected by Turnstile, and no secret lives in the code.',
      ),
    },
    warmup: {
      q: t(
        'یک Sitemap برای کافه سحر چه کاری انجام می‌دهد؟',
        'What does a sitemap do for Café Sahar?',
      ),
      options: [
        t('سرعت باز شدن همه صفحه‌ها را روی موبایل بیشتر می‌کند', 'It makes every page load faster for visitors on mobile'),
        t('تصویری است که موقع اشتراک لینک در چت دیده می‌شود', 'It is the picture shown when a link is shared in chat'),
        t('همان عنوانی است که گوگل بالای هر نتیجه نشان می‌دهد', 'It is the title Google shows above each search result'),
        t('فهرست صفحه‌هاست تا موتور جست‌وجو همه را پیدا کند', 'It lists your pages so search engines find them all'),
      ],
      answer: 3,
      explain: t(
        'Sitemap فهرستی از آدرس صفحه‌هاست که به موتورهای جست‌وجو کمک می‌کند هیچ صفحه‌ای را جا نیندازند؛ معمولاً در Search Console هم معرفی‌اش می‌کنید.',
        'A sitemap is a list of your page addresses that helps search engines miss nothing; you usually submit it in Search Console too.',
      ),
      why: [
        t('سرعت به Build و تصاویر بستگی دارد، نه به Sitemap.', 'Speed depends on the build and images, not on the sitemap.'),
        t('آن تصویر پیش‌نمایش اشتراک است (مثل og:image)، نه Sitemap.', 'That is the share preview image (like og:image), not the sitemap.'),
        t('آن عنوان از تگ Title هر صفحه می‌آید.', 'That title comes from each page’s title tag.'),
        t('درست است: Sitemap نقشه صفحه‌های سایت برای موتورهای جست‌وجوست.', 'Right: a sitemap is the map of your pages for search engines.'),
      ],
    },
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
          {
            type: 'widget',
            id: 'secret-hunt',
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
            type: 'path',
            codex: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Codex:** امنیت دست خود شماست، با کمک Codex: Turnstile روی فرم رزرو با تأیید توکن در Worker (Siteverify)، Secretها با `wrangler secret put`، Queryهای پارامتری برای جدول bookings در D1، و همان Prompt بازبینی امنیتی بالا قبل از هر انتشار مهم. نتیجه را در یک Pull Request ببینید، نه فقط در گفت‌وگو.',
                  '**On the Codex path:** security is in your hands, with Codex’s help: Turnstile on the booking form with token verification in the Worker (Siteverify), secrets via `wrangler secret put`, parameterized queries for the D1 bookings table, and the security-review prompt above before every important release. Review the result in a pull request, not just in the chat.',
                ),
              },
            ],
            lovable: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Lovable:** Backend داخلی Lovable (بر پایه Supabase) قبل از انتشار، بررسی‌های خودکار انجام می‌دهد: قوانین دسترسی به Database (RLS)، ابزارهایی که عمومی در دسترس‌اند و وابستگی‌های آسیب‌پذیر. بررسی‌های پیشرفته کل کد را در هفت دسته می‌خوانند (ورود کاربران، مجوزهای دسترسی، داده‌های خصوصی، کلیدها، ورودی کاربر، کارهای اپ و پرداخت) و یافته‌ها را Critical، Warning یا Info برچسب می‌زنند. بخش Security center فقط در پلن Business به بالاست.',
                  '**On the Lovable path:** Lovable’s built-in backend (based on Supabase) runs automatic checks before publishing: database access rules (RLS), tools that are publicly reachable, and vulnerable dependencies. Advanced checks read all the code across seven categories (sign-in, access permissions, private data, keys, user input, app actions and payments) and label findings Critical, Warning or Info. The Security center is a Business-plan-and-up feature.',
                ),
              },
              {
                type: 'callout',
                tone: 'warn',
                title: t('«Publish anyway» دکمه راحتی است، نه راه حل', '"Publish anyway" is a convenience, not a fix'),
                text: t(
                  'برای کافه سحر یعنی: هر کسی بتواند رزرو **ثبت** کند، ولی رزروهای دیگران را **نخواند**. اگر بررسی امنیتی یافته Critical نشان داد، آن را با «Try to fix» یا بازبینی خودتان حل کنید و بعد منتشر کنید.',
                  'For Café Sahar this means: anyone can **create** a booking, but nobody can **read** other people’s bookings. If the security check shows a critical finding, resolve it with "Try to fix" or your own review, then publish.',
                ),
              },
            ],
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
npx wrangler d1 time-travel info cafe-sahar-db

# Restore to a moment in the past (destructive: overwrites the current data)
npx wrangler d1 time-travel restore cafe-sahar-db --timestamp=2026-11-20T10:00:00Z`,
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
              'یک Secret مثل کلید API سرویس ایمیل کافه سحر را کجا باید نگه داریم؟',
              'Where should a secret such as Café Sahar’s email service API key live?',
            ),
            options: [
              t('داخل فایل کد، درست کنار همان تابعی که ایمیل را می‌فرستد', 'In the code file, right next to the function that sends email'),
              t('روی Worker با `wrangler secret put`؛ محلی در `.dev.vars`', 'On the Worker via `wrangler secret put`; local: `.dev.vars`'),
              t('در بخش vars فایل `wrangler.jsonc`، کنار بقیه تنظیم‌های پروژه', 'In the vars section of `wrangler.jsonc`, next to other settings'),
              t('در README، تا هر توسعه‌دهنده بعدی راحت پیدایش کند', 'In the README, so every future developer can find it easily'),
            ],
            answer: 1,
            explain: t(
              'Secretها روی Worker رمزنگاری‌شده ذخیره می‌شوند و در کد دیده نمی‌شوند. `.dev.vars` فقط برای توسعه محلی است و باید در `.gitignore` باشد.',
              'Secrets are stored encrypted on the Worker and never appear in code. `.dev.vars` is only for local development and must be in `.gitignore`.',
            ),
            why: [
              t('هر چیزی که در کد باشد با اولین Push در Repository و تاریخچه‌اش می‌ماند.', 'Anything in the code lands in the repository and its history with the first push.'),
              t('درست است: Secret رمزنگاری‌شده روی Worker، و فایل محلی که هرگز Commit نمی‌شود.', 'Right: an encrypted secret on the Worker, and a local file that is never committed.'),
              t('vars برای مقادیر غیرمحرمانه است و همراه پیکربندی در Repository دیده می‌شود.', 'vars is for non-sensitive values and is visible with the config in the repository.'),
              t('README عمومی‌ترین فایل پروژه است؛ بدترین جا برای یک کلید.', 'The README is the most public file in the project; the worst place for a key.'),
            ],
          },
          {
            type: 'links',
            items: [
              { label: 'Workers: Secrets', url: 'https://developers.cloudflare.com/workers/configuration/secrets/' },
              { label: 'Turnstile: Get started', url: 'https://developers.cloudflare.com/turnstile/get-started/' },
              { label: 'WAF: Rate limiting rules', url: 'https://developers.cloudflare.com/waf/rate-limiting-rules/' },
              { label: 'D1: Time Travel and backups', url: 'https://developers.cloudflare.com/d1/reference/time-travel/' },
              { label: 'Workers Logs (observability)', url: 'https://developers.cloudflare.com/workers/observability/logs/workers-logs/' },
              { label: 'GitHub: Configuring Dependabot version updates', url: 'https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates' },
              { label: 'Lovable: Security checks', url: 'https://docs.lovable.dev/features/security' },
              { label: 'GitHub: Two-factor authentication', url: 'https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa' },
            ],
          },
        ],
      },
    ],
    connects: t(
      'امنیت از فصل اتصال Agent شروع شده بود، وقتی Tokenهای محدود ساختیم. فصل قبل کافه را در گوگل پیداشدنی کرد؛ حالا که دیده می‌شود، باید امن هم باشد. اینجا امنیت را برای سایت زنده روی cafe-sahar.ir کامل می‌کنیم. نگهداری هم همان حلقه Vibe Coding است، فقط آهسته‌تر و منظم: بررسی، تغییر کوچک، تست، انتشار.',
      'Security began in the chapter where we connected the agent and created scoped tokens. The previous chapter made the café findable on Google; now that people can see it, it has to be safe too. Here we complete security for the live site on cafe-sahar.ir. Upkeep is the same vibe coding loop, just slower and regular: review, small change, test, release.',
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
    minutes: 37,
    mascotLine: t(
      'باورم نمی‌شود! از صفر شروع کردیم و حالا شما می‌دانید یک سایت واقعی چطور از ایده به اینترنت می‌رسد. بریم اولین مأموریت را با هم انجام دهیم!',
      'I can hardly believe it! We started from zero, and now you know how a real site travels from idea to the internet. Let us do your first mission together!',
    ),
    mission: {
      outcome: t(
        'بعد از این فصل کل مسیر را در یک نگاه می‌بینید، پرده چهارم را مرور کرده‌اید و می‌دانید پروژه بعدی را چطور از ایده تا دامنه پیش ببرید.',
        'After this chapter you see the whole path at a glance, have reviewed Act IV, and know how to take your next project from idea to domain.',
      ),
      cafe: t(
        'کافه سحر کامل است: در گوگل پیدا می‌شود، امن است و نگهداری می‌شود.',
        'Café Sahar is complete: findable on Google, secure and maintained.',
      ),
    },
    warmup: {
      q: t(
        'توکن Turnstile کجا باید تأیید شود تا واقعاً از فرم رزرو محافظت کند؟',
        'Where must the Turnstile token be verified to really protect the booking form?',
      ),
      options: [
        t('فقط در مرورگر بازدیدکننده، داخل خود ویجت Turnstile', 'Only in the visitor’s browser, inside the widget itself'),
        t('روی سرور یا Worker شما، با Siteverify API', 'On your server or Worker, with the Siteverify API'),
        t('هیچ‌جا؛ نمایش ویجت به‌تنهایی کافی است', 'Nowhere; showing the widget is protection enough'),
        t('در README، تا توسعه‌دهنده‌های دیگر ببینند', 'In the README, so other developers can see it'),
      ],
      answer: 1,
      explain: t(
        'ویجت فقط توکن می‌سازد؛ محافظت واقعی وقتی است که Worker توکن را با Siteverify تأیید کند و درخواست بدون توکن معتبر را رد کند.',
        'The widget only produces a token; real protection happens when the Worker verifies it with Siteverify and rejects requests without a valid one.',
      ),
      why: [
        t('ربات می‌تواند مستقیم به سرور درخواست بفرستد و ویجت را دور بزند.', 'A bot can call the server directly and skip the widget.'),
        t('درست است: تأیید سمت سرور، توکن را واقعاً بررسی می‌کند.', 'Right: server-side verification actually checks the token.'),
        t('نمایش ویجت بدون تأیید، فقط ظاهر محافظت است.', 'Showing the widget without verification is protection in looks only.'),
        t('README جای مستندات است، نه بخشی از محافظت.', 'The README is for documentation, not part of the protection.'),
      ],
    },
    sections: [
      {
        id: 'act-4-review',
        title: t('مرور پرده چهارم', 'Act IV review'),
        blocks: [
          {
            type: 'p',
            text: t(
              'قبل از جشن، یک مرور کوتاه از پرده چهارم: تست، CI/CD، دامنه اختصاصی، دیده‌شدن در گوگل و امنیت. پنج سؤال، هر کدام از یک فصل.',
              'Before the celebration, a quick review of Act IV: testing, CI/CD, your own domain, getting found on Google, and security. Five questions, one from each chapter.',
            ),
          },
          {
            type: 'review',
            title: t('مرور پرده چهارم: پنج سؤال', 'Act IV review: five questions'),
            items: [
          {
            q: t('تستی هیچ‌وقت شکست نخورده است. از Agent چه بخواهید؟', 'A test has never failed once. What should you ask the agent?'),
            options: [
              t('حذفش کن، چون تستی که همیشه پاس می‌شود به درد نمی‌خورد', 'Delete it, because a test that always passes is not useful'),
              t('کاری نداشته باش؛ تست سبز یعنی قابلیت درست کار می‌کند', 'Leave it alone; a green test means the feature is correct'),
              t('اول بدون اصلاح اجرایش کن و نشان بده قرمز می‌شود', 'Run it without the fix first and show that it turns red'),
              t('چند تست دیگر که پاس می‌شوند اضافه کن تا سبزتر شود', 'Add more tests that also pass, so the suite looks greener'),
            ],
            answer: 2,
            explain: t('تستی که هیچ‌وقت قرمز نشده، شاید چیزی را نمی‌سنجد. قرمز بعد سبز، شاهد واقعی است.', 'A test that has never gone red may check nothing. Red, then green, is real evidence.'),
            why: [
              t('شاید تست درست باشد؛ اول باید ثابت شود، نه اینکه پاک شود.', 'The test may be fine; first prove it, do not delete it.'),
              t('سبز بودن تنها، ثابت نمی‌کند تست چیزی را چک می‌کند.', 'Being green alone does not prove the test checks anything.'),
              t('درست است: دیدن قرمز شدن بدون اصلاح، ثابت می‌کند تست واقعاً می‌سنجد.', 'Right: seeing it fail without the fix proves it really measures something.'),
              t('تست‌های سبز بیشتر، اگر چیزی نسنجند، فقط حس امنیت کاذب می‌دهند.', 'More green tests that check nothing only add false confidence.'),
            ],
          },
          {
            q: t('یک انتشار تازه صفحه رزرو کافه را خراب کرد. اول چه کنید؟', 'A new release just broke the café’s booking page. What comes first?'),
            options: [
              t('به نسخه سالم قبلی Rollback کنید، بعد با آرامش Debug کنید', 'Roll back to the last healthy version, then debug calmly'),
              t('با بیشترین سرعت ممکن، کد را مستقیم روی سرور زنده درست کنید', 'Fix the code live on the server as fast as you possibly can'),
              t('D1 را بازیابی کنید، چون Rollback داده را هم برمی‌گرداند', 'Restore D1, since a rollback also brings back the data'),
              t('Worker را حذف کنید و دوباره از داشبورد بسازیدش', 'Delete the Worker and create it again from the dashboard'),
            ],
            answer: 0,
            explain: t('Rollback سایت را در چند ثانیه به نسخه سالم برمی‌گرداند و به شما وقت می‌دهد با آرامش علت را پیدا کنید.', 'A rollback restores the healthy version in seconds and gives you time to find the cause calmly.'),
            why: [
              t('درست است: اول کاربران را از خرابی نجات دهید، بعد Debug کنید.', 'Right: first get visitors out of the breakage, then debug.'),
              t('عجله روی سرور زنده، معمولاً یک خرابی دوم می‌سازد.', 'Rushing on the live server usually creates a second breakage.'),
              t('Rollback فقط کد را برمی‌گرداند، نه داده‌های D1 را.', 'A rollback only restores code, not D1 data.'),
              t('حذف Worker سایت را کاملاً از دسترس خارج می‌کند.', 'Deleting the Worker takes the site offline entirely.'),
            ],
          },
          {
            q: t('چرا دوستتان بعد از تغییر Nameserverها هنوز سایت قدیمی را می‌بیند؟', 'Why does a friend still see the old site after the nameserver change?'),
            options: [
              t('تغییر شکست خورده و باید Nameserverها را برگردانید', 'The change failed, so you should switch the nameservers back'),
              t('مرورگرش سایت جدید را تا دو بار ری‌استارت نشان نمی‌دهد', 'Their browser hides new sites until it restarts twice'),
              t('Cloudflare تا Deploy بعدی نسخه قدیمی را نشان می‌دهد', 'Cloudflare shows the old version until the next deploy'),
              t('Resolver او جواب قبلی را تا پایان TTL نگه داشته است', 'Their resolver keeps the old answer until the TTL ends'),
            ],
            answer: 3,
            explain: t('در زمان Propagation، Resolverها جواب قبلی را تا پایان TTL نگه می‌دارند. این خرابی نیست؛ کمی صبر کنید.', 'During propagation, resolvers keep the earlier answer until its TTL ends. That is not breakage; wait a little.'),
            why: [
              t('برگرداندن Nameserverها فقط Propagation را از اول شروع می‌کند.', 'Switching back only restarts propagation.'),
              t('ری‌استارت مرورگر قانون خاصی ندارد؛ مشکل در DNS است.', 'Browser restarts follow no such rule; the cause is DNS caching.'),
              t('Deploy ربطی به Nameserver ندارد.', 'Deploys have nothing to do with nameservers.'),
              t('درست است: جواب‌های DNS تا پایان TTL در Resolverها می‌مانند.', 'Right: DNS answers stay in resolvers until their TTL ends.'),
            ],
          },
          {
            q: t('کدام کار به گوگل کمک می‌کند صفحه‌های کافه سحر را با عنوان و خلاصه خوب نشان دهد؟', 'What helps Google show Café Sahar’s pages with a good title and summary?'),
            options: [
              t('یک لوگوی بزرگ‌تر در بالای همه صفحه‌های سایت کافه', 'A bigger logo image placed at the top of every page'),
              t('یک Title و Meta description روشن برای هر صفحه', 'A clear title and meta description for each page'),
              t('Workerهای بیشتر در منطقه‌های بیشتری از دنیا', 'More Workers deployed in more regions of the world'),
              t('یک دامنه طولانی‌تر با کلمه‌های جست‌وجوی بیشتر', 'A longer domain name stuffed with more search keywords'),
            ],
            answer: 1,
            explain: t('گوگل عنوان و خلاصه نتیجه را معمولاً از Title و Meta description هر صفحه برمی‌دارد.', 'Google usually takes a result’s title and summary from each page’s title and meta description.'),
            why: [
              t('لوگو برای کاربر خوب است، ولی عنوان نتیجه گوگل از آن ساخته نمی‌شود.', 'A logo helps visitors, but Google’s result title is not built from it.'),
              t('درست است: هر صفحه یک Title و Description روشن و منحصربه‌فرد.', 'Right: each page gets its own clear title and description.'),
              t('Workerها خودشان شبکه جهانی‌اند؛ تعداد بیشتر روی جست‌وجو اثری ندارد.', 'Workers already run worldwide; more of them do nothing for search.'),
              t('دامنه پر از کلمه کلیدی معمولاً اسپمی به نظر می‌رسد و کمکی نمی‌کند.', 'A keyword-stuffed domain looks spammy and does not help.'),
            ],
          },
          {
            q: t('کلید API را اشتباهی در GitHub Push کرده‌اید. قدم اول چیست؟', 'You pushed an API key to GitHub by mistake. What is the first step?'),
            options: [
              t('فایل را با یک Commit تازه پاک کنید؛ همه‌جا حذف می‌شود', 'Delete the file in a new commit; that removes it everywhere'),
              t('Repository را خصوصی کنید و مثل قبل ادامه دهید', 'Make the repository private and carry on as before'),
              t('کلید را در خود سرویس باطل کنید و یک کلید تازه بسازید', 'Revoke the key in the service and create a fresh one'),
              t('از Agent بخواهید کلید را در یک فایل دورافتاده پنهان کند', 'Ask the agent to hide the key inside an obscure file'),
            ],
            answer: 2,
            explain: t('کلیدی که لو رفته دیگر امن نیست. اول باطلش کنید تا بی‌اثر شود، بعد سراغ تمیزکاری تاریخچه بروید.', 'A leaked key is no longer safe. Revoke it first so it stops working, then clean up the history.'),
            why: [
              t('تاریخچه گیت و کپی‌های دیگران کلید را نگه می‌دارند.', 'Git history and other people’s copies still hold the key.'),
              t('ربات‌ها کلیدهای عمومی را در چند دقیقه پیدا می‌کنند؛ شاید دیر شده باشد.', 'Bots find public keys within minutes; it may already be too late.'),
              t('درست است: باطل کردن، کلید لورفته را بی‌اثر می‌کند.', 'Right: revoking makes the leaked key useless.'),
              t('پنهان کردن، لو رفتن را جبران نمی‌کند؛ کلید هنوز معتبر است.', 'Hiding it does not undo the leak; the key still works.'),
            ],
          },
            ],
          },
        ],
      },
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
              t('**انتشار:** تست، CI/CD، دامنه اختصاصی، دیده‌شدن در گوگل، امنیت و نگهداری.', '**Ship:** testing, CI/CD, your own domain, getting found on Google, security and upkeep.'),
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
        title: t('مأموریت اول: کافه سحر، این بار واقعی', 'Mission one: Café Sahar, for real this time'),
        blocks: [
          {
            type: 'p',
            text: t(
              'در طول دوره، کافه سحر تکه‌تکه ساخته شد. حالا مأموریت اول این است که همه را یک جا و واقعی انجام دهید: **سایت کافه سحر** با منو، ساعت کاری و یک **فرم رزرو میز** که رزروها را در جدول bookings در D1 ذخیره می‌کند، با Turnstile محافظت می‌شود و روی `cafe-sahar.ir` منتشر می‌شود. اگر کسب‌وکار خودتان را دارید، همین قدم‌ها را برای آن بروید؛ فقط اسم‌ها عوض می‌شوند.',
              'Throughout the course, Café Sahar was built piece by piece. Mission one is to do it all at once, for real: the **Café Sahar site** with a menu, opening hours and a **table-booking form** that saves bookings to a D1 bookings table, is protected by Turnstile, and is published on `cafe-sahar.ir`. If you have your own business, follow the same steps for it; only the names change.',
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
                  'Repository `cafe-sahar` را بسازید و مطمئن شوید Agent به آن و به Cloudflare با Tokenهای محدود دسترسی دارد (فصل اتصال Agent).',
                  'Create the `cafe-sahar` repository and make sure the agent can reach it and Cloudflare with scoped tokens (connecting the agent chapter).',
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
                  'قدم‌به‌قدم بسازید: صفحه اصلی، بعد منو و ساعت کاری، بعد فرم رزرو، بعد اتصال فرم به جدول bookings در D1. هر قدم را روی Preview ببینید و Commit کنید.',
                  'Build step by step: home page, then the menu and opening hours, then the booking form, then connecting it to the D1 bookings table. Check each step on a preview and commit.',
                ),
              },
              {
                title: t('تست و امنیت', 'Tests and security'),
                text: t(
                  'تست E2E برای فرم رزرو، Turnstile با تأیید سمت سرور، Secretها با `wrangler secret put` و یک بازبینی امنیتی از Agent.',
                  'An E2E test for the booking form, Turnstile with server-side verification, secrets via `wrangler secret put`, and a security review from the agent.',
                ),
              },
              {
                title: t('CI/CD و دامنه', 'CI/CD and domain'),
                text: t(
                  'Workers Builds یا GitHub Actions را وصل کنید، بعد `cafe-sahar.ir` را به‌عنوان Custom Domain اضافه کنید، www را Redirect کنید و Title، Description و Sitemap را برای گوگل آماده کنید.',
                  'Connect Workers Builds or GitHub Actions, then add `cafe-sahar.ir` as a Custom Domain, redirect www, and prepare titles, descriptions and a sitemap for Google.',
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
              'تو قرار است با من سایت واقعی کافه سحر را از صفر تا انتشار بسازی. لطفاً قدم‌به‌قدم کار کن و بعد از هر مرحله منتظر تأیید من بمان.\n\nپروژه: سایت کافه سحر، یک کافه کوچک محلی؛ مخاطب: ساکنان محله و رهگذرها، بیشتر با موبایل؛ زبان: فارسی با پشتیبانی RTL (و نسخه انگلیسی ساده).\nصفحه‌ها و بخش‌ها: معرفی، منو با قیمت، ساعت کاری و نقشه، رزرو میز، تماس.\nحس و ظاهر: گرم، دنج، ساده؛ رنگ‌های پیشنهادی: کرم، قهوه‌ای، یک رنگ تأکیدی مرجانی.\nفرم رزرو: نام، شماره تماس، تاریخ و ساعت، تعداد نفر؛ اعتبارسنجی روی سرور؛ ذخیره در جدول bookings در Cloudflare D1؛ محافظت با Turnstile و تأیید توکن روی سرور.\nزیرساخت: Repository گیت‌هاب cafe-sahar؛ Cloudflare Workers با Static assets؛ دامنه cafe-sahar.ir.\n\nقوانین کار:\n۱. اول یک برنامه و طرح اولیه پیشنهاد بده و تا تأیید من کد ننویس.\n۲. روی Branch جدا کار کن و برای هر قدم Pull Request باز کن.\n۳. تست بنویس و اجرا کن و خروجی واقعی را نشان بده.\n۴. هیچ Secret یا Tokenی را در کد نگذار؛ بگو کدام Secretها را باید بسازم.\n۵. روی موبایل و برای دسترس‌پذیری بررسی کن.\n۶. در پایان CI/CD را راه بینداز، دامنه را وصل کن، Title و Description و Sitemap بساز و یک AGENTS.md با تصمیم‌های پروژه بنویس.\n\n(اگر برای کسب‌وکار خودتان کار می‌کنید، اسم‌ها و جزئیات را عوض کنید.)',
              'You are going to build the real Café Sahar site with me, from zero to launch. Please work step by step and wait for my approval after each stage.\n\nProject: the Café Sahar site, a small neighbourhood café; audience: locals and passers-by, mostly on phones; language: Persian with RTL support (and a simple English version).\nPages and sections: intro, menu with prices, opening hours and map, table booking, contact.\nLook and feel: warm, cosy, simple; suggested colors: cream, coffee brown, one coral accent.\nBooking form: name, phone number, date and time, number of guests; server-side validation; saved to a bookings table in Cloudflare D1; protected by Turnstile with server-side token verification.\nInfrastructure: GitHub repository cafe-sahar; Cloudflare Workers with static assets; domain cafe-sahar.ir.\n\nWorking rules:\n1. First propose a plan and an initial design, and write no code until I approve.\n2. Work on a separate branch and open a pull request for each step.\n3. Write and run tests and show the real output.\n4. Never put a secret or token in the code; tell me which secrets I need to create.\n5. Check on mobile and for accessibility.\n6. At the end, set up CI/CD, attach the domain, create titles, descriptions and a sitemap, and write an AGENTS.md with the project decisions.\n\n(If you are building for your own business, change the names and details.)',
            ),
          },
          {
            type: 'path',
            codex: [
              {
                type: 'p',
                text: t(
                  '**در مسیر Codex:** Prompt بالا را مستقیم به Codex بدهید و همین متن را در `AGENTS.md` پروژه هم بگذارید. Codex روی Repository `cafe-sahar` کار می‌کند، Pull Request می‌دهد و Cloudflare با Workers Builds منتشر می‌کند.',
                  '**On the Codex path:** give the prompt above straight to Codex, and put the same text in the project’s `AGENTS.md`. Codex works on the `cafe-sahar` repository, opens pull requests, and Cloudflare publishes with Workers Builds.',
                ),
              },
            ],
            lovable: [
              {
                type: 'prompt',
                title: t('نسخه Lovable مأموریت', 'The Lovable version of the mission'),
                text: t(
                  'در حالت Plan، یک برنامه برای سایت کافه سحر بنویس و تا تأیید من چیزی نساز:\n- سایت فارسی با جهت RTL و فونت فارسی خوانا، مخصوص موبایل؛ بخش‌ها: معرفی، منو با قیمت، ساعت کاری و نقشه، رزرو میز، تماس.\n- حس: گرم، دنج، ساده؛ کرم و قهوه‌ای با یک رنگ تأکیدی مرجانی.\n- رزرو میز با Backend داخلی: جدول bookings (نام، شماره تماس، تاریخ و ساعت، تعداد نفر). قوانین دسترسی طوری باشد که هر بازدیدکننده بتواند رزرو ثبت کند ولی رزروهای دیگران را نخواند.\n- بعد از تأیید برنامه، در حالت Build قدم‌به‌قدم بساز و بعد از هر قدم بگو چه چیزی را بررسی کردی.\n- قبل از Publish بررسی‌های امنیتی را اجرا کن و هر یافته Critical را توضیح بده.\nتصمیم‌های پروژه را در Instructions پروژه هم بنویس.',
                  'In Plan mode, write a plan for the Café Sahar site and build nothing until I approve:\n- A Persian site, right-to-left, with a readable Persian font, designed for phones; sections: intro, menu with prices, opening hours and map, table booking, contact.\n- Feel: warm, cosy, simple; cream and coffee brown with one coral accent.\n- Table booking with the built-in backend: a bookings table (name, phone number, date and time, number of guests). Access rules must let any visitor create a booking but never read other people’s bookings.\n- Once the plan is approved, build step by step in Build mode and tell me what you checked after each step.\n- Before Publish, run the security checks and explain any critical finding.\nAlso write the project decisions into the project Instructions.',
                ),
              },
              {
                type: 'callout',
                tone: 'tip',
                title: t('دامنه و پلن', 'Domain and plan'),
                text: t(
                  'برای وصل کردن `cafe-sahar.ir` به پروژه Lovable، پلن پولی (Pro به بالا) لازم است. اگر می‌خواهید روی Cloudflare منتشر کنید، پروژه را با GitHub همگام کنید و همان مسیر فصل CI/CD را بروید.',
                  'Connecting `cafe-sahar.ir` to a Lovable project needs a paid plan (Pro and up). If you would rather publish on Cloudflare, sync the project to GitHub and follow the CI/CD chapter’s path.',
                ),
              },
            ],
          },
          {
            type: 'quiz',
            q: t(
              'در مأموریت اول، چرا از Agent می‌خواهیم «اول برنامه و طرح، بعد کد»؟',
              'In the first mission, why ask the agent for a plan and design before any code?',
            ),
            options: [
              t(
                'اصلاح برنامه از اصلاح کد ارزان‌تر است و نشان می‌دهد Agent منظور را فهمیده',
                'A plan is cheaper to fix than code, and shows the agent understood you',
              ),
              t(
                'چون Agentها تا وقتی فایل طراحی نباشد اصلاً نمی‌توانند هیچ کدی بنویسند',
                'Because agents cannot write any code at all until a design file exists',
              ),
              t(
                'چون Cloudflare پروژه‌ای را که طرح تأییدشده ندارد اصلاً منتشر نمی‌کند',
                'Because Cloudflare refuses to deploy a project without an approved design',
              ),
              t(
                'بیشتر برای اینکه Agent آهسته‌تر و با احتیاط کار کند و کار را خیلی زود تمام نکند',
                'Mostly to slow the agent down, so it does not finish the work too quickly',
              ),
            ],
            answer: 0,
            explain: t(
              'تأیید طرح، سوءتفاهم‌ها را قبل از اینکه به کد تبدیل شوند پیدا می‌کند. تغییر یک طرح چند دقیقه است، ولی بازنویسی کد ساخته‌شده خیلی بیشتر زمان می‌برد.',
              'Approving the design catches misunderstandings before they become code. Changing a design takes minutes; rewriting built code takes far longer.',
            ),
            why: [
              t(
                'درست است: سوءتفاهم در مرحله برنامه با چند جمله اصلاح می‌شود، در کد با ساعت‌ها کار.',
                'Right: a misunderstanding is fixed in a few sentences at the plan stage, but takes hours in code.',
              ),
              t(
                'Agentها بدون طرح هم کد می‌نویسند؛ مشکل این است که شاید چیز اشتباهی بنویسند.',
                'Agents write code without a design too; the problem is they may write the wrong thing.',
              ),
              t(
                'Cloudflare فقط کد را منتشر می‌کند و از طرح و تأیید شما خبری ندارد.',
                'Cloudflare only deploys code and knows nothing about your design or approval.',
              ),
              t(
                'هدف سرعت کمتر نیست؛ هدف این است که مسیر درست از اول انتخاب شود.',
                'The goal is not to be slower; it is to choose the right direction from the start.',
              ),
            ],
          },
        ],
      },
      {
        id: 'next-mission',
        title: t('مأموریت بعدی: یکی از شش کسب‌وکار دیگر', 'Next mission: one of six other businesses'),
        blocks: [
          {
            type: 'p',
            text: t(
              'بهترین راه برای اینکه مهارت تازه بماند، تکرار همان مسیر روی یک پروژه دیگر است. یکی از این شش کسب‌وکار را انتخاب کنید: نانوایی «نان شیرین»، گاری قهوه Bean & Bit، یک فروشگاه آنلاین کوچک، یک نمونه‌کار شخصی، صفحه نوبت‌دهی یک مطب، یا وبلاگ یک معلم خصوصی. تمرین پایین برای هر کدام نشان می‌دهد هر فصل دوره چه چیزی به آن اضافه می‌کند.',
              'The best way to keep a new skill is to repeat the same path on another project. Pick one of these six businesses: the Nan-e Shirin bakery, the Bean & Bit coffee cart, a small online shop, a personal portfolio, a clinic booking page, or a tutor’s blog. The lab below shows, for each one, what every chapter of the course adds to it.',
            ),
          },
          {
            type: 'widget',
            id: 'other-businesses',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: t('همان روش، اسم تازه', 'Same method, new name'),
            text: t(
              'Prompt مأموریت اول را بردارید و فقط اسم، مخاطب، صفحه‌ها و فرم را عوض کنید. اگر این بار کمتر به کتاب نگاه کردید، یعنی واقعاً یاد گرفته‌اید.',
              'Take the mission-one prompt and change only the name, audience, pages and form. If you look at the book less this time, you have really learned it.',
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
      t('مأموریت اول: کافه سحر با فرم رزرو روی D1، Turnstile، CI/CD و دامنه cafe-sahar.ir؛ بعد یکی از شش کسب‌وکار دیگر.', 'Mission one: Café Sahar with a D1 booking form, Turnstile, CI/CD and cafe-sahar.ir; then one of six other businesses.'),
      t('همیشه: اول طرح، قدم‌های کوچک، تست با شواهد، انتشار امن.', 'Always: design first, small steps, evidence-backed tests, safe release.'),
      t('اولین سایت قرار نیست کامل باشد؛ قرار است منتشر شود.', 'Your first site does not need to be perfect; it needs to ship.'),
    ],
  },
];
