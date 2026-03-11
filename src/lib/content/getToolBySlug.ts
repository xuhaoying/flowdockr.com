import rawToolPages from '../../../content/tools/tools.json';

import { toolPageDataListSchema, type ToolPageData } from '@/types/content';

let cachedToolPages: ToolPageData[] | null = null;

function loadToolPages(): ToolPageData[] {
  if (cachedToolPages) {
    return cachedToolPages;
  }

  const parsed = toolPageDataListSchema.safeParse(rawToolPages);
  if (!parsed.success) {
    console.error('[content] Failed to parse tools content:', parsed.error.flatten());
    cachedToolPages = [];
    return cachedToolPages;
  }

  cachedToolPages = parsed.data;
  return cachedToolPages;
}

export function getAllTools(): ToolPageData[] {
  return loadToolPages();
}

export function getToolBySlug(slug: string): ToolPageData | null {
  const tool = loadToolPages().find((item) => item.slug === slug);
  return tool ?? null;
}
