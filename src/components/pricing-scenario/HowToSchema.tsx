import { buildPricingScenarioHowToSchema } from '@/lib/seo/buildSchema';
import type { PricingScenarioBlueprint } from '@/types/pricing-cluster';

type HowToSchemaProps = {
  scenario: PricingScenarioBlueprint;
};

export function HowToSchema({ scenario }: HowToSchemaProps) {
  const schema = buildPricingScenarioHowToSchema(scenario);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
