import type { BillingSupportLevel, FeatureEntitlements } from '@/types/billing';
import type {
  PricingScenarioAttribution,
  PricingScenarioAttributionSeedInput,
} from '@/types/pricing-analytics';

export type GenerateReplyRequest = {
  scenarioSlug: string;
  message: string;
  sourcePage?: 'home' | 'scenario' | 'tool';
  pricingAttribution?: PricingScenarioAttributionSeedInput;
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

export type GenerationFeedbackType =
  | 'sent_as_is'
  | 'edited_before_send'
  | 'not_useful'
  | 'regenerated';

export type GenerationFeedbackReason =
  | 'too_generic'
  | 'too_soft'
  | 'too_aggressive'
  | 'missed_context'
  | 'not_my_style';

export type GenerationFeedbackEvent = {
  type: GenerationFeedbackType;
  reason?: GenerationFeedbackReason;
  createdAt: string;
  source: 'result_card';
};

export type GenerationCaseMemoryRecord = {
  scenarioSlug: string;
  serviceType: string;
  clientMessage: string;
  generatedReply: string;
  feedbackScore?: number | null;
  feedbackType?: GenerationFeedbackType | null;
  outcomeLabel?: string | null;
  tags: string[];
  createdAt: string;
};

export type GenerationLogRecord = {
  pipelineVersion: 'reply-v2';
  provider: string;
  model: string;
  schemaValid: boolean;
  fallbackUsed: boolean;
  fallbackReason?: string;
  rubricPassed: boolean;
  rubricFailReasons: string[];
  rubricWarningReasons: string[];
  schemaRetryCount: number;
  rubricRetryCount: number;
  scenarioSlug: string;
  serviceType: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  entitlementTier?: BillingSupportLevel;
  strategyCardSource: 'top10' | 'compat';
  calibrationExampleCount: number;
  usedServiceAdjustment: boolean;
  pricingAttribution?: PricingScenarioAttribution | null;
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
  generationId?: string;
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
