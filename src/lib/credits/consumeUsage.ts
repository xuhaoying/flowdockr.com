import { consumeFixedWindowRateLimit } from '@/lib/rate-limit';
import type { CreditStatus } from '@/types/credits';

import {
  ANONYMOUS_GENERATION_RATE_LIMIT_BUCKET,
  ANONYMOUS_GENERATION_RATE_LIMIT_WINDOW_MS,
} from './canGenerate';
import { consumeCredit } from './consumeCredit';
import { consumeFreeUsage, FREE_REPLY_LIMIT } from './getFreeUsage';
import { consumeUserFreeUsage } from './getUserFreeReplies';

export async function consumeUsage(params: {
  status: CreditStatus;
  scenarioSlug: string;
  sourcePage: 'home' | 'scenario' | 'tool';
  ipHash?: string;
  userAgentHash?: string;
}): Promise<{
  creditsRemaining: number;
  freeRepliesRemaining: number;
  modeUsed: 'free' | 'paid';
}> {
  const { status, scenarioSlug, sourcePage, ipHash, userAgentHash } = params;

  if (status.mode === 'blocked') {
    throw new Error('USAGE_BLOCKED');
  }

  if (status.mode === 'paid') {
    if (!status.userId) {
      throw new Error('IDENTITY_MISSING');
    }

    const creditsRemaining = await consumeCredit({
      userId: status.userId,
      scenarioSlug,
      sourcePage,
    });

    return {
      creditsRemaining,
      freeRepliesRemaining: status.freeRepliesRemaining,
      modeUsed: 'paid',
    };
  }

  if (status.isLoggedIn) {
    if (!status.userId) {
      throw new Error('IDENTITY_MISSING');
    }

    const usage = await consumeUserFreeUsage(status.userId);

    return {
      creditsRemaining: status.creditsRemaining,
      freeRepliesRemaining: usage.freeRepliesRemaining,
      modeUsed: 'free',
    };
  }

  if (!status.anonymousId) {
    throw new Error('IDENTITY_MISSING');
  }

  if (!ipHash || !userAgentHash) {
    throw new Error('FREE_LIMIT_REACHED');
  }

  const rateLimit = await consumeFixedWindowRateLimit({
    bucket: ANONYMOUS_GENERATION_RATE_LIMIT_BUCKET,
    key: `${ipHash}:${userAgentHash}`,
    limit: FREE_REPLY_LIMIT,
    windowMs: ANONYMOUS_GENERATION_RATE_LIMIT_WINDOW_MS,
  });

  if (!rateLimit.allowed) {
    throw new Error('FREE_LIMIT_REACHED');
  }

  const usage = await consumeFreeUsage({
    anonymousSessionId: status.anonymousId,
    scenarioSlug,
    ipHash,
    userAgentHash,
  });

  if (usage.exhausted) {
    throw new Error('FREE_LIMIT_REACHED');
  }

  return {
    creditsRemaining: 0,
    freeRepliesRemaining: usage.freeRepliesRemaining,
    modeUsed: 'free',
  };
}
