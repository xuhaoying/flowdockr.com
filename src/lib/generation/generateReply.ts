import { generateReplyWithAI } from '@/lib/generation-ai';
import { Scenario } from '@/lib/scenarios';
import { GenerateReplyInput } from '@/types/generation';

import { parseGenerationResult, ParsedGenerationOutput } from './parseResponse';
import { evaluateReplyQuality } from './replyQualityRubric';

export async function generateReply(params: {
  scenario: Scenario;
  message: string;
  sourcePage?: 'home' | 'scenario' | 'tool';
  serviceType?: GenerateReplyInput['serviceType'];
  tone?: GenerateReplyInput['tone'];
  goal?: GenerateReplyInput['goal'];
  userRateContext?: string;
}): Promise<ParsedGenerationOutput> {
  const baseInput = {
    scenarioSlug: params.scenario.slug,
    message: params.message,
    sourcePage: params.sourcePage,
    serviceType: params.serviceType,
    tone: params.tone,
    goal: params.goal,
    userRateContext: params.userRateContext,
  };

  const firstAttempt = await generateReplyWithAI(baseInput, params.scenario);

  const firstParsed = parseGenerationResult(firstAttempt);
  const firstQuality = evaluateReplyQuality({
    scenario: params.scenario,
    reply: firstParsed.reply,
    alternativeReply: firstParsed.alternativeReply,
    strategy: firstParsed.strategy,
  });

  // If quality mostly passes, keep the first output to minimize latency.
  if (firstQuality.failedCriteria.length <= 1) {
    return firstParsed;
  }

  try {
    const revisedAttempt = await generateReplyWithAI(baseInput, params.scenario, {
      qualityHints: firstQuality.hints,
    });

    const revisedParsed = parseGenerationResult(revisedAttempt);
    const revisedQuality = evaluateReplyQuality({
      scenario: params.scenario,
      reply: revisedParsed.reply,
      alternativeReply: revisedParsed.alternativeReply,
      strategy: revisedParsed.strategy,
    });

    return revisedQuality.score >= firstQuality.score ? revisedParsed : firstParsed;
  } catch {
    return firstParsed;
  }
}
