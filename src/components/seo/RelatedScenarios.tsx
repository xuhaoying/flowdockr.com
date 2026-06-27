'use client';

import { trackEvent } from '@/lib/analytics-client';
import { ScenarioContent } from '@/types/scenario';

import { Link } from '@/core/i18n/navigation';

type RelatedScenariosProps = {
  relatedScenarios: ScenarioContent[];
  currentScenarioSlug?: string;
};

export function RelatedScenarios({
  relatedScenarios,
  currentScenarioSlug = '',
}: RelatedScenariosProps) {
  const onRelatedClick = (relatedSlug: string) => {
    trackEvent('related_scenario_clicked', {
      scenarioSlug: currentScenarioSlug,
      relatedScenarioSlug: relatedSlug,
    });
  };

  return (
    <section id="related" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">
        Related client negotiation scenarios
      </h2>
      <ul className="grid gap-3 md:grid-cols-2">
        {relatedScenarios.map((scenario) => (
          <li
            key={scenario.slug}
            className="border-foreground/10 rounded-xl border p-4"
          >
            <Link
              href={`/scenarios/${scenario.slug}`}
              className="text-foreground hover:text-primary font-medium hover:underline"
              onClick={() => onRelatedClick(scenario.slug)}
            >
              {scenario.h1}
            </Link>
            <p className="text-muted-foreground mt-1 text-sm">
              {scenario.seoDescription}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
