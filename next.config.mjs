import bundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = createMDX();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/core/i18n/request.ts',
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || '';
let appHostname = '';

try {
  appHostname = new URL(appUrl).hostname.toLowerCase();
} catch {
  appHostname = '';
}

const indexingOverride = process.env.NEXT_PUBLIC_ALLOW_INDEXING;
const forceAllowIndexing = indexingOverride === 'true';
const forceBlockIndexing = indexingOverride === 'false';
const isProductionBuild = process.env.NODE_ENV === 'production';
const isVercelProduction = process.env.VERCEL
  ? process.env.VERCEL_ENV === 'production'
  : true;
const isVercelPreviewDomain = appHostname.endsWith('.vercel.app');

const shouldBlockSearchIndexing =
  forceBlockIndexing ||
  (!forceAllowIndexing &&
    (!isProductionBuild || !isVercelProduction || isVercelPreviewDomain));

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : 'standalone',
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [60, 70, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [];
  },
  async headers() {
    const headers = [
      ...(shouldBlockSearchIndexing
        ? [
            {
              source: '/:path*',
              headers: [
                {
                  key: 'X-Robots-Tag',
                  value: 'noindex, nofollow, noarchive, nosnippet',
                },
              ],
            },
          ]
        : []),
      {
        source: '/imgs/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];

    return headers;
  },
  turbopack: {
    resolveAlias: {
      // fs: {
      //   browser: './empty.ts', // We recommend to fix code imports before using this method
      // },
    },
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    // Disable mdxRs for Vercel deployment compatibility with fumadocs-mdx
    ...(process.env.VERCEL ? {} : { mdxRs: true }),
  },
  reactCompiler: true,
};

export default withBundleAnalyzer(withNextIntl(withMDX(nextConfig)));
