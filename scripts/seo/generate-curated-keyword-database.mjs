import { writeFileSync } from 'node:fs';

const CLUSTERS = {
  'negotiation-discount': {
    prefix: 'NEG',
    intent: 'price-objection-handling',
    route: '/deal',
    seed: [
      'client asking for discount',
      'client wants lower price',
      'client says my price is too high',
      'client asking for cheaper rate',
      'client says budget is low',
      'client negotiating price freelancer',
      'client wants to pay less',
      'client comparing freelancers price',
      'client says other freelancer cheaper',
      'client pushing for lower rate',
      'client asking for price reduction',
      'client requesting discount freelancer',
      'how to respond to client discount request',
      'how to respond to low offer client',
      'how to reply when client says too expensive',
      'freelancer negotiation script',
      'freelance price negotiation email',
      'how to say no to client discount',
      'how to negotiate freelance price',
      'how to respond to budget objection',
      'client wants cheaper quote',
    ],
    expansion: [
      'how to respond when client asks for discount',
      'how to respond when client says budget is low',
      'how to respond when client compares freelancers',
    ],
  },
  'pricing-strategy': {
    prefix: 'PRI',
    intent: 'quote-and-rate-setting',
    route: '/pricing',
    seed: [
      'freelance pricing strategy',
      'how to price freelance work',
      'how to charge clients freelancer',
      'freelance rate calculator',
      'how to calculate freelance rate',
      'freelancer hourly vs project pricing',
      'how to quote freelance project',
      'freelance pricing formula',
      'freelance pricing model',
      'how much should I charge freelancer',
      'freelance project pricing',
      'freelance rate benchmark',
      'freelance design pricing',
      'freelance copywriting pricing',
      'freelance developer rates',
      'pricing freelance services',
      'how to set freelance rates',
      'increase freelance pricing',
      'freelancer price guide',
      'how to avoid underpricing freelance',
    ],
    expansion: [
      'freelance pricing template',
      'how to build a freelance pricing package',
      'project based pricing for freelancers',
      'freelance quote calculator',
    ],
  },
  'client-communication': {
    prefix: 'COM',
    intent: 'client-follow-up-and-clarity',
    route: '/deal',
    seed: [
      'client not responding freelancer',
      'client ghosting freelancer',
      'how to follow up client freelancer',
      'client ignoring proposal',
      'client slow to respond',
      'freelancer follow up email',
      'how to follow up client after quote',
      'client not replying message',
      'how to remind client politely',
      'freelance client communication',
      'how to ask client decision',
      'follow up email after proposal',
      'how to message potential client',
      'client delayed response freelancer',
      'client taking too long to reply',
      'freelancer follow up script',
      'how to ask client feedback',
      'freelance communication tips',
      'how to restart conversation client',
      'client stopped responding freelancer',
    ],
    expansion: [
      'follow up message when client stops replying',
      'email script when client ignores proposal',
      'how to follow up without sounding pushy',
      'client communication script for freelancers',
    ],
  },
  'proposal-and-close': {
    prefix: 'PRO',
    intent: 'proposal-conversion',
    route: '/scope',
    seed: [
      'freelance proposal template',
      'how to write freelance proposal',
      'freelance proposal example',
      'freelance proposal email',
      'winning freelance proposal',
      'freelance pitch template',
      'proposal example freelancer',
      'client proposal script',
      'how to send freelance quote',
      'freelance proposal structure',
      'freelancer pitch email',
      'how to convince client freelancer',
      'proposal writing freelancer',
      'how to present freelance quote',
      'proposal negotiation freelancer',
      'freelance proposal tips',
      'freelance bid template',
      'freelance project proposal example',
      'proposal follow up email',
      'proposal response script',
    ],
    expansion: [
      'freelance proposal outline',
      'proposal template for freelance clients',
      'how to write a winning proposal freelancer',
      'freelance quote email template',
    ],
  },
  'rate-increase-negotiation': {
    prefix: 'RAT',
    intent: 'rate-growth-negotiation',
    route: '/pricing',
    seed: [
      'how to raise freelance rates',
      'increase freelance rate',
      'how to charge more freelancer',
      'freelancer negotiation tactics',
      'freelancer salary negotiation',
      'how to justify higher rate',
      'how to charge premium freelancer',
      'freelance rate increase email',
      'how to renegotiate freelance contract',
      'negotiating freelance contract',
      'how to ask for higher pay freelance',
      'increase freelance pricing strategy',
      'freelance value pricing',
      'premium freelance pricing',
      'negotiating project rate',
      'how to increase freelance income',
      'how to position premium freelancer',
      'freelance price objection handling',
      'freelance negotiation framework',
      'how to charge more clients',
    ],
    expansion: [
      'rate increase script for freelance clients',
      'how to announce freelance rate increase',
      'freelance contract renegotiation email',
      'how to raise rates without losing clients',
    ],
  },
};

