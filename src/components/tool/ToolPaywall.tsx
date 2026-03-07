import { CREDIT_PACKAGE_LIST } from '@/lib/credits/packages';
import { CreditPackageId } from '@/types/billing';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type ToolPaywallProps = {
  loggedIn: boolean;
  email: string;
  onEmailChange: (value: string) => void;
  loadingPackageId: CreditPackageId | null;
  onCheckout: (packageId: CreditPackageId) => void;
};

export function ToolPaywall({
  loggedIn,
  email,
  onEmailChange,
  loadingPackageId,
  onCheckout,
}: ToolPaywallProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-300 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">You&apos;ve used your 2 free replies</p>
      <p className="text-sm text-slate-700">
        Buy credits to keep generating strategic client replies. No subscription required.
      </p>

      {!loggedIn ? (
        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-700">Email for checkout</span>
          <Input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@domain.com"
            className="border-slate-300"
          />
        </label>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2">
        {CREDIT_PACKAGE_LIST.map((pack) => (
          <div key={pack.id} className="rounded-lg border border-slate-300 bg-white p-3">
            <p className="text-sm font-semibold text-slate-900">{pack.name}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              ${(pack.priceUsdCents / 100).toFixed(0)}
            </p>
            <p className="text-xs text-slate-600">{pack.credits} replies</p>
            <Button
              type="button"
              size="sm"
              className="mt-3 w-full"
              variant={pack.id === 'pro_100' ? 'default' : 'outline'}
              onClick={() => onCheckout(pack.id)}
              disabled={loadingPackageId !== null}
            >
              {loadingPackageId === pack.id ? 'Redirecting...' : 'Buy credits'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
