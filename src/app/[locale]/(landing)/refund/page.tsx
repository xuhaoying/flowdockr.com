import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Refund Policy | FlowDockr',
  description:
    'Refund policy for FlowDockr paid credit purchases, billing errors, and account access issues.',
  canonicalUrl: '/refund',
});

export default async function RefundPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="Refund Policy"
      description={`${FLOWDOCKR_PRODUCT_NAME} offers free usage plus paid credit packs. This policy explains how refund requests are handled for paid purchases.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Free usage">
        <p>
          FlowDockr includes a free trial so users can test the product before
          buying paid credits.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Paid credit packs">
        <p>
          Paid FlowDockr plans are currently one-time credit-pack purchases, not
          automatically renewing subscriptions. Payment is processed through
          checkout, and access is delivered as credits inside the product.
        </p>
        <p>
          Purchases are generally final once credits are delivered or used,
          unless a refund is required by law or we choose to resolve a billing
          issue manually.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Refund eligibility">
        <p>
          Because FlowDockr is a digital product, used credits are generally not
          refundable. We review refund requests manually when there is a clear
          billing or access issue.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Duplicate charges are eligible for review and correction.</li>
          <li>
            Successful payments where credits were not delivered are eligible
            for correction or refund review.
          </li>
          <li>
            Unused paid credits may be reviewed for refund within 14 days of
            purchase.
          </li>
          <li>
            Credits that have already been used to generate outputs are
            generally final unless a refund is required by law or we decide
            otherwise after review.
          </li>
          <li>
            Abuse, fraud, chargeback misuse, prohibited use, or violation of the
            Terms of Service may make an account ineligible for voluntary
            refunds.
          </li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Digital delivery and no shipping">
        <p>
          FlowDockr sells digital software access only. After a successful
          checkout, credits are delivered to the user account and can be used in
          the product.
        </p>
        <p>
          We do not ship physical goods. There are no shipping fees, customs
          fees, freight timelines, or physical delivery obligations.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Refund requests">
        <p>
          If you believe there was a duplicate charge, checkout error, account
          access issue, or other billing problem, contact us as soon as possible
          through the Contact page. For unused-credit refund review, contact us
          within 14 days of purchase.
        </p>
        <p>
          Include the purchase email, approximate purchase date, and a short
          description of the issue so we can investigate.
        </p>
        <p>
          We aim to acknowledge billing requests within two business days.
          Approved refunds are returned to the original payment method through
          the payment processor when possible. If a refund is approved, related
          paid credits may be removed from the account.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Contact">
        <p>
          FlowDockr is a product of {FLOWDOCKR_COMPANY_NAME}. Billing and refund
          questions should be emailed to{' '}
          <a
            href={`mailto:${FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}
          </a>{' '}
          or sent through{' '}
          <Link
            href="/contact"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Contact
          </Link>
          .
        </p>
      </TrustSectionCard>
    </TrustPageLayout>
  );
}
