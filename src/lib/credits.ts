import { CreditPackage, CreditPackageId } from '@/types/billing';

export const CREDIT_PACKAGES: Record<CreditPackageId, CreditPackage> = {
  starter_10: {
    id: 'starter_10',
    name: 'Starter',
    credits: 10,
    priceUsdCents: 500,
    stripePriceId: process.env.STRIPE_PRICE_STARTER_10 || '',
  },
  pro_50: {
    id: 'pro_50',
    name: 'Pro',
    credits: 50,
    priceUsdCents: 1500,
    stripePriceId: process.env.STRIPE_PRICE_PRO_50 || '',
  },
  studio_200: {
    id: 'studio_200',
    name: 'Studio',
    credits: 200,
    priceUsdCents: 4000,
    stripePriceId: process.env.STRIPE_PRICE_STUDIO_200 || '',
  },
};

export const CREDIT_PACKAGE_LIST = Object.values(CREDIT_PACKAGES);

export function getCreditPackageById(packageId: string): CreditPackage | null {
  return CREDIT_PACKAGES[packageId as CreditPackageId] || null;
}
