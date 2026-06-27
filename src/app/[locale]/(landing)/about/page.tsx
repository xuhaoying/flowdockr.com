import {
  TrustPageLayout,
  TrustSectionCard,
} from '@/components/trust/TrustPageLayout';
import {
  FLOWDOCKR_COMPANY_JURISDICTION,
  FLOWDOCKR_COMPANY_NAME,
  FLOWDOCKR_PRODUCT_NAME,
  FLOWDOCKR_PUBLIC_SUPPORT_EMAIL,
  TRUST_EFFECTIVE_DATE,
} from '@/lib/trust';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'About FlowDockr | Auralis Labs LLC',
  description:
    'FlowDockr is an AI negotiation assistant for professionals, built by Auralis Labs LLC.',
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
      title="About FlowDockr"
      description={`${FLOWDOCKR_PRODUCT_NAME} is an AI negotiation assistant that helps professionals prepare for difficult conversations, pricing pushback, and client decisions.`}
      effectiveDate={TRUST_EFFECTIVE_DATE}
    >
      <TrustSectionCard title="Product">
        <p>
          FlowDockr helps users move from a difficult message or situation to a
          clearer negotiation plan. The product focuses on practical strategy,
          tone, tradeoffs, and reply drafts that can be reviewed before use.
        </p>
        <p>
          It is designed for professionals, consultants, agencies, founders,
          freelancers, and operators who need to handle commercial conversations
          without sounding defensive or unclear.
        </p>
        <p>
          FlowDockr is a digital software product. It does not ship physical
          goods, move customer funds, lend money, broker financial products,
          settle debts, or provide legal, tax, investment, or financial advice.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Mission">
        <p>
          Our mission is to make difficult professional conversations easier to
          prepare for. FlowDockr gives users a structured way to think before
          responding, protect important boundaries, and keep relationships
          moving forward.
        </p>
      </TrustSectionCard>

      <TrustSectionCard title="Company">
        <p>FlowDockr is built and operated by {FLOWDOCKR_COMPANY_NAME}.</p>
        <p>
          Business jurisdiction: {FLOWDOCKR_COMPANY_JURISDICTION}. Registered
          business records, ownership information, tax records, and banking
          verification documents are supplied through official payment processor
          or banking review workflows when required.
        </p>
        <p>
          The service is operated as a commercial SaaS product for real users,
          with public pricing, checkout, support, and legal policies maintained
          by {FLOWDOCKR_COMPANY_NAME}.
        </p>
        <p>
          For support, privacy, billing, or legal questions, email{' '}
          <a
            href={`mailto:${FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}`}
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            {FLOWDOCKR_PUBLIC_SUPPORT_EMAIL}
          </a>{' '}
          or visit{' '}
          <Link
            href="/contact"
            className="font-medium text-slate-900 underline underline-offset-2"
          >
            Contact
          </Link>
          .
        </p>
        <p>
          For business verification context, see{' '}
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
