import { render, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/scenario/quote-too-high',
}));

vi.mock('@/lib/analytics', () => ({
  trackEvent: mocks.trackEvent,
}));

import { ScenarioViewTracker } from './ScenarioViewTracker';

describe('ScenarioViewTracker', () => {
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

  it('logs canonical scenario page views with scenario slug and page type', async () => {
    render(<ScenarioViewTracker scenarioSlug="quote-too-high" />);

    await waitFor(() => {
      expect(mocks.trackEvent).toHaveBeenCalledWith(
        'fd_scenario_view',
        expect.objectContaining({
          scenario_slug: 'quote-too-high',
          page_type: 'scenario',
        })
      );
    });
  });
});
