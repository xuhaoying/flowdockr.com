import type { NextDecisionLink } from '@/types/content';
import type {
  CanonicalScenario,
  ScenarioDistributionPriority,
  ScenarioLinkCluster,
} from '@/types/scenario-catalog';
import type { ScenarioHubScenarioLink } from '@/types/scenario-hub';

import {
  compareScenarioPageExposure,
  getPopularScenarioPages,
  getScenarioDistributionPriority,
  getScenarioPageBySlug,
  getScenarioPagesByDistributionPriority,
} from './index';

export type ScenarioSurfaceEntry = {
  slug: string;
  title: string;
  description: string;
  href: string;
  cluster: ScenarioLinkCluster;
  distributionPriority: ScenarioDistributionPriority;
  clusterCore: boolean;
};

export type ScenarioSurfaceGroup = {
  id: string;
  title: string;
  description: string;
  items: ScenarioSurfaceEntry[];
};

const HOMEPAGE_SURFACE_GROUPS = [
  {
    id: 'pricing',
    title: 'Pricing pushback',
    description:
      'Primary money conversations where protecting rate and scope matters most.',
    slugs: ['quote-too-high', 'discount-request', 'found-someone-cheaper'],
  },
  {
    id: 'payment',
    title: 'Payment pressure',
    description:
      'High-anxiety payment follow-ups where clear wording directly protects cash flow.',
    slugs: [
      'ask-for-payment-politely',
      'final-payment-reminder',
      'deposit-not-paid-yet',
    ],
  },
  {
    id: 'scope',
    title: 'Scope boundaries',
    description:
      'Boundary-setting pages for unpaid extras, revision drift, and out-of-scope asks.',
    slugs: [
      'extra-work-for-free',
      'unlimited-revisions',
      'out-of-scope-professionally',
    ],
  },
] as const;

const TOOLS_INDEX_STARTING_SCENARIO_SLUGS = [
  'quote-too-high',
  'discount-request',
  'ask-for-payment-politely',
  'out-of-scope-professionally',
] as const;

const TOOL_SURFACE_SCENARIO_SLUGS: Record<string, string[]> = {
  'reply-generator': [
    'quote-too-high',
    'ask-for-payment-politely',
    'out-of-scope-professionally',
    'extra-work-outside-scope',
  ],
  'price-negotiation-email-generator': [
    'discount-request',
    'found-someone-cheaper',
    'lower-rate-after-proposal',
    'same-scope-lower-price',
    'meet-their-budget',
  ],
};

export function getHomepageScenarioSurfaceGroups(): ScenarioSurfaceGroup[] {
  return HOMEPAGE_SURFACE_GROUPS.map((group) => ({
    id: group.id,
    title: group.title,
    description: group.description,
    items: getScenarioSurfaceEntriesBySlugs(group.slugs),
  })).filter((group) => group.items.length > 0);
}

export function getScenarioHubPopularSurfaceEntries(
  limit = 8
): ScenarioHubScenarioLink[] {
  return getPopularScenarioPages(limit).map(toScenarioHubLink);
}

export function getScenarioHubClusterSurfacePages(
  pages: CanonicalScenario[]
): CanonicalScenario[] {
  const primaryCore = pages
    .filter(
      (page) =>
        getScenarioDistributionPriority(page) === 'primary' && page.clusterCore
    )
    .sort(compareScenarioPageExposure);
  const primaryOther = pages
    .filter(
      (page) =>
        getScenarioDistributionPriority(page) === 'primary' && !page.clusterCore
    )
    .sort(compareScenarioPageExposure);
  const secondary = pages
    .filter((page) => getScenarioDistributionPriority(page) === 'secondary')
    .sort(compareScenarioPageExposure);
  const monitor = pages
    .filter((page) => getScenarioDistributionPriority(page) === 'monitor')
    .sort(compareScenarioPageExposure);

  if (secondary.length === 0) {
    return [...primaryCore, ...primaryOther, ...monitor];
  }

  const leadingPrimary = [...primaryCore, ...primaryOther];
  const ordered: CanonicalScenario[] = [];
  const seen = new Set<string>();

  const pushPage = (page: CanonicalScenario | undefined) => {
    if (!page || seen.has(page.slug)) {
      return;
    }

    ordered.push(page);
    seen.add(page.slug);
  };

  pushPage(leadingPrimary[0]);
  pushPage(leadingPrimary[1]);
  pushPage(secondary[0]);

  for (const page of [...leadingPrimary.slice(2), ...secondary.slice(1), ...monitor]) {
    pushPage(page);
  }

  return ordered;
}

export function getScenarioHubClusterSurfaceEntries(
  pages: CanonicalScenario[]
): ScenarioHubScenarioLink[] {
  return getScenarioHubClusterSurfacePages(pages).map(toScenarioHubLink);
}

export function getToolsIndexScenarioSurfaceEntries(
  limit = 4
): ScenarioSurfaceEntry[] {
  return getScenarioSurfaceEntriesBySlugs(
    TOOLS_INDEX_STARTING_SCENARIO_SLUGS
  ).slice(0, limit);
}

export function getToolSurfaceScenarioEntries(
  toolSlug: string,
  limit = 5
): ScenarioSurfaceEntry[] {
  const slugs = TOOL_SURFACE_SCENARIO_SLUGS[toolSlug];
  if (slugs?.length) {
    return getScenarioSurfaceEntriesBySlugs(slugs).slice(0, limit);
  }

  return getScenarioPagesByDistributionPriority('primary')
    .filter(
      (page) =>
        page.cluster === 'payment' ||
        page.cluster === 'pricing' ||
        page.cluster === 'scope'
    )
    .slice(0, limit)
    .map(toScenarioSurfaceEntry);
}

export function getToolSurfaceScenarioLinks(
  toolSlug: string,
  limit = 5
): NextDecisionLink[] {
  return getToolSurfaceScenarioEntries(toolSlug, limit).map((entry) => ({
    href: entry.href,
    label: entry.title,
  }));
}

function getScenarioSurfaceEntriesBySlugs(
  slugs: readonly string[]
): ScenarioSurfaceEntry[] {
  return slugs
    .map((slug) => getScenarioPageBySlug(slug))
    .filter((page): page is CanonicalScenario => Boolean(page))
    .map(toScenarioSurfaceEntry);
}

function toScenarioSurfaceEntry(page: CanonicalScenario): ScenarioSurfaceEntry {
  return {
    slug: page.slug,
    title: page.h1 || page.title,
    description: page.pagePromise || page.userSituation,
    href: `/scenario/${page.slug}`,
    cluster: page.cluster!,
    distributionPriority: getScenarioDistributionPriority(page),
    clusterCore: Boolean(page.clusterCore),
  };
}

function toScenarioHubLink(page: CanonicalScenario): ScenarioHubScenarioLink {
  return {
    slug: page.slug,
    title: page.h1 || page.title,
    description: page.userSituation,
  };
}
