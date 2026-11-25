/**
 * Content validator. Run: npm run validate
 *
 * Fails (exit 1) when the course content breaks a rule:
 * - every syllabus topic from the course brief is covered by its chapter(s)
 * - every widget is used exactly once, and no unknown widget is used
 * - slugs and section ids are unique and kebab-case
 * - no empty Persian or English string anywhere
 * - quiz answers point at a real option
 * - every chapter has terms, a quiz, a prompt and official links
 * - inline markers (** and `) are balanced
 */
import { foundations } from '../src/content/chapters/foundations.ts';
import { platform } from '../src/content/chapters/platform.ts';
import { workshop } from '../src/content/chapters/workshop.ts';
import { building } from '../src/content/chapters/building.ts';
import { shipping } from '../src/content/chapters/shipping.ts';
import type { Block, Chapter, L } from '../src/content/types.ts';

const CHAPTERS: Chapter[] = [...foundations, ...platform, ...workshop, ...building, ...shipping];

const WIDGETS = [
  'team-to-agent', 'request-journey', 'stack-layers', 'dns-lookup', 'git-playground', 'storage-picker',
  'chat-vs-agent', 'agent-loop', 'setup-checklist', 'token-builder', 'brief-builder', 'prompt-lab',
  'vibe-loop', 'bug-report', 'pipeline', 'nameserver-switch', 'hero-finale',
];

/** The 14 topics from the course brief, each with the chapter(s) that must teach it and terms that must appear there. */
const SYLLABUS: { topic: string; chapters: string[]; mustMention: string[] }[] = [
  { topic: 'Infrastructure needed for websites and web apps', chapters: ['how-the-web-works'], mustMention: ['Hosting'] },
  { topic: 'Frontend, Backend, Database, Hosting, Web Server', chapters: ['how-the-web-works'], mustMention: ['Frontend', 'Backend', 'Database', 'Hosting', 'Web Server'] },
  { topic: 'Domain, DNS, Nameserver', chapters: ['domains-dns'], mustMention: ['DNS', 'Nameserver', 'Registrar'] },
  { topic: 'GitHub, Repository, Version Control', chapters: ['github'], mustMention: ['Repository', 'Commit', 'Branch'] },
  { topic: 'Cloudflare: Workers, Pages, D1, KV, R2', chapters: ['cloudflare'], mustMention: ['Workers', 'Pages', 'D1', 'KV', 'R2'] },
  { topic: 'Generative AI vs Agentic AI', chapters: ['generative-vs-agentic'], mustMention: ['Generative', 'Agentic'] },
  { topic: 'OpenAI Codex and Claude Code', chapters: ['meet-the-agents'], mustMention: ['Codex', 'Claude Code'] },
  { topic: 'Accounts, tools and access', chapters: ['accounts-and-tools'], mustMention: ['GitHub', 'Cloudflare', '2FA'] },
  { topic: 'Connecting the agent to GitHub and Cloudflare', chapters: ['connect-agent'], mustMention: ['API', 'Token', 'GitHub'] },
  { topic: 'Project definition, prompt engineering, agent skills', chapters: ['project-brief', 'prompts-and-skills'], mustMention: ['AGENTS.md', 'Prompt', 'SKILL.md'] },
  { topic: 'Design: propose, review, revise, approve', chapters: ['design-first'], mustMention: ['Design'] },
  { topic: 'Vibe coding and iterative development', chapters: ['vibe-coding-loop'], mustMention: ['Vibe Coding', 'Commit'] },
  { topic: 'Testing, debugging, CI/CD, deployment', chapters: ['testing-debugging', 'cicd-deploy'], mustMention: ['Test', 'CI/CD', 'Deploy'] },
  { topic: 'Custom domain, security and maintenance', chapters: ['custom-domain', 'security-maintenance'], mustMention: ['Custom Domain', 'Secret', 'HTTPS'] },
];

