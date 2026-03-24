import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error('NEXT_NOT_FOUND');
  }),
  setRequestLocale: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  notFound: mocks.notFound,
}));

vi.mock('next-intl/server', () => ({
  setRequestLocale: mocks.setRequestLocale,
}));

vi.mock('@/components/pricing/PricingCards', () => ({
  PricingCards: () => <div>Pricing cards</div>,
}));

vi.mock('@/components/tool/RelatedScenarios', () => ({
  RelatedScenarios: () => <section>Related scenarios</section>,
}));

vi.mock('@/components/tool/ToolBestFor', () => ({
  ToolBestFor: () => <section>Best for</section>,
}));

vi.mock('@/components/tool/ToolExample', () => ({
  ToolExample: () => <section>Example output</section>,
}));

vi.mock('@/components/tool/ToolForm', () => ({
  ToolForm: () => <form aria-label="Tool form" />,
}));

vi.mock('@/components/tool/ToolHero', () => ({
  ToolHero: () => <section>Tool hero</section>,
}));

vi.mock('@/components/tool/ToolUseCases', () => ({
  ToolUseCases: () => <section>Use cases</section>,
}));

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import ToolPage from './page';

describe('tool page', () => {
  it('renders the expected inputs section for pricing tools', async () => {
    const view = await ToolPage({
      params: Promise.resolve({
        locale: 'en',
        slug: 'reply-generator',
      }),
      searchParams: Promise.resolve({}),
    });

    render(view);

    expect(
      screen.getByRole('heading', { name: 'Expected inputs' })
    ).toBeTruthy();
    expect(screen.getByText('Client message')).toBeTruthy();
    expect(screen.getByText('Paste the exact client message here')).toBeTruthy();
  });
});
