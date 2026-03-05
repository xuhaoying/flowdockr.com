import { mkdirSync, writeFileSync } from 'node:fs';
import { generateDealStrategy, pickLocale } from '../../src/shared/services/sales-coach';

type Scenario = {
  id: string;
  locale?: string;
  client_need: string;
  client_objection: string;
  your_quote: number;
  your_floor_price: number;
};

type ScenarioReport = {
  scenario_id: string;
  input: Scenario;
  score: number;
  breakdown: {
    structure: number;
    human_tone: number;
    grounding: number;
    actionability: number;
    pricing_logic: number;
  };
  issues: string[];
  output_sample: {
    instant_reply: string;
    strong: string;
    warm: string;
    concession: string;
  };
};

const GENERATED_AT = '2026-03-05';
const OUTPUT_JSON = 'product/qa/deal-strategy-quality-report.v1.json';
const OUTPUT_MD = 'product/qa/deal-strategy-quality-report.v1.md';

const scenarios: Scenario[] = [
  {
    id: 'S1-price-too-high-1200-700',
    locale: 'en',
    client_need: 'Client needs a landing page redesign for Q2 launch in 2 weeks',
    client_objection: 'Your price is too high. Budget is around 700',
    your_quote: 1200,
    your_floor_price: 700,
  },
  {
    id: 'S2-cheaper-competitor-2000-1400',
    locale: 'en',
    client_need: 'SaaS onboarding email sequence with analytics tracking setup',
    client_objection: 'Another freelancer can do this for less',
    your_quote: 2000,
    your_floor_price: 1400,
  },
  {
    id: 'S3-follow-up-silent-900-650',
    locale: 'en',
    client_need: 'Follow up after proposal for social media ad creatives',
    client_objection: 'We need to wait and think',
    your_quote: 900,
    your_floor_price: 650,
  },
  {
    id: 'S4-decision-authority-1500-1000',
    locale: 'en',
    client_need: 'Website copy refresh across 8 service pages',
    client_objection: 'I need approval from my boss first',
    your_quote: 1500,
    your_floor_price: 1000,
  },
  {
    id: 'S5-timeline-risk-1800-1200',
    locale: 'en',
    client_need: 'Logo + mini brand guide with urgent 7-day deadline',
    client_objection: 'Can you lower the price and still keep the same timeline?',
    your_quote: 1800,
    your_floor_price: 1200,
  },
];

const STOPWORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'that',
  'this',
  'your',
  'from',
  'have',
  'need',
  'will',
  'can',
  'are',
  'too',
  'but',
  'our',
  'you',
  'they',
  'their',
  'after',
  'about',
  'when',
  'what',
  'where',
  'which',
  'budget',
]);

const AI_CLICHE = [
  'in today\'s fast-paced world',
  'as a freelancer, it is important to',
  'in conclusion',
  'as an ai',
  'as a language model',
  'thank you for your feedback regarding',
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 4 && !STOPWORDS.has(t));
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

function startsWithVerbLike(line: string): boolean {
  const normalized = line.trim().toLowerCase();
  return /^(reply|send|define|ask|confirm|frame|anchor|offer|close|set|share|validate|clarify)\b/.test(
    normalized
  );
}

