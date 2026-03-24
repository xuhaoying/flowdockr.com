import { canonicalScenarioSeeds } from '@/content/scenario-pages/scenario-seeds';
import { scenarioDatasetV1 } from '@/content/scenario-pages/scenario-dataset-v1';
import type {
  CanonicalScenario,
  ScenarioArchetype,
  ScenarioDistributionPriority,
  ScenarioLinkCluster,
  ScenarioRelatedGroup,
  ScenarioRelatedLink,
} from '@/types/scenario-catalog';

export const scenarioPages: CanonicalScenario[] = mergeScenarioPages(
  scenarioDatasetV1,
  canonicalScenarioSeeds
);

const scenarioPageMap = new Map<string, CanonicalScenario>(
  scenarioPages.map((page) => [page.slug, page])
);

const archetypeLabels: Record<ScenarioArchetype, string> = {
  pricing_objection: 'Pricing objection',
  price_comparison: 'Price comparison',
  pricing_probe: 'Early pricing probe',
  scope_control: 'Scope and revision control',
  payment_protection: 'Payment and contract protection',
  expectation_management: 'Expectation management',
  follow_up: 'Deal follow-up',
  contract_terms: 'Contract terms',
};

const stageLabels: Record<CanonicalScenario['negotiationStage'], string> = {
  early_inquiry: 'Early inquiry',
  quote_pushback: 'Quote pushback',
  active_negotiation: 'Active negotiation',
  post_quote: 'Post quote',
  contract_terms: 'Contract terms',
  pre_kickoff: 'Pre kickoff',
  in_project: 'In project',
};

const adjacentScenarioClusters: Record<
  ScenarioLinkCluster,
  ScenarioLinkCluster[]
> = {
  pricing: ['ghosting', 'scope', 'payment', 'client_management'],
  ghosting: ['pricing', 'payment', 'client_management', 'scope'],
  payment: ['scope', 'ghosting', 'pricing', 'client_management'],
  scope: ['pricing', 'payment', 'client_management', 'ghosting'],
  client_management: ['scope', 'ghosting', 'pricing', 'payment'],
};

const distributionPriorityWeights: Record<
  ScenarioDistributionPriority,
  number
> = {
  primary: 3,
  secondary: 2,
  monitor: 1,
};

const commercialPriorityWeights = {
  high: 3,
  medium: 2,
  low: 1,
} as const;

const valueIntentWeights = {
  money: 3,
  boundary: 2,
  followup: 1,
  soft: 0,
} as const;

export function getScenarioPageBySlug(slug: string): CanonicalScenario | null {
  return scenarioPageMap.get(slug) || null;
}

export function getAllScenarioPageSlugs(): string[] {
  return scenarioPages.map((page) => page.slug);
}

export function getAllScenarioPages(): CanonicalScenario[] {
  return scenarioPages;
}

export function getPopularScenarioPages(limit = 4): CanonicalScenario[] {
  return scenarioPages
    .filter((page) => getScenarioDistributionPriority(page) === 'primary')
    .sort(compareScenarioPageExposure)
    .slice(0, limit);
}

export function getScenarioDistributionPriority(
  scenario: Pick<
    CanonicalScenario,
    | 'distributionPriority'
    | 'intentTier'
    | 'commercialPriority'
    | 'valueIntent'
    | 'cluster'
    | 'archetype'
  >
): ScenarioDistributionPriority {
  if (scenario.distributionPriority) {
    return scenario.distributionPriority;
  }

  const cluster = getScenarioLinkCluster(scenario);
  if (
    scenario.intentTier === 'core' &&
    scenario.commercialPriority === 'high' &&
    scenario.valueIntent !== 'followup' &&
    (cluster === 'payment' || cluster === 'pricing' || cluster === 'scope')
  ) {
    return 'primary';
  }

  if (
    scenario.intentTier === 'supporting' ||
    scenario.commercialPriority === 'medium' ||
    scenario.valueIntent === 'followup' ||
    cluster === 'ghosting'
  ) {
    return 'secondary';
  }

  return 'monitor';
}

export function compareScenarioPageExposure(
  left: CanonicalScenario,
  right: CanonicalScenario
): number {
  const scoreDifference =
    getScenarioExposureScore(right) - getScenarioExposureScore(left);

  if (scoreDifference !== 0) {
    return scoreDifference;
  }

  return left.title.localeCompare(right.title);
}

