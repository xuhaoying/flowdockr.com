import { describe, expect, it } from 'vitest';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';
import {
  scenarioCommercialPriorityValues,
  scenarioDistributionPriorityValues,
  scenarioIntentTierValues,
  scenarioValueIntentValues,
} from '@/types/scenario-catalog';

import { scenarioDatasetV1 } from './scenario-dataset-v1';
import {
  getAllScenarioPages,
  getPopularScenarioPages,
  getRelatedScenarioGroups,
  getRelatedScenarioSectionCopy,
  getScenarioHeroDescription,
  getRelatedScenarioLinks,
  getScenarioDistributionPriority,
  getScenarioMetaDescription,
  getScenarioMetaTitle,
  getScenarioPageBySlug,
  getScenarioPagePromise,
  getScenarioPagesByDistributionPriority,
} from './index';

const EXPANDED_CLUSTER_SLUGS = {
  payment: [
    'ask-for-payment-politely',
    'final-payment-reminder',
    'overdue-invoice-no-response',
    'start-before-payment',
    'second-payment-reminder',
    'unpaid-invoice-follow-up',
    'payment-overdue-reminder',
    'deposit-not-paid-yet',
    'payment-extension-request',
    'pay-later-request',
  ],
  pricing: [
    'quote-too-high',
    'out-of-budget-but-interested',
    'discount-request',
    'same-scope-lower-price',
    'best-price-before-signing',
    'found-someone-cheaper',
    'lower-rate-after-proposal',
    'meet-their-budget',
  ],
  scope: [
    'extra-work-outside-scope',
    'unlimited-revisions',
    'extra-work-for-free',
    'changing-requirements-response',
    'scope-creep-polite-response',
    'adding-small-requests',
    'out-of-scope-professionally',
    'extra-page-request',
  ],
  ghosting: [
    'client-no-response-follow-up',
    'after-client-ghosted',
    'no-response-after-proposal',
    'reviewing-internally-no-response',
    'contract-sent-no-response',
    'silent-after-discovery-call',
    'no-response-after-rate',
  ],
} as const;

const HIGH_VALUE_SCENARIO_SLUGS = [
  'ask-for-payment-politely',
  'final-payment-reminder',
  'deposit-not-paid-yet',
  'start-before-payment',
  'payment-extension-request',
  'quote-too-high',
  'discount-request',
  'found-someone-cheaper',
  'lower-rate-after-proposal',
  'meet-their-budget',
  'extra-work-for-free',
  'unlimited-revisions',
  'scope-creep-polite-response',
  'out-of-scope-professionally',
  'changing-requirements-response',
] as const;

const PRIMARY_ATTACK_PAGE_SLUGS = [
  'ask-for-payment-politely',
  'final-payment-reminder',
  'start-before-payment',
  'deposit-not-paid-yet',
  'payment-extension-request',
  'quote-too-high',
  'discount-request',
  'found-someone-cheaper',
  'lower-rate-after-proposal',
  'extra-work-for-free',
  'unlimited-revisions',
  'changing-requirements-response',
  'out-of-scope-professionally',
] as const;

const SECONDARY_SUPPORT_PAGE_SLUGS = [
  'unpaid-invoice-follow-up',
  'second-payment-reminder',
  'same-scope-lower-price',
  'out-of-budget-but-interested',
  'client-no-response-follow-up',
  'no-response-after-proposal',
  'extra-work-outside-scope',
] as const;

const MONITOR_PAGE_SLUGS = [
  'price-before-scope',
  'fixed-price-unclear-scope',
  'what-is-included',
  'deliverables-vs-outcomes',
] as const;

