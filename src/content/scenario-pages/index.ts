import type { ScenarioPageData } from '@/types/scenario-page';

import { additionalFeaturesScenarioPage } from './additional-features';
import { cheaperFreelancerScenarioPage } from './cheaper-freelancer';
import { discountRequestScenarioPage } from './discount-request';
import { extraRevisionsScenarioPage } from './extra-revisions';
import { fasterTurnaroundScenarioPage } from './faster-turnaround';
import { invoiceFollowUpScenarioPage } from './invoice-follow-up';
import { latePaymentScenarioPage } from './late-payment';
import { moreWorkScenarioPage } from './more-work';
import { priceTooExpensiveScenarioPage } from './price-too-expensive';
import { rateTooHighScenarioPage } from './rate-too-high';
import { rushDeliveryScenarioPage } from './rush-delivery';
import { scopeCreepScenarioPage } from './scope-creep';

export const scenarioPages: ScenarioPageData[] = [
  rateTooHighScenarioPage,
  discountRequestScenarioPage,
  priceTooExpensiveScenarioPage,
  cheaperFreelancerScenarioPage,
  extraRevisionsScenarioPage,
  scopeCreepScenarioPage,
  additionalFeaturesScenarioPage,
  moreWorkScenarioPage,
  latePaymentScenarioPage,
  invoiceFollowUpScenarioPage,
  rushDeliveryScenarioPage,
  fasterTurnaroundScenarioPage,
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
