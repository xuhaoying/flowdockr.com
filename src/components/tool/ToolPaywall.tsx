import { CREDIT_PACKAGE_LIST } from '@/lib/credits/packages';
import { CreditPackageId } from '@/types/billing';

import { Button } from '@/shared/components/ui/button';

type ToolPaywallProps = {
  loggedIn: boolean;
  loadingPackageId: CreditPackageId | null;
  onCheckout: (packageId: CreditPackageId) => void;
};

export function ToolPaywall({
  loggedIn,
  loadingPackageId,
  onCheckout,
}: ToolPaywallProps) {
  return (
    <div className="border-brand-lavender/30 bg-brand-bg/70 space-y-4 rounded-[18px] border p-4 sm:p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Keep generating
        </p>
        <p className="text-sm font-semibold text-slate-900">
          You&apos;ve used your 2 free message drafts
        </p>
        <p className="text-sm leading-6 text-slate-700">
          Buy a one-time pack to keep drafting replies, generate more useful
          variations, and unlock richer reply help when you need it. No
          subscription required.
        </p>
      </div>

      <ul className="grid gap-2 text-xs text-slate-600 md:grid-cols-3">
        <li className="border-brand-lavender/20 rounded-xl border bg-white px-3 py-2">
          More send-ready drafts
        </li>
        <li className="border-brand-lavender/20 rounded-xl border bg-white px-3 py-2">
          Extra reply variations
        </li>
        <li className="border-brand-lavender/20 rounded-xl border bg-white px-3 py-2">
          Follow-up and deeper guidance
        </li>
      </ul>

      {!loggedIn ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Sign in before checkout so purchased credits can be attached to your
          account.
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-3">
        {CREDIT_PACKAGE_LIST.map((pack) => (
          <div
            key={pack.id}
            className={`rounded-[18px] border bg-white p-4 shadow-xs ${
              pack.popular ? 'border-brand-primary' : 'border-brand-lavender/35'
            }`}
          >
            <p className="text-sm font-semibold text-slate-900">{pack.name}</p>
            {pack.badge ? (
              <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                {pack.badge}
              </p>
            ) : null}
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ${(pack.priceUsdCents / 100).toFixed(0)}
            </p>
            <p className="text-xs text-slate-600">
              {pack.credits} message credits
            </p>
            <p className="mt-2 text-xs text-slate-600">{pack.description}</p>
            <Button
              type="button"
              size="sm"
              className="mt-4 min-h-11 w-full rounded-lg"
              variant={pack.popular ? 'default' : 'outline'}
              onClick={() => onCheckout(pack.id)}
              disabled={!loggedIn || loadingPackageId !== null}
            >
              {loadingPackageId === pack.id
                ? 'Redirecting...'
                : loggedIn
                  ? pack.ctaLabel || 'Buy credits'
                  : 'Sign in to buy'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
