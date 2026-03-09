'use client';

import { ReactNode, useState } from 'react';
import { RiGithubFill, RiGoogleFill } from 'react-icons/ri';

import { signIn } from '@/core/auth/client';
import { trackEvent } from '@/lib/analytics-client';
import { Button } from '@/shared/components/ui/button';

type SocialLoginButtonsProps = {
  callbackUrl?: string;
};

type Provider = 'google' | 'github';

const PROVIDERS: Array<{
  id: Provider;
  label: string;
  icon: ReactNode;
}> = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: <RiGoogleFill className="h-4 w-4" />,
  },
  {
    id: 'github',
    label: 'Continue with GitHub',
    icon: <RiGithubFill className="h-4 w-4" />,
  },
];

export function SocialLoginButtons({ callbackUrl = '/dashboard' }: SocialLoginButtonsProps) {
  const [loading, setLoading] = useState<Provider | null>(null);
  const [error, setError] = useState('');

  const onSignIn = async (provider: Provider) => {
    setLoading(provider);
    setError('');

    await signIn.social(
      {
        provider,
        callbackURL: callbackUrl,
      },
      {
        onRequest: () => {
          trackEvent('social_login_started', { provider, callbackUrl });
        },
        onSuccess: () => {
          trackEvent('social_login_success', { provider, callbackUrl });
        },
        onError: (event) => {
          setLoading(null);
          setError(event?.error?.message || 'Failed to continue. Please try again.');
          trackEvent('social_login_failed', {
            provider,
            callbackUrl,
            reason: event?.error?.message || 'UNKNOWN',
          });
        },
      }
    );
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {PROVIDERS.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          className="h-11 w-full justify-center gap-2 rounded-xl"
          disabled={loading !== null}
          onClick={() => onSignIn(provider.id)}
        >
          {provider.icon}
          {loading === provider.id ? 'Redirecting...' : provider.label}
        </Button>
      ))}

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
