import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '@/App';
import { useStore } from '@/store/store';

// Mock the useStore hook
jest.mock('@/store/store', () => ({
  useStore: jest.fn()
}));

// Mock the ThemeProvider
jest.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() })
}));

// Mock the AppShell
jest.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Calculator component
jest.mock('@/components/Calculator', () => ({
  Calculator: () => <div data-testid="calculator">Calculator</div>
}));

// Mock the ThemeToggle component
jest.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Toggle Theme</button>
}));

describe('App Component', () => {
  beforeEach(() => {
    // Mock the store implementation
    (useStore as jest.Mock).mockImplementation((selector) => {
      const state = {
        theme: 'light',
        setTheme: jest.fn(),
        calculator: {
          currentValue: '0',
          previousValue: '',
          operation: '',
          history: [],
          isUnitConverterOpen: false,
          isChartOpen: false
        },
        setCalculator: jest.fn(),
        calculate: jest.fn(),
        clearCalculator: jest.fn(),
        toggleUnitConverter: jest.fn(),
        toggleChart: jest.fn(),
        clearHistory: jest.fn()
      };
      return selector(state);
    });
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('shows offline banner when network is offline', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(<App />);
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
  });

  it('does not show offline banner when network is online', () => {
    // Mock navigator.onLine to be true
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });

    render(<App />);
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });

  it('handles online/offline events', () => {
    render(<App />);

    // Simulate going offline
    window.dispatchEvent(new Event('offline'));
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();

    // Simulate going online
    window.dispatchEvent(new Event('online'));
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });
});
