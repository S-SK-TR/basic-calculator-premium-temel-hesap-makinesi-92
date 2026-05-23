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
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children without crashing', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies the correct theme class to the root element', () => {
    const { container } = render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>
    );
    expect(container.firstChild).toHaveClass('light');
  });
});