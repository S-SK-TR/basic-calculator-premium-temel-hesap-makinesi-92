import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

// Mock the Loader2 icon
jest.mock('lucide-react', () => ({
  Loader2: () => <div data-testid="loader-icon">Loader</div>
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: 'Click Me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
    expect(button).not.toHaveClass('disabled:opacity-50');
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('bg-blue-600');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('bg-[var(--bg-elevated)]');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-[var(--bg-elevated)]');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole('button', { name: 'Destructive' });
    expect(button).toHaveClass('bg-rose-600');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button', { name: 'Small' })).toHaveClass('h-8');

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole('button', { name: 'Medium' })).toHaveClass('h-10');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button', { name: 'Large' })).toHaveClass('h-12');
  });

  it('shows loading state when loading prop is true', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByTestId('loader-icon')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
  });

  it('renders with icon when icon prop is provided', () => {
    const TestIcon = () => <div data-testid="test-icon">Test Icon</div>;
    render(<Button icon={TestIcon}>With Icon</Button>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Clickable' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
