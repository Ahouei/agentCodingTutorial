import type { Act, Chapter } from './types';
import { foundations } from './chapters/foundations';
import { platform } from './chapters/platform';
import { workshop } from './chapters/workshop';
import { building } from './chapters/building';
import { shipping } from './chapters/shipping';

export const ACTS: Act[] = [
  {
    id: 1,
    title: { fa: 'پرده اول: دنیا را بشناس', en: 'Act I: Understand the world' },
    subtitle: {
      fa: 'وب چطور کار می‌کند و این Agentها دقیقاً چه کسانی هستند',
      en: 'How the web works, and who these agents really are',
    },
  },
  {
    id: 2,
    title: { fa: 'پرده دوم: کارگاه را بچین', en: 'Act II: Set up the workshop' },
    subtitle: {
      fa: 'حساب‌ها، ابزارها و اتصال امن Agent به GitHub و Cloudflare',
      en: 'Accounts, tools, and a safe connection between your agent, GitHub and Cloudflare',
    },
  },
  {
    id: 3,
    title: { fa: 'پرده سوم: بساز', en: 'Act III: Build' },
    subtitle: {
      fa: 'تعریف پروژه، Prompt خوب، طرح اولیه و حلقه Vibe Coding',
      en: 'Define the project, write good prompts, approve a design, and run the vibe coding loop',
    },
  },
  {
    id: 4,
    title: { fa: 'پرده چهارم: منتشر کن', en: 'Act IV: Ship it' },
    subtitle: {
      fa: 'تست، استقرار خودکار، دامنه اختصاصی، امنیت و نگهداری',
      en: 'Testing, automatic deployment, your own domain, security and upkeep',
    },
  },
];

export const CHAPTERS: Chapter[] = [...foundations, ...platform, ...workshop, ...building, ...shipping];

export function chapterIndex(slug: string): number {
  return CHAPTERS.findIndex((c) => c.slug === slug);
}
