export const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'lowball-offer': '/scenario/quote-too-high',
  'client-asks-discount': '/scenario/discount-request',
  'cheaper-freelancer': '/scenario/cheaper-freelancer',
  'free-sample-work': '/pricing/free-trial-work-request',
  'more-work-same-budget': '/scenario/extra-work-outside-scope',
  'budget-limited': '/scenario/budget-limited',
  'delayed-decision': '/scenario/ghosted-after-rate',
  'small-extra-free': '/scenario/extra-work-outside-scope',
  'client-delays-payment': '/scenario/ask-for-payment-politely',
  'late-payment': '/scenario/final-payment-reminder',
  'invoice-follow-up': '/scenario/overdue-invoice-no-response',
  'price-objection': '/scenario/higher-than-expected',
  'extra-revisions': '/scenario/unlimited-revisions',
  'scope-creep': '/scenario/extra-work-outside-scope',
  'additional-features': '/scenario/extra-work-outside-scope',
  'rush-delivery': '/scenario',
  'timeline-pressure': '/scenario',
  'price-too-high-response': '/scenario/quote-too-high',
  'out-of-budget-still-interested': '/scenario/out-of-budget-but-interested',
  'same-scope-lower-budget': '/scenario/same-scope-lower-price',
  'no-response-after-proposal-email': '/scenario/no-response-after-proposal',
  'stopped-replying-after-quote': '/scenario/no-response-after-proposal',
  'no-response-after-contract-sent': '/scenario/contract-sent-no-response',
  'rate-before-project-details': '/scenario/price-before-scope',
  'final-price-before-signing': '/scenario/best-price-before-signing',
};

export function getLegacyScenariosHubRedirectPath(): string {
  return '/scenario';
}

export function getLegacyScenarioRedirectPath(slug: string): string {
  return LEGACY_SCENARIO_REDIRECTS[slug] || `/scenario/${slug}`;
}
