import { db, generation } from '@/lib/db';
import { getUuid } from '@/shared/lib/hash';

type SaveBase = {
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  modeUsed: 'free' | 'paid';
  message: string;
  serviceType: string;
  tone: string;
  goal: string;
  userRateContext?: string;
  reply: string;
  alternativeReply: string;
  strategy: string[];
  confidence: 'high' | 'medium' | 'low';
  caution?: string;
  ipHash?: string;
  userAgentHash?: string;
};

export async function saveUserGeneration(
  userId: string,
  input: SaveBase & {
    creditsCharged: number;
    isFreeGeneration?: boolean;
  }
) {
  await db().insert(generation).values({
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
    strategyJson: JSON.stringify(input.strategy),
    confidence: input.confidence,
    caution: input.caution || null,
    creditsCharged: input.creditsCharged,
    isFreeGeneration: Boolean(input.isFreeGeneration),
    sourcePage: input.sourcePage,
    modeUsed: input.modeUsed,
    ipHash: input.ipHash,
    userAgentHash: input.userAgentHash,
  });
}

export async function saveAnonymousGeneration(
  anonymousSessionId: string,
  input: SaveBase
) {
  await db().insert(generation).values({
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
    strategyJson: JSON.stringify(input.strategy),
    confidence: input.confidence,
    caution: input.caution || null,
    creditsCharged: 0,
    isFreeGeneration: true,
    sourcePage: input.sourcePage,
    modeUsed: input.modeUsed,
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
  modeUsed: 'free' | 'paid';
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
    reply: params.replyText,
    alternativeReply: params.altReplyText,
    strategy: params.strategy,
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
