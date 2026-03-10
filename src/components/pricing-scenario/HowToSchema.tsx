import { buildScenarioHowToSchema } from '@/lib/seo/buildScenarioSchema';
import type { ScenarioPageData } from '@/types/content';

type HowToSchemaProps = {
  scenario: ScenarioPageData;
};

export function HowToSchema({ scenario }: HowToSchemaProps) {
  const schema = buildScenarioHowToSchema(scenario);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
