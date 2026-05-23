import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn()
}));

// Mock icons
vi.mock('lucide-react', () => ({
  Moon: () => <div>Moon</div>,
  Sun: () => <div>Sun</div>
}));

describe('ThemeToggle Component', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });
  });

  it('renders correctly in light mode', () => {
    render(<ThemeToggle />);
    expect(screen.getByText('Moon')).toBeInTheDocument();
    expect(screen.queryByText('Sun')).not.toBeInTheDocument();
  });

  it('renders correctly in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme
    });

    render(<ThemeToggle />);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.queryByText('Moon')).not.toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
