import type { CreditStatus } from '@/types/credits';

import { consumeCredit } from './consumeCredit';
import { consumeFreeUsage } from './getFreeUsage';

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
    return {
      creditsRemaining: status.creditsRemaining,
      freeRepliesRemaining: Math.max(0, status.freeRepliesRemaining - 1),
      modeUsed: 'free',
    };
  }

  if (!status.anonymousId) {
    throw new Error('IDENTITY_MISSING');
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
