import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

import {
  createAnonymousSessionId,
  ensureAnonymousUsageRecord,
  getAnonymousSessionIdFromRequest,
  hashRequestIp,
  hashRequestUserAgent,
  setAnonymousSessionCookie,
} from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { db, anonymousUsage, creditTransaction, generation, user } from '@/lib/db';
import { generateReplyWithAI } from '@/lib/generation-ai';
import { getScenarioBySlug } from '@/lib/scenarios';
import { generateSchema } from '@/lib/validators';
import { getUuid } from '@/shared/lib/hash';

const FREE_GENERATION_LIMIT = 2;
export const runtime = 'nodejs';

type PaywallUsage = {
  remainingFreeGenerations: number;
  creditsBalance: number;
};

class PaywallRequiredError extends Error {
  usage: PaywallUsage;

  constructor(message: string, usage: PaywallUsage) {
    super(message);
    this.usage = usage;
  }
}

export async function POST(request: NextRequest) {
  try {
    const raw = (await request.json()) as unknown;
    const parsed = generateSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          code: 'INVALID_INPUT',
          message: parsed.error.issues[0]?.message || 'Invalid input.',
        },
        { status: 400 }
      );
    }

    const input = parsed.data;
    const scenario = getScenarioBySlug(input.scenarioSlug);
    if (!scenario) {
      return NextResponse.json(
        {
          ok: false,
          code: 'INVALID_SCENARIO',
          message: 'Invalid scenario slug.',
        },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();

    if (currentUser) {
      const [dbUser] = await db()
        .select({
          id: user.id,
          creditsBalance: user.creditsBalance,
        })
        .from(user)
        .where(eq(user.id, currentUser.id))
        .limit(1);

      const creditsBalance = dbUser?.creditsBalance || 0;
      if (!dbUser || creditsBalance <= 0) {
        throw new PaywallRequiredError('Credits required.', {
          remainingFreeGenerations: 0,
          creditsBalance: 0,
        });
      }

      const result = await generateReplyWithAI(input, scenario);
      const ipHash = hashRequestIp(request);
      const userAgentHash = hashRequestUserAgent(request);

      const nextCreditsBalance = await db().transaction(async (tx: any) => {
        const [latestUser] = await tx
          .select({
            id: user.id,
            creditsBalance: user.creditsBalance,
          })
          .from(user)
          .where(eq(user.id, currentUser.id))
          .limit(1);

        if (!latestUser || latestUser.creditsBalance <= 0) {
          throw new PaywallRequiredError('Credits required.', {
            remainingFreeGenerations: 0,
            creditsBalance: 0,
          });
        }

        const updatedCredits = latestUser.creditsBalance - 1;

        await tx
          .update(user)
          .set({
            creditsBalance: updatedCredits,
          })
          .where(eq(user.id, currentUser.id));

        await tx.insert(creditTransaction).values({
          id: getUuid(),
          userId: currentUser.id,
          type: 'generation_charge',
          amount: -1,
          balanceAfter: updatedCredits,
          reason: 'Negotiation reply generation',
          metadata: JSON.stringify({
            scenarioSlug: input.scenarioSlug,
            source: 'api_generate',
          }),
        });

        await tx.insert(generation).values({
          id: getUuid(),
          userId: currentUser.id,
          scenarioSlug: input.scenarioSlug,
          clientMessage: input.clientMessage,
          serviceType: input.serviceType,
          tone: input.tone,
          goal: input.goal,
          userRateContext: input.userRateContext || null,
          recommendedReply: result.recommendedReply,
          alternativeReply: result.alternativeReply,
          strategyJson: JSON.stringify(result.strategy),
          confidence: result.confidence,
          caution: result.caution || null,
          creditsCharged: 1,
          isFreeGeneration: false,
          ipHash,
          userAgentHash,
        });

        return updatedCredits;
      });

      return NextResponse.json({
        ok: true,
        data: result,
        usage: {
          isFreeGeneration: false,
          remainingFreeGenerations: 0,
          creditsBalance: nextCreditsBalance,
        },
      });
    }

    let anonymousSessionId = getAnonymousSessionIdFromRequest(request);
    let shouldSetAnonymousCookie = false;

    if (!anonymousSessionId) {
      anonymousSessionId = createAnonymousSessionId();
      shouldSetAnonymousCookie = true;
    }

    const usageRecord = await ensureAnonymousUsageRecord({
      anonymousSessionId,
      request,
    });

    if (usageRecord.freeGenerationsUsed >= FREE_GENERATION_LIMIT) {
      throw new PaywallRequiredError('Free usage limit reached.', {
        remainingFreeGenerations: 0,
        creditsBalance: 0,
      });
    }

    const result = await generateReplyWithAI(input, scenario);
    const ipHash = hashRequestIp(request);
    const userAgentHash = hashRequestUserAgent(request);

    const nextFreeUsed = await db().transaction(async (tx: any) => {
      const [latestUsage] = await tx
        .select({
          id: anonymousUsage.id,
          freeGenerationsUsed: anonymousUsage.freeGenerationsUsed,
        })
        .from(anonymousUsage)
        .where(eq(anonymousUsage.anonymousSessionId, anonymousSessionId))
        .limit(1);

      if (!latestUsage) {
        throw new Error('Anonymous usage not found.');
      }

      if (latestUsage.freeGenerationsUsed >= FREE_GENERATION_LIMIT) {
        throw new PaywallRequiredError('Free usage limit reached.', {
          remainingFreeGenerations: 0,
          creditsBalance: 0,
        });
      }

      const used = latestUsage.freeGenerationsUsed + 1;

      await tx
        .update(anonymousUsage)
        .set({
          freeGenerationsUsed: used,
          lastScenarioSlug: input.scenarioSlug,
          ipHash,
          userAgentHash,
          updatedAt: new Date(),
        })
        .where(eq(anonymousUsage.id, latestUsage.id));

      await tx.insert(generation).values({
        id: getUuid(),
        anonymousSessionId,
        scenarioSlug: input.scenarioSlug,
        clientMessage: input.clientMessage,
        serviceType: input.serviceType,
        tone: input.tone,
        goal: input.goal,
        userRateContext: input.userRateContext || null,
        recommendedReply: result.recommendedReply,
        alternativeReply: result.alternativeReply,
        strategyJson: JSON.stringify(result.strategy),
        confidence: result.confidence,
        caution: result.caution || null,
        creditsCharged: 0,
        isFreeGeneration: true,
        ipHash,
        userAgentHash,
      });

      return used;
    });

    const response = NextResponse.json({
      ok: true,
      data: result,
      usage: {
        isFreeGeneration: true,
        remainingFreeGenerations: Math.max(0, FREE_GENERATION_LIMIT - nextFreeUsed),
        creditsBalance: null,
      },
    });

    if (shouldSetAnonymousCookie) {
      setAnonymousSessionCookie(response, anonymousSessionId);
    }

    return response;
  } catch (error) {
    if (error instanceof PaywallRequiredError) {
      return NextResponse.json(
        {
          ok: false,
          code: 'PAYWALL_REQUIRED',
          message: error.message,
          usage: error.usage,
        },
        { status: 402 }
      );
    }

    const message =
      error instanceof Error ? error.message : 'Failed to generate response.';

    return NextResponse.json(
      {
        ok: false,
        code: 'GENERATION_FAILED',
        message,
      },
      { status: 500 }
    );
  }
}
