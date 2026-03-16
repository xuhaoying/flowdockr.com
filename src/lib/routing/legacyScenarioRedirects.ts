export const LEGACY_SCENARIO_REDIRECTS: Record<string, string> = {
  'lowball-offer': '/scenario/quote-too-high',
  'client-asks-discount': '/scenario/discount-request',
  'cheaper-freelancer': '/scenario/cheaper-freelancer',
  'free-sample-work': '/pricing/free-trial-work-request',
  'more-work-same-budget': '/scenario/extra-work-outside-scope',
  'budget-limited': '/scenario/budget-limited',
  'delayed-decision': '/scenario/ghosted-after-rate',
  'small-extra-free': '/scenario/extra-work-outside-scope',
  'client-delays-payment': '/scenario',
  'invoice-follow-up': '/scenario',
  'price-objection': '/scenario/higher-than-expected',
  'extra-revisions': '/scenario/unlimited-revisions',
  'scope-creep': '/scenario/extra-work-outside-scope',
  'additional-features': '/scenario/extra-work-outside-scope',
  'rush-delivery': '/scenario',
  'timeline-pressure': '/scenario',
};

export function getLegacyScenariosHubRedirectPath(): string {
  return '/scenario';
}

export function getLegacyScenarioRedirectPath(slug: string): string {
  return LEGACY_SCENARIO_REDIRECTS[slug] || `/scenario/${slug}`;
}
