'use client';

import { useState } from 'react';

import { trackEvent } from '@/lib/analytics-client';

import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';

type MagicLinkLoginFormProps = {
  callbackUrl?: string;
};

export function MagicLinkLoginForm({ callbackUrl }: MagicLinkLoginFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const sendMagicLink = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          callbackUrl,
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.message || 'Failed to send magic link.');
      }

      setSent(true);
      trackEvent('magic_link_sent', {
        callbackUrl: callbackUrl || '/dashboard',
      });
    } catch (magicLinkError) {
      setError(
        magicLinkError instanceof Error
          ? magicLinkError.message
          : 'Failed to send magic link.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="space-y-2">
        <label htmlFor="login_email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="login_email"
          type="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <Button
        type="button"
        onClick={sendMagicLink}
        disabled={loading || email.trim().length < 5}
      >
        {loading ? 'Sending...' : 'Send magic link'}
      </Button>

      {sent ? (
        <p className="text-sm text-muted-foreground">
          Check your inbox for a secure sign-in link.
        </p>
      ) : null}

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  );
}
