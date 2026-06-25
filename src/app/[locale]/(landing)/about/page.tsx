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
  title: 'About | Flowdockr',
  description:
    'Flowdockr is an AI negotiation assistant for professionals, built by Auralis Labs LLC.',
  canonicalUrl: '/about',
});

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <TrustPageLayout
      title="About Flowdockr"
      description={`${FLOWDOCKR_PRODUCT_NAME} is an AI negotiation assistant that helps professionals prepare for difficult conversations, pricing pushback, and client decisions.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Product">
        <p>
          Flowdockr helps users move from a difficult message or situation to a
          clearer negotiation plan. The product focuses on practical strategy,
          tone, tradeoffs, and reply drafts that can be reviewed before use.
        </p>
        <p>
          It is designed for professionals, consultants, agencies, founders,
          freelancers, and operators who need to handle commercial conversations
          without sounding defensive or unclear.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Mission">
        <p>
          Our mission is to make difficult professional conversations easier to
          prepare for. Flowdockr gives users a structured way to think before
          responding, protect important boundaries, and keep relationships
          moving forward.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Company">
        <p>Flowdockr is built and operated by {FLOWDOCKR_COMPANY_NAME}.</p>
        <p>
          For support, privacy, billing, or legal questions, visit{' '}
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
