import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getAllGuides } from '@/lib/content/getGuideBySlug';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Pricing Negotiation Guides | Flowdockr',
  description:
    'Practical guides for freelance pricing negotiation, discount decisions, and scope-based deal structuring.',
  canonicalUrl: '/guides/',
});

export default async function GuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const guides = getAllGuides();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Pricing negotiation guides
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          Learn the decision logic behind stronger pricing conversations, then open a
          scenario page to apply it to your exact message.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => (
          <article key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{guide.h1}</h2>
            <p className="mt-2 text-sm text-slate-700">{guide.heroSubheading}</p>
            <Link
              href={guide.url}
              className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
            >
              Read guide
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
