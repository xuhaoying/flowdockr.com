import { scenarioPages } from '@/content/scenario-pages';
import { pricingScenarioPages } from '@/lib/content/pricingScenarios';
import {
  isLocalPageSitemapEligible,
  isPricingScenarioSitemapEligible,
  isScenarioPageSitemapEligible,
  normalizeLocalPageSitemapSlug,
} from '@/lib/seo/indexing';
import { describe, expect, it } from 'vitest';

import { getLocalPageSlugs } from '@/shared/models/post';

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

  it('only emits canonical default-locale urls', () => {
    const urls = sitemap().map((entry) => entry.url);
    const paths = urls.map((url) => new URL(url).pathname);

    expect(urls.some((url) => /\/(?:es|zh)(?:\/|$)/.test(url))).toBe(false);
    expect(
      paths.some((path) => path === '/en' || path.startsWith('/en/'))
    ).toBe(false);
    expect(paths).not.toContain('/privacy-policy');
    expect(paths).not.toContain('/terms-of-service');
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

  it('includes only indexable local content pages', () => {
    const urls = sitemap().map((entry) => entry.url);

    for (const slug of getLocalPageSlugs()) {
      const normalizedSlug = normalizeLocalPageSitemapSlug(slug);
      const hasLocalPageUrl = urls.some((url) =>
        normalizedSlug ? url.endsWith(`/${normalizedSlug}`) : false
      );

      expect(hasLocalPageUrl).toBe(isLocalPageSitemapEligible(slug));
    }
  });
});
