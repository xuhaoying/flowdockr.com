import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

import { envConfigs } from '@/config';
import { shouldBlockSearchIndexingForHost } from '@/shared/lib/search-indexing';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const appUrl = envConfigs.site_url;
  const headersList = await headers();
  const requestHost =
    headersList.get('x-forwarded-host') ||
    headersList.get('host') ||
    new URL(appUrl).host;
  const blockSearchIndexing = shouldBlockSearchIndexingForHost(requestHost);

  if (blockSearchIndexing) {
    return {
      rules: {
        userAgent: '*',
        disallow: ['/'],
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*?*q=',
        '/settings/*',
        '/activity/*',
        '/admin/*',
        '/api/*',
      ],
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
