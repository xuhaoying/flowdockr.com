import { writeFileSync } from 'node:fs';

const negotiationClauses = [
  'client asks for discount',
  'client says your price is too high',
  'client says budget is low',
  'client asks for your best price',
  'client asks you to match a cheaper quote',
  'client says another freelancer is cheaper',
  'client asks for a startup discount',
  'client asks for a long-term discount upfront',
  'client asks for free extra deliverables',
  'client asks for urgent delivery without extra fee',
  'client asks for one more revision for free',
  'client says the scope is small so price should drop',
  'client asks for bundled services at a lower price',
  'client wants monthly retainer at a lower rate',
  'client asks to remove contract and lower price',
  'client asks for performance-based pricing only',
  'client asks for trial work at a reduced fee',
  'client asks for payment terms and a discount together',
  'client asks for referral discount',
  'client says they have no budget this month',
  'client asks for free strategy call before paying',
  'client asks for same scope in half the budget',
  'client negotiates after you sent the proposal',
  'client requests discount at invoice stage',
];

const negotiationPatterns = [
  clause => `how to respond when ${clause}`,
  clause => `what to say when ${clause}`,
  clause => `reply template when ${clause}`,
  clause => `freelancer negotiation email when ${clause}`,
];

const pricingTopics = [
  'freelance logo design project',
  'freelance website redesign project',
  'freelance landing page copywriting project',
  'freelance social media management project',
  'freelance video editing project',
  'freelance short form video editing project',
  'freelance ui ux design project',
  'freelance wordpress website project',
  'freelance shopify store setup project',
  'freelance email marketing setup project',
  'freelance seo content writing project',
  'freelance blog writing retainer',
  'freelance brand strategy package',
  'freelance pitch deck design project',
  'freelance motion graphics project',
  'freelance podcast editing project',
  'freelance ad creative package',
  'freelance monthly content retainer',
  'freelance conversion copywriting project',
  'freelance product page copy project',
  'freelance app design sprint',
  'freelance web development sprint',
  'freelance no code build project',
  'freelance crm setup project',
  'freelance analytics dashboard project',
  'freelance consulting package',
];

const pricingPatterns = [
  topic => `how to price ${topic}`,
  topic => `${topic} pricing template`,
  topic => `${topic} rate calculator`,
];

const communicationClauses = [
  'client stops replying after proposal',
  'client has not replied for a week',
  'client viewed proposal but did not respond',
  'client keeps delaying feedback',
  'client says they will get back to you soon',
  'client missed project kickoff meeting',
  'client is late with required assets',
  'client sends unclear feedback',
  'client gives conflicting instructions',
  'client asks for status updates every day',
  'client keeps changing direction',
  'client asks for updates outside agreed channel',
  'client rejects timeline after kickoff',
  'client asks to pause project suddenly',
  'client returns after long silence',
  'client asks for call before every decision',
  'client escalates tone in email thread',
  'client asks for weekend responses',
  'client asks for same day revisions repeatedly',
  'client says your message sounds too formal',
];

const communicationPatterns = [
  clause => `how to follow up when ${clause}`,
  clause => `email template when ${clause}`,
  clause => `freelancer message script when ${clause}`,
];

const proposalScenarios = [
  'website redesign project',
  'brand identity project',
  'seo copywriting project',
  'video editing project',
  'social media retainer',
  'email marketing setup',
  'landing page design project',
  'app ui design project',
  'wordpress development project',
  'shopify migration project',
  'marketing strategy consulting',
  'monthly content package',
  'ad creative retainer',
  'sales page copywriting project',
  'podcast production package',
  'product photography package',
  'content repurposing service',
  'crm implementation project',
  'analytics setup project',
  'startup launch package',
  'scope creep prevention clause',
  'revision policy section',
  'payment milestones section',
  'rush fee clause',
  'change request process section',
];

const proposalPatterns = [
  scenario => `freelance proposal template for ${scenario}`,
  scenario => `how to write a proposal for ${scenario}`,
];

const rateIncreaseClauses = [
  'renewing with an existing client',
  'client has been paying the same rate for years',
  'your workload increased significantly',
  'client asks for more scope than before',
  'project complexity increased this quarter',
  'you moved from hourly to value pricing',
  'you want to raise rates without losing client',
  'client says they cannot afford increase',
  'you are overbooked and need margin',
  'you improved skills and results',
  'annual contract is up for renewal',
  'client requests additional channels',
  'client expects faster turnaround now',
  'inflation increased your business costs',
  'you are switching to package pricing',
  'legacy client is below current minimum',
  'new client asks for old client rate',
  'agency client wants volume discount',
  'you need to replace underpriced retainer',
  'client asks to lock rate for two years',
  'client threatens to hire cheaper option',
  'client asks for more meetings per week',
  'scope expanded after initial onboarding',
  'you are moving from solo to studio model',
  'you need to include strategy time in billing',
];

const rateIncreasePatterns = [
  clause => `how to raise rates when ${clause}`,
  clause => `rate increase email template when ${clause}`,
];

function generateFromClauses(clauses, patterns) {
  const out = [];
  for (const clause of clauses) {
    for (const pattern of patterns) {
      out.push(pattern(clause));
    }
  }
  return out;
}

function classifyFormat(keyword) {
  if (/calculator/.test(keyword)) return 'tool';
  if (/template|email|script/.test(keyword)) return 'template';
  return 'guide';
}

function scoreConversion(keyword) {
  if (/template|calculator|script|email/.test(keyword)) return 5;
  if (/how to|what to say/.test(keyword)) return 4;
  return 3;
}

