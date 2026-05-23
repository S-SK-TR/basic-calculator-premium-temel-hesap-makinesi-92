import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '@/components/UnitConverterModal';

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  )
}));

describe('UnitConverterModal Component', () => {
  it('does not render when not open', () => {
    render(<UnitConverterModal isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Birim Dönüştürücü')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<UnitConverterModal isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<UnitConverterModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Kapat'));
    expect(onClose).toHaveBeenCalled();
  });

  it('converts units correctly', () => {
    render(<UnitConverterModal isOpen={true} onClose={vi.fn()} />);

    // Select length conversion
    fireEvent.change(screen.getByLabelText('Birim türü'), { target: { value: 'length' } });

    // Enter value
    fireEvent.change(screen.getByLabelText('Değer'), { target: { value: '10' } });

    // Select from unit
    fireEvent.change(screen.getByLabelText('Dönüştürülecek birim'), { target: { value: 'meter' } });

    // Select to unit
    fireEvent.change(screen.getByLabelText('Hedef birim'), { target: { value: 'kilometer' } });

    // Check result
    expect(screen.getByText('0.01')).toBeInTheDocument();
  });
});