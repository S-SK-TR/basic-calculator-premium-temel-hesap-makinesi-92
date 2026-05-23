import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';

// Mock the useStore hook
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
  History: () => <div>History Component</div>
}));

vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: () => <div>Unit Converter Modal</div>
}));

vi.mock('@/components/Chart', () => ({
  Chart: () => <div>Chart Component</div>
}));

vi.mock('lucide-react', () => ({
  HelpCircle: () => <div>Help Icon</div>,
  BarChart2: () => <div>Chart Icon</div>
}));

describe('Calculator Component Final Tests', () => {
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
    (useStore as jest.Mock).mockImplementation((selector) => selector(mockStore));
  });

  it('renders correctly with all buttons', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
    ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C', '%', '√', 'x²'].forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('handles keyboard navigation', () => {
    render(<Calculator />);
    fireEvent.keyDown(document, { key: '1', code: 'Digit1' });
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1' });

    fireEvent.keyDown(document, { key: '+', code: 'Equal' });
    expect(mockStore.setCalculator).toHaveBeenCalledWith({
      previousValue: '1',
      operation: '+',
      currentValue: '0'
    });

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expect(mockStore.calculate).toHaveBeenCalled();
  });

  it('has proper ARIA attributes', () => {
    render(<Calculator />);
    const calculator = screen.getByRole('application');
    expect(calculator).toHaveAttribute('aria-label', 'Hesap makinesi');

    const display = screen.getByText('0').parentElement;
    expect(display).toHaveAttribute('aria-live', 'polite');
    expect(display).toHaveAttribute('aria-atomic', 'true');
  });

  it('handles decimal input correctly', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '1.5' });
  });

  it('handles percentage calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('%'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '0.5' });
  });

  it('handles square root calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('4'));
    fireEvent.click(screen.getByText('√'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '2' });
  });

  it('handles square calculation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('x²'));
    expect(mockStore.setCalculator).toHaveBeenCalledWith({ currentValue: '9' });
  });

  it('displays calculation history', () => {
    mockStore.calculator.history = ['1+1=2', '2*3=6'];
    render(<Calculator />);
    expect(screen.getByText('History Component')).toBeInTheDocument();
  });
});
