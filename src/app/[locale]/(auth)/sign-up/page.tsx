import { envConfigs } from '@/config';
import { defaultLocale } from '@/config/locale';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localePrefix = locale === defaultLocale ? '' : `/${locale}`;

  return {
    title: 'Sign up | Flowdockr',
    alternates: {
      canonical: `${envConfigs.site_url}${localePrefix}/signin`,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function SignUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { locale } = await params;
  const { callbackUrl } = await searchParams;
  const query = callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : '';
  redirect(`/${locale}/signin${query}`);
}
