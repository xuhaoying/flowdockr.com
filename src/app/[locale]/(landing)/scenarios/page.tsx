import { setRequestLocale } from 'next-intl/server';

import { ScenarioHubContent } from '@/shared/blocks/scenarios';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Freelance Negotiation Scenarios | Flowdockr',
  description:
    'Explore client negotiation scenarios and generate professional freelance replies instantly.',
  canonicalUrl: '/scenarios',
  keywords:
    'freelance negotiation, client reply generator, pricing objections, discount negotiation, scenario based ai',
});

export default async function ScenariosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ScenarioHubContent />;
}
