import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const MAP_PATH = 'product/seo/factory/structure-map-v2-part1.core.csv';
const SEO_PAGES_PATH = 'product/seo/factory/seo-pages.v2.csv';
const PROMPT_SYSTEM_PATH = 'product/seo/factory/prompt-system-v2.json';
const OUTPUT_JSONL = 'product/seo/generated/content-prompt-jobs-v2.jsonl';
const OUTPUT_SUMMARY = 'product/seo/generated/content-prompt-jobs-v2.summary.md';
const GENERATED_AT = '2026-03-05';
const CONTENT_ROOT = 'content/pages';

const SOURCE_OPTIONS = new Set(['seo-pages', 'map']);

const pillarByCluster = {
  negotiation: '/freelance-negotiation-guide',
  pricing: '/freelance-pricing-guide',
  'client-communication': '/client-communication-guide',
  proposals: '/freelance-proposal-guide',
  'email-scripts': '/freelance-email-templates',
  'rate-increase': '/how-to-raise-freelance-rates',
  objections: '/freelance-negotiation-guide',
  tools: '/freelance-negotiation-guide',
  pillars: '/freelance-negotiation-guide',
};

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

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

function routeToFilePath(route) {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  return path.join(CONTENT_ROOT, ...segments) + '.mdx';
}

