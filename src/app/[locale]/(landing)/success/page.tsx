import { eq } from 'drizzle-orm';
import { setRequestLocale } from 'next-intl/server';

import { CheckoutCompletedTracker } from '@/components/tool';
import { Link } from '@/core/i18n/navigation';
import { db, purchase } from '@/lib/db';
import { getMetadata } from '@/shared/lib/seo';
import { Button } from '@/shared/components/ui/button';

export const generateMetadata = getMetadata({
  title: 'Payment successful | Flowdockr',
  description: 'Your Flowdockr credits were added successfully.',
  canonicalUrl: '/success',
  noIndex: true,
});

function sanitizeReturnPath(value: string | undefined): string {
  const fallback = '/scenarios';
  const raw = String(value || '').trim();
  if (!raw) {
    return fallback;
  }

  if (!raw.startsWith('/')) {
    return fallback;
  }

  if (raw.startsWith('//')) {
    return fallback;
  }

  return raw;
}

export default async function SuccessPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    session_id?: string;
    return_to?: string;
    scenario?: string;
  }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const sessionId = String(query.session_id || '').trim();
  const returnTo = sanitizeReturnPath(query.return_to);
  const scenarioSlug = String(query.scenario || '').trim();

  const [checkoutPurchase] = sessionId
    ? await db()
        .select({
          email: purchase.email,
          creditsGranted: purchase.creditsGranted,
          status: purchase.status,
        })
        .from(purchase)
        .where(eq(purchase.stripeCheckoutSessionId, sessionId))
        .limit(1)
    : [];

  const continuePath =
    returnTo || (scenarioSlug ? `/scenarios/${scenarioSlug}` : '/scenarios');

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <CheckoutCompletedTracker scenarioSlug={scenarioSlug} />

      <section className="space-y-4 rounded-lg border p-6">
        <h1 className="text-3xl font-semibold tracking-tight">Payment successful</h1>
        <p className="text-muted-foreground">
          Your credits have been added to your Flowdockr account.
        </p>
        <p className="text-muted-foreground">
          We&apos;ve also sent a secure sign-in link to your email.
        </p>

        {checkoutPurchase ? (
          <div className="rounded-md border bg-muted/30 p-4 text-sm">
            <p>
              <span className="font-semibold">Credits added:</span>{' '}
              {checkoutPurchase.creditsGranted}
            </p>
            <p>
              <span className="font-semibold">Receipt email:</span>{' '}
              {checkoutPurchase.email}
            </p>
          </div>
        ) : null}

        <Button asChild>
          <Link href={continuePath}>Continue generating replies</Link>
        </Button>
      </section>
    </main>
  );
}
