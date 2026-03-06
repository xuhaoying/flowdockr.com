export type ScenarioRiskLevel = 'low' | 'medium' | 'high';

export type ScenarioContent = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  problemSummary: string;
  bullets: string[];
  examples: {
    title: string;
    reply: string;
  }[];
  mistakes: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  relatedSlugs: string[];
  promptContext: {
    scenarioType: string;
    negotiationGoal: string;
    riskLevel: ScenarioRiskLevel;
    defaultTone: string;
  };
};
