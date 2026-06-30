// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  consumeCredit: vi.fn(),
  consumeFreeUsage: vi.fn(),
  consumeUserFreeUsage: vi.fn(),
  consumeFixedWindowRateLimit: vi.fn(),
}));

vi.mock('./consumeCredit', () => ({
  consumeCredit: mocks.consumeCredit,
}));

vi.mock('./getUserFreeReplies', () => ({
  consumeUserFreeUsage: mocks.consumeUserFreeUsage,
}));

vi.mock('./getFreeUsage', () => ({
  FREE_REPLY_LIMIT: 2,
  consumeFreeUsage: mocks.consumeFreeUsage,
}));

vi.mock('@/lib/rate-limit', () => ({
  consumeFixedWindowRateLimit: mocks.consumeFixedWindowRateLimit,
  getFixedWindowRateLimitStatus: vi.fn(),
}));

describe('consumeUsage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('consumes the anonymous IP window before anonymous free usage', async () => {
    mocks.consumeFixedWindowRateLimit.mockResolvedValue({
      allowed: true,
      count: 1,
      remaining: 1,
      resetAt: new Date(),
    });
    mocks.consumeFreeUsage.mockResolvedValue({
      freeRepliesRemaining: 1,
      freeRepliesUsed: 1,
      exhausted: false,
    });

    const { consumeUsage } = await import('./consumeUsage');
    const result = await consumeUsage({
      status: {
        isLoggedIn: false,
        anonymousId: 'anon_123',
        creditsRemaining: 0,
        freeRepliesRemaining: 2,
        canGenerate: true,
        requiresUpgrade: false,
        mode: 'free',
      },
      scenarioSlug: 'discount-request',
      sourcePage: 'tool',
      ipHash: 'ip_hash',
      userAgentHash: 'ua_hash',
    });

    expect(result).toMatchObject({
      modeUsed: 'free',
      freeRepliesRemaining: 1,
    });
    expect(mocks.consumeFixedWindowRateLimit).toHaveBeenCalledWith({
      bucket: 'anonymous_generation',
      key: 'ip_hash:ua_hash',
      limit: 2,
      windowMs: 1000 * 60 * 60 * 24 * 30,
    });
    expect(mocks.consumeFreeUsage).toHaveBeenCalledTimes(1);
  });

  it('blocks anonymous generation when the IP window is exhausted', async () => {
    mocks.consumeFixedWindowRateLimit.mockResolvedValue({
      allowed: false,
      count: 3,
      remaining: 0,
      resetAt: new Date(),
    });

    const { consumeUsage } = await import('./consumeUsage');

    await expect(
      consumeUsage({
        status: {
          isLoggedIn: false,
          anonymousId: 'anon_123',
          creditsRemaining: 0,
          freeRepliesRemaining: 2,
          canGenerate: true,
          requiresUpgrade: false,
          mode: 'free',
        },
        scenarioSlug: 'discount-request',
        sourcePage: 'tool',
        ipHash: 'ip_hash',
        userAgentHash: 'ua_hash',
      })
    ).rejects.toThrow('FREE_LIMIT_REACHED');

    expect(mocks.consumeFreeUsage).not.toHaveBeenCalled();
  });
});
