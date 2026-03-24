import { describe, expect, it } from 'vitest';
import { getScenarioBySlug as getGeneratorScenarioBySlug } from '@/lib/scenarios';

import { scenarioDatasetV1 } from './scenario-dataset-v1';
import {
  getRelatedScenarioSectionCopy,
  getScenarioHeroDescription,
  getRelatedScenarioLinks,
  getScenarioMetaDescription,
  getScenarioMetaTitle,
  getScenarioPageBySlug,
  getScenarioPagePromise,
} from './index';

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
      'final-payment-reminder',
      'start-before-payment',
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
});
