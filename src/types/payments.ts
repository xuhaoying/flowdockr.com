import type { BillingSupportLevel, CreditPackCode } from '@/types/billing';
import type { PricingScenarioAttributionSeedInput } from '@/types/pricing-analytics';

export type PurchaseStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'canceled'
  | 'refunded';

export type CreateCheckoutSessionRequest = {
  packCode: CreditPackCode;
  pricingAttribution?: PricingScenarioAttributionSeedInput;
};

export type CreateCheckoutSessionResponse = {
  success: boolean;
  checkoutUrl?: string;
  purchaseId?: string;
  error?: string;
};

export type CheckoutStatusResponse = {
  success: boolean;
  status?: PurchaseStatus;
  creditsGranted?: boolean;
  creditsAdded?: number;
  creditsRemaining?: number;
  supportLevel?: BillingSupportLevel;
  purchasedPlan?: string;
  pricingAttribution?: PricingScenarioAttributionSeedInput;
  error?: string;
};

export type PurchaseRecord = {
  id: string;
  userId: string;
  packCode: CreditPackCode;
  credits: number;
  amountCents: number;
  currency: string;
  stripeCheckoutSessionId?: string;
  stripePaymentIntentId?: string;
  stripeEventId?: string;
  status: PurchaseStatus;
  creditsGranted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreditLedgerEntry = {
  id: string;
  userId: string;
  delta: number;
  reason: 'purchase' | 'generation' | 'admin_adjustment' | 'refund_reversal';
  purchaseId?: string;
  generationId?: string;
  note?: string;
  createdAt: string;
};
