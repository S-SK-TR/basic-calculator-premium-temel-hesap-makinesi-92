import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitConverterModal } from '@/components/UnitConverterModal';

// Mock the Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

// Mock the Card component
jest.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

// Mock the icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid="close-icon">Close</div>
}));

describe('UnitConverterModal Component', () => {
  const mockOnClose = jest.fn();

  it('does not render when isOpen is false', () => {
    render(<UnitConverterModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText('Birim Dönüştürücü')).not.toBeInTheDocument();
  });

  it('renders correctly when isOpen is true', () => {
    render(<UnitConverterModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText('Birim Dönüştürücü')).toBeInTheDocument();
    expect(screen.getByText('Kapat')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText('Kapat'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when overlay is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={mockOnClose} />);
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('prevents event propagation when modal content is clicked', () => {
    render(<UnitConverterModal isOpen={true} onClose={mockOnClose} />);
    const modalContent = screen.getByTestId('modal-content');
    const clickEvent = { stopPropagation: jest.fn() };
    fireEvent.click(modalContent, clickEvent);
    expect(clickEvent.stopPropagation).toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