export function getScenarioPagesByDistributionPriority(
  priority: ScenarioDistributionPriority,
  options?: {
    cluster?: ScenarioLinkCluster;
    limit?: number;
  }
): CanonicalScenario[] {
  const filtered = scenarioPages
    .filter((page) => getScenarioDistributionPriority(page) === priority)
    .filter((page) => !options?.cluster || page.cluster === options.cluster)
    .sort(compareScenarioPageExposure);

  return typeof options?.limit === 'number'
    ? filtered.slice(0, options.limit)
    : filtered;
}

export function getScenarioArchetypeLabel(
  archetype: ScenarioArchetype
): string {
  return archetypeLabels[archetype];
}

export function getNegotiationStageLabel(
  stage: CanonicalScenario['negotiationStage']
): string {
  return stageLabels[stage];
}

export function getScenarioMetaDescription(
  scenario: Pick<
    CanonicalScenario,
    'userSituation' | 'userGoal' | 'metaDescription'
  >
): string {
  if (scenario.metaDescription?.trim()) {
    return scenario.metaDescription.trim();
  }

  const description = [
    scenario.userSituation.trim(),
    scenario.userGoal?.trim() || 'Get a professional reply you can adapt and send.',
  ].join(' ');

  if (description.length <= 155) {
    return description;
  }

  return `${description.slice(0, 152).trimEnd()}...`;
}

export function getScenarioMetaTitle(
  scenario: Pick<CanonicalScenario, 'title' | 'metaTitle'>
): string {
  return scenario.metaTitle?.trim() || `${scenario.title} | Flowdockr`;
}

export function getScenarioHeroDescription(
  scenario: Pick<
    CanonicalScenario,
    'heroDescription' | 'userSituation' | 'userGoal' | 'strategyPrimary'
  >
): string {
  if (scenario.heroDescription?.trim()) {
    return scenario.heroDescription.trim();
  }

  return `${scenario.userSituation} Get a professional reply you can adapt and send.`;
}

export function getScenarioPagePromise(
  scenario: Pick<CanonicalScenario, 'pagePromise' | 'userGoal' | 'toolPromptIntent'>
): string {
  return (
    scenario.pagePromise?.trim() ||
    scenario.userGoal?.trim() ||
    scenario.toolPromptIntent.trim()
  );
}

export function getRelatedScenarioSectionCopy(
  scenario: Pick<
    CanonicalScenario,
    'cluster' | 'archetype' | 'relatedSectionTitle' | 'relatedSectionDescription'
  >
): {
  title: string;
  description: string;
} {
  if (
    scenario.relatedSectionTitle?.trim() &&
    scenario.relatedSectionDescription?.trim()
  ) {
    return {
      title: scenario.relatedSectionTitle.trim(),
      description: scenario.relatedSectionDescription.trim(),
    };
  }

  const cluster = getScenarioLinkCluster(scenario);

  switch (cluster) {
    case 'payment':
      return {
        title: 'More client payment scripts',
        description:
          'Related payment reminders, unpaid invoice follow-ups, and deposit conversations.',
      };
    case 'pricing':
      return {
        title: 'Related pricing scenarios',
        description:
          'More client replies for rate objections, discount requests, and budget pushback.',
      };
    case 'scope':
      return {
        title: 'Related boundary-setting scenarios',
        description:
          'Similar scripts for revisions, extra work, scope creep, and changing deliverables.',
      };
    case 'ghosting':
      return {
        title: 'Related follow-up scenarios',
        description:
          'More client no-response, delayed decision, and proposal follow-up conversations.',
      };
    case 'client_management':
      return {
        title: 'Related client communication scenarios',
        description:
          'More expectation-setting and difficult client conversation templates.',
      };
  }
}

