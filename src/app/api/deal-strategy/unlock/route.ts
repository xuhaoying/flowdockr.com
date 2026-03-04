import { respData, respErr } from '@/shared/lib/resp';
import { findAITaskById, updateAITaskById } from '@/shared/models/ai_task';
import { consumeCredits, getRemainingCredits } from '@/shared/models/credit';
import { getUserInfo } from '@/shared/models/user';

type UnlockBody = {
  strategy_id: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as UnlockBody;
    const strategyId = String(body.strategy_id || '').trim();

    if (!strategyId) {
      throw new Error('strategy_id is required');
    }

    const user = await getUserInfo();
    if (!user) {
      throw new Error('no auth, please sign in');
    }

    const task = await findAITaskById(strategyId);
    if (!task || task.mediaType !== 'deal_strategy') {
      throw new Error('strategy not found');
    }
    if (task.userId !== user.id) {
      throw new Error('no permission');
    }

    const taskInfo = task.taskInfo ? JSON.parse(task.taskInfo) : {};
    const taskResult = task.taskResult ? JSON.parse(task.taskResult) : {};

    if (!taskResult?.strategy) {
      throw new Error('strategy content missing');
    }

    if (taskInfo?.unlocked) {
      const remainingCredits = await getRemainingCredits(user.id);
      return respData({
        strategy_id: strategyId,
        unlocked: true,
        remaining_credits: remainingCredits,
        strategy: taskResult.strategy,
      });
    }

    await consumeCredits({
      userId: user.id,
      credits: 1,
      scene: 'deal-strategy-unlock',
      description: 'unlock deal strategy pack',
      metadata: JSON.stringify({
        type: 'deal-strategy-unlock',
        strategyId,
      }),
    });

    const nextTaskInfo = {
      ...taskInfo,
      unlocked: true,
      unlockedAt: new Date().toISOString(),
    };

    await updateAITaskById(strategyId, {
      taskInfo: JSON.stringify(nextTaskInfo),
    });

    const remainingCredits = await getRemainingCredits(user.id);

    return respData({
      strategy_id: strategyId,
      unlocked: true,
      remaining_credits: remainingCredits,
      strategy: taskResult.strategy,
    });
  } catch (e: any) {
    const msg = e?.message || 'unlock failed';

    if (String(msg).toLowerCase().includes('insufficient credits')) {
      return respErr('insufficient credits');
    }

    return respErr(msg);
  }
}
