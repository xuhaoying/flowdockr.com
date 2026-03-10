import rawPricingScenarios from '../../../content/pricing/scenarios.json';

import {
  scenarioPageDataListSchema,
  type ScenarioPageData,
} from '@/types/content';

const parsedPricingScenarios = scenarioPageDataListSchema.parse(
  rawPricingScenarios
);

export const pricingScenarioPages: ScenarioPageData[] = parsedPricingScenarios;

