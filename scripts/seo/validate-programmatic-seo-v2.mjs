import { readFileSync } from 'node:fs';
import path from 'node:path';

const MANIFEST_PATH = 'product/seo/generated/programmatic-pages-v2.json';
const CONTENT_ROOT = 'content/pages';

const REQUIRED_HEADINGS_PROBLEM = [
  '## 20-Second Strategy Summary',
  '## Problem Context',
  '## Why This Happens',
  '## Common Mistakes',
  '## Correct Strategy',
  '## Copy-Paste Replies',
  '## Flowdockr Instant Generator',
];

const REQUIRED_REPLY_VARIANTS = [
  '### Soft Version',
  '### Neutral Version',
  '### Boundary Version',
];

function routeToFilePath(route) {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  return path.join(CONTENT_ROOT, ...segments) + '.mdx';
}

function countWords(text) {
  const cleaned = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*\-\[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned ? cleaned.split(' ').length : 0;
}

const manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'));
const failures = [];

for (const page of manifest.pages) {
  const filePath = routeToFilePath(page.route);
  let content = '';

  try {
    content = readFileSync(filePath, 'utf8');
  } catch (error) {
    failures.push({ route: page.route, reason: 'file_missing' });
    continue;
  }

  if (/as an ai/i.test(content)) {
    failures.push({ route: page.route, reason: 'contains_ai_disclaimer' });
  }

  const wordCount = countWords(content);

  if (page.page_type === 'problem') {
    if (wordCount < 350 || wordCount > 2000) {
      failures.push({
        route: page.route,
        reason: 'word_count_out_of_range',
        details: `word_count=${wordCount}`,
      });
    }

    for (const heading of REQUIRED_HEADINGS_PROBLEM) {
      if (!content.includes(heading)) {
        failures.push({ route: page.route, reason: 'missing_heading', details: heading });
      }
    }

    for (const variant of REQUIRED_REPLY_VARIANTS) {
      if (!content.includes(variant)) {
        failures.push({ route: page.route, reason: 'missing_reply_variant', details: variant });
      }
    }

    if (!/Generate my reply \(20s\)|Calculate my minimum and ideal price|Create my proposal draft now/.test(content)) {
      failures.push({ route: page.route, reason: 'missing_task_cta' });
    }
  }

  if (page.page_type === 'tool') {
    if (!content.includes('## Quick Inputs')) {
      failures.push({ route: page.route, reason: 'tool_missing_quick_inputs' });
    }

    if (!content.includes('## Use This Tool Now')) {
      failures.push({ route: page.route, reason: 'tool_missing_use_now' });
    }
  }
}

if (failures.length) {
  console.error('SEO v2 quality gate failed.');
  for (const failure of failures) {
    console.error(JSON.stringify(failure));
  }
  process.exit(1);
}

console.log(`SEO v2 quality gate passed for ${manifest.pages.length} pages.`);
