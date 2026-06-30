import { consumeCredit, grantCredits } from '@/lib/credits';

import { envConfigs } from '@/config';
import { AIMediaType, AITaskStatus } from '@/extensions/ai';
import { getUuid } from '@/shared/lib/hash';
import { respData, respErr } from '@/shared/lib/resp';
import {
  createAITask,
  NewAITask,
  updateAITaskById,
} from '@/shared/models/ai_task';
import { getUserInfo } from '@/shared/models/user';
import { getAIService } from '@/shared/services/ai';

const DEFAULT_ALLOWED_AI_MODELS = [
  'fal-ai/flux/dev',
  'fal-ai/fast-sdxl',
  'black-forest-labs/flux-schnell',
  'gemini-2.5-flash-image-preview',
  'V5',
];

export async function POST(request: Request) {
  let chargedUserId = '';
  let chargedCredits = 0;
  let refundIssued = false;
  let providerAccepted = false;

  async function refundCharge(error: unknown) {
    if (!chargedUserId || chargedCredits <= 0 || refundIssued) {
      return;
    }

    refundIssued = true;
    try {
      await grantCredits({
        userId: chargedUserId,
        credits: chargedCredits,
        type: 'generation_refund',
        reason: 'Refund failed AI generation request',
        metadata: {
          error: error instanceof Error ? error.message : 'UNKNOWN',
        },
      });
    } catch (refundError) {
      console.error('AI generation refund failed:', refundError);
    }
  }

  try {
    let { provider, mediaType, model, prompt, options, scene } =
      await request.json();

    if (!provider || !mediaType || !model) {
      throw new Error('invalid params');
    }

    if (!prompt && !options) {
      throw new Error('prompt or options is required');
    }

    const aiService = await getAIService();

    // check generate type
    if (!aiService.getMediaTypes().includes(mediaType)) {
      throw new Error('invalid mediaType');
    }

    // check ai provider
    const aiProvider = aiService.getProvider(provider);
    if (!aiProvider) {
      throw new Error('invalid provider');
    }

    if (!isAllowedAIModel(provider, model)) {
      throw new Error('model is not allowed');
    }

    // get current user
    const user = await getUserInfo();
    if (!user) {
      throw new Error('no auth, please sign in');
    }

    // todo: get cost credits from settings
    let costCredits = 4;

    if (mediaType === AIMediaType.IMAGE) {
      // generate image
      if (scene === 'image-to-image') {
        costCredits = 6;
      } else if (scene === 'text-to-image') {
        costCredits = 4;
      } else {
        throw new Error('invalid scene');
      }
    } else if (mediaType === AIMediaType.VIDEO) {
      // generate video
      if (scene === 'text-to-video') {
        costCredits = 6;
      } else if (scene === 'image-to-video') {
        costCredits = 8;
      } else if (scene === 'video-to-video') {
        costCredits = 10;
      } else {
        throw new Error('invalid scene');
      }
    } else if (mediaType === AIMediaType.MUSIC) {
      // generate music
      costCredits = 10;
      scene = 'text-to-music';
    } else {
      throw new Error('invalid mediaType');
    }

    const remainingCredits = await consumeCredit({
      userId: user.id,
      scenarioSlug: `ai-${mediaType}-${scene}`,
      sourcePage: 'tool',
      amount: costCredits,
      reason: `AI ${mediaType} generation`,
    });
    chargedUserId = user.id;
    chargedCredits = costCredits;

    const callbackUrl = `${envConfigs.app_url}/api/ai/notify/${provider}`;

    const localTaskId = getUuid();
    const pendingTask: NewAITask = {
      id: localTaskId,
      userId: user.id,
      mediaType,
      provider,
      model,
      prompt,
      scene,
      options: options ? JSON.stringify(options) : null,
      status: AITaskStatus.PROCESSING,
      costCredits,
      taskId: null,
      taskInfo: JSON.stringify({
        local_status: 'provider_request_pending',
        remainingCredits,
      }),
      taskResult: null,
    };

    await createAITask(pendingTask);

    const params: any = {
      mediaType,
      model,
      prompt,
      callbackUrl,
      options,
    };

    // generate content
    let result;
    try {
      result = await aiProvider.generate({ params });
    } catch (error) {
      await refundCharge(error);
      await updateAITaskById(localTaskId, {
        status: AITaskStatus.FAILED,
        taskInfo: JSON.stringify({
          local_status: 'provider_request_failed',
          error: error instanceof Error ? error.message : 'UNKNOWN',
        }),
      });
      throw error;
    }

    if (!result?.taskId) {
      await refundCharge(new Error('provider_task_missing'));
      await updateAITaskById(localTaskId, {
        status: AITaskStatus.FAILED,
        taskInfo: JSON.stringify({
          local_status: 'provider_task_missing',
        }),
      });
      throw new Error(
        `ai generate failed, mediaType: ${mediaType}, provider: ${provider}, model: ${model}`
      );
    }
    providerAccepted = true;

    const updatedTask = await updateAITaskById(localTaskId, {
      status: result.taskStatus,
      taskId: result.taskId,
      taskInfo: result.taskInfo ? JSON.stringify(result.taskInfo) : null,
      taskResult: result.taskResult ? JSON.stringify(result.taskResult) : null,
    });

    return respData(updatedTask);
  } catch (e: any) {
    if (!providerAccepted) {
      await refundCharge(e);
    }

    console.log('generate failed', e);
    return respErr(e.message);
  }
}

function isAllowedAIModel(provider: string, model: string): boolean {
  const configuredModels = String(process.env.FLOWDOCKR_ALLOWED_AI_MODELS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  const allowlist =
    configuredModels.length > 0 ? configuredModels : DEFAULT_ALLOWED_AI_MODELS;

  return allowlist.some(
    (entry) => entry === model || entry === `${provider}:${model}`
  );
}
