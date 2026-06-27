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
            className="border-foreground/10 bg-muted/20 rounded-xl border p-4"
          >
            <div className="flex items-center gap-2">
              <Quote className="text-primary size-4" />
              <h3 className="text-sm font-semibold">{example.title}</h3>
            </div>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {example.reply}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
