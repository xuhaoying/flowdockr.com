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
    <div className="space-y-4 rounded-[18px] border border-slate-300 bg-slate-50/80 p-4 sm:p-5">
      <div className="space-y-1">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Keep generating
        </p>
        <p className="text-sm font-semibold text-slate-900">
          You&apos;ve used your 2 free negotiation drafts
        </p>
        <p className="text-sm leading-6 text-slate-700">
          Buy a one-time pack to keep drafting replies, generate more useful
          variations, and unlock richer negotiation help when you need it. No
          subscription required.
        </p>
      </div>

      <ul className="grid gap-2 text-xs text-slate-600 md:grid-cols-3">
        <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
          More send-ready drafts
        </li>
        <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
          Extra reply variations
        </li>
        <li className="rounded-xl border border-slate-200 bg-white px-3 py-2">
          Follow-up and deeper guidance
        </li>
      </ul>

      {!loggedIn ? (
        <label className="block space-y-1">
          <span className="text-xs font-medium text-slate-700">
            Email for checkout
          </span>
          <Input
            type="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            placeholder="you@domain.com"
            className="h-11 rounded-xl border-slate-300 shadow-xs"
          />
        </label>
      ) : null}

      <div className="grid gap-3 md:grid-cols-3">
        {CREDIT_PACKAGE_LIST.map((pack) => (
          <div
            key={pack.id}
            className={`rounded-[18px] border bg-white p-4 shadow-xs ${
              pack.popular ? 'border-slate-900' : 'border-slate-300'
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
              {pack.credits} negotiation credits
            </p>
            <p className="mt-2 text-xs text-slate-600">{pack.description}</p>
            <Button
              type="button"
              size="sm"
              className="mt-4 h-9 w-full rounded-lg"
              variant={pack.popular ? 'default' : 'outline'}
              onClick={() => onCheckout(pack.id)}
              disabled={loadingPackageId !== null}
            >
              {loadingPackageId === pack.id
                ? 'Redirecting...'
                : pack.ctaLabel || 'Buy credits'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
