/**
 * Content schema for the course.
 *
 * Every user-facing string is an `L` (localized) object with Persian (`fa`, the
 * primary language, RTL) and English (`en`). Persian text keeps technical terms
 * such as "DNS", "Worker" or "Repository" in Latin script, the way the course
 * author speaks them.
 *
 * Chapters hold content only. Interactive pieces are referenced by `WidgetId`
 * and implemented in src/components/widgets.
 */

export type L = { fa: string; en: string };

export type WidgetId =
  | 'team-to-agent' // old team of specialists collapses into you + an agent
  | 'request-journey' // URL typed → DNS → server → response, step by step
  | 'stack-layers' // static site vs web app: which layers light up
  | 'dns-lookup' // resolver → root → TLD → authoritative nameserver
  | 'git-playground' // commit / branch / merge on a tiny git graph
  | 'storage-picker' // match data to D1 / KV / R2
  | 'chat-vs-agent' // same request, chat answer vs agent actions
  | 'agent-loop' // plan → act → observe → repeat
  | 'setup-checklist' // accounts and tools, saved progress
  | 'token-builder' // least-privilege Cloudflare API token, blast-radius meter
  | 'brief-builder' // fill a form → copyable project brief / AGENTS.md
  | 'prompt-lab' // toggle prompt ingredients, watch a vague prompt become a good one
  | 'vibe-loop' // ask → build → preview → feedback → commit cycle
  | 'bug-report' // build a bug report an agent can act on
  | 'pipeline' // push → build → test → deploy → live
  | 'nameserver-switch' // registrar → Cloudflare nameservers → active
  | 'hero-finale' // final celebration + the full journey recap
  | 'agent-picker' // which agent/builder fits me (RD-07A)
  | 'design-flaws' // find 5 flaws in a mock page (RD-07B)
  | 'secret-hunt' // find the leaked secret in a diff, rotate it (RD-07C)
  | 'platform-compare' // radar + scenario comparison of 5 platforms (CMP)
  | 'skill-homes' // one SKILL.md in Claude, Codex and Lovable + always-on vs on-demand sort
  | 'other-businesses'; // apply the course to one of six other demo businesses (RD-01 extra)

export type Tone = 'why' | 'tip' | 'warn' | 'fix';

export type Block =
  /** Paragraph. Supports **bold** and `code` inline markers. */
  | { type: 'p'; text: L }
  /** Small sub-heading inside a section. */
  | { type: 'h'; text: L }
  /**
   * Callout box.
   * why  = why this matters / the reason behind a step
   * tip  = practical advice
   * warn = risk, cost or security caution
   * fix  = "common misconception, corrected" (use when correcting an inaccuracy)
   */
  | { type: 'callout'; tone: Tone; title?: L; text: L }
  | { type: 'list'; items: L[]; ordered?: boolean }
  /** Numbered how-to steps with a title and a short explanation each. */
  | { type: 'steps'; items: { title: L; text: L }[] }
  /** Mini glossary. `term` stays in Latin script (e.g. "CNAME"). */
  | { type: 'terms'; items: { term: string; def: L }[] }
  /** Comparison table. First column usually names the row. */
  | { type: 'compare'; headers: L[]; rows: L[][] }
  /** A copyable prompt the learner can paste to their agent. */
  | { type: 'prompt'; title: L; text: L }
  /** Code / terminal snippet (not localized). */
  | { type: 'code'; lang: string; code: string; caption?: L }
  /** Interactive widget. */
  | { type: 'widget'; id: WidgetId }
  /**
   * One multiple-choice question. Options should be of similar length and the
   * answer position varied across the course (the validator checks both).
   * `why[i]` explains option i after answering; `explain` is the summary.
   */
  | { type: 'quiz'; q: L; options: L[]; answer: number; explain: L; why?: L[] }
  /**
   * Instructions that differ by build path. The learner picks Codex or Lovable once
   * (remembered); every `path` block shows that path, with a switch to see the other.
   */
  | { type: 'path'; codex: Block[]; lovable: Block[] }
  /** End-of-act review: several quiz questions mixing the act's chapters. */
  | { type: 'review'; title: L; items: QuizItem[] }
  /** Official documentation links. */
  | { type: 'links'; items: { label: string; url: string }[] };

export type QuizItem = { q: L; options: L[]; answer: number; explain: L; why?: L[] };

export type Section = {
  /** Stable kebab-case id, unique inside the chapter (used for anchors). */
  id: string;
  title: L;
  blocks: Block[];
};

export type ActId = 1 | 2 | 3 | 4;

export type IconId =
  | 'spark'
  | 'globe'
  | 'signpost'
  | 'branch'
  | 'cloud'
  | 'brain'
  | 'robot'
  | 'key'
  | 'plug'
  | 'map'
  | 'chat'
  | 'palette'
  | 'loop'
  | 'bug'
  | 'rocket'
  | 'shield'
  | 'trophy'
  | 'toolbox';

export type Chapter = {
  /** Stable kebab-case slug, used in the URL. Never reuse or renumber. */
  slug: string;
  act: ActId;
  icon: IconId;
  title: L;
  /** One-line promise shown on the journey map. */
  tagline: L;
  /** Estimated reading + doing time in minutes. */
  minutes: number;
  /** What Bit (the mascot) says when the chapter opens. Friendly, one or two sentences. */
  mascotLine: L;
  /** Optional original voice note of the course author: file plus the seconds (from/to) that belong to this chapter. */
  voice?: { src: string; from?: number; to?: number; transcript?: string };
  /** Mission brief shown under the title (RD-04). */
  mission?: { outcome: L; cafe: L };
  /** One warm-up question about the previous chapter (spaced recall, RD-04). */
  warmup?: QuizItem;
  sections: Section[];
  /** "How this connects": how this chapter links to the ones before and after. */
  connects: L;
  /** 3–5 short takeaways. */
  takeaways: L[];
};

export type Act = { id: ActId; title: L; subtitle: L };
