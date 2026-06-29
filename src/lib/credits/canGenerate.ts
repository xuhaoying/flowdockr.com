import { getFixedWindowRateLimitStatus } from '@/lib/rate-limit';
import type { CreditStatus, GenerationIdentity } from '@/types/credits';

import { getCredits } from './getCredits';
import { FREE_REPLY_LIMIT, getAnonymousFreeUsageById } from './getFreeUsage';
import { getUserFreeRepliesRemaining } from './getUserFreeReplies';

export const ANONYMOUS_GENERATION_RATE_LIMIT_BUCKET = 'anonymous_generation';
export const ANONYMOUS_GENERATION_RATE_LIMIT_WINDOW_MS =
  1000 * 60 * 60 * 24 * 30;

export async function canGenerate(
  identity: GenerationIdentity
): Promise<CreditStatus> {
  if (identity.isLoggedIn && identity.userId) {
    const creditsRemaining = await getCredits(identity.userId);
    const freeRepliesRemaining = await getUserFreeRepliesRemaining(
      identity.userId
    );

    const mode: CreditStatus['mode'] =
      freeRepliesRemaining > 0
        ? 'free'
        : creditsRemaining > 0
          ? 'paid'
          : 'blocked';

    return {
      isLoggedIn: true,
      userId: identity.userId,
      creditsRemaining,
      freeRepliesRemaining,
      canGenerate: mode !== 'blocked',
      requiresUpgrade: mode === 'blocked',
      mode,
    };
  }

  const anonymousId = identity.anonymousId || '';
  if (!anonymousId) {
    return {
      isLoggedIn: false,
      creditsRemaining: 0,
      freeRepliesRemaining: 0,
      canGenerate: false,
      requiresUpgrade: true,
      mode: 'blocked',
    };
  }

  const usage = await getAnonymousFreeUsageById(anonymousId);
  const rateLimitRemaining = await getAnonymousRateLimitRemaining(identity);
  const freeRepliesRemaining = Math.min(
    usage.freeRepliesRemaining,
    rateLimitRemaining
  );
  const mode: CreditStatus['mode'] =
    freeRepliesRemaining > 0 ? 'free' : 'blocked';

  return {
    isLoggedIn: false,
    anonymousId,
    createdAnonymousId: Boolean(identity.createdAnonymousId),
    creditsRemaining: 0,
    freeRepliesRemaining,
    canGenerate: mode !== 'blocked',
    requiresUpgrade: mode === 'blocked',
    mode,
  };
}

export { FREE_REPLY_LIMIT };

async function getAnonymousRateLimitRemaining(identity: GenerationIdentity) {
  if (!identity.ipHash || !identity.userAgentHash) {
    return 0;
  }

  const status = await getFixedWindowRateLimitStatus({
    bucket: ANONYMOUS_GENERATION_RATE_LIMIT_BUCKET,
    key: `${identity.ipHash}:${identity.userAgentHash}`,
    limit: FREE_REPLY_LIMIT,
    windowMs: ANONYMOUS_GENERATION_RATE_LIMIT_WINDOW_MS,
  });

  return status.remaining;
}
