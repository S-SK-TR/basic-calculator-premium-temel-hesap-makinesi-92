import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from '@/hooks/useTheme';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn()
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  Sun: () => <div>Sun Icon</div>,
  Moon: () => <div>Moon Icon</div>
}));

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn()
    });
  });

  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);

    // Check if button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows sun icon when theme is light', () => {
    render(<ThemeToggle />);

    // Check if sun icon is rendered
    expect(screen.getByText('Sun Icon')).toBeInTheDocument();
  });

  it('shows moon icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: vi.fn()
    });

    render(<ThemeToggle />);

    // Check if moon icon is rendered
    expect(screen.getByText('Moon Icon')).toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    const toggleThemeMock = vi.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock
    });

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));

    // Check if toggleTheme function was called
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
