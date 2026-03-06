import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';
import { shouldBlockSearchIndexing } from '@/shared/lib/search-indexing';

export default function robots(): MetadataRoute.Robots {
  const appUrl = envConfigs.app_url;
  const blockSearchIndexing = shouldBlockSearchIndexing(appUrl);

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
        '/privacy-policy',
        '/terms-of-service',
        '/settings/*',
        '/activity/*',
        '/admin/*',
        '/api/*',
      ],
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
