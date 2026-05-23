import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: vi.fn(() => ({ theme: 'light', toggleTheme: vi.fn() }))
}));

describe('ThemeProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('applies light theme by default', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );
    const htmlElement = document.documentElement;
    expect(htmlElement.classList.contains('light')).toBe(true);
    expect(htmlElement.classList.contains('dark')).toBe(false);
  });

  it('applies dark theme when theme is dark', () => {
    vi.mock('@/hooks/useTheme', () => ({
      useTheme: vi.fn(() => ({ theme: 'dark', toggleTheme: vi.fn() }))
    }));

    render(
      <ThemeProvider>
        <div data-testid="child">Test Child</div>
      </ThemeProvider>
    );
    const htmlElement = document.documentElement;
    expect(htmlElement.classList.contains('dark')).toBe(true);
    expect(htmlElement.classList.contains('light')).toBe(false);
  });
});
