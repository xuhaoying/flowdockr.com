export type GenerateReplyInput = {
  scenarioSlug: string;
  clientMessage: string;
  serviceType:
    | 'designer'
    | 'developer'
    | 'copywriter'
    | 'marketer'
    | 'video_editor'
    | 'consultant'
    | 'other';
  tone: 'professional_firm' | 'warm_confident' | 'direct' | 'diplomatic';
  goal:
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
