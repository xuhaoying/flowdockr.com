import { describe, expect, it } from 'vitest';

import {
  getDefaultGeneratorScenarioSlug,
  getScenarioBySlug,
} from './getScenarioBySlug';
import { pricingScenarioPages } from './pricingScenarios';

describe('pricing scenario content adapter', () => {
  it('includes generated boundary scenarios on canonical pricing routes', () => {
    const scenario = getScenarioBySlug('client-asking-for-extra-work');

    expect(pricingScenarioPages.length).toBeGreaterThan(8);
    expect(scenario).toMatchObject({
      slug: 'client-asking-for-extra-work',
      url: '/pricing/client-asking-for-extra-work/',
      intentType: 'scope_boundary',
      toolCta: {
        toolSlug: 'reply-generator',
      },
    });
    expect(scenario?.nextDecisionLinks.length).toBeGreaterThanOrEqual(3);
  });

  it('uses typed pricing cluster mappings for generator defaults', () => {
    expect(getDefaultGeneratorScenarioSlug('urgent-request-last-minute')).toBe(
      'urgent-request-last-minute'
    );
    expect(
      getDefaultGeneratorScenarioSlug('client-messaging-outside-work-hours')
    ).toBe('client-messaging-outside-work-hours');
    expect(
      getDefaultGeneratorScenarioSlug('say-no-to-client-professionally')
    ).toBe('say-no-to-client-professionally');
    expect(getDefaultGeneratorScenarioSlug('say-no-to-low-budget-client')).toBe(
      'say-no-to-low-budget-client'
    );
    expect(getDefaultGeneratorScenarioSlug('stand-firm-on-pricing')).toBe(
      'stand-firm-on-pricing'
    );
    expect(
      getDefaultGeneratorScenarioSlug('client-requesting-additional-revisions')
    ).toBe('unlimited-revisions');
    expect(
      getDefaultGeneratorScenarioSlug('price-pushback-after-proposal')
    ).toBe('quote-too-high');
  });
});
