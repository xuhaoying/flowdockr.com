import { Link } from '@/core/i18n/navigation';

export default function ToolNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Tool not found</h1>
      <p className="mt-3 text-muted-foreground">The tool may have moved or is not in this launch cluster.</p>
      <Link href="/tools/" className="mt-6 inline-block underline">
        Browse tools
      </Link>
    </main>
  );
}
