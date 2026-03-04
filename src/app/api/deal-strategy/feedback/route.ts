import { respData, respErr } from '@/shared/lib/resp';
import { findAITaskById, updateAITaskById } from '@/shared/models/ai_task';
import { getUserInfo } from '@/shared/models/user';

type FeedbackBody = {
  strategy_id: string;
  adopted_script: 'instant_reply' | 'strong' | 'warm' | 'concession' | 'none';
  outcome: 'won' | 'lost' | 'pending';
  rating?: number;
  note?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as FeedbackBody;
    const strategyId = String(body.strategy_id || '').trim();
    const adoptedScript = String(body.adopted_script || '').trim();
    const outcome = String(body.outcome || '').trim();
    const rating = Number(body.rating || 0);
    const note = String(body.note || '').trim();

    if (!strategyId) {
      throw new Error('strategy_id is required');
    }

    if (!['instant_reply', 'strong', 'warm', 'concession', 'none'].includes(adoptedScript)) {
      throw new Error('invalid adopted_script');
    }

    if (!['won', 'lost', 'pending'].includes(outcome)) {
      throw new Error('invalid outcome');
    }

    if (rating && (!Number.isFinite(rating) || rating < 1 || rating > 5)) {
      throw new Error('rating must be between 1 and 5');
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
    const feedbacks = Array.isArray(taskInfo.feedbacks) ? taskInfo.feedbacks : [];
    const strategyIds = Array.isArray(taskInfo.selected_strategy_ids)
      ? taskInfo.selected_strategy_ids
      : [];

    feedbacks.push({
      strategy_ids: strategyIds,
      adopted_script: adoptedScript,
      outcome,
      rating: rating || null,
      note: note || null,
      at: new Date().toISOString(),
    });

    const nextTaskInfo = {
      ...taskInfo,
      feedbacks,
    };

    await updateAITaskById(strategyId, {
      taskInfo: JSON.stringify(nextTaskInfo),
    });

    return respData({
      strategy_id: strategyId,
      strategy_ids: strategyIds,
      feedback_count: feedbacks.length,
    });
  } catch (e: any) {
    return respErr(e?.message || 'feedback failed');
  }
}
