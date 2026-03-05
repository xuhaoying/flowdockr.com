import { readFileSync, writeFileSync } from 'node:fs';

const queuePath = 'product/seo/flowdockr-build-queue-first-100.csv';
const outPath = 'product/seo/generated/article-briefs-first-100.jsonl';

const csv = readFileSync(queuePath, 'utf8').trim().split('\n');
const headers = csv[0].split(',').map((v) => v.replace(/"/g, ''));

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map((m) => m[1].replaceAll('""', '"'));
}

function toTitle(keyword) {
  return keyword
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function ctaLabel(route) {
  if (route === '/deal') return 'Generate negotiation reply';
  if (route === '/pricing') return 'Generate pricing strategy';
  if (route === '/scope') return 'Generate scope policy';
  return 'Open Flowdockr tool';
}

const rows = csv.slice(1).map((line) => {
  const vals = parseCsvLine(line);
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = vals[i];
  });
  return obj;
});

const lines = rows.map((row) => {
  const keyword = row.keyword;
  const title = toTitle(keyword);
  const brief = {
    id: row.id,
    keyword,
    title,
    slug: row.recommended_url.replace('/blog/', ''),
    cluster: row.cluster,
    targetRoute: row.target_route,
    ctaLabel: ctaLabel(row.target_route),
    publishWeek: Number(row.week),
    template: {
      minWords: 1500,
      maxWords: 2200,
      language: 'en',
      structure: [
        { type: 'h1', instruction: 'Use the exact target keyword naturally in the H1.' },
        {
          type: 'intro',
          instruction:
            'Describe the freelancer pain point in 3-4 sentences and state what outcome the reader will get.',
        },
        {
          type: 'section',
          heading: 'Why this situation happens',
          instruction: 'Explain root causes in client psychology, project constraints, and communication gaps.',
        },
        {
          type: 'section',
          heading: 'Common mistakes freelancers make',
          instruction: 'List 3-5 mistakes and why each one reduces trust or margin.',
        },
        {
          type: 'section',
          heading: 'A better response strategy',
          instruction:
            'Provide a clear framework with actionable steps and guardrails that preserve relationship and value.',
        },
        {
          type: 'section',
          heading: 'Copy-paste examples',
          instruction:
            'Give at least 3 practical scripts (email/chat/call) in plain English with placeholders the reader can edit.',
        },
        {
          type: 'section',
          heading: 'Use Flowdockr to generate your custom reply',
          instruction: `Bridge to product value and include one strong CTA to ${row.target_route}.`,
        },
        {
          type: 'faq',
          instruction: 'Add 3-5 FAQs aligned to the same search intent and related long-tail variants.',
        },
      ],
      seoRules: [
        'Meta title <= 60 chars and includes primary keyword.',
        'Meta description 140-160 chars with outcome + CTA.',
        'Use 2-4 internal links to same cluster pages.',
        `Include one product CTA button to ${row.target_route} above the fold and one near conclusion.`,
        'Avoid fluff and generic AI wording; prioritize concrete examples and constraints.',
      ],
    },
  };

  return JSON.stringify(brief);
});

writeFileSync(outPath, `${lines.join('\n')}\n`);
console.log(`Generated ${outPath} with ${lines.length} briefs.`);
