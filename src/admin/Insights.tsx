/** Overview (people, sign-in, the chapter funnel) and Content (question accuracy, lab completion). */
import { useMemo, useState } from 'react';
import { CHAPTERS } from '../content';
import { href, useApp, useTx } from '../lib/app';
import { Rich } from '../components/blocks/Rich';
import { api, type Overview } from './api';
import { LAB_NAMES, LABS, QUIZZES } from './contentIndex';
import { Bar, Chip, Empty, ErrorNote, Loading, Section, Stat, useFmt } from './ui';
import { useLoad } from './useLoad';

export function useOverview() {
  return useLoad(() => api.get<Overview>('/overview'));
}

export function OverviewPanel() {
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useOverview();
  if (error) return <ErrorNote error={error} retry={reload} />;
  if (loading && !data) return <Loading />;
  if (!data) return null;
  const u = data.users;
  const L = data.learning;
  const finished = Object.entries(L.doneHist).reduce((s, [k, n]) => (Number(k) >= CHAPTERS.length ? s + n : s), 0);
  const email = data.emailsToday;
  return (
    <>
      <div className="adm-stats">
        <Stat label={tx('حساب‌ها', 'Accounts')} value={f.n(u.total)} sub={tx(`${f.n(u.new7)} تازه در ۷ روز`, `${f.n(u.new7)} new in 7 days`)} tone="sky" />
        <Stat label={tx('فعال در ۷ روز', 'Active, 7 days')} value={f.n(u.active7)} sub={tx(`${f.n(u.liveSessions)} نشست باز`, `${f.n(u.liveSessions)} open sessions`)} tone="mint" />
        <Stat label={tx('دوره را تمام کرده‌اند', 'Finished the course')} value={f.n(finished)} sub={f.pct(finished, L.learners)} tone="butter" />
        <Stat
          label={tx('ورود در ۲۴ ساعت', 'Sign-ins, 24h')}
          value={`${f.n(data.signin24h.used)}/${f.n(data.signin24h.sent)}`}
          sub={tx('پیوند باز شده / فرستاده', 'links used / sent')}
        />
        <Stat
          label={tx('ایمیل امروز', 'Emails today')}
          value={`${f.n(email.sent)}/${f.n(email.cap)}`}
          sub={<Bar value={email.cap ? email.sent / email.cap : 1} tone={email.cap && email.sent / email.cap > 0.8 ? 'coral' : 'mint'} />}
          tone={email.cap && email.sent / email.cap > 0.8 ? 'coral' : undefined}
        />
      </div>

      {(!data.settings.signin_enabled || data.settings.registration_mode !== 'open') && (
        <p className="adm-warn" role="status">
          {!data.settings.signin_enabled && tx('ورود برای یادگیرنده‌ها متوقف است. ', 'Sign-in is paused for learners. ')}
          {data.settings.registration_mode === 'closed' && tx('ثبت‌نام بسته است. ', 'Registration is closed. ')}
          {data.settings.registration_mode === 'invite' && tx('ثبت‌نام فقط با کد دعوت. ', 'Registration is invite-only. ')}
          <a href={href.admin('settings')}>{tx('تنظیمات', 'Settings')}</a>
        </p>
      )}

      <Section title={tx('ثبت‌نام‌ها در ۳۰ روز', 'Sign-ups, last 30 days')}>
        <Signups data={data} />
      </Section>

      <Section
        title={tx('قیف فصل‌ها', 'Chapter funnel')}
        sub={tx(
          `از ${f.n(L.learners)} یادگیرنده‌ای که پیشرفتشان همگام است: چند نفر هر فصل را تمام کرده‌اند و الان کجا هستند. ریزش بزرگ یعنی آن فصل را بازبینی کنید.`,
          `Of ${f.n(L.learners)} learners with synced progress: how many finished each chapter, and where they are now. A big drop means that chapter needs a look.`,
        )}
      >
        <Funnel data={data} />
      </Section>
    </>
  );
}

