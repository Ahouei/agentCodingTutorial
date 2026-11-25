/**
 * Build step: page metadata for the Worker (titles, descriptions, OG) + sitemap.xml + robots.txt.
 * Run: node --experimental-strip-types scripts/gen-meta.ts
 */
import { writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { foundations } from '../src/content/chapters/foundations.ts';
import { platform } from '../src/content/chapters/platform.ts';
import { workshop } from '../src/content/chapters/workshop.ts';
import { building } from '../src/content/chapters/building.ts';
import { shipping } from '../src/content/chapters/shipping.ts';
import { beFound, comparePlatforms } from '../src/content/chapters/extra.ts';

const SITE = 'https://start.ahouei.site';
const all = [...foundations, ...platform, comparePlatforms, ...workshop, ...building, ...shipping, beFound];
const strip = (s: string) => s.replace(/\*\*|`/g, '').replace(/\s+/g, ' ').trim();

const chapters: Record<string, { title: string; titleEn: string; desc: string; descEn: string; sections: string[] }> = {};
for (const c of all) {
  chapters[c.slug] = {
    title: strip(c.title.fa),
    titleEn: strip(c.title.en),
    desc: strip(c.mission?.outcome.fa ?? c.tagline.fa),
    descEn: strip(c.mission?.outcome.en ?? c.tagline.en),
    sections: c.sections.map((s) => s.id),
  };
}
mkdirSync('worker', { recursive: true });
import { readFileSync } from 'node:fs';
const order = [...readFileSync('src/content/index.ts', 'utf8').matchAll(/^  '([a-z0-9-]+)',$/gm)].map((m) => m[1]);
if (order.length !== all.length || order.some((s) => !chapters[s])) throw new Error('ORDER in src/content/index.ts does not match the chapters');
writeFileSync('worker/meta.json', JSON.stringify({ chapters, order }, null, 0));

const today = new Date().toISOString().slice(0, 10);
const urls = ['/', '/glossary', ...order.map((slug) => `/c/${slug}`)];
writeFileSync(
  'public/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
writeFileSync('public/robots.txt', `User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${SITE}/sitemap.xml\n`);
console.log(`meta: ${all.length} chapters, sitemap: ${urls.length} urls`);

// Which voice notes exist, so the player never probes for missing files (no 404 noise).
const audio = existsSync('public/audio') ? readdirSync('public/audio').filter((f) => f.endsWith('.mp3')).map((f) => `/audio/${f}`) : [];
writeFileSync('public/audio/manifest.json', JSON.stringify({ files: audio }));
console.log(`audio: ${audio.length} voice file(s)`);
