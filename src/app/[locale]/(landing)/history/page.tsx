import { SavedDealsPanel } from '@/components/history/SavedDealsPanel';
import { setRequestLocale } from 'next-intl/server';

import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Negotiation Library | Flowdockr',
  description:
    'Your reusable negotiation library. Revisit saved strategy, reply variants, risk notes, and follow-up guidance from previous client negotiations.',
  canonicalUrl: '/history',
  keywords:
    'negotiation library, freelancer deal history, saved client replies',
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
          Reopen saved negotiation support output, review what strategy you
          used, and reuse strong client-facing replies when a similar situation
          comes up again.
        </p>
      </section>

      <SavedDealsPanel />
    </main>
  );
}
