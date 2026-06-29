// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  consumeCredit: vi.fn(),
  grantCredits: vi.fn(),
  createAITask: vi.fn(),
  updateAITaskById: vi.fn(),
  getUserInfo: vi.fn(),
  providerGenerate: vi.fn(),
}));

vi.mock('@/lib/credits', () => ({
  consumeCredit: mocks.consumeCredit,
  grantCredits: mocks.grantCredits,
}));

vi.mock('@/shared/models/user', () => ({
  getUserInfo: mocks.getUserInfo,
}));

vi.mock('@/shared/models/ai_task', () => ({
  createAITask: mocks.createAITask,
  updateAITaskById: mocks.updateAITaskById,
}));

vi.mock('@/shared/services/ai', () => ({
  getAIService: vi.fn(async () => ({
    getMediaTypes: () => ['image'],
    getProvider: () => ({
      generate: mocks.providerGenerate,
    }),
  })),
}));

vi.mock('@/config', () => ({
  envConfigs: {
    app_url: 'https://www.flowdockr.com',
  },
}));

describe('/api/ai/generate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getUserInfo.mockResolvedValue({ id: 'user_123' });
    mocks.consumeCredit.mockResolvedValue(6);
    mocks.createAITask.mockResolvedValue(undefined);
    mocks.updateAITaskById.mockResolvedValue(undefined);
    mocks.grantCredits.mockResolvedValue(10);
  });

  it('refunds consumed credits when the provider request fails', async () => {
    mocks.providerGenerate.mockRejectedValue(new Error('provider down'));

    const { POST } = await import('./route');
    const response = await POST(
      new Request('http://localhost/api/ai/generate', {
        method: 'POST',
        body: JSON.stringify({
          provider: 'fal',
          mediaType: 'image',
          model: 'fal-ai/flux/dev',
          prompt: 'client negotiation image',
          scene: 'text-to-image',
        }),
      })
    );
    const payload = await response.json();

    expect(payload.code).toBe(-1);
    expect(mocks.grantCredits).toHaveBeenCalledWith({
      userId: 'user_123',
      credits: 4,
      type: 'generation_refund',
      reason: 'Refund failed AI generation request',
      metadata: {
        error: 'provider down',
      },
    });
    expect(mocks.updateAITaskById).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ status: 'failed' })
    );
  });
});
