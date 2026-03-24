import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/core/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

import { RelatedScenarios } from './RelatedScenarios';

describe('RelatedScenarios', () => {
  it('renders grouped similar and next-step scenario sections when groups are provided', () => {
    render(
      <RelatedScenarios
        title="Related payment scenarios"
        description="Move from the current payment issue into the next likely conversation."
        groups={[
          {
            id: 'similar',
            title: 'Similar scenarios',
            description:
              'Close variants of this client conversation that need a similar kind of reply.',
            items: [
              {
                slug: 'unpaid-invoice-follow-up',
                title: 'How to follow up on an unpaid invoice',
                description:
                  'The invoice is outstanding and you need to follow up without sounding apologetic or vague.',
              },
            ],
          },
          {
            id: 'next_step',
            title: 'Next-step scenarios',
            description:
              'If the payment issue keeps dragging, these are the next money conversations you are likely to hit.',
            items: [
              {
                slug: 'final-payment-reminder',
                title: 'Final payment reminder',
                description:
                  'You need a final reminder before the payment issue turns into an escalation.',
              },
            ],
          },
        ]}
      />
    );

    expect(screen.getByText('Related payment scenarios')).toBeTruthy();
    expect(screen.getByText('Similar scenarios')).toBeTruthy();
    expect(screen.getByText('Next-step scenarios')).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: /How to follow up on an unpaid invoice/i })
        .getAttribute('href')
    ).toBe('/scenario/unpaid-invoice-follow-up');
    expect(
      screen
        .getByRole('link', { name: /Final payment reminder/i })
        .getAttribute('href')
    ).toBe('/scenario/final-payment-reminder');
  });
});
