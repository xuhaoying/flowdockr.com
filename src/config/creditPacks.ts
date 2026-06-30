import type {
  BillingSupportLevel,
  CreditPackage,
  CreditPackCode,
  FeatureEntitlements,
  FreeTrialPlan,
} from '@/types/billing';

type PurchasablePlanConfig = Omit<CreditPackage, 'id'> & {
  code: CreditPackCode;
};

export type CreditPack = PurchasablePlanConfig;

export const supportLevelRank: Record<BillingSupportLevel, number> = {
  free: 0,
  quick_help: 1,
  pro: 2,
  studio: 3,
};

export const entitlementsBySupportLevel: Record<
  BillingSupportLevel,
  FeatureEntitlements
> = {
  free: {
    multiVersionEnabled: false,
    strategyExplanationEnabled: false,
    riskAlertEnabled: false,
    historyEnabled: false,
    followUpEnabled: false,
    advancedModesEnabled: false,
  },
  quick_help: {
    multiVersionEnabled: false,
    strategyExplanationEnabled: true,
    riskAlertEnabled: false,
    historyEnabled: false,
    followUpEnabled: false,
    advancedModesEnabled: false,
  },
  pro: {
    multiVersionEnabled: true,
    strategyExplanationEnabled: true,
    riskAlertEnabled: true,
    historyEnabled: true,
    followUpEnabled: false,
    advancedModesEnabled: false,
  },
  studio: {
    multiVersionEnabled: true,
    strategyExplanationEnabled: true,
    riskAlertEnabled: true,
    historyEnabled: true,
    followUpEnabled: true,
    advancedModesEnabled: true,
  },
};

export const freeTrialPlan: FreeTrialPlan = {
  id: 'free_trial',
  name: 'Free Trial',
  supportLevel: 'free',
  credits: 2,
  priceUsdCents: 0,
  description: 'Try FlowDockr on a real client situation before paying.',
  tagline: 'Single response only',
  badge: 'Start free',
  featureSummary: [
    '2 message credits',
    'Single response output',
    'Basic scenario support',
    'No saved history',
  ],
  entitlements: entitlementsBySupportLevel.free,
};

export const creditPacks: PurchasablePlanConfig[] = [
  {
    code: 'quick_help',
    name: 'Quick Help',
    supportLevel: 'quick_help',
    credits: 8,
    priceUsdCents: 700,
    currency: 'usd',
    stripePriceId:
      process.env.STRIPE_PRICE_7 ||
      process.env.STRIPE_PRICE_QUICK_HELP ||
      process.env.STRIPE_PRICE_STARTER_20 ||
      process.env.STRIPE_PRICE_STARTER_10 ||
      '',
    active: true,
    description:
      'For occasional freelancers who need one clear answer right now.',
    tagline: 'Best for one-off message pressure',
    badge: 'First purchase',
    ctaLabel: 'Buy Quick Help',
    featureSummary: [
      '8 message credits',
      'Single structured reply',
      'Short strategy explanation',
      'No full history',
    ],
    entitlements: entitlementsBySupportLevel.quick_help,
  },
  {
    code: 'pro',
    name: 'Pro',
    supportLevel: 'pro',
    credits: 24,
    priceUsdCents: 1900,
    currency: 'usd',
    stripePriceId:
      process.env.STRIPE_PRICE_19 ||
      process.env.STRIPE_PRICE_PRO ||
      process.env.STRIPE_PRICE_PRO_100 ||
      process.env.STRIPE_PRICE_PRO_50 ||
      '',
    active: true,
    description: 'For ongoing client work that needs stronger reply support.',
    tagline: 'Most balanced support level',
    badge: 'Most Popular',
    popular: true,
    ctaLabel: 'Buy Pro',
    featureSummary: [
      '24 message credits',
      'Multi-version replies',
      'Strategy explanation + risk alerts',
      'Saved message history',
    ],
    entitlements: entitlementsBySupportLevel.pro,
  },
  {
    code: 'studio',
    name: 'Studio',
    supportLevel: 'studio',
    credits: 60,
    priceUsdCents: 3900,
    currency: 'usd',
    stripePriceId:
      process.env.STRIPE_PRICE_39 || process.env.STRIPE_PRICE_STUDIO || '',
    active: true,
    description:
      'For agencies and high-frequency deal operators who want a full support layer.',
    tagline: 'For the whole client communication workflow',
    badge: 'Advanced',
    ctaLabel: 'Buy Studio',
    featureSummary: [
      '60 message credits',
      'Everything in Pro',
      'Advanced reply modes',
      'Best for multi-client work',
    ],
    advancedModeLabels: [
      'Proposal replies',
      'Scope change replies',
      'Rush pricing support',
      'Payment follow-up',
      'Client type analysis',
    ],
    entitlements: entitlementsBySupportLevel.studio,
  },
];

export function getCreditPack(code: string): PurchasablePlanConfig | undefined {
  return creditPacks.find((pack) => pack.code === code && pack.active);
}

export function getFeatureEntitlements(
  supportLevel: BillingSupportLevel
): FeatureEntitlements {
  return entitlementsBySupportLevel[supportLevel];
}

export function getHigherSupportLevel(
  left: BillingSupportLevel,
  right: BillingSupportLevel
): BillingSupportLevel {
  return supportLevelRank[left] >= supportLevelRank[right] ? left : right;
}