function Signups({ data }: { data: Overview }) {
  const f = useFmt();
  const tx = useTx();
  const days = useMemo(() => {
    const today = Math.floor(data.now / 86400000);
    const by = new Map(data.signups.map((s) => [s.d, s.n]));
    return Array.from({ length: 30 }, (_, i) => ({ d: today - 29 + i, n: by.get(today - 29 + i) ?? 0 }));
  }, [data]);
  const max = Math.max(1, ...days.map((d) => d.n));
  const total = days.reduce((s, d) => s + d.n, 0);
  if (!total) return <Empty>{tx('هنوز ثبت‌نامی در ۳۰ روز گذشته نیست.', 'No sign-ups in the last 30 days yet.')}</Empty>;
  return (
    <figure className="adm-spark">
      <svg viewBox="0 0 300 64" preserveAspectRatio="none" role="img" aria-label={tx(`${f.n(total)} ثبت‌نام در ۳۰ روز`, `${f.n(total)} sign-ups in 30 days`)}>
        {days.map((d, i) => {
          const h = (d.n / max) * 56;
          return (
            <rect key={d.d} x={i * 10 + 1.5} y={62 - h} width="7" height={Math.max(h, d.n ? 2 : 1)} rx="2" className={d.n ? 'on' : 'off'}>
              <title>{`${f.date(d.d * 86400000)}: ${f.n(d.n)}`}</title>
            </rect>
          );
        })}
      </svg>
      <figcaption>
        <span>{f.date(days[0].d * 86400000)}</span>
        <b>{tx(`${f.n(total)} ثبت‌نام · بیشترین ${f.n(max)} در روز`, `${f.n(total)} sign-ups · peak ${f.n(max)}/day`)}</b>
        <span>{f.date(days[29].d * 86400000)}</span>
      </figcaption>
    </figure>
  );
}

