import { desc, eq } from 'drizzle-orm';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/core/i18n/navigation';
import { getCurrentUser } from '@/lib/auth';
import { db, generation, user } from '@/lib/db';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Dashboard | Flowdockr',
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
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-3 text-muted-foreground">
          Please log in to view your credits and generation history.
        </p>
        <Link href="/login?callbackUrl=/dashboard" className="mt-6 inline-block underline">
          Send me a magic link
        </Link>
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
        <h2 className="text-2xl font-semibold tracking-tight">Recent generations</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No generations yet. Visit a scenario page and generate your first reply.
          </p>
        ) : (
          <div className="space-y-3">
            {rows.map((row) => (
              <article key={row.id} className="rounded-md border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>{row.scenarioSlug}</span>
                  <span>{new Date(row.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed">{row.recommendedReply}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {row.isFreeGeneration ? 'Free generation' : `Credits charged: ${row.creditsCharged}`}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
