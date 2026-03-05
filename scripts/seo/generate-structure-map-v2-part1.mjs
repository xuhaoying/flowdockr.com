import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CONFIG_PATH = 'product/seo/factory/structure-map-v2-part1.config.json';
const OUTPUT_CORE_CSV = 'product/seo/factory/structure-map-v2-part1.core.csv';
const OUTPUT_EXPANDED_CSV = 'product/seo/factory/structure-map-v2-part1.expanded.csv';
const OUTPUT_ALL_CSV = 'product/seo/factory/structure-map-v2-part1.all.csv';
const OUTPUT_JSON = 'product/seo/factory/structure-map-v2-part1.generated.json';
const OUTPUT_SUMMARY = 'product/seo/factory/structure-map-v2-part1.summary.md';

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function slugifyCompact(value) {
  const stopwords = new Set(['for', 'the', 'a', 'an', 'other']);
  return value
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token && !stopwords.has(token))
    .join(' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function titleCase(text) {
  return text
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function buildRoute(templateId, variable) {
  const value = variable.trim();

  switch (templateId) {
    case 'negotiation-situation':
      return `/negotiation/${slugifyCompact(value)}`;
    case 'pricing-service':
      return `/pricing/how-to-price-freelance-${slugify(value)}`;
    case 'pricing-profession':
      return `/pricing/freelance-rate-for-${slugify(value)}`;
    case 'pricing-country':
      return `/pricing/freelance-pricing-in-${slugify(value)}`;
    case 'communication-problem':
      return `/client-communication/${slugify(value)}`;
    case 'email-script':
      return `/email-scripts/email-template-for-${slugify(value)}`;
    case 'proposal-service':
      return `/proposals/freelance-proposal-for-${slugify(value)}`;
    case 'rate-increase-service':
      return `/rate-increase/how-to-raise-freelance-rate-for-${slugify(value)}`;
    case 'objection-scenario':
      return `/objections/how-to-respond-when-client-says-${slugify(value)}`;
    default:
      throw new Error(`Unsupported template_id: ${templateId}`);
  }
}

function buildExpansionRoute(baseRoute, dimension, value) {
  const suffix = slugify(value);
  if (dimension === 'country') {
    return `${baseRoute}-in-${suffix}`;
  }
  return `${baseRoute}-for-${suffix}`;
}

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function writeCsv(path, rows, headers) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  writeFileSync(path, `${lines.join('\n')}\n`);
}

const config = readJson(CONFIG_PATH);

const core = [];
let coreCounter = 1;

for (const cluster of config.clusters) {
  if (Array.isArray(cluster.variables)) {
    for (const variable of cluster.variables) {
      let displayVariable = variable;
      if (
        cluster.template_id === 'negotiation-situation' &&
        displayVariable.toLowerCase().startsWith('client ')
      ) {
        displayVariable = displayVariable.replace(/^client\s+/i, '');
      }

      const title = cluster.template_title.replace(
        `{${cluster.variable_key}}`,
        displayVariable
      );
      const route = buildRoute(cluster.template_id, variable);

      core.push({
        page_id: `CORE-${String(coreCounter).padStart(3, '0')}`,
        tier: 'core',
        cluster_id: cluster.cluster_id,
        template_id: cluster.template_id,
        page_type: cluster.page_type,
        cta_type: cluster.cta_type,
        title,
        route,
        variable_value: variable,
        source: config.source,
        expansion_of: '',
        expansion_rule: '',
        expansion_dimension: '',
      });

      coreCounter += 1;
    }
  }

  if (Array.isArray(cluster.pages)) {
    for (const page of cluster.pages) {
      core.push({
        page_id: `CORE-${String(coreCounter).padStart(3, '0')}`,
        tier: 'core',
        cluster_id: cluster.cluster_id,
        template_id: cluster.template_id,
        page_type: cluster.page_type,
        cta_type: cluster.cta_type,
        title: page.title,
        route: page.route,
        variable_value: '',
        source: config.source,
        expansion_of: '',
        expansion_rule: '',
        expansion_dimension: '',
      });

      coreCounter += 1;
    }
  }

  const actualCount = core.filter((row) => row.template_id === cluster.template_id).length;
  if (cluster.expected_count !== undefined && actualCount < cluster.expected_count) {
    throw new Error(
      `Cluster ${cluster.template_id} expected at least ${cluster.expected_count}, got ${actualCount}`
    );
  }
}

const coreExpectedTotal = 114;
if (core.length !== coreExpectedTotal) {
  throw new Error(`Core page total mismatch. Expected ${coreExpectedTotal}, got ${core.length}`);
}

