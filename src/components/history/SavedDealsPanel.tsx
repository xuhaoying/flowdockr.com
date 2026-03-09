'use client';

import { useEffect, useMemo, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import {
  deleteDealRecord,
  getSavedDealsStats,
  listSavedDeals,
  updateDealStatus,
} from '@/lib/deals-history';
import { DealStatus, SavedDealRecord } from '@/types/deals';

const STATUS_OPTIONS: Array<{ value: DealStatus; label: string }> = [
  { value: 'draft', label: 'Draft' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'sent', label: 'Sent' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

export function SavedDealsPanel() {
  const [records, setRecords] = useState<SavedDealRecord[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setRecords(listSavedDeals());
    setHydrated(true);
  }, []);

  const stats = useMemo(() => getSavedDealsStats(records), [records]);

  const onChangeStatus = (id: string, status: DealStatus) => {
    updateDealStatus(id, status);
    setRecords(listSavedDeals());
  };

  const onDelete = (id: string) => {
    deleteDealRecord(id);
    setRecords(listSavedDeals());
  };

  if (!hydrated) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-600">Loading saved deals...</p>
      </section>
    );
  }

  if (records.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Negotiation library</h2>
        <p className="mt-2 text-sm text-slate-700">
          No saved records yet. Generate a reply and click <strong>Save to deals</strong> to
          build your negotiation history.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/tools/reply-generator" className="font-semibold text-slate-900 underline">
            Open conversation workspace
          </Link>
          <Link href="/pricing" className="font-semibold text-slate-900 underline">
            Browse pricing scenarios
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Deals handled" value={stats.total} />
        <StatsCard label="Draft cases" value={stats.draft} />
        <StatsCard label="Ongoing cases" value={stats.ongoing} />
        <StatsCard label="Won cases" value={stats.won} />
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Saved conversations</h2>
        <div className="space-y-3">
          {records.map((record) => (
            <article key={record.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{record.scenarioTitle}</p>
                  <p className="text-xs text-slate-600">
                    {formatDate(record.createdAt)} · tone: {record.tone}
                    {record.projectType ? ` · project: ${formatProjectType(record.projectType)}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={record.status}
                    onChange={(event) =>
                      onChangeStatus(record.id, event.target.value as DealStatus)
                    }
                    className="h-9 rounded-md border border-slate-300 bg-white px-2 text-xs text-slate-700"
                  >
                    {STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => onDelete(record.id)}
                    className="h-9 rounded-md border border-slate-300 px-2 text-xs text-slate-700 transition-colors hover:border-slate-400 hover:text-slate-900"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <section className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Client message
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                    {record.clientMessage}
                  </p>
                </section>
                <section className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                    Generated reply
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                    {record.generatedReply}
                  </p>
                </section>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
    </article>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatProjectType(value: string) {
  return value.replace(/_/g, ' ');
}
