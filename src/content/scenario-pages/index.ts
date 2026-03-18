import { canonicalScenarioSeeds } from '@/content/scenario-pages/scenario-seeds';
import type {
  CanonicalScenario,
  ScenarioArchetype,
  ScenarioRelatedLink,
} from '@/types/scenario-catalog';

export const scenarioPages: CanonicalScenario[] = canonicalScenarioSeeds;

type ScenarioLinkCluster =
  | 'pricing'
  | 'ghosting'
  | 'payment'
  | 'scope'
  | 'client_management';

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
  return scenarioPages.filter((page) => page.priority === 'p0').slice(0, limit);
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
    'title' | 'userSituation' | 'primaryClientMessage'
  >
): string {
  const description = `${scenario.title}. ${scenario.userSituation} Typical client message: ${scenario.primaryClientMessage}`;

  if (description.length <= 155) {
    return description;
  }

  return `${description.slice(0, 152).trimEnd()}...`;
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

    return left.candidate.title.localeCompare(right.candidate.title);
  };

  sameCluster.sort(sortCandidates);
  fallback.sort(sortCandidates);

  for (const cluster of adjacentScenarioClusters[sourceCluster]) {
    adjacentByCluster.get(cluster)?.sort(sortCandidates);
  }

  const selected: RelatedScenarioCandidate[] = [];
  const selectedSlugs = new Set<string>();

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

  return selected.slice(0, maxLinks).map(({ candidate }) => ({
    slug: candidate.slug,
    title: candidate.title,
    description: candidate.userSituation,
  }));
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
  scenario: Pick<CanonicalScenario, 'archetype'>
): ScenarioLinkCluster {
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
