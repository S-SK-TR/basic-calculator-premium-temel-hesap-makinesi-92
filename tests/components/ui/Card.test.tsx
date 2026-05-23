import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders children inside a card', () => {
    render(
      <Card>
        <div data-testid="child">Test Child</div>
      </Card>
    );

    // Check if child is rendered inside the card
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies additional className to the card', () => {
    render(
      <Card className="custom-class">
        <div>Test Child</div>
      </Card>
    );

    // Check if custom class is applied to the card
    const card = screen.getByText('Test Child').parentElement;
    expect(card).toHaveClass('custom-class');
  });
});
