import Stripe from 'stripe';

import { getStripeClient, getStripeWebhookSecret } from './stripe';

export async function verifyWebhookSignature(
  rawBody: string,
  signature: string
): Promise<Stripe.Event> {
  const stripe = await getStripeClient();
  const webhookSecret = await getStripeWebhookSecret();

  return stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
}
