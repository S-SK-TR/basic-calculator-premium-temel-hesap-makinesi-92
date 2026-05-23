import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../../src/components/ui/Button';

// Mock the cn utility
vi.mock('../../../src/lib/utils', () => ({
  cn: (...classes: string[]) => classes.join(' ')
}));

// Mock the Loader2 icon
vi.mock('lucide-react', () => ({
  Loader2: () => <div>Loader2</div>
}));

describe('Button Component', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click Me</Button>);

    // Check if button is rendered with default props
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20');
    expect(button).toHaveClass('h-10 px-4 text-sm');
  });

  it('renders correctly with variant prop', () => {
    render(<Button variant="secondary">Click Me</Button>);

    // Check if button is rendered with secondary variant
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[var(--bg-elevated)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)]');
  });

  it('renders correctly with size prop', () => {
    render(<Button size="lg">Click Me</Button>);

    // Check if button is rendered with lg size
    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-12 px-6 text-base');
  });

  it('shows loading state when loading prop is true', () => {
    render(<Button loading>Click Me</Button>);

    // Check if loading state is shown
    expect(screen.getByText('Loader2')).toBeInTheDocument();
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click Me</Button>);

    // Click the button
    fireEvent.click(screen.getByText('Click Me'));
    expect(onClick).toHaveBeenCalled();
  });
});