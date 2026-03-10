import { pricingScenarios as basePricingScenarios } from '@/data/pricing-cluster';
import { pricingScenarioFamilies, pricingScenarioSchemas } from '@/data/pricing-taxonomy';
import type {
  PricingIntentType,
  PricingScenario,
  PricingScenarioBlueprint,
  PricingScenarioFamily,
  PricingScenarioFamilyDefinition,
  PricingScenarioSlug,
  PricingScenarioWithSchema,
} from '@/types/pricing-cluster';

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function attachScenarioSchema(scenario: PricingScenario): PricingScenarioWithSchema {
  const schema = pricingScenarioSchemas[scenario.slug as PricingScenarioSlug];

  if (!schema) {
    throw new Error(`Missing pricing taxonomy schema for slug: ${scenario.slug}`);
  }

  const primaryKeywords = unique([scenario.primaryKeyword, ...schema.page.primaryKeywords]);
  const supportKeywords = unique([...scenario.keywordVariants, ...schema.page.supportKeywords]).filter(
    (keyword) => !primaryKeywords.includes(keyword)
  );

  return {
    ...scenario,
    schema: {
      ...schema,
      page: {
        ...schema.page,
        primaryKeywords,
        supportKeywords,
      },
    },
  };
}

export const pricingScenarios: PricingScenarioWithSchema[] =
  basePricingScenarios.map(attachScenarioSchema);

export const pricingFamilies: PricingScenarioFamilyDefinition[] = pricingScenarioFamilies;

function tierToNumber(tier: 'tier1' | 'tier2' | 'tier3'): 1 | 2 | 3 {
  if (tier === 'tier1') return 1;
  if (tier === 'tier2') return 2;
  return 3;
}

function pressureTypeToIntentType(pressureType: string): PricingIntentType {
  switch (pressureType) {
    case 'price-pushback':
      return 'price_objection';
    case 'discount-pressure':
      return 'discount_pressure';
    case 'budget-mismatch':
      return 'budget_mismatch';
    case 'competitor-comparison':
      return 'competitor_comparison';
    case 'more-work-same-price':
      return 'scope_for_price';
    case 'free-work-boundary':
      return 'free_work_boundary';
    default:
      return 'price_objection';
  }
}

function normalizePoint(text: string): string {
  return text.trim().replace(/\.$/, '');
}

function humanizeRisk(risk: string): string {
  switch (risk) {
    case 'lose-leverage':
      return 'Discount too early and lose leverage';
    case 'damage-positioning':
      return 'Signal weak positioning by treating price as arbitrary';
    case 'open-scope-creep':
      return 'Open the door to unpaid scope expansion';
    case 'low-margin-trap':
      return 'Get trapped in low-margin work that is hard to sustain';
    case 'lose-deal':
      return 'Push too hard and stall or lose the deal';
    case 'payment-risk':
      return 'Increase payment risk through weak negotiation structure';
    default:
      return normalizePoint(risk);
  }
}

function buildPathKeyPoints(path: PricingScenario['responsePaths'][number]): string[] {
  return [
    normalizePoint(path.whenToUse),
    `Watch for: ${normalizePoint(path.risk).replace(/^If\s+/i, '')}`,
    `Anchor phrase: ${normalizePoint(path.exampleWording)}`,
  ];
}

function getExampleReply(
  scenario: PricingScenario,
  tone: 'Concise' | 'Warm' | 'Firm'
): string {
  return scenario.copyReadyExamples.find((item) => item.tone === tone)?.text || '';
}

const futureBridgeToBySlug: Partial<Record<PricingScenarioSlug, string[]>> = {
  'budget-lower-than-expected': ['/scope/'],
  'more-work-same-price': ['/scope/'],
  'free-trial-work-request': ['/client-red-flags/'],
};

const notesBySlug: Partial<Record<PricingScenarioSlug, string>> = {
  'price-pushback-after-proposal':
    'Primary pillar. Absorbs quote too high / rate too high / too expensive-after-proposal intent.',
  'discount-pressure-before-signing':
    'Closing-stage pillar. Keeps broad pre-sign discount pressure away from smaller final-discount pages.',
  'budget-lower-than-expected':
    'Owns true budget mismatch intent and reinforces scope-reduction over blind discounting.',
  'cheaper-competitor-comparison':
    'Owns competitor-price comparison intent and prevents commodity price-war framing.',
  'more-work-same-price':
    'Bridge page between pricing and scope boundary logic.',
  'free-trial-work-request':
    'High-anxiety boundary page. Keeps unpaid trial/spec-work intent isolated from general pricing objections.',
  'can-you-do-it-cheaper':
    'Entry page for high-frequency wording; routes users to pillar pages instead of competing with them.',
  'small-discount-before-closing':
    'Narrow support page for final-stage micro-discount asks near signature.',
};

const nextDecisionLabelsBySource: Partial<
  Record<PricingScenarioSlug, Partial<Record<PricingScenarioSlug, string>>>
