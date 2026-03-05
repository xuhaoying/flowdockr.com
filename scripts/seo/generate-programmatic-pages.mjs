import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const QUEUE_PATH = 'product/seo/flowdockr-phase1-queue-30.csv';
const CURATED_PATH = 'product/seo/flowdockr-keyword-library-curated-v1.csv';
const OUTPUT_DIR = 'content/pages';
const MANIFEST_PATH = 'product/seo/generated/programmatic-pages-phase1.json';
const GENERATED_DATE = '2026-03-04';

const CLUSTER_CONFIG = {
  'negotiation-discount': {
    routeBase: '/negotiation',
    hubRoute: '/negotiation',
    clusterLabel: 'Negotiation',
    hubTitle: 'Freelance Negotiation Playbooks',
    hubDescription:
      'Problem-first negotiation guides for discount requests, budget objections, and price pressure.',
    defaultToolCta: '/deal',
  },
  'pricing-strategy': {
    routeBase: '/pricing',
    hubRoute: '/pricing/playbooks',
    clusterLabel: 'Pricing',
    hubTitle: 'Freelance Pricing Playbooks',
    hubDescription:
      'Pricing guides, quote structures, and rate calculator workflows tied to real client situations.',
    defaultToolCta: '/pricing',
  },
  'client-communication': {
    routeBase: '/communication',
    hubRoute: '/communication',
    clusterLabel: 'Client Communication',
    hubTitle: 'Client Communication Playbooks',
    hubDescription:
      'Follow-up, ghosting, and message strategy guides for stalled client conversations.',
    defaultToolCta: '/deal',
  },
  'proposal-and-close': {
    routeBase: '/proposals',
    hubRoute: '/proposals',
    clusterLabel: 'Proposal',
    hubTitle: 'Proposal And Close Playbooks',
    hubDescription:
      'Proposal writing and closing scripts focused on conversion and scope clarity.',
    defaultToolCta: '/scope',
  },
  'rate-increase-negotiation': {
    routeBase: '/rate-increase',
    hubRoute: '/rate-increase',
    clusterLabel: 'Rate Increase',
    hubTitle: 'Rate Increase Playbooks',
    hubDescription:
      'Positioning and negotiation frameworks for raising freelance rates with confidence.',
    defaultToolCta: '/pricing',
  },
};

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map((m) => m[1].replace(/""/g, '"'));
}

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',').map((v) => v.replace(/"/g, ''));

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    return row;
  });
}

function toTitle(text) {
  return text
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function routeToFilePath(route) {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  return path.join(OUTPUT_DIR, ...segments) + '.mdx';
}

function ctaLabel(route) {
  if (route === '/deal') return 'Generate your negotiation reply in Flowdockr';
  if (route === '/pricing') return 'Generate your pricing strategy in Flowdockr';
  if (route === '/scope') return 'Generate your scope policy in Flowdockr';
  return 'Open Flowdockr';
}

function sectionTitle(route) {
  if (route === '/deal') return 'Flowdockr negotiation workflow';
  if (route === '/pricing') return 'Flowdockr pricing workflow';
  if (route === '/scope') return 'Flowdockr proposal workflow';
  return 'Flowdockr workflow';
}

function pageDescription(keyword) {
  if (keyword.toLowerCase().startsWith('how to ')) {
    return `Practical framework for freelancers: ${keyword}, with copy-paste examples and Flowdockr workflow.`;
  }

  return `How freelancers can handle ${keyword} with clear strategy, copy-paste examples, and Flowdockr workflow.`;
}

function buildPageMarkdown({
  title,
  keyword,
  description,
  targetRoute,
  relatedLinks,
  hubRoute,
  hubTitle,
}) {
  const related = relatedLinks
    .map((item) => `- [${item.title}](${item.route})`)
    .join('\n');

  return `---
title: ${title}
description: ${description}
created_at: ${GENERATED_DATE}
---

## Problem

Freelancers search for **${keyword}** when a live client conversation is at risk. This playbook gives a practical response path instead of generic advice.

## Why This Happens

- Budget pressure or unclear project scope creates negotiation friction.
- Value is not translated into business outcomes early enough.
- Communication timing and wording increase client uncertainty.

## Common Mistakes

1. Cutting price immediately without changing scope or terms.
2. Sending long explanations without a decision framework.
3. Replying late and losing control of negotiation context.

## Correct Strategy

1. Confirm the client's constraint without accepting a lower price immediately.
2. Reframe around scope, risk, and expected outcome.
3. Offer structured options with explicit trade-offs.
4. Move the conversation to a clear next decision.

## Example Reply

"I understand the budget concern. To protect outcomes, I recommend keeping the core scope and adjusting timeline or deliverables instead of reducing quality. I can share two options so you can choose what fits your budget and goals."

## ${sectionTitle(targetRoute)}

Use Flowdockr to generate a tailored message based on your situation, scope, and negotiation constraints.

[${ctaLabel(targetRoute)}](${targetRoute})

## Related Pages

- [Back to ${hubTitle}](${hubRoute})
${related || '- More pages in this cluster are publishing this week.'}
`;
}

function buildHubMarkdown({ title, description, links, ctaRoute, ctaText }) {
  const linkLines = links.length
    ? links.map((item) => `- [${item.title}](${item.route})`).join('\n')
    : '- New pages in this cluster are scheduled in the next publishing cycle.';

  return `---
title: ${title}
description: ${description}
created_at: ${GENERATED_DATE}
---

## Overview

This hub organizes high-intent freelancer problems into practical, executable playbooks.

## Featured Playbooks

${linkLines}

## Use Flowdockr

[${ctaText}](${ctaRoute})
`;
}

const queueRows = loadCsv(QUEUE_PATH);
const curatedRows = loadCsv(CURATED_PATH);

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

const pages = [];
const rowsByCluster = {};
for (const row of queueRows) {
  if (!rowsByCluster[row.cluster]) rowsByCluster[row.cluster] = [];
  rowsByCluster[row.cluster].push(row);
}

for (const row of queueRows) {
  const config = CLUSTER_CONFIG[row.cluster];
  if (!config) continue;

  const slug = row.recommended_url.replace('/blog/', '');
  const route = `${config.routeBase}/${slug}`;
  const title = toTitle(row.keyword);
  const description = pageDescription(row.keyword);

  const relatedRows = (rowsByCluster[row.cluster] || [])
    .filter((item) => item.id !== row.id)
    .slice(0, 3)
    .map((item) => {
      const relatedSlug = item.recommended_url.replace('/blog/', '');
      return {
        title: toTitle(item.keyword),
        route: `${config.routeBase}/${relatedSlug}`,
      };
    });

  const markdown = buildPageMarkdown({
    title,
    keyword: row.keyword,
    description,
    targetRoute: row.target_route,
    relatedLinks: relatedRows,
    hubRoute: config.hubRoute,
    hubTitle: config.hubTitle,
  });

  const filePath = routeToFilePath(route);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, markdown);

  pages.push({
    id: row.id,
    keyword: row.keyword,
    cluster: row.cluster,
    route,
    hubRoute: config.hubRoute,
    targetRoute: row.target_route,
    source: row.source,
    priority: row.priority,
  });
}

