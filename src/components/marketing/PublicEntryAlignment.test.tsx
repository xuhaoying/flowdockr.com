import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  usePathname: () => '/',
}));

vi.mock('@/core/auth/client', () => ({
  useSession: () => ({
    data: null,
    isPending: false,
  }),
}));

vi.mock('@/shared/blocks/sign/sign-user', () => ({
  SignUser: () => <div data-testid="sign-user" />,
}));

import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicHeader } from '@/components/layout/PublicHeader';

import { ConversationSurfaces } from './ConversationSurfaces';
import { ExampleConversation } from './ExampleConversation';
import { FinalCta } from './FinalCta';
import { HomepageHero } from './HomepageHero';
import { ProblemStrip } from './ProblemStrip';

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
        .getAllByRole('link', { name: 'Browse reply scenarios' })
        .every((link) => link.getAttribute('href') === '/scenario')
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
      stripLinks.every((link) => link.getAttribute('href')?.startsWith('/scenario/'))
    ).toBe(true);
    expect(screen.getByRole('link', { name: 'See full scenario' }).getAttribute('href')).toBe(
      '/scenario/quote-too-high'
    );
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

  it('removes pricing as a primary public navigation destination', async () => {
    render(
      <>
        <PublicHeader />
        <PublicFooter />
      </>
    );

    await waitFor(() => {
      expect(screen.getAllByRole('link', { name: 'Tools' }).length).toBeGreaterThan(0);
    });

    expect(screen.queryByRole('link', { name: 'Pricing' })).toBeNull();

    const footerUseCaseLinks = screen.getAllByRole('link').filter((link) =>
      [
        'Client says your quote is too high',
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