export function getRelatedScenarioLinks(
  slug: string,
  limit = 5
): ScenarioRelatedLink[] {
  const scenario = getScenarioPageBySlug(slug);
  if (!scenario) {
    return [];
  }

  const maxLinks = Math.max(3, Math.min(5, limit));
  const explicitLinks = getExplicitRelatedScenarioLinks(scenario, maxLinks);
  const explicitLinkSlugs = new Set(explicitLinks.map((item) => item.slug));

  if (explicitLinks.length >= maxLinks) {
    return explicitLinks;
  }

  const sourceCluster = getScenarioLinkCluster(scenario);
  const sameCluster: RelatedScenarioCandidate[] = [];
  const adjacentByCluster = new Map<
    ScenarioLinkCluster,
    RelatedScenarioCandidate[]
  >();
  const fallback: RelatedScenarioCandidate[] = [];

  for (const candidate of scenarioPages) {
    if (candidate.slug === slug) {
      continue;
    }

    if (explicitLinkSlugs.has(candidate.slug)) {
      continue;
    }

    const candidateCluster = getScenarioLinkCluster(candidate);
    const relatedCandidate = {
      candidate,
      cluster: candidateCluster,
      score: getRelatedScore(scenario, candidate),
    };

    if (candidateCluster === sourceCluster) {
      sameCluster.push(relatedCandidate);
      continue;
    }

    if (adjacentScenarioClusters[sourceCluster].includes(candidateCluster)) {
      const group = adjacentByCluster.get(candidateCluster) || [];
      group.push(relatedCandidate);
      adjacentByCluster.set(candidateCluster, group);
      continue;
    }

    fallback.push(relatedCandidate);
  }

  const sortCandidates = (
    left: RelatedScenarioCandidate,
    right: RelatedScenarioCandidate
  ) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }

    const exposureDifference = compareScenarioPageExposure(
      left.candidate,
      right.candidate
    );

    if (exposureDifference !== 0) {
      return exposureDifference;
    }

    return left.candidate.title.localeCompare(right.candidate.title);
  };

  sameCluster.sort(sortCandidates);
  fallback.sort(sortCandidates);

  for (const cluster of adjacentScenarioClusters[sourceCluster]) {
    adjacentByCluster.get(cluster)?.sort(sortCandidates);
  }

  const selected: RelatedScenarioCandidate[] = [];
  const selectedSlugs = new Set<string>(explicitLinkSlugs);

  const pushCandidates = (candidates: RelatedScenarioCandidate[]) => {
    for (const candidate of candidates) {
      if (
        selected.length >= maxLinks ||
        selectedSlugs.has(candidate.candidate.slug)
      ) {
        continue;
      }

      selected.push(candidate);
      selectedSlugs.add(candidate.candidate.slug);
    }
  };

  pushCandidates(sameCluster.slice(0, 3));

  for (const cluster of adjacentScenarioClusters[sourceCluster].slice(0, 2)) {
    pushCandidates((adjacentByCluster.get(cluster) || []).slice(0, 1));
  }

  pushCandidates(sameCluster.slice(3));

  for (const cluster of adjacentScenarioClusters[sourceCluster]) {
    pushCandidates((adjacentByCluster.get(cluster) || []).slice(1));
  }

  pushCandidates(fallback);

  const heuristicLinks = selected.slice(0, maxLinks).map(({ candidate }) => ({
    slug: candidate.slug,
    title: candidate.title,
    description: candidate.userSituation,
  }));

  return [...explicitLinks, ...heuristicLinks].slice(0, maxLinks);
}

export function getRelatedScenarioGroups(
  slug: string
): ScenarioRelatedGroup[] {
  const scenario = getScenarioPageBySlug(slug);
  if (!scenario) {
    return [];
  }

  const similarItems = getScenarioLinksBySlugs(scenario.similarScenarioSlugs, 3);
  const nextStepItems = getScenarioLinksBySlugs(scenario.nextStepScenarioSlugs, 3);

  const groups: ScenarioRelatedGroup[] = [];

  if (similarItems.length > 0) {
    groups.push({
      id: 'similar',
      title: 'Similar scenarios',
      description:
        'Close variants of this client conversation that need a similar kind of reply.',
      items: similarItems,
    });
  }

  if (nextStepItems.length > 0) {
    groups.push({
      id: 'next_step',
      title: 'Next-step scenarios',
      description: getNextStepScenarioDescription(scenario),
      items: nextStepItems,
    });
  }

  if (groups.length > 0) {
    return groups;
  }

  const fallbackItems = getRelatedScenarioLinks(slug);
  if (fallbackItems.length === 0) {
    return [];
  }

  const relatedSection = getRelatedScenarioSectionCopy(scenario);

  return [
    {
      id: 'related',
      title: relatedSection.title,
      description: relatedSection.description,
      items: fallbackItems,
    },
  ];
}

function getRelatedScore(
  source: CanonicalScenario,
  candidate: CanonicalScenario
): number {
  let score = 0;
  const sourceCluster = getScenarioLinkCluster(source);
  const candidateCluster = getScenarioLinkCluster(candidate);

  if (sourceCluster === candidateCluster) {
    score += 6;
  } else {
    const adjacentRank =
      adjacentScenarioClusters[sourceCluster].indexOf(candidateCluster);
    if (adjacentRank !== -1) {
      score += Math.max(1, 3 - adjacentRank);
    }
  }

  if (source.archetype === candidate.archetype) {
    score += 5;
  }

  if (source.negotiationStage === candidate.negotiationStage) {
    score += 3;
  }

  if (source.priority === candidate.priority) {
    score += 1;
  }

  return score;
}

