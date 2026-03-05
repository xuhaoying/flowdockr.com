import { readFileSync, writeFileSync } from 'node:fs';

const libraryPath = 'product/seo/flowdockr-keyword-library-v1.csv';
const outputPath = 'product/seo/flowdockr-build-queue-first-100.csv';

const lines = readFileSync(libraryPath, 'utf8').trim().split('\n');
const header = lines[0].split(',').map(v => v.replace(/"/g, ''));

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map(m => m[1].replace(/""/g, '"'));
}

const rows = lines.slice(1).map((line) => {
  const values = parseCsvLine(line);
  const row = {};
  header.forEach((key, idx) => {
    row[key] = values[idx];
  });
  return row;
});

const quota = {
  'negotiation-discount': 30,
  'pricing-strategy': 25,
  'client-communication': 25,
  'proposal-and-scope': 20,
};

const weeklyPlan = [
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 3, 'client-communication': 2, 'proposal-and-scope': 2 },
  { 'negotiation-discount': 3, 'pricing-strategy': 2, 'client-communication': 3, 'proposal-and-scope': 2 },
];

const priorityRank = { P1: 1, P2: 2, P3: 3 };

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

const pools = {};
for (const cluster of Object.keys(quota)) {
  pools[cluster] = rows
    .filter(r => r.cluster === cluster)
    .sort((a, b) => {
      if (priorityRank[a.priority] !== priorityRank[b.priority]) {
        return priorityRank[a.priority] - priorityRank[b.priority];
      }
      return Number(b.conversion_score) - Number(a.conversion_score);
    });
}

const selected = [];
const used = new Set();
const usedCount = {
  'negotiation-discount': 0,
  'pricing-strategy': 0,
  'client-communication': 0,
  'proposal-and-scope': 0,
};

for (let week = 1; week <= 10; week++) {
  const plan = weeklyPlan[week - 1];
  for (const cluster of Object.keys(plan)) {
    let need = plan[cluster];
    while (need > 0) {
      const next = pools[cluster].find(r => !used.has(r.id));
      if (!next) {
        throw new Error(`Keyword pool exhausted for cluster: ${cluster}`);
      }
      if (usedCount[cluster] >= quota[cluster]) break;

      used.add(next.id);
      usedCount[cluster]++;
      selected.push({
        ...next,
        week,
        batch: `W${String(week).padStart(2, '0')}`,
        recommended_url: `/blog/${slugify(next.keyword)}`,
      });
      need--;
    }
  }
}

if (selected.length !== 100) {
  throw new Error(`Expected 100 queued keywords, got ${selected.length}`);
}

selected.forEach((row, idx) => {
  row.publish_order = idx + 1;
});

const outHeader = [
  'publish_order',
  'week',
  'batch',
  'id',
  'keyword',
  'cluster',
  'priority',
  'content_type',
  'target_route',
  'recommended_url',
];

const outLines = [outHeader.join(',')];
for (const row of selected) {
  const line = outHeader
    .map((key) => `"${String(row[key]).replaceAll('"', '""')}"`)
    .join(',');
  outLines.push(line);
}

writeFileSync(outputPath, `${outLines.join('\n')}\n`);
console.log(`Generated ${outputPath} (${selected.length} rows).`);
