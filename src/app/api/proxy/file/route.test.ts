// @vitest-environment node

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from './route';

const mocks = vi.hoisted(() => ({
  lookup: vi.fn(),
  getAllConfigs: vi.fn(),
}));

vi.mock('node:dns/promises', () => ({
  lookup: mocks.lookup,
}));

vi.mock('@/shared/models/config', () => ({
  getAllConfigs: mocks.getAllConfigs,
}));

describe('/api/proxy/file', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAllConfigs.mockResolvedValue({
      r2_domain: 'https://cdn.example.com',
      s3_domain: '',
    });
    mocks.lookup.mockResolvedValue([{ address: '203.0.113.10' }]);
  });

  it('rejects URLs outside the configured storage hosts', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    const response = await GET(
      new NextRequest(
        'http://localhost/api/proxy/file?url=https://evil.example/file.png'
      )
    );

    expect(response.status).toBe(403);
    expect(await response.text()).toBe('URL host is not allowed');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects allowed hostnames that resolve to private addresses', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    mocks.lookup.mockResolvedValue([{ address: '127.0.0.1' }]);

    const response = await GET(
      new NextRequest(
        'http://localhost/api/proxy/file?url=https://cdn.example.com/image.png'
      )
    );

    expect(response.status).toBe(403);
    expect(await response.text()).toBe('URL host is not allowed');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('returns a bounded file response for an allowed public host', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        return new Response('image-bytes', {
          status: 200,
          headers: {
            'content-type': 'image/png',
            'content-length': '11',
          },
        });
      })
    );

    const response = await GET(
      new NextRequest(
        'http://localhost/api/proxy/file?url=https://assets.cdn.example.com/image.png'
      )
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('image/png');
    expect(response.headers.get('cache-control')).toBe('public, max-age=300');
    expect(await response.text()).toBe('image-bytes');
  });
});
