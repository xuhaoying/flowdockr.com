import { ScenarioContent } from '@/types/scenario';
import { Quote } from 'lucide-react';

type ScenarioExamplesProps = {
  scenario: ScenarioContent;
};

export function ScenarioExamples({ scenario }: ScenarioExamplesProps) {
  return (
    <section id="examples" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">Example replies</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.examples.map((example) => (
          <article
            key={example.title}
            className="rounded-xl border border-foreground/10 bg-muted/20 p-4"
          >
            <div className="flex items-center gap-2">
              <Quote className="size-4 text-primary" />
              <h3 className="text-sm font-semibold">{example.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {example.reply}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
