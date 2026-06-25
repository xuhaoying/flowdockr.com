import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Cookie Policy | Flowdockr',
  description: 'Cookie policy for Flowdockr.',
  canonicalUrl: '/cookies',
});

export default async function CookiePolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="Cookie Policy"
      description={`${FLOWDOCKR_PRODUCT_NAME} uses necessary cookies for product operation and may use optional cookies or similar technologies for analytics, attribution, and support when configured.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Necessary cookies">
        <p>
          Necessary cookies help run core product functions such as sign-in,
          session security, checkout continuity, consent preferences, and basic
          site operation.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Optional analytics and support tools">
        <p>
          Flowdockr may use optional analytics, attribution, or customer support
          tools to understand product usage, improve reliability, and respond to
          support requests. These tools may set cookies or use similar browser
          storage when enabled.
        </p>
        <p>
          Optional tracking can include services such as Google Analytics,
          Plausible, Clarity, OpenPanel, Vercel Analytics, affiliate
          attribution, or customer support widgets, depending on current
          configuration.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Your choices">
        <p>
          When a cookie banner is shown, you can accept or decline optional
          tracking. You can also clear browser cookies to reset your choice or
          use browser settings to limit cookies.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Contact">
        <p>
          Flowdockr is a product of {FLOWDOCKR_COMPANY_NAME}. For questions
          about cookies or privacy, see our{' '}
          <Link
            href="/privacy"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Privacy Policy
          </Link>{' '}
          or visit{' '}
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
