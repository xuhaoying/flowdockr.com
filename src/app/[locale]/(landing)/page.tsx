import { setRequestLocale } from 'next-intl/server';

import { ScenarioHubContent } from '@/shared/blocks/scenarios';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ScenarioHubContent />;
}
