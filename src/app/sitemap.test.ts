import { describe, expect, it } from 'vitest';

import { scenarioDatasetV1 } from '@/content/scenario-pages/scenario-dataset-v1';

import sitemap from './sitemap';

describe('scenario sitemap coverage', () => {
  it('includes every canonical dataset v1 scenario route', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const scenario of scenarioDatasetV1) {
      expect(
        urls.some((url) => url.endsWith(`/scenario/${scenario.slug}`))
      ).toBe(true);
    }
  });
});
