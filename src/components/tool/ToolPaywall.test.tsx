import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ToolPaywall } from './ToolPaywall';

describe('ToolPaywall', () => {
  it('does not allow anonymous checkout from the paid pack buttons', () => {
    const onCheckout = vi.fn();

    render(
      <ToolPaywall
        loggedIn={false}
        loadingPackageId={null}
        onCheckout={onCheckout}
      />
    );

    const buttons = screen.getAllByRole('button', { name: /sign in to buy/i });
    expect(buttons.length).toBeGreaterThan(0);

    for (const button of buttons) {
      expect((button as HTMLButtonElement).disabled).toBe(true);
      fireEvent.click(button);
    }

    expect(onCheckout).not.toHaveBeenCalled();
  });

  it('allows checkout after the user is authenticated', () => {
    const onCheckout = vi.fn();

    render(
      <ToolPaywall
        loggedIn={true}
        loadingPackageId={null}
        onCheckout={onCheckout}
      />
    );

    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(onCheckout).toHaveBeenCalledTimes(1);
  });
});
