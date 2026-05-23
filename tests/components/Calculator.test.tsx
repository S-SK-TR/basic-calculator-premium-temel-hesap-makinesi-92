import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock child components
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/components/History', () => ({
  History: ({ history }: { history: string[] }) => <div>{history.join(', ')}</div>
}));

vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    isOpen ? <div>Unit Converter Modal</div> : null
  )
}));

vi.mock('@/components/Chart', () => ({
  Chart: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    isOpen ? <div>Chart Modal</div> : null
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
    setCalculator: vi.fn(),
    calculate: vi.fn(),
    clearCalculator: vi.fn(),
    toggleUnitConverter: vi.fn(),
    toggleChart: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue(mockStore);
  });

  it('renders without crashing', () => {
    render(<Calculator />);
    expect(screen.getByRole('application', { name: 'Hesap makinesi' })).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles number button clicks', () => {
    render(<Calculator />);
    const button7 = screen.getByText('7');
    fireEvent.click(button7);
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '7' });
  });

  it('handles operator button clicks', () => {
    render(<Calculator />);
    const buttonPlus = screen.getByText('+');
    fireEvent.click(buttonPlus);
    expect(mockStore.setCalculator).toHaveBeenCalledWith({
      previousValue: '0',
      operation: '+',
      currentValue: '0'
    });
  });

  it('handles equals button click', () => {
    render(<Calculator />);
    const buttonEquals = screen.getByText('=');
    fireEvent.click(buttonEquals);
    expect(mockStore.calculate).toHaveBeenCalled();
  });

  it('handles clear button click', () => {
    render(<Calculator />);
    const buttonClear = screen.getByText('C');
    fireEvent.click(buttonClear);
    expect(mockStore.clearCalculator).toHaveBeenCalled();
  });

  it('toggles unit converter modal', () => {
    render(<Calculator />);
    const unitConverterButton = screen.getByLabelText('Birim dönüştürücü aç');
    fireEvent.click(unitConverterButton);
    expect(mockStore.toggleUnitConverter).toHaveBeenCalled();
  });

  it('toggles chart modal', () => {
    render(<Calculator />);
    const chartButton = screen.getByLabelText('Grafik aç');
    fireEvent.click(chartButton);
    expect(mockStore.toggleChart).toHaveBeenCalled();
  });
});