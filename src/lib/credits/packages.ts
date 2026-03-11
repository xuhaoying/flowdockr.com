import { creditPacks } from '@/config/creditPacks';
import { CreditPackage, CreditPackageId } from '@/types/billing';

export const CREDIT_PACKAGES: Record<CreditPackageId, CreditPackage> = creditPacks
  .filter((pack) => pack.active)
  .reduce(
    (acc, pack) => {
      acc[pack.code] = {
        id: pack.code,
        name: pack.name,
        supportLevel: pack.supportLevel,
        credits: pack.credits,
        priceUsdCents: pack.priceUsdCents,
        stripePriceId: pack.stripePriceId || '',
        active: pack.active,
        description: pack.description,
        tagline: pack.tagline,
        popular: pack.popular,
        badge: pack.badge,
        currency: pack.currency,
        ctaLabel: pack.ctaLabel,
        featureSummary: pack.featureSummary,
        advancedModeLabels: pack.advancedModeLabels,
        entitlements: pack.entitlements,
      };
      return acc;
    },
    {} as Record<CreditPackageId, CreditPackage>
  );

export const CREDIT_PACKAGE_LIST = Object.values(CREDIT_PACKAGES);

export function getCreditPackageById(packageId: string): CreditPackage | null {
  return CREDIT_PACKAGES[packageId as CreditPackageId] || null;
}
