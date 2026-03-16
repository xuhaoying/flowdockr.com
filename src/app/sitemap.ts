import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';
import { getAllScenarioPages } from '@/lib/content/scenarioPages';
import { getAllGuides } from '@/lib/content/getGuideBySlug';
import { getAllScenarios } from '@/lib/content/getScenarioBySlug';

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
      url: `${baseUrl}/scenario`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
  ];

  const canonicalScenarioRoutes: MetadataRoute.Sitemap = getAllScenarioPages().map(
    (scenario) => ({
      url: `${baseUrl}/scenario/${scenario.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    })
  );

  const scenarioRoutes: MetadataRoute.Sitemap = getAllScenarios().map((scenario) => ({
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

  return [...staticRoutes, ...canonicalScenarioRoutes, ...scenarioRoutes, ...guideRoutes];
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
