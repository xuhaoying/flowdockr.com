export type CreditPackageId = 'starter_10' | 'pro_50' | 'studio_200';

export type CreditPackage = {
  id: CreditPackageId;
  name: string;
  credits: number;
  priceUsdCents: number;
  stripePriceId: string;
};
