import { ScenarioContent } from '@/types/scenario';

export const lowballOfferScenario: ScenarioContent = {
  slug: 'how-to-respond-to-a-lowball-offer',
  seoTitle: 'How to Respond to a Lowball Offer From a Client',
  seoDescription:
    'Use this free tool to generate a professional response when a client offers too little for your freelance work.',
  h1: 'How to respond to a lowball offer from a client',
  intro:
    'When a client offers far below your normal rate, the goal is not just to reject it. Protect your positioning while keeping the relationship workable.',
  problemSummary:
    'Lowball offers pressure freelancers into fast concessions. A stronger reply re-anchors value, clarifies scope, and proposes practical alternatives.',
  bullets: [
    'Acknowledge the offer without sounding defensive',
    'Re-anchor price based on scope and outcomes',
    'Offer scope adjustments before discounting',
  ],
  examples: [
    {
      title: 'Firm but polite',
      reply:
        'Thanks for sharing the budget. For this scope, my normal range is $X-$Y. If budget is fixed, I can propose a reduced scope that still delivers the core outcome.',
    },
    {
      title: 'Relationship-preserving',
      reply:
        'I appreciate the offer. To keep quality and timeline where they need to be, I would keep the current rate. If helpful, I can send two leaner scope options that fit a lower budget.',
    },
    {
      title: 'Direct and concise',
      reply:
        'At that budget, I cannot take on the full scope responsibly. I can either keep the current scope at my standard rate or reshape deliverables to match your budget.',
    },
  ],
  mistakes: [
    'Apologizing for your price',
    'Lowering your rate too quickly',
    'Writing a defensive or emotional response',
  ],
  faq: [
    {
      question: 'Should I say no immediately to a lowball offer?',
      answer:
        'Not always. A better first move is to restate your rate and offer a scoped-down option before ending the conversation.',
    },
    {
      question: 'Should I include exact numbers in the first reply?',
      answer:
        'If your pricing context is clear, yes. If not, use a range or placeholder and focus on value plus scope tradeoffs.',
    },
    {
      question: 'How do I stay firm without sounding rude?',
      answer:
        'Use calm language, avoid blame, and offer clear next options the client can choose from.',
    },
  ],
  relatedSlugs: [
    'client-asks-for-a-discount',
    'client-says-another-freelancer-is-cheaper',
    'client-says-budget-is-limited',
  ],
  promptContext: {
    scenarioType: 'lowball_offer',
    negotiationGoal: 'protect_price_and_keep_relationship',
    riskLevel: 'medium',
    defaultTone: 'professional_firm',
  },
};
