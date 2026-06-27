export default function PricingScenarioLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="space-y-4">
        <div className="bg-muted h-4 w-52 animate-pulse rounded" />
        <div className="bg-muted h-10 w-3/4 animate-pulse rounded" />
        <div className="bg-muted h-5 w-2/3 animate-pulse rounded" />
      </div>
      <div className="bg-muted/50 mt-8 h-80 animate-pulse rounded-lg border" />
    </main>
  );
}
