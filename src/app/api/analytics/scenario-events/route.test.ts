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
const analyticsMocks = vi.hoisted(() => ({
  getScenarioAnalyticsSlugCounts: vi.fn(),
  isCanonicalScenarioAnalyticsEventName: vi.fn(() => false),
  recordScenarioAnalyticsEvent: vi.fn(),
  getScenarioPageBySlug: vi.fn(),
  getPricingScenarioBySlug: vi.fn(),
}));

vi.mock('@/core/rbac', () => ({
  PERMISSIONS: {
    ADMIN_ACCESS: 'admin.access',
  },
  PermissionDeniedError: MockPermissionDeniedError,
  requirePermission: requirePermissionMock,
}));

vi.mock('@/lib/analytics/scenarioEventLog', () => ({
  getScenarioAnalyticsSlugCounts: analyticsMocks.getScenarioAnalyticsSlugCounts,
  isCanonicalScenarioAnalyticsEventName:
    analyticsMocks.isCanonicalScenarioAnalyticsEventName,
  recordScenarioAnalyticsEvent: analyticsMocks.recordScenarioAnalyticsEvent,
}));

vi.mock('@/content/scenario-pages', () => ({
  getScenarioPageBySlug: analyticsMocks.getScenarioPageBySlug,
}));

vi.mock('@/lib/pricing-cluster', () => ({
  getPricingScenarioBySlug: analyticsMocks.getPricingScenarioBySlug,
}));

describe('/api/analytics/scenario-events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    analyticsMocks.isCanonicalScenarioAnalyticsEventName.mockReturnValue(false);
    analyticsMocks.getScenarioPageBySlug.mockReturnValue(null);
    analyticsMocks.getPricingScenarioBySlug.mockReturnValue(null);
    analyticsMocks.recordScenarioAnalyticsEvent.mockResolvedValue(undefined);
  });

  it('does not surface analytics storage failures as browser-visible errors', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    analyticsMocks.isCanonicalScenarioAnalyticsEventName.mockReturnValue(true);
    analyticsMocks.getScenarioPageBySlug.mockReturnValue({ slug: 'quote-too-high' });
    analyticsMocks.recordScenarioAnalyticsEvent.mockRejectedValue(
      new Error('database unavailable')
    );

    const { POST } = await import('./route');
    const response = await POST(
      new NextRequest('http://localhost/api/analytics/scenario-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: 'fd_scenario_view',
          scenarioSlug: 'quote-too-high',
          pageType: 'scenario',
        }),
      })
    );
    const payload = await response.json();

    expect(response.status).toBe(202);
    expect(payload).toEqual({
      ok: false,
      message: 'Scenario analytics event was not recorded.',
    });
    expect(warnSpy).toHaveBeenCalledWith(
      'scenario analytics event was not recorded:',
      'database unavailable'
    );
    warnSpy.mockRestore();
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
