import { Link } from '@/core/i18n/navigation';

export default function GuideNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Guide not found</h1>
      <p className="mt-3 text-muted-foreground">The guide may have moved or is not in this launch cluster.</p>
      <Link href="/guides/" className="mt-6 inline-block underline">
        Browse guides
      </Link>
    </main>
  );
}
