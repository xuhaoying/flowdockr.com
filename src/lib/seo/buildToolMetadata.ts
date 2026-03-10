import type { Metadata } from 'next';

import type { ToolPageData } from '@/types/content';

type ToolMetadataInput = Pick<
  ToolPageData,
  'metaTitle' | 'metaDescription' | 'primaryKeywords' | 'supportKeywords'
>;

export function buildToolMetadata(params: {
  tool: ToolMetadataInput;
  canonical: string;
}): Metadata {
  const { tool, canonical } = params;

  return {
    title: tool.metaTitle,
    description: tool.metaDescription,
    alternates: {
      canonical,
    },
    keywords: [...tool.primaryKeywords, ...tool.supportKeywords],
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: canonical,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.metaTitle,
      description: tool.metaDescription,
    },
  };
}
