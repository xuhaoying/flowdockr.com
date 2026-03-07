import Stripe from 'stripe';

import { getAllConfigs } from '@/shared/models/config';

let stripeClient: Stripe | null = null;

function normalizeSecret(value: string | undefined | null): string {
  return String(value || '').trim();
}

export async function getStripeSecretKey(): Promise<string> {
  const envSecret = normalizeSecret(process.env.STRIPE_SECRET_KEY);
  if (envSecret) {
    return envSecret;
  }

  const configs = await getAllConfigs();
  const configSecret = normalizeSecret(configs.stripe_secret_key);
  if (configSecret) {
    return configSecret;
  }

  throw new Error('Stripe secret key is not configured.');
}

export async function getStripeWebhookSecret(): Promise<string> {
  const envSecret = normalizeSecret(process.env.STRIPE_WEBHOOK_SECRET);
  if (envSecret) {
    return envSecret;
  }

  const configs = await getAllConfigs();
  const configSecret = normalizeSecret(configs.stripe_signing_secret);
  if (configSecret) {
    return configSecret;
  }

  throw new Error('Stripe webhook secret is not configured.');
}

export async function getStripeClient(): Promise<Stripe> {
  if (stripeClient) {
    return stripeClient;
  }

  const secretKey = await getStripeSecretKey();
  stripeClient = new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  return stripeClient;
}
