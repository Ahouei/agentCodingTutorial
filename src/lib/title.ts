import { useEffect } from 'react';

const SITE = { fa: 'از صفر تا قهرمان', en: 'Zero to Hero' };

/** Distinct browser-tab title per page (QA-09). */
export function usePageTitle(page: string | null, lang: 'fa' | 'en') {
  useEffect(() => {
    const site = SITE[lang];
    document.title = page ? `${page} · ${site}` : lang === 'fa' ? `${site}: ساخت وب‌سایت با Agentic AI` : `${site}: build websites with agentic AI`;
  }, [page, lang]);
}
