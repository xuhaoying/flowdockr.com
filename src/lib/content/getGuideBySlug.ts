import rawGuidePages from '../../../content/guides/guides.json';

import { guidePageDataListSchema, type GuidePageData } from '@/types/content';

const guidePages = guidePageDataListSchema.parse(rawGuidePages);

export function getAllGuides(): GuidePageData[] {
  return guidePages;
}

export function getGuideBySlug(slug: string): GuidePageData | null {
  const guide = guidePages.find((item) => item.slug === slug);
  return guide ?? null;
}
