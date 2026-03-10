import { z } from 'zod';

export const clusterSlugValues = [
  'pricing',
  'scope',
  'payment',
  'proposal',
  'client-red-flags',
  'recovery',
] as const;

export const pageRoleValues = ['pillar', 'support', 'entry', 'bridge'] as const;

export const scenarioIntentTypeValues = [
  'price_objection',
  'discount_pressure',
  'budget_mismatch',
  'competitor_comparison',
  'scope_for_price',
  'free_work_boundary',
] as const;

export type ClusterSlug = (typeof clusterSlugValues)[number];
export type PageRole = (typeof pageRoleValues)[number];
export type ScenarioIntentType = (typeof scenarioIntentTypeValues)[number];

export type FAQItem = {
  question: string;
  answer: string;
};

export type NextDecisionLink = {
  href: string;
  label: string;
};

export type ToolCTA = {
  title: string;
  body: string;
  buttonLabel: string;
  toolSlug: string;
};

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

export type ScenarioPageData = {
  slug: string;
  cluster: ClusterSlug;
  tier: 1 | 2 | 3;
  pageRole: PageRole;
  intentType: ScenarioIntentType;
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
  faq: FAQItem[];
  nextDecisionLinks: NextDecisionLink[];
  toolCta: ToolCTA;
  hubParent: string;
  futureBridgeTo: string[];
  notes: string;
};

export type DecisionBucket = {
  title: string;
  description: string;
  href: string;
};

export type HubPageData = {
  slug: string;
  pageType: 'hub';
  cluster: ClusterSlug;
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  intro: string;
  decisionBuckets: DecisionBucket[];
  keyPrinciples: string[];
  featuredScenarios: string[];
  relatedGuides: string[];
  relatedTools: string[];
  notes: string;
};

export type GuideSection = {
  id: string;
  title: string;
  summary: string;
  points: string[];
};

export type GuidePageData = {
  slug: string;
  pageType: 'guide';
  cluster: ClusterSlug;
  tier: 1 | 2 | 3;
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  primaryIntent: string;
  primaryKeywords: string[];
  supportKeywords: string[];
  doNotCompeteWith: string[];
  intro: string;
  coreTakeaways: string[];
  sections: GuideSection[];
  recommendedScenarios: NextDecisionLink[];
  toolCta: ToolCTA;
  faq: FAQItem[];
  notes: string;
};

export type ToolInputField = {
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type ToolPageData = {
  slug: string;
  pageType: 'tool';
  cluster: ClusterSlug;
  url: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  heroSubheading: string;
  primaryIntent: string;
  primaryKeywords: string[];
  supportKeywords: string[];
  intro: string;
  bestFor: string[];
  inputs: ToolInputField[];
  exampleUseCases: string[];
  relatedScenarios: NextDecisionLink[];
  notes: string;
};

export const strategyPathSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  whenToUse: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
});

export const exampleRepliesSchema = z.object({
  concise: z.string().min(1),
  warm: z.string().min(1),
  firm: z.string().min(1),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const nextDecisionLinkSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const toolCtaSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  buttonLabel: z.string().min(1),
  toolSlug: z.string().min(1),
});

export const scenarioPageDataSchema = z.object({
  slug: z.string().min(1),
  cluster: z.enum(clusterSlugValues),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  pageRole: z.enum(pageRoleValues),
  intentType: z.enum(scenarioIntentTypeValues),
  primaryIntent: z.string().min(1),
  primaryKeywords: z.array(z.string().min(1)).min(1),
  supportKeywords: z.array(z.string().min(1)),
  doNotCompeteWith: z.array(z.string().min(1)),
  url: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroSubheading: z.string().min(1),
  situationSummary: z.string().min(1),
  coreFear: z.array(z.string().min(1)).min(1),
  strategyPaths: z.array(strategyPathSchema).length(3),
  exampleReplies: exampleRepliesSchema,
  faq: z.array(faqItemSchema).min(1),
  nextDecisionLinks: z.array(nextDecisionLinkSchema).min(3),
  toolCta: toolCtaSchema,
  hubParent: z.string().min(1),
  futureBridgeTo: z.array(z.string().min(1)),
  notes: z.string(),
});

export const scenarioPageDataListSchema = z.array(scenarioPageDataSchema).min(1);

export const decisionBucketSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
});

export const hubPageDataSchema = z.object({
  slug: z.string().min(1),
  pageType: z.literal('hub'),
  cluster: z.enum(clusterSlugValues),
  url: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroSubheading: z.string().min(1),
  intro: z.string().min(1),
  decisionBuckets: z.array(decisionBucketSchema).min(1),
  keyPrinciples: z.array(z.string().min(1)).min(1),
  featuredScenarios: z.array(z.string().min(1)).min(1),
  relatedGuides: z.array(z.string().min(1)),
  relatedTools: z.array(z.string().min(1)),
  notes: z.string(),
});

export const guideSectionSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  points: z.array(z.string().min(1)).min(1),
});

export const guidePageDataSchema = z.object({
  slug: z.string().min(1),
  pageType: z.literal('guide'),
  cluster: z.enum(clusterSlugValues),
  tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  url: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroSubheading: z.string().min(1),
  primaryIntent: z.string().min(1),
  primaryKeywords: z.array(z.string().min(1)).min(1),
  supportKeywords: z.array(z.string().min(1)),
  doNotCompeteWith: z.array(z.string().min(1)),
  intro: z.string().min(1),
  coreTakeaways: z.array(z.string().min(1)).min(1),
  sections: z.array(guideSectionSchema).min(1),
  recommendedScenarios: z.array(nextDecisionLinkSchema).min(1),
  toolCta: toolCtaSchema,
  faq: z.array(faqItemSchema).min(1),
  notes: z.string(),
});

export const guidePageDataListSchema = z.array(guidePageDataSchema).min(1);

export const toolInputFieldSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  placeholder: z.string().min(1),
  required: z.boolean(),
});

export const toolPageDataSchema = z.object({
  slug: z.string().min(1),
  pageType: z.literal('tool'),
  cluster: z.enum(clusterSlugValues),
  url: z.string().min(1),
  h1: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  heroSubheading: z.string().min(1),
  primaryIntent: z.string().min(1),
  primaryKeywords: z.array(z.string().min(1)).min(1),
  supportKeywords: z.array(z.string().min(1)),
  intro: z.string().min(1),
  bestFor: z.array(z.string().min(1)).min(1),
  inputs: z.array(toolInputFieldSchema).min(1),
  exampleUseCases: z.array(z.string().min(1)).min(1),
  relatedScenarios: z.array(nextDecisionLinkSchema).min(1),
  notes: z.string(),
});

export const toolPageDataListSchema = z.array(toolPageDataSchema).min(1);
