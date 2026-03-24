import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ScenarioReplyPreview } from './ScenarioReplyPreview';

describe('ScenarioReplyPreview', () => {
  it('does not render when reply data is missing', () => {
    const { container } = render(<ScenarioReplyPreview />);

    expect(container.firstChild).toBeNull();
  });

  it('renders a single preview reply and generator CTA', () => {
    render(
      <ScenarioReplyPreview reply="Thanks for sharing that. If budget is the issue, I can suggest a leaner version without weakening the original scope." />
    );

    expect(screen.getByText('Reply preview')).toBeTruthy();
    expect(
      screen.getByText(
        'Thanks for sharing that. If budget is the issue, I can suggest a leaner version without weakening the original scope.'
      )
    ).toBeTruthy();
    expect(
      screen
        .getByRole('link', { name: 'Generate a better reply' })
        .getAttribute('href')
    ).toBe('#scenario-inline-tool');
  });
});
