import { consumeCredit, getCredits, grantCredits } from '@/lib/credits';

import { AITaskStatus } from '@/extensions/ai';
import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import { createAITask, NewAITask } from '@/shared/models/ai_task';
import { getUserInfo } from '@/shared/models/user';
import {
  generateDealStrategyWithMode,
  makeDealPreview,
} from '@/shared/services/deal-ai';
import { pickLocale } from '@/shared/services/sales-coach';

type DealInput = {
  client_need: string;
  your_quote: number;
  client_objection: string;
  your_floor_price: number;
  locale?: string;
};

export async function POST(request: Request) {
  let chargedUserId = '';
  let refundIssued = false;

  async function refundCharge(error: unknown) {
    if (!chargedUserId || refundIssued) {
      return;
    }

    refundIssued = true;
    try {
      await grantCredits({
        userId: chargedUserId,
        credits: 1,
        type: 'generation_refund',
        reason: 'Refund failed deal strategy generation',
        metadata: {
          error: error instanceof Error ? error.message : 'UNKNOWN',
        },
      });
    } catch (refundError) {
      console.error('Deal strategy refund failed:', refundError);
    }
  }

  try {
    const body = (await request.json()) as DealInput;

    const clientNeed = String(body.client_need || '').trim();
    const objection = String(body.client_objection || '').trim();
    const yourQuote = Number(body.your_quote);
    const floorPrice = Number(body.your_floor_price);

    if (!clientNeed || !objection) {
      throw new Error('client_need and client_objection are required');
    }
    if (!Number.isFinite(yourQuote) || !Number.isFinite(floorPrice)) {
      throw new Error('your_quote and your_floor_price must be numbers');
    }
    if (yourQuote <= 0 || floorPrice <= 0) {
      throw new Error('price values must be greater than zero');
    }

    const user = await getUserInfo();
    if (!user) {
      throw new Error('no auth, please sign in');
    }

    const creditsRemaining = await consumeCredit({
      userId: user.id,
      scenarioSlug: 'deal-strategy-generate',
      sourcePage: 'tool',
    });
    chargedUserId = user.id;

    const locale = pickLocale(body.locale);
    const generated = await generateDealStrategyWithMode({
      client_need: clientNeed,
      client_objection: objection,
      your_quote: yourQuote,
      your_floor_price: floorPrice,
      locale,
    });
    const strategy = generated.strategy;
    const preview = makeDealPreview(strategy, locale);

    const strategyId = getUuid();
    const newTask: NewAITask = {
      id: strategyId,
      userId: user.id,
      mediaType: 'deal_strategy',
      provider: generated.provider,
      model: generated.model,
      prompt: JSON.stringify({
        client_need: clientNeed,
        client_objection: objection,
        your_quote: yourQuote,
        your_floor_price: floorPrice,
      }),
      options: JSON.stringify({ locale }),
      status: AITaskStatus.SUCCESS,
      scene: 'deal-strategy-generate',
      taskInfo: JSON.stringify({
        generation_mode: generated.mode,
        unlocked: false,
        generation_charged: true,
        feedbacks: [],
        selected_strategy_ids: generated.selected_strategy_ids,
        reasoning_summary: generated.reasoning_summary,
        fallback_reason: generated.fallback_reason,
      }),
      taskResult: JSON.stringify({
        locale,
        input: {
          client_need: clientNeed,
          client_objection: objection,
          your_quote: yourQuote,
          your_floor_price: floorPrice,
        },
        strategy,
      }),
      costCredits: 1,
    };

    await createAITask(newTask);

    return respData({
      strategy_id: strategyId,
      locked: true,
      generation_mode: generated.mode,
      remaining_credits: creditsRemaining,
      fallback_reason: generated.fallback_reason,
      locale,
      input: {
        client_need: clientNeed,
        client_objection: objection,
        your_quote: yourQuote,
        your_floor_price: floorPrice,
      },
      strategy: preview,
    });
  } catch (e: any) {
    if (e?.message === 'NO_CREDITS') {
      const user = await getUserInfo();
      const remaining = user ? await getCredits(user.id) : 0;
      return respData({
        locked: true,
        error: 'insufficient_credits',
        remaining_credits: remaining,
      });
    }

    await refundCharge(e);

    return respErr(e?.message || 'generate failed');
  }
}
