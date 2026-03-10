import { getAllTools } from '@/lib/content/getToolBySlug';

export function getAllToolSlugs(): string[] {
  return getAllTools().map((item) => item.slug);
}
