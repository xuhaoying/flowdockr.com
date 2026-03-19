import { db, generation } from '@/lib/db';
import {
  buildCaseMemoryCandidate,
  buildStoredGenerationPayload,
} from '@/lib/generation/storedGeneration';
import type { BillingSupportLevel } from '@/types/billing';
import type {
  FollowUpSuggestion,
  GenerationCaseMemoryRecord,
  GenerationFeedbackEvent,
  GenerationLogRecord,
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
  generationLog?: GenerationLogRecord;
  feedbackEvents?: GenerationFeedbackEvent[];
  caseMemoryCandidate?: GenerationCaseMemoryRecord;
  ipHash?: string;
  userAgentHash?: string;
};

export async function saveUserGeneration(
  userId: string,
  input: SaveBase & {
    id: string;
    creditsCharged: number;
    isFreeGeneration?: boolean;
  }
) {
  await db()
    .insert(generation)
    .values({
      id: input.id,
      userId,
      scenarioSlug: input.scenarioSlug,
      clientMessage: input.message,
      serviceType: input.serviceType,
      tone: input.tone,
      goal: input.goal,
      userRateContext: input.userRateContext || null,
      recommendedReply: input.reply,
      alternativeReply: input.alternativeReply,
      strategyJson: buildStoredGenerationPayload({
        strategy: input.strategy,
        strategyBlock: input.strategyBlock || null,
        replyVersions: input.replyVersions || [],
        riskInsights: input.riskInsights || [],
        followUpSuggestion: input.followUpSuggestion || null,
        supportLevel: input.supportLevel,
        generationLog: input.generationLog || null,
        feedbackEvents: input.feedbackEvents || [],
        caseMemoryCandidate:
          input.caseMemoryCandidate ||
          buildCaseMemoryCandidate({
            scenarioSlug: input.scenarioSlug,
            serviceType: input.serviceType,
            clientMessage: input.message,
            generatedReply: input.reply,
            tone: input.tone,
            goal: input.goal,
            sourcePage: input.sourcePage,
          }),
      }),
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
  input: SaveBase & {
    id: string;
  }
) {
  await db()
    .insert(generation)
    .values({
      id: input.id,
      anonymousSessionId,
      scenarioSlug: input.scenarioSlug,
      clientMessage: input.message,
      serviceType: input.serviceType,
      tone: input.tone,
      goal: input.goal,
      userRateContext: input.userRateContext || null,
      recommendedReply: input.reply,
      alternativeReply: input.alternativeReply,
      strategyJson: buildStoredGenerationPayload({
        strategy: input.strategy,
        strategyBlock: input.strategyBlock || null,
        replyVersions: input.replyVersions || [],
        riskInsights: input.riskInsights || [],
        followUpSuggestion: input.followUpSuggestion || null,
        supportLevel: input.supportLevel,
        generationLog: input.generationLog || null,
        feedbackEvents: input.feedbackEvents || [],
        caseMemoryCandidate:
          input.caseMemoryCandidate ||
          buildCaseMemoryCandidate({
            scenarioSlug: input.scenarioSlug,
            serviceType: input.serviceType,
            clientMessage: input.message,
            generatedReply: input.reply,
            tone: input.tone,
            goal: input.goal,
            sourcePage: input.sourcePage,
          }),
      }),
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
  generationLog?: GenerationLogRecord;
  feedbackEvents?: GenerationFeedbackEvent[];
  caseMemoryCandidate?: GenerationCaseMemoryRecord;
  ipHash?: string;
  userAgentHash?: string;
}): Promise<string> {
  const generationId = getUuid();
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
    generationLog: params.generationLog,
    feedbackEvents: params.feedbackEvents,
    caseMemoryCandidate: params.caseMemoryCandidate,
    ipHash: params.ipHash,
    userAgentHash: params.userAgentHash,
  };

  if (params.userId) {
    await saveUserGeneration(params.userId, {
      id: generationId,
      ...base,
      creditsCharged: params.modeUsed === 'paid' ? 1 : 0,
      isFreeGeneration: params.modeUsed === 'free',
    });
    return generationId;
  }

  if (!params.anonymousId) {
    throw new Error('IDENTITY_MISSING');
  }

  await saveAnonymousGeneration(params.anonymousId, {
    id: generationId,
    ...base,
  });
  return generationId;
}
