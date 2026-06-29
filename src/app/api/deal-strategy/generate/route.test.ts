// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  consumeCredit: vi.fn(),
  getCredits: vi.fn(),
  grantCredits: vi.fn(),
  createAITask: vi.fn(),
  getUserInfo: vi.fn(),
  generateDealStrategyWithMode: vi.fn(),
}));

vi.mock('@/lib/credits', () => ({
  consumeCredit: mocks.consumeCredit,
  getCredits: mocks.getCredits,
  grantCredits: mocks.grantCredits,
}));

vi.mock('@/shared/models/user', () => ({
  getUserInfo: mocks.getUserInfo,
}));

vi.mock('@/shared/models/ai_task', () => ({
  createAITask: mocks.createAITask,
}));

vi.mock('@/shared/services/deal-ai', () => ({
  generateDealStrategyWithMode: mocks.generateDealStrategyWithMode,
  makeDealPreview: vi.fn((strategy) => strategy),
}));

vi.mock('@/shared/services/sales-coach', () => ({
  pickLocale: vi.fn(() => 'en'),
}));

describe('/api/deal-strategy/generate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getUserInfo.mockResolvedValue({ id: 'user_123' });
    mocks.consumeCredit.mockResolvedValue(2);
    mocks.grantCredits.mockResolvedValue(3);
  });

  it('refunds the consumed credit when deal strategy generation fails', async () => {
    mocks.generateDealStrategyWithMode.mockRejectedValue(
      new Error('model failed')
    );

    const { POST } = await import('./route');
    const response = await POST(
      new Request('http://localhost/api/deal-strategy/generate', {
        method: 'POST',
        body: JSON.stringify({
          client_need: 'Website redesign',
          your_quote: 3000,
          client_objection: 'Too expensive',
          your_floor_price: 2500,
        }),
      })
    );
    const payload = await response.json();

    expect(payload.code).toBe(-1);
    expect(mocks.grantCredits).toHaveBeenCalledWith({
      userId: 'user_123',
      credits: 1,
      type: 'generation_refund',
      reason: 'Refund failed deal strategy generation',
      metadata: {
        error: 'model failed',
      },
    });
    expect(mocks.createAITask).not.toHaveBeenCalled();
  });
});
