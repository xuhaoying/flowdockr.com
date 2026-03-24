// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = vi.fn(() => NextResponse.next());

vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => intlMiddleware),
}));

vi.mock('better-auth/cookies', () => ({
  getSessionCookie: vi.fn(() => null),
}));

vi.mock('@/shared/lib/search-indexing', () => ({
  shouldBlockSearchIndexingForHost: vi.fn(() => false),
}));

vi.mock('@/lib/routing/legacyScenarioRedirects', () => ({
  getLegacyScenarioRedirectPath: vi.fn((slug: string) => `/scenario/${slug}`),
  getLegacyScenariosHubRedirectPath: vi.fn(() => '/scenario'),
}));

describe('proxy locale collapse redirects', () => {
  beforeEach(() => {
    intlMiddleware.mockClear();
  });

  it('301 redirects es routes to the english canonical path and preserves query params', async () => {
    const { proxy } = await import('./proxy');
    const request = new NextRequest(
      'https://www.flowdockr.com/es/scenario/extra-work-for-free?utm=seo'
    );

    const response = await proxy(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe(
      'https://www.flowdockr.com/scenario/extra-work-for-free?utm=seo'
    );
    expect(intlMiddleware).not.toHaveBeenCalled();
  });

  it('301 redirects zh routes to the english canonical root', async () => {
    const { proxy } = await import('./proxy');
    const request = new NextRequest('https://www.flowdockr.com/zh');

    const response = await proxy(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://www.flowdockr.com/');
    expect(intlMiddleware).not.toHaveBeenCalled();
  });

  it('keeps english routes on the normal intl middleware path', async () => {
    const { proxy } = await import('./proxy');
    const request = new NextRequest(
      'https://www.flowdockr.com/scenario/discount-request'
    );

    const response = await proxy(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
    expect(intlMiddleware).toHaveBeenCalledOnce();
  });
});
