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
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/components/History', () => ({
  History: ({ history }: { history: string[] }) => (
    <div data-testid="history">{history.join(', ')}</div>
  )
}));

vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    isOpen ? <div data-testid="unit-converter">Unit Converter</div> : null
  )
}));

vi.mock('@/components/Chart', () => ({
  Chart: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    isOpen ? <div data-testid="chart">Chart</div> : null
  )
}));

// Mock icons
vi.mock('lucide-react', () => ({
  HelpCircle: () => <div>HelpCircle</div>,
  BarChart2: () => <div>BarChart2</div>
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

  it('renders correctly', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByTestId('history')).toBeInTheDocument();
  });

  it('handles number button clicks', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1' });
  });

  it('handles operator button clicks', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('+'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({
      previousValue: '0',
      operation: '+',
      currentValue: '0'
    });
  });

  it('handles equals button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('='));
    expect(mockStore.calculate).toHaveBeenCalled();
  });

  it('handles clear button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('C'));
    expect(mockStore.clearCalculator).toHaveBeenCalled();
  });

  it('handles percentage button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('%'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '0' });
  });

  it('handles square root button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('√'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '0' });
  });

  it('handles square button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('x²'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '0' });
  });

  it('toggles unit converter', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('HelpCircle'));
    expect(mockStore.toggleUnitConverter).toHaveBeenCalled();
  });

  it('toggles chart', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('BarChart2'));
    expect(mockStore.toggleChart).toHaveBeenCalled();
  });

  it('handles keyboard input', () => {
    render(<Calculator />);
    fireEvent.keyDown(document, { key: '1', code: 'Digit1' });
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1' });
  });
});
