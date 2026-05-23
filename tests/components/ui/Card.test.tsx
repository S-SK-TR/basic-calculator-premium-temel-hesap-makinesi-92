import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../../../src/components/ui/Card';

// Mock the cn utility
vi.mock('../../../src/lib/utils', () => ({
  cn: (...classes: string[]) => classes.join(' ')
}));

describe('Card Component', () => {
  it('renders correctly with default props', () => {
    render(<Card>Test Content</Card>);

    // Check if card is rendered with default props
    const card = screen.getByText('Test Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl');
  });

  it('renders correctly with custom className', () => {
    render(<Card className="custom-class">Test Content</Card>);

    // Check if card is rendered with custom className
    const card = screen.getByText('Test Content');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('custom-class');
  });
});