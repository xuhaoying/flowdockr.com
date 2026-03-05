import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const QUEUE_PATH = 'product/seo/flowdockr-phase1-queue-30.csv';
const OUTPUT_PATH = 'product/seo/generated/article-briefs-phase1-30.jsonl';

mkdirSync('product/seo/generated', { recursive: true });

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map((m) => m[1].replace(/""/g, '"'));
}

function toTitle(keyword) {
  return keyword
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ctaLabel(route) {
  if (route === '/deal') return 'Generate reply';
  if (route === '/pricing') return 'Generate pricing plan';
  if (route === '/scope') return 'Generate proposal policy';
  return 'Open Flowdockr tool';
}

const lines = readFileSync(QUEUE_PATH, 'utf8').trim().split('\n');
const headers = lines[0].split(',').map((v) => v.replace(/"/g, ''));

const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  const row = {};
  headers.forEach((h, idx) => {
    row[h] = values[idx];
  });
  return row;
});

const briefs = rows.map((row) => {
  const obj = {
    id: row.id,
    keyword: row.keyword,
    title: toTitle(row.keyword),
    slug: row.recommended_url.replace('/blog/', ''),
    cluster: row.cluster,
    publishWeek: Number(row.week),
    targetRoute: row.target_route,
    ctaLabel: ctaLabel(row.target_route),
    contentSpec: {
      language: 'en',
      wordCount: { min: 1500, max: 2200 },
      template: [
        'Intro: define the exact freelancer pain context in 3-4 lines.',
        'Why it happens: client-side and freelancer-side causes.',
        'Common mistakes: 3-5 specific anti-patterns.',
        'Correct strategy: a simple repeatable framework.',
        'Reply examples: at least 3 scripts (email/chat/call).',
        `Product bridge: explain how Flowdockr helps and CTA to ${row.target_route}.`,
      ],
      seo: [
        'Primary keyword in title, first 120 words, one H2, and meta title.',
        'Meta description with practical outcome and action.',
        '2-4 internal links to related pages in same cluster.',
        'One CTA block above fold and one CTA near the end.',
      ],
    },
  };

  return JSON.stringify(obj);
});

writeFileSync(OUTPUT_PATH, `${briefs.join('\n')}\n`);
console.log(`Generated ${OUTPUT_PATH} (${briefs.length} briefs).`);
