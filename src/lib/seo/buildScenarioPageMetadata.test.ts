import { describe, expect, it } from 'vitest';

import { buildScenarioPageMetadata } from './buildScenarioPageMetadata';

describe('buildScenarioPageMetadata', () => {
  it('uses the explicit scenario SEO title and description across metadata surfaces', () => {
    const metadata = buildScenarioPageMetadata({
      page: {
        title: 'Client says your quote is too high',
        metaTitle:
          'Client Says Your Quote Is Too High? What to Say Next | Flowdockr',
        metaDescription:
          'Use this scenario to draft a calm reply when a client says your quote is too high.',
      },
      canonical: 'https://www.flowdockr.com/scenario/quote-too-high',
    });

    expect(metadata.title).toBe(
      'Client Says Your Quote Is Too High? What to Say Next | Flowdockr'
    );
    expect(metadata.description).toBe(
      'Use this scenario to draft a calm reply when a client says your quote is too high.'
    );
    expect(metadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/quote-too-high'
    );
    expect(metadata.openGraph?.title).toBe(metadata.title);
    expect(metadata.twitter?.title).toBe(metadata.title);
  });

  it('falls back to the canonical page title when no custom SEO title exists', () => {
    const metadata = buildScenarioPageMetadata({
      page: {
        title: 'Client asks for a discount',
        metaDescription:
          'Use this scenario to reply when a client asks for a discount.',
      },
      canonical: 'https://www.flowdockr.com/scenario/discount-request',
    });

    expect(metadata.title).toBe('Client asks for a discount | Flowdockr');
    expect(metadata.description).toBe(
      'Use this scenario to reply when a client asks for a discount.'
    );
  });
});
