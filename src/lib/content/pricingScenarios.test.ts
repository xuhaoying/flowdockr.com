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
      'urgent-request-response'
    );
    expect(
      getDefaultGeneratorScenarioSlug('client-requesting-additional-revisions')
    ).toBe('unlimited-revisions');
  });
});
