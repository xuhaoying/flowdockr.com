import type { ScenarioPageData } from '@/types/content';

type CoreFearBlockProps = {
  scenario: ScenarioPageData;
};

export function CoreFearBlock({ scenario }: CoreFearBlockProps) {
  return (
    <section className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Why this is tricky
      </h2>
      <ul className="space-y-2 text-sm text-slate-700">
        {scenario.coreFear.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

