/**
 * Maps progress keys back to course content, so the admin sees questions and labs by name.
 * Key formats match the learner UI: `<slug>:w` (warm-up), `<slug>:q<n>` (quiz), `<slug>:r<n>` (act review).
 */
import { CHAPTERS } from '../content';
import type { Block, L } from '../content/types';

export type QuizInfo = { key: string; slug: string; chapter: number; kind: 'warmup' | 'quiz' | 'review'; q: L };
export type LabInfo = { id: string; slug: string; chapter: number };

export const QUIZZES: QuizInfo[] = [];
export const LABS: LabInfo[] = [];

CHAPTERS.forEach((c, i) => {
  if (c.warmup) QUIZZES.push({ key: `${c.slug}:w`, slug: c.slug, chapter: i, kind: 'warmup', q: c.warmup.q });
  let q = 0;
  const seen = new Set<string>();
  const walk = (blocks: Block[]) => {
    for (const b of blocks) {
      if (b.type === 'quiz') QUIZZES.push({ key: `${c.slug}:q${q++}`, slug: c.slug, chapter: i, kind: 'quiz', q: b.q });
      else if (b.type === 'review') b.items.forEach((it, j) => QUIZZES.push({ key: `${c.slug}:r${j}`, slug: c.slug, chapter: i, kind: 'review', q: it.q }));
      else if (b.type === 'widget' && !seen.has(b.id)) {
        seen.add(b.id);
        LABS.push({ id: b.id, slug: c.slug, chapter: i });
      } else if (b.type === 'path') walk(b.codex);
    }
  };
  c.sections.forEach((s) => walk(s.blocks));
});

export const LAB_NAMES: Record<string, L> = {
  'team-to-agent': { fa: 'از تیم تا ایجنت', en: 'Team to agent' },
  'request-journey': { fa: 'سفر یک درخواست', en: 'Request journey' },
  'stack-layers': { fa: 'لایه‌های وب', en: 'Stack layers' },
  'dns-lookup': { fa: 'جست‌وجوی DNS', en: 'DNS lookup' },
  'git-playground': { fa: 'زمین بازی Git', en: 'Git playground' },
  'storage-picker': { fa: 'انتخاب ذخیره‌سازی', en: 'Storage picker' },
  'chat-vs-agent': { fa: 'چت در برابر ایجنت', en: 'Chat vs agent' },
  'agent-loop': { fa: 'حلقه ایجنت', en: 'Agent loop' },
  'setup-checklist': { fa: 'چک‌لیست راه‌اندازی', en: 'Setup checklist' },
  'token-builder': { fa: 'ساخت توکن', en: 'Token builder' },
  'brief-builder': { fa: 'ساخت بریف', en: 'Brief builder' },
  'prompt-lab': { fa: 'آزمایشگاه پرامپت', en: 'Prompt lab' },
  'vibe-loop': { fa: 'حلقه Vibe Coding', en: 'Vibe loop' },
  'bug-report': { fa: 'گزارش باگ', en: 'Bug report' },
  pipeline: { fa: 'خط انتشار', en: 'Pipeline' },
  'nameserver-switch': { fa: 'تغییر Nameserver', en: 'Nameserver switch' },
  'hero-finale': { fa: 'پایان قهرمان', en: 'Hero finale' },
  'agent-picker': { fa: 'کدام ایجنت برای من؟', en: 'Agent picker' },
  'design-flaws': { fa: 'پنج ایراد طراحی', en: 'Design flaws' },
  'secret-hunt': { fa: 'شکار راز لو رفته', en: 'Secret hunt' },
  'platform-compare': { fa: 'مقایسه پلتفرم‌ها', en: 'Platform compare' },
  'other-businesses': { fa: 'کسب‌وکارهای دیگر', en: 'Other businesses' },
  'skill-homes': { fa: 'یک Skill، سه خانه', en: 'One skill, three homes' },
};
