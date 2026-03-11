import { db, generation } from '@/lib/db';
import type { BillingSupportLevel } from '@/types/billing';
import type {
  FollowUpSuggestion,
  PresentableStrategyBlock,
  ReplyVersion,
} from '@/types/generation';

import { getUuid } from '@/shared/lib/hash';

type SaveBase = {
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  modeUsed: 'free' | 'paid';
  supportLevel: BillingSupportLevel;
  message: string;
  serviceType: string;
  tone: string;
  goal: string;
  userRateContext?: string;
  reply: string;
  alternativeReply: string;
  strategy: string[];
  strategyBlock?: PresentableStrategyBlock;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion;
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
  ipHash?: string;
  userAgentHash?: string;
};

function buildStoredOutput(input: SaveBase) {
  return JSON.stringify({
    strategy: input.strategy,
    strategyBlock: input.strategyBlock || null,
    replyVersions: input.replyVersions || [],
    riskInsights: input.riskInsights || [],
    followUpSuggestion: input.followUpSuggestion || null,
    supportLevel: input.supportLevel,
  });
}

export async function saveUserGeneration(
  userId: string,
  input: SaveBase & {
    creditsCharged: number;
    isFreeGeneration?: boolean;
  }
) {
  await db()
    .insert(generation)
    .values({
      id: getUuid(),
      userId,
      scenarioSlug: input.scenarioSlug,
      clientMessage: input.message,
      serviceType: input.serviceType,
      tone: input.tone,
      goal: input.goal,
      userRateContext: input.userRateContext || null,
      recommendedReply: input.reply,
      alternativeReply: input.alternativeReply,
      strategyJson: buildStoredOutput(input),
      confidence: input.confidence,
      caution: input.caution || null,
      creditsCharged: input.creditsCharged,
      isFreeGeneration: Boolean(input.isFreeGeneration),
      sourcePage: input.sourcePage,
      modeUsed: input.modeUsed,
      supportLevel: input.supportLevel,
      ipHash: input.ipHash,
      userAgentHash: input.userAgentHash,
    });
}

export async function saveAnonymousGeneration(
  anonymousSessionId: string,
  input: SaveBase
) {
  await db()
    .insert(generation)
    .values({
      id: getUuid(),
      anonymousSessionId,
      scenarioSlug: input.scenarioSlug,
      clientMessage: input.message,
      serviceType: input.serviceType,
      tone: input.tone,
      goal: input.goal,
      userRateContext: input.userRateContext || null,
      recommendedReply: input.reply,
      alternativeReply: input.alternativeReply,
      strategyJson: buildStoredOutput(input),
      confidence: input.confidence,
      caution: input.caution || null,
      creditsCharged: 0,
      isFreeGeneration: true,
      sourcePage: input.sourcePage,
      modeUsed: input.modeUsed,
      supportLevel: input.supportLevel,
      ipHash: input.ipHash,
      userAgentHash: input.userAgentHash,
    });
}

export async function saveGeneration(params: {
  userId?: string;
  anonymousId?: string;
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  inputText: string;
  replyText: string;
  altReplyText: string;
  strategy: string[];
  strategyBlock?: PresentableStrategyBlock;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion;
  modeUsed: 'free' | 'paid';
  supportLevel: BillingSupportLevel;
  serviceType?: string;
  tone?: string;
  goal?: string;
  userRateContext?: string;
  confidence?: 'high' | 'medium' | 'low';
  caution?: string;
  ipHash?: string;
  userAgentHash?: string;
}): Promise<void> {
  const base: SaveBase = {
    scenarioSlug: params.scenarioSlug,
    message: params.inputText,
    sourcePage: params.sourcePage,
    modeUsed: params.modeUsed,
    supportLevel: params.supportLevel,
    reply: params.replyText,
    alternativeReply: params.altReplyText,
    strategy: params.strategy,
    strategyBlock: params.strategyBlock,
    replyVersions: params.replyVersions,
    riskInsights: params.riskInsights,
    followUpSuggestion: params.followUpSuggestion,
    serviceType: params.serviceType || 'other',
    tone: params.tone || 'professional_firm',
    goal: params.goal || 'protect_price',
    userRateContext: params.userRateContext,
    confidence: params.confidence || 'medium',
    caution:
      params.caution ||
      `Generated from ${params.sourcePage} page with ${params.modeUsed} usage mode.`,
    ipHash: params.ipHash,
    userAgentHash: params.userAgentHash,
  };

  if (params.userId) {
    await saveUserGeneration(params.userId, {
      ...base,
      creditsCharged: params.modeUsed === 'paid' ? 1 : 0,
      isFreeGeneration: params.modeUsed === 'free',
    });
    return;
  }

  if (!params.anonymousId) {
    throw new Error('IDENTITY_MISSING');
  }

  await saveAnonymousGeneration(params.anonymousId, base);
}
