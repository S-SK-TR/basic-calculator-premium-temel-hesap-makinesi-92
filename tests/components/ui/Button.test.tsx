import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

// Mock the Loader2 icon
vi.mock('lucide-react', () => ({
  Loader2: () => <span data-testid="loader">Loader</span>
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
    expect(button).toHaveClass('text-white');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-[var(--bg-elevated)]');
    expect(button).toHaveClass('text-[var(--text-primary)]');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('hover:bg-[var(--bg-elevated)]');
    expect(button).toHaveClass('text-[var(--text-muted)]');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('bg-rose-600');
    expect(button).toHaveClass('text-white');
  });

  it('renders with loading state', () => {
    render(<Button loading>Click Me</Button>);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click Me</Button>);
    const button = screen.getByText('Click Me');
    expect(button).toBeDisabled();
  });
});