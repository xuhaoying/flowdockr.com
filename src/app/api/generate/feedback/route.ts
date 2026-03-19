import { NextRequest, NextResponse } from 'next/server';
import { getAnonymousSessionIdFromRequest } from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import { db, generation } from '@/lib/db';
import {
  appendFeedbackEvent,
  buildStoredGenerationPayload,
  parseStoredGenerationPayload,
} from '@/lib/generation/storedGeneration';
import { and, eq, or } from 'drizzle-orm';
import { z } from 'zod';

export const runtime = 'nodejs';

const feedbackSchema = z
  .object({
    generationId: z.string().min(8).max(120),
    type: z.enum([
      'sent_as_is',
      'edited_before_send',
      'not_useful',
      'regenerated',
    ]),
    reason: z
      .enum([
        'too_generic',
        'too_soft',
        'too_aggressive',
        'missed_context',
        'not_my_style',
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'not_useful' && !data.reason) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'reason is required for not_useful feedback.',
        path: ['reason'],
      });
    }
  });

export async function POST(request: NextRequest) {
  try {
    const rawBody = (await request.json()) as unknown;
    const parsed = feedbackSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: 'INVALID_INPUT',
        },
        { status: 400 }
      );
    }

    const currentUser = await getCurrentUser();
    const anonymousSessionId = getAnonymousSessionIdFromRequest(request);

    const ownershipClauses = [
      currentUser?.id ? eq(generation.userId, currentUser.id) : undefined,
      anonymousSessionId
        ? eq(generation.anonymousSessionId, anonymousSessionId)
        : undefined,
    ].filter(Boolean);

    if (ownershipClauses.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'UNAUTHORIZED',
        },
        { status: 401 }
      );
    }

    const [record] = await db()
      .select({
        id: generation.id,
        userId: generation.userId,
        anonymousSessionId: generation.anonymousSessionId,
        strategyJson: generation.strategyJson,
      })
      .from(generation)
      .where(
        and(
          eq(generation.id, parsed.data.generationId),
          ownershipClauses.length === 1
            ? ownershipClauses[0]
            : or(...ownershipClauses)
        )
      )
      .limit(1);

    if (!record) {
      return NextResponse.json(
        {
          ok: false,
          message: 'GENERATION_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const stored = parseStoredGenerationPayload(record.strategyJson);
    const updated = appendFeedbackEvent(stored, {
      type: parsed.data.type,
      reason: parsed.data.reason,
      source: 'result_card',
      createdAt: new Date().toISOString(),
    });

    await db()
      .update(generation)
      .set({
        strategyJson: buildStoredGenerationPayload(updated),
      })
      .where(eq(generation.id, record.id));

    return NextResponse.json({
      ok: true,
      generationId: record.id,
      feedbackCount: (updated.feedbackEvents || []).length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : 'Failed to persist generation feedback.',
      },
      { status: 500 }
    );
  }
}
