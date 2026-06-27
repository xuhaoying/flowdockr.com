import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_JURISDICTION,
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  FLOWDOCKR_PROHIBITED_USE_ITEMS,
  FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS,
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Business and Compliance | FlowDockr',
  description:
    'Business verification details for FlowDockr, a digital SaaS product operated by Auralis Labs LLC.',
  canonicalUrl: '/compliance',
});

export default async function CompliancePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="Business and Compliance"
      description={`${FLOWDOCKR_PRODUCT_NAME} is a digital software product operated by ${FLOWDOCKR_COMPANY_NAME}. This page summarizes the business model, product scope, payment flow, and compliance boundaries for customers, payment processors, banking partners, and platform reviewers.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Business identity">
        <p>
          FlowDockr is owned and operated by {FLOWDOCKR_COMPANY_NAME}. The
          product is a commercial SaaS tool for professional client
          communication and negotiation preparation.
        </p>
        <p>
          Business jurisdiction: {FLOWDOCKR_COMPANY_JURISDICTION}.{' '}
          {FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS
            ? `Public business mailing address: ${FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS}.`
            : 'Registered business details and mailing address are provided through official banking, payment processor, tax, or compliance review workflows when required.'}
        </p>
        <p>
          Customer support, billing, privacy, and legal requests can be sent to{' '}
          <a
            href={`mailto:${FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}
          </a>
          . Ownership information, tax records, EIN records, control-person
          details, and banking verification documents are provided directly
          through official review workflows rather than published on the
          marketing site.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Product scope">
        <p>
          FlowDockr provides AI-assisted communication support for
          professionals. Users paste a client message or describe a business
          situation, then receive draft reply language, strategy notes, risk
          reminders, and follow-up guidance that they must review before use.
        </p>
        <p>
          The product is focused on commercial client communication: pricing
          pushback, scope boundaries, payment follow-ups, proposal objections,
          awkward client replies, and similar professional conversations.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="What FlowDockr is not">
        <p>
          FlowDockr is not a financial institution, lender, broker, money
          transmitter, debt settlement service, debt negotiation service, credit
          repair service, investment adviser, law firm, or tax adviser.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>We do not move, hold, or transmit customer funds.</li>
          <li>
            We do not provide loans, credit, investment products, or banking.
          </li>
          <li>
            We do not negotiate debts, collect consumer debt, or settle debts on
            behalf of users.
          </li>
          <li>
            We do not guarantee commercial outcomes, client payment, contract
            results, or legal enforceability.
          </li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Payments and delivery">
        <p>
          FlowDockr sells digital access and one-time credit packs in USD.
          Checkout is handled by a payment processor such as Stripe when
          enabled. FlowDockr does not store full card numbers. After a
          successful checkout, credits are delivered inside the user account and
          can be used to generate additional replies and negotiation support.
        </p>
        <p>
          Taxes, payment method availability, and processor-specific checkout
          details are shown in checkout when applicable. The public checkout
          flow currently uses one-time payments, not auto-renewing
          subscriptions.
        </p>
        <p>
          FlowDockr does not ship physical goods. There are no shipping fees,
          customs charges, freight timelines, or physical delivery obligations.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Customer policies">
        <p>Public customer policies are available before purchase:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <Link
              href="/pricing"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Pricing
            </Link>{' '}
            explains free usage, one-time credit packs, and checkout.
          </li>
          <li>
            <Link
              href="/refund"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Refund Policy
            </Link>{' '}
            explains duplicate charges, access issues, and billing review.
          </li>
          <li>
            <Link
              href="/terms"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Terms of Service
            </Link>{' '}
            explains acceptable use and product limitations.
          </li>
          <li>
            <Link
              href="/privacy"
              className="font-medium text-slate-900 underline underline-offset-2"
            >
              Privacy Policy
            </Link>{' '}
            explains account data, payment metadata, processors, and privacy
            requests.
          </li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Restricted use controls">
        <p>
          Users may only use FlowDockr for lawful professional communication.
          The service must not be used for illegal activity, regulated financial
          services, debt settlement, harassment, deception, impersonation, spam,
          or other prohibited activity.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {FLOWDOCKR_PROHIBITED_USE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          We may suspend access or refuse service if usage creates payment,
          banking, platform, legal, security, or operational risk.
        </p>
      </TrustSectionCard>
    </TrustPageLayout>
  );
}
