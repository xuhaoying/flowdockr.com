import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const INTENTS_PATH = 'product/seo/factory/intents.v2.json';
const ASSETS_PATH = 'product/seo/factory/assets.v2.json';
const PILLARS_PATH = 'product/seo/factory/pillars.v2.json';
const TOOLS_PATH = 'product/seo/factory/tools.v2.json';
const OUTPUT_DIR = 'content/pages';
const MANIFEST_PATH = 'product/seo/generated/programmatic-pages-v2.json';
const GENERATED_DATE = '2026-03-04';

const clusterRouteMap = {
  'negotiation-discount': '/negotiation',
  'pricing-strategy': '/pricing',
  'client-communication': '/client-communication',
  'proposal-and-close': '/proposals',
  'rate-increase-negotiation': '/rate-increase',
};

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function toTitle(text) {
  return text
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

function routeToFilePath(route) {
  const segments = route.replace(/^\//, '').split('/').filter(Boolean);
  return path.join(OUTPUT_DIR, ...segments) + '.mdx';
}

function taskCtaLabel(ctaType) {
  if (ctaType === 'pricing') return 'Calculate my minimum and ideal price';
  if (ctaType === 'proposal') return 'Create my proposal draft now';
  return 'Generate my reply (20s)';
}

function toolCtaLabel(toolType) {
  if (toolType === 'pricing') return 'Open Pricing Module';
  if (toolType === 'proposal') return 'Open Scope Module';
  return 'Open Deal Module';
}

function buildProblemPage({ intent, asset, related, pillarRoute, toolPageRoute }) {
  const title = toTitle(intent.situation);
  const description = `Action-ready playbook for ${intent.situation}: strategy summary, mistakes to avoid, and 3 copy-paste replies.`;
  const strategyLines = asset.strategy_steps.map((step) => `1. ${step}`).join('\n');
  const pitfalls = asset.pitfalls.map((item) => `- ${item}`).join('\n');

  const replies = asset.reply_templates
    .map((template) => {
      const toneTitle =
        template.tone === 'soft'
          ? 'Soft Version'
          : template.tone === 'neutral'
            ? 'Neutral Version'
            : 'Boundary Version';

      return `### ${toneTitle}\n\n${template.content}`;
    })
    .join('\n\n');

  const relatedLinks = related.length
    ? related.map((item) => `- [${item.title}](${item.route})`).join('\n')
    : '- More pages in this cluster are being published this week.';

  const faqLines = asset.faq
    .map(
      (question) =>
        `### ${question}\n\nUse the same framework: clarify constraints, protect outcome quality, offer structured options, and define next step.`
    )
    .join('\n\n');

  return `---
title: ${title}
description: ${description}
created_at: ${GENERATED_DATE}
---

## 20-Second Strategy Summary

If this issue is happening now, do not discount immediately. Confirm the constraint, reframe around business outcome, then present 2-3 scoped options with a clear next step.

## Problem Context

Freelancers search for **${intent.situation}** when a live deal is at risk. The goal is to keep relationship quality while protecting margin and delivery confidence.

## Why This Happens

- Budget pressure appears late because scope was not tied to outcome early.
- Clients compare quotes without comparing risk and execution quality.
- Communication lacks explicit decision criteria and timeline.

## Common Mistakes

${pitfalls}

## Correct Strategy

${strategyLines}

## Copy-Paste Replies

${replies}

## Customize Before Sending

Set these variables before you generate your final version:

- Project budget context
- Timeline and urgency constraints
- Scope boundaries and revision policy
- Client type and relationship stage

## Flowdockr Instant Generator

[${taskCtaLabel(intent.tool_cta_type)}](${intent.target_route})

You will get instant output with 2-3 alternatives you can copy immediately.

## Internal Navigation

- [Read the pillar guide](${pillarRoute})
- [Use the matching tool page](${toolPageRoute})
${relatedLinks}

## FAQ

${faqLines}
`;
}

function buildPillarPage({ pillar, clusterIntents, toolLinks }) {
  const publishedIntents = clusterIntents.filter((intent) => intent.page_type === 'problem');
  const backlogIntents = clusterIntents.filter((intent) => intent.page_type !== 'problem');

  const list = publishedIntents.slice(0, 40).map((intent) => {
    return `- [${toTitle(intent.situation)}](${intent.canonical_url})`;
  });

  const backlog = backlogIntents
    .slice(0, 20)
    .map((intent) => `- ${toTitle(intent.situation)}`)
    .join('\n');

  const toolList = toolLinks.map((tool) => `- [${tool.title}](${tool.route})`).join('\n');

  return `---
title: ${pillar.title}
description: ${pillar.description}
created_at: ${GENERATED_DATE}
---

## What This Pillar Covers

This pillar is designed as an operational playbook, not a blog post. It maps problem signals, response frameworks, and conversion actions into one execution path.

## Core Framework

1. Identify client intent behind the objection.
2. Keep negotiation anchored to outcome and risk.
3. Use options and boundaries instead of emotional reactions.
4. Move every message toward a clear decision.

## High-Intent Cluster Pages

${list.join('\n') || '- Cluster pages will appear here as they are published.'}

## Backlog Expansion Opportunities

${backlog || '- Backlog queue is currently empty for this cluster.'}

## Tool Shortcuts

${toolList}

## Conversion Workflow

Search intent -> problem page -> instant generator -> save/copy -> signup -> paid workflow.

[${toolCtaLabel(pillar.tool_cta_type)}](${pillar.target_route})
`;
}

function buildToolPage(tool) {
  const quickInputs = tool.quick_inputs.map((item) => `- ${item}`).join('\n');

  return `---
title: ${tool.title}
description: ${tool.description}
created_at: ${GENERATED_DATE}
---

## Tool Purpose

${tool.description}

## Quick Inputs

${quickInputs}

## Output You Get

- Version A: collaborative tone
- Version B: direct negotiation tone
- Version C: boundary-first tone

## Use This Tool Now

[${taskCtaLabel(tool.tool_cta_type)}](${tool.target_route})

## Why This Converts

Users arrive with active urgency and leave with ready-to-send output in under a minute.
`;
}

function buildToolsHub(tools) {
  const links = tools.map((tool) => `- [${tool.title}](${tool.route})`).join('\n');

  return `---
title: Flowdockr Tools Hub
description: Task-first tools for discount replies, follow-ups, pricing, and proposals.
created_at: ${GENERATED_DATE}
---

## Tool Catalog

${links}

## Activation Design

Each tool supports instant output first, with save/upgrade actions after value is delivered.
`;
}

function buildBacklogHub({ title, description, items, targetRoute }) {
  const rows = items.length
    ? items.map((item) => `- ${toTitle(item.situation)}`).join('\n')
    : '- Backlog items will appear after queue expansion.';

  return `---
title: ${title}
description: ${description}
created_at: ${GENERATED_DATE}
---

## Backlog Opportunities

${rows}

## Next Action

[Calculate my minimum and ideal price](${targetRoute})
`;
}

const intents = readJson(INTENTS_PATH);
const assets = readJson(ASSETS_PATH);
const pillars = readJson(PILLARS_PATH);
const tools = readJson(TOOLS_PATH);

const assetMap = new Map(assets.map((asset) => [asset.intent_id, asset]));

mkdirSync(OUTPUT_DIR, { recursive: true });
mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });

