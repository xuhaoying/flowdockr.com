import type { ScenarioHubWhy as ScenarioHubWhyData } from '@/types/scenario-hub';

type ScenarioHubWhyProps = {
  why: ScenarioHubWhyData;
};

export function ScenarioHubWhy({ why }: ScenarioHubWhyProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {why.title}
        </h2>
        {why.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-6 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
