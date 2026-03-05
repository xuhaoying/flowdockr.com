import { readFileSync, writeFileSync } from 'node:fs';

const INPUT = 'product/seo/flowdockr-keyword-library-curated-v1.csv';
const OUTPUT = 'product/seo/flowdockr-phase1-queue-30.csv';

const SPLIT = {
  'negotiation-discount': 10,
  'pricing-strategy': 8,
  'client-communication': 7,
  'proposal-and-close': 5,
};

const WEEK_PLAN = [
  { 'negotiation-discount': 4, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-close': 1 },
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-close': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-close': 2 },
];

const priorityRank = { P1: 1, P2: 2, P3: 3 };

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map((m) => m[1].replace(/""/g, '"'));
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

const lines = readFileSync(INPUT, 'utf8').trim().split('\n');
const headers = lines[0].split(',').map((v) => v.replace(/"/g, ''));
const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  const row = {};
  headers.forEach((h, idx) => {
    row[h] = values[idx];
  });
  return row;
});

const pools = {};
for (const cluster of Object.keys(SPLIT)) {
  pools[cluster] = rows
    .filter((r) => r.cluster === cluster)
    .sort((a, b) => {
      if (a.source !== b.source) {
        return a.source === 'user_seed' ? -1 : 1;
      }
      if (priorityRank[a.priority] !== priorityRank[b.priority]) {
        return priorityRank[a.priority] - priorityRank[b.priority];
      }
      return Number(b.conversion_score) - Number(a.conversion_score);
    });
}

const selected = [];
const used = new Set();
const usedByCluster = Object.fromEntries(Object.keys(SPLIT).map((key) => [key, 0]));

for (let week = 1; week <= WEEK_PLAN.length; week++) {
  const plan = WEEK_PLAN[week - 1];
  for (const [cluster, count] of Object.entries(plan)) {
    let needed = count;
    while (needed > 0) {
      const next = pools[cluster].find((row) => !used.has(row.id));
      if (!next) throw new Error(`No available keyword left in cluster: ${cluster}`);
      if (usedByCluster[cluster] >= SPLIT[cluster]) break;

      used.add(next.id);
      usedByCluster[cluster] += 1;
      selected.push({
        publish_order: selected.length + 1,
        week,
        batch: `W${String(week).padStart(2, '0')}`,
        id: next.id,
        keyword: next.keyword,
        cluster: next.cluster,
        source: next.source,
        priority: next.priority,
        content_type: next.content_type,
        target_route: next.target_route,
        recommended_url: `/blog/${slugify(next.keyword)}`,
      });
      needed -= 1;
    }
  }
}

if (selected.length !== 30) {
  throw new Error(`Expected 30 rows, got ${selected.length}`);
}

const outHeader = [
  'publish_order',
  'week',
  'batch',
  'id',
  'keyword',
  'cluster',
  'source',
  'priority',
  'content_type',
  'target_route',
  'recommended_url',
];

const out = [outHeader.join(',')];
for (const row of selected) {
  out.push(outHeader.map((key) => `"${String(row[key]).replaceAll('"', '""')}"`).join(','));
}

writeFileSync(OUTPUT, `${out.join('\n')}\n`);
console.log('Generated phase1 queue (30).');
console.log(
  selected.reduce((acc, row) => {
    acc[row.cluster] = (acc[row.cluster] || 0) + 1;
    return acc;
  }, {})
);
