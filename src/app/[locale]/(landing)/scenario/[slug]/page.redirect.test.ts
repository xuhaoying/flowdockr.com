// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';

import { defaultLocale, locales } from '@/config/locale';

import ScenarioPage from './page';

const mocks = vi.hoisted(() => ({
  redirect: vi.fn((path: string) => {
    const error = new Error('NEXT_REDIRECT');
    (error as Error & { digest?: string }).digest =
      `NEXT_REDIRECT;replace;${path};307;`;
    throw error;
  }),
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  setRequestLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  redirect: mocks.redirect,
  notFound: mocks.notFound,
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mocks.setRequestLocale,
}));

vi.mock('@/components/analytics/ScenarioViewTracker', () => ({
  ScenarioViewTracker: () => null,
}));

vi.mock('@/components/scenario/RelatedScenarios', () => ({
  RelatedScenarios: () => null,
}));

vi.mock('@/components/scenario/ScenarioClientMessages', () => ({
  ScenarioClientMessages: () => null,
}));

vi.mock('@/components/scenario/ScenarioCTA', () => ({
  ScenarioCTA: () => null,
}));

vi.mock('@/components/scenario/ScenarioDifficulty', () => ({
  ScenarioDifficulty: () => null,
}));

vi.mock('@/components/scenario/ScenarioHero', () => ({
  ScenarioHero: () => null,
}));

vi.mock('@/components/scenario/ScenarioInlineTool', () => ({
  ScenarioInlineTool: () => null,
}));

vi.mock('@/components/scenario/ScenarioOverview', () => ({
  ScenarioOverview: () => null,
}));

vi.mock('@/components/scenario/ScenarioReplyPreview', () => ({
  ScenarioReplyPreview: () => null,
}));

vi.mock('@/components/scenario/ScenarioStickyBottomCta', () => ({
  ScenarioStickyBottomCta: () => null,
}));

vi.mock('@/components/shared/PageContainer', () => ({
  PageContainer: ({ children }: { children?: unknown }) => children,
}));

const DIRECT_REDIRECT_CASES = [
  ['price-too-high-response', 'quote-too-high'],
  ['out-of-budget-still-interested', 'out-of-budget-but-interested'],
  ['same-scope-lower-budget', 'same-scope-lower-price'],
  ['no-response-after-proposal-email', 'no-response-after-proposal'],
  ['stopped-replying-after-quote', 'no-response-after-proposal'],
  ['no-response-after-contract-sent', 'contract-sent-no-response'],
  ['rate-before-project-details', 'price-before-scope'],
  ['final-price-before-signing', 'best-price-before-signing'],
] as const;

const nonDefaultLocale = locales.find((locale) => locale !== defaultLocale);

describe('scenario page canonical redirects', () => {
  it.each(DIRECT_REDIRECT_CASES)(
    'redirects %s to the canonical slug for the default locale',
    async (oldSlug, canonicalSlug) => {
      await expect(
        ScenarioPage({
          params: Promise.resolve({
            locale: defaultLocale,
            slug: oldSlug,
          }),
        })
      ).rejects.toMatchObject({
        digest: expect.stringContaining(`/scenario/${canonicalSlug}`),
      });

      expect(mocks.redirect).toHaveBeenLastCalledWith(
        `/scenario/${canonicalSlug}`
      );
    }
  );

  it.each(DIRECT_REDIRECT_CASES)(
    'redirects %s to the localized canonical slug for a non-default locale',
    async (oldSlug, canonicalSlug) => {
      expect(nonDefaultLocale).toBeTruthy();

      await expect(
        ScenarioPage({
          params: Promise.resolve({
            locale: nonDefaultLocale!,
            slug: oldSlug,
          }),
        })
      ).rejects.toMatchObject({
        digest: expect.stringContaining(
          `/${nonDefaultLocale}/scenario/${canonicalSlug}`
        ),
      });

      expect(mocks.redirect).toHaveBeenLastCalledWith(
        `/${nonDefaultLocale}/scenario/${canonicalSlug}`
      );
    }
  );
});
