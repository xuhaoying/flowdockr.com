import { describe, expect, it } from 'vitest';

import {
  buildPricingScenarioAnalyticsParams,
  buildPricingScenarioAttribution,
  getPricingScenarioSlugFromPath,
} from './pricingAttribution';

describe('pricing attribution helpers', () => {
  it('builds full attribution from a pricing scenario seed', () => {
    const attribution = buildPricingScenarioAttribution({
      pricingSlug: 'say-no-to-client-professionally',
      sourceSurface: 'pricing_page',
      locale: 'en',
    });

    expect(attribution).toMatchObject({
      pricingSlug: 'say-no-to-client-professionally',
      pricingFamily: 'project-decline',
      generatorScenarioSlug: 'say-no-to-client-professionally',
      generatorMappingKind: 'dedicated',
      pageRole: 'pillar',
      canonicalRoute: '/pricing/say-no-to-client-professionally/',
      sourceSurface: 'pricing_page',
      locale: 'en',
      isDedicatedGeneratorMapping: true,
    });
    expect(buildPricingScenarioAnalyticsParams(attribution)).toMatchObject({
      pricing_slug: 'say-no-to-client-professionally',
      pricing_family: 'project-decline',
      page_type: 'pricing',
    });
  });

  it('extracts pricing slugs from canonical pricing paths', () => {
    expect(
      getPricingScenarioSlugFromPath('/en/pricing/client-messaging-outside-work-hours/?x=1')
    ).toBe('client-messaging-outside-work-hours');
    expect(getPricingScenarioSlugFromPath('/tools/reply-generator?scenario=foo')).toBe(
      ''
    );
  });
});