const hubs = [];

for (const [cluster, cfg] of Object.entries(CLUSTER_CONFIG)) {
  let links = (rowsByCluster[cluster] || []).slice(0, 10).map((row) => {
    const slug = row.recommended_url.replace('/blog/', '');
    return {
      title: toTitle(row.keyword),
      route: `${cfg.routeBase}/${slug}`,
    };
  });

  if (cluster === 'rate-increase-negotiation' && links.length === 0) {
    links = curatedRows
      .filter((row) => row.cluster === cluster)
      .slice(0, 8)
      .map((row) => ({
        title: toTitle(row.keyword),
        route: '/pricing',
      }));
  }

  if (cluster === 'pricing-strategy') {
    const markdown = buildHubMarkdown({
      title: cfg.hubTitle,
      description: cfg.hubDescription,
      links,
      ctaRoute: '/pricing',
      ctaText: 'Open Pricing Module',
    });

    const filePath = routeToFilePath(cfg.hubRoute);
    mkdirSync(path.dirname(filePath), { recursive: true });
    writeFileSync(filePath, markdown);

    hubs.push({ route: cfg.hubRoute, cluster, title: cfg.hubTitle });
    continue;
  }

  const markdown = buildHubMarkdown({
    title: cfg.hubTitle,
    description: cfg.hubDescription,
    links,
    ctaRoute: cfg.defaultToolCta,
    ctaText: ctaLabel(cfg.defaultToolCta),
  });

  const filePath = routeToFilePath(cfg.hubRoute);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, markdown);

  hubs.push({ route: cfg.hubRoute, cluster, title: cfg.hubTitle });
}

const emailScriptLinks = queueRows
  .filter((row) => row.content_type === 'template')
  .slice(0, 12)
  .map((row) => {
    const cfg = CLUSTER_CONFIG[row.cluster];
    const slug = row.recommended_url.replace('/blog/', '');
    return {
      title: toTitle(row.keyword),
      route: `${cfg.routeBase}/${slug}`,
    };
  });

const emailScriptsMarkdown = buildHubMarkdown({
  title: 'Freelance Email Scripts',
  description:
    'Email and message templates for discount objections, follow-ups, and proposal conversations.',
  links: emailScriptLinks,
  ctaRoute: '/deal',
  ctaText: 'Generate your negotiation reply in Flowdockr',
});

const emailScriptsPath = routeToFilePath('/email-scripts');
mkdirSync(path.dirname(emailScriptsPath), { recursive: true });
writeFileSync(emailScriptsPath, emailScriptsMarkdown);
hubs.push({
  route: '/email-scripts',
  cluster: 'cross-cluster-template',
  title: 'Freelance Email Scripts',
});

const manifest = {
  generatedAt: `${GENERATED_DATE}T00:00:00Z`,
  sourceQueue: QUEUE_PATH,
  pageCount: pages.length,
  hubCount: hubs.length,
  pages,
  hubs,
};

writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Generated ${pages.length} programmatic pages and ${hubs.length} hubs.`);
console.log(`Manifest: ${MANIFEST_PATH}`);
