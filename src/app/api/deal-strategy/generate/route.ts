import { respData, respErr } from '@/shared/lib/resp';
import { AITaskStatus } from '@/extensions/ai';
import { getUuid } from '@/shared/lib/hash';
import { createAITask, NewAITask } from '@/shared/models/ai_task';
import { getUserInfo } from '@/shared/models/user';
import {
  generateDealStrategy,
  makePreview,
  pickLocale,
} from '@/shared/services/sales-coach';

type DealInput = {
  client_need: string;
  your_quote: number;
  client_objection: string;
  your_floor_price: number;
  locale?: string;
};

export async function POST(request: Request) {
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

    const locale = pickLocale(body.locale);
    const strategy = generateDealStrategy({
      client_need: clientNeed,
      client_objection: objection,
      your_quote: yourQuote,
      your_floor_price: floorPrice,
      locale,
    });
    const preview = makePreview(strategy, locale);

    const strategyId = getUuid();
    const newTask: NewAITask = {
      id: strategyId,
      userId: user.id,
      mediaType: 'deal_strategy',
      provider: 'sales-coach',
      model: 'kb-rerank-v1',
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
        unlocked: false,
        feedbacks: [],
        selected_strategy_ids: strategy.strategy_ids,
        reasoning_summary: strategy.reasoning_summary,
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
      costCredits: 0,
    };

    await createAITask(newTask);

    return respData({
      strategy_id: strategyId,
      locked: true,
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
    return respErr(e?.message || 'generate failed');
  }
}
