import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '../../src/components/UnitConverterModal';
import { useStore } from '../../src/store/store';

// Mock the useStore hook
vi.mock('../../src/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Card component
vi.mock('../../src/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Button component
vi.mock('../../src/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

// Mock the Select component
vi.mock('../../src/components/ui/Select', () => ({
  Select: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Input component
vi.mock('../../src/components/ui/Input', () => ({
  Input: ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <input value={value} onChange={onChange} />
  )
}));

// Mock the Label component
vi.mock('../../src/components/ui/Label', () => ({
  Label: ({ children }: { children: React.ReactNode }) => <label>{children}</label>
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  ArrowRightLeft: () => <div>ArrowRightLeft</div>
}));

describe('UnitConverterModal Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    // Mock the store state
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0'
      },
      setCalculator: vi.fn()
    });

    render(<UnitConverterModal isOpen={true} onClose={() => {}} />);

    // Check if modal is rendered
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();
    expect(screen.getByText('Hesap makinesi değerini dönüştür')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    // Mock the store state
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0'
      },
      setCalculator: vi.fn()
    });

    render(<UnitConverterModal isOpen={false} onClose={() => {}} />);

    // Check if modal is not rendered
    expect(screen.queryByText('Birim Dönüştürücü')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    // Mock the store state
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0'
      },
      setCalculator: vi.fn()
    });

    render(<UnitConverterModal isOpen={true} onClose={onClose} />);

    // Click the close button
    fireEvent.click(screen.getByText('Kapat'));
    expect(onClose).toHaveBeenCalled();
  });

  it('converts units correctly', () => {
    const setCalculator = vi.fn();
    // Mock the store state
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '100'
      },
      setCalculator
    });

    render(<UnitConverterModal isOpen={true} onClose={() => {}} />);

    // Simulate changing the input value
    const input = screen.getByDisplayValue('100');
    fireEvent.change(input, { target: { value: '50' } });

    // Simulate changing the from unit
    const fromUnitSelect = screen.getByLabelText('Dönüştürülecek birim');
    fireEvent.change(fromUnitSelect, { target: { value: 'cm' } });

    // Simulate changing the to unit
    const toUnitSelect = screen.getByLabelText('Hedef birim');
    fireEvent.change(toUnitSelect, { target: { value: 'm' } });

    // Click the convert button
    fireEvent.click(screen.getByText('Dönüştür'));

    // Check if setCalculator is called with the correct value
    expect(setCalculator).toHaveBeenCalledWith({ currentValue: '0.5' });
  });
});