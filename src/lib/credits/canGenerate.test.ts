// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getCredits: vi.fn(),
  getUserFreeRepliesRemaining: vi.fn(),
  getAnonymousFreeUsageById: vi.fn(),
  getFixedWindowRateLimitStatus: vi.fn(),
}));

vi.mock('./getCredits', () => ({
  getCredits: mocks.getCredits,
}));

vi.mock('./getUserFreeReplies', () => ({
  getUserFreeRepliesRemaining: mocks.getUserFreeRepliesRemaining,
}));

vi.mock('./getFreeUsage', () => ({
  FREE_REPLY_LIMIT: 2,
  getAnonymousFreeUsageById: mocks.getAnonymousFreeUsageById,
}));

vi.mock('@/lib/rate-limit', () => ({
  getFixedWindowRateLimitStatus: mocks.getFixedWindowRateLimitStatus,
}));

describe('canGenerate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('uses the stricter anonymous cookie and IP window remaining count', async () => {
    mocks.getAnonymousFreeUsageById.mockResolvedValue({
      freeRepliesRemaining: 2,
      freeRepliesUsed: 0,
    });
    mocks.getFixedWindowRateLimitStatus.mockResolvedValue({
      allowed: true,
      count: 1,
      remaining: 1,
      resetAt: new Date(),
    });

    const { canGenerate } = await import('./canGenerate');
    const status = await canGenerate({
      isLoggedIn: false,
      anonymousId: 'anon_123',
      ipHash: 'ip_hash',
      userAgentHash: 'ua_hash',
    });

    expect(status).toMatchObject({
      canGenerate: true,
      mode: 'free',
      freeRepliesRemaining: 1,
    });
  });

  it('blocks anonymous generation when the IP window is exhausted', async () => {
    mocks.getAnonymousFreeUsageById.mockResolvedValue({
      freeRepliesRemaining: 2,
      freeRepliesUsed: 0,
    });
    mocks.getFixedWindowRateLimitStatus.mockResolvedValue({
      allowed: false,
      count: 2,
      remaining: 0,
      resetAt: new Date(),
    });

    const { canGenerate } = await import('./canGenerate');
    const status = await canGenerate({
      isLoggedIn: false,
      anonymousId: 'anon_123',
      ipHash: 'ip_hash',
      userAgentHash: 'ua_hash',
    });

    expect(status).toMatchObject({
      canGenerate: false,
      mode: 'blocked',
      requiresUpgrade: true,
      freeRepliesRemaining: 0,
    });
  });
});
