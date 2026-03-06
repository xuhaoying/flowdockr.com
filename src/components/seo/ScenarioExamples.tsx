import { ScenarioContent } from '@/types/scenario';

type ScenarioExamplesProps = {
  scenario: ScenarioContent;
};

export function ScenarioExamples({ scenario }: ScenarioExamplesProps) {
  return (
    <section id="examples" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">Example replies</h2>
      <div className="grid gap-3">
        {scenario.examples.map((example) => (
          <article key={example.title} className="rounded-md border bg-muted/30 p-4">
            <h3 className="text-sm font-semibold">{example.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {example.reply}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
