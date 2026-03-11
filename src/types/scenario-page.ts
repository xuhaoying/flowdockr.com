export type ScenarioRelatedLink = {
  slug: string;
  title: string;
};

export type ScenarioToolPreset = {
  scenarioSlug: string;
  title: string;
  description: string;
  ctaLabel: string;
  inputPlaceholder: string;
};

export type ScenarioPageCta = {
  title: string;
  description: string;
  buttonLabel: string;
};

export type ScenarioPageData = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalPath: string;
  h1: string;
  subtitle: string;
  overview: string[];
  difficultyPoints: string[];
  commonMistakes: string[];
  mistakesClosingLine: string;
  toolPreset: ScenarioToolPreset;
  relatedScenarios: ScenarioRelatedLink[];
  cta: ScenarioPageCta;
};
