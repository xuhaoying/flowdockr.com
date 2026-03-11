export type ScenarioHubScenarioLink = {
  slug: string;
  title: string;
  description?: string;
};

export type ScenarioHubCluster = {
  id: string;
  title: string;
  description: string;
  scenarios: ScenarioHubScenarioLink[];
};

export type ScenarioHubHandleCard = {
  id: string;
  title: string;
  description: string;
};

export type ScenarioHubHero = {
  title: string;
  subtitle: string;
  supportingText: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type ScenarioHubWhy = {
  title: string;
  paragraphs: string[];
};

export type ScenarioHubCta = {
  title: string;
  description: string;
  buttonLabel: string;
};

export type ScenarioHubData = {
  seoTitle: string;
  metaDescription: string;
  canonicalPath: string;
  hero: ScenarioHubHero;
  handleCards: ScenarioHubHandleCard[];
  clusters: ScenarioHubCluster[];
  popularScenarios: ScenarioHubScenarioLink[];
  why: ScenarioHubWhy;
  cta: ScenarioHubCta;
};
