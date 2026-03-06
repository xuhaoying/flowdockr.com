import { ScenarioContent } from '@/types/scenario';

export const asksForFreeSampleScenario: ScenarioContent = {
  slug: 'client-asks-for-free-sample-work',
  seoTitle: 'Client Asks for Free Sample Work: Professional Response',
  seoDescription:
    'Create a polite but firm reply when a client asks for unpaid sample work. Protect boundaries and propose safer alternatives.',
  h1: 'Client asks for free sample work',
  intro:
    'Unpaid sample requests can look harmless but often expand into unpaid production. You need a response that protects boundaries without burning trust.',
  problemSummary:
    'Free samples shift risk to freelancers. Stronger replies offer alternatives like paid discovery, portfolio proof, or a micro-scoped paid test.',
  bullets: [
    'Acknowledge the need to reduce hiring risk',
    'Set a clear no-unpaid-production boundary',
    'Offer practical alternatives that keep momentum',
  ],
  examples: [
    {
      title: 'Boundary with alternatives',
      reply:
        'I understand you want to validate fit first. I do not take unpaid production samples, but I can offer a small paid trial scope or walk through relevant case studies.',
    },
    {
      title: 'Portfolio-first framing',
      reply:
        'Totally fair to evaluate quality before committing. Instead of unpaid sample work, I can share closely related examples and propose a paid pilot task.',
    },
    {
      title: 'Direct and respectful',
      reply:
        'I do not provide free execution samples, but I can suggest a low-risk paid starter scope so you can validate delivery quality quickly.',
    },
  ],
  mistakes: [
    'Agreeing to unpaid production work',
    'Saying no in a confrontational tone',
    'Offering vague alternatives without next steps',
  ],
  faq: [
    {
      question: 'Is any free sample ever acceptable?',
      answer:
        'Light unpaid discovery can be fine, but avoid unpaid deliverables that mirror production work.',
    },
    {
      question: 'What alternatives should I offer?',
      answer:
        'Use portfolio proof, short paid pilots, or paid discovery sessions with clear scope.',
    },
    {
      question: 'Will this hurt close rate?',
      answer:
        'Often the opposite. Clear boundaries signal professionalism and reduce future scope conflicts.',
    },
  ],
  relatedSlugs: [
    'client-wants-more-work-for-same-budget',
    'client-asks-for-one-small-thing-for-free',
    'client-says-another-freelancer-is-cheaper',
  ],
  promptContext: {
    scenarioType: 'free_sample_request',
    negotiationGoal: 'protect_boundaries_and_offer_safe_alternatives',
    riskLevel: 'high',
    defaultTone: 'diplomatic',
  },
};
