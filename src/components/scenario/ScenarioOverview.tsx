import type { ScenarioPageData } from '@/types/scenario-page';

type ScenarioOverviewProps = {
  overview: ScenarioPageData['overview'];
};

export function ScenarioOverview({ overview }: ScenarioOverviewProps) {
  return (
    <section className="max-w-3xl space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Situation overview
      </h2>
      <div className="space-y-4 text-base leading-7 text-slate-700">
        {overview.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
