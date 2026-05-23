import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { describe, it, expect, vi } from 'vitest';

// Mock the Loader2 icon
vi.mock('lucide-react', () => ({
  Loader2: () => <div>Loading Icon</div>
}));

describe('Button Component', () => {
  it('renders a button with the correct text', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByText('Primary')).toHaveClass('bg-blue-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByText('Secondary')).toHaveClass('bg-[var(--bg-elevated)]');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByText('Ghost')).toHaveClass('hover:bg-[var(--bg-elevated)]');

    rerender(<Button variant="destructive">Destructive</Button>);
    expect(screen.getByText('Destructive')).toHaveClass('bg-rose-600');
  });

  it('applies the correct size classes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByText('Small')).toHaveClass('h-8');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByText('Medium')).toHaveClass('h-10');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByText('Large')).toHaveClass('h-12');
  });

  it('shows loading state when loading prop is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByText('Loading Icon')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });
});
