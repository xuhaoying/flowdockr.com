import { describe, expect, it } from 'vitest';

import {
  buildPricingClusterPerformanceReport,
  deriveRate,
} from './pricing-cluster-performance';

describe('pricing cluster performance report', () => {
  it('builds per-page funnel metrics and prioritization labels', () => {
    const report = buildPricingClusterPerformanceReport({
      days: 30,
      limit: 500,
      analyticsSignals: [
        {
          pricingSlug: 'client-messaging-outside-work-hours',
          views: 120,
          generateClicks: 24,
          generateSuccesses: 20,
        },
        {
          pricingSlug: 'say-no-to-scope-creep-politely',
          views: 200,
          generateClicks: 8,
          generateSuccesses: 6,
        },
        {
          pricingSlug: 'decline-underpaid-project-politely',
          views: 90,
          generateClicks: 18,
          generateSuccesses: 6,
        },
        {
          pricingSlug: 'stand-firm-on-pricing',
          views: 18,
          generateClicks: 1,
          generateSuccesses: 1,
        },
      ],
      generationSignals: [
        {
          pricingSlug: 'client-messaging-outside-work-hours',
          historySaves: 8,
        },
        {
          pricingSlug: 'decline-underpaid-project-politely',
          historySaves: 2,
        },
      ],
      purchaseSignals: [
        {
          pricingSlug: 'client-messaging-outside-work-hours',
          checkoutClicks: 6,
          purchaseSuccesses: 3,
        },
        {
          pricingSlug: 'say-no-to-scope-creep-politely',
          checkoutClicks: 1,
          purchaseSuccesses: 0,
        },
        {
          pricingSlug: 'decline-underpaid-project-politely',
          checkoutClicks: 1,
          purchaseSuccesses: 0,
        },
      ],
    });

    const highPotential = report.pages.find(
      (page) => page.slug === 'client-messaging-outside-work-hours'
    );
    const ctaProblem = report.pages.find(
      (page) => page.slug === 'say-no-to-scope-creep-politely'
    );
    const mappingUpgrade = report.pages.find(
      (page) => page.slug === 'decline-underpaid-project-politely'
    );
    const lowSignal = report.pages.find(
      (page) => page.slug === 'stand-firm-on-pricing'
    );

    expect(highPotential).toMatchObject({
      views: 120,
      generateClicks: 24,
      generateSuccesses: 20,
      historySaves: 8,
      checkoutClicks: 6,
      purchaseSuccesses: 3,
    });
    expect(highPotential?.diagnostics).toContain('high_potential');
    expect(highPotential?.generatorClickRate).toBeCloseTo(0.2);
    expect(highPotential?.purchaseRate).toBeCloseTo(0.5);

    expect(ctaProblem?.diagnostics).toContain('cta_problem');
    expect(ctaProblem?.diagnostics).not.toContain('needs_mapping_upgrade');

    expect(mappingUpgrade?.diagnostics).toContain('generation_problem');
    expect(mappingUpgrade?.diagnostics).toContain('needs_mapping_upgrade');

    expect(lowSignal?.diagnostics).toContain('discoverability_problem');

    expect(report.summary.pagesWithTraffic).toBeGreaterThanOrEqual(4);
    expect(report.summary.highPotentialPages).toContain(
      'client-messaging-outside-work-hours'
    );
    expect(report.summary.needsMappingUpgradePages).toContain(
      'decline-underpaid-project-politely'
    );
    expect(report.prioritizedActions.find((item) => item.action === 'improve_cta'))
      .toBeTruthy();
    expect(
      report.prioritizedActions.find(
        (item) => item.action === 'improve_generator_mapping'
      )?.slugs
    ).toContain('decline-underpaid-project-politely');
  });

  it('nulls unavailable metrics instead of inventing counts', () => {
    const report = buildPricingClusterPerformanceReport({
      dataAvailability: {
        analyticsEvents: false,
        generationHistory: false,
        purchases: false,
      },
    });

    const page = report.pages.find(
      (item) => item.slug === 'client-messaging-outside-work-hours'
    );

    expect(page).toMatchObject({
      views: null,
      generateClicks: null,
      generateSuccesses: null,
      historySaves: null,
      checkoutClicks: null,
      purchaseSuccesses: null,
    });
    expect(page?.diagnostics).toContain('insufficient_data');
    expect(report.summary.topFamiliesByViews).toEqual([]);
    expect(report.summary.topFamiliesByCheckoutIntent).toEqual([]);
  });

  it('derives null rate when the denominator is zero or unavailable', () => {
    expect(deriveRate(1, 0)).toBeNull();
    expect(deriveRate(null, 10)).toBeNull();
    expect(deriveRate(0, 10)).toBe(0);
  });
});