const errors: string[] = [];
const err = (m: string) => errors.push(m);
const kebab = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function checkL(where: string, l: L | undefined, allowEmpty = false) {
  if (!l || typeof l.fa !== 'string' || typeof l.en !== 'string') return err(`${where}: missing localized text`);
  for (const lang of ['fa', 'en'] as const) {
    const s = l[lang];
    if (!s.trim() && !allowEmpty) err(`${where}: empty ${lang}`);
    if ((s.match(/\*\*/g) ?? []).length % 2) err(`${where}: unbalanced ** in ${lang}`);
    if ((s.match(/`/g) ?? []).length % 2) err(`${where}: unbalanced \` in ${lang}`);
  }
  // Untranslated sentence: the Persian side has no Persian letters and reads like prose.
  // Short Latin-only labels ("D1", "Claude Code", "A record") are fine in Persian text,
  // and copy-paste prompts may be English in both languages.
  const words = l.fa.trim().split(/\s+/).length;
  if (!/[\u0600-\u06FF]/.test(l.fa) && words > 6 && !where.includes('prompt.text')) err(`${where}: fa text looks untranslated`);
}

function textOf(b: Block): string {
  const parts: string[] = [];
  const push = (l?: L) => l && parts.push(l.fa, l.en);
  switch (b.type) {
    case 'p': case 'h': push(b.text); break;
    case 'callout': push(b.title); push(b.text); break;
    case 'list': b.items.forEach(push); break;
    case 'steps': b.items.forEach((s) => { push(s.title); push(s.text); }); break;
    case 'terms': b.items.forEach((t) => { parts.push(t.term); push(t.def); }); break;
    case 'compare': b.headers.forEach(push); b.rows.flat().forEach(push); break;
    case 'prompt': push(b.title); push(b.text); break;
    case 'code': parts.push(b.code); push(b.caption); break;
    case 'quiz': push(b.q); b.options.forEach(push); push(b.explain); break;
    case 'links': b.items.forEach((i) => parts.push(i.label)); break;
  }
  return parts.join('\n');
}

const slugs = new Set<string>();
const widgetUse = new Map<string, string[]>();

for (const c of CHAPTERS) {
  const at = `chapter ${c.slug}`;
  if (!kebab.test(c.slug)) err(`${at}: slug is not kebab-case`);
  if (slugs.has(c.slug)) err(`${at}: duplicate slug`);
  slugs.add(c.slug);
  for (const k of ['title', 'tagline', 'mascotLine', 'connects'] as const) checkL(`${at}.${k}`, c[k]);
  if (c.takeaways.length < 3 || c.takeaways.length > 6) err(`${at}: expected 3–6 takeaways, got ${c.takeaways.length}`);
  c.takeaways.forEach((t, i) => checkL(`${at}.takeaways[${i}]`, t));
  if (c.sections.length < 3) err(`${at}: expected at least 3 sections`);

  const ids = new Set<string>();
  const kinds = new Set<string>();
  for (const s of c.sections) {
    const sat = `${at} § ${s.id}`;
    if (!kebab.test(s.id)) err(`${sat}: id not kebab-case`);
    if (ids.has(s.id)) err(`${sat}: duplicate section id`);
    ids.add(s.id);
    checkL(`${sat}.title`, s.title);
    s.blocks.forEach((b, i) => {
      const bat = `${sat} [${i}:${b.type}]`;
      kinds.add(b.type);
      switch (b.type) {
        case 'p': case 'h': checkL(bat, b.text); break;
        case 'callout': if (b.title) checkL(`${bat}.title`, b.title); checkL(bat, b.text); break;
        case 'list': b.items.forEach((x, j) => checkL(`${bat}[${j}]`, x)); break;
        case 'steps': b.items.forEach((x, j) => { checkL(`${bat}[${j}].title`, x.title); checkL(`${bat}[${j}].text`, x.text); }); break;
        case 'terms': b.items.forEach((x) => { if (!x.term.trim()) err(`${bat}: empty term`); checkL(`${bat}.${x.term}`, x.def); }); break;
        case 'compare':
          b.headers.forEach((x, j) => checkL(`${bat}.h${j}`, x, j === 0));
          b.rows.forEach((r, j) => {
            if (r.length !== b.headers.length) err(`${bat}: row ${j} has ${r.length} cells, header has ${b.headers.length}`);
            r.forEach((x, k) => checkL(`${bat}.r${j}c${k}`, x));
          });
          break;
        case 'prompt': checkL(`${bat}.title`, b.title); checkL(`${bat}.prompt.text`, b.text); break;
        case 'code': if (!b.code.trim()) err(`${bat}: empty code`); if (b.caption) checkL(`${bat}.caption`, b.caption); break;
        case 'quiz':
          checkL(`${bat}.q`, b.q); checkL(`${bat}.explain`, b.explain);
          b.options.forEach((x, j) => checkL(`${bat}.o${j}`, x));
          if (b.options.length < 2 || b.options.length > 5) err(`${bat}: 2–5 options expected`);
          if (!Number.isInteger(b.answer) || b.answer < 0 || b.answer >= b.options.length) err(`${bat}: answer ${b.answer} out of range`);
          break;
        case 'links':
          b.items.forEach((x) => { if (!/^https:\/\//.test(x.url)) err(`${bat}: link is not https: ${x.url}`); });
          break;
        case 'widget':
          widgetUse.set(b.id, [...(widgetUse.get(b.id) ?? []), c.slug]);
          if (!WIDGETS.includes(b.id)) err(`${bat}: unknown widget ${b.id}`);
          break;
      }
    });
  }
  for (const need of ['terms', 'quiz', 'prompt', 'links']) if (!kinds.has(need)) err(`${at}: has no "${need}" block`);
}

for (const w of WIDGETS) {
  const used = widgetUse.get(w) ?? [];
  if (used.length !== 1) err(`widget ${w}: used ${used.length} times (${used.join(', ') || 'never'}), expected exactly once`);
}

for (const s of SYLLABUS) {
  const chs = CHAPTERS.filter((c) => s.chapters.includes(c.slug));
  if (chs.length !== s.chapters.length) {
    err(`syllabus "${s.topic}": chapter(s) missing: ${s.chapters.filter((x) => !slugs.has(x)).join(', ')}`);
    continue;
  }
  const corpus = chs
    .flatMap((c) => [c.title.en, c.title.fa, ...c.sections.flatMap((x) => [x.title.en, x.title.fa, ...x.blocks.map(textOf)])])
    .join('\n')
    .toLowerCase();
  for (const term of s.mustMention) if (!corpus.includes(term.toLowerCase())) err(`syllabus "${s.topic}": "${term}" never mentioned in ${s.chapters.join(' + ')}`);
}

// Harness floor: if we inspected suspiciously little, the validator itself is broken.
const blockCount = CHAPTERS.reduce((n, c) => n + c.sections.reduce((m, s) => m + s.blocks.length, 0), 0);
if (CHAPTERS.length < 18) err(`expected at least 18 chapters, found ${CHAPTERS.length}`);
if (blockCount < 300) err(`expected at least 300 blocks, found ${blockCount}`);

if (errors.length) {
  console.error(`✗ ${errors.length} content problem(s):\n` + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log(`✓ content OK: ${CHAPTERS.length} chapters, ${blockCount} blocks, ${WIDGETS.length} widgets, ${SYLLABUS.length} syllabus topics covered`);
