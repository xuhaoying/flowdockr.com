import { pricingScenarios as basePricingScenarios } from '@/data/pricing-cluster';
import { pricingScenarioFamilies, pricingScenarioSchemas } from '@/data/pricing-taxonomy';
import type {
  PricingScenario,
  PricingScenarioFamily,
  PricingScenarioFamilyDefinition,
  PricingScenarioSlug,
  PricingScenarioWithSchema,
} from '@/types/pricing-cluster';

function attachScenarioSchema(scenario: PricingScenario): PricingScenarioWithSchema {
  const schema = pricingScenarioSchemas[scenario.slug as PricingScenarioSlug];

  if (!schema) {
    throw new Error(`Missing pricing taxonomy schema for slug: ${scenario.slug}`);
  }

  return {
    ...scenario,
    schema,
  };
}

export const pricingScenarios: PricingScenarioWithSchema[] =
  basePricingScenarios.map(attachScenarioSchema);

export const pricingFamilies: PricingScenarioFamilyDefinition[] = pricingScenarioFamilies;

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
  return pricingScenarios.filter((scenario) => scenario.schema.family === family);
}

export function getPricingFamilyById(
  id: PricingScenarioFamily
): PricingScenarioFamilyDefinition | undefined {
  return pricingFamilies.find((family) => family.id === id);
}

export type {
  PricingScenarioFamily,
  PricingScenarioFamilyDefinition,
  PricingScenarioWithSchema as PricingScenario,
} from '@/types/pricing-cluster';
