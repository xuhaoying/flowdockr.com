// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

const mocks = vi.hoisted(() => ({
  hashRequestIp: vi.fn(() => 'ip_hash'),
  consumeFixedWindowRateLimit: vi.fn(),
  sendMagicLink: vi.fn(),
}));

vi.mock('@/lib/anonymous', () => ({
  hashRequestIp: mocks.hashRequestIp,
}));

vi.mock('@/lib/rate-limit', () => ({
  consumeFixedWindowRateLimit: mocks.consumeFixedWindowRateLimit,
}));

vi.mock('@/lib/magic-link', () => ({
  sendMagicLink: mocks.sendMagicLink,
}));

const allowedQuota = {
  allowed: true,
  count: 1,
  remaining: 2,
  resetAt: new Date('2026-06-30T00:15:00.000Z'),
};

describe('/api/magic-link', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.consumeFixedWindowRateLimit.mockResolvedValue(allowedQuota);
  });

  it('normalizes email and sends magic link when rate limits allow it', async () => {
    const request = new NextRequest('http://localhost/api/magic-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '203.0.113.1',
      },
      body: JSON.stringify({
        email: ' USER@Example.COM ',
        callbackUrl: '/tools/reply-generator',
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      message: 'If that email can receive a magic link, one has been sent.',
    });
    expect(mocks.sendMagicLink).toHaveBeenCalledWith(
      'user@example.com',
      '/tools/reply-generator'
    );
    expect(mocks.consumeFixedWindowRateLimit).toHaveBeenCalledTimes(2);
  });

  it('does not reveal rate-limit state or send mail when a limit is exhausted', async () => {
    mocks.consumeFixedWindowRateLimit
      .mockResolvedValueOnce({
        ...allowedQuota,
        allowed: false,
        count: 4,
        remaining: 0,
      })
      .mockResolvedValueOnce(allowedQuota);

    const request = new NextRequest('http://localhost/api/magic-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'limited@example.com',
      }),
    });

    const response = await POST(request);
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      message: 'If that email can receive a magic link, one has been sent.',
    });
    expect(mocks.sendMagicLink).not.toHaveBeenCalled();
  });
});
