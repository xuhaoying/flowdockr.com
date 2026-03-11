import { getScenarioPageBySlug } from '@/content/scenario-pages';
import type {
  ScenarioHubCluster,
  ScenarioHubData,
  ScenarioHubScenarioLink,
} from '@/types/scenario-hub';

function scenario(
  slug: string,
  description?: string
): ScenarioHubScenarioLink {
  const page = getScenarioPageBySlug(slug);

  if (!page) {
    throw new Error(`Scenario hub references missing scenario page: ${slug}`);
  }

  return {
    slug,
    title: page.h1,
    description,
  };
}

const clusters: ScenarioHubCluster[] = [
  {
    id: 'pricing-negotiation',
    title: 'Pricing negotiation',
    description:
      'Common situations where clients push on price, compare options, or ask for concessions.',
    scenarios: [
      scenario(
        'rate-too-high',
        'When a client says your rate is too high and you need to protect both price and trust.'
      ),
      scenario(
        'discount-request',
        'When a client asks for a discount and you need to respond without training price pressure.'
      ),
      scenario(
        'price-too-expensive',
        'When a pricing objection is vague but still puts your quote under pressure.'
      ),
      scenario(
        'cheaper-freelancer',
        'When a client compares you with a cheaper option and expects a concession.'
      ),
    ],
  },
  {
    id: 'scope-and-revisions',
    title: 'Scope and revisions',
    description:
      'Scenarios where extra requests start to blur the original project scope.',
    scenarios: [
      scenario(
        'extra-revisions',
        'When more revision rounds start to stretch beyond what was originally agreed.'
      ),
      scenario(
        'scope-creep',
        'When new requests begin to reshape the project after the scope was set.'
      ),
      scenario(
        'additional-features',
        'When a client asks for one more feature after the agreement already feels settled.'
      ),
      scenario(
        'more-work',
        'When repeated small asks turn into a larger boundary problem over time.'
      ),
    ],
  },
  {
    id: 'payment-and-deadlines',
    title: 'Payment and deadlines',
    description:
      'Situations involving payment delays, overdue invoices, and time-pressure requests.',
    scenarios: [
      scenario(
        'late-payment',
        'When payment is late and you need to follow up clearly without sounding reactive.'
      ),
      scenario(
        'invoice-follow-up',
        'When an overdue invoice needs a more explicit reminder and next step.'
      ),
      scenario(
        'rush-delivery',
        'When a client needs the work sooner and urgency starts to change the terms.'
      ),
      scenario(
        'faster-turnaround',
        'When a tighter deadline creates pressure on pricing, scope, or schedule.'
      ),
    ],
  },
];

export const scenarioHubData: ScenarioHubData = {
  seoTitle: 'Freelance Client Negotiation Scenarios | Flowdockr',
  metaDescription:
    'Browse freelance client negotiation scenarios for pricing, scope, payment, and deadline issues and get structured guidance with Flowdockr.',
  canonicalPath: '/scenario',
  hero: {
    title: 'Freelance client negotiation scenarios',
    subtitle:
      'Explore common client situations around pricing, scope, payment, and deadlines — and see how Flowdockr helps you respond.',
    supportingText:
      'Find the scenario that matches your client conversation and get structured negotiation guidance.',
    primaryCtaLabel: 'Browse scenarios',
    secondaryCtaLabel: 'Try a scenario',
  },
  handleCards: [
    {
      id: 'pricing-pressure',
      title: 'Pricing pressure',
      description:
        'When clients say your rate is too high or ask for a discount.',
    },
    {
      id: 'scope-creep',
      title: 'Scope creep',
      description:
        'When extra requests start to stretch the original project boundaries.',
    },
    {
      id: 'payment-issues',
      title: 'Payment issues',
      description:
        'When invoices slip past the expected timeline and follow-up gets harder.',
    },
    {
      id: 'timeline-pressure',
      title: 'Timeline pressure',
      description:
        'When urgent delivery requests change the pace, tradeoffs, or pricing logic.',
    },
  ],
  clusters,
  popularScenarios: [
    scenario(
      'rate-too-high',
      'A classic price objection where the reply can either reinforce value or weaken your position.'
    ),
    scenario(
      'discount-request',
      'A common ask that tests whether your pricing boundaries hold under pressure.'
    ),
    scenario(
      'scope-creep',
      'A project-boundary situation where extra work starts to blur the original agreement.'
    ),
    scenario(
      'late-payment',
      'A payment follow-up moment where the right tone still needs clear urgency.'
    ),
  ],
  why: {
    title: 'Why scenario-based guidance works',
    paragraphs: [
      'Client negotiations are rarely generic.',
      'A pricing objection, a scope change, and a late payment follow-up all require different judgment.',
      'Flowdockr helps you start from the specific situation instead of a blank prompt.',
    ],
  },
  cta: {
    title: 'Try your own client situation',
    description:
      'Start with one scenario and see how Flowdockr suggests responding.',
    buttonLabel: 'Start with a scenario',
  },
};
