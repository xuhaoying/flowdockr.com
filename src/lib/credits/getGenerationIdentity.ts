import { NextRequest } from 'next/server';

import {
  createAnonymousSessionId,
  getAnonymousSessionIdFromRequest,
} from '@/lib/anonymous';
import { getCurrentUser } from '@/lib/auth';
import type { GenerationIdentity } from '@/types/credits';

export async function getGenerationIdentity(
  request: NextRequest
): Promise<GenerationIdentity> {
  const currentUser = await getCurrentUser();
  if (currentUser?.id) {
    return {
      isLoggedIn: true,
      userId: currentUser.id,
    };
  }

  const fromCookie = getAnonymousSessionIdFromRequest(request);
  if (fromCookie) {
    return {
      isLoggedIn: false,
      anonymousId: fromCookie,
      createdAnonymousId: false,
    };
  }

  return {
    isLoggedIn: false,
    anonymousId: createAnonymousSessionId(),
    createdAnonymousId: true,
  };
}
