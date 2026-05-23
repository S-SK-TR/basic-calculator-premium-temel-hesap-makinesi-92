import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '@/components/UnitConverterModal';
import { describe, it, expect, vi } from 'vitest';

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

describe('UnitConverterModal Component', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(<UnitConverterModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the modal when isOpen is true', () => {
    render(<UnitConverterModal isOpen={true} onClose={() => {}} />);

    // Check if modal title is rendered
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();

    // Check if all unit types are rendered
    ['Uzunluk', 'Ağırlık', 'Hacim', 'Sıcaklık'].forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<UnitConverterModal isOpen={true} onClose={onCloseMock} />);

    fireEvent.click(screen.getByText('Kapat'));

    // Check if onClose function was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('converts units when convert button is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={() => {}} />);

    // Select length conversion
    fireEvent.click(screen.getByText('Uzunluk'));

    // Enter values
    fireEvent.change(screen.getByPlaceholderText('Değer'), { target: { value: '10' } });
    fireEvent.change(screen.getByPlaceholderText('Sonuç'), { target: { value: '100' } });

    // Click convert button
    fireEvent.click(screen.getByText('Dönüştür'));

    // Check if conversion result is displayed
    expect(screen.getByText(/10 santimetre/i)).toBeInTheDocument();
  });
});
