export default function ScenarioLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="space-y-4">
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
      </div>
      <div className="mt-8 h-80 animate-pulse rounded-lg border bg-muted/50" />
    </main>
  );
}
