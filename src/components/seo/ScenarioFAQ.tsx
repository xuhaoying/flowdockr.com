import { ScenarioContent } from '@/types/scenario';

type ScenarioFAQProps = {
  scenario: ScenarioContent;
};

export function ScenarioFAQ({ scenario }: ScenarioFAQProps) {
  return (
    <section id="faq" className="space-y-3">
      <h2 className="text-2xl font-semibold tracking-tight">FAQ</h2>
      <div className="space-y-2">
        {scenario.faq.map((item) => (
          <details
            key={item.question}
            className="border-foreground/10 bg-background rounded-xl border p-4"
          >
            <summary className="cursor-pointer text-sm font-medium">
              {item.question}
            </summary>
            <p className="text-muted-foreground mt-2 text-sm">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
