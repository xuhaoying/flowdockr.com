import rawGuidePages from '../../../content/guides/guides.json';

import { guidePageDataListSchema, type GuidePageData } from '@/types/content';

let cachedGuidePages: GuidePageData[] | null = null;

function loadGuidePages(): GuidePageData[] {
  if (cachedGuidePages) {
    return cachedGuidePages;
  }

  const parsed = guidePageDataListSchema.safeParse(rawGuidePages);
  if (!parsed.success) {
    console.error('[content] Failed to parse guides content:', parsed.error.flatten());
    cachedGuidePages = [];
    return cachedGuidePages;
  }

  cachedGuidePages = parsed.data;
  return cachedGuidePages;
}

export function getAllGuides(): GuidePageData[] {
  return loadGuidePages();
}

export function getGuideBySlug(slug: string): GuidePageData | null {
  const guide = loadGuidePages().find((item) => item.slug === slug);
  return guide ?? null;
}
