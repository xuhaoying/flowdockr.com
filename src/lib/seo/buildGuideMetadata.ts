import type { Metadata } from 'next';

import type { GuidePageData } from '@/types/content';

type GuideMetadataInput = Pick<
  GuidePageData,
  'metaTitle' | 'metaDescription' | 'primaryKeywords' | 'supportKeywords'
>;

export function buildGuideMetadata(params: {
  guide: GuideMetadataInput;
  canonical: string;
}): Metadata {
  const { guide, canonical } = params;

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [...guide.primaryKeywords, ...guide.supportKeywords],
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: canonical,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}
