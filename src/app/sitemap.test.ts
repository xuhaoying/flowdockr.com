import { scenarioPages } from '@/content/scenario-pages';
import { pricingScenarioPages } from '@/lib/content/pricingScenarios';
import {
  isPricingScenarioSitemapEligible,
  isScenarioPageSitemapEligible,
} from '@/lib/seo/indexing';
import { describe, expect, it } from 'vitest';

import sitemap from './sitemap';

describe('scenario sitemap coverage', () => {
  it('only includes scenario pages selected for indexing', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const scenario of scenarioPages) {
      const hasScenarioUrl = urls.some((url) =>
        url.endsWith(`/scenario/${scenario.slug}`)
      );

      expect(hasScenarioUrl).toBe(isScenarioPageSitemapEligible(scenario));
    }
  });

  it('only emits english canonical urls', () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls.some((url) => /\/(?:es|zh)(?:\/|$)/.test(url))).toBe(false);
  });

  it('only includes pricing pages selected for indexing', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const scenario of pricingScenarioPages) {
      const hasPricingUrl = urls.some((url) =>
        url.endsWith(`/pricing/${scenario.slug}`)
      );

      expect(hasPricingUrl).toBe(isPricingScenarioSitemapEligible(scenario));
    }
  });
});
