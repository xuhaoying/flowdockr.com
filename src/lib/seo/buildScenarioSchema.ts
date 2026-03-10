import type { ScenarioPageData } from '@/types/content';

type ScenarioHowToInput = Pick<
  ScenarioPageData,
  'h1' | 'metaDescription' | 'strategyPaths'
>;

export function buildScenarioHowToSchema(scenario: ScenarioHowToInput) {
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
