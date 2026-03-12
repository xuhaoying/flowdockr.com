import type { ScenarioPageData } from '@/types/content';

type ExampleRepliesProps = {
  scenario: ScenarioPageData;
};

const toneCards: Array<{
  key: keyof ScenarioPageData['exampleReplies'];
  title: string;
  whyThisWorks: string;
}> = [
  {
    key: 'concise',
    title: 'Concise',
    whyThisWorks:
      'Use this when you want to acknowledge the objection quickly and test whether budget is the real blocker.',
  },
  {
    key: 'warm',
    title: 'Warm',
    whyThisWorks:
      'Use this when you want to preserve trust while still holding the line on the original pricing logic.',
  },
  {
    key: 'firm',
    title: 'Firm',
    whyThisWorks:
      'Use this when you need to reset boundaries clearly and move the conversation toward scope trade-offs instead of discounts.',
  },
];

export function ExampleReplies({ scenario }: ExampleRepliesProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Example replies
      </h2>
      <div className="grid gap-3 md:grid-cols-3">
        {toneCards.map((tone) => (
          <article
            key={tone.key}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {tone.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {scenario.exampleReplies[tone.key]}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              <span className="font-semibold text-slate-900">
                Why this works:
              </span>{' '}
              {tone.whyThisWorks}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
