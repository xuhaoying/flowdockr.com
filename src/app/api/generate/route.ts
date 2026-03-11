import { NextRequest, NextResponse } from 'next/server';
import {
  hashRequestIp,
  hashRequestUserAgent,
  setAnonymousSessionCookie,
} from '@/lib/anonymous';
import { getDefaultBillingProfile, getUserBillingProfile } from '@/lib/billing';
import {
  canGenerate,
  consumeUsage,
  getGenerationIdentity,
} from '@/lib/credits';
import { filterOutputByEntitlements } from '@/lib/generation/filterOutputByEntitlements';
import { generateReply } from '@/lib/generation/generateReply';
import { saveGeneration } from '@/lib/generation/saveGeneration';
import { getScenarioBySlug } from '@/lib/scenarios';
import { generateSchema } from '@/lib/validators';
import type { GenerateReplyResponse } from '@/types/generation';

export const runtime = 'nodejs';

function buildFailureResponse(params: {
  scenarioSlug: string;
  error:
    | 'INVALID_INPUT'
    | 'SCENARIO_NOT_FOUND'
    | 'FREE_LIMIT_REACHED'
    | 'INSUFFICIENT_CREDITS'
    | 'GENERATION_FAILED'
    | 'PARSE_FAILED'
    | 'UNAUTHORIZED'
    | 'INTERNAL_ERROR';
  requiresUpgrade?: boolean;
  creditsRemaining?: number;
}): GenerateReplyResponse {
  return {
    success: false,
    reply: '',
    alternativeReply: '',
    strategy: [],
    scenarioSlug: params.scenarioSlug,
    creditsRemaining: params.creditsRemaining,
    requiresUpgrade: Boolean(params.requiresUpgrade),
    error: params.error,
  };
}

function trackGenerationEvent(
  event:
    | 'generation_requested'
    | 'generation_blocked_free_limit'
    | 'generation_blocked_insufficient_credits'
    | 'generation_succeeded'
    | 'generation_failed_model'
    | 'generation_failed_parse'
    | 'generation_saved_failed',
  payload: Record<string, unknown>
) {
  try {
    console.info(
      '[flowdockr.generate]',
      JSON.stringify({
        event,
        ...payload,
        ts: new Date().toISOString(),
      })
    );
  } catch {
    // no-op logging fallback
  }
}

