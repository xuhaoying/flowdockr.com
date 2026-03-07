import type { CreditPackCode } from '@/config/creditPacks';

export type CreditPackageId = CreditPackCode;

export type CreditPackage = {
  id: CreditPackageId;
  name: string;
  credits: number;
  priceUsdCents: number;
  stripePriceId: string;
  active?: boolean;
  description?: string;
  currency?: 'usd';
};
