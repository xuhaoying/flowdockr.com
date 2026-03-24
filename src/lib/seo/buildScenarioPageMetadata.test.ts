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

  it('builds metadata from the strengthened high-value pages without changing canonical routing', () => {
    const paymentPage = getScenarioPageBySlug('final-payment-reminder');
    const pricingPage = getScenarioPageBySlug('meet-their-budget');
    const depositPage = getScenarioPageBySlug('deposit-not-paid-yet');

    const paymentMetadata = buildScenarioPageMetadata({
      page: {
        title: paymentPage!.title,
        metaTitle: paymentPage!.metaTitle,
        metaDescription: paymentPage!.metaDescription!,
      },
      canonical: 'https://www.flowdockr.com/scenario/final-payment-reminder',
    });
    const pricingMetadata = buildScenarioPageMetadata({
      page: {
        title: pricingPage!.title,
        metaTitle: pricingPage!.metaTitle,
        metaDescription: pricingPage!.metaDescription!,
      },
      canonical: 'https://www.flowdockr.com/scenario/meet-their-budget',
    });
    const depositMetadata = buildScenarioPageMetadata({
      page: {
        title: depositPage!.title,
        metaTitle: depositPage!.metaTitle,
        metaDescription: depositPage!.metaDescription!,
      },
      canonical: 'https://www.flowdockr.com/scenario/deposit-not-paid-yet',
    });

    expect(paymentMetadata.title).toBe(
      'Final Payment Reminder Before You Escalate | Flowdockr'
    );
    expect(paymentMetadata.description).toBe(
      'Use this scenario when earlier reminders failed and you need a final payment message that sets a deadline, asks for a concrete answer, and still sounds professional.'
    );
    expect(paymentMetadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/final-payment-reminder'
    );

    expect(pricingMetadata.title).toBe(
      'Can You Meet Their Budget Without Undercutting the Scope? | Flowdockr'
    );
    expect(pricingMetadata.description).toBe(
      'Use this scenario when a client gives you a real budget cap and asks if you can make it work. Draft a reply that protects your pricing logic and offers a scoped alternative instead of squeezing the same work into a smaller fee.'
    );
    expect(pricingMetadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/meet-their-budget'
    );

    expect(depositMetadata.title).toBe(
      'Deposit Still Not Paid? What to Say Before Kickoff | Flowdockr'
    );
    expect(depositMetadata.description).toBe(
      'Use this scenario when the kickoff deposit was promised but still has not arrived. Follow up clearly and keep the start-after-payment boundary intact without sounding awkward.'
    );
    expect(depositMetadata.alternates?.canonical).toBe(
      'https://www.flowdockr.com/scenario/deposit-not-paid-yet'
    );
  });
});
