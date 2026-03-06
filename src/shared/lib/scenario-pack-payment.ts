import Stripe from 'stripe';

import { getAllConfigs } from '@/shared/models/config';

async function getStripeSecretKey(): Promise<string> {
  const envSecret = String(process.env.STRIPE_SECRET_KEY || '').trim();
  if (envSecret) {
    return envSecret;
  }

  const configs = await getAllConfigs();
  const configSecret = String(
    configs.stripe_secret_key || configs.STRIPE_SECRET_KEY || ''
  ).trim();
  if (configSecret) {
    return configSecret;
  }

  throw new Error('Stripe secret key is not configured.');
}

export async function getScenarioPackStripeClient(): Promise<Stripe> {
  const secretKey = await getStripeSecretKey();

  return new Stripe(secretKey, {
    httpClient: Stripe.createFetchHttpClient(),
  });
}
