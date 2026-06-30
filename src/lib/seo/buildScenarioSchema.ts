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

export type FaqSchemaItem = {
  question: string;
  answer: string;
};

export function buildFaqPageSchema(items: FaqSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
