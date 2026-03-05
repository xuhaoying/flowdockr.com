import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const PROMPT_JOBS_PATH = 'product/seo/generated/content-prompt-jobs-v2.jsonl';
const DEFAULT_DRAFTS_PATH = 'product/seo/generated/content-drafts-v2.jsonl';
const SEO_PAGES_PATH = 'product/seo/factory/seo-pages.v2.csv';
const OUTPUT_MANIFEST = 'product/seo/generated/content-publish-manifest-v2.json';
const OUTPUT_LOG = 'product/seo/generated/content-publish-log-v2.md';
const GENERATED_AT = '2026-03-05';

const argv = process.argv.slice(2);
const draftsArg = argv.find((arg) => arg.startsWith('--drafts='));
const draftsPath = draftsArg ? draftsArg.split('=')[1] : DEFAULT_DRAFTS_PATH;

function readJsonl(filePath) {
  const content = readFileSync(filePath, 'utf8').trim();
  if (!content) return [];
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
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

function csvEscape(value) {
  const text = String(value ?? '');
  return `"${text.replaceAll('"', '""')}"`;
}

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',');

  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    return row;
  });

  return { headers, rows };
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  writeFileSync(filePath, `${lines.join('\n')}\n`);
}

function ensureFrontmatter(markdown, job) {
  if (/^---\n[\s\S]*?\n---\n/.test(markdown)) {
    return markdown;
  }

  const description = `${job.title} - practical freelancer playbook with copy-ready examples.`;

  return [
    '---',
    `title: ${job.title}`,
    `description: ${description}`,
    `created_at: ${GENERATED_AT}`,
    `route: ${job.route}`,
    '---',
    '',
    markdown.trim(),
    '',
  ].join('\n');
}

const jobs = readJsonl(PROMPT_JOBS_PATH);
const drafts = readJsonl(draftsPath);

const jobById = new Map(jobs.map((job) => [job.job_id, job]));
const { headers: seoHeaders, rows: seoRows } = loadCsv(SEO_PAGES_PATH);
const seoById = new Map(seoRows.map((row) => [row.id, row]));
const seoByRoute = new Map(seoRows.map((row) => [row.route, row]));

const result = {
  generated_at: GENERATED_AT,
  source_drafts: draftsPath,
  source_jobs: PROMPT_JOBS_PATH,
  totals: {
    drafts: drafts.length,
    published: 0,
    skipped_missing_job: 0,
    skipped_missing_markdown: 0,
  },
  published_pages: [],
  skipped: [],
};

for (const draft of drafts) {
  const jobId = draft.job_id;
  const job = jobById.get(jobId);

  if (!job) {
    result.totals.skipped_missing_job += 1;
    result.skipped.push({
      job_id: jobId,
      reason: 'missing_job',
    });
    continue;
  }

  const markdown = draft.markdown || draft.content || '';
  if (!markdown.trim()) {
    result.totals.skipped_missing_markdown += 1;
    result.skipped.push({
      job_id: jobId,
      route: job.route,
      reason: 'missing_markdown',
    });
    continue;
  }

  const outputPath = job.output_path;
  mkdirSync(path.dirname(outputPath), { recursive: true });

  const finalMarkdown = ensureFrontmatter(markdown, job);
  writeFileSync(outputPath, `${finalMarkdown.trim()}\n`);

  const seoRow = (job.seo_page_id && seoById.get(job.seo_page_id)) || seoByRoute.get(job.route);
  if (seoRow) {
    seoRow.status = 'generated';
    seoRow.last_generated_at = GENERATED_AT;
    seoRow.flags = '';
  }

  result.totals.published += 1;
  result.published_pages.push({
    job_id: jobId,
    seo_page_id: job.seo_page_id || '',
    route: job.route,
    output_path: outputPath,
    profile: job.template_key,
  });
}

writeCsv(SEO_PAGES_PATH, seoHeaders, seoRows);

mkdirSync(path.dirname(OUTPUT_MANIFEST), { recursive: true });
writeFileSync(OUTPUT_MANIFEST, `${JSON.stringify(result, null, 2)}\n`);

const logLines = [
  '# Flowdockr SEO Publish Log v2',
  '',
  `Generated: ${GENERATED_AT}`,
  '',
  `- drafts processed: ${result.totals.drafts}`,
  `- pages published: ${result.totals.published}`,
  `- skipped missing job: ${result.totals.skipped_missing_job}`,
  `- skipped missing markdown: ${result.totals.skipped_missing_markdown}`,
  '',
  '## Published Routes',
  '',
];

if (!result.published_pages.length) {
  logLines.push('- none');
} else {
  for (const page of result.published_pages) {
    logLines.push(`- ${page.route} (${page.job_id})`);
  }
}
logLines.push('');

writeFileSync(OUTPUT_LOG, logLines.join('\n'));

console.log(`Drafts processed: ${result.totals.drafts}`);
console.log(`Published: ${result.totals.published}`);
console.log(`Skipped (missing job): ${result.totals.skipped_missing_job}`);
console.log(`Skipped (missing markdown): ${result.totals.skipped_missing_markdown}`);
console.log(`Manifest: ${OUTPUT_MANIFEST}`);
console.log(`Log: ${OUTPUT_LOG}`);
console.log(`Updated statuses: ${SEO_PAGES_PATH}`);
