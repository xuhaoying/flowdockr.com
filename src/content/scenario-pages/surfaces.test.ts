import { describe, expect, it } from 'vitest';

import {
  getRelatedScenarioGroups,
  getScenarioDistributionPriority,
  getScenarioPageBySlug,
  scenarioPages,
} from './index';
import {
  getHomepageScenarioSurfaceGroups,
  getScenarioHubClusterSurfaceEntries,
  getScenarioHubPopularSurfaceEntries,
  getToolSurfaceScenarioEntries,
  getToolsIndexScenarioSurfaceEntries,
} from './surfaces';

describe('scenario surface allocation', () => {
  it('keeps homepage, hub, and tools surfaces intentionally differentiated', () => {
    const homepageSlugs = getHomepageScenarioSurfaceGroups().flatMap((group) =>
      group.items.map((item) => item.slug)
    );
    const hubPopularSlugs = getScenarioHubPopularSurfaceEntries(8).map(
      (item) => item.slug
    );
    const toolsIndexSlugs = getToolsIndexScenarioSurfaceEntries(4).map(
      (item) => item.slug
    );

    expect(homepageSlugs).toEqual([
      'quote-too-high',
      'discount-request',
      'found-someone-cheaper',
      'ask-for-payment-politely',
      'final-payment-reminder',
      'deposit-not-paid-yet',
      'extra-work-for-free',
      'unlimited-revisions',
      'out-of-scope-professionally',
    ]);
    expect(hubPopularSlugs).toEqual([
      'discount-request',
      'lower-rate-after-proposal',
      'payment-extension-request',
      'start-before-payment',
      'deposit-not-paid-yet',
      'found-someone-cheaper',
      'quote-too-high',
      'ask-for-payment-politely',
    ]);
    expect(toolsIndexSlugs).toEqual([
      'quote-too-high',
      'discount-request',
      'ask-for-payment-politely',
      'out-of-scope-professionally',
    ]);

    expect(new Set(homepageSlugs)).not.toEqual(new Set(hubPopularSlugs));
    expect(new Set(toolsIndexSlugs)).not.toEqual(new Set(hubPopularSlugs));
  });

  it('keeps homepage and tools surfaces focused on primary money and boundary pages', () => {
    for (const group of getHomepageScenarioSurfaceGroups()) {
      for (const item of group.items) {
        const page = getScenarioPageBySlug(item.slug);

        expect(page?.cluster).not.toBe('ghosting');
        expect(getScenarioDistributionPriority(page!)).toBe('primary');
      }
    }

    for (const item of getToolsIndexScenarioSurfaceEntries(4)) {
      const page = getScenarioPageBySlug(item.slug);

      expect(page?.cluster).not.toBe('ghosting');
      expect(getScenarioDistributionPriority(page!)).toBe('primary');
    }
  });

  it('uses hub popular for cluster-core attack pages but lets cluster sections expose support bridges early', () => {
    const popularSlugs = getScenarioHubPopularSurfaceEntries(8).map(
      (item) => item.slug
    );
    const paymentClusterTop = getScenarioHubClusterSurfaceEntries(
      scenarioPages.filter(
        (page) =>
          page.archetype === 'payment_protection' ||
          page.archetype === 'contract_terms'
      )
    )
      .slice(0, 4)
      .map((item) => item.slug);
    const pricingObjectionTop = getScenarioHubClusterSurfaceEntries(
      scenarioPages.filter((page) => page.archetype === 'pricing_objection')
    )
      .slice(0, 4)
      .map((item) => item.slug);

    for (const slug of popularSlugs) {
      const page = getScenarioPageBySlug(slug);

      expect(getScenarioDistributionPriority(page!)).toBe('primary');
      expect(page?.clusterCore).toBe(true);
    }

    expect(paymentClusterTop).toEqual([
      'payment-extension-request',
      'start-before-payment',
      'pay-later-request',
      'deposit-not-paid-yet',
    ]);
    expect(pricingObjectionTop).toEqual([
      'discount-request',
      'lower-rate-after-proposal',
      'best-price-before-signing',
      'quote-too-high',
    ]);
  });

  it('keeps tool surfaces distinct from hub popular and leaves room for support pages', () => {
    const replyGeneratorSlugs = getToolSurfaceScenarioEntries(
      'reply-generator'
    ).map((item) => item.slug);
    const pricingEmailSlugs = getToolSurfaceScenarioEntries(
      'price-negotiation-email-generator'
    ).map((item) => item.slug);

    expect(replyGeneratorSlugs).toEqual([
      'quote-too-high',
      'ask-for-payment-politely',
      'out-of-scope-professionally',
      'extra-work-outside-scope',
    ]);
    expect(pricingEmailSlugs).toEqual([
      'discount-request',
      'found-someone-cheaper',
      'lower-rate-after-proposal',
      'same-scope-lower-price',
      'meet-their-budget',
    ]);

    expect(replyGeneratorSlugs).not.toEqual(pricingEmailSlugs);
    expect(
      getScenarioDistributionPriority(
        getScenarioPageBySlug('extra-work-outside-scope')!
      )
    ).toBe('secondary');
    expect(
      getScenarioDistributionPriority(
        getScenarioPageBySlug('same-scope-lower-price')!
      )
    ).toBe('secondary');
  });

  it('preserves support-page bridge exposure on scenario surfaces', () => {
    const paymentGroups = getRelatedScenarioGroups('ask-for-payment-politely');
    const ghostingGroups = getRelatedScenarioGroups('client-no-response-follow-up');

    expect(paymentGroups[0]?.items.map((item) => item.slug)).toEqual([
      'payment-overdue-reminder',
      'unpaid-invoice-follow-up',
    ]);
    for (const slug of paymentGroups[0]?.items.map((item) => item.slug) || []) {
      expect(getScenarioDistributionPriority(getScenarioPageBySlug(slug)!)).toBe(
        'secondary'
      );
    }

    expect(ghostingGroups.map((group) => group.id)).toEqual([
      'similar',
      'next_step',
    ]);
    expect(ghostingGroups[0]?.items.length).toBeGreaterThan(0);
    expect(ghostingGroups[1]?.items.length).toBeGreaterThan(0);
  });
});
