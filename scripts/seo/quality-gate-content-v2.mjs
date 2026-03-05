import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const MANIFEST_PATH = 'product/seo/generated/programmatic-pages-v2.json';
const PROMPT_JOBS_PATH = 'product/seo/generated/content-prompt-jobs-v2.jsonl';
const SEO_PAGES_PATH = 'product/seo/factory/seo-pages.v2.csv';
const QUALITY_RULES_PATH = 'product/seo/factory/quality-gates-v2.json';
const REPORT_JSON = 'product/seo/generated/content-quality-report-v2.json';
const REPORT_MD = 'product/seo/generated/content-quality-report-v2.md';
const REWRITE_QUEUE_JSONL = 'product/seo/generated/content-rewrite-queue-v2.jsonl';
const CONTENT_ROOT = 'content/pages';
const GENERATED_AT = '2026-03-05';

const argv = process.argv.slice(2);
const sourceArg = argv.find((arg) => arg.startsWith('--source='));
const source = sourceArg ? sourceArg.split('=')[1] : 'manifest';
const allowFailures = argv.includes('--allow-failures');

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

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

function routeToFilePath(route) {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  return path.join(CONTENT_ROOT, ...segments) + '.mdx';
}

function countWords(text) {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[>#*\-\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned ? cleaned.split(' ').length : 0;
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSection(content, heading) {
  const startRegex = new RegExp(`^${escapeRegex(heading)}\\s*$`, 'm');
  const startMatch = startRegex.exec(content);
  if (!startMatch) return '';

  const sectionStart = startMatch.index + startMatch[0].length;
  const rest = content.slice(sectionStart);
  const nextHeadingMatch = /^##\s+/m.exec(rest);

  if (!nextHeadingMatch) {
    return rest.trim();
  }

  return rest.slice(0, nextHeadingMatch.index).trim();
}

function countListItems(text) {
  const matches = text.match(/^(\s*[-*]\s+|\s*\d+\.\s+)/gm);
  return matches ? matches.length : 0;
}

function countSubHeadings(text) {
  const matches = text.match(/^###\s+/gm);
  return matches ? matches.length : 0;
}

function countMarkdownLinks(text) {
  const matches = text.match(/\[[^\]]+\]\([^)]+\)/g);
  return matches ? matches.length : 0;
}

function buildTargetsFromManifest(manifestPath) {
  const manifest = readJson(manifestPath);

  const targets = [];
  for (const page of manifest.pages) {
    let profile = null;

    if (page.page_type === 'problem') profile = 'problem';
    if (page.page_type === 'tool') profile = 'tool';
    if (page.page_type === 'cluster' || page.page_type === 'pillar') profile = 'cluster';

    if (!profile) continue;

    targets.push({
      route: page.route,
      output_path: routeToFilePath(page.route),
      profile,
      page_type: page.page_type,
      title: page.route,
      job_id: '',
      seo_page_id: '',
      cta_label: '',
    });
  }

  return targets;
}

function buildTargetsFromPromptJobs(jobPath) {
  const jobs = readJsonl(jobPath);

  return jobs.map((job) => ({
    route: job.route,
    output_path: job.output_path,
    profile:
      job.template_key === 'problem' ? 'problem' : job.template_key === 'tool' ? 'tool' : 'cluster',
    page_type: job.page_type,
    title: job.title,
    job_id: job.job_id,
    seo_page_id: job.seo_page_id || '',
    cta_label: job.cta_label,
  }));
}

function buildRepairPrompt(target, failures, profileSpec, bannedPhrases) {
  const failureLines = failures
    .map((item) => `- ${item.code}${item.detail ? `: ${item.detail}` : ''}`)
    .join('\n');

  const headingLines = (profileSpec.required_headings || []).map((item) => `- ${item}`).join('\n');

  const ctaLine = (profileSpec.required_cta_patterns || []).map((item) => `- ${item}`).join('\n');

  return [
    'Rewrite this SEO page to pass a strict quality gate.',
    '',
    `Route: ${target.route}`,
    `Title: ${target.title}`,
    `Profile: ${target.profile}`,
    '',
    'Failed checks:',
    failureLines || '- unknown failure',
    '',
    'Mandatory heading structure:',
    headingLines,
    '',
    'CTA must include one of:',
    ctaLine,
    '',
    'Additional requirements:',
    '- Keep a practical, expert tone with direct examples.',
    '- Add copy-ready responses and actionable steps.',
    '- Keep paragraphs short and avoid generic filler.',
    '- Do not use banned phrases.',
    '',
    `Banned phrases: ${bannedPhrases.join(' | ')}`,
    '',
    'Return full Markdown only.',
  ].join('\n');
}

function qualityScoreFromIssues(issues) {
  const score = 100 - issues.length * 12;
  return Math.max(0, Math.min(100, score));
}

function uniqueIssueCodes(issues) {
  return [...new Set(issues.map((item) => item.code))];
}

const rules = readJson(QUALITY_RULES_PATH);
const targets = source === 'prompt-jobs' ? buildTargetsFromPromptJobs(PROMPT_JOBS_PATH) : buildTargetsFromManifest(MANIFEST_PATH);
const { headers: seoHeaders, rows: seoRows } = loadCsv(SEO_PAGES_PATH);
const seoByRoute = new Map(seoRows.map((row) => [row.route, row]));
const seoById = new Map(seoRows.map((row) => [row.id, row]));

const failures = [];
const passed = [];
const rewriteQueue = [];
let rewriteCounter = 1;

for (const target of targets) {
  const profileSpec = rules[target.profile];
  if (!profileSpec) continue;

  let content = '';
  try {
    content = readFileSync(target.output_path, 'utf8');
  } catch {
    const issue = [{ code: 'file_missing', detail: target.output_path }];
    failures.push({ route: target.route, profile: target.profile, issues: issue });

    rewriteQueue.push({
      rewrite_id: `REWRITE-${String(rewriteCounter).padStart(4, '0')}`,
      generated_at: GENERATED_AT,
      route: target.route,
      output_path: target.output_path,
      profile: target.profile,
      issues: issue,
      repair_prompt: buildRepairPrompt(target, issue, profileSpec, rules.banned_phrases),
    });
    rewriteCounter += 1;

    const seoRow = (target.seo_page_id && seoById.get(target.seo_page_id)) || seoByRoute.get(target.route);
    if (seoRow) {
      seoRow.status = 'reviewed';
      seoRow.quality_score = '0';
      seoRow.flags = 'file_missing';
      seoRow.refresh_reason = 'quality_gate_failed';
    }
    continue;
  }

  const issues = [];
  const wordCount = countWords(content);

  if (wordCount < profileSpec.word_count.min || wordCount > profileSpec.word_count.max) {
    issues.push({
      code: 'word_count_out_of_range',
      detail: `expected ${profileSpec.word_count.min}-${profileSpec.word_count.max}, got ${wordCount}`,
    });
  }

  for (const heading of profileSpec.required_headings || []) {
    if (!content.includes(heading)) {
      issues.push({ code: 'missing_heading', detail: heading });
    }
  }

  for (const phrase of rules.banned_phrases || []) {
    const regex = new RegExp(escapeRegex(phrase), 'i');
    if (regex.test(content)) {
      issues.push({ code: 'contains_banned_phrase', detail: phrase });
    }
  }

  if (profileSpec.required_cta_patterns?.length) {
    const hasCta = profileSpec.required_cta_patterns.some((pattern) => content.includes(pattern));
    if (!hasCta) {
      issues.push({ code: 'missing_task_cta' });
    }
  }

  for (const schemaTerm of profileSpec.required_schema_terms || []) {
    if (!content.includes(schemaTerm)) {
      issues.push({ code: 'missing_schema_term', detail: schemaTerm });
    }
  }

  if (target.profile === 'problem') {
    for (const tone of profileSpec.required_reply_tones || []) {
      if (!content.includes(tone)) {
        issues.push({ code: 'missing_reply_tone', detail: tone });
      }
    }
  }

  const minimums = profileSpec.minimums || {};

  if (minimums.mistake_bullets) {
    const section =
      extractSection(content, '## Common Mistakes Freelancers Make') ||
      extractSection(content, '## Common Mistakes') ||
      extractSection(content, '## Mistakes That Kill the Deal') ||
      extractSection(content, '## Common Pricing/Negotiation Mistakes');

    const count = countListItems(section);
    if (count < minimums.mistake_bullets) {
      issues.push({
        code: 'insufficient_mistake_items',
        detail: `expected >= ${minimums.mistake_bullets}, got ${count}`,
      });
    }
  }

  if (minimums.reply_subheadings) {
    const section =
      extractSection(content, '## Example Replies (Copy-Paste)') ||
      extractSection(content, '## Reply Variations');

    const count = countSubHeadings(section);
    if (count < minimums.reply_subheadings) {
      issues.push({
        code: 'insufficient_reply_variants',
        detail: `expected >= ${minimums.reply_subheadings}, got ${count}`,
      });
    }
  }

  if (minimums.related_links) {
    const section = extractSection(content, '## Related Guides');
    const count = countMarkdownLinks(section);
    if (count < minimums.related_links) {
      issues.push({
        code: 'insufficient_related_links',
        detail: `expected >= ${minimums.related_links}, got ${count}`,
      });
    }
  }

  if (minimums.faq_questions) {
    const section = extractSection(content, '## FAQ');
    const count = countSubHeadings(section);
    if (count < minimums.faq_questions) {
      issues.push({
        code: 'insufficient_faq_questions',
        detail: `expected >= ${minimums.faq_questions}, got ${count}`,
      });
    }
  }

  const score = qualityScoreFromIssues(issues);
  const seoRow = (target.seo_page_id && seoById.get(target.seo_page_id)) || seoByRoute.get(target.route);

  if (issues.length) {
    failures.push({ route: target.route, profile: target.profile, quality_score: score, issues });

    rewriteQueue.push({
      rewrite_id: `REWRITE-${String(rewriteCounter).padStart(4, '0')}`,
      generated_at: GENERATED_AT,
      route: target.route,
      output_path: target.output_path,
      profile: target.profile,
      issues,
      repair_prompt: buildRepairPrompt(target, issues, profileSpec, rules.banned_phrases),
    });
    rewriteCounter += 1;

    if (seoRow) {
      seoRow.status = 'reviewed';
      seoRow.quality_score = String(score);
      seoRow.flags = uniqueIssueCodes(issues).join('|');
      seoRow.refresh_reason = 'quality_gate_failed';
    }
  } else {
    const autoPublish = score >= 80;
    passed.push({ route: target.route, profile: target.profile, quality_score: score, auto_publish: autoPublish });

    if (seoRow) {
      seoRow.quality_score = String(score);
      seoRow.flags = '';

      if (autoPublish) {
        seoRow.status = 'published';
        seoRow.published_at = seoRow.published_at || GENERATED_AT;
        seoRow.refresh_reason = '';
      } else {
        seoRow.status = 'reviewed';
        seoRow.refresh_reason = 'quality_score_below_threshold';
      }
    }
  }
}

writeCsv(SEO_PAGES_PATH, seoHeaders, seoRows);

mkdirSync(path.dirname(REPORT_JSON), { recursive: true });

const report = {
  generated_at: GENERATED_AT,
  source,
  totals: {
    targets: targets.length,
    passed: passed.length,
    failed: failures.length,
  },
  passed_routes: passed,
  failed_routes: failures,
};

writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`);

const rewriteText = rewriteQueue.map((item) => JSON.stringify(item)).join('\n');
writeFileSync(REWRITE_QUEUE_JSONL, `${rewriteText}${rewriteText ? '\n' : ''}`);

const mdLines = [
  '# Flowdockr SEO Content Quality Report v2',
  '',
  `Generated: ${GENERATED_AT}`,
  `Source: ${source}`,
  '',
  `- targets: ${targets.length}`,
  `- passed: ${passed.length}`,
  `- failed: ${failures.length}`,
  `- rewrite queue: ${REWRITE_QUEUE_JSONL}`,
  `- status db updated: ${SEO_PAGES_PATH}`,
  '',
  '## Failure Breakdown',
  '',
];

if (!failures.length) {
  mdLines.push('- No failures.');
} else {
  for (const item of failures.slice(0, 120)) {
    const details = item.issues.map((issue) => `${issue.code}${issue.detail ? ` (${issue.detail})` : ''}`);
    mdLines.push(`- ${item.route}: score=${item.quality_score}; ${details.join('; ')}`);
  }
}

mdLines.push('');
writeFileSync(REPORT_MD, mdLines.join('\n'));

if (failures.length && !allowFailures) {
  console.error(`Quality gate failed: ${failures.length}/${targets.length} pages.`);
  console.error(`Report: ${REPORT_JSON}`);
  console.error(`Rewrite queue: ${REWRITE_QUEUE_JSONL}`);
  process.exit(1);
}

console.log(`Quality gate completed: ${passed.length} passed, ${failures.length} failed.`);
console.log(`Report: ${REPORT_JSON}`);
console.log(`Rewrite queue: ${REWRITE_QUEUE_JSONL}`);
console.log(`Status DB: ${SEO_PAGES_PATH}`);

if (failures.length && allowFailures) {
  console.log('Failures allowed by --allow-failures flag.');
}
