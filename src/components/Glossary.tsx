import { useMemo, useState } from 'react';
import { GLOSSARY_LIST } from '../content/glossary';
import { href, num, useApp, useTx } from '../lib/app';
import { usePageTitle } from '../lib/title';
import { Rich } from './blocks/Rich';
import { Mascot } from './Mascot';
import './glossary.css';

/** Every term from every chapter, searchable in both languages. */
export function Glossary() {
  const { t, lang } = useApp();
  const tx = useTx();
  const [q, setQ] = useState('');
  usePageTitle(tx('واژه‌نامه', 'Glossary'), lang);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return GLOSSARY_LIST;
    return GLOSSARY_LIST.filter((e) => e.term.toLowerCase().includes(s) || e.def.fa.includes(q.trim()) || e.def.en.toLowerCase().includes(s));
  }, [q]);

  return (
    <main id="main" className="wrap gl">
      <header className="gl-head">
        <Mascot size={84} mood="happy" />
        <div>
          <p className="eyebrow">{tx('همه اصطلاح‌های دوره', 'Every term in the course')}</p>
          <h1 className="display gl-title">{tx('واژه‌نامه', 'Glossary')}</h1>
          <p className="muted">
            {tx(`${num(GLOSSARY_LIST.length, lang)} اصطلاح، هر کدام با پیوند به فصلی که آن را آموزش می‌دهد.`, `${GLOSSARY_LIST.length} terms, each linked to the chapter that teaches it.`)}
          </p>
        </div>
      </header>
      <label className="sr-only" htmlFor="gl-q">
        {tx('جست‌وجو', 'Search')}
      </label>
      <input
        id="gl-q"
        className="gl-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={tx('جست‌وجو: مثلاً DNS یا دیتابیس', 'Search: e.g. DNS or database')}
        dir="auto"
      />
      <p className="sr-only" aria-live="polite">
        {tx(`${num(list.length, lang)} نتیجه`, `${list.length} results`)}
      </p>
      <dl className="gl-list">
        {list.map((e) => (
          <div key={e.term} className="gl-item" id={`t-${e.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
            <dt className="ltr">{e.term}</dt>
            <dd>
              <Rich text={t(e.def)} />
              <a className="gl-from" href={href.chapter(e.slug, e.section)}>
                {tx('در فصل:', 'In:')} {t(e.chapterTitle)}
              </a>
            </dd>
          </div>
        ))}
      </dl>
      {list.length === 0 && <p className="muted">{tx('چیزی پیدا نشد.', 'Nothing found.')}</p>}
    </main>
  );
}
