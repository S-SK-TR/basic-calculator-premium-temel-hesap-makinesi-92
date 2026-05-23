import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn()
  })
}));

describe('ThemeProvider Component', () => {
  it('renders children with the correct theme class', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );

    // Check if child is rendered
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Check if theme class is applied to the root element
    const rootElement = document.documentElement;
    expect(rootElement.classList.contains('light')).toBe(true);
  });

  it('applies dark theme class when theme is dark', () => {
    // Mock useTheme to return dark theme
    vi.mock('@/hooks/useTheme', () => ({
      useTheme: () => ({
        theme: 'dark',
        toggleTheme: vi.fn()
      })
    }));

    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );

    // Check if dark theme class is applied
    const rootElement = document.documentElement;
    expect(rootElement.classList.contains('dark')).toBe(true);
  });
});
