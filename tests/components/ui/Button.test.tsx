import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { describe, it, expect, vi } from 'vitest';

// Mock the Loader2 icon
vi.mock('lucide-react', () => ({
  Loader2: () => <svg data-testid="loader-icon" />
}));

describe('Button Component', () => {
  it('renders without crashing', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveClass('bg-blue-600');
  });

  it('applies secondary variant when specified', () => {
    const { container } = render(<Button variant="secondary">Test Button</Button>);
    expect(container.firstChild).toHaveClass('bg-[var(--bg-elevated)]');
  });

  it('applies ghost variant when specified', () => {
    const { container } = render(<Button variant="ghost">Test Button</Button>);
    expect(container.firstChild).toHaveClass('hover:bg-[var(--bg-elevated)]');
  });

  it('applies destructive variant when specified', () => {
    const { container } = render(<Button variant="destructive">Test Button</Button>);
    expect(container.firstChild).toHaveClass('bg-rose-600');
  });

  it('applies medium size by default', () => {
    const { container } = render(<Button>Test Button</Button>);
    expect(container.firstChild).toHaveClass('h-10');
  });

  it('applies small size when specified', () => {
    const { container } = render(<Button size="sm">Test Button</Button>);
    expect(container.firstChild).toHaveClass('h-8');
  });

  it('applies large size when specified', () => {
    const { container } = render(<Button size="lg">Test Button</Button>);
    expect(container.firstChild).toHaveClass('h-12');
  });

  it('shows loader when loading is true', () => {
    render(<Button loading>Test Button</Button>);
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Test Button</Button>);
    fireEvent.click(screen.getByText('Test Button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('disables button when disabled is true', () => {
    const { container } = render(<Button disabled>Test Button</Button>);
    expect(container.firstChild).toBeDisabled();
  });
});