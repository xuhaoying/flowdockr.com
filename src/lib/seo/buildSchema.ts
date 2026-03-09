import type { PricingScenarioBlueprint } from '@/types/pricing-cluster';

export function buildPricingScenarioHowToSchema(scenario: PricingScenarioBlueprint) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: scenario.h1,
    description: scenario.metaDescription,
    step: scenario.strategyPaths.map((path, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: path.title,
      text: path.whenToUse,
    })),
  };
}
