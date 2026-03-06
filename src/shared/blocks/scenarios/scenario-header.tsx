import { ScenarioDefinition } from '@/lib/promptTemplates';

type ScenarioHeaderProps = {
  scenario: ScenarioDefinition;
};

export function ScenarioHeader({ scenario }: ScenarioHeaderProps) {
  return (
    <header className="space-y-4">
      <p className="inline-flex rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Scenario-Driven Negotiation Assistant
      </p>
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{scenario.h1}</h1>
      <p className="max-w-2xl text-base text-muted-foreground">{scenario.shortExplanation}</p>
    </header>
  );
}
