import type { ScenarioPageData } from '@/types/content';

type CommonClientMessagesProps = {
  scenario: ScenarioPageData;
};

export function CommonClientMessages({ scenario }: CommonClientMessagesProps) {
  if (scenario.commonClientMessages.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Common client messages
        </h2>
        <p className="text-sm text-slate-700">
          These are the kinds of pushback messages this page is designed to help
          you answer.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {scenario.commonClientMessages.map((message, index) => (
          <article
            key={message}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <p className="text-xs font-semibold tracking-[0.12em] text-slate-500 uppercase">
              Example {index + 1}
            </p>
            <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
              &ldquo;{message}&rdquo;
            </blockquote>
          </article>
        ))}
      </div>
    </section>
  );
}
