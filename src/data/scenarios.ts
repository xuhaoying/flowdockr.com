import {
  getRelatedScenarioLinks,
  getScenarioMetaDescription,
} from '@/content/scenario-pages';
import { canonicalScenarioSeeds } from '@/content/scenario-pages/scenario-seeds';
import type {
  Scenario,
  ScenarioCategory,
  ScenarioRiskLevel,
  ScenarioToneProfile,
} from '@/types/scenario';
import type { CanonicalScenario } from '@/types/scenario-catalog';

const categoryByArchetype: Record<
  CanonicalScenario['archetype'],
  ScenarioCategory
> = {
  pricing_objection: 'pricing',
  price_comparison: 'negotiation',
  pricing_probe: 'pricing',
  scope_control: 'negotiation',
  payment_protection: 'difficult-clients',
  expectation_management: 'negotiation',
  follow_up: 'negotiation',
  contract_terms: 'difficult-clients',
};

const riskByArchetype: Record<
  CanonicalScenario['archetype'],
  ScenarioRiskLevel
> = {
  pricing_objection: 'medium',
  price_comparison: 'high',
  pricing_probe: 'low',
  scope_control: 'medium',
  payment_protection: 'high',
  expectation_management: 'medium',
  follow_up: 'low',
  contract_terms: 'high',
};

const toneByArchetype: Record<
  CanonicalScenario['archetype'],
  ScenarioToneProfile
> = {
  pricing_objection: 'warm-firm',
  price_comparison: 'calm',
  pricing_probe: 'calm',
  scope_control: 'firm',
  payment_protection: 'decision-oriented',
  expectation_management: 'calm',
  follow_up: 'decision-oriented',
  contract_terms: 'firm',
};

export const scenarios: Scenario[] = canonicalScenarioSeeds.map((page) =>
  buildGeneratorScenario(page)
);

export const scenarioOptions = scenarios.map((scenario) => ({
  value: scenario.slug,
  label: scenario.title,
})) as ReadonlyArray<{ value: string; label: string }>;

export type ScenarioSlug = string;

const scenarioMap = new Map<string, Scenario>(
  scenarios.map((scenario) => [scenario.slug, scenario])
);

export function isScenarioSlug(value: string): value is ScenarioSlug {
  return scenarioMap.has(value);
}

export function getScenarioBySlug(slug: string): Scenario | null {
  return scenarioMap.get(slug) || null;
}

export function getRelatedScenarios(slug: string): Scenario[] {
  const scenario = getScenarioBySlug(slug);
  if (!scenario) {
    return [];
  }

  return scenario.relatedSlugs
    .map((relatedSlug) => scenarioMap.get(relatedSlug))
    .filter((item): item is Scenario => Boolean(item));
}

function buildGeneratorScenario(page: CanonicalScenario): Scenario {
  const preferredMoves = [page.strategyPrimary];
  if (page.strategySecondary) {
    preferredMoves.push(page.strategySecondary);
  }
  preferredMoves.push(getFallbackMove(page));

  const avoid = getAvoidList(page);
  const relatedSlugs = getRelatedScenarioLinks(page.slug).map(
    (item) => item.slug
  );

  return {
    slug: page.slug,
    category: categoryByArchetype[page.archetype],
    title: page.title,
    seoTitle: `${page.title} | Flowdockr`,
    metaDescription: getScenarioMetaDescription(page),
    h1: page.title,
    heroIntro: `${page.userSituation} ${page.strategyPrimary}`,
    shortDescription: page.userSituation,
    problemText: [
      page.userSituation,
      `Typical client wording includes: ${page.clientMessageVariants.join(' / ')}`,
      page.strategySecondary || page.strategyPrimary,
    ],
    exampleClientMessage: page.primaryClientMessage,
    exampleReply: buildExampleReply(page),
    exampleAltReply: buildAlternativeReply(page),
    strategyBullets: preferredMoves,
    faq: buildFaq(page, avoid),
    relatedSlugs,
    promptContext: buildPromptContext(page),
    riskLevel: riskByArchetype[page.archetype],
    primaryGoal: page.strategyPrimary,
    avoid,
    preferredMoves,
    toneProfile: toneByArchetype[page.archetype],
    placeholder: `Paste the exact client message for "${page.title}"...`,
  };
}

function buildPromptContext(page: CanonicalScenario): string {
  const parts = [
    `Scenario: ${page.title}.`,
    page.userSituation,
    `Primary client message: "${page.primaryClientMessage}".`,
    `Primary strategy: ${page.strategyPrimary}.`,
  ];

  if (page.strategySecondary) {
    parts.push(`Secondary strategy: ${page.strategySecondary}.`);
  }

  parts.push(`Prompt intent: ${page.toolPromptIntent}`);

  return parts.join(' ');
}

