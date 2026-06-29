// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  verifyWebhookSignature: vi.fn(),
  hasProcessedWebhookEvent: vi.fn(),
  markWebhookEventProcessed: vi.fn(),
  applySuccessfulPurchase: vi.fn(),
  redeemScenarioPackPurchase: vi.fn(),
  getScenarioPackById: vi.fn(),
}));

vi.mock('@/lib/stripe', () => ({
  verifyWebhookSignature: mocks.verifyWebhookSignature,
}));

vi.mock('@/lib/payments', () => ({
  applySuccessfulPurchase: mocks.applySuccessfulPurchase,
  hasProcessedWebhookEvent: mocks.hasProcessedWebhookEvent,
  markWebhookEventProcessed: mocks.markWebhookEventProcessed,
}));

vi.mock('@/lib/payments/redeemScenarioPack', () => ({
  redeemScenarioPackPurchase: mocks.redeemScenarioPackPurchase,
}));

vi.mock('@/shared/lib/scenario-quota', () => ({
  getScenarioPackById: mocks.getScenarioPackById,
}));

describe('/api/stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.hasProcessedWebhookEvent.mockResolvedValue(false);
    mocks.markWebhookEventProcessed.mockResolvedValue(undefined);
    mocks.applySuccessfulPurchase.mockResolvedValue(undefined);
    mocks.redeemScenarioPackPurchase.mockResolvedValue(undefined);
    mocks.getScenarioPackById.mockReturnValue({
      id: 'quick_help',
      replies: 8,
    });
  });

  it('redeems scenario packs from paid checkout webhooks', async () => {
    mocks.verifyWebhookSignature.mockResolvedValue({
      id: 'evt_scenario_pack',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_pack_123',
          payment_status: 'paid',
          metadata: {
            flowdockr_pack: 'scenario_reply',
            pack_id: 'quick_help',
            user_id: 'user_123',
          },
        },
      },
    });

    const { POST } = await import('./route');
    const response = await POST(
      new Request('http://localhost/api/stripe/webhook', {
        method: 'POST',
        headers: {
          'stripe-signature': 'sig_test',
        },
        body: '{}',
      }) as any
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toEqual({ received: true });
    expect(mocks.redeemScenarioPackPurchase).toHaveBeenCalledWith({
      stripeCheckoutSessionId: 'cs_pack_123',
      userId: 'user_123',
      packId: 'quick_help',
      credits: 8,
      source: 'stripe_webhook',
    });
    expect(mocks.applySuccessfulPurchase).not.toHaveBeenCalled();
    expect(mocks.markWebhookEventProcessed).toHaveBeenCalled();
  });

  it('keeps normal credit checkout webhooks on the purchase path', async () => {
    mocks.verifyWebhookSignature.mockResolvedValue({
      id: 'evt_credit_pack',
      type: 'checkout.session.completed',
      data: {
        object: {
          id: 'cs_credit_123',
          payment_status: 'paid',
          payment_intent: 'pi_123',
          customer: 'cus_123',
          customer_email: 'buyer@example.com',
          metadata: {
            purchaseId: 'purchase_123',
          },
        },
      },
    });

    const { POST } = await import('./route');
    const response = await POST(
      new Request('http://localhost/api/stripe/webhook', {
        method: 'POST',
        headers: {
          'stripe-signature': 'sig_test',
        },
        body: '{}',
      }) as any
    );

    expect(response.status).toBe(200);
    expect(mocks.applySuccessfulPurchase).toHaveBeenCalledWith(
      expect.objectContaining({
        stripeEventId: 'evt_credit_pack',
        stripeCheckoutSessionId: 'cs_credit_123',
        purchaseIdHint: 'purchase_123',
      })
    );
    expect(mocks.redeemScenarioPackPurchase).not.toHaveBeenCalled();
  });
});