function classifyContentType(keyword) {
  if (/calculator/.test(keyword)) return 'tool';
  if (/template|script|email/.test(keyword)) return 'template';
  return 'guide';
}

function conversionScore(keyword) {
  if (/template|script|calculator|email/.test(keyword)) return 5;
  if (/how to|respond|negotiat|raise|quote|price/.test(keyword)) return 4;
  return 4;
}

function competitionGuess(keyword) {
  return keyword.split(' ').length >= 4 ? 'low' : 'medium';
}

function priority(keyword, score) {
  if (/client says|client asking|client not|ghosting|budget/.test(keyword)) return 'P1';
  if (score >= 5) return 'P1';
  return 'P2';
}

const rows = [];
const summary = [];

for (const [cluster, cfg] of Object.entries(CLUSTERS)) {
  const combined = [
    ...cfg.seed.map((keyword) => ({ keyword, source: 'user_seed' })),
    ...cfg.expansion.map((keyword) => ({ keyword, source: 'programmatic_expand' })),
  ];

  const unique = [];
  const seen = new Set();

  for (const item of combined) {
    const normalized = item.keyword.trim().toLowerCase();
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    unique.push(item);
  }

  unique.forEach((item, idx) => {
    const score = conversionScore(item.keyword);
    rows.push({
      id: `${cfg.prefix}-${String(idx + 1).padStart(3, '0')}`,
      keyword: item.keyword,
      cluster,
      intent: cfg.intent,
      target_route: cfg.route,
      source: item.source,
      content_type: classifyContentType(item.keyword),
      conversion_score: score,
      competition_guess: competitionGuess(item.keyword),
      priority: priority(item.keyword, score),
    });
  });

  summary.push({
    cluster,
    total: unique.length,
    seed: unique.filter((x) => x.source === 'user_seed').length,
    expansion: unique.filter((x) => x.source === 'programmatic_expand').length,
  });
}

const dedupMap = new Map();
for (const row of rows) {
  const key = row.keyword.trim().toLowerCase();
  if (!dedupMap.has(key)) {
    dedupMap.set(key, row);
  }
}

const finalRows = [...dedupMap.values()];
if (finalRows.length !== 120) {
  throw new Error(`Expected 120 keywords, got ${finalRows.length}`);
}

const header = [
  'id',
  'keyword',
  'cluster',
  'intent',
  'target_route',
  'source',
  'content_type',
  'conversion_score',
  'competition_guess',
  'priority',
];

const csv = [header.join(',')];
for (const row of finalRows) {
  const line = header.map((key) => `"${String(row[key]).replaceAll('"', '""')}"`).join(',');
  csv.push(line);
}

writeFileSync('product/seo/flowdockr-keyword-library-curated-v1.csv', `${csv.join('\n')}\n`);

const totalSeed = finalRows.filter((r) => r.source === 'user_seed').length;
const totalExpansion = finalRows.filter((r) => r.source === 'programmatic_expand').length;

const md = `# Flowdockr Curated Keyword Library v1\n\nGenerated: 2026-03-04\n\n## Scope\n\n- Total keywords: 120\n- Source split: ${totalSeed} user-seed + ${totalExpansion} programmatic expansion\n- Positioning: problem-first, high-intent freelancer queries\n\n## Cluster Counts\n\n${summary
  .map((s) => `- ${s.cluster}: ${s.total} (${s.seed} seed + ${s.expansion} expansion)`)
  .join('\n')}\n\n## Notes\n\n- This dataset keeps your original seed wording and adds minimal expansion for programmatic scale.\n- Use source=user_seed when selecting the first publishing wave.\n`;

writeFileSync('product/seo/flowdockr-keyword-library-curated-v1.md', md);
console.log('Generated curated keyword library (120).');
