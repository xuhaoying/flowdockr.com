import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const CURATED_DB = 'product/seo/flowdockr-keyword-library-curated-v1.csv';
const PHASE1_QUEUE = 'product/seo/flowdockr-phase1-queue-30.csv';
const OUTPUT_INTENTS = 'product/seo/factory/intents.v2.json';
const OUTPUT_ASSETS = 'product/seo/factory/assets.v2.json';

const clusterRouteMap = {
  'negotiation-discount': '/negotiation',
  'pricing-strategy': '/pricing',
  'client-communication': '/client-communication',
  'proposal-and-close': '/proposals',
  'rate-increase-negotiation': '/rate-increase',
};

const ctaTypeMap = {
  'negotiation-discount': 'reply',
  'pricing-strategy': 'pricing',
  'client-communication': 'reply',
  'proposal-and-close': 'proposal',
  'rate-increase-negotiation': 'pricing',
};

function parseCsvLine(line) {
  const matches = [...line.matchAll(/"((?:[^"]|"")*)"(?=,|$)/g)];
  return matches.map((m) => m[1].replace(/""/g, '"'));
}

function loadCsv(filePath) {
  const lines = readFileSync(filePath, 'utf8').trim().split('\n');
  const headers = lines[0].split(',').map((item) => item.replace(/"/g, ''));
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] ?? '';
    });
    return row;
  });
}

function inferUrgency(keyword, cluster) {
  const normalized = keyword.toLowerCase();
  if (
    /discount|too expensive|low offer|ghost|not responding|price reduction|budget objection/.test(
      normalized
    )
  ) {
    return 'high';
  }

  if (cluster === 'proposal-and-close' || cluster === 'pricing-strategy') {
    return 'medium';
  }

  return 'low';
}

function inferAudience(keyword) {
  const normalized = keyword.toLowerCase();
  if (/designer/.test(normalized)) return 'designer';
  if (/developer|dev/.test(normalized)) return 'developer';
  if (/video/.test(normalized)) return 'video-editor';
  if (/copywriter|copywriting/.test(normalized)) return 'copywriter';
  return 'freelancer-general';
}

function inferVariables(ctaType) {
  if (ctaType === 'pricing') {
    return ['quoted_price', 'minimum_price', 'timeline_days', 'deliverables', 'client_type'];
  }

  if (ctaType === 'proposal') {
    return ['deliverables', 'timeline_days', 'revision_limit', 'client_type', 'payment_terms'];
  }

  return ['quoted_price', 'deadline', 'scope', 'client_type', 'relationship_stage'];
}

function toSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90);
}

const curatedRows = loadCsv(CURATED_DB);
const phase1Rows = loadCsv(PHASE1_QUEUE);

const phase1Map = new Map(phase1Rows.map((row) => [row.id, row]));

const intents = curatedRows.map((row) => {
  const cluster = row.cluster;
  const ctaType = ctaTypeMap[cluster] || 'reply';
  const routeBase = clusterRouteMap[cluster] || '/negotiation';

  const phase1 = phase1Map.get(row.id);
  const canonicalUrl = phase1
    ? phase1.recommended_url.replace('/blog', routeBase)
    : `${routeBase}/${toSlug(row.keyword)}`;

  const siblingKeywords = curatedRows
    .filter((item) => item.cluster === cluster && item.id !== row.id)
    .slice(0, 4)
    .map((item) => item.keyword);

  return {
    intent_id: row.id,
    cluster,
    situation: row.keyword,
    audience: inferAudience(row.keyword),
    urgency: inferUrgency(row.keyword, cluster),
    page_type: phase1 ? 'problem' : 'cluster_backlog',
    keywords: {
      primary: row.keyword,
      variants: siblingKeywords,
    },
    variables_needed: inferVariables(ctaType),
    canonical_url: canonicalUrl,
    internal_links: {
      pillar: routeBase,
      related: siblingKeywords.map((keyword) => `${routeBase}/${toSlug(keyword)}`),
    },
    tool_cta_type: ctaType,
    target_route: row.target_route,
    source: row.source,
    priority: row.priority,
  };
});

const assets = intents.map((intent) => {
  const primary = intent.keywords.primary;

  const replyTemplates = [
    {
      tone: 'soft',
      content:
        'I understand the constraint around ' +
        primary +
        '. I can keep quality intact by adjusting scope or timeline so we stay aligned on outcome.',
    },
    {
      tone: 'neutral',
      content:
        'Thanks for clarifying. Based on the current scope, I recommend keeping the core deliverables and selecting one of two options that fit your budget and deadline.',
    },
    {
      tone: 'boundary',
      content:
        'I cannot reduce price without changing scope because that would reduce quality. If helpful, I can share a reduced-scope option and a full-scope option for decision.',
    },
  ];

  return {
    intent_id: intent.intent_id,
    strategy_steps: [
      'Acknowledge the client concern and keep tone calm.',
      'Reframe discussion around outcome and risk.',
      'Offer options with explicit trade-offs.',
      'Confirm next step and decision deadline.',
    ],
    pitfalls: [
      'Discounting immediately without a trade-off.',
      'Over-explaining without proposing options.',
      'Leaving next step ambiguous.',
    ],
    reply_templates: replyTemplates,
    examples: [
      'Scope trade: remove one deliverable and keep timeline.',
      'Timeline trade: keep scope, extend deadline.',
      'Payment terms trade: split milestones and keep price.',
    ],
    faq: [
      'How many follow-ups are acceptable before closing the thread?',
      'Should I ever offer a discount first?',
      'What should I do if the client compares cheaper freelancers?',
    ],
    schema_jsonld: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
    },
  };
});

mkdirSync('product/seo/factory', { recursive: true });

writeFileSync(OUTPUT_INTENTS, `${JSON.stringify(intents, null, 2)}\n`);
writeFileSync(OUTPUT_ASSETS, `${JSON.stringify(assets, null, 2)}\n`);

const summary = intents.reduce((acc, item) => {
  acc[item.page_type] = (acc[item.page_type] || 0) + 1;
  return acc;
}, {});

console.log(`Generated ${OUTPUT_INTENTS} (${intents.length} intents)`);
console.log(`Generated ${OUTPUT_ASSETS} (${assets.length} assets)`);
console.log(summary);
