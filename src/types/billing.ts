export type BillingSupportLevel = 'free' | 'quick_help' | 'pro' | 'studio';
export type CreditPackCode = 'quick_help' | 'pro' | 'studio';

export type FeatureEntitlements = {
  multiVersionEnabled: boolean;
  strategyExplanationEnabled: boolean;
  riskAlertEnabled: boolean;
  historyEnabled: boolean;
  followUpEnabled: boolean;
  advancedModesEnabled: boolean;
};

export type CreditPackageId = CreditPackCode;

export type CreditPackage = {
  id: CreditPackageId;
  name: string;
  supportLevel: Exclude<BillingSupportLevel, 'free'>;
  credits: number;
  priceUsdCents: number;
  stripePriceId: string;
  active?: boolean;
  description?: string;
  tagline?: string;
  popular?: boolean;
  badge?: string;
  currency?: 'usd';
  ctaLabel?: string;
  featureSummary?: string[];
  advancedModeLabels?: string[];
  entitlements: FeatureEntitlements;
};

export type FreeTrialPlan = {
  id: 'free_trial';
  name: string;
  supportLevel: 'free';
  credits: number;
  priceUsdCents: 0;
  description: string;
  tagline?: string;
  badge?: string;
  featureSummary?: string[];
  entitlements: FeatureEntitlements;
};

export type BillingProfile = {
  creditsRemaining: number;
  creditsTotal: number;
  supportLevel: BillingSupportLevel;
  purchasedPlan: string;
  entitlements: FeatureEntitlements;
};
