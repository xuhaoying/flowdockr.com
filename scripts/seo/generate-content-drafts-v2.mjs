import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const JOBS_PATH = 'product/seo/generated/content-prompt-jobs-v2.jsonl';
const OUTPUT_DRAFTS = 'product/seo/generated/content-drafts-v2.jsonl';
const OUTPUT_SUMMARY = 'product/seo/generated/content-drafts-v2.summary.md';
const GENERATED_AT = '2026-03-05';

const argv = process.argv.slice(2);
const dryRun = argv.includes('--dry-run');
const limitArg = argv.find((arg) => arg.startsWith('--limit='));
const modelArg = argv.find((arg) => arg.startsWith('--model='));
const maxRetriesArg = argv.find((arg) => arg.startsWith('--max-retries='));

const limit = limitArg ? Number(limitArg.split('=')[1]) : null;
const model = modelArg ? modelArg.split('=')[1] : process.env.SEO_CONTENT_MODEL || 'gpt-4.1-mini';
const maxRetries = maxRetriesArg ? Number(maxRetriesArg.split('=')[1]) : 2;
const apiKey = process.env.OPENAI_API_KEY || '';

function readJsonl(filePath) {
  const content = readFileSync(filePath, 'utf8').trim();
  if (!content) return [];
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function writeJsonl(filePath, rows) {
  const text = rows.map((row) => JSON.stringify(row)).join('\n');
  writeFileSync(filePath, `${text}${text ? '\n' : ''}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function dryRunMarkdown(job) {
  const headingLines = (job.required_headings || []).join('\n\n');

  return `---
title: ${job.title}
description: ${job.title} practical guide for freelancers.
created_at: ${GENERATED_AT}
route: ${job.route}
---

${headingLines}

This is a dry-run draft generated for pipeline validation. Replace with model output before production publishing.

`;
}

async function generateWithOpenAI(job) {
  const body = {
    model,
    temperature: 0.3,
    messages: [
      { role: 'system', content: job.system_prompt },
      { role: 'user', content: job.user_prompt },
    ],
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`openai_error_${response.status}: ${text.slice(0, 400)}`);
  }

  const data = await response.json();
  const markdown = String(data?.choices?.[0]?.message?.content || '').trim();
  if (!markdown) {
    throw new Error('empty_model_output');
  }

  return markdown;
}

async function generateWithRetry(job) {
  if (dryRun) return { markdown: dryRunMarkdown(job), retries: 0, mode: 'dry-run' };

  let attempt = 0;
  let lastError = null;

  while (attempt <= maxRetries) {
    try {
      const markdown = await generateWithOpenAI(job);
      return { markdown, retries: attempt, mode: 'openai' };
    } catch (error) {
      lastError = error;
      if (attempt === maxRetries) break;
      await sleep(800 * (attempt + 1));
    }
    attempt += 1;
  }

  throw lastError || new Error('draft_generation_failed');
}

if (!dryRun && !apiKey) {
  console.error('OPENAI_API_KEY is required unless --dry-run is set.');
  process.exit(1);
}

const allJobs = readJsonl(JOBS_PATH);
const jobs = limit && Number.isFinite(limit) ? allJobs.slice(0, limit) : allJobs;

const drafts = [];
const failures = [];

for (const job of jobs) {
  try {
    const generated = await generateWithRetry(job);
    drafts.push({
      job_id: job.job_id,
      seo_page_id: job.seo_page_id,
      route: job.route,
      output_path: job.output_path,
      model,
      mode: generated.mode,
      retries: generated.retries,
      generated_at: GENERATED_AT,
      markdown: generated.markdown,
    });
  } catch (error) {
    failures.push({
      job_id: job.job_id,
      route: job.route,
      error: String(error?.message || error),
    });
  }
}

mkdirSync(path.dirname(OUTPUT_DRAFTS), { recursive: true });
writeJsonl(OUTPUT_DRAFTS, drafts);

const summaryLines = [
  '# Flowdockr SEO Draft Generation v2',
  '',
  `Generated: ${GENERATED_AT}`,
  `Model: ${model}`,
  `Mode: ${dryRun ? 'dry-run' : 'openai'}`,
  '',
  `- source jobs: ${allJobs.length}`,
  `- processed jobs: ${jobs.length}`,
  `- drafts generated: ${drafts.length}`,
  `- failures: ${failures.length}`,
  `- output: ${OUTPUT_DRAFTS}`,
  '',
  '## Failures',
  '',
];

if (!failures.length) {
  summaryLines.push('- none');
} else {
  for (const item of failures.slice(0, 100)) {
    summaryLines.push(`- ${item.job_id} ${item.route}: ${item.error}`);
  }
}
summaryLines.push('');

writeFileSync(OUTPUT_SUMMARY, summaryLines.join('\n'));

console.log(`Draft generation complete. Drafts: ${drafts.length}, Failures: ${failures.length}`);
console.log(`Output: ${OUTPUT_DRAFTS}`);
console.log(`Summary: ${OUTPUT_SUMMARY}`);

if (failures.length) {
  process.exitCode = 1;
}
