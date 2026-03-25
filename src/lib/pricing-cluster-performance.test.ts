import { describe, expect, it } from 'vitest';

import {
  buildPricingAnalyticsSignals,
  buildPricingClusterPerformanceReport,
  buildPricingGenerationSignals,
  buildPricingPurchaseSignals,
  deriveRate,
  parsePricingSlugFromGenerationStrategyJson,
  parsePurchaseMetadata,
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
    expect(report.sourceStates.analyticsEvents.state).toBe('populated');
    expect(report.sourceStates.generationHistory.state).toBe('populated');
    expect(report.sourceStates.purchases.state).toBe('populated');
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
    expect(report.sourceStates.analyticsEvents).toMatchObject({
      state: 'unavailable',
    });
    expect(report.sourceStates.generationHistory).toMatchObject({
      state: 'unavailable',
    });
    expect(report.sourceStates.purchases).toMatchObject({
      state: 'unavailable',
    });
    expect(report.summary.topFamiliesByViews).toEqual([]);
    expect(report.summary.topFamiliesByCheckoutIntent).toEqual([]);
  });

  it('distinguishes reachable empty sources from unavailable ones', () => {
    const report = buildPricingClusterPerformanceReport({
      analyticsSignals: [],
      generationSignals: [],
      purchaseSignals: [],
    });

    expect(report.sourceStates.analyticsEvents).toMatchObject({
      state: 'reachable_empty',
      reason: null,
    });
    expect(report.sourceStates.generationHistory).toMatchObject({
      state: 'reachable_empty',
      reason: null,
    });
    expect(report.sourceStates.purchases).toMatchObject({
      state: 'reachable_empty',
      reason: null,
    });
  });

  it('parses persisted pricing attribution from generation and purchase storage shapes', () => {
    const analyticsSignals = buildPricingAnalyticsSignals([
      {
        scenarioSlug: 'client-messaging-outside-work-hours',
        fd_scenario_view: 14,
        fd_tool_start: 5,
        fd_generation_success: 4,
      },
    ]);
    const generationSignals = buildPricingGenerationSignals([
      {
        userId: 'user_123',
        supportLevel: 'pro',
        strategyJson: JSON.stringify({
          generationLog: {
            pricingAttribution: {
              pricingSlug: 'client-messaging-outside-work-hours',
            },
          },
        }),
      },
      {
        userId: 'user_456',
        supportLevel: 'quick_help',
        strategyJson: JSON.stringify({
          generationLog: {
            pricingAttribution: {
              pricingSlug: 'client-messaging-outside-work-hours',
            },
          },
        }),
      },
    ]);
    const purchaseSignals = buildPricingPurchaseSignals([
      {
        status: 'pending',
        creditsGranted: 0,
        metadata: JSON.stringify({
          pricingSlug: 'client-messaging-outside-work-hours',
        }),
      },
      {
        status: 'paid',
        creditsGranted: 8,
        metadata: JSON.stringify({
          pricingSlug: 'client-messaging-outside-work-hours',
        }),
      },
    ]);

    expect(
      parsePricingSlugFromGenerationStrategyJson(
        JSON.stringify({
          generationLog: {
            pricingAttribution: {
              pricingSlug: 'client-messaging-outside-work-hours',
            },
          },
        })
      )
    ).toBe('client-messaging-outside-work-hours');
    expect(
      parsePurchaseMetadata(
        JSON.stringify({
          pricingSlug: 'client-messaging-outside-work-hours',
        })
      )
    ).toMatchObject({
      pricingSlug: 'client-messaging-outside-work-hours',
    });

    const report = buildPricingClusterPerformanceReport({
      analyticsSignals,
      generationSignals,
      purchaseSignals,
    });
    const row = report.pages.find(
      (page) => page.slug === 'client-messaging-outside-work-hours'
    );

    expect(generationSignals).toEqual([
      {
        pricingSlug: 'client-messaging-outside-work-hours',
        historySaves: 1,
      },
    ]);
    expect(purchaseSignals).toEqual([
      {
        pricingSlug: 'client-messaging-outside-work-hours',
        checkoutClicks: 2,
        purchaseSuccesses: 1,
      },
    ]);
    expect(row).toMatchObject({
      views: 14,
      generateClicks: 5,
      generateSuccesses: 4,
      historySaves: 1,
      checkoutClicks: 2,
      purchaseSuccesses: 1,
    });
    expect(row?.generatorClickRate).toBeCloseTo(5 / 14);
  });

  it('derives null rate when the denominator is zero or unavailable', () => {
    expect(deriveRate(1, 0)).toBeNull();
    expect(deriveRate(null, 10)).toBeNull();
    expect(deriveRate(0, 10)).toBe(0);
  });
});
