import { TRACKING_CONSENT_COOKIE } from '@/lib/trust';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CookieConsentBanner } from './CookieConsentBanner';

const refresh = vi.hoisted(() => vi.fn());

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    refresh,
  }),
}));

describe('CookieConsentBanner', () => {
  beforeEach(() => {
    refresh.mockReset();
    window.localStorage.clear();
    document.cookie = `${TRACKING_CONSENT_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
  });

  it('dismisses immediately and stores declined consent', async () => {
    render(<CookieConsentBanner privacyHref="/privacy" />);

    expect(
      screen.getByRole('dialog', { name: /cookie and analytics consent/i })
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole('button', { name: /keep essential only/i })
    );

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', {
          name: /cookie and analytics consent/i,
        })
      ).toBeNull();
    });

    expect(document.cookie).toContain(`${TRACKING_CONSENT_COOKIE}=declined`);
    expect(window.localStorage.getItem(TRACKING_CONSENT_COOKIE)).toBe(
      'declined'
    );
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('dismisses immediately and stores accepted consent', async () => {
    render(<CookieConsentBanner privacyHref="/privacy" />);

    fireEvent.click(screen.getByRole('button', { name: /allow analytics/i }));

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', {
          name: /cookie and analytics consent/i,
        })
      ).toBeNull();
    });

    expect(document.cookie).toContain(`${TRACKING_CONSENT_COOKIE}=accepted`);
    expect(window.localStorage.getItem(TRACKING_CONSENT_COOKIE)).toBe(
      'accepted'
    );
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('hides on mount when a local storage fallback already exists', async () => {
    window.localStorage.setItem(TRACKING_CONSENT_COOKIE, 'declined');

    render(<CookieConsentBanner privacyHref="/privacy" />);

    await waitFor(() => {
      expect(
        screen.queryByRole('dialog', {
          name: /cookie and analytics consent/i,
        })
      ).toBeNull();
    });

    expect(document.cookie).toContain(`${TRACKING_CONSENT_COOKIE}=declined`);
  });
});
