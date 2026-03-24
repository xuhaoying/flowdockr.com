import { describe, expect, it } from 'vitest';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';

import { scenarioDatasetV1 } from './scenario-dataset-v1';
import {
  getAllScenarioPages,
  getRelatedScenarioSectionCopy,
  getScenarioHeroDescription,
  getRelatedScenarioLinks,
  getScenarioMetaDescription,
  getScenarioMetaTitle,
  getScenarioPageBySlug,
  getScenarioPagePromise,
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

describe('scenario dataset v1 integration', () => {
  it('wires all 50 dataset scenarios into the page catalog and generator catalog', () => {
    expect(scenarioDatasetV1).toHaveLength(50);

    for (const scenario of scenarioDatasetV1) {
      expect(getScenarioPageBySlug(scenario.slug)?.slug).toBe(scenario.slug);
      expect(getGeneratorScenarioBySlug(scenario.slug)?.slug).toBe(scenario.slug);
    }
  });

  it('keeps metadata, related links, and generator content driven by dataset fields', () => {
    for (const scenario of scenarioDatasetV1) {
      const page = getScenarioPageBySlug(scenario.slug);
      const generatorScenario = getGeneratorScenarioBySlug(scenario.slug);

      expect(page?.metaDescription).toBe(scenario.metaDescription);
      expect(getScenarioMetaDescription(page!)).toBe(scenario.metaDescription);
      expect(
        getRelatedScenarioLinks(scenario.slug)
          .slice(0, scenario.relatedScenarioSlugs?.length || 0)
          .map((item) => item.slug)
      ).toEqual(scenario.relatedScenarioSlugs);
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
      'ask-for-payment-politely',
      'unpaid-invoice-follow-up',
      'payment-overdue-reminder',
      'second-payment-reminder',
      'final-payment-reminder',
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
      const clusterSet = new Set<string>(slugs);

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
          expect(getScenarioPageBySlug(relatedSlug)?.slug).toBe(relatedSlug);
          expect(clusterSet.has(relatedSlug)).toBe(true);
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

  it('returns the explicit payment cluster links first for the strengthened payment pages', () => {
    expect(
      getRelatedScenarioLinks('ask-for-payment-politely').map((item) => item.slug)
    ).toEqual([
      'overdue-invoice-no-response',
      'final-payment-reminder',
      'second-payment-reminder',
      'unpaid-invoice-follow-up',
      'payment-overdue-reminder',
    ]);
  });
});
