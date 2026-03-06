'use client';

import { useState } from 'react';

import { trackEvent } from '@/lib/analytics-client';
import { CREDIT_PACKAGE_LIST } from '@/lib/credits';
import { CreditPackageId } from '@/types/billing';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type PricingPacksProps = {
  scenarioSlug?: string;
};

export function PricingPacks({ scenarioSlug = '' }: PricingPacksProps) {
  const [email, setEmail] = useState('');
  const [loadingPackageId, setLoadingPackageId] = useState<CreditPackageId | null>(
    null
  );
  const [error, setError] = useState('');

  const startCheckout = async (packageId: CreditPackageId) => {
    setLoadingPackageId(packageId);
    setError('');

    try {
      trackEvent('checkout_started', {
        scenarioSlug,
      });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          email: email.trim() || undefined,
          scenarioSlug: scenarioSlug || undefined,
          returnTo: '/scenarios',
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
        checkoutUrl?: string;
      };

      if (!response.ok || !payload.ok || !payload.checkoutUrl) {
        throw new Error(payload.message || 'Failed to create checkout.');
      }

      window.location.assign(payload.checkoutUrl);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Failed to create checkout.'
      );
    } finally {
      setLoadingPackageId(null);
    }
  };

  return (
    <section className="space-y-4">
      <div className="max-w-lg space-y-2">
        <label htmlFor="pricing_email" className="text-sm font-medium">
          Email for checkout and account access
        </label>
        <Input
          id="pricing_email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@domain.com"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {CREDIT_PACKAGE_LIST.map((pack) => (
          <article
            key={pack.id}
            className={`rounded-lg border p-5 ${pack.id === 'pro_50' ? 'border-primary' : ''}`}
          >
            <h3 className="text-lg font-semibold">{pack.name}</h3>
            <p className="mt-2 text-3xl font-bold">
              ${(pack.priceUsdCents / 100).toFixed(0)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{pack.credits} credits</p>
            {pack.id === 'pro_50' ? (
              <p className="mt-2 text-xs text-muted-foreground">Most popular</p>
            ) : null}

            <Button
              className="mt-4 w-full"
              variant={pack.id === 'pro_50' ? 'default' : 'outline'}
              onClick={() => startCheckout(pack.id)}
              disabled={loadingPackageId !== null}
            >
              {loadingPackageId === pack.id ? 'Redirecting...' : 'Buy credits'}
            </Button>
          </article>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">Pay once. Credits never expire.</p>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </section>
  );
}
