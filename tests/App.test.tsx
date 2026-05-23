import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '@/App';
import { useStore } from '@/store/store';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the ThemeProvider
vi.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the AppShell
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Calculator
vi.mock('@/components/Calculator', () => ({
  Calculator: () => <div data-testid="calculator">Calculator</div>
}));

// Mock the ThemeToggle
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>
}));

// Mock the SplashIntro
vi.mock('@/components/ui/SplashIntro', () => ({
  SplashIntro: ({ onComplete }: { onComplete: () => void }) => (
    <div data-testid="splash-intro">
      <button onClick={onComplete}>Complete Splash</button>
    </div>
  )
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock the store implementation
    (useStore as jest.Mock).mockReturnValue({
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
    });
  });

  it('renders the splash screen initially', () => {
    render(<App />);
    expect(screen.getByTestId('splash-intro')).toBeInTheDocument();
  });

  it('shows the calculator after splash completes', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Complete Splash'));
    await waitFor(() => {
      expect(screen.getByTestId('calculator')).toBeInTheDocument();
    });
  });

  it('shows offline status when not online', async () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(<App />);
    fireEvent.click(screen.getByText('Complete Splash'));
    await waitFor(() => {
      expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
    });
  });

  it('shows theme toggle button', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Complete Splash'));
    await waitFor(() => {
      expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
    });
  });
});