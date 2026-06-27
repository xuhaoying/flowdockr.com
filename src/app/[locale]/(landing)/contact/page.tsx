import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import { getPublicContactDetails } from '@/lib/publicContact';
import {
  FLOWDOCKR_COMPANY_JURISDICTION,
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS,
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Contact FlowDockr Support | Auralis Labs LLC',
  description:
    'Contact FlowDockr for support, billing, privacy, and legal requests. FlowDockr is operated by Auralis Labs LLC.',
  canonicalUrl: '/contact',
});

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { supportEmail, privacyEmail } = await getPublicContactDetails();
  const publicSupportEmail = supportEmail || FLOWDOCKR_PUBLIC_SUPPORT_EMAIL;
  const publicPrivacyEmail = privacyEmail || publicSupportEmail;

  return (
    <TrustPageLayout
      title="Contact"
      description={`${FLOWDOCKR_PRODUCT_NAME} keeps support, billing, privacy, and legal contact intentionally simple. Requests are handled directly by ${FLOWDOCKR_COMPANY_NAME}.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Support and billing">
        <p>
          For account access, credits, checkout, or billing issues, email us at{' '}
          <a
            href={`mailto:${publicSupportEmail}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {publicSupportEmail}
          </a>
          .
        </p>
        <p>
          We handle support and billing questions manually, so include enough
          detail for us to locate the account or purchase.
        </p>
        <p>
          We aim to respond to support and billing messages within two business
          days. Complex billing, payment processor, or account ownership issues
          may require additional verification before resolution.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Privacy and legal inquiries">
        <p>
          For privacy, deletion, or legal questions, email{' '}
          <a
            href={`mailto:${publicPrivacyEmail}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {publicPrivacyEmail}
          </a>
          .
        </p>
        <p>
          Please include enough context for us to understand the request and
          route it correctly.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Company">
        <p>
          {FLOWDOCKR_PRODUCT_NAME} is built and operated by{' '}
          {FLOWDOCKR_COMPANY_NAME}.
        </p>
        <p>
          Business owner/operator: {FLOWDOCKR_COMPANY_NAME}. FlowDockr provides
          AI-assisted negotiation preparation, reply drafting, and communication
          workflow support for professionals.
        </p>
        <p>
          Business jurisdiction: {FLOWDOCKR_COMPANY_JURISDICTION}.{' '}
          {FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS
            ? `Public business mailing address: ${FLOWDOCKR_PUBLIC_BUSINESS_ADDRESS}.`
            : 'Registered mailing address and verification records are supplied through official review workflows when required.'}
        </p>
        <p>
          Registered business details, mailing address, and verification
          documents can be provided through official banking, payment processor,
          or compliance workflows when required.
        </p>
        <p>
          FlowDockr sells digital software access only. It does not ship
          physical goods, transmit money, provide loans, or provide debt
          settlement, legal, tax, investment, or financial advisory services.
        </p>
        <p>
          For product rules and data handling details, see our{' '}
          <Link
            href="/terms"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="/privacy"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          For a concise reviewer summary, see{' '}
          <Link
            href="/compliance"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Business and Compliance
          </Link>
          .
        </p>
      </TrustSectionCard>
    </TrustPageLayout>
  );
}
