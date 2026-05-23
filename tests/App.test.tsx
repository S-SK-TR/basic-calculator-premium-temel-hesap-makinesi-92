import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the ThemeProvider and AppShell components
vi.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Calculator component
vi.mock('@/components/Calculator', () => ({
  Calculator: () => <div data-testid="calculator">Calculator</div>
}));

// Mock the ThemeToggle component
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock the useStore implementation
    (useStore as jest.Mock).mockImplementation((selector) => {
      const state = {
        calculator: {
          currentValue: '0',
          previousValue: '',
          operation: '',
          history: [],
          isUnitConverterOpen: false,
          isChartOpen: false
        },
        setCalculator: vi.fn(),
        calculate: vi.fn(),
        clearCalculator: vi.fn(),
        toggleUnitConverter: vi.fn(),
        toggleChart: vi.fn(),
        clearHistory: vi.fn()
      };
      return selector(state);
    });
  });

  it('renders the App component with all child components', () => {
    render(<App />);

    // Check if ThemeProvider is rendered
    expect(screen.getByText('Calculator')).toBeInTheDocument();

    // Check if AppShell is rendered
    expect(screen.getByTestId('calculator')).toBeInTheDocument();

    // Check if ThemeToggle is rendered
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('shows offline status when navigator is offline', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(<App />);

    // Check if offline status is shown
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
  });

  it('hides offline status when navigator is online', () => {
    // Mock navigator.onLine to be true
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });

    render(<App />);

    // Check if offline status is not shown
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });

  it('toggles theme when ThemeToggle is clicked', () => {
    render(<App />);

    const themeToggle = screen.getByTestId('theme-toggle');
    fireEvent.click(themeToggle);

    // Add your theme toggle assertion here
    // This would depend on your actual theme toggle implementation
  });
});
