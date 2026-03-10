import { setRequestLocale } from 'next-intl/server';

import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons';
import { MagicLinkLoginForm } from '@/components/tool';
import { getMetadata } from '@/shared/lib/seo';

export const generateMetadata = getMetadata({
  title: 'Log in | Flowdockr',
  description: 'Continue with Google or email magic link to access your credits and saved deal history.',
  canonicalUrl: '/signin',
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
          Continue with Google or use a magic link to access credits and saved deals.
        </p>
      </section>
      <div className="space-y-4">
        <SocialLoginButtons callbackUrl={callbackUrl} />
        <div className="text-center text-xs uppercase tracking-wide text-slate-500">or</div>
        <MagicLinkLoginForm callbackUrl={callbackUrl} />
      </div>
    </main>
  );
}
