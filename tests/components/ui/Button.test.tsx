import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import { describe, it, expect, vi } from 'vitest';

// Mock the Loader2 icon
vi.mock('lucide-react', () => ({
  Loader2: () => <div>Loader2</div>
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // primary variant
    expect(button).toHaveClass('h-10'); // md size
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-[var(--bg-elevated)]');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('hover:bg-[var(--bg-elevated)]');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-rose-600');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('h-8');
  });

  it('renders with large size', () => {
    render(<Button size="lg">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('h-12');
  });

  it('shows loading state', () => {
    render(<Button loading>Click Me</Button>);
    expect(screen.getByText('Loader2')).toBeInTheDocument();
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClickMock).toHaveBeenCalled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click Me</Button>);
    const button = screen.getByText('Loader2').closest('button');
    expect(button).toBeDisabled();
  });
});
