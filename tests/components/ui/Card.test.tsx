import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/Card';
import { describe, it, expect } from 'vitest';

describe('Card Component', () => {
  it('renders without crashing', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default styling', () => {
    const { container } = render(<Card>Test Content</Card>);
    expect(container.firstChild).toHaveClass('bg-[var(--bg-surface)]');
    expect(container.firstChild).toHaveClass('border');
    expect(container.firstChild).toHaveClass('rounded-2xl');
  });

  it('applies additional className when provided', () => {
    const { container } = render(<Card className="custom-class">Test Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});