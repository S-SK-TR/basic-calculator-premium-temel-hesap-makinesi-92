import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));

// Mock the History component
vi.mock('@/components/History', () => ({
  History: ({ history }: any) => (
    <div data-testid="history">{history.join(', ')}</div>
  )
}));

// Mock the UnitConverterModal component
vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: ({ isOpen, onClose }: any) => (
    isOpen ? (
      <div data-testid="unit-converter-modal">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

// Mock the Chart component
vi.mock('@/components/Chart', () => ({
  Chart: ({ isOpen, onClose }: any) => (
    isOpen ? (
      <div data-testid="chart">
        <button onClick={onClose}>Close</button>
      </div>
    ) : null
  )
}));

describe('Calculator Component', () => {
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

  it('renders correctly', () => {
    render(<Calculator />);
    expect(screen.getByRole('application', { name: 'Hesap makinesi' })).toBeInTheDocument();
  });

  it('displays initial value', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles number button clicks', () => {
    const setCalculator = vi.fn();
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0',
        previousValue: '',
        operation: '',
        history: [],
        isUnitConverterOpen: false,
        isChartOpen: false
      },
      setCalculator,
      calculate: vi.fn(),
      clearCalculator: vi.fn(),
      toggleUnitConverter: vi.fn(),
      toggleChart: vi.fn()
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    expect(setCalculator).toHaveBeenCalledWith({ currentValue: '1' });
  });

  it('handles clear button', () => {
    const clearCalculator = vi.fn();
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '123',
        previousValue: '',
        operation: '',
        history: [],
        isUnitConverterOpen: false,
        isChartOpen: false
      },
      setCalculator: vi.fn(),
      calculate: vi.fn(),
      clearCalculator,
      toggleUnitConverter: vi.fn(),
      toggleChart: vi.fn()
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText('C'));
    expect(clearCalculator).toHaveBeenCalled();
  });

  it('handles equals button', () => {
    const calculate = vi.fn();
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '5',
        previousValue: '3',
        operation: '+',
        history: [],
        isUnitConverterOpen: false,
        isChartOpen: false
      },
      setCalculator: vi.fn(),
      calculate,
      clearCalculator: vi.fn(),
      toggleUnitConverter: vi.fn(),
      toggleChart: vi.fn()
    });

    render(<Calculator />);
    fireEvent.click(screen.getByText('='));
    expect(calculate).toHaveBeenCalled();
  });

  it('opens unit converter modal', () => {
    const toggleUnitConverter = vi.fn();
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
      toggleUnitConverter,
      toggleChart: vi.fn()
    });

    render(<Calculator />);
    fireEvent.click(screen.getByLabelText('Birim dönüştürücü aç'));
    expect(toggleUnitConverter).toHaveBeenCalled();
  });

  it('opens chart modal', () => {
    const toggleChart = vi.fn();
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
      toggleChart
    });

    render(<Calculator />);
    fireEvent.click(screen.getByLabelText('Grafik aç'));
    expect(toggleChart).toHaveBeenCalled();
  });
});