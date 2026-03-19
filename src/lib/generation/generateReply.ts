import { generateReplyWithAI } from '@/lib/generation-ai';
import { Scenario } from '@/lib/scenarios';
import type {
  GenerateReplyInput,
  GenerationLogRecord,
} from '@/types/generation';

import {
  buildFallbackReply,
  type GenerationFallbackReason,
} from './fallbackReply';
import {
  parseGenerationResult,
  validateGenerationResult,
  type GenerationSchemaValidationResult,
  type ParsedGenerationOutput,
} from './parseResponse';
import { evaluateReplyQuality } from './replyQualityRubric';

export type GenerateReplyPipelineResult = {
  output: ParsedGenerationOutput;
  generationLog: GenerationLogRecord;
};

export async function generateReply(params: {
  scenario: Scenario;
  message: string;
  sourcePage?: 'home' | 'scenario' | 'tool';
  serviceType?: GenerateReplyInput['serviceType'];
  tone?: GenerateReplyInput['tone'];
  goal?: GenerateReplyInput['goal'];
  userRateContext?: string;
}): Promise<GenerateReplyPipelineResult> {
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
  const firstValidation = validateGenerationResult(firstAttempt.text);

  if (!firstValidation.success) {
    const secondAttempt = await generateReplyWithAI(
      baseInput,
      params.scenario,
      {
        repairNotes: buildSchemaRepairNotes(firstValidation),
      }
    );
    const secondValidation = validateGenerationResult(secondAttempt.text);

    if (!secondValidation.success) {
      return buildFallbackPipelineResult({
        scenario: params.scenario,
        sourcePage: params.sourcePage,
        serviceType: params.serviceType,
        reason: 'schema_validation_failed_after_retry',
        attemptMeta: secondAttempt,
        schemaValid: false,
        rubricPassed: false,
        rubricFailReasons: [],
        rubricWarningReasons: [],
        schemaRetryCount: 1,
        rubricRetryCount: 0,
      });
    }

    const secondQuality = evaluateParsedOutputQuality(
      params.scenario,
      secondValidation.data
    );
    if (!secondQuality.passed) {
      return buildFallbackPipelineResult({
        scenario: params.scenario,
        sourcePage: params.sourcePage,
        serviceType: params.serviceType,
        reason: 'rubric_failed_after_retry',
        attemptMeta: secondAttempt,
        schemaValid: true,
        rubricPassed: false,
        rubricFailReasons: secondQuality.failedCriteria,
        rubricWarningReasons: [],
        schemaRetryCount: 1,
        rubricRetryCount: 0,
      });
    }

    return {
      output: withConfidence(secondValidation.data, secondQuality.score),
      generationLog: {
        pipelineVersion: 'reply-v2',
        provider: secondAttempt.provider,
        model: secondAttempt.model,
        schemaValid: true,
        fallbackUsed: false,
        rubricPassed: true,
        rubricFailReasons: [],
        rubricWarningReasons: secondQuality.failedCriteria,
        schemaRetryCount: 1,
        rubricRetryCount: 0,
        scenarioSlug: params.scenario.slug,
        serviceType: params.serviceType || 'other',
        sourcePage: params.sourcePage || 'tool',
        strategyCardSource: secondAttempt.promptMeta.strategyCardSource,
        calibrationExampleCount:
          secondAttempt.promptMeta.calibrationExampleCount,
        usedServiceAdjustment: secondAttempt.promptMeta.usedServiceAdjustment,
      },
    };
  }

  const firstParsed = parseGenerationResult(firstAttempt.text);
  const firstQuality = evaluateParsedOutputQuality(
    params.scenario,
    firstParsed
  );
  if (firstQuality.passed) {
    return {
      output: withConfidence(firstParsed, firstQuality.score),
      generationLog: {
        pipelineVersion: 'reply-v2',
        provider: firstAttempt.provider,
        model: firstAttempt.model,
        schemaValid: true,
        fallbackUsed: false,
        rubricPassed: true,
        rubricFailReasons: [],
        rubricWarningReasons: firstQuality.failedCriteria,
        schemaRetryCount: 0,
        rubricRetryCount: 0,
        scenarioSlug: params.scenario.slug,
        serviceType: params.serviceType || 'other',
        sourcePage: params.sourcePage || 'tool',
        strategyCardSource: firstAttempt.promptMeta.strategyCardSource,
        calibrationExampleCount:
          firstAttempt.promptMeta.calibrationExampleCount,
        usedServiceAdjustment: firstAttempt.promptMeta.usedServiceAdjustment,
      },
    };
  }

  const secondAttempt = await generateReplyWithAI(baseInput, params.scenario, {
    repairNotes: buildRubricRepairNotes(firstQuality),
  });
  const secondValidation = validateGenerationResult(secondAttempt.text);
  if (!secondValidation.success) {
    return buildFallbackPipelineResult({
      scenario: params.scenario,
      sourcePage: params.sourcePage,
      serviceType: params.serviceType,
      reason: 'schema_validation_failed',
      attemptMeta: secondAttempt,
      schemaValid: false,
      rubricPassed: false,
      rubricFailReasons: firstQuality.failedCriteria,
      rubricWarningReasons: [],
      schemaRetryCount: 0,
      rubricRetryCount: 1,
    });
  }

  const secondQuality = evaluateParsedOutputQuality(
    params.scenario,
    secondValidation.data
  );
  if (!secondQuality.passed) {
    return buildFallbackPipelineResult({
      scenario: params.scenario,
      sourcePage: params.sourcePage,
      serviceType: params.serviceType,
      reason: 'rubric_failed_after_retry',
      attemptMeta: secondAttempt,
      schemaValid: true,
      rubricPassed: false,
      rubricFailReasons: secondQuality.failedCriteria,
      rubricWarningReasons: [],
      schemaRetryCount: 0,
      rubricRetryCount: 1,
    });
  }

  return {
    output: withConfidence(secondValidation.data, secondQuality.score),
    generationLog: {
      pipelineVersion: 'reply-v2',
      provider: secondAttempt.provider,
      model: secondAttempt.model,
      schemaValid: true,
      fallbackUsed: false,
      rubricPassed: true,
      rubricFailReasons: [],
      rubricWarningReasons: secondQuality.failedCriteria,
      schemaRetryCount: 0,
      rubricRetryCount: 1,
      scenarioSlug: params.scenario.slug,
      serviceType: params.serviceType || 'other',
      sourcePage: params.sourcePage || 'tool',
      strategyCardSource: secondAttempt.promptMeta.strategyCardSource,
      calibrationExampleCount: secondAttempt.promptMeta.calibrationExampleCount,
      usedServiceAdjustment: secondAttempt.promptMeta.usedServiceAdjustment,
    },
  };
}

