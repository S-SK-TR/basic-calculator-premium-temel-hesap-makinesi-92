import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock child components
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));

vi.mock('@/components/History', () => ({
  History: ({ history }: any) => (
    <div data-testid="history">{history.join(', ')}</div>
  )
}));

vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: ({ isOpen, onClose }: any) => (
    isOpen ? <div data-testid="unit-converter">Unit Converter</div> : null
  )
}));

vi.mock('@/components/Chart', () => ({
  Chart: ({ isOpen, onClose }: any) => (
    isOpen ? <div data-testid="chart">Chart</div> : null
  )
}));

vi.mock('lucide-react', () => ({
  HelpCircle: () => <div>Help</div>,
  BarChart2: () => <div>Chart</div>
}));

describe('Calculator Component', () => {
  const mockStore = {
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders the calculator with all buttons', () => {
    render(<Calculator />);

    // Check if display shows initial value
    expect(screen.getByText('0')).toBeInTheDocument();

    // Check if all number buttons are rendered
    ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].forEach(num => {
      expect(screen.getByText(num)).toBeInTheDocument();
    });

    // Check if operator buttons are rendered
    ['+', '-', '*', '/'].forEach(op => {
      expect(screen.getByText(op)).toBeInTheDocument();
    });

    // Check if function buttons are rendered
    ['C', '%', '√', 'x²'].forEach(func => {
      expect(screen.getByText(func)).toBeInTheDocument();
    });

    // Check if equals button is rendered
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('updates display when number buttons are clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));

    // Check if display shows the entered numbers
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('performs basic arithmetic operations', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));

    // Check if calculate function was called
    expect(mockStore.calculate).toHaveBeenCalled();
  });

  it('clears the calculator when C button is clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('C'));

    // Check if clearCalculator function was called
    expect(mockStore.clearCalculator).toHaveBeenCalled();
  });

  it('toggles unit converter when help button is clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('Help'));

    // Check if toggleUnitConverter function was called
    expect(mockStore.toggleUnitConverter).toHaveBeenCalled();
  });

  it('toggles chart when chart button is clicked', () => {
    render(<Calculator />);

    fireEvent.click(screen.getByText('Chart'));

    // Check if toggleChart function was called
    expect(mockStore.toggleChart).toHaveBeenCalled();
  });
});