const coreRouteSet = new Set(core.map((row) => row.route));
if (coreRouteSet.size !== core.length) {
  throw new Error('Duplicate routes found in core map.');
}

const expanded = [];
let expCounter = 1;

for (const rule of config.expansion_rules) {
  const sources = core.filter((row) => row.template_id === rule.source_template_id);
  const values = config.dimensions[rule.dimension];

  if (!values || !values.length) {
    throw new Error(`No values found for dimension: ${rule.dimension}`);
  }

  for (const source of sources) {
    for (const value of values) {
      const route = buildExpansionRoute(source.route, rule.dimension, value);
      const title = `${source.title} ${
        rule.dimension === 'country' ? `in ${titleCase(value)}` : `for ${titleCase(value)}`
      }`;

      expanded.push({
        page_id: `EXP-${String(expCounter).padStart(3, '0')}`,
        tier: 'expanded',
        cluster_id: source.cluster_id,
        template_id: source.template_id,
        page_type: source.page_type,
        cta_type: source.cta_type,
        title,
        route,
        variable_value: value,
        source: config.source,
        expansion_of: source.page_id,
        expansion_rule: rule.rule_id,
        expansion_dimension: rule.dimension,
      });

      expCounter += 1;
    }
  }
}

const expandedRouteSet = new Set(expanded.map((row) => row.route));
if (expandedRouteSet.size !== expanded.length) {
  throw new Error('Duplicate routes found in expanded map.');
}

for (const route of expandedRouteSet) {
  if (coreRouteSet.has(route)) {
    throw new Error(`Expanded route collides with core route: ${route}`);
  }
}

const all = [...core, ...expanded];

const headers = [
  'page_id',
  'tier',
  'cluster_id',
  'template_id',
  'page_type',
  'cta_type',
  'title',
  'route',
  'variable_value',
  'source',
  'expansion_of',
  'expansion_rule',
  'expansion_dimension',
];

mkdirSync('product/seo/factory', { recursive: true });
writeCsv(OUTPUT_CORE_CSV, core, headers);
writeCsv(OUTPUT_EXPANDED_CSV, expanded, headers);
writeCsv(OUTPUT_ALL_CSV, all, headers);

const byClusterCore = core.reduce((acc, row) => {
  acc[row.cluster_id] = (acc[row.cluster_id] || 0) + 1;
  return acc;
}, {});

const byRule = expanded.reduce((acc, row) => {
  acc[row.expansion_rule] = (acc[row.expansion_rule] || 0) + 1;
  return acc;
}, {});

const output = {
  generated_at: config.generated_at,
  source: config.source,
  hubs: config.top_level_hubs,
  totals: {
    core: core.length,
    expanded: expanded.length,
    all: all.length,
  },
  core_by_cluster: byClusterCore,
  expanded_by_rule: byRule,
  core_pages: core,
  expanded_pages: expanded,
};

writeFileSync(OUTPUT_JSON, `${JSON.stringify(output, null, 2)}\n`);

const summaryLines = [
  '# Flowdockr SEO Structure Map v2 Part 1',
  '',
  `Generated: ${config.generated_at}`,
  '',
  '## Top-Level Hubs',
  '',
  ...config.top_level_hubs.map((hub) => `- ${hub}`),
  '',
  '## Core Pages',
  '',
  ...Object.entries(byClusterCore).map(([cluster, count]) => `- ${cluster}: ${count}`),
  '',
  `- core total: ${core.length}`,
  '',
  '## Expansion Rules',
  '',
  ...Object.entries(byRule).map(([ruleId, count]) => `- ${ruleId}: ${count}`),
  '',
  `- expanded total: ${expanded.length}`,
  '',
  `## Grand Total`,
  '',
  `- all pages: ${all.length}`,
  '',
  '## Files',
  '',
  `- ${OUTPUT_CORE_CSV}`,
  `- ${OUTPUT_EXPANDED_CSV}`,
  `- ${OUTPUT_ALL_CSV}`,
  `- ${OUTPUT_JSON}`,
  '',
  '## Notes',
  '',
  '- Core map follows the 114-page structure blueprint exactly.',
  '- Expansion adds 300 pages via profession/country/industry rules.',
  '- This output is a route and asset map, not final content pages.',
  '',
];

writeFileSync(OUTPUT_SUMMARY, summaryLines.join('\n'));

console.log(`Generated core map: ${core.length}`);
console.log(`Generated expanded map: ${expanded.length}`);
console.log(`Generated total map: ${all.length}`);
console.log(`Summary: ${OUTPUT_SUMMARY}`);
