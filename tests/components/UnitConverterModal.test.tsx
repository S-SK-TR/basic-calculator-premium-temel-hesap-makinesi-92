import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '@/components/UnitConverterModal';
import { describe, it, expect, vi } from 'vitest';

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('UnitConverterModal Component', () => {
  it('does not render when isOpen is false', () => {
    render(<UnitConverterModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Birim Dönüştürücü')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<UnitConverterModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<UnitConverterModal isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText('Kapat'));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('handles unit conversion', () => {
    render(<UnitConverterModal isOpen={true} onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText('Değer girin');
    const fromSelect = screen.getByLabelText('Dönüştürülecek birim');
    const toSelect = screen.getByLabelText('Hedef birim');

    // Simulate user input and selection
    fireEvent.change(input, { target: { value: '100' } });
    fireEvent.change(fromSelect, { target: { value: 'cm' } });
    fireEvent.change(toSelect, { target: { value: 'm' } });

    // Check if the conversion result is displayed
    expect(screen.getByText('100 cm = 1 m')).toBeInTheDocument();
  });
});
