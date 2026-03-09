import type { PricingScenario } from '@/types/pricing-cluster';

type HowToSchemaProps = {
  scenario: PricingScenario;
};

export function HowToSchema({ scenario }: HowToSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: scenario.title,
    description: scenario.metaDescription,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Understand the pressure',
        text: scenario.situationSnapshot[0] || 'Identify the real pricing pressure in the message.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose a response strategy',
        text: scenario.responsePaths[0]?.title || 'Pick a strategy that protects scope and positioning.',
      },
      {
        '@type': 'HowToStep',
        name: 'Draft and send a professional reply',
        text:
          scenario.copyReadyExamples[0]?.text ||
          'Use a concise, structured reply that keeps the conversation moving.',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
