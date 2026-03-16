type ScenarioDifficultyProps = {
  title?: string;
  points: string[];
};

export function ScenarioDifficulty({
  title = 'Best response strategy',
  points,
}: ScenarioDifficultyProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          {title}
        </h2>
        <ul className="space-y-3 text-sm text-slate-700">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1.5 inline-block h-2 w-2 rounded-full bg-slate-500" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
