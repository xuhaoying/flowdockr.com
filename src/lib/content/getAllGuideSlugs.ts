import { getAllGuides } from '@/lib/content/getGuideBySlug';

export function getAllGuideSlugs(): string[] {
  return getAllGuides().map((item) => item.slug);
}
