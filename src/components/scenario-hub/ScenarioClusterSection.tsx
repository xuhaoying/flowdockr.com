import { Link } from '@/core/i18n/navigation';
import type { ScenarioHubCluster } from '@/types/scenario-hub';

type ScenarioClusterSectionProps = {
  clusters: ScenarioHubCluster[];
};

export function ScenarioClusterSection({
  clusters,
}: ScenarioClusterSectionProps) {
  return (
    <section
      id="scenario-clusters"
      className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <div className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Scenario Clusters
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Explore scenarios by the pressure showing up in the conversation
          </h2>
        </div>

        <div className="space-y-6">
          {clusters.map((cluster) => (
            <section
              key={cluster.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <div className="max-w-3xl space-y-2">
                <h3 className="text-xl font-semibold text-slate-900">
                  {cluster.title}
                </h3>
                <p className="text-sm leading-6 text-slate-700">
                  {cluster.description}
                </p>
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {cluster.scenarios.map((scenario) => (
                  <Link
                    key={scenario.slug}
                    href={`/scenario/${scenario.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-400"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {scenario.title}
                    </p>
                    {scenario.description ? (
                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {scenario.description}
                      </p>
                    ) : null}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
