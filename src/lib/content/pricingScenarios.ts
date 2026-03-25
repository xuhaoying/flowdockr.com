import {
  getPricingBlueprintBySlug,
  pricingScenarios as typedPricingScenarios,
  type PricingScenario,
} from '@/lib/pricing-cluster';
import {
  scenarioPageDataListSchema,
  scenarioPageDataSchema,
  type ScenarioPageData,
  type ToolCTA,
} from '@/types/content';

import rawPricingScenarios from '../../../content/pricing/scenarios.json';

const parsedLegacyPricingScenarios =
  scenarioPageDataListSchema.parse(rawPricingScenarios);
const legacyPricingSlugs = new Set(
  parsedLegacyPricingScenarios.map((scenario) => scenario.slug)
);

function getExampleReply(
  scenario: PricingScenario,
  tone: 'Concise' | 'Warm' | 'Firm'
): string {
  return (
    scenario.copyReadyExamples.find((item) => item.tone === tone)?.text || ''
  );
}

function buildToolCta(scenario: PricingScenario): ToolCTA {
  const family = scenario.schema.page.family;
  const isBoundaryFlow =
    family === 'scope-boundary' ||
    family === 'availability-boundary' ||
    family === 'project-decline' ||
    family === 'free-work-boundary';

  const titleByFamily: Partial<
    Record<PricingScenario['schema']['page']['family'], string>
  > = {
    'scope-boundary': 'Draft a scope-boundary reply',
    'availability-boundary': 'Draft a calm availability reply',
    'project-decline': 'Draft a professional no-thanks reply',
    'free-work-boundary': 'Draft a no-free-work reply',
  };

  const buttonLabelByFamily: Partial<
    Record<PricingScenario['schema']['page']['family'], string>
  > = {
    'scope-boundary': 'Draft my boundary reply',
    'availability-boundary': 'Draft my availability reply',
    'project-decline': 'Draft my no-thanks reply',
    'free-work-boundary': 'Draft my boundary reply',
  };

  return {
    title: titleByFamily[family] || 'Draft the right pricing reply',
    body:
      scenario.toolCta ||
      'Paste the exact client message and a little context. Flowdockr will draft a reply that matches this pricing situation without dropping into generic filler.',
    buttonLabel: buttonLabelByFamily[family] || 'Draft my pricing reply',
    toolSlug: isBoundaryFlow
      ? 'reply-generator'
      : 'price-negotiation-email-generator',
  };
}

function buildGeneratedPricingScenarioPage(
  scenario: PricingScenario
): ScenarioPageData {
  const blueprint = getPricingBlueprintBySlug(scenario.slug);

  if (!blueprint) {
    throw new Error(`Missing pricing blueprint for slug: ${scenario.slug}`);
  }

  return scenarioPageDataSchema.parse({
    slug: scenario.slug,
    cluster: 'pricing',
    tier: blueprint.tier,
    pageRole: blueprint.pageRole,
    intentType: blueprint.intentType,
    primaryIntent: blueprint.primaryIntent,
    primaryKeywords: blueprint.primaryKeywords,
    supportKeywords: blueprint.supportKeywords,
    doNotCompeteWith: blueprint.doNotCompeteWith,
    url: blueprint.url,
    h1: blueprint.h1,
    metaTitle: blueprint.metaTitle,
    metaDescription: blueprint.metaDescription,
    heroSubheading: blueprint.heroSubheading,
    situationSummary: scenario.shortDescription || blueprint.situationSummary,
    commonClientMessages: scenario.commonClientMessages || [],
    coreFear: blueprint.coreFear,
    strategyPaths: blueprint.strategyPaths,
    exampleReplies: {
      concise:
        getExampleReply(scenario, 'Concise') ||
        blueprint.exampleReplies.concise,
      warm: getExampleReply(scenario, 'Warm') || blueprint.exampleReplies.warm,
      firm: getExampleReply(scenario, 'Firm') || blueprint.exampleReplies.firm,
    },
    commonMistakes: scenario.commonMistakes || [],
    faq: blueprint.faq,
    nextDecisionLinks: blueprint.nextDecisionLinks,
    toolCta: buildToolCta(scenario),
    hubParent: blueprint.hubParent,
    futureBridgeTo: blueprint.futureBridgeTo,
    notes: blueprint.notes,
  });
}

const generatedPricingScenarios = typedPricingScenarios
  .filter((scenario) => !legacyPricingSlugs.has(scenario.slug))
  .map(buildGeneratedPricingScenarioPage);

export const pricingScenarioPages: ScenarioPageData[] = [
  ...parsedLegacyPricingScenarios,
  ...generatedPricingScenarios,
];