type RelatedScenarioCandidate = {
  candidate: CanonicalScenario;
  cluster: ScenarioLinkCluster;
  score: number;
};

function getScenarioLinkCluster(
  scenario: Pick<CanonicalScenario, 'archetype' | 'cluster'>
): ScenarioLinkCluster {
  if (scenario.cluster) {
    return scenario.cluster;
  }

  if (
    scenario.archetype === 'pricing_objection' ||
    scenario.archetype === 'price_comparison' ||
    scenario.archetype === 'pricing_probe'
  ) {
    return 'pricing';
  }

  if (scenario.archetype === 'follow_up') {
    return 'ghosting';
  }

  if (scenario.archetype === 'payment_protection') {
    return 'payment';
  }

  if (
    scenario.archetype === 'scope_control' ||
    scenario.archetype === 'contract_terms'
  ) {
    return 'scope';
  }

  return 'client_management';
}

function getScenarioLinksBySlugs(
  slugs: string[] | undefined,
  limit: number
): ScenarioRelatedLink[] {
  if (!slugs?.length) {
    return [];
  }

  return slugs
    .map((relatedSlug, index) => ({
      index,
      page: scenarioPageMap.get(relatedSlug),
    }))
    .filter(
      (item): item is { index: number; page: CanonicalScenario } =>
        Boolean(item.page)
    )
    .sort((left, right) => {
      const exposureDifference = compareScenarioPageExposure(
        left.page,
        right.page
      );

      if (exposureDifference !== 0) {
        return exposureDifference;
      }

      return left.index - right.index;
    })
    .slice(0, limit)
    .map(({ page }) => ({
      slug: page.slug,
      title: page.title,
      description: page.userSituation,
    }));
}

function getExplicitRelatedScenarioLinks(
  scenario: Pick<CanonicalScenario, 'slug' | 'relatedScenarioSlugs'>,
  limit: number
): ScenarioRelatedLink[] {
  return getScenarioLinksBySlugs(
    scenario.relatedScenarioSlugs?.filter(
      (relatedSlug) => relatedSlug !== scenario.slug
    ),
    limit
  );
}

function getNextStepScenarioDescription(
  scenario: Pick<CanonicalScenario, 'cluster' | 'archetype'>
): string {
  switch (getScenarioLinkCluster(scenario)) {
    case 'payment':
      return 'If the payment issue keeps dragging, these are the next money conversations you are likely to hit.';
    case 'pricing':
      return 'If the client keeps pushing on price, these are the next pricing conversations likely to follow.';
    case 'scope':
      return 'If the boundary keeps getting tested, these are the next scope conversations likely to show up.';
    case 'ghosting':
      return 'If the silence continues or shifts stages, these are the next follow-up conversations likely to matter.';
    case 'client_management':
      return 'If the conversation gets more complicated, these are the next client situations likely to matter.';
  }
}

function mergeScenarioPages(
  preferred: CanonicalScenario[],
  existing: CanonicalScenario[]
): CanonicalScenario[] {
  const preferredUnique = dedupeScenarioPages(preferred);
  const preferredSlugs = new Set(preferredUnique.map((item) => item.slug));
  const existingUnique = dedupeScenarioPages(existing).filter(
    (item) => !preferredSlugs.has(item.slug)
  );

  return [...preferredUnique, ...existingUnique].map((item) =>
    normalizeScenarioPage(item)
  );
}

function dedupeScenarioPages(
  pages: CanonicalScenario[]
): CanonicalScenario[] {
  const seen = new Set<string>();
  const deduped: CanonicalScenario[] = [];

  for (let index = pages.length - 1; index >= 0; index -= 1) {
    const page = pages[index];
    if (seen.has(page.slug)) {
      continue;
    }

    seen.add(page.slug);
    deduped.push(page);
  }

  return deduped.reverse();
}

function normalizeScenarioPage(
  page: CanonicalScenario
): CanonicalScenario {
  const cluster = page.cluster || getScenarioLinkCluster(page);

  return {
    ...page,
    cluster,
    distributionPriority:
      page.distributionPriority ||
      getScenarioDistributionPriority({
        ...page,
        cluster,
      }),
  };
}

function getScenarioExposureScore(page: CanonicalScenario): number {
  const distributionPriority = getScenarioDistributionPriority(page);

  return (
    distributionPriorityWeights[distributionPriority] * 100 +
    (page.clusterCore ? 20 : 0) +
    commercialPriorityWeights[page.commercialPriority || 'low'] * 10 +
    valueIntentWeights[page.valueIntent || 'soft'] * 2 +
    (page.intentTier === 'core' ? 1 : 0)
  );
}
