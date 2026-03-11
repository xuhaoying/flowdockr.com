import { Check, Minus } from 'lucide-react';

type PlanKey = 'free' | 'quick_help' | 'pro' | 'studio';

type BooleanRow = {
  feature: string;
  type: 'boolean';
  values: Record<PlanKey, boolean>;
};

type TextRow = {
  feature: string;
  type: 'text';
  values: Record<PlanKey, string>;
};

type ComparisonRow = BooleanRow | TextRow;

const ROWS: ComparisonRow[] = [
  {
    feature: 'Negotiation credits included',
    type: 'text',
    values: {
      free: '2',
      quick_help: '8',
      pro: '24',
      studio: '60',
    },
  },
  {
    feature: 'Suggested approach guidance',
    type: 'boolean',
    values: {
      free: false,
      quick_help: true,
      pro: true,
      studio: true,
    },
  },
  {
    feature: 'Response options shown',
    type: 'text',
    values: {
      free: '1',
      quick_help: '1',
      pro: '3',
      studio: '3',
    },
  },
  {
    feature: 'Things to watch out for',
    type: 'boolean',
    values: {
      free: false,
      quick_help: false,
      pro: true,
      studio: true,
    },
  },
  {
    feature: 'Saved negotiation history',
    type: 'boolean',
    values: {
      free: false,
      quick_help: false,
      pro: true,
      studio: true,
    },
  },
  {
    feature: 'Follow-up guidance',
    type: 'boolean',
    values: {
      free: false,
      quick_help: false,
      pro: false,
      studio: true,
    },
  },
  {
    feature: 'Advanced scenario modes',
    type: 'boolean',
    values: {
      free: false,
      quick_help: false,
      pro: false,
      studio: true,
    },
  },
];

const COLUMNS: Array<{ key: PlanKey; label: string }> = [
  { key: 'free', label: 'Free' },
  { key: 'quick_help', label: 'Quick Help' },
  { key: 'pro', label: 'Pro' },
  { key: 'studio', label: 'Studio' },
];

export function FeatureComparison() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-4">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Feature Comparison Table
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Compare support depth across plans
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Feature
                </th>
                {COLUMNS.map((column) => (
                  <th
                    key={column.key}
                    className="border-b border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-900"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.feature} className="bg-white">
                  <td className="border-b border-slate-200 px-4 py-3 text-sm text-slate-700 last:border-b-0">
                    {row.feature}
                  </td>
                  {COLUMNS.map((column) => (
                    <td
                      key={`${row.feature}-${column.key}`}
                      className="border-b border-slate-200 px-4 py-3 text-center text-sm text-slate-700 last:border-b-0"
                    >
                      {row.type === 'text' ? (
                        <span className="font-medium text-slate-900">
                          {row.values[column.key]}
                        </span>
                      ) : row.values[column.key] ? (
                        <Check className="mx-auto size-4 text-emerald-600" />
                      ) : (
                        <Minus className="mx-auto size-4 text-slate-400" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
