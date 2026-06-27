import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'FlowDockr Blog',
  description:
    'FlowDockr articles and scenario resources for preparing professional negotiation replies.',
  canonicalUrl: '/blog',
  noIndex: true,
});

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Blog
        </h1>
        <p className="mt-2 text-sm text-slate-700">
          Use FlowDockr scenario resources and the reply generator to prepare
          clearer negotiation responses.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link
            href="/pricing"
            className="font-semibold text-slate-900 underline"
          >
            Browse pricing scenarios
          </Link>
          <Link
            href="/tools/reply-generator"
            className="font-semibold text-slate-900 underline"
          >
            Open tool
          </Link>
        </div>
      </section>
    </main>
  );
}
