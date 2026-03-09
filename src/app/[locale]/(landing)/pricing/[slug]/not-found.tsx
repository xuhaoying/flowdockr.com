import { Link } from '@/core/i18n/navigation';

export default function PricingScenarioNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Pricing scenario not found</h1>
      <p className="mt-3 text-muted-foreground">The page may have moved or is not part of the launch cluster.</p>
      <Link href="/pricing" className="mt-6 inline-block underline">
        Browse pricing hub
      </Link>
    </main>
  );
}
