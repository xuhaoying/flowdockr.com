import { getCurrentUser } from '@/lib/auth';
import { db, generation, user } from '@/lib/db';
import { desc, eq } from 'drizzle-orm';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Dashboard | FlowDockr',
  description: 'View your credits balance and recent negotiation generations.',
  canonicalUrl: '/dashboard',
  noIndex: true,
});

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <section className="border-brand-lavender/25 rounded-2xl border bg-white p-6 shadow-sm shadow-slate-950/5">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-3 text-sm leading-6">
            Sign in to view your FlowDockr credits, recent negotiation drafts,
            and saved account activity.
          </p>
          <Link
            href="/signin?callbackUrl=/dashboard"
            className="from-brand-primary to-brand-cyan shadow-brand-primary/25 mt-6 inline-flex rounded-md bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm"
          >
            Send me a magic link
          </Link>
        </section>
      </main>
    );
  }

  const [profile] = await db()
    .select({
      creditsBalance: user.creditsBalance,
      email: user.email,
    })
    .from(user)
    .where(eq(user.id, currentUser.id))
    .limit(1);

  const rows: Array<{
    id: string;
    createdAt: Date;
    scenarioSlug: string;
    recommendedReply: string;
    isFreeGeneration: boolean;
    creditsCharged: number;
  }> = await db()
    .select({
      id: generation.id,
      createdAt: generation.createdAt,
      scenarioSlug: generation.scenarioSlug,
      recommendedReply: generation.recommendedReply,
      isFreeGeneration: generation.isFreeGeneration,
      creditsCharged: generation.creditsCharged,
    })
    .from(generation)
    .where(eq(generation.userId, currentUser.id))
    .orderBy(desc(generation.createdAt))
    .limit(20);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">{profile?.email}</p>
        <div className="inline-flex rounded-md border px-3 py-1 text-sm">
          Credits balance: {profile?.creditsBalance || 0}
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent generations
        </h2>
        {rows.length === 0 ? (
          <div className="border-brand-lavender/25 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
            <h3 className="text-base font-semibold text-slate-900">
              Your first negotiation output will appear here
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              After you generate a reply, this dashboard will show the scenario,
              date, client-ready draft, and whether credits were charged.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/tools/reply-generator"
                className="from-brand-primary to-brand-cyan shadow-brand-primary/25 inline-flex rounded-md bg-linear-to-r px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                Open conversation workspace
              </Link>
              <Link
                href="/pricing"
                className="border-brand-lavender/45 text-brand-text hover:border-brand-primary/55 hover:text-brand-primary inline-flex rounded-md border bg-white px-4 py-2 text-sm font-semibold"
              >
                View credit packs
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <article key={row.id} className="rounded-md border p-4">
                <div className="text-muted-foreground flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span>{row.scenarioSlug}</span>
                  <span>{new Date(row.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  {row.recommendedReply}
                </p>
                <p className="text-muted-foreground mt-2 text-xs">
                  {row.isFreeGeneration
                    ? 'Free generation'
                    : `Credits charged: ${row.creditsCharged}`}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
