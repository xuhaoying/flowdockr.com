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
  title: 'Refund Policy | Flowdockr',
  description:
    'Refund policy for Flowdockr paid credit purchases, billing errors, and account access issues.',
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
          Flowdockr includes a free trial so users can test the product before
          buying paid credits.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Paid credit packs">
        <p>
          Paid Flowdockr plans are currently one-time credit-pack purchases, not
          automatically renewing subscriptions. Payment is processed through
          checkout, and access is delivered as credits inside the product.
        </p>
        <p>
          Purchases are generally final once credits are delivered or used,
          unless a refund is required by law or we choose to resolve a billing
          issue manually.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Refund requests">
        <p>
          If you believe there was a duplicate charge, checkout error, account
          access issue, or other billing problem, contact us as soon as possible
          through the Contact page.
        </p>
        <p>
          Include the purchase email, approximate purchase date, and a short
          description of the issue so we can investigate.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Contact">
        <p>
          Flowdockr is a product of {FLOWDOCKR_COMPANY_NAME}. Billing and refund
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
