import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getAllTools } from '@/lib/content/getToolBySlug';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Negotiation Tools | Flowdockr',
  description:
    'Use pricing-focused negotiation tools to draft client replies and move deal conversations forward.',
  canonicalUrl: '/tools/',
});

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tools = getAllTools();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:py-10">
      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Pricing negotiation tools
        </h1>
        <p className="max-w-3xl text-base text-slate-700">
          These tools are built for freelancers and agencies handling pricing pushback,
          discount pressure, and budget mismatch conversations.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <article key={tool.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{tool.h1}</h2>
            <p className="mt-2 text-sm text-slate-700">{tool.heroSubheading}</p>
            <Link
              href={tool.url}
              className="mt-3 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2"
            >
              Open tool
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
