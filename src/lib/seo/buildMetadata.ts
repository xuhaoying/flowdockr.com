import type { Metadata } from 'next';

import type { PricingScenarioBlueprint } from '@/types/pricing-cluster';

export function buildPricingScenarioMetadata(params: {
  scenario: PricingScenarioBlueprint;
  canonical: string;
}): Metadata {
  const { scenario, canonical } = params;

  return {
    title: scenario.metaTitle,
    description: scenario.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [...scenario.primaryKeywords, ...scenario.supportKeywords],
    openGraph: {
      title: scenario.metaTitle,
      description: scenario.metaDescription,
      url: canonical,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: scenario.metaTitle,
      description: scenario.metaDescription,
    },
  };
}