function titleToKeyword(title) {
  return title
    .replace(/^How to\s+/i, '')
    .replace(/^Freelance\s+/i, 'freelance ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function inferTemplate(pageType) {
  if (pageType === 'tool') return 'tool';
  if (pageType === 'problem') return 'problem';
  if (pageType === 'industry') return 'cluster';
  if (pageType === 'pillar') return 'cluster';
  return 'cluster';
}

function getTemplate(promptSystem, templateKey) {
  const template = promptSystem.templates[templateKey];
  if (!template) throw new Error(`Missing prompt template: ${templateKey}`);
  return template;
}

function ctaRouteFromToolName(targetTool, pageType, ownRoute) {
  if (pageType === 'tool') return ownRoute;

  const normalized = String(targetTool || '').toLowerCase();

  if (/rate|pricing|calculator/.test(normalized)) return '/pricing';
  if (/proposal|scope/.test(normalized)) return '/scope';
  return '/deal';
}

function toolRouteByType(rows, ctaType) {
  const tools = rows.filter((row) => row.page_type === 'tool' || row.cluster === 'tools');
  if (!tools.length) return '/tools/client-negotiation-reply-generator';

  if (ctaType === 'pricing') {
    return tools.find((row) => /rate|pricing/i.test(row.route || row.slug || ''))?.route || '/tools/freelance-rate-calculator';
  }

  if (ctaType === 'proposal') {
    return tools.find((row) => /proposal/i.test(row.route || row.slug || ''))?.route || '/tools/proposal-generator';
  }

  return tools.find((row) => /negotiation|reply|follow-up/i.test(row.route || row.slug || ''))?.route || '/tools/client-negotiation-reply-generator';
}

function fillTemplateLines(lines, context) {
  return lines
    .map((line) =>
      line
        .replaceAll('{{title}}', context.title)
        .replaceAll('{{primary_keyword}}', context.primaryKeyword)
        .replaceAll('{{keyword_variants}}', context.keywordVariants.join(', '))
        .replaceAll('{{route}}', context.route)
        .replaceAll('{{cta_label}}', context.ctaLabel)
        .replaceAll('{{cta_route}}', context.ctaRoute)
        .replaceAll('{{pillar_link}}', context.pillarLink)
        .replaceAll('{{related_link_1}}', context.relatedLinks[0] || context.pillarLink)
        .replaceAll('{{related_link_2}}', context.relatedLinks[1] || context.toolLink)
        .replaceAll('{{tool_link}}', context.toolLink)
        .replaceAll('{{description}}', context.description)
    )
    .join('\n');
}

function writeJsonl(filePath, rows) {
  const text = rows.map((row) => JSON.stringify(row)).join('\n') + '\n';
  writeFileSync(filePath, text);
}

function parseArgs() {
  const sourceArg = process.argv.find((arg) => arg.startsWith('--source='));
  const requestedSource = sourceArg ? sourceArg.split('=')[1] : '';

  if (requestedSource && !SOURCE_OPTIONS.has(requestedSource)) {
    throw new Error(`Unsupported --source=${requestedSource}`);
  }

  if (requestedSource) return requestedSource;
  if (existsSync(SEO_PAGES_PATH)) return 'seo-pages';
  return 'map';
}

function rowsFromMap(mapRows) {
  return mapRows.map((row) => ({
    id: row.page_id,
    status: 'queued',
    page_type: row.page_type,
    cluster: row.cluster_id,
    primary_keyword: row.variable_value,
    title: row.title,
    slug: row.route.split('/').filter(Boolean).pop() || '',
    target_tool: row.cta_type,
    pillar_ref: '',
    related_refs: '',
    route: row.route,
    cta_type: row.cta_type,
    tier: row.tier,
  }));
}

function filterSourceRows(rows, source) {
  if (source === 'map') return rows;
  return rows.filter((row) => ['queued', 'update_needed'].includes((row.status || '').toLowerCase()));
}

const source = parseArgs();
const promptSystem = readJson(PROMPT_SYSTEM_PATH);

const sourceRows =
  source === 'seo-pages' ? loadCsv(SEO_PAGES_PATH) : rowsFromMap(loadCsv(MAP_PATH));

const rows = filterSourceRows(sourceRows, source);
const rowById = new Map(sourceRows.map((row) => [row.id || row.page_id, row]));

const jobs = [];
let counter = 1;

for (const row of rows) {
  const templateKey = inferTemplate(row.page_type);
  const template = getTemplate(promptSystem, templateKey);

  const sameClusterRows = sourceRows.filter((item) => item.cluster === row.cluster || item.cluster_id === row.cluster);

  const variableCandidates = sameClusterRows
    .map((item) => item.primary_keyword || item.variable_value)
    .filter(Boolean)
    .filter((value) => value !== (row.primary_keyword || row.variable_value))
    .slice(0, 6);

  const primaryKeyword = row.primary_keyword || row.variable_value || titleToKeyword(row.title);
  const keywordVariants = variableCandidates.length
    ? variableCandidates
    : [`${primaryKeyword} freelancer`, `${primaryKeyword} email`, `${primaryKeyword} example`];

  const ctaType = row.cta_type === 'tool' ? 'tool' : row.cta_type || 'reply';
  const ctaLabel = promptSystem.cta_catalog[ctaType] || promptSystem.cta_catalog.reply;
  const ctaRoute = ctaRouteFromToolName(row.target_tool, row.page_type, row.route);

  const relatedIds = String(row.related_refs || '')
    .split('|')
    .map((item) => item.trim())
    .filter(Boolean);

  const relatedLinks = relatedIds
    .map((id) => rowById.get(id))
    .filter(Boolean)
    .map((item) => item.route)
    .filter(Boolean)
    .slice(0, 2);

  if (!relatedLinks.length) {
    relatedLinks.push(
      ...sameClusterRows
        .filter((item) => item.route !== row.route)
        .slice(0, 2)
        .map((item) => item.route)
    );
  }

  const clusterKey = row.cluster || row.cluster_id;
  const pillarLink = row.pillar_ref ? `/${row.pillar_ref}` : pillarByCluster[clusterKey] || '/freelance-negotiation-guide';
  const toolLink = toolRouteByType(sourceRows, row.cta_type || 'reply');

  const context = {
    title: row.title,
    primaryKeyword,
    keywordVariants,
    route: row.route,
    ctaLabel,
    ctaRoute,
    pillarLink,
    relatedLinks,
    toolLink,
    description: `${row.title} playbook for freelancers with practical strategy and copy-ready examples.`,
  };

  const systemPrompt = fillTemplateLines(template.system_prompt_lines, context);
  const userPrompt = fillTemplateLines(template.user_prompt_template_lines, context);

  jobs.push({
    job_id: `PROMPT-${String(counter).padStart(4, '0')}`,
    seo_page_id: row.id || row.page_id || '',
    generated_at: GENERATED_AT,
    source: 'flowdockr-seo-machine-v2-part3',
    source_mode: source,
    route: row.route,
    output_path: routeToFilePath(row.route),
    cluster_id: clusterKey,
    tier: row.tier || 'core',
    page_type: row.page_type,
    template_key: templateKey,
    title: row.title,
    primary_keyword: primaryKeyword,
    keyword_variants: keywordVariants,
    cta_type: row.cta_type || 'reply',
    cta_label: ctaLabel,
    cta_route: ctaRoute,
    pillar_link: pillarLink,
    related_links: relatedLinks,
    tool_link: toolLink,
    required_headings: template.required_headings,
    target_word_count: template.word_count,
    banned_phrases: promptSystem.banned_phrases,
    system_prompt: systemPrompt,
    user_prompt: userPrompt,
    status: 'queued',
  });

  counter += 1;
}

mkdirSync(path.dirname(OUTPUT_JSONL), { recursive: true });
writeJsonl(OUTPUT_JSONL, jobs);

const byTemplate = jobs.reduce((acc, job) => {
  acc[job.template_key] = (acc[job.template_key] || 0) + 1;
  return acc;
}, {});

const summaryLines = [
  '# Flowdockr SEO Content Prompt Jobs v2',
  '',
  `Generated: ${GENERATED_AT}`,
  `Source mode: ${source}`,
  '',
  `- source rows: ${sourceRows.length}`,
  `- queued rows compiled: ${rows.length}`,
  `- output queue: ${OUTPUT_JSONL}`,
  `- total jobs: ${jobs.length}`,
  '',
  '## Jobs By Template',
  '',
  ...Object.entries(byTemplate).map(([k, v]) => `- ${k}: ${v}`),
  '',
  '## Notes',
  '',
  '- Queue includes CTA, pillar link, related links, and tool link as compiler output.',
  '- status filter: queued + update_needed (seo-pages mode).',
  '- Use this queue as single source for LLM generation, publish, and quality gating.',
  '',
];

writeFileSync(OUTPUT_SUMMARY, summaryLines.join('\n'));

console.log(`Source mode: ${source}`);
console.log(`Compiled rows: ${rows.length}`);
console.log(`Generated prompt jobs: ${jobs.length}`);
console.log(`Output: ${OUTPUT_JSONL}`);
console.log(`Summary: ${OUTPUT_SUMMARY}`);
