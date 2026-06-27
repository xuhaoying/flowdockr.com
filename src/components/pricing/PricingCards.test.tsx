import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PricingCards } from './PricingCards';

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('@/lib/analytics-client', () => ({
  trackEvent: vi.fn(),
}));

describe('PricingCards', () => {
  it('keeps the free trial CTA pointed at the generator outside tool pages', () => {
    render(<PricingCards sourcePage="home" />);

    expect(
      screen.getByRole('link', { name: 'Try a scenario' }).getAttribute('href')
    ).toBe('/tools/reply-generator');
  });

  it('avoids a self-link on tool pages by sending the free trial CTA to the scenario hub', () => {
    render(<PricingCards sourcePage="tool" />);

    expect(
      screen
        .getByRole('link', { name: 'Browse scenarios' })
        .getAttribute('href')
    ).toBe('/scenario');
  });
});
