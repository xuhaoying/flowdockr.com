import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_JURISDICTION,
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  FLOWDOCKR_PROHIBITED_USE_ITEMS,
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Terms of Service | FlowDockr',
  description:
    'Terms of Service for FlowDockr, an AI negotiation assistant operated by Auralis Labs LLC.',
  canonicalUrl: '/terms',
});

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="Terms of Service"
      description={`${FLOWDOCKR_PRODUCT_NAME} is a software product of ${FLOWDOCKR_COMPANY_NAME}. These terms explain how the service works, the limits of AI-generated communication support, and the practical rules for using the product.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Use of service, acceptable use, and eligibility">
        <p>
          You may use FlowDockr only for lawful business or professional
          communication workflows. You must be at least 18 years old and able to
          enter a binding agreement to use paid features.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Do not use the service to break the law or violate another
            party&apos;s rights.
          </li>
          <li>Do not submit material you are not allowed to share with us.</li>
          <li>
            Do not misuse, scrape, resell, or interfere with the platform.
          </li>
          <li>
            Do not use FlowDockr for debt settlement, debt negotiation, debt
            collection, lending, money transmission, investment advice, legal
            advice, tax advice, harassment, deception, impersonation, spam, or
            unlawful activity.
          </li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Restricted businesses and prohibited use">
        <p>
          FlowDockr is available only for lawful professional communication and
          business drafting support. You may not use the service to operate,
          promote, facilitate, or disguise activity in prohibited or restricted
          categories.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          {FLOWDOCKR_PROHIBITED_USE_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          We may block checkout, suspend access, revoke credits, or refuse
          service when an account creates payment processor, banking, platform,
          legal, security, or operational risk.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="AI-generated content disclaimer">
        <p>
          FlowDockr generates draft replies and communication suggestions. You
          are responsible for reviewing, editing, and deciding whether any
          output is appropriate for your client, contract, or business context.
        </p>
        <p>
          FlowDockr provides communication support, not legal, tax, investment,
          or financial advice, and it does not guarantee any business outcome.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="User accounts">
        <p>
          Some features require an account. You are responsible for keeping
          account details accurate, protecting your credentials, and all
          activity that happens under your account.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Payments, credits, and subscriptions">
        <p>
          FlowDockr currently offers free usage plus one-time paid credit packs
          in USD. Purchases are processed through checkout and delivered as
          credits inside the product. The public checkout flow does not
          currently run as an auto-renewing subscription.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Credits are for use inside FlowDockr only and have no cash value.
          </li>
          <li>
            Prices, credit amounts, and feature access may change over time.
          </li>
          <li>
            FlowDockr sells digital software access only and does not ship
            physical goods.
          </li>
          <li>
            Purchases are generally final unless a refund is required by law or
            we choose to resolve a billing issue manually.
          </li>
        </ul>
        <p>
          See our{' '}
          <Link
            href="/refund"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Refund Policy
          </Link>{' '}
          for more detail.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Business activity and compliance boundaries">
        <p>
          FlowDockr is a professional communication software product, not a
          regulated financial, legal, tax, or debt service. The product does not
          hold or transmit user funds, issue credit, provide banking, broker
          financial products, negotiate consumer debts, or act on behalf of
          users in any client relationship.
        </p>
        <p>
          You remain responsible for your contracts, invoices, client
          communications, business decisions, and any professional advice you
          choose to obtain from qualified advisers.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Termination or suspension">
        <p>
          You may stop using the service at any time. We may suspend or end
          access if the service is misused, if an account creates security or
          operational risk, or if we need to comply with legal obligations.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Limitation of liability">
        <p>
          FlowDockr is provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis. To the fullest extent permitted by law, we
          disclaim warranties of uninterrupted availability, fitness for a
          particular purpose, and non-infringement.
        </p>
        <p>
          To the fullest extent permitted by law, we are not liable for
          indirect, incidental, special, consequential, or punitive damages
          arising from your use of the service.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Governing law and dispute handling">
        <p>
          These terms are governed by the laws that apply to{' '}
          {FLOWDOCKR_COMPANY_NAME} and its jurisdiction of organization,{' '}
          {FLOWDOCKR_COMPANY_JURISDICTION}, without regard to conflict-of-law
          rules.
        </p>
        <p>
          Before filing a formal claim, please contact us first through{' '}
          <Link
            href="/contact"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            /contact
          </Link>{' '}
          so we can try to resolve the issue informally.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Changes to terms">
        <p>
          We may update these terms from time to time. When we do, we will
          publish the updated version here and update the effective date above.
          Continued use of the service after an update means you accept the
          revised terms.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Contact">
        <p>
          FlowDockr is a product of {FLOWDOCKR_COMPANY_NAME}. For support,
          billing, privacy, or legal questions, email{' '}
          <a
            href={`mailto:${FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}
          </a>{' '}
          or use{' '}
          <Link
            href="/contact"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            /contact
          </Link>
          .
        </p>
      </TrustSectionCard>
    </TrustPageLayout>
  );
}
