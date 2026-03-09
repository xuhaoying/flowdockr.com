import { Link } from '@/core/i18n/navigation';

export default function ScenarioNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Scenario not found</h1>
      <p className="mt-3 text-muted-foreground">
        This negotiation scenario is unavailable or moved.
      </p>
      <Link href="/scenario" className="mt-6 inline-block underline">
        Browse available scenarios
      </Link>
    </main>
  );
}
