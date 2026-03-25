import { scenarioDatasetV1 } from '@/content/scenario-pages/scenario-dataset-v1';
import { pricingScenarios } from '@/lib/pricing-cluster';
import { describe, expect, it } from 'vitest';

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

  it('only emits english canonical urls', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.some((url) => /\/(?:es|zh)(?:\/|$)/.test(url))).toBe(false);
  });

  it('includes every canonical pricing cluster route', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const scenario of pricingScenarios) {
      expect(
        urls.some((url) => url.endsWith(`/pricing/${scenario.slug}`))
      ).toBe(true);
    }
  });
});