function buildFallbackPipelineResult(params: {
  scenario: Scenario;
  sourcePage?: 'home' | 'scenario' | 'tool';
  serviceType?: GenerateReplyInput['serviceType'];
  reason: GenerationFallbackReason;
  attemptMeta: Awaited<ReturnType<typeof generateReplyWithAI>>;
  schemaValid: boolean;
  rubricPassed: boolean;
  rubricFailReasons: string[];
  rubricWarningReasons: string[];
  schemaRetryCount: number;
  rubricRetryCount: number;
}): GenerateReplyPipelineResult {
  return {
    output: buildFallbackReply({
      scenario: params.scenario,
      serviceType: params.serviceType,
      reason: params.reason,
    }),
    generationLog: {
      pipelineVersion: 'reply-v2',
      provider: params.attemptMeta.provider,
      model: params.attemptMeta.model,
      schemaValid: params.schemaValid,
      fallbackUsed: true,
      fallbackReason: params.reason,
      rubricPassed: params.rubricPassed,
      rubricFailReasons: params.rubricFailReasons,
      rubricWarningReasons: params.rubricWarningReasons,
      schemaRetryCount: params.schemaRetryCount,
      rubricRetryCount: params.rubricRetryCount,
      scenarioSlug: params.scenario.slug,
      serviceType: params.serviceType || 'other',
      sourcePage: params.sourcePage || 'tool',
      strategyCardSource: params.attemptMeta.promptMeta.strategyCardSource,
      calibrationExampleCount:
        params.attemptMeta.promptMeta.calibrationExampleCount,
      usedServiceAdjustment:
        params.attemptMeta.promptMeta.usedServiceAdjustment,
    },
  };
}

function buildSchemaRepairNotes(
  result: GenerationSchemaValidationResult
): string[] {
  if (result.success) {
    return ['Return strict JSON only with the required schema.'];
  }

  return [
    'Previous output failed schema validation. Return strict JSON only.',
    ...result.issues.map((issue) => `Fix schema issue: ${issue}`),
  ].slice(0, 6);
}

function buildRubricRepairNotes(
  report: ReturnType<typeof evaluateReplyQuality>
): string[] {
  return [
    'Previous output passed schema validation but missed the reply-quality rubric.',
    ...report.failures.map(
      (failure) =>
        `${failure.criterion}: ${failure.reason} Repair: ${failure.repairHint}`
    ),
  ].slice(0, 6);
}

function evaluateParsedOutputQuality(
  scenario: Scenario,
  output: ParsedGenerationOutput
) {
  return evaluateReplyQuality({
    scenario,
    reply: output.reply,
    alternativeReply: output.alternativeReply,
    strategy: output.strategy,
  });
}

function withConfidence(
  output: ParsedGenerationOutput,
  score: number
): ParsedGenerationOutput {
  const confidence = score >= 6 ? 'high' : score >= 4 ? 'medium' : 'low';
  return {
    ...output,
    confidence,
  };
}
