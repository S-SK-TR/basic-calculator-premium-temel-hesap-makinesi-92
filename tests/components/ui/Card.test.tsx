import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<Card className="custom-class">Test Content</Card>);
    const card = screen.getByText('Test Content').parentElement;
    expect(card).toHaveClass('custom-class');
  });

  it('has default styling classes', () => {
    render(<Card>Test Content</Card>);
    const card = screen.getByText('Test Content').parentElement;
    expect(card).toHaveClass('bg-[var(--bg-surface)]');
    expect(card).toHaveClass('border');
    expect(card).toHaveClass('border-[var(--border)]');
    expect(card).toHaveClass('rounded-2xl');
  });
});
