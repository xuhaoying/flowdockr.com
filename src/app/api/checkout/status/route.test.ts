// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  getCurrentUser: vi.fn(),
  getCheckoutStatus: vi.fn(),
}));

vi.mock('@/lib/auth', () => ({
  getCurrentUser: mocks.getCurrentUser,
}));

vi.mock('@/lib/payments', () => ({
  getCheckoutStatus: mocks.getCheckoutStatus,
}));

describe('/api/checkout/status', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('requires an authenticated user', async () => {
    mocks.getCurrentUser.mockResolvedValue(null);

    const { GET } = await import('./route');
    const response = await GET(
      new NextRequest('http://localhost/api/checkout/status?purchaseId=p_1')
    );
    const payload = await response.json();

    expect(response.status).toBe(401);
    expect(payload).toMatchObject({
      success: false,
      error: 'UNAUTHORIZED',
    });
    expect(mocks.getCheckoutStatus).not.toHaveBeenCalled();
  });

  it('scopes checkout status lookups to the current user', async () => {
    mocks.getCurrentUser.mockResolvedValue({ id: 'user_123' });
    mocks.getCheckoutStatus.mockResolvedValue({
      success: true,
      status: 'paid',
      creditsGranted: true,
      creditsAdded: 8,
      creditsRemaining: 10,
    });

    const { GET } = await import('./route');
    const response = await GET(
      new NextRequest(
        'http://localhost/api/checkout/status?sessionId=cs_123&purchaseId=p_1'
      )
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      success: true,
      status: 'paid',
      creditsGranted: true,
      creditsAdded: 8,
    });
    expect(mocks.getCheckoutStatus).toHaveBeenCalledWith({
      sessionId: 'cs_123',
      purchaseId: 'p_1',
      userId: 'user_123',
    });
  });
});
