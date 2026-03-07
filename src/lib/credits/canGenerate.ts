import type { CreditStatus, GenerationIdentity } from '@/types/credits';

import { getCredits } from './getCredits';
import { getAnonymousFreeUsageById, FREE_REPLY_LIMIT } from './getFreeUsage';
import { getUserFreeRepliesRemaining } from './getUserFreeReplies';

export async function canGenerate(identity: GenerationIdentity): Promise<CreditStatus> {
  if (identity.isLoggedIn && identity.userId) {
    const creditsRemaining = await getCredits(identity.userId);
    const freeRepliesRemaining = await getUserFreeRepliesRemaining(identity.userId);

    const mode: CreditStatus['mode'] =
      freeRepliesRemaining > 0 ? 'free' : creditsRemaining > 0 ? 'paid' : 'blocked';

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
  const mode: CreditStatus['mode'] =
    usage.freeRepliesRemaining > 0 ? 'free' : 'blocked';

  return {
    isLoggedIn: false,
    anonymousId,
    createdAnonymousId: Boolean(identity.createdAnonymousId),
    creditsRemaining: 0,
    freeRepliesRemaining: usage.freeRepliesRemaining,
    canGenerate: mode !== 'blocked',
    requiresUpgrade: mode === 'blocked',
    mode,
  };
}

export { FREE_REPLY_LIMIT };
