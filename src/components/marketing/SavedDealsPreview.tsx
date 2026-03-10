'use client';

import { useEffect, useMemo, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { getSavedDealsStats, listSavedDeals } from '@/lib/deals-history';
import { SavedDealRecord } from '@/types/deals';

export function SavedDealsPreview() {
  const [records, setRecords] = useState<SavedDealRecord[]>([]);

  useEffect(() => {
    setRecords(listSavedDeals());
  }, []);

  const stats = useMemo(() => getSavedDealsStats(records), [records]);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Saved deals and reusable history
        </h2>
        <p className="text-sm text-slate-700">
          Flowdockr is more than a one-off tool. Save difficult conversations,
          revisit your best responses, and build your own negotiation history.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Deals handled" value={stats.total} />
        <Metric label="Draft cases" value={stats.draft} />
        <Metric label="Ongoing cases" value={stats.ongoing} />
        <Metric label="Saved replies" value={stats.savedReplies} />
      </div>

      <Link href="/history" className="inline-flex text-sm font-semibold text-slate-900 underline">
        Open saved deals history
      </Link>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}