const manifest = {
  generatedAt: `${GENERATED_DATE}T00:00:00Z`,
  source: {
    intents: INTENTS_PATH,
    assets: ASSETS_PATH,
    pillars: PILLARS_PATH,
    tools: TOOLS_PATH,
  },
  pages: [],
};

const toolByType = {
  reply: tools.find((tool) => tool.tool_cta_type === 'reply'),
  pricing: tools.find((tool) => tool.tool_cta_type === 'pricing'),
  proposal: tools.find((tool) => tool.tool_cta_type === 'proposal'),
};

for (const intent of intents.filter((item) => item.page_type === 'problem')) {
  const routeBase = clusterRouteMap[intent.cluster] || '/negotiation';
  const route = intent.canonical_url || `${routeBase}/${toSlug(intent.situation)}`;

  const asset = assetMap.get(intent.intent_id);
  if (!asset) continue;

  const clusterPillar = pillars.find((pillar) => pillar.cluster === intent.cluster) || pillars[0];
  const toolPage = toolByType[intent.tool_cta_type] || tools[0];

  const related = intents
    .filter(
      (item) =>
        item.page_type === 'problem' && item.cluster === intent.cluster && item.intent_id !== intent.intent_id
    )
    .slice(0, 4)
    .map((item) => ({
      title: toTitle(item.situation),
      route: item.canonical_url,
    }));

  const content = buildProblemPage({
    intent,
    asset,
    related,
    pillarRoute: clusterPillar.route,
    toolPageRoute: toolPage.route,
  });

  const filePath = routeToFilePath(route);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);

  manifest.pages.push({
    page_type: 'problem',
    route,
    intent_id: intent.intent_id,
    cluster: intent.cluster,
    cta_type: intent.tool_cta_type,
  });
}

for (const pillar of pillars) {
  const clusterIntents = intents.filter((intent) => intent.cluster === pillar.cluster);
  const toolLinks = tools.filter(
    (tool) => tool.tool_cta_type === pillar.tool_cta_type || pillar.tool_cta_type === 'reply'
  );

  const content = buildPillarPage({
    pillar,
    clusterIntents,
    toolLinks: toolLinks.length ? toolLinks : tools,
  });

  const filePath = routeToFilePath(pillar.route);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);

  manifest.pages.push({
    page_type: 'pillar',
    route: pillar.route,
    pillar_id: pillar.pillar_id,
    cluster: pillar.cluster,
  });
}

for (const tool of tools) {
  const content = buildToolPage(tool);
  const filePath = routeToFilePath(tool.route);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, content);

  manifest.pages.push({
    page_type: 'tool',
    route: tool.route,
    tool_id: tool.tool_id,
    cta_type: tool.tool_cta_type,
  });
}

const toolsHubPath = routeToFilePath('/tools');
writeFileSync(toolsHubPath, buildToolsHub(tools));
manifest.pages.push({
  page_type: 'tool_hub',
  route: '/tools',
});

const rateIncreaseBacklog = intents.filter(
  (intent) => intent.cluster === 'rate-increase-negotiation'
);
const rateIncreaseHubPath = routeToFilePath('/rate-increase');
writeFileSync(
  rateIncreaseHubPath,
  buildBacklogHub({
    title: 'Rate Increase Playbooks',
    description:
      'High-intent scenarios for raising freelance rates, contract renegotiation, and premium positioning.',
    items: rateIncreaseBacklog.slice(0, 24),
    targetRoute: '/pricing',
  })
);
manifest.pages.push({
  page_type: 'cluster_hub',
  route: '/rate-increase',
  cluster: 'rate-increase-negotiation',
});

writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

const summary = manifest.pages.reduce((acc, item) => {
  acc[item.page_type] = (acc[item.page_type] || 0) + 1;
  return acc;
}, {});

console.log(`Generated v2 programmatic pages: ${manifest.pages.length}`);
console.log(summary);
console.log(`Manifest: ${MANIFEST_PATH}`);
