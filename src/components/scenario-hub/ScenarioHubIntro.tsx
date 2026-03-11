import type { ScenarioHubHandleCard } from '@/types/scenario-hub';

type ScenarioHubIntroProps = {
  items: ScenarioHubHandleCard[];
};

export function ScenarioHubIntro({ items }: ScenarioHubIntroProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            What Flowdockr Helps You Handle
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Common client situations that need clearer negotiation judgment
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
