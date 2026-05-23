import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/components/ThemeProvider';
import { useStore } from '@/store/store';

// Mock the useStore hook
jest.mock('@/store/store', () => ({
  useStore: jest.fn()
}));

// Test component to use the theme context
const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-theme">Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme
    });
  });

  it('provides theme context to children', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('toggles theme when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('applies theme class to document element', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('throws error when used outside of ThemeProvider', () => {
    // Mock console.error to suppress the error in the test output
    const originalError = console.error;
    console.error = jest.fn();

    // This should throw an error
    expect(() => render(<TestComponent />)).toThrow('useTheme must be used within a ThemeProvider');

    // Restore console.error
    console.error = originalError;
  });
});
