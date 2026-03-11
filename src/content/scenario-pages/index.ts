import type { ScenarioPageData } from '@/types/scenario-page';

import { clientAsksForDiscountScenarioPage } from './client-asks-for-discount';
import { clientAsksForExtraRevisionsScenarioPage } from './client-asks-for-extra-revisions';
import { clientDelaysPaymentScenarioPage } from './client-delays-payment';
import { clientExpandsProjectScopeScenarioPage } from './client-expands-project-scope';
import { clientSaysRateTooHighScenarioPage } from './client-says-rate-too-high';

export const scenarioPages: ScenarioPageData[] = [
  clientSaysRateTooHighScenarioPage,
  clientAsksForDiscountScenarioPage,
  clientAsksForExtraRevisionsScenarioPage,
  clientExpandsProjectScopeScenarioPage,
  clientDelaysPaymentScenarioPage,
];

const scenarioPageMap = new Map<string, ScenarioPageData>(
  scenarioPages.map((page) => [page.slug, page])
);

export function getScenarioPageBySlug(slug: string): ScenarioPageData | null {
  return scenarioPageMap.get(slug) || null;
}

export function getAllScenarioPageSlugs(): string[] {
  return scenarioPages.map((page) => page.slug);
}
