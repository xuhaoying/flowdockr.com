import { setRequestLocale } from 'next-intl/server';

import { TrustPageLayout, TrustSectionCard } from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Privacy | Flowdockr',
  description: 'Privacy policy for Flowdockr.',
  canonicalUrl: '/privacy',
});

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="Privacy Policy"
      description={`${FLOWDOCKR_PRODUCT_NAME} collects only the information needed to run the product, process purchases, secure accounts, and improve the service. This page describes that handling in practical terms.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="What we collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>Account details such as email address, name, and login metadata.</li>
          <li>Client messages, scenario selections, generated replies, and saved history when you use those features.</li>
          <li>Purchase and billing metadata needed to complete and support checkout.</li>
          <li>Technical information such as browser, device, IP-derived signals, and security or abuse-prevention logs.</li>
          <li>Cookie and consent preferences, plus optional analytics or attribution data when enabled and allowed.</li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="How we use information">
        <ul className="list-disc space-y-2 pl-5">
          <li>Operate the product, authenticate users, and keep accounts secure.</li>
          <li>Generate reply suggestions, save history, and deliver purchased support features.</li>
          <li>Process payments, investigate billing issues, and prevent fraud or abuse.</li>
          <li>Understand product performance and improve reliability when optional analytics are enabled.</li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Third-party processors and service providers">
        <p>
          Depending on how Flowdockr is configured, we may use service
          providers for payments, email delivery, authentication, hosting,
          database infrastructure, analytics, attribution, and customer
          support.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Stripe for payment checkout and payment-related records.</li>
          <li>Resend for transactional email when email delivery is enabled.</li>
          <li>Google sign-in or similar providers if you choose social login.</li>
          <li>
            Optional analytics or measurement tools such as Google Analytics,
            Plausible, Clarity, OpenPanel, or Vercel Analytics when configured.
          </li>
        </ul>
      </TrustSectionCard>

      <TrustSectionCard title="Data retention">
        <p>
          We keep information for as long as needed to operate Flowdockr,
          secure the service, support billing, resolve disputes, and meet legal
          obligations.
        </p>
        <p>
          If you delete content or request account removal, some information may
          still remain in backups, security logs, or billing records for a
          limited period.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Your choices and deletion requests">
        <p>
          You can decline optional analytics and third-party scripts through the
          cookie banner when it appears. If you want to change that choice
          later, you can clear site cookies and make a new selection.
        </p>
        <p>
          For access, deletion, or privacy questions, use{' '}
          <Link
            href="/contact"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            /contact
          </Link>
          . We currently handle these requests manually rather than through a
          self-serve privacy dashboard.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Contact">
        <p>
          {FLOWDOCKR_PRODUCT_NAME} is a product of {FLOWDOCKR_COMPANY_NAME}. If
          you have a privacy request or question about this policy, use{' '}
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
