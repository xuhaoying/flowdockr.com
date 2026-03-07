import type { CreditPack } from '@/config/creditPacks';
import { envConfigs } from '@/config';
import { locales } from '@/config/locale';
import { getStripeClient } from '@/lib/stripe';

function sanitizeReturnPath(value: string | undefined): string {
  const trimmed = String(value || '').trim();
  if (!trimmed || !trimmed.startsWith('/') || trimmed.startsWith('//')) {
    return '/scenarios';
  }
  return trimmed;
}

function getLocalePrefixFromPath(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0] || '';
  return locales.includes(segment) ? `/${segment}` : '';
}

export async function createCheckoutSession(params: {
  userId: string;
  userEmail: string;
  purchaseId: string;
  pack: CreditPack;
  appOrigin?: string;
  returnTo?: string;
  scenarioSlug?: string;
  anonymousSessionId?: string;
}): Promise<{
  sessionId: string;
  checkoutUrl: string;
}> {
  const {
    userId,
    userEmail,
    purchaseId,
    pack,
    appOrigin = envConfigs.app_url,
    returnTo = '/scenarios',
    scenarioSlug = '',
    anonymousSessionId = '',
  } = params;

  if (!pack.stripePriceId) {
    throw new Error(`Stripe price id is missing for package ${pack.code}.`);
  }

  const stripe = await getStripeClient();
  const safeReturnTo = sanitizeReturnPath(returnTo);
  const localePrefix = getLocalePrefixFromPath(safeReturnTo);
  const safeOrigin = String(appOrigin || envConfigs.app_url || '').trim();
  if (!safeOrigin) {
    throw new Error('App origin is required for checkout session.');
  }

  const session = await stripe.checkout.sessions.create(
    {
      mode: 'payment',
      line_items: [
        {
          price: pack.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${safeOrigin}${localePrefix}/checkout/success?session_id={CHECKOUT_SESSION_ID}&purchase_id=${purchaseId}&return_to=${encodeURIComponent(safeReturnTo)}&scenario=${encodeURIComponent(scenarioSlug)}`,
      cancel_url: `${safeOrigin}${localePrefix}/checkout/canceled?return_to=${encodeURIComponent(safeReturnTo)}&scenario=${encodeURIComponent(scenarioSlug)}`,
      customer_email: userEmail,
      client_reference_id: purchaseId,
      metadata: {
        userId,
        purchaseId,
        packageId: pack.code,
        packCode: pack.code,
        credits: String(pack.credits),
        anonymousSessionId,
        scenarioSlug,
        returnTo: safeReturnTo,
        email: userEmail,
      },
    },
    {
      idempotencyKey: `checkout_session:${purchaseId}`,
    }
  );

  if (!session.url) {
    throw new Error('Checkout URL is missing.');
  }

  return {
    sessionId: session.id,
    checkoutUrl: session.url,
  };
}
