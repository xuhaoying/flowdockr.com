import type { ReactNode } from 'react';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ConversationSurfaces } from './ConversationSurfaces';
import { ExampleConversation } from './ExampleConversation';
import { FinalCta } from './FinalCta';
import { HomepageHero } from './HomepageHero';
import { ProblemStrip } from './ProblemStrip';

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next-intl', () => ({
  useLocale: () => 'en',
}));

describe('public marketing entry alignment', () => {
  it('points homepage hero and final CTA toward canonical scenario-first entry points', () => {
    render(
      <>
        <HomepageHero />
        <FinalCta />
      </>
    );

    expect(
      screen
        .getAllByRole('link', { name: 'Browse templates' })
        .every(
          (link) =>
            link.getAttribute('href') === '/client-communication-templates'
        )
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: 'Open reply generator' })
        .every((link) => link.getAttribute('href') === '/tools/reply-generator')
    ).toBe(true);
    expect(screen.queryByText('Open pricing decision paths')).toBeNull();
  });

  it('keeps homepage problem-strip and example links inside canonical scenario routes', () => {
    render(
      <>
        <ProblemStrip />
        <ExampleConversation />
      </>
    );

    const stripLinks = screen.getAllByRole('link').filter((link) => {
      return link.textContent !== 'See full scenario';
    });

    expect(
      stripLinks.every((link) =>
        link.getAttribute('href')?.startsWith('/scenario/')
      )
    ).toBe(true);
    expect(
      screen
        .getByRole('link', { name: 'See full scenario' })
        .getAttribute('href')
    ).toBe('/scenario/quote-too-high');
  });

  it('describes payment, scope, and proposal follow-up scenarios as live', () => {
    render(<ConversationSurfaces />);

    expect(
      screen.getByText(
        /Pricing, payment, scope, and proposal follow-up scenarios are live now/i
      )
    ).toBeTruthy();
    expect(screen.getByText('Scope scenarios (live)')).toBeTruthy();
    expect(screen.getByText('Payment scenarios (live)')).toBeTruthy();
    expect(screen.getByText('Proposal follow-up (live)')).toBeTruthy();
  });

  it('keeps pricing, compliance, and legal policy routes visible in public navigation', async () => {
    render(
      <>
        <PublicHeader />
        <PublicFooter />
      </>
    );

    await waitFor(() => {
      expect(
        screen.getAllByRole('link', { name: 'Tools' }).length
      ).toBeGreaterThan(0);
    });

    expect(
      screen
        .getAllByRole('link', { name: 'Pricing' })
        .every((link) => link.getAttribute('href') === '/pricing')
    ).toBe(true);

    expect(
      screen
        .getByRole('link', { name: 'Business Compliance' })
        .getAttribute('href')
    ).toBe('/compliance');
    expect(
      screen
        .getByRole('link', { name: 'Terms of Service' })
        .getAttribute('href')
    ).toBe('/terms');
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' }).getAttribute('href')
    ).toBe('/privacy');
    expect(
      screen.getByRole('link', { name: 'Refund Policy' }).getAttribute('href')
    ).toBe('/refund');
    expect(
      screen
        .getAllByRole('link', { name: 'Contact' })
        .every((link) => link.getAttribute('href') === '/contact')
    ).toBe(true);

    const footerUseCaseLinks = screen
      .getAllByRole('link')
      .filter((link) =>
        [
          'Client says your quote is too high',
          'Ask for payment politely',
          'Say work is out of scope',
          'Client asks for a discount',
          'Client wants extra work for free',
        ].includes(link.textContent || '')
      );

    expect(
      footerUseCaseLinks.every((link) =>
        link.getAttribute('href')?.startsWith('/scenario/')
      )
    ).toBe(true);
  });
});
