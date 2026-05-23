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
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>
}));

// Mock the WifiOff icon
vi.mock('lucide-react', () => ({
  WifiOff: () => <div>WifiOff</div>
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    // Mock the store implementation
    (useStore as jest.Mock).mockImplementation(() => ({
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
      toggleChart: vi.fn()
    }));
  });

  it('renders correctly', () => {
    render(<App />);
    expect(screen.getByTestId('calculator')).toBeInTheDocument();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('shows offline banner when not online', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(<App />);
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
  });

  it('does not show offline banner when online', () => {
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