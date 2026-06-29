import { getScenarioDistributionPriority } from '@/lib/content/scenarioPages';
import type { ScenarioPageData } from '@/types/content';
import type { CanonicalScenario } from '@/types/scenario-catalog';

const indexableSecondaryScenarioSlugs = new Set(['no-response-after-proposal']);

const scenarioCanonicalPathBySlug: Record<string, string> = {
  'adding-small-requests': '/scenario/scope-creep-polite-response',
  'best-price-before-signing': '/pricing/small-discount-before-closing',
  'discount-before-starting': '/scenario/discount-request',
  'discount-for-future-work': '/scenario/discount-request',
  'discount-request-response': '/scenario/discount-request',
  'extra-revision-rounds': '/pricing/client-requesting-additional-revisions',
  'extra-work-outside-scope': '/pricing/client-asking-for-extra-work',
  'negotiate-price-email-reply': '/pricing/client-negotiating-price',
  'no-response-after-discovery-call': '/scenario/no-response-after-proposal',
  'quick-approval-discount': '/pricing/small-discount-before-closing',
  'silent-after-discovery-call': '/scenario/no-response-after-proposal',
  'ten-percent-off-request': '/pricing/small-discount-before-closing',
  'unlimited-revisions-response': '/scenario/unlimited-revisions',
};

const pricingCanonicalPathBySlug: Record<string, string> = {
  'can-you-do-it-cheaper': '/pricing/client-asking-for-discount',
  'client-expects-immediate-response':
    '/pricing/set-boundaries-with-demanding-client',
  'more-work-than-agreed': '/pricing/client-asking-for-extra-work',
  'turn-down-freelance-work-nicely': '/pricing/say-no-to-client-professionally',
};

export function isScenarioPageSitemapEligible(
  page: CanonicalScenario
): boolean {
  if (!isScenarioPageSelfCanonical(page)) {
    return false;
  }

  return (
    getScenarioDistributionPriority(page) === 'primary' ||
    indexableSecondaryScenarioSlugs.has(page.slug)
  );
}

export function getScenarioPageCanonicalPath(
  page: Pick<CanonicalScenario, 'slug'>
): string {
  return scenarioCanonicalPathBySlug[page.slug] || `/scenario/${page.slug}`;
}

export function getScenarioPageCanonicalUrl(
  page: Pick<CanonicalScenario, 'slug'>,
  baseUrl: string
): string {
  return buildCanonicalUrl(baseUrl, getScenarioPageCanonicalPath(page));
}

export function isPricingScenarioSitemapEligible(
  scenario: Pick<ScenarioPageData, 'pageRole' | 'slug' | 'url'>
): boolean {
  return (
    scenario.pageRole !== 'entry' && isPricingScenarioSelfCanonical(scenario)
  );
}

export function getPricingScenarioCanonicalPath(
  scenario: Pick<ScenarioPageData, 'slug' | 'url'>
): string {
  return (
    pricingCanonicalPathBySlug[scenario.slug] || normalizeSeoPath(scenario.url)
  );
}

export function getPricingScenarioCanonicalUrl(
  scenario: Pick<ScenarioPageData, 'slug' | 'url'>,
  baseUrl: string
): string {
  return buildCanonicalUrl(baseUrl, getPricingScenarioCanonicalPath(scenario));
}

function isScenarioPageSelfCanonical(
  page: Pick<CanonicalScenario, 'slug'>
): boolean {
  return getScenarioPageCanonicalPath(page) === `/scenario/${page.slug}`;
}

function isPricingScenarioSelfCanonical(
  scenario: Pick<ScenarioPageData, 'slug' | 'url'>
): boolean {
  return (
    getPricingScenarioCanonicalPath(scenario) === normalizeSeoPath(scenario.url)
  );
}

function buildCanonicalUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, '')}${normalizeSeoPath(path)}`;
}

function normalizeSeoPath(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
    return normalizedPath.slice(0, -1);
  }

  return normalizedPath;
}
