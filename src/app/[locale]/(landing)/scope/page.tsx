import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { ScopePolicyGenerator } from '@/shared/blocks/scope-guard/generator';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const generateMetadata = getMetadata({
  metadataKey: 'pages.scope.metadata',
  canonicalUrl: '/scope',
});

export default async function ScopePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pages.scope');

  const page: DynamicPage = {
    sections: {
      hero: t.raw('page.sections.hero'),
      generator: {
        component: <ScopePolicyGenerator />,
      },
    },
  };

  const Page = await getThemePage('dynamic-page');

  return <Page locale={locale} page={page} />;
}
