import { setRequestLocale } from 'next-intl/server';

import { TrustPageLayout, TrustSectionCard } from '@/components/trust/TrustPageLayout';
import { getPublicContactDetails } from '@/lib/publicContact';
import {
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Contact | Flowdockr',
  description: 'Support, billing, privacy, and legal contact information for Flowdockr.',
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

  return (
    <TrustPageLayout
      title="Contact"
      description={`${FLOWDOCKR_PRODUCT_NAME} keeps support, billing, privacy, and legal contact intentionally simple. Requests are handled directly by ${FLOWDOCKR_COMPANY_NAME}.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Support and billing">
        {supportEmail ? (
          <>
            <p>
              For account access, credits, checkout, or billing issues, email us
              at{' '}
              <a
                href={`mailto:${supportEmail}`}
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                {supportEmail}
              </a>
              .
            </p>
            <p>
              We handle support and billing questions manually, so include
              enough detail for us to locate the account or purchase.
            </p>
          </>
        ) : (
          <>
            <p>
              Support and billing questions are currently handled manually
              through Flowdockr account, verification, and purchase emails.
            </p>
            <p>
              We do not currently publish a general support inbox. Review our{' '}
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
              </Link>{' '}
              for current policies. If a public support address is added later,
              it will appear on this page.
            </p>
          </>
        )}
      </TrustSectionCard>

      <TrustSectionCard title="Privacy and legal inquiries">
        {privacyEmail ? (
          <>
            <p>
              For privacy, deletion, or legal questions, email{' '}
              <a
                href={`mailto:${privacyEmail}`}
                className="font-medium text-slate-900 underline underline-offset-2"
              >
                {privacyEmail}
              </a>
              .
            </p>
            <p>
              Please include enough context for us to understand the request and
              route it correctly.
            </p>
          </>
        ) : (
          <>
            <p>
              Privacy and legal requests are currently routed through the same
              active contact path used for Flowdockr account or billing
              communications.
            </p>
            <p>
              We keep this process manual for now so requests can be reviewed
              carefully rather than forcing a self-serve workflow that is not
              yet built.
            </p>
          </>
        )}
      </TrustSectionCard>

      <TrustSectionCard title="Company">
        <p>
          {FLOWDOCKR_PRODUCT_NAME} is a product of {FLOWDOCKR_COMPANY_NAME}.
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
      </TrustSectionCard>
    </TrustPageLayout>
  );
}