> = {
  'price-pushback-after-proposal': {
    'discount-pressure-before-signing': 'If they ask for a direct discount',
    'budget-lower-than-expected': 'If they say the budget is genuinely lower',
    'cheaper-competitor-comparison': 'If they compare you with a cheaper option',
  },
  'discount-pressure-before-signing': {
    'small-discount-before-closing': 'If they only ask for a small final reduction',
    'budget-lower-than-expected': 'If the issue is really overall budget',
    'cheaper-competitor-comparison': 'If they now reference a cheaper competitor',
  },
  'budget-lower-than-expected': {
    'more-work-same-price': 'If they want more work for the same budget',
    'discount-pressure-before-signing': 'If they switch to a direct discount ask',
    'price-pushback-after-proposal': 'If the issue returns to post-proposal price pushback',
  },
  'cheaper-competitor-comparison': {
    'discount-pressure-before-signing': 'If they ask you to lower price to continue',
    'budget-lower-than-expected': 'If it is really a budget mismatch',
    'price-pushback-after-proposal': 'If they drop competitor talk and just say it feels expensive',
  },
  'more-work-same-price': {
    'budget-lower-than-expected': 'If they frame it as a budget limit',
    'can-you-do-it-cheaper': 'If they ask for a cheaper version instead',
    'discount-pressure-before-signing': 'If they push for direct price cuts before approval',
  },
  'free-trial-work-request': {
    'can-you-do-it-cheaper': 'If they pivot to asking for a cheaper option',
    'budget-lower-than-expected': 'If they say budget is the main issue',
    'more-work-same-price': 'If they ask for additional unpaid scope',
  },
  'can-you-do-it-cheaper': {
    'price-pushback-after-proposal': 'If this is post-proposal price pushback',
    'discount-pressure-before-signing': 'If they want direct discount before moving forward',
    'budget-lower-than-expected': 'If budget is truly below your quote',
  },
  'small-discount-before-closing': {
    'discount-pressure-before-signing': 'If discount pressure is broader and earlier',
    'budget-lower-than-expected': 'If they claim total budget is lower',
    'cheaper-competitor-comparison': 'If they justify the ask with cheaper alternatives',
  },
};

function buildNextDecisionLinks(
  sourceSlug: PricingScenarioSlug,
  targetSlugs: PricingScenarioSlug[]
) {
  const labels = nextDecisionLabelsBySource[sourceSlug] || {};
  return targetSlugs.map((targetSlug) => {
    const target = getPricingScenarioBySlug(targetSlug);
    return {
      href: `/pricing/${targetSlug}/`,
      label: labels[targetSlug] || target?.title || targetSlug,
    };
  });
}

export const pricingScenarioBlueprints: PricingScenarioBlueprint[] = pricingScenarios.map(
  (scenario) => {
    const concise = getExampleReply(scenario, 'Concise');
    const warm = getExampleReply(scenario, 'Warm');
    const firm = getExampleReply(scenario, 'Firm');

    return {
      slug: scenario.slug,
      cluster: 'pricing',
      tier: tierToNumber(scenario.schema.page.tier),
      pageRole: scenario.schema.page.pageRole,
      intentType: pressureTypeToIntentType(scenario.schema.page.pressureType),
      primaryIntent: scenario.schema.page.primaryIntent,
      primaryKeywords: scenario.schema.page.primaryKeywords,
      supportKeywords: scenario.schema.page.supportKeywords,
      doNotCompeteWith: scenario.schema.page.doNotCompeteWith,
      url: `/pricing/${scenario.slug}/`,
      h1: scenario.title,
      metaTitle: scenario.seoTitle,
      metaDescription: scenario.metaDescription,
      heroSubheading: scenario.heroSubtitle,
      situationSummary: scenario.situationSnapshot[0] || '',
      coreFear: scenario.schema.content.realRisks.map(humanizeRisk),
      strategyPaths: scenario.responsePaths.map((path) => ({
        id: path.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: path.title,
        whenToUse: path.whenToUse,
        keyPoints: buildPathKeyPoints(path),
      })),
      exampleReplies: {
        concise,
        warm,
        firm,
      },
      faq: scenario.faq.map((item) => ({
        question: item.q,
        answer: item.a,
      })),
      nextDecisionLinks: buildNextDecisionLinks(scenario.slug, scenario.nextDecisionSlugs),
      toolCta: {
        title: 'Generate a tailored reply',
        body:
          scenario.toolCta ||
          'Paste the exact client message and project context. Flowdockr will draft a response that protects your rate and fits this negotiation stage.',
        buttonLabel: 'Generate my reply',
        toolSlug: 'price-negotiation-email-generator',
      },
      hubParent: '/pricing/',
      futureBridgeTo: futureBridgeToBySlug[scenario.slug] || [],
      notes: notesBySlug[scenario.slug] || '',
    };
  }
);

export function getPricingScenarioBySlug(slug: string): PricingScenarioWithSchema | undefined {
  return pricingScenarios.find((scenario) => scenario.slug === slug);
}

export function getRelatedPricingScenarios(slugs: string[]): PricingScenarioWithSchema[] {
  return slugs
    .map((slug) => getPricingScenarioBySlug(slug))
    .filter((scenario): scenario is PricingScenarioWithSchema => Boolean(scenario));
}

export function getPricingScenariosByFamily(
  family: PricingScenarioFamily
): PricingScenarioWithSchema[] {
  return pricingScenarios.filter((scenario) => scenario.schema.page.family === family);
}

export function getPricingFamilyById(
  id: PricingScenarioFamily
): PricingScenarioFamilyDefinition | undefined {
  return pricingFamilies.find((family) => family.id === id);
}

export function getPricingBlueprintBySlug(slug: string): PricingScenarioBlueprint | undefined {
  return pricingScenarioBlueprints.find((scenario) => scenario.slug === slug);
}

export type {
  PricingScenarioBlueprint,
  PricingScenarioFamily,
  PricingScenarioFamilyDefinition,
  PricingScenarioWithSchema as PricingScenario,
} from '@/types/pricing-cluster';
