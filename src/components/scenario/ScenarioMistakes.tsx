type ScenarioMistakesProps = {
  mistakes: string[];
  closingLine: string;
};

export function ScenarioMistakes({
  mistakes,
  closingLine,
}: ScenarioMistakesProps) {
  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5 shadow-sm">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Common mistakes freelancers make
        </h2>
        <ul className="space-y-3 text-sm text-slate-700">
          {mistakes.map((mistake) => (
            <li key={mistake} className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-300 text-xs font-semibold text-rose-700">
                !
              </span>
              <span>{mistake}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-slate-700">{closingLine}</p>
      </div>
    </section>
  );
}
