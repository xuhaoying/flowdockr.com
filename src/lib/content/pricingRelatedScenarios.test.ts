import { describe, expect, it } from 'vitest';

import { getPricingRelatedScenarioScripts } from './pricingRelatedScenarios';

describe('pricing related scenario scripts', () => {
  it('links discount pricing pages back to concrete scenario scripts', () => {
    const items = getPricingRelatedScenarioScripts(
      'client-asking-for-discount',
      'discount-request'
    );

    expect(items.map((item) => item.href)).toEqual([
      '/scenario/discount-request',
      '/scenario/ten-percent-off-request',
      '/scenario/meet-their-budget',
    ]);
  });

  it('links scope pricing pages back to scope-control scenarios', () => {
    const items = getPricingRelatedScenarioScripts(
      'client-asking-for-extra-work',
      'extra-work-outside-scope'
    );

    expect(items.map((item) => item.href)).toEqual([
      '/scenario/extra-work-outside-scope',
      '/scenario/scope-creep-polite-response',
      '/scenario/adding-small-requests',
    ]);
  });

  it('falls back to the generator scenario when no explicit mapping exists', () => {
    const items = getPricingRelatedScenarioScripts(
      'stand-firm-on-pricing',
      'discount-request'
    );

    expect(items.map((item) => item.href)).toEqual([
      '/scenario/discount-request',
    ]);
  });
});
