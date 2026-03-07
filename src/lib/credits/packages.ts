import { creditPacks } from '@/config/creditPacks';
import { CreditPackage, CreditPackageId } from '@/types/billing';

export const CREDIT_PACKAGES: Record<CreditPackageId, CreditPackage> = creditPacks
  .filter((pack) => pack.active)
  .reduce(
    (acc, pack) => {
      acc[pack.code] = {
        id: pack.code,
        name: pack.name,
        credits: pack.credits,
        priceUsdCents: pack.priceCents,
        stripePriceId: pack.stripePriceId || '',
        active: pack.active,
        description: pack.description,
        currency: pack.currency,
      };
      return acc;
    },
    {} as Record<CreditPackageId, CreditPackage>
  );

export const CREDIT_PACKAGE_LIST = Object.values(CREDIT_PACKAGES);

export function getCreditPackageById(packageId: string): CreditPackage | null {
  return CREDIT_PACKAGES[packageId as CreditPackageId] || null;
}
