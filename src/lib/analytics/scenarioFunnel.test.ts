import { describe, expect, it } from 'vitest';

import {
  getCanonicalScenarioSlugForCheckoutSuccess,
  hasCanonicalScenarioFunnel,
} from './scenarioFunnel';

describe('scenario funnel helpers', () => {
  it('detects canonical funnel only for scenario pages with an explicit slug', () => {
    expect(
      hasCanonicalScenarioFunnel({
        sourcePage: 'scenario',
        funnelScenarioSlug: 'quote-too-high',
      })
    ).toBe(true);

    expect(
      hasCanonicalScenarioFunnel({
        sourcePage: 'tool',
        funnelScenarioSlug: 'quote-too-high',
      })
    ).toBe(false);

    expect(
      hasCanonicalScenarioFunnel({
        sourcePage: 'scenario',
        funnelScenarioSlug: '   ',
      })
    ).toBe(false);
  });

  it('returns canonical checkout attribution only for matching scenario routes', () => {
    expect(
      getCanonicalScenarioSlugForCheckoutSuccess({
        returnTo: '/scenario/quote-too-high',
        scenarioSlug: 'quote-too-high',
      })
    ).toBe('quote-too-high');

    expect(
      getCanonicalScenarioSlugForCheckoutSuccess({
        returnTo: '/zh/scenario/quote-too-high?from=checkout#result',
        scenarioSlug: 'quote-too-high',
      })
    ).toBe('quote-too-high');

    expect(
      getCanonicalScenarioSlugForCheckoutSuccess({
        returnTo: '/pricing/price-pushback-after-proposal',
        scenarioSlug: 'quote-too-high',
      })
    ).toBe('');

    expect(
      getCanonicalScenarioSlugForCheckoutSuccess({
        returnTo: '/scenario/quote-too-high',
        scenarioSlug: 'discount-request',
      })
    ).toBe('');

    expect(
      getCanonicalScenarioSlugForCheckoutSuccess({
        returnTo: '/scenario',
        scenarioSlug: 'quote-too-high',
      })
    ).toBe('');
  });
});