function guessCompetition(keyword) {
  return keyword.split(' ').length >= 7 ? 'low' : 'medium';
}

function priority(score, competition) {
  if (score >= 5 && competition === 'low') return 'P1';
  if (score >= 5) return 'P2';
  if (score === 4 && competition === 'low') return 'P2';
  return 'P3';
}

function rowsFromKeywords(keywords, cfg) {
  return keywords.map((keyword, idx) => {
    const conversionScore = scoreConversion(keyword);
    const competition = guessCompetition(keyword);
    return {
      id: `${cfg.prefix}-${String(idx + 1).padStart(3, '0')}`,
      keyword,
      cluster: cfg.cluster,
      intent: cfg.intent,
      target_route: cfg.route,
      content_type: classifyFormat(keyword),
      conversion_score: conversionScore,
      competition_guess: competition,
      priority: priority(conversionScore, competition),
    };
  });
}

const negotiationKeywords = generateFromClauses(negotiationClauses, negotiationPatterns).slice(0, 70);
const pricingKeywords = generateFromClauses(pricingTopics, pricingPatterns).slice(0, 70);
const communicationKeywords = generateFromClauses(communicationClauses, communicationPatterns).slice(0, 60);
const proposalKeywords = generateFromClauses(proposalScenarios, proposalPatterns).slice(0, 50);
const rateIncreaseKeywords = generateFromClauses(rateIncreaseClauses, rateIncreasePatterns).slice(0, 50);

const rows = [
  ...rowsFromKeywords(negotiationKeywords, {
    prefix: 'NEG',
    cluster: 'negotiation-discount',
    intent: 'objection-handling',
    route: '/deal',
  }),
  ...rowsFromKeywords(pricingKeywords, {
    prefix: 'PRI',
    cluster: 'pricing-strategy',
    intent: 'pricing-decision',
    route: '/pricing',
  }),
  ...rowsFromKeywords(communicationKeywords, {
    prefix: 'COM',
    cluster: 'client-communication',
    intent: 'follow-up-and-alignment',
    route: '/deal',
  }),
  ...rowsFromKeywords(proposalKeywords, {
    prefix: 'PRO',
    cluster: 'proposal-and-scope',
    intent: 'proposal-creation',
    route: '/scope',
  }),
  ...rowsFromKeywords(rateIncreaseKeywords, {
    prefix: 'RAT',
    cluster: 'rate-increase',
    intent: 'pricing-upgrade',
    route: '/pricing',
  }),
];

const unique = new Map();
for (const row of rows) {
  const normalized = row.keyword.trim().toLowerCase();
  if (!unique.has(normalized)) unique.set(normalized, row);
}

const dedupedRows = [...unique.values()];
if (dedupedRows.length !== 300) {
  throw new Error(`Expected 300 rows after dedupe, got ${dedupedRows.length}`);
}

const header = [
  'id',
  'keyword',
  'cluster',
  'intent',
  'target_route',
  'content_type',
  'conversion_score',
  'competition_guess',
  'priority',
];

const csvLines = [header.join(',')];
for (const row of dedupedRows) {
  const values = header.map((k) => {
    const v = String(row[k]);
    const escaped = v.replaceAll('"', '""');
    return `"${escaped}"`;
  });
  csvLines.push(values.join(','));
}

writeFileSync('product/seo/flowdockr-keyword-library-v1.csv', `${csvLines.join('\n')}\n`);

const clusterCounts = dedupedRows.reduce((acc, row) => {
  acc[row.cluster] = (acc[row.cluster] || 0) + 1;
  return acc;
}, {});

const content = `# Flowdockr SEO Keyword Library v1\n\nGenerated: 2026-03-04\n\n## Scope\n\n- Language: English-first\n- Total keywords: 300\n- Goal: capture high-intent freelancer problems and route traffic to Flowdockr tools\n\n## Cluster Distribution\n\n- negotiation-discount: ${clusterCounts['negotiation-discount']}\n- pricing-strategy: ${clusterCounts['pricing-strategy']}\n- client-communication: ${clusterCounts['client-communication']}\n- proposal-and-scope: ${clusterCounts['proposal-and-scope']}\n- rate-increase: ${clusterCounts['rate-increase']}\n\n## Data Columns\n\n- id: stable keyword id for automation\n- keyword: target SEO query\n- cluster: topical cluster\n- intent: user job-to-be-done category\n- target_route: recommended Flowdockr CTA destination\n- content_type: guide / template / tool\n- conversion_score: heuristic 1-5 (5 = strongest signup intent)\n- competition_guess: heuristic low/medium based on long-tail specificity\n- priority: P1/P2/P3 for build order\n\n## First 100 Build Queue Recommendation\n\n- P1 first within each cluster, then P2\n- Keep 70% pages as template-heavy intent (template/script/email/calculator terms)\n- Include one direct CTA module link above the fold and one in-content CTA\n\n## KPI Loop (90 Days)\n\n- Index coverage: indexed URLs / submitted URLs\n- CTR: Search Console query CTR by cluster\n- Activation CTR: guide page click-through to target_route\n- Signup rate: sessions from SEO pages -> signup\n- Qualified conversion: signup -> first successful generation\n\n## Known Gaps\n\n- Search volume and keyword difficulty are heuristic in v1; replace with API data (GSC, Ahrefs, Semrush, or Keyword Planner) in v2\n- SERP feature overlap is not yet scored (forum-heavy vs SaaS-heavy SERP)\n- No locale variants included yet to avoid multilingual index quality issues\n`;

writeFileSync('product/seo/flowdockr-keyword-library-v1.md', content);
console.log('Generated product/seo/flowdockr-keyword-library-v1.csv and .md');
