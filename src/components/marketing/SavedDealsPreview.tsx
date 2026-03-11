'use client';

import { useEffect, useMemo, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { listSavedDeals } from '@/lib/deals-history';
import { SavedDealRecord } from '@/types/deals';

export function SavedDealsPreview() {
  const [records, setRecords] = useState<SavedDealRecord[]>([]);

  useEffect(() => {
    setRecords(listSavedDeals());
  }, []);

  const latestRecords = useMemo(() => records.slice(0, 2), [records]);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Build a reusable negotiation library
        </h2>
        <p className="text-sm text-slate-700">
          Save the exact client pressure, the reply you sent, and the strategy that
          worked. Your next pricing conversation starts with evidence, not guesswork.
        </p>
      </div>

      {latestRecords.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {latestRecords.map((record) => (
            <article key={record.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                Saved case
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{record.scenarioTitle}</p>
              <p className="mt-2 line-clamp-3 text-sm text-slate-700">{record.clientMessage}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-3">
          <CapabilityCard
            title="Keep message context"
            body="Store the exact client wording so future follow-ups stay aligned with the real objection."
          />
          <CapabilityCard
            title="Reuse proven replies"
            body="Save recommended and alternative drafts to avoid rewriting from scratch next time."
          />
          <CapabilityCard
            title="Track negotiation outcomes"
            body="Mark deals as ongoing, won, or lost to build your own practical playbook."
          />
        </div>
      )}

      <Link href="/history" className="inline-flex text-sm font-semibold text-slate-900 underline underline-offset-2">
        Open negotiation library
      </Link>
    </section>
  );
}

function CapabilityCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-700">{body}</p>
    </article>
  );
}
