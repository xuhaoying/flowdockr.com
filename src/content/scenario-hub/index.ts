import {
  getPopularScenarioPages,
  getScenarioPageBySlug,
  scenarioPages,
} from '@/content/scenario-pages';
import type {
  ScenarioHubCluster,
  ScenarioHubData,
  ScenarioHubScenarioLink,
} from '@/types/scenario-hub';

function summarize(text: string, maxLength = 110): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3).trimEnd()}...`;
}

function scenario(slug: string, description?: string): ScenarioHubScenarioLink {
  const page = getScenarioPageBySlug(slug);

  if (!page) {
    throw new Error(`Scenario hub references missing scenario page: ${slug}`);
  }

  return {
    slug,
    title: page.title,
    description: description || summarize(page.userSituation),
  };
}

function cluster(
  id: string,
  title: string,
  description: string,
  slugs: string[]
): ScenarioHubCluster {
  return {
    id,
    title,
    description,
    scenarios: slugs.map((slug) => scenario(slug)),
  };
}

const clusters: ScenarioHubCluster[] = [
  cluster(
    'pricing-objection',
    'Pricing objection',
    'When the client reacts to your quote with direct budget or value pushback.',
    scenarioPages
      .filter((page) => page.archetype === 'pricing_objection')
      .map((page) => page.slug)
  ),
  cluster(
    'price-comparison',
    'Price comparison',
    'When the client brings up cheaper options or tries to force a rate match.',
    scenarioPages
      .filter((page) => page.archetype === 'price_comparison')
      .map((page) => page.slug)
  ),
  cluster(
    'pricing-probe',
    'Early pricing probe',
    'When the client wants numbers before the project is scoped well enough to quote cleanly.',
    scenarioPages
      .filter((page) => page.archetype === 'pricing_probe')
      .map((page) => page.slug)
  ),
  cluster(
    'scope-control',
    'Scope and revision control',
    'When the work, revision policy, or effort assumptions start to drift.',
    scenarioPages
      .filter((page) => page.archetype === 'scope_control')
      .map((page) => page.slug)
  ),
  cluster(
    'deal-protection',
    'Payment and contract protection',
    'When the client wants a stronger commitment than the current payment or contract terms support.',
    scenarioPages
      .filter(
        (page) =>
          page.archetype === 'payment_protection' ||
          page.archetype === 'contract_terms'
      )
      .map((page) => page.slug)
  ),
  cluster(
    'momentum-and-expectations',
    'Momentum and expectation management',
    'When the deal stalls after pricing or the client asks for promises you should not make.',
    scenarioPages
      .filter(
        (page) =>
          page.archetype === 'follow_up' ||
          page.archetype === 'expectation_management'
      )
      .map((page) => page.slug)
  ),
];

export const scenarioHubData: ScenarioHubData = {
  seoTitle: 'Freelance Client Negotiation Scenarios | Flowdockr',
  metaDescription:
    'Browse real freelance client negotiation scenarios across pricing, scope, payment, contract, and follow-up pressure.',
  canonicalPath: '/scenario',
  hero: {
    title: 'Freelance client negotiation scenarios',
    subtitle: `Browse ${scenarioPages.length} canonical client situations built from raw freelancer negotiation patterns, not generic template categories.`,
    supportingText:
      'Use the situation title, typical client wording, and embedded reply tool to move from recognition to action fast.',
    primaryCtaLabel: 'Browse scenarios',
    secondaryCtaLabel: 'Try a scenario',
  },
  handleCards: [
    {
      id: 'pricing-pushback',
      title: 'Pricing pushback',
      description:
        'Quote-too-high, higher-than-expected, budget-limited, and discount conversations.',
    },
    {
      id: 'rate-probes',
      title: 'Rate probes',
      description:
        'Rate-first, hourly, day-rate, range, and immediate-quote questions before scope is clear.',
    },
    {
      id: 'scope-boundaries',
      title: 'Scope boundaries',
      description:
        'Reduced scope, extra work, unlimited revisions, and the project-should-be-easy pattern.',
    },
    {
      id: 'deal-protection',
      title: 'Deal protection',
      description:
        'Start-now pressure, exclusivity terms, ghosting after rate, and guarantee requests.',
    },
  ],
  clusters,
  popularScenarios: getPopularScenarioPages(4).map((page) => ({
    slug: page.slug,
    title: page.title,
    description: summarize(page.userSituation),
  })),
  why: {
    title: 'Why scenario-based guidance works',
    paragraphs: [
      'Freelance client negotiation problems are specific, not abstract.',
      'A cheaper-freelancer comparison, a rate probe, and a start-before-payment request need different judgment.',
      'Flowdockr starts from the actual situation so the reply path is easier to trust and reuse.',
    ],
  },
  cta: {
    title: 'Try your own client situation',
    description:
      'Open any scenario, paste the exact client message, and generate a reply built for that negotiation pressure.',
    buttonLabel: 'Start with a scenario',
  },
};
