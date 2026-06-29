// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

class MockPermissionDeniedError extends Error {
  constructor(message = 'Permission denied') {
    super(message);
    this.name = 'PermissionDeniedError';
  }
}

const requirePermissionMock = vi.fn();

vi.mock('@/core/rbac', () => ({
  PERMISSIONS: {
    ADMIN_ACCESS: 'admin.access',
  },
  PermissionDeniedError: MockPermissionDeniedError,
  requirePermission: requirePermissionMock,
}));

vi.mock('@/lib/analytics/scenarioEventLog', () => ({
  getScenarioAnalyticsSlugCounts: vi.fn(),
  isCanonicalScenarioAnalyticsEventName: vi.fn(() => false),
  recordScenarioAnalyticsEvent: vi.fn(),
}));

describe('/api/analytics/scenario-events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not export analytics counts to unauthenticated callers', async () => {
    requirePermissionMock.mockRejectedValue(new MockPermissionDeniedError());

    const { GET } = await import('./route');
    const response = await GET(
      new NextRequest('http://localhost/api/analytics/scenario-events')
    );
    const payload = await response.json();

    expect(response.status).toBe(403);
    expect(payload).toEqual({ ok: false, message: 'Forbidden.' });
    expect(requirePermissionMock).toHaveBeenCalledWith({
      code: 'admin.access',
    });
  });
});