describe('scenario dataset v1 integration', () => {
  it('wires all 50 dataset scenarios into the page catalog and generator catalog', () => {
    expect(scenarioDatasetV1).toHaveLength(50);

    for (const scenario of scenarioDatasetV1) {
      expect(getScenarioPageBySlug(scenario.slug)?.slug).toBe(scenario.slug);
      expect(getGeneratorScenarioBySlug(scenario.slug)?.slug).toBe(scenario.slug);
    }
  });

  it('keeps canonical scenario slugs unique and fills cluster tags for every generated page', () => {
    const pages = getAllScenarioPages();
    const uniqueSlugs = new Set(pages.map((page) => page.slug));

    expect(uniqueSlugs.size).toBe(pages.length);

    for (const page of pages) {
      expect(page.cluster).toBeTruthy();
      expect(scenarioDistributionPriorityValues).toContain(
        page.distributionPriority
      );
    }

    expect(getScenarioPageBySlug('ask-for-payment-politely')?.cluster).toBe(
      'payment'
    );
  });

  it('keeps metadata, related links, and generator content driven by dataset fields', () => {
    for (const scenario of scenarioDatasetV1) {
      const page = getScenarioPageBySlug(scenario.slug);
      const generatorScenario = getGeneratorScenarioBySlug(scenario.slug);
      const explicitRenderedSlugs = getRelatedScenarioLinks(scenario.slug)
        .slice(0, scenario.relatedScenarioSlugs?.length || 0)
        .map((item) => item.slug);

      expect(page?.metaDescription).toBe(scenario.metaDescription);
      expect(getScenarioMetaDescription(page!)).toBe(scenario.metaDescription);
      expect(new Set(explicitRenderedSlugs)).toEqual(
        new Set(scenario.relatedScenarioSlugs || [])
      );
      expect(generatorScenario?.seoTitle).toBe(getScenarioMetaTitle(scenario));
      expect(generatorScenario?.primaryGoal).toBe(
        getScenarioPagePromise(page!)
      );
      expect(generatorScenario?.relatedSlugs).toEqual(
        page?.relatedScenarioSlugs
      );
    }
  });

  it('keeps optimized payment cluster pages wired into the canonical catalog and generator catalog', () => {
    const paymentSlugs = [
      'overdue-invoice-no-response',
      'ask-for-payment-politely',
      'final-payment-reminder',
      'start-before-payment',
    ];

    for (const slug of paymentSlugs) {
      expect(getScenarioPageBySlug(slug)?.slug).toBe(slug);
      expect(getGeneratorScenarioBySlug(slug)?.slug).toBe(slug);
    }

    expect(getScenarioPageBySlug('overdue-invoice-no-response')?.relatedScenarioSlugs).toEqual([
      'unpaid-invoice-follow-up',
      'payment-overdue-reminder',
      'second-payment-reminder',
      'final-payment-reminder',
      'ask-for-payment-politely',
    ]);
  });

  it('derives stronger SEO helper copy and semantic related-section copy from scenario fields', () => {
    const paymentScenario = getScenarioPageBySlug('ask-for-payment-politely');
    const pricingScenario = getScenarioPageBySlug('quote-too-high');

    expect(getScenarioMetaTitle(paymentScenario!)).toBe(
      paymentScenario?.metaTitle
    );
    expect(getScenarioMetaDescription(paymentScenario!)).toBe(
      paymentScenario?.metaDescription
    );
    expect(getScenarioHeroDescription(paymentScenario!)).toBe(
      paymentScenario?.heroDescription
    );
    expect(getScenarioPagePromise(pricingScenario!)).toBe(
      pricingScenario?.pagePromise
    );
    expect(getRelatedScenarioSectionCopy(paymentScenario!)).toEqual({
      title: 'More client payment scripts',
      description:
        'Related payment reminders, unpaid invoice follow-ups, and deposit conversations.',
    });
  });

  it('keeps the first-batch cluster expansion pages wired into the canonical catalog and generator catalog', () => {
    for (const [cluster, slugs] of Object.entries(EXPANDED_CLUSTER_SLUGS)) {
      for (const slug of slugs) {
        const page = getScenarioPageBySlug(slug);
        const generatorScenario = getGeneratorScenarioBySlug(slug);

        expect(page?.slug).toBe(slug);
        expect(generatorScenario?.slug).toBe(slug);
        expect(page?.metaTitle).toBeTruthy();
        expect(page?.metaDescription).toBeTruthy();
        expect(page?.heroDescription).toBeTruthy();
        expect(page?.pagePromise).toBeTruthy();
        expect(page?.previewReply).toBeTruthy();
        expect(page?.cluster).toBe(cluster);
        expect(page?.relatedScenarioSlugs?.length).toBeGreaterThanOrEqual(5);

        for (const relatedSlug of page?.relatedScenarioSlugs || []) {
          const relatedPage = getScenarioPageBySlug(relatedSlug);

          expect(relatedPage?.slug).toBe(relatedSlug);
          expect(relatedPage?.cluster).toBe(cluster);
        }
      }
    }
  });

  it('keeps every explicit related scenario slug pointing at an existing canonical page', () => {
    for (const page of getAllScenarioPages()) {
      for (const relatedSlug of page.relatedScenarioSlugs || []) {
        expect(getScenarioPageBySlug(relatedSlug)?.slug).toBe(relatedSlug);
      }
    }
  });

  it('keeps grouped related slugs pointing at existing canonical pages and preserves a fallback path', () => {
    for (const page of getAllScenarioPages()) {
      for (const relatedSlug of page.similarScenarioSlugs || []) {
        expect(getScenarioPageBySlug(relatedSlug)?.slug).toBe(relatedSlug);
      }

      for (const relatedSlug of page.nextStepScenarioSlugs || []) {
        expect(getScenarioPageBySlug(relatedSlug)?.slug).toBe(relatedSlug);
      }
    }

    expect(getRelatedScenarioGroups('best-price-request').map((group) => group.id)).toEqual([
      'related',
    ]);
  });

  it('marks high-value pages with valid intent and commercial labels', () => {
    for (const slug of HIGH_VALUE_SCENARIO_SLUGS) {
      const page = getScenarioPageBySlug(slug);

      expect(page).toBeTruthy();
      expect(scenarioIntentTierValues).toContain(page?.intentTier);
      expect(scenarioValueIntentValues).toContain(page?.valueIntent);
      expect(scenarioCommercialPriorityValues).toContain(
        page?.commercialPriority
      );
    }
  });

  it('derives primary, support, and monitor layers from the scenario labels', () => {
    for (const slug of PRIMARY_ATTACK_PAGE_SLUGS) {
      const page = getScenarioPageBySlug(slug);

      expect(page).toBeTruthy();
      expect(getScenarioDistributionPriority(page!)).toBe('primary');
    }

    for (const slug of SECONDARY_SUPPORT_PAGE_SLUGS) {
      const page = getScenarioPageBySlug(slug);

      expect(page).toBeTruthy();
      expect(getScenarioDistributionPriority(page!)).toBe('secondary');
    }

    for (const slug of MONITOR_PAGE_SLUGS) {
      const page = getScenarioPageBySlug(slug);

      expect(page).toBeTruthy();
      expect(getScenarioDistributionPriority(page!)).toBe('monitor');
    }
  });

  it('surfaces primary attack pages ahead of support pages in hub and related exposure helpers', () => {
    const popularScenarios = getPopularScenarioPages(8);
    const paymentPrimaryPages = getScenarioPagesByDistributionPriority('primary', {
      cluster: 'payment',
      limit: 5,
    });

    expect(popularScenarios).toHaveLength(8);
    for (const page of popularScenarios) {
      expect(page.distributionPriority).toBe('primary');
      expect(page.clusterCore).toBe(true);
    }

    expect(
      new Set(paymentPrimaryPages.map((page) => page.slug))
    ).toEqual(
      new Set([
        'ask-for-payment-politely',
        'final-payment-reminder',
        'start-before-payment',
        'deposit-not-paid-yet',
        'payment-extension-request',
      ])
    );
    expect(
      getScenarioPagesByDistributionPriority('primary', {
        cluster: 'ghosting',
      })
    ).toHaveLength(0);
  });

  it('builds grouped related paths for the strengthened payment and pricing pages', () => {
    expect(getRelatedScenarioGroups('ask-for-payment-politely')).toEqual([
      {
        id: 'similar',
        title: 'Similar scenarios',
        description:
          'Close variants of this client conversation that need a similar kind of reply.',
        items: [
          expect.objectContaining({ slug: 'payment-overdue-reminder' }),
          expect.objectContaining({ slug: 'unpaid-invoice-follow-up' }),
        ],
      },
      {
        id: 'next_step',
        title: 'Next-step scenarios',
        description:
          'If the payment issue keeps dragging, these are the next money conversations you are likely to hit.',
        items: [
          expect.objectContaining({ slug: 'payment-extension-request' }),
          expect.objectContaining({ slug: 'final-payment-reminder' }),
          expect.objectContaining({ slug: 'second-payment-reminder' }),
        ],
      },
    ]);

    expect(getRelatedScenarioGroups('discount-request')).toEqual([
      {
        id: 'similar',
        title: 'Similar scenarios',
        description:
          'Close variants of this client conversation that need a similar kind of reply.',
        items: [
          expect.objectContaining({ slug: 'lower-rate-after-proposal' }),
          expect.objectContaining({ slug: 'same-scope-lower-price' }),
        ],
      },
      {
        id: 'next_step',
        title: 'Next-step scenarios',
        description:
          'If the client keeps pushing on price, these are the next pricing conversations likely to follow.',
        items: [
          expect.objectContaining({ slug: 'meet-their-budget' }),
          expect.objectContaining({ slug: 'best-price-before-signing' }),
          expect.objectContaining({ slug: 'out-of-budget-but-interested' }),
        ],
      },
    ]);
  });
});
