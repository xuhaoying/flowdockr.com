import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { DealStrategyGenerator } from '@/shared/blocks/deal-strategy/generator';
import { getMetadata } from '@/shared/lib/seo';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const generateMetadata = getMetadata({
  metadataKey: 'pages.create.metadata',
  canonicalUrl: '/create',
});

export default async function CreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // get ai image data
  const t = await getTranslations('pages.create');

  // build page sections
  const page: DynamicPage = {
    sections: {
      "features": {
        "block": "custom-features",
        title: t.raw('page.title'),
        description: t.raw('page.description'),
      },
      generator: {
        component: <DealStrategyGenerator />,
      },
    },
  };

  // load page component
  const Page = await getThemePage('dynamic-page');

  return <Page locale={locale} page={page} />;
}
