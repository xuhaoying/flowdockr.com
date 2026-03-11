import type { Metadata } from 'next';

import type { ScenarioPageData } from '@/types/scenario-page';

type ScenarioPageMetadataInput = Pick<
  ScenarioPageData,
  'seoTitle' | 'metaDescription'
>;

export function buildScenarioPageMetadata(params: {
  page: ScenarioPageMetadataInput;
  canonical: string;
}): Metadata {
  const { page, canonical } = params;

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.metaDescription,
    },
  };
}
