import { render, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { trackEvent } = vi.hoisted(() => ({
  trackEvent: vi.fn(),
}));
const { trackClientEvent } = vi.hoisted(() => ({
  trackClientEvent: vi.fn(),
}));

vi.mock('@/lib/analytics', () => ({
  trackEvent,
}));

vi.mock('@/lib/analytics-client', () => ({
  trackEvent: trackClientEvent,
}));

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { CheckoutCompletedTracker } from './CheckoutCompletedTracker';
import { CheckoutStatusCard } from './CheckoutStatusCard';

function buildJsonResponse(payload: unknown) {
  return {
    ok: true,
    status: 200,
    json: async () => payload,
  } as Response;
}

describe('checkout analytics contract', () => {
  beforeEach(() => {
    trackEvent.mockReset();
    trackClientEvent.mockReset();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('does not attach scenario_slug on checkout_completed', () => {
    render(<CheckoutCompletedTracker />);

    expect(trackClientEvent).toHaveBeenCalledWith('checkout_completed', {});
  });

  it('does not attach scenario_slug on fd_purchase_success from checkout pages', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        buildJsonResponse({
          success: true,
          status: 'paid',
          creditsGranted: true,
          creditsAdded: 8,
          purchasedPlan: 'pro',
        })
      )
    );

    render(
      <CheckoutStatusCard
        sessionId="cs_test_123"
        continuePath="/scenario/quote-too-high"
      />
    );

    await waitFor(() => {
      expect(trackEvent).toHaveBeenCalledWith(
        'fd_purchase_success',
        expect.objectContaining({
          purchased_plan: 'pro',
          credits_added: 8,
          return_to: '/scenario/quote-too-high',
          page_type: 'checkout',
        })
      );
    });

    const payload = trackEvent.mock.calls.find(
      ([eventName]) => eventName === 'fd_purchase_success'
    )?.[1];

    expect(payload).toBeDefined();
    expect(payload).not.toHaveProperty('scenario_slug');
  });
});
