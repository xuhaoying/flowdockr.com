import { CREDIT_PACKAGE_LIST } from '@/lib/credits/packages';
import { CreditPackageId } from '@/types/billing';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';

type PaywallModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loggedIn: boolean;
  email: string;
  onEmailChange: (email: string) => void;
  checkoutLoadingPackageId: CreditPackageId | null;
  onCheckout: (packageId: CreditPackageId) => void;
};

export function PaywallModal(props: PaywallModalProps) {
  const {
    open,
    onOpenChange,
    loggedIn,
    email,
    onEmailChange,
    checkoutLoadingPackageId,
    onCheckout,
  } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>You&apos;ve used your 2 free replies</DialogTitle>
          <DialogDescription>
            Unlock more negotiation replies so you can respond with confidence when
            clients push on price, scope, or budget.
          </DialogDescription>
        </DialogHeader>

        {!loggedIn ? (
          <div className="space-y-2">
            <label htmlFor="checkout_email" className="text-sm font-medium">
              Email for checkout and account creation
            </label>
            <Input
              id="checkout_email"
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              placeholder="you@domain.com"
            />
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-3">
          {CREDIT_PACKAGE_LIST.map((pack) => (
            <div
              key={pack.id}
              className={`rounded-md border p-4 ${pack.id === 'pro_100' ? 'border-primary' : ''}`}
            >
              <p className="text-sm font-semibold">{pack.name}</p>
              <p className="mt-1 text-2xl font-bold">
                ${(pack.priceUsdCents / 100).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">{pack.credits} credits</p>
              {pack.id === 'pro_100' ? (
                <p className="mt-2 text-xs text-muted-foreground">Most popular</p>
              ) : null}
              <Button
                type="button"
                className="mt-3 w-full"
                variant={pack.id === 'pro_100' ? 'default' : 'outline'}
                onClick={() => onCheckout(pack.id)}
                disabled={checkoutLoadingPackageId !== null}
              >
                {checkoutLoadingPackageId === pack.id
                  ? 'Redirecting...'
                  : 'Unlock credits'}
              </Button>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">Pay once. Credits never expire.</p>
      </DialogContent>
    </Dialog>
  );
}
