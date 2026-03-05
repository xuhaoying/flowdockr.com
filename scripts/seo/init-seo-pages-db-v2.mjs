import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const MAP_ALL_PATH = 'product/seo/factory/structure-map-v2-part1.all.csv';
const OUTPUT_CSV = 'product/seo/factory/seo-pages.v2.csv';
const OUTPUT_SUMMARY = 'product/seo/factory/seo-pages.v2.summary.md';
const GENERATED_AT = '2026-03-05';

const FIELD_ORDER = [
  'id',
  'status',
  'page_type',
  'cluster',
  'primary_keyword',
  'title',
  'slug',
  'situation',
  'variables_json',
  'target_tool',
  'pillar_ref',
  'related_refs',
  'outline',
  'last_generated_at',
  'published_at',
  'quality_score',
  'flags',
  'gsc_impressions',
  'gsc_clicks',
  'ctr',
  'avg_position',
  'refresh_reason',
  'route',
  'cta_type',
  'tier',
  'source_page_id',
];

const clusterToPillar = {
  negotiation: 'freelance-negotiation-guide',
  pricing: 'freelance-pricing-guide',
  'client-communication': 'client-communication-guide',
  proposals: 'freelance-proposal-guide',
  'email-scripts': 'freelance-email-templates',
  'rate-increase': 'how-to-raise-freelance-rates',
  objections: 'freelance-negotiation-guide',
  tools: 'freelance-negotiation-guide',
  pillars: 'freelance-negotiation-guide',
};

const ctaToTool = {
  reply: 'client-negotiation-reply-generator',
  pricing: 'freelance-rate-calculator',
  proposal: 'proposal-generator',
  tool: 'tool-page',
  pillar: 'pillar-guide',
};

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }

    current += ch;
  }

  values.push(current);
  return values;
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};

    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });

    return row;
  });
}

function writeCsv(filePath, rows, headers) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  writeFileSync(filePath, `${lines.join('\n')}\n`);
}

function slugFromRoute(route) {
  const parts = route.replace(/^\//, '').split('/').filter(Boolean);
  return parts.length ? parts[parts.length - 1] : 'home';
}

function clusterFromRoute(route) {
  const parts = route.replace(/^\//, '').split('/').filter(Boolean);
  if (!parts.length) return 'negotiation';

  const first = parts[0];
  if (first === 'negotiation') return 'negotiation';
  if (first === 'pricing') return 'pricing';
  if (first === 'client-communication') return 'client-communication';
  if (first === 'proposals') return 'proposals';
  if (first === 'objections') return 'objections';
  if (first === 'email-scripts') return 'email-scripts';
  if (first === 'rate-increase') return 'rate-increase';
  if (first === 'tools') return 'tools';

  if (/proposal/.test(first)) return 'proposals';
  if (/communication/.test(first)) return 'client-communication';
  return 'negotiation';
}

function situationFromKeyword(pageType, keyword) {
  if (pageType !== 'problem') return '';
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function makeStatus(row, rankInTier) {
  if (row.tier === 'expanded') return 'idea';

  if (row.page_type === 'pillar') return 'queued';
  if (row.page_type === 'tool') return rankInTier <= 5 ? 'queued' : 'idea';
  if (row.page_type === 'problem') return rankInTier <= 30 ? 'queued' : 'idea';
  return 'idea';
}

function makeVariablesJson(row) {
  const payload = {};

  if (row.variable_value) payload.seed = row.variable_value;
  if (row.expansion_dimension) payload[row.expansion_dimension] = row.variable_value;
  if (row.expansion_rule) payload.expansion_rule = row.expansion_rule;

  return JSON.stringify(payload);
}

const sourceRows = loadCsv(MAP_ALL_PATH);

const countersByType = {};
const seoRows = sourceRows.map((row) => {
  const pageType = row.page_type || 'cluster';
  countersByType[`${row.tier}:${pageType}`] = (countersByType[`${row.tier}:${pageType}`] || 0) + 1;

  const cluster = row.cluster_id || clusterFromRoute(row.route);
  const slug = slugFromRoute(row.route);
  const primaryKeyword = row.variable_value || row.title.toLowerCase();
  const rank = countersByType[`${row.tier}:${pageType}`];
  const status = makeStatus(row, rank);

  return {
    id: `SEO-${String(sourceRows.indexOf(row) + 1).padStart(4, '0')}`,
    status,
    page_type: pageType,
    cluster,
    primary_keyword: primaryKeyword,
    title: row.title,
    slug,
    situation: situationFromKeyword(pageType, primaryKeyword),
    variables_json: makeVariablesJson(row),
    target_tool: ctaToTool[row.cta_type] || 'client-negotiation-reply-generator',
    pillar_ref: clusterToPillar[cluster] || 'freelance-negotiation-guide',
    related_refs: '',
    outline: '',
    last_generated_at: '',
    published_at: '',
    quality_score: '',
    flags: '',
    gsc_impressions: '',
    gsc_clicks: '',
    ctr: '',
    avg_position: '',
    refresh_reason: '',
    route: row.route,
    cta_type: row.cta_type,
    tier: row.tier,
    source_page_id: row.page_id,
  };
});

const byClusterAndType = {};
for (const row of seoRows) {
  const key = `${row.cluster}:${row.page_type}`;
  if (!byClusterAndType[key]) byClusterAndType[key] = [];
  byClusterAndType[key].push(row);
}

for (const row of seoRows) {
  const siblings = (byClusterAndType[`${row.cluster}:${row.page_type}`] || [])
    .filter((item) => item.id !== row.id)
    .slice(0, 4)
    .map((item) => item.id);

  row.related_refs = siblings.join('|');
}

mkdirSync('product/seo/factory', { recursive: true });
writeCsv(OUTPUT_CSV, seoRows, FIELD_ORDER);

const statusCounts = seoRows.reduce((acc, row) => {
  acc[row.status] = (acc[row.status] || 0) + 1;
  return acc;
}, {});

const typeCounts = seoRows.reduce((acc, row) => {
  acc[row.page_type] = (acc[row.page_type] || 0) + 1;
  return acc;
}, {});

const summaryLines = [
  '# Flowdockr seo_pages v2',
  '',
  `Generated: ${GENERATED_AT}`,
  `Source: ${MAP_ALL_PATH}`,
  `Total rows: ${seoRows.length}`,
  '',
  '## Status Counts',
  '',
  ...Object.entries(statusCounts).map(([k, v]) => `- ${k}: ${v}`),
  '',
  '## Page Type Counts',
  '',
  ...Object.entries(typeCounts).map(([k, v]) => `- ${k}: ${v}`),
  '',
  '## Notes',
  '',
  '- queued: 30 problem + 6 pillar + 5 tool pages for phase-1 execution.',
  '- expanded tier defaults to idea and can be queued gradually.',
  '- related_refs are data-driven and used by the internal-link compiler.',
  '',
];

writeFileSync(OUTPUT_SUMMARY, summaryLines.join('\n'));

console.log(`Generated seo_pages DB: ${OUTPUT_CSV}`);
console.log(`Rows: ${seoRows.length}`);
console.log(`Summary: ${OUTPUT_SUMMARY}`);
