import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn()
  }))
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  Sun: () => <span data-testid="sun-icon">Sun</span>,
  Moon: () => <span data-testid="moon-icon">Moon</span>
}));

describe('ThemeToggle Component', () => {
  it('renders correctly with light theme', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('moon-icon')).not.toBeInTheDocument();
  });

  it('renders correctly with dark theme', () => {
    // Mock the useTheme hook to return dark theme
    vi.mock('@/hooks/useTheme', () => ({
      useTheme: vi.fn(() => ({
        theme: 'dark',
        toggleTheme: vi.fn()
      }))
    }));

    render(<ThemeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('sun-icon')).not.toBeInTheDocument();
  });

  it('calls toggleTheme when clicked', () => {
    const toggleTheme = vi.fn();
    vi.mock('@/hooks/useTheme', () => ({
      useTheme: vi.fn(() => ({
        theme: 'light',
        toggleTheme
      }))
    }));

    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleTheme).toHaveBeenCalled();
  });
});