import type { BillingSupportLevel } from '@/types/billing';
import type {
  FollowUpSuggestion,
  GenerationCaseMemoryRecord,
  GenerationFeedbackEvent,
  GenerationFeedbackType,
  GenerationLogRecord,
  PresentableStrategyBlock,
  ReplyVersion,
} from '@/types/generation';

export type StoredGenerationPayload = {
  strategy?: string[];
  strategyBlock?: PresentableStrategyBlock | null;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion | null;
  supportLevel?: BillingSupportLevel;
  generationLog?: GenerationLogRecord | null;
  feedbackEvents?: GenerationFeedbackEvent[];
  caseMemoryCandidate?: GenerationCaseMemoryRecord | null;
};

export function buildStoredGenerationPayload(
  payload: StoredGenerationPayload
): string {
  return JSON.stringify({
    strategy: payload.strategy || [],
    strategyBlock: payload.strategyBlock || null,
    replyVersions: payload.replyVersions || [],
    riskInsights: payload.riskInsights || [],
    followUpSuggestion: payload.followUpSuggestion || null,
    supportLevel: payload.supportLevel || 'free',
    generationLog: payload.generationLog || null,
    feedbackEvents: payload.feedbackEvents || [],
    caseMemoryCandidate: payload.caseMemoryCandidate || null,
  });
}

export function parseStoredGenerationPayload(
  raw: string
): StoredGenerationPayload {
  try {
    const parsed = JSON.parse(raw) as StoredGenerationPayload;
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    return parsed;
  } catch {
    return {};
  }
}

export function buildCaseMemoryCandidate(params: {
  scenarioSlug: string;
  serviceType: string;
  clientMessage: string;
  generatedReply: string;
  tone: string;
  goal: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  createdAt?: string;
}): GenerationCaseMemoryRecord {
  return {
    scenarioSlug: params.scenarioSlug,
    serviceType: params.serviceType,
    clientMessage: params.clientMessage,
    generatedReply: params.generatedReply,
    feedbackScore: null,
    feedbackType: null,
    outcomeLabel: null,
    tags: [params.tone, params.goal, params.sourcePage].filter(Boolean),
    createdAt: params.createdAt || new Date().toISOString(),
  };
}

export function appendFeedbackEvent(
  payload: StoredGenerationPayload,
  feedbackEvent: GenerationFeedbackEvent
): StoredGenerationPayload {
  const feedbackEvents = [...(payload.feedbackEvents || []), feedbackEvent];

  return {
    ...payload,
    feedbackEvents,
    caseMemoryCandidate: applyFeedbackToCaseMemory(
      payload.caseMemoryCandidate,
      feedbackEvent.type
    ),
  };
}

function applyFeedbackToCaseMemory(
  candidate: GenerationCaseMemoryRecord | null | undefined,
  feedbackType: GenerationFeedbackType
): GenerationCaseMemoryRecord | null | undefined {
  if (!candidate) {
    return candidate;
  }

  return {
    ...candidate,
    feedbackType,
    feedbackScore: mapFeedbackTypeToScore(feedbackType),
  };
}

function mapFeedbackTypeToScore(
  feedbackType: GenerationFeedbackType
): number | null {
  switch (feedbackType) {
    case 'sent_as_is':
      return 2;
    case 'edited_before_send':
      return 1;
    case 'regenerated':
      return 0;
    case 'not_useful':
      return -1;
    default:
      return null;
  }
}
