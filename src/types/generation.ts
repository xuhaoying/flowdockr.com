export type GenerateReplyRequest = {
  scenarioSlug: string;
  message: string;
  sourcePage?: 'home' | 'scenario' | 'tool';
};

export type GenerateReplyResult = {
  reply: string;
  alternativeReply: string;
  strategy: string[];
};

export type GenerateReplyResponse = {
  success: boolean;
  reply: string;
  alternativeReply: string;
  strategy: string[];
  scenarioSlug: string;
  creditsRemaining?: number;
  requiresUpgrade?: boolean;
  error?: string;
};

// Internal generation input extends public request with optional context knobs.
export type GenerateReplyInput = GenerateReplyRequest & {
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

export type GeneratedReplyResult = {
  recommendedReply: string;
  strategy: string[];
  alternativeReply: string;
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
};
