import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({
    theme: 'light',
    toggleTheme: vi.fn()
  }))
}));

// Mock the children component
const MockChild = () => <div data-testid="child">Child Component</div>;

describe('ThemeProvider Component', () => {
  it('renders children with light theme by default', () => {
    render(
      <ThemeProvider>
        <MockChild />
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    // Check if the theme class is applied to the document
    expect(document.documentElement).toHaveClass('light');
  });

  it('applies dark theme when theme is dark', () => {
    // Mock the useTheme hook to return dark theme
    vi.mock('@/hooks/useTheme', () => ({
      useTheme: vi.fn(() => ({
        theme: 'dark',
        toggleTheme: vi.fn()
      }))
    }));

    render(
      <ThemeProvider>
        <MockChild />
      </ThemeProvider>
    );

    expect(document.documentElement).toHaveClass('dark');
  });
});