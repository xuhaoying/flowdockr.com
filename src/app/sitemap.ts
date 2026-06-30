import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/content/getGuideBySlug';
import { getAllScenarios } from '@/lib/content/getScenarioBySlug';
import { getAllTools } from '@/lib/content/getToolBySlug';
import { getAllScenarioPages } from '@/lib/content/scenarioPages';
import {
  isLocalPageSitemapEligible,
  isPricingScenarioSitemapEligible,
  isScenarioPageSitemapEligible,
  normalizeLocalPageSitemapSlug,
} from '@/lib/seo/indexing';

import { envConfigs } from '@/config';
import { getLocalPageSlugs } from '@/shared/models/post';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = envConfigs.site_url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/scenario`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/client-communication-templates`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  const canonicalScenarioRoutes: MetadataRoute.Sitemap = getAllScenarioPages()
    .filter(isScenarioPageSitemapEligible)
    .map((scenario) => ({
      url: `${baseUrl}/scenario/${scenario.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    }));

  const scenarioRoutes: MetadataRoute.Sitemap = getAllScenarios()
    .filter(isPricingScenarioSitemapEligible)
    .map((scenario) => ({
      url: `${baseUrl}${normalizeRoutePath(scenario.url)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    }));

  const guideRoutes: MetadataRoute.Sitemap = getAllGuides().map((guide) => ({
    url: `${baseUrl}${normalizeRoutePath(guide.url)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const toolRoutes: MetadataRoute.Sitemap = getAllTools().map((tool) => ({
    url: `${baseUrl}${normalizeRoutePath(tool.url)}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: tool.slug === 'reply-generator' ? 0.9 : 0.75,
  }));

  const localPageRoutes: MetadataRoute.Sitemap = getLocalPageSlugs()
    .map(normalizeLocalPageSitemapSlug)
    .filter(isLocalPageSitemapEligible)
    .filter((slug, index, slugs) => slugs.indexOf(slug) === index)
    .map((slug) => ({
      url: `${baseUrl}${normalizeRoutePath(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: getLocalPagePriority(slug),
    }));

  return [
    ...staticRoutes,
    ...canonicalScenarioRoutes,
    ...scenarioRoutes,
    ...guideRoutes,
    ...toolRoutes,
    ...localPageRoutes,
  ];
}

function normalizeRoutePath(path: string): string {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }

  if (path.length > 1 && path.endsWith('/')) {
    return path.slice(0, -1);
  }

  return path;
}

function getLocalPagePriority(slug: string): number {
  if (slug === 'tools' || slug === 'pricing/playbooks') {
    return 0.8;
  }

  if (
    slug.startsWith('tools/') ||
    slug.startsWith('pricing/') ||
    slug.startsWith('negotiation/')
  ) {
    return 0.7;
  }

  return 0.6;
}
