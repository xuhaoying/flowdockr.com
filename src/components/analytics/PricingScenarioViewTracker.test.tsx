import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/pricing/client-messaging-outside-work-hours',
}));

vi.mock('@/lib/analytics', () => ({
  trackEvent: mocks.trackEvent,
}));

import { PricingScenarioViewTracker } from './PricingScenarioViewTracker';

describe('PricingScenarioViewTracker', () => {
  beforeEach(() => {
    mocks.trackEvent.mockReset();
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('logs pricing scenario page views with pricing attribution fields', async () => {
    render(
      <PricingScenarioViewTracker
        attribution={{
          pricingSlug: 'client-messaging-outside-work-hours',
          pricingFamily: 'availability-boundary',
          generatorScenarioSlug: 'client-messaging-outside-work-hours',
          generatorMappingKind: 'dedicated',
          pageRole: 'entry',
          canonicalRoute: '/pricing/client-messaging-outside-work-hours/',
          sourceSurface: 'pricing_page',
          locale: 'en',
          isDedicatedGeneratorMapping: true,
        }}
      />
    );

    await waitFor(() => {
      expect(mocks.trackEvent).toHaveBeenCalledWith(
        'page_view_pricing_scenario',
        expect.objectContaining({
          pricing_slug: 'client-messaging-outside-work-hours',
          pricing_family: 'availability-boundary',
          generator_scenario_slug: 'client-messaging-outside-work-hours',
          page_type: 'pricing',
          source_surface: 'pricing_page',
        })
      );
    });
  });
});
