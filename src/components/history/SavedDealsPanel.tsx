import { getCurrentUser } from '@/lib/auth';
import { getUserBillingProfile } from '@/lib/billing';
import { db, generation } from '@/lib/db';
import { getScenarioBySlug } from '@/lib/scenarios';
import type { BillingSupportLevel } from '@/types/billing';
import type {
  FollowUpSuggestion,
  PresentableStrategyBlock,
  ReplyVersion,
} from '@/types/generation';
import { desc, eq } from 'drizzle-orm';

import { Link } from '@/core/i18n/navigation';

type StoredGenerationPayload = {
  strategy?: string[];
  strategyBlock?: PresentableStrategyBlock | null;
  replyVersions?: ReplyVersion[];
  riskInsights?: string[];
  followUpSuggestion?: FollowUpSuggestion | null;
  supportLevel?: BillingSupportLevel;
};

type HistoryRow = {
  id: string;
  createdAt: Date;
  scenarioSlug: string;
  clientMessage: string;
  recommendedReply: string;
  alternativeReply: string;
  strategyJson: string;
};

export async function SavedDealsPanel() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Negotiation history
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Sign in to view saved negotiation outputs and reopen previous client
          cases.
        </p>
        <Link
          href="/signin?callbackUrl=/history"
          className="mt-4 inline-flex font-semibold text-slate-900 underline underline-offset-2"
        >
          Send me a magic link
        </Link>
      </section>
    );
  }

  const billingProfile = await getUserBillingProfile(currentUser.id);

  if (!billingProfile.entitlements.historyEnabled) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Negotiation history
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Saved negotiation history is available on Pro and Studio. Quick Help
          is built for one-off support, not a reusable library.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex font-semibold text-slate-900 underline underline-offset-2"
        >
          Compare plans
        </Link>
      </section>
    );
  }

  const rows: HistoryRow[] = await db()
    .select({
      id: generation.id,
      createdAt: generation.createdAt,
      scenarioSlug: generation.scenarioSlug,
      clientMessage: generation.clientMessage,
      recommendedReply: generation.recommendedReply,
      alternativeReply: generation.alternativeReply,
      strategyJson: generation.strategyJson,
    })
    .from(generation)
    .where(eq(generation.userId, currentUser.id))
    .orderBy(desc(generation.createdAt))
    .limit(50);

  if (rows.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Negotiation history
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          No saved negotiations yet. Generate a response on Pro or Studio and it
          will appear here automatically.
        </p>
        <Link
          href="/tools/reply-generator"
          className="mt-4 inline-flex font-semibold text-slate-900 underline underline-offset-2"
        >
          Open conversation workspace
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          Saved negotiations
        </h2>
        <p className="text-sm text-slate-700">
          Reopen previous outputs, review the strategy, and reuse strong
          client-facing replies without starting from scratch.
        </p>
      </div>

      <div className="space-y-3">
        {rows.map((row) => {
          const stored = parseStoredOutput(row.strategyJson);
          const scenario = getScenarioBySlug(row.scenarioSlug);
          const replyVersions = normalizeReplyVersions(
            row.recommendedReply,
            row.alternativeReply,
            stored.replyVersions
          );
          const supportLevel = normalizeSupportLevel(stored.supportLevel);

          return (
            <details
              key={row.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <summary className="cursor-pointer list-none">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {scenario?.title || row.scenarioSlug}
                    </p>
                    <p className="text-xs text-slate-600">
                      {formatDate(row.createdAt)} ·{' '}
                      {formatSupportLevel(supportLevel)}
                    </p>
                    <p className="line-clamp-2 max-w-3xl text-sm text-slate-700">
                      {row.recommendedReply}
                    </p>
                  </div>

                  <Link
                    href={`/tools/reply-generator?scenario=${encodeURIComponent(row.scenarioSlug)}`}
                    className="inline-flex h-9 items-center rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-900 transition-colors hover:border-slate-400"
                  >
                    Open workspace
                  </Link>
                </div>
              </summary>

              <div className="mt-4 space-y-4 border-t border-slate-200 pt-4">
                <section className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                    Client message
                  </p>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                    {row.clientMessage}
                  </p>
                </section>

                {stored.strategyBlock ? (
                  <section className="rounded-lg border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {stored.strategyBlock.title}
                    </h3>
                    <div className="mt-3 space-y-3">
                      {stored.strategyBlock.sections.map((section) => (
                        <div key={section.title} className="space-y-2">
                          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                            {section.title}
                          </p>
                          <ul className="space-y-2 text-sm text-slate-700">
                            {section.bullets.map((bullet) => (
                              <li
                                key={`${section.title}-${bullet}`}
                                className="flex items-start gap-2"
                              >
                                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Saved replies
                  </h3>
                  <div className="grid gap-3 lg:grid-cols-3">
                    {replyVersions.map((version) => (
                      <article
                        key={`${row.id}-${version.key}`}
                        className="rounded-lg border border-slate-200 bg-white p-4"
                      >
                        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                          {version.label}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap text-slate-700">
                          {version.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>

                {stored.riskInsights && stored.riskInsights.length > 0 ? (
                  <section className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <h3 className="text-sm font-semibold text-amber-950">
                      Risk insights
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-amber-900">
                      {stored.riskInsights.map((insight) => (
                        <li key={insight} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-700" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}

                {stored.followUpSuggestion?.reply ? (
                  <section className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                    <h3 className="text-sm font-semibold text-sky-950">
                      If the client pushes again
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap text-sky-950">
                      {stored.followUpSuggestion.reply}
                    </p>
                    {stored.followUpSuggestion.direction ? (
                      <p className="mt-3 text-sm leading-relaxed text-sky-900">
                        {stored.followUpSuggestion.direction}
                      </p>
                    ) : null}
                  </section>
                ) : null}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

function parseStoredOutput(raw: string): StoredGenerationPayload {
  try {
    const parsed = JSON.parse(raw) as StoredGenerationPayload;
    if (!parsed || typeof parsed !== 'object') {
      return {};
    }

    return {
      strategyBlock:
        parsed.strategyBlock && parsed.strategyBlock.sections?.length
          ? parsed.strategyBlock
          : undefined,
      replyVersions: Array.isArray(parsed.replyVersions)
        ? parsed.replyVersions.filter((item): item is ReplyVersion =>
            Boolean(item?.key && item?.label && item?.text)
          )
        : [],
      riskInsights: Array.isArray(parsed.riskInsights)
        ? parsed.riskInsights.filter(Boolean)
        : [],
      followUpSuggestion:
        parsed.followUpSuggestion && parsed.followUpSuggestion.reply
          ? parsed.followUpSuggestion
          : undefined,
      supportLevel: parsed.supportLevel,
    };
  } catch {
    return {};
  }
}

function normalizeReplyVersions(
  recommendedReply: string,
  alternativeReply: string,
  replyVersions?: ReplyVersion[]
): ReplyVersion[] {
  if (replyVersions?.length) {
    return replyVersions;
  }

  const versions: ReplyVersion[] = [];

  if (recommendedReply) {
    versions.push({
      key: 'professional',
      label: 'Professional',
      text: recommendedReply,
    });
  }

  if (alternativeReply) {
    versions.push({
      key: 'firm',
      label: 'Firm',
      text: alternativeReply,
    });
  }

  return versions.length > 0
    ? versions
    : [
        {
          key: 'suggested',
          label: 'Suggested reply',
          text: recommendedReply,
        },
      ];
}

function normalizeSupportLevel(
  payloadLevel?: BillingSupportLevel
): BillingSupportLevel {
  if (
    payloadLevel === 'free' ||
    payloadLevel === 'quick_help' ||
    payloadLevel === 'pro' ||
    payloadLevel === 'studio'
  ) {
    return payloadLevel;
  }

  return 'free';
}

function formatSupportLevel(value: BillingSupportLevel) {
  switch (value) {
    case 'quick_help':
      return 'Quick Help';
    case 'pro':
      return 'Pro';
    case 'studio':
      return 'Studio';
    default:
      return 'Free';
  }
}

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
