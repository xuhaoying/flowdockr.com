import type { Metadata } from 'next';
import type { CanonicalScenario } from '@/types/scenario-catalog';

type ScenarioPageMetadataInput = Pick<
  CanonicalScenario,
  'title' | 'metaTitle'
> & {
  metaDescription: string;
};

export function buildScenarioPageMetadata(params: {
  page: ScenarioPageMetadataInput;
  canonical: string;
}): Metadata {
  const { page, canonical } = params;
  const seoTitle = page.metaTitle || `${page.title} | Flowdockr`;

  return {
    title: seoTitle,
    description: page.metaDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: seoTitle,
      description: page.metaDescription,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: page.metaDescription,
    },
  };
}