function evaluateScenario(input: Scenario): ScenarioReport {
  const locale = pickLocale(input.locale);

  const strategy = generateDealStrategy({
    client_need: input.client_need,
    client_objection: input.client_objection,
    your_quote: input.your_quote,
    your_floor_price: input.your_floor_price,
    locale,
  });

  const issues: string[] = [];

  let structure = 0;
  if (strategy.instant_reply.trim()) structure += 6;
  if (strategy.client_psychology.trim()) structure += 4;
  if (strategy.scripts.strong.trim()) structure += 4;
  if (strategy.scripts.warm.trim()) structure += 4;
  if (strategy.scripts.concession.trim()) structure += 4;
  if (strategy.decision_logic.length >= 3) structure += 4;
  if (strategy.risk_alerts.length >= 3) structure += 2;
  if (strategy.next_actions.length >= 3) structure += 2;

  if (structure < 24) {
    issues.push('structure_incomplete');
  }

  const allText = [
    strategy.instant_reply,
    strategy.client_psychology,
    strategy.scripts.strong,
    strategy.scripts.warm,
    strategy.scripts.concession,
    ...strategy.decision_logic,
    ...strategy.next_actions,
  ]
    .join(' ')
    .toLowerCase();

  let humanTone = 20;
  for (const phrase of AI_CLICHE) {
    if (allText.includes(phrase)) {
      humanTone -= 6;
      issues.push(`ai_cliche:${phrase}`);
    }
  }

  const strongLen = strategy.scripts.strong.split(/\s+/).length;
  const warmLen = strategy.scripts.warm.split(/\s+/).length;
  const concessionLen = strategy.scripts.concession.split(/\s+/).length;

  if (strongLen < 18 || warmLen < 18 || concessionLen < 18) {
    humanTone -= 4;
    issues.push('scripts_too_short');
  }

  if (
    strategy.scripts.strong.toLowerCase() === strategy.scripts.warm.toLowerCase() ||
    strategy.scripts.strong.toLowerCase() === strategy.scripts.concession.toLowerCase()
  ) {
    humanTone -= 8;
    issues.push('scripts_not_distinct');
  }

  if (humanTone < 0) humanTone = 0;

  const inputKeywords = unique(tokenize(`${input.client_need} ${input.client_objection}`)).slice(0, 12);
  const matched = inputKeywords.filter((k) => allText.includes(k));
  const groundingRatio = inputKeywords.length ? matched.length / inputKeywords.length : 0;

  let grounding = Math.round(groundingRatio * 30);
  if (grounding < 12) {
    issues.push('low_input_grounding');
  }

  let actionability = 0;
  const actionableCount = strategy.next_actions.filter(startsWithVerbLike).length;
  actionability += Math.min(actionableCount, 3) * 2;
  if (/if\b|when\b|unless\b/.test(strategy.scripts.concession.toLowerCase())) {
    actionability += 2;
  }
  if (/next step|calendar|timeline|confirm/.test(allText)) {
    actionability += 2;
  }

  if (actionability < 7) {
    issues.push('weak_actionability');
  }

  let pricingLogic = 0;
  const { ideal_price, negotiable_price, bottom_price } = strategy.suggested_price_range;
  const validRange = ideal_price >= negotiable_price && negotiable_price >= bottom_price;
  if (validRange) pricingLogic += 5;
  else issues.push('invalid_price_range');

  if (Math.abs(bottom_price - input.your_floor_price) < 0.01) pricingLogic += 3;
  else issues.push('floor_price_not_respected');

  if (ideal_price >= input.your_quote) pricingLogic += 2;
  else issues.push('ideal_anchor_too_low');

  if (pricingLogic < 7) {
    issues.push('weak_pricing_logic');
  }

  let score = structure + humanTone + grounding + actionability + pricingLogic;
  if (grounding < 12) {
    score -= 10;
  }
  score = Math.max(0, Math.min(100, score));

  return {
    scenario_id: input.id,
    input,
    score,
    breakdown: {
      structure,
      human_tone: humanTone,
      grounding,
      actionability,
      pricing_logic: pricingLogic,
    },
    issues,
    output_sample: {
      instant_reply: strategy.instant_reply,
      strong: strategy.scripts.strong,
      warm: strategy.scripts.warm,
      concession: strategy.scripts.concession,
    },
  };
}

function main() {
  const reports = scenarios.map(evaluateScenario);
  const avg =
    reports.reduce((sum, report) => sum + report.score, 0) /
    (reports.length || 1);

  const criticalCount = reports.filter((r) => r.score < 80).length;

  const payload = {
    generated_at: GENERATED_AT,
    benchmark: 'flowdockr-deal-strategy-v1',
    total_scenarios: reports.length,
    average_score: Number(avg.toFixed(2)),
    scenarios_below_80: criticalCount,
    scenario_reports: reports,
  };

  mkdirSync('product/qa', { recursive: true });
  writeFileSync(OUTPUT_JSON, `${JSON.stringify(payload, null, 2)}\n`);

  const lines = [
    '# Deal Strategy Quality Report v1',
    '',
    `Generated: ${GENERATED_AT}`,
    '',
    `- scenarios: ${payload.total_scenarios}`,
    `- average_score: ${payload.average_score}`,
    `- scenarios_below_80: ${payload.scenarios_below_80}`,
    '',
    '## Scenario Scores',
    '',
    ...reports.map(
      (r) =>
        `- ${r.scenario_id}: ${r.score} | structure=${r.breakdown.structure}, tone=${r.breakdown.human_tone}, grounding=${r.breakdown.grounding}, actionability=${r.breakdown.actionability}, pricing=${r.breakdown.pricing_logic}`
    ),
    '',
    '## Main Issues',
    '',
    ...unique(reports.flatMap((r) => r.issues)).map((issue) => `- ${issue}`),
    '',
    '## Verdict',
    '',
    payload.average_score >= 80
      ? '- Current output quality is strong enough for scaled SEO traffic tests.'
      : '- Output quality is not yet strong enough for scaled SEO traffic. Fix grounding and actionability first.',
    '',
  ];

  writeFileSync(OUTPUT_MD, lines.join('\n'));

  console.log(`Quality report: ${OUTPUT_JSON}`);
  console.log(`Summary: ${OUTPUT_MD}`);
  console.log(`Average score: ${payload.average_score}`);
}

main();
