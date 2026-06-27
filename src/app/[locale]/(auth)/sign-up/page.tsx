import { redirect } from 'next/navigation';

import { envConfigs } from '@/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return {
    title: 'Sign up | FlowDockr',
    alternates: {
      canonical: `${envConfigs.site_url}/signin`,
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
  await params;
  const { callbackUrl } = await searchParams;
  const query = callbackUrl
    ? `?callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '';
  redirect(`/signin${query}`);
}
