// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

const mocks = vi.hoisted(() => ({
  createAnonymousSessionId: vi.fn(() => 'anon_session_test_123456'),
  ensureAnonymousUsageRecord: vi.fn(),
  getAnonymousSessionIdFromRequest: vi.fn(() => null),
  setAnonymousSessionCookie: vi.fn(),
}));

vi.mock('@/lib/anonymous', () => ({
  createAnonymousSessionId: mocks.createAnonymousSessionId,
  ensureAnonymousUsageRecord: mocks.ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest: mocks.getAnonymousSessionIdFromRequest,
  setAnonymousSessionCookie: mocks.setAnonymousSessionCookie,
}));

describe('/api/session', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes an anonymous session when usage storage is available', async () => {
    mocks.ensureAnonymousUsageRecord.mockResolvedValue({
      freeGenerationsUsed: 1,
    });

    const response = await POST(
      new NextRequest('http://localhost/api/session', {
        method: 'POST',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      anonymousSessionId: 'anon_session_test_123456',
      remainingFreeGenerations: 1,
      created: true,
      degraded: false,
    });
    expect(mocks.setAnonymousSessionCookie).toHaveBeenCalledTimes(1);
  });

  it('does not surface a 500 when anonymous usage bootstrap fails', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mocks.ensureAnonymousUsageRecord.mockRejectedValue(
      new Error('database unavailable')
    );

    const response = await POST(
      new NextRequest('http://localhost/api/session', {
        method: 'POST',
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      ok: true,
      anonymousSessionId: 'anon_session_test_123456',
      remainingFreeGenerations: 2,
      created: true,
      degraded: true,
    });
    expect(mocks.setAnonymousSessionCookie).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'anonymous session usage bootstrap failed:',
      'database unavailable'
    );
    warnSpy.mockRestore();
  });
});
