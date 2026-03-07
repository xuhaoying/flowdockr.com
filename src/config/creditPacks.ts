export type CreditPackCode = 'starter_20' | 'pro_100';

export type CreditPack = {
  code: CreditPackCode;
  name: string;
  credits: number;
  priceCents: number;
  currency: 'usd';
  stripePriceId?: string;
  active: boolean;
  description: string;
};

export const creditPacks: CreditPack[] = [
  {
    code: 'starter_20',
    name: 'Starter',
    credits: 20,
    priceCents: 900,
    currency: 'usd',
    stripePriceId:
      process.env.STRIPE_PRICE_STARTER_20 || process.env.STRIPE_PRICE_STARTER_10 || '',
    active: true,
    description: 'Good for occasional client negotiations.',
  },
  {
    code: 'pro_100',
    name: 'Pro',
    credits: 100,
    priceCents: 2900,
    currency: 'usd',
    stripePriceId:
      process.env.STRIPE_PRICE_PRO_100 || process.env.STRIPE_PRICE_PRO_50 || '',
    active: true,
    description: 'Better for regular freelance work.',
  },
];

export function getCreditPack(code: string): CreditPack | undefined {
  return creditPacks.find((pack) => pack.code === code && pack.active);
}
