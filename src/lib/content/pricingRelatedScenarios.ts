import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import type { PricingScenarioSlug } from '@/types/pricing-cluster';

export type PricingRelatedScenarioScript = {
  href: string;
  label: string;
  description: string;
};

const relatedScenarioSlugsByPricingSlug: Partial<
  Record<PricingScenarioSlug, string[]>
> = {
  'client-asking-for-discount': [
    'discount-request',
    'ten-percent-off-request',
    'meet-their-budget',
  ],
  'can-you-do-it-cheaper': [
    'discount-request',
    'negotiate-price-email-reply',
    'meet-their-budget',
  ],
  'small-discount-before-closing': [
    'ten-percent-off-request',
    'best-price-before-signing',
    'discount-request',
  ],
  'client-negotiating-price': [
    'negotiate-price-email-reply',
    'discount-request',
    'lower-rate-after-proposal',
  ],
  'client-asking-for-extra-work': [
    'scope-creep-polite-response',
    'extra-work-outside-scope',
    'adding-small-requests',
  ],
  'client-requesting-additional-revisions': [
    'extra-revision-rounds',
    'unlimited-revisions',
    'scope-creep-polite-response',
  ],
  'say-no-to-scope-creep-politely': [
    'scope-creep-polite-response',
    'extra-work-outside-scope',
    'out-of-scope-professionally',
  ],
  'more-work-than-agreed': [
    'extra-work-outside-scope',
    'scope-creep-polite-response',
    'extra-work-for-free',
  ],
};

export function getPricingRelatedScenarioScripts(
  pricingSlug: PricingScenarioSlug,
  generatorScenarioSlug?: string
): PricingRelatedScenarioScript[] {
  const slugs = [
    ...(generatorScenarioSlug ? [generatorScenarioSlug] : []),
    ...(relatedScenarioSlugsByPricingSlug[pricingSlug] || []),
  ];
  const seen = new Set<string>();
  const items: PricingRelatedScenarioScript[] = [];

  for (const slug of slugs) {
    if (seen.has(slug)) {
      continue;
    }

    const scenario = getScenarioPageBySlug(slug);

    if (!scenario) {
      continue;
    }

    seen.add(slug);
    items.push({
      href: `/scenario/${scenario.slug}`,
      label: scenario.title,
      description: scenario.userSituation,
    });

    if (items.length >= 3) {
      break;
    }
  }

  return items;
}
