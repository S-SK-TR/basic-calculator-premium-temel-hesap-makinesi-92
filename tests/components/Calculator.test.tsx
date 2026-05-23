import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';

// Mock the useStore hook
jest.mock('@/store/store', () => ({
  useStore: jest.fn()
}));

// Mock child components
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

jest.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('@/components/History', () => ({
  History: ({ history }: { history: string[] }) => (
    <div data-testid="history">{history.join(', ')}</div>
  )
}));

jest.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: ({ isOpen }: { isOpen: boolean }) => (
    isOpen ? <div data-testid="unit-converter-modal">Unit Converter</div> : null
  )
}));

jest.mock('@/components/Chart', () => ({
  Chart: ({ isOpen }: { isOpen: boolean }) => (
    isOpen ? <div data-testid="chart">Chart</div> : null
  )
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
    setCalculator: jest.fn(),
    calculate: jest.fn(),
    clearCalculator: jest.fn(),
    toggleUnitConverter: jest.fn(),
    toggleChart: jest.fn()
  };

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('renders correctly', () => {
    render(<Calculator />);
    expect(screen.getByRole('application', { name: 'Hesap makinesi' })).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByTestId('history')).toBeInTheDocument();
  });

  it('handles number button clicks', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1' });

    fireEvent.click(screen.getByText('2'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '12' });
  });

  it('handles operator button clicks', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({
      previousValue: '1',
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
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('%'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1' });
  });

  it('handles square root button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('√'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '3' });
  });

  it('handles square button click', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('x²'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '9' });
  });

  it('toggles unit converter modal', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByLabelText('Birim dönüştürücü aç'));
    expect(mockStore.toggleUnitConverter).toHaveBeenCalled();
  });

  it('toggles chart modal', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByLabelText('Grafik aç'));
    expect(mockStore.toggleChart).toHaveBeenCalled();
  });
});