function buildExampleReply(page: CanonicalScenario): string {
  switch (page.archetype) {
    case 'pricing_objection':
      return "Thanks for sharing that. My pricing reflects the scope and standard needed for the result you're asking for. If budget is the real constraint, I can suggest a leaner version rather than cut the same scope arbitrarily.";
    case 'price_comparison':
      return "I understand comparing options. Pricing differences usually come down to scope, process, and reliability, so I'd rather help you compare what is actually included than try to match a lower number blindly.";
    case 'pricing_probe':
      return "Happy to give pricing context. Before I lock in a number, I'd want to confirm the scope, timeline, and what success looks like so the quote is actually useful.";
    case 'scope_control':
      return 'I can help with that. Since it changes the scope from what we originally discussed, the cleanest next step is to decide whether we keep the current scope, swap priorities, or update the budget for the added work.';
    case 'payment_protection':
      return 'I can move quickly once the kickoff step is complete. To keep the project protected on both sides, I start work after the agreed payment and start terms are in place.';
    case 'follow_up':
      return "Just checking in on this in case it is still active on your side. If it would help, I'm happy to answer any open questions or outline the cleanest next step.";
    case 'contract_terms':
      return 'That kind of commitment changes the structure of the engagement, so I would want to frame it with clear terms rather than treat it as part of the standard rate by default.';
    case 'expectation_management':
      return 'I can commit to the process, communication, and the work needed on my side, but I would not promise an outcome that depends on variables outside my control. If helpful, I can outline milestones and what I can confidently own.';
  }
}

function buildAlternativeReply(page: CanonicalScenario): string {
  switch (page.archetype) {
    case 'pricing_objection':
      return "I understand the concern. Rather than discount the original scope without context, I'd suggest we look at priorities and see whether a smaller first phase makes more sense.";
    case 'price_comparison':
      return "Lower rates can make sense for a different scope or delivery model. If budget is the main issue, I can suggest a narrower option so you're comparing like for like.";
    case 'pricing_probe':
      return 'I can share a starting range, but I would want to tie it to a few assumptions first so the number does not mislead either of us.';
    case 'scope_control':
      return "That request makes sense, but it does sit outside the current agreement. I'm happy to map out the options so you can choose between keeping the current plan or expanding it with updated terms.";
    case 'payment_protection':
      return 'I can reserve space for the project right away, and work can begin as soon as the payment and kickoff details are confirmed.';
    case 'follow_up':
      return 'Wanted to circle back in case this is still under review. If timing changed on your side, no problem. If it is still live, I can help you decide on the next step.';
    case 'contract_terms':
      return 'Exclusivity only works when the pricing and limits reflect that level of commitment. If that is not the direction, we can keep the agreement non-exclusive and scope it normally.';
    case 'expectation_management':
      return 'The best way I handle that is by setting clear milestones and what I will be accountable for, rather than promising a result no one can fully control.';
  }
}

function buildFaq(page: CanonicalScenario, avoid: string[]): Scenario['faq'] {
  return [
    {
      q: `What should I focus on first in "${page.title}"?`,
      a: page.strategyPrimary,
    },
    {
      q: 'What should I avoid in this situation?',
      a: avoid.join(' '),
    },
  ];
}

function getAvoidList(page: CanonicalScenario): string[] {
  switch (page.archetype) {
    case 'pricing_objection':
      return [
        'Do not discount the same scope too quickly.',
        'Do not over-explain the quote defensively.',
        'Do not let the client treat price as arbitrary.',
      ];
    case 'price_comparison':
      return [
        'Do not attack the cheaper option.',
        'Do not race to the bottom on price.',
        "Do not ignore the client's actual decision criteria.",
      ];
    case 'pricing_probe':
      return [
        'Do not lock yourself into a blind quote too early.',
        'Do not answer with a number that lacks assumptions.',
        'Do not dodge the question without offering a process.',
      ];
    case 'scope_control':
      return [
        'Do not absorb extra work without naming it.',
        'Do not let revision or effort assumptions stay vague.',
        'Do not make one-time exceptions sound permanent.',
      ];
    case 'payment_protection':
      return [
        'Do not start billable work without the agreed kickoff terms.',
        'Do not let urgency override payment protection.',
        'Do not rely on verbal promises instead of clear next steps.',
      ];
    case 'follow_up':
      return [
        'Do not send guilt-heavy follow-ups.',
        'Do not chase without a clear decision path.',
        'Do not wait so long that momentum fully disappears.',
      ];
    case 'contract_terms':
      return [
        'Do not accept heavy terms at a standard rate by default.',
        'Do not leave exclusivity or policy details vague.',
        'Do not agree before clarifying limits and opportunity cost.',
      ];
    case 'expectation_management':
      return [
        'Do not promise outcomes you cannot control.',
        'Do not sound evasive about what you can own.',
        'Do not let vague guarantees replace clear process commitments.',
      ];
  }
}

function getFallbackMove(page: CanonicalScenario): string {
  switch (page.negotiationStage) {
    case 'early_inquiry':
      return 'Clarify project scope before you commit to pricing terms.';
    case 'quote_pushback':
      return 'Keep the conversation on value, scope, and next steps rather than reacting emotionally.';
    case 'active_negotiation':
      return 'Turn the pressure into a structured decision instead of a vague concession.';
    case 'post_quote':
      return 'Give the client an easy next step or a graceful way to respond.';
    case 'contract_terms':
      return 'Tie the reply to explicit terms, limits, and accountability.';
    case 'pre_kickoff':
      return 'Protect kickoff conditions before work starts moving.';
    case 'in_project':
      return 'Name the change clearly before it becomes the new baseline.';
  }
}
