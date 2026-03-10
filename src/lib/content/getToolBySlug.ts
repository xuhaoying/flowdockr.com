import rawToolPages from '../../../content/tools/tools.json';

import { toolPageDataListSchema, type ToolPageData } from '@/types/content';

const toolPages = toolPageDataListSchema.parse(rawToolPages);

export function getAllTools(): ToolPageData[] {
  return toolPages;
}

export function getToolBySlug(slug: string): ToolPageData | null {
  const tool = toolPages.find((item) => item.slug === slug);
  return tool ?? null;
}
