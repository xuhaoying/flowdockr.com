import { getHomepageScenarioSurfaceGroups } from '@/lib/content/scenarioPages';

import { Link } from '@/core/i18n/navigation';

export function HomepageScenarioGrid() {
  const groups = getHomepageScenarioSurfaceGroups();

  return (
    <section className="border-brand-lavender/25 space-y-4 rounded-2xl border bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Popular client reply scenarios
      </h2>
      <p className="text-sm text-slate-700">
        Start with the strongest money and boundary scenarios instead of
        guessing where to begin.
      </p>
      <div className="space-y-5">
        {groups.map((group) => {
          return (
            <article key={group.title} className="space-y-3">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">
                  {group.title}
                </h3>
                <p className="text-sm text-slate-700">{group.description}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((scenario) => (
                  <Link
                    key={scenario.slug}
                    href={scenario.href}
                    className="border-brand-lavender/20 hover:border-brand-primary/45 hover:bg-brand-bg/45 rounded-lg border bg-white p-4 transition-colors"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {scenario.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {scenario.description}
                    </p>
                    <span className="text-brand-primary mt-3 inline-flex text-sm font-medium underline underline-offset-2">
                      Open scenario
                    </span>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
