import { setRequestLocale } from 'next-intl/server';

import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Log in | Flowdockr',
  description: 'Continue with Google or GitHub to access your credits and saved deal history.',
  canonicalUrl: '/login',
  noIndex: true,
});

function sanitizeCallback(callbackUrl: string | undefined): string {
  const raw = String(callbackUrl || '').trim();
  if (!raw || !raw.startsWith('/')) {
    return '/dashboard';
  }

  if (raw.startsWith('//')) {
    return '/dashboard';
  }

  return raw;
}

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const query = await searchParams;
  const callbackUrl = sanitizeCallback(query.callbackUrl);

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <section className="mb-6 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Log in</h1>
        <p className="text-muted-foreground">
          Continue with your preferred provider to access credits and saved deals.
        </p>
      </section>
      <SocialLoginButtons callbackUrl={callbackUrl} />
    </main>
  );
}
