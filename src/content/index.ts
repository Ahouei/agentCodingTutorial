import type { Act, Chapter } from './types';
import { foundations } from './chapters/foundations';
import { platform } from './chapters/platform';
import { workshop } from './chapters/workshop';
import { building } from './chapters/building';
import { shipping } from './chapters/shipping';
import { beFound, comparePlatforms } from './chapters/extra';

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

const ALL: Chapter[] = [...foundations, ...platform, comparePlatforms, ...workshop, ...building, ...shipping, beFound];

/** The course order. Slugs are stable; this list is the single source of order. */
const ORDER = [
  'welcome',
  'how-the-web-works',
  'domains-dns',
  'github',
  'cloudflare',
  'generative-vs-agentic',
  'meet-the-agents',
  'compare-platforms',
  'accounts-and-tools',
  'connect-agent',
  'project-brief',
  'prompts-and-skills',
  'design-first',
  'vibe-coding-loop',
  'testing-debugging',
  'cicd-deploy',
  'custom-domain',
  'be-found',
  'security-maintenance',
  'hero',
];

export const CHAPTERS: Chapter[] = ORDER.map((slug) => {
  const c = ALL.find((x) => x.slug === slug);
  if (!c) throw new Error(`Missing chapter: ${slug}`);
  return c;
});
if (CHAPTERS.length !== ALL.length) throw new Error('A chapter exists that is not placed in ORDER');

export function chapterIndex(slug: string): number {
  return CHAPTERS.findIndex((c) => c.slug === slug);
}
