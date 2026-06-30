import type { ScenarioDetailContent } from '@/lib/content/scenarioDetailContent';

import { Link } from '@/core/i18n/navigation';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ScenarioDetailSectionsProps = {
  content: ScenarioDetailContent;
};

export function ScenarioDetailSections({
  content,
}: ScenarioDetailSectionsProps) {
  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Reply playbook
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          What to do before you reply
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          {content.intentSummary}
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="grid gap-3 md:grid-cols-2">
          <article className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Use this when
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {content.useWhen.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-[18px] border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Do not use this for
            </h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {content.notFor.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            What to do now
          </h3>
          <ol className="grid gap-3 md:grid-cols-3">
            {content.steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                  Step {index + 1}
                </p>
                <h4 className="mt-2 text-sm font-semibold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Copy-ready tone options
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            {content.toneExamples.map((example) => (
              <article
                key={example.tone}
                className="rounded-[18px] border border-slate-200 bg-white p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {example.tone}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {example.text}
                </p>
                <p className="mt-3 text-xs leading-5 text-slate-600">
                  <span className="font-semibold text-slate-900">
                    Best for:
                  </span>{' '}
                  {example.bestFor}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[18px] border border-rose-200 bg-rose-50/70 p-4">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Wrong replies to avoid
          </h3>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
            {content.mistakes.map((mistake) => (
              <li key={mistake} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-rose-300 text-xs font-semibold text-rose-700">
                  !
                </span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight text-slate-900">
            Common questions
          </h3>
          <div className="space-y-2">
            {content.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-[14px] border border-slate-200 bg-slate-50/70 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  {item.question}
                </summary>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {content.distinctions.length > 0 ? (
          <section className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              Similar scenario, different move
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              {content.distinctions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[18px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 hover:bg-slate-50"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </CardContent>
    </Card>
  );
}
