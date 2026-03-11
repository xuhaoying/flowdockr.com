import type { BillingSupportLevel, FeatureEntitlements } from '@/types/billing';

export type GenerateReplyRequest = {
  scenarioSlug: string;
  message: string;
  sourcePage?: 'home' | 'scenario' | 'tool';
  serviceType?:
    | 'designer'
    | 'developer'
    | 'copywriter'
    | 'marketer'
    | 'video_editor'
    | 'consultant'
    | 'other';
  tone?: 'professional_firm' | 'warm_confident' | 'direct' | 'diplomatic';
  goal?:
    | 'protect_price'
    | 'keep_relationship'
    | 'close_faster'
    | 'offer_scope_reduction';
  userRateContext?: string;
};

export type StrategyBlock = {
  objective: string;
  whyItWorks: string[];
  whatToAvoid: string[];
  negotiationFraming?: string;
};

export type StrategySection = {
  title: string;
  bullets: string[];
};

export type PresentableStrategyBlock = {
  title: string;
  sections: StrategySection[];
};

export type ReplyVersionTone = 'suggested' | 'professional' | 'firm' | 'softer';

export type ReplyVersion = {
  key: ReplyVersionTone;
  label: string;
  text: string;
};

export type FollowUpSuggestion = {
  reply: string;
  direction: string;
};

export type GenerateReplyResult = {
  reply: string;
  alternativeReply: string;
  strategy: string[];
  strategyBlock: StrategyBlock;
  replyVersions: ReplyVersion[];
  riskInsights: string[];
  followUpSuggestion?: FollowUpSuggestion;
};

export type GenerateReplyResponse = {
  success: boolean;
  reply: string;
  alternativeReply: string;
  strategy: string[];
  strategyBlock?: PresentableStrategyBlock;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion;
  explanation?: string;
  riskAlert?: string;
  confidence?: 'high' | 'medium' | 'low';
  scenarioSlug: string;
  creditsRemaining?: number;
  requiresUpgrade?: boolean;
  supportLevel?: BillingSupportLevel;
  entitlements?: FeatureEntitlements;
  error?: string;
};

export type GenerateReplyInput = GenerateReplyRequest & {
  // kept for backward compatibility
};

export type GeneratedReplyResult = {
  recommendedReply: string;
  strategy: string[];
  alternativeReply: string;
  strategyBlock: StrategyBlock;
  replyVersions: ReplyVersion[];
  riskInsights: string[];
  followUpSuggestion?: FollowUpSuggestion;
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
};
