import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '@/components/UnitConverterModal';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('UnitConverterModal Component', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<UnitConverterModal isOpen={false} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when isOpen is true', () => {
    render(<UnitConverterModal isOpen={true} onClose={onClose} />);
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={onClose} />);
    const closeButton = screen.getByText('Kapat');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('performs unit conversion when convert button is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={onClose} />);

    // Fill in the form
    const inputValue = screen.getByLabelText('Değer');
    fireEvent.change(inputValue, { target: { value: '10' } });

    const fromUnit = screen.getByLabelText('Dönüştürülecek birim');
    fireEvent.change(fromUnit, { target: { value: 'cm' } });

    const toUnit = screen.getByLabelText('Hedef birim');
    fireEvent.change(toUnit, { target: { value: 'm' } });

    // Click convert button
    const convertButton = screen.getByText('Dönüştür');
    fireEvent.click(convertButton);

    // Check if result is displayed
    expect(screen.getByText('10 cm = 0.1 m')).toBeInTheDocument();
  });
});