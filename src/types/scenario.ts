export type ScenarioRiskLevel = 'low' | 'medium' | 'high';
export type ScenarioToneProfile = 'firm' | 'calm' | 'warm-firm' | 'decision-oriented';
export type ToneProfile = ScenarioToneProfile;

export type ScenarioFaqItem = {
  q: string;
  a: string;
};

export type Scenario = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  shortDescription: string;
  problemText: string[];
  exampleClientMessage: string;
  exampleReply: string;
  exampleAltReply: string;
  strategyBullets: string[];
  faq: ScenarioFaqItem[];
  relatedSlugs: string[];
  promptContext: string;
  riskLevel: ScenarioRiskLevel;
  primaryGoal: string;
  avoid: string[];
  preferredMoves: string[];
  toneProfile: ScenarioToneProfile;
  placeholder?: string;
};

// Legacy type kept to avoid breaking older scenario content files.
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
