export type GenerationIdentity = {
  userId?: string;
  anonymousId?: string;
  isLoggedIn: boolean;
  createdAnonymousId?: boolean;
};

export type CreditStatus = {
  isLoggedIn: boolean;
  userId?: string;
  anonymousId?: string;
  creditsRemaining: number;
  freeRepliesRemaining: number;
  canGenerate: boolean;
  requiresUpgrade: boolean;
  mode: 'free' | 'paid' | 'blocked';
  createdAnonymousId?: boolean;
};