export async function POST(request: NextRequest) {
  let scenarioSlug = '';

  try {
    const rawBody = (await request.json()) as unknown;
    const parsed = generateSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        buildFailureResponse({
          scenarioSlug: '',
          error: 'INVALID_INPUT',
        })
      );
    }

    const input = parsed.data;
    scenarioSlug = input.scenarioSlug;

    const scenario = getScenarioBySlug(input.scenarioSlug);
    if (!scenario) {
      return NextResponse.json(
        buildFailureResponse({
          scenarioSlug: input.scenarioSlug,
          error: 'SCENARIO_NOT_FOUND',
        })
      );
    }

    const identity = await getGenerationIdentity(request);
    const status = await canGenerate(identity);

    if (!status.canGenerate || status.mode === 'blocked') {
      const errorCode = status.isLoggedIn
        ? 'INSUFFICIENT_CREDITS'
        : 'FREE_LIMIT_REACHED';

      trackGenerationEvent(
        status.isLoggedIn
          ? 'generation_blocked_insufficient_credits'
          : 'generation_blocked_free_limit',
        {
          scenarioSlug: input.scenarioSlug,
          sourcePage: input.sourcePage,
          mode: status.mode,
          isLoggedIn: status.isLoggedIn,
        }
      );

      return NextResponse.json(
        buildFailureResponse({
          scenarioSlug: input.scenarioSlug,
          error: errorCode,
          requiresUpgrade: true,
          creditsRemaining: status.creditsRemaining,
        })
      );
    }

    trackGenerationEvent('generation_requested', {
      scenarioSlug: input.scenarioSlug,
      sourcePage: input.sourcePage,
      mode: status.mode,
      isLoggedIn: status.isLoggedIn,
    });

    const billingProfile =
      status.isLoggedIn && status.userId
        ? await getUserBillingProfile(status.userId)
        : getDefaultBillingProfile();

    let output: Awaited<ReturnType<typeof generateReply>>;
    try {
      output = await generateReply({
        scenario,
        message: input.message,
        sourcePage: input.sourcePage,
        serviceType: input.serviceType,
        tone: input.tone,
        goal: input.goal,
        userRateContext: input.userRateContext,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      const parseFailure = message.includes('FAILED_TO_PARSE_GENERATION');
      trackGenerationEvent(
        parseFailure ? 'generation_failed_parse' : 'generation_failed_model',
        {
          scenarioSlug: input.scenarioSlug,
          sourcePage: input.sourcePage,
          mode: status.mode,
          isLoggedIn: status.isLoggedIn,
          error: message || 'UNKNOWN',
        }
      );

      return NextResponse.json(
        buildFailureResponse({
          scenarioSlug: input.scenarioSlug,
          error: parseFailure ? 'PARSE_FAILED' : 'GENERATION_FAILED',
        })
      );
    }

    const ipHash = hashRequestIp(request);
    const userAgentHash = hashRequestUserAgent(request);

    let usageResult: Awaited<ReturnType<typeof consumeUsage>>;
    try {
      usageResult = await consumeUsage({
        status,
        scenarioSlug: input.scenarioSlug,
        sourcePage: input.sourcePage,
        ipHash,
        userAgentHash,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'UNKNOWN';
      if (
        message === 'FREE_LIMIT_REACHED' ||
        message === 'NO_CREDITS' ||
        message === 'USAGE_BLOCKED'
      ) {
        const code = status.isLoggedIn
          ? 'INSUFFICIENT_CREDITS'
          : 'FREE_LIMIT_REACHED';
        trackGenerationEvent(
          status.isLoggedIn
            ? 'generation_blocked_insufficient_credits'
            : 'generation_blocked_free_limit',
          {
            scenarioSlug: input.scenarioSlug,
            sourcePage: input.sourcePage,
            mode: status.mode,
            isLoggedIn: status.isLoggedIn,
            error: message,
          }
        );

        return NextResponse.json(
          buildFailureResponse({
            scenarioSlug: input.scenarioSlug,
            error: code,
            requiresUpgrade: true,
            creditsRemaining: 0,
          })
        );
      }

      return NextResponse.json(
        buildFailureResponse({
          scenarioSlug: input.scenarioSlug,
          error: 'INTERNAL_ERROR',
        }),
        { status: 500 }
      );
    }

    const filteredOutput = filterOutputByEntitlements(output, {
      supportLevel: billingProfile.supportLevel,
      entitlements: billingProfile.entitlements,
    });

    try {
      await saveGeneration({
        userId: status.userId,
        anonymousId: status.anonymousId,
        scenarioSlug: input.scenarioSlug,
        sourcePage: input.sourcePage,
        inputText: input.message,
        replyText: filteredOutput.reply,
        altReplyText: filteredOutput.alternativeReply,
        strategy: filteredOutput.strategy,
        strategyBlock: filteredOutput.strategyBlock,
        replyVersions: filteredOutput.replyVersions,
        riskInsights: filteredOutput.riskInsights,
        followUpSuggestion: filteredOutput.followUpSuggestion,
        modeUsed: usageResult.modeUsed,
        supportLevel: billingProfile.supportLevel,
        serviceType: input.serviceType,
        tone: input.tone,
        goal: input.goal,
        userRateContext: input.userRateContext,
        confidence: output.confidence,
        caution: output.caution,
        ipHash,
        userAgentHash,
      });
    } catch (saveError) {
      trackGenerationEvent('generation_saved_failed', {
        scenarioSlug: input.scenarioSlug,
        sourcePage: input.sourcePage,
        mode: usageResult.modeUsed,
        isLoggedIn: status.isLoggedIn,
        error: saveError instanceof Error ? saveError.message : 'UNKNOWN',
      });
    }

    trackGenerationEvent('generation_succeeded', {
      scenarioSlug: input.scenarioSlug,
      sourcePage: input.sourcePage,
      mode: usageResult.modeUsed,
      isLoggedIn: status.isLoggedIn,
    });

    const successPayload: GenerateReplyResponse = {
      success: true,
      reply: filteredOutput.reply,
      alternativeReply: filteredOutput.alternativeReply,
      strategy: filteredOutput.strategy,
      strategyBlock: filteredOutput.strategyBlock,
      replyVersions: filteredOutput.replyVersions,
      riskInsights: filteredOutput.riskInsights,
      followUpSuggestion: filteredOutput.followUpSuggestion,
      explanation: filteredOutput.explanation,
      riskAlert: filteredOutput.riskAlert,
      confidence: filteredOutput.confidence,
      scenarioSlug: input.scenarioSlug,
      creditsRemaining: usageResult.creditsRemaining,
      requiresUpgrade: false,
      supportLevel: billingProfile.supportLevel,
      entitlements: billingProfile.entitlements,
    };

    const response = NextResponse.json(successPayload);
    if (status.createdAnonymousId && status.anonymousId) {
      setAnonymousSessionCookie(response, status.anonymousId);
    }

    return response;
  } catch {
    return NextResponse.json(
      buildFailureResponse({
        scenarioSlug,
        error: 'INTERNAL_ERROR',
      }),
      { status: 500 }
    );
  }
}
