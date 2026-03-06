import { asksForDiscountScenario } from '@/content/scenarios/asks-for-discount';
import { asksForFreeSampleScenario } from '@/content/scenarios/asks-for-free-sample';
import { asksSmallThingForFreeScenario } from '@/content/scenarios/asks-small-thing-for-free';
import { comparesCheaperFreelancerScenario } from '@/content/scenarios/compares-cheaper-freelancer';
import { delaysDecisionAfterQuoteScenario } from '@/content/scenarios/delays-decision-after-quote';
import { lowballOfferScenario } from '@/content/scenarios/lowball-offer';
import { saysBudgetLimitedScenario } from '@/content/scenarios/says-budget-limited';
import { wantsMoreWorkSameBudgetScenario } from '@/content/scenarios/wants-more-work-same-budget';
import { ScenarioContent } from '@/types/scenario';

export const scenarios: ScenarioContent[] = [
  lowballOfferScenario,
  asksForDiscountScenario,
  comparesCheaperFreelancerScenario,
  asksForFreeSampleScenario,
  wantsMoreWorkSameBudgetScenario,
  saysBudgetLimitedScenario,
  delaysDecisionAfterQuoteScenario,
  asksSmallThingForFreeScenario,
];

const scenarioMap = new Map<string, ScenarioContent>(
  scenarios.map((scenario) => [scenario.slug, scenario])
);

export type ScenarioSlug = (typeof scenarios)[number]['slug'];

export function isScenarioSlug(value: string): value is ScenarioSlug {
  return scenarioMap.has(value);
}

export function getScenarioBySlug(slug: string): ScenarioContent | null {
  return scenarioMap.get(slug) || null;
}

export function getRelatedScenarios(slug: string): ScenarioContent[] {
  const current = getScenarioBySlug(slug);
  if (!current) {
    return [];
  }

  return current.relatedSlugs
    .map((relatedSlug) => scenarioMap.get(relatedSlug))
    .filter((scenario): scenario is ScenarioContent => Boolean(scenario));
}
