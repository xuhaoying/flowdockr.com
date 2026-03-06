import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';
import { scenarios } from '@/lib/scenarios';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = envConfigs.app_url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/scenarios`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const scenarioRoutes: MetadataRoute.Sitemap = scenarios.map((scenario) => ({
    url: `${baseUrl}/scenarios/${scenario.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...scenarioRoutes];
}
