import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chart } from '../../src/components/Chart';

vi.mock('../../src/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} data-testid="close-button">{children}</button>
  )
}));

vi.mock('../../src/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  )
}));

describe('Chart Component', () => {
  const mockOnClose = vi.fn();

  it('does not render when isOpen is false', () => {
    render(<Chart isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByTestId('card')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<Chart isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('Grafik')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Chart isOpen={true} onClose={mockOnClose} />);
    await user.click(screen.getByTestId('close-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('renders chart with sample data', () => {
    const sampleData = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
      { x: 3, y: 30 }
    ];
    render(<Chart isOpen={true} onClose={mockOnClose} data={sampleData} />);
    // Add assertions for chart rendering
  });

  it('updates chart when new data is provided', () => {
    const initialData = [
      { x: 1, y: 10 },
      { x: 2, y: 20 }
    ];
    const { rerender } = render(<Chart isOpen={true} onClose={mockOnClose} data={initialData} />);
    const newData = [
      { x: 1, y: 15 },
      { x: 2, y: 25 },
      { x: 3, y: 35 }
    ];
    rerender(<Chart isOpen={true} onClose={mockOnClose} data={newData} />);
    // Add assertions for updated chart
  });
});
