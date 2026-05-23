import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders correctly with default props', () => {
    render(<Card>Test Content</Card>);
    const card = screen.getByText('Test Content').closest('div');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-[var(--bg-surface)]');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('rounded-2xl');
  });

  it('applies additional className', () => {
    render(<Card className="custom-class">Test Content</Card>);
    const card = screen.getByText('Test Content').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    render(
      <Card>
        <div data-testid="child">Test Child</div>
      </Card>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