function Funnel({ data }: { data: Overview }) {
  const { t } = useApp();
  const tx = useTx();
  const f = useFmt();
  const L = data.learning;
  if (!L.learners) return <Empty>{tx('هنوز کسی وارد نشده و پیشرفتی همگام نشده است.', 'Nobody has signed in and synced progress yet.')}</Empty>;
  return (
    <div className="tbl-wrap">
      <table className="adm-tbl">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{tx('فصل', 'Chapter')}</th>
            <th scope="col" className="w-bar">
              {tx('تمام کرده', 'Finished')}
            </th>
            <th scope="col" className="num">
              {tx('نفر', 'People')}
            </th>
            <th scope="col" className="num">
              {tx('ریزش', 'Drop')}
            </th>
            <th scope="col" className="num">
              {tx('الان اینجا', 'Here now')}
            </th>
          </tr>
        </thead>
        <tbody>
          {CHAPTERS.map((c, i) => {
            const n = L.done[c.slug] ?? 0;
            const prev = i === 0 ? L.learners : (L.done[CHAPTERS[i - 1].slug] ?? 0);
            const drop = prev ? (prev - n) / prev : 0;
            return (
              <tr key={c.slug}>
                <td className="num muted">{f.n(i + 1)}</td>
                <td>
                  <a href={href.chapter(c.slug)}>{t(c.title)}</a>
                </td>
                <td className="w-bar">
                  <Bar value={n / L.learners} tone={drop > 0.35 ? 'coral' : 'mint'} />
                </td>
                <td className="num">
                  {f.n(n)} <span className="muted">({f.pct(n, L.learners)})</span>
                </td>
                <td className="num">{drop > 0 ? <Chip tone={drop > 0.35 ? 'coral' : 'plain'}>{f.pct(prev - n, prev)}</Chip> : <span className="muted">—</span>}</td>
                <td className="num">{L.position[c.slug] ? f.n(L.position[c.slug]) : <span className="muted">—</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────── Content insights ───────────── */

export function ContentPanel() {
  const { t } = useApp();
  const tx = useTx();
  const f = useFmt();
  const { data, error, loading, reload } = useOverview();
  const [kind, setKind] = useState<'all' | 'quiz' | 'review' | 'warmup'>('all');
  if (error) return <ErrorNote error={error} retry={reload} />;
  if (loading && !data) return <Loading />;
  if (!data) return null;
  const Q = data.learning.quizzes;
  const learners = data.learning.learners;
  const rows = QUIZZES.filter((q) => kind === 'all' || q.kind === kind)
    .map((q) => ({ ...q, n: Q[q.key]?.n ?? 0, correct: Q[q.key]?.correct ?? 0 }))
    .sort((a, b) => (a.n && b.n ? a.correct / a.n - b.correct / b.n : b.n - a.n) || a.chapter - b.chapter);
  const kindLabel = { quiz: tx('سؤال', 'Quiz'), review: tx('مرور پرده', 'Act review'), warmup: tx('گرم کردن', 'Warm-up') };
  return (
    <>
      <Section
        title={tx('دقت سؤال‌ها', 'Question accuracy')}
        sub={tx('سخت‌ترین‌ها بالا هستند. پاسخ درست زیر ۵۰٪ معمولاً یعنی سؤال یا متن فصل گنگ است.', 'Hardest first. Under 50% correct usually means the question or the chapter text is unclear.')}
        actions={
          <div className="adm-seg" role="group" aria-label={tx('نوع سؤال', 'Question type')}>
            {(['all', 'quiz', 'review', 'warmup'] as const).map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
                {k === 'all' ? tx('همه', 'All') : kindLabel[k]}
              </button>
            ))}
          </div>
        }
      >
        <div className="tbl-wrap">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">{tx('سؤال', 'Question')}</th>
                <th scope="col">{tx('فصل', 'Chapter')}</th>
                <th scope="col" className="w-bar">
                  {tx('درست', 'Correct')}
                </th>
                <th scope="col" className="num">
                  {tx('پاسخ', 'Answers')}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((q) => {
                const acc = q.n ? q.correct / q.n : 0;
                return (
                  <tr key={q.key}>
                    <td className="adm-q">
                      <Chip tone={q.kind === 'review' ? 'sky' : q.kind === 'warmup' ? 'butter' : 'plain'}>{kindLabel[q.kind]}</Chip> <Rich text={t(q.q)} />
                    </td>
                    <td className="muted nowrap">
                      <a href={href.chapter(q.slug)}>{t(CHAPTERS[q.chapter].title)}</a>
                    </td>
                    <td className="w-bar">{q.n ? <Bar value={acc} tone={acc < 0.5 ? 'coral' : acc < 0.75 ? 'butter' : 'mint'} /> : <span className="muted">—</span>}</td>
                    <td className="num">
                      {q.n ? (
                        <>
                          {f.pct(q.correct, q.n)} <span className="muted">· {f.n(q.n)}</span>
                        </>
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title={tx('تمرین‌های تعاملی', 'Interactive labs')} sub={tx(`چند نفر از ${f.n(learners)} یادگیرنده هر تمرین را کامل کرده‌اند.`, `How many of ${f.n(learners)} learners completed each lab.`)}>
        <div className="tbl-wrap">
          <table className="adm-tbl">
            <thead>
              <tr>
                <th scope="col">{tx('تمرین', 'Lab')}</th>
                <th scope="col">{tx('فصل', 'Chapter')}</th>
                <th scope="col" className="w-bar">
                  {tx('کامل شده', 'Completed')}
                </th>
                <th scope="col" className="num">
                  {tx('نفر', 'People')}
                </th>
              </tr>
            </thead>
            <tbody>
              {LABS.map((l) => {
                const n = data.learning.labs[l.id] ?? 0;
                return (
                  <tr key={l.id}>
                    <td>{LAB_NAMES[l.id] ? t(LAB_NAMES[l.id]) : <code>{l.id}</code>}</td>
                    <td className="muted nowrap">
                      <a href={href.chapter(l.slug)}>{t(CHAPTERS[l.chapter].title)}</a>
                    </td>
                    <td className="w-bar">
                      <Bar value={learners ? n / learners : 0} tone="sky" />
                    </td>
                    <td className="num">
                      {f.n(n)} <span className="muted">({f.pct(n, learners)})</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
