import { envConfigs } from '@/config';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return {
    title: 'Sign up | Flowdockr',
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
  const query = callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : '';
  redirect(`/signin${query}`);
}
