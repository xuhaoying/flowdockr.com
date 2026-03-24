import { describe, expect, it } from 'vitest';

import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';

import {
  getLegacyScenarioRedirectPath,
  LEGACY_SCENARIO_REDIRECTS,
} from './legacyScenarioRedirects';

const DIRECT_REDIRECT_CASES = [
  ['price-too-high-response', 'quote-too-high'],
  ['out-of-budget-still-interested', 'out-of-budget-but-interested'],
  ['same-scope-lower-budget', 'same-scope-lower-price'],
  ['no-response-after-proposal-email', 'no-response-after-proposal'],
  ['stopped-replying-after-quote', 'no-response-after-proposal'],
  ['no-response-after-contract-sent', 'contract-sent-no-response'],
  ['rate-before-project-details', 'price-before-scope'],
  ['final-price-before-signing', 'best-price-before-signing'],
  ['client-delays-payment', 'ask-for-payment-politely'],
  ['late-payment', 'final-payment-reminder'],
  ['invoice-follow-up', 'overdue-invoice-no-response'],
] as const;

describe('legacy scenario redirects', () => {
  it('maps the approved direct redirect group to canonical scenario routes', () => {
    for (const [oldSlug, newSlug] of DIRECT_REDIRECT_CASES) {
      expect(LEGACY_SCENARIO_REDIRECTS[oldSlug]).toBe(`/scenario/${newSlug}`);
      expect(getLegacyScenarioRedirectPath(oldSlug)).toBe(
        `/scenario/${newSlug}`
      );
      expect(getLegacyScenarioRedirectPath(oldSlug)).not.toBe(
        `/scenario/${oldSlug}`
      );
    }
  });

  it('points every redirect target at an existing canonical scenario page', () => {
    for (const [, canonicalSlug] of DIRECT_REDIRECT_CASES) {
      expect(getScenarioPageBySlug(canonicalSlug)?.slug).toBe(canonicalSlug);
    }
  });
});
