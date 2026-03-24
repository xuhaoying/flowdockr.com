import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => ({
    has: vi.fn(() => false),
  })),
  setRequestLocale: vi.fn(),
}));

vi.mock('@/config', () => ({
  envConfigs: {
    site_url: 'https://www.flowdockr.com',
    app_preview_image: '/preview.png',
    app_name: 'Flowdockr',
  },
}));

vi.mock('@/shared/lib/search-indexing', () => ({
  shouldBlockSearchIndexing: vi.fn(() => false),
}));

describe('shared seo canonical metadata', () => {
  it('always builds english canonical urls even when the incoming locale is zh', async () => {
    const { getMetadata } = await import('./seo');
    const generateMetadata = getMetadata({
      title: 'Discount reply',
      description: 'Generate a discount response.',
      canonicalUrl: '/scenario/discount-request',
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'zh' }),
    });

    expect(metadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/discount-request'
    );
    expect(metadata.openGraph?.url).toBe(
      'https://www.flowdockr.com/scenario/discount-request'
    );
    expect(metadata.openGraph?.locale).toBe('en');
  });
});
