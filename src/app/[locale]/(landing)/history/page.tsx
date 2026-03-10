import { setRequestLocale } from 'next-intl/server';

import { SavedDealsPanel } from '@/components/history/SavedDealsPanel';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Negotiation Library | Flowdockr',
  description:
    'Your reusable negotiation library. Revisit difficult client conversations, track deal status, and reuse effective reply patterns.',
  canonicalUrl: '/history',
  keywords: 'negotiation library, freelancer deal history, saved client replies',
});

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Your negotiation library
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Save useful replies, keep deal context, and reuse what worked so future
          client negotiations become faster and more consistent.
        </p>
      </section>

      <SavedDealsPanel />
    </main>
  );
}
