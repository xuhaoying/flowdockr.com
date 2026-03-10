import { Scenario } from '@/types/scenario';

type ScenarioExampleComparisonProps = {
  scenario: Scenario;
};

const WEAK_REPLY_BY_SLUG: Record<string, string> = {
  'lowball-offer':
    "I can lower my rate to match that if needed. Let me know what number works for you.",
  'client-asks-discount':
    "Sure, I can give a discount on the same scope. We can figure out details later.",
  'cheaper-freelancer':
    "I can reduce my quote so we're closer to the cheaper option.",
  'free-sample-work':
    "No problem, I'll do a quick unpaid sample first and we can decide after.",
  'more-work-same-budget':
    "Okay, I'll include those extras in the current budget this time.",
  'budget-limited':
    "I can do everything in the original scope at a lower price.",
  'delayed-decision':
    "I haven't heard back, so please decide quickly or I will close this.",
  'small-extra-free':
    "Sure, I'll add it for free. It's not a big deal.",
};

export function ScenarioExampleComparison({ scenario }: ScenarioExampleComparisonProps) {
  const weakReply =
    WEAK_REPLY_BY_SLUG[scenario.slug] ||
    'Understood. I can be flexible and adjust everything to make this work.';

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Example comparison</h2>

      <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Client says</p>
        <p className="mt-2 text-sm text-slate-700">{scenario.exampleClientMessage}</p>
      </article>

      <div className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">Weak reply</p>
          <p className="mt-2 text-sm text-rose-800">{weakReply}</p>
        </article>
        <article className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Better reply
          </p>
          <p className="mt-2 text-sm text-emerald-900">{scenario.exampleReply}</p>
        </article>
      </div>

      <article className="rounded-xl border border-slate-200 p-4">
        <h3 className="text-sm font-semibold text-slate-900">Why better</h3>
        <ul className="mt-2 space-y-2 text-sm text-slate-700">
          {scenario.strategyBullets.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
