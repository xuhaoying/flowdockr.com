export type StrategyPath = {
  id: string;
  title: string;
  whenToUse: string;
  keyPoints: string[];
};

export type ExampleReplies = {
  concise: string;
  warm: string;
  firm: string;
};

export type ScenarioFaqItem = {
  question: string;
  answer: string;
};

export type ScenarioNextDecisionLink = {
  href: string;
  label: string;
};

export type ScenarioToolCta = {
  title: string;
  body: string;
  buttonLabel: string;
  toolSlug: string;
};

export type ScenarioPageData = {
  slug: string;
  cluster: 'pricing' | 'scope' | 'payment' | 'proposal' | 'red-flags' | 'recovery';
  tier: 1 | 2 | 3;
  pageRole: 'pillar' | 'support' | 'entry' | 'bridge';
  intentType:
    | 'price_objection'
    | 'discount_pressure'
    | 'budget_mismatch'
    | 'competitor_comparison'
    | 'scope_for_price'
    | 'free_work_boundary';
  primaryIntent: string;
  primaryKeywords: string[];
  supportKeywords: string[];
  doNotCompeteWith: string[];
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  situationSummary: string;
  coreFear: string[];
  strategyPaths: StrategyPath[];
  exampleReplies: ExampleReplies;
  faq: ScenarioFaqItem[];
  nextDecisionLinks: ScenarioNextDecisionLink[];
  toolCta: ScenarioToolCta;
  hubParent: string;
  futureBridgeTo: string[];
  notes: string;
};
