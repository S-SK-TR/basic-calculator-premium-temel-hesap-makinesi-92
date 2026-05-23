import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

// Mock the children component
const MockChild = () => <div data-testid="child">Child Component</div>;

describe('Card Component', () => {
  it('renders correctly with default props', () => {
    render(
      <Card>
        <MockChild />
      </Card>
    );

    const card = screen.getByTestId('child').parentElement;
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-[var(--bg-surface)]');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-[var(--border)]');
    expect(card).toHaveClass('rounded-2xl');
  });

  it('applies additional className', () => {
    render(
      <Card className="custom-class">
        <MockChild />
      </Card>
    );

    const card = screen.getByTestId('child').parentElement;
    expect(card).toHaveClass('custom-class');
  });
});