import { canonicalScenarioSeeds } from '@/content/scenario-pages/scenario-seeds';
import type {
  CanonicalScenario,
  ScenarioArchetype,
  ScenarioRelatedLink,
} from '@/types/scenario-catalog';

export const scenarioPages: CanonicalScenario[] = canonicalScenarioSeeds;

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
  limit = 3
): ScenarioRelatedLink[] {
  const scenario = getScenarioPageBySlug(slug);
  if (!scenario) {
    return [];
  }

  return scenarioPages
    .filter((candidate) => candidate.slug !== slug)
    .map((candidate) => ({
      candidate,
      score: getRelatedScore(scenario, candidate),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.candidate.title.localeCompare(right.candidate.title);
    })
    .slice(0, limit)
    .map(({ candidate }) => ({
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

  if (source.archetype === candidate.archetype) {
    score += 5;
  }

  if (source.negotiationStage === candidate.negotiationStage) {
    score += 3;
  }

  if (source.priority === candidate.priority) {
    score += 1;
  }

  if (
    source.archetype === 'pricing_objection' &&
    candidate.archetype === 'price_comparison'
  ) {
    score += 2;
  }

  if (
    source.archetype === 'price_comparison' &&
    candidate.archetype === 'pricing_objection'
  ) {
    score += 2;
  }

  if (
    source.archetype === 'scope_control' &&
    candidate.archetype === 'contract_terms'
  ) {
    score += 1;
  }

  if (
    source.archetype === 'follow_up' &&
    candidate.archetype === 'expectation_management'
  ) {
    score += 1;
  }

  return score;
}
