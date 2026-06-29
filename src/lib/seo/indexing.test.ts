import { getScenarioBySlug } from '@/lib/content/getScenarioBySlug';
import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import { describe, expect, it } from 'vitest';

import {
  getPricingScenarioCanonicalPath,
  getPricingScenarioCanonicalUrl,
  getScenarioPageCanonicalPath,
  getScenarioPageCanonicalUrl,
  isPricingScenarioSitemapEligible,
  isScenarioPageSitemapEligible,
} from './indexing';

describe('seo indexing rules', () => {
  it('keeps high-priority scenario pages self-canonical and sitemap eligible', () => {
    const discountRequest = getScenarioPageBySlug('discount-request');
    const noResponseAfterProposal = getScenarioPageBySlug(
      'no-response-after-proposal'
    );

    expect(discountRequest).not.toBeNull();
    expect(noResponseAfterProposal).not.toBeNull();
    expect(getScenarioPageCanonicalPath(discountRequest!)).toBe(
      '/scenario/discount-request'
    );
    expect(isScenarioPageSitemapEligible(discountRequest!)).toBe(true);
    expect(getScenarioPageCanonicalPath(noResponseAfterProposal!)).toBe(
      '/scenario/no-response-after-proposal'
    );
    expect(isScenarioPageSitemapEligible(noResponseAfterProposal!)).toBe(true);
  });

  it('canonicalizes thin scenario variants to stronger cluster pages', () => {
    const tenPercentOff = getScenarioPageBySlug('ten-percent-off-request');
    const extraRevisionRounds = getScenarioPageBySlug('extra-revision-rounds');
    const negotiatePriceEmail = getScenarioPageBySlug(
      'negotiate-price-email-reply'
    );

    expect(tenPercentOff).not.toBeNull();
    expect(extraRevisionRounds).not.toBeNull();
    expect(negotiatePriceEmail).not.toBeNull();
    expect(getScenarioPageCanonicalPath(tenPercentOff!)).toBe(
      '/pricing/small-discount-before-closing'
    );
    expect(
      getScenarioPageCanonicalUrl(tenPercentOff!, 'https://example.com/')
    ).toBe('https://example.com/pricing/small-discount-before-closing');
    expect(getScenarioPageCanonicalPath(extraRevisionRounds!)).toBe(
      '/pricing/client-requesting-additional-revisions'
    );
    expect(getScenarioPageCanonicalPath(negotiatePriceEmail!)).toBe(
      '/pricing/client-negotiating-price'
    );
    expect(isScenarioPageSitemapEligible(tenPercentOff!)).toBe(false);
    expect(isScenarioPageSitemapEligible(extraRevisionRounds!)).toBe(false);
    expect(isScenarioPageSitemapEligible(negotiatePriceEmail!)).toBe(false);
  });

  it('keeps pricing pillars in the sitemap and removes entry pages', () => {
    const discountPillar = getScenarioBySlug('client-asking-for-discount');
    const cheaperEntry = getScenarioBySlug('can-you-do-it-cheaper');
    const negotiatingEntry = getScenarioBySlug('client-negotiating-price');

    expect(discountPillar).not.toBeNull();
    expect(cheaperEntry).not.toBeNull();
    expect(negotiatingEntry).not.toBeNull();
    expect(isPricingScenarioSitemapEligible(discountPillar!)).toBe(true);
    expect(getPricingScenarioCanonicalPath(discountPillar!)).toBe(
      '/pricing/client-asking-for-discount'
    );
    expect(isPricingScenarioSitemapEligible(cheaperEntry!)).toBe(false);
    expect(getPricingScenarioCanonicalPath(cheaperEntry!)).toBe(
      '/pricing/client-asking-for-discount'
    );
    expect(isPricingScenarioSitemapEligible(negotiatingEntry!)).toBe(false);
    expect(
      getPricingScenarioCanonicalUrl(cheaperEntry!, 'https://example.com/')
    ).toBe('https://example.com/pricing/client-asking-for-discount');
  });
});
