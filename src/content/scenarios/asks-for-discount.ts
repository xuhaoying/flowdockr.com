import { ScenarioContent } from '@/types/scenario';

export const asksForDiscountScenario: ScenarioContent = {
  slug: 'client-asks-for-a-discount',
  seoTitle: 'Client Asks for a Discount: How Freelancers Should Reply',
  seoDescription:
    'Generate a confident response when a client asks for a discount. Protect your rate and offer smart alternatives.',
  h1: 'Client asks for a discount: how to respond',
  intro:
    'Discount requests are common in freelance deals. Your reply should hold value, stay respectful, and move the client toward a decision.',
  problemSummary:
    'Immediate discounts weaken pricing power. A stronger pattern is to protect core pricing and trade discount only against reduced scope or terms.',
  bullets: [
    'Acknowledge the request professionally',
    'Protect your standard rate positioning',
    'Offer controlled tradeoffs instead of blanket discount',
  ],
  examples: [
    {
      title: 'Scope tradeoff',
      reply:
        'I understand the budget pressure. I typically keep this scope at my standard rate, but I can offer a reduced version that fits your target budget.',
    },
    {
      title: 'Terms-based flexibility',
      reply:
        'I can be flexible when terms change. If we simplify deliverables or adjust timeline, I can propose an option that lands closer to your budget.',
    },
    {
      title: 'Close-friendly version',
      reply:
        'Thanks for asking. I want to make this work. I can keep the current scope at the quoted rate, or send a lighter scope option today for faster approval.',
    },
  ],
  mistakes: [
    'Saying yes before clarifying tradeoffs',
    'Dropping price without changing deliverables',
    'Turning the reply into a long pricing defense',
  ],
  faq: [
    {
      question: 'Should I always refuse discount requests?',
      answer:
        'No. You can offer flexibility, but tie it to scope, timeline, or terms so your margin stays protected.',
    },
    {
      question: 'What is the safest concession pattern?',
      answer:
        'Use conditional concessions: if budget is lower, scope becomes narrower or delivery timeline changes.',
    },
    {
      question: 'How short should the message be?',
      answer:
        'Usually 2-4 sentences is enough: acknowledge, re-anchor value, then offer concrete options.',
    },
  ],
  relatedSlugs: [
    'how-to-respond-to-a-lowball-offer',
    'client-says-budget-is-limited',
    'client-wants-more-work-for-same-budget',
  ],
  promptContext: {
    scenarioType: 'discount_request',
    negotiationGoal: 'protect_price_with_controlled_flexibility',
    riskLevel: 'medium',
    defaultTone: 'warm_confident',
  },
};
