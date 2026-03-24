import { describe, expect, it } from 'vitest';

import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';

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

  it('builds metadata from the strengthened cluster pages without changing canonical routing', () => {
    const paymentPage = getScenarioPageBySlug('second-payment-reminder');
    const pricingPage = getScenarioPageBySlug('meet-their-budget');

    const paymentMetadata = buildScenarioPageMetadata({
      page: {
        title: paymentPage!.title,
        metaTitle: paymentPage!.metaTitle,
        metaDescription: paymentPage!.metaDescription!,
      },
      canonical: 'https://www.flowdockr.com/scenario/second-payment-reminder',
    });
    const pricingMetadata = buildScenarioPageMetadata({
      page: {
        title: pricingPage!.title,
        metaTitle: pricingPage!.metaTitle,
        metaDescription: pricingPage!.metaDescription!,
      },
      canonical: 'https://www.flowdockr.com/scenario/meet-their-budget',
    });

    expect(paymentMetadata.title).toBe(
      'Second Payment Reminder for a Client | Flowdockr'
    );
    expect(paymentMetadata.description).toBe(
      'Use this scenario when you already sent one payment reminder and still have not been paid. Write a firmer second reminder that stays professional.'
    );
    expect(paymentMetadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/second-payment-reminder'
    );

    expect(pricingMetadata.title).toBe(
      'Client Asks if You Can Meet Their Budget | Flowdockr'
    );
    expect(pricingMetadata.description).toBe(
      'Use this scenario when a client gives you a real budget cap and asks if you can make it work. Protect the original scope logic and offer a cleaner alternative if needed.'
    );
    expect(pricingMetadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/meet-their-budget'
    );
  });
});
