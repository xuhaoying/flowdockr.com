import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import { describe, expect, it } from 'vitest';

import { getScenarioDetailContent } from './scenarioDetailContent';

describe('scenario detail content', () => {
  it('expands the discount request scenario with reply guidance', () => {
    const page = getScenarioPageBySlug('discount-request');

    expect(page).not.toBeNull();

    const content = getScenarioDetailContent(page!);

    expect(content.useWhen).toHaveLength(3);
    expect(content.notFor).toHaveLength(3);
    expect(content.steps).toHaveLength(3);
    expect(content.toneExamples.map((item) => item.tone)).toEqual([
      'Concise',
      'Warm',
      'Firm',
    ]);
    expect(content.faq).toHaveLength(3);
    expect(content.distinctions.map((item) => item.href)).toContain(
      '/pricing/client-asking-for-discount'
    );
  });

  it('expands canonicalized scenario variants without making them sitemap targets', () => {
    const tenPercentOff = getScenarioPageBySlug('ten-percent-off-request');
    const extraRevisionRounds = getScenarioPageBySlug('extra-revision-rounds');

    expect(tenPercentOff).not.toBeNull();
    expect(extraRevisionRounds).not.toBeNull();

    expect(getScenarioDetailContent(tenPercentOff!).distinctions[0].href).toBe(
      '/pricing/small-discount-before-closing'
    );
    expect(
      getScenarioDetailContent(extraRevisionRounds!).distinctions[0].href
    ).toBe('/pricing/client-requesting-additional-revisions');
  });

  it('falls back to generated detail content for non-overridden scenarios', () => {
    const page = getScenarioPageBySlug('quote-too-high');

    expect(page).not.toBeNull();

    const content = getScenarioDetailContent(page!, {
      exampleReply: 'Hold the value and ask what budget they need to hit.',
      avoid: ['Do not discount the same scope immediately.'],
    });

    expect(content.intentSummary).toContain(page!.searchIntentPrimary);
    expect(content.toneExamples[0].text).toBe(
      'Hold the value and ask what budget they need to hit.'
    );
    expect(content.mistakes).toEqual([
      'Do not discount the same scope immediately.',
    ]);
  });
});
