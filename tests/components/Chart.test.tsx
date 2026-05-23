import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chart } from '../../src/components/Chart';
import { useStore } from '../../src/store/store';

// Mock the useStore hook
vi.mock('../../src/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Card component
vi.mock('../../src/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Chart Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders correctly when open', () => {
    // Mock the store state with some history
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: ['1 + 2 = 3', '3 * 4 = 12', '12 / 2 = 6']
      }
    });

    render(<Chart isOpen={true} onClose={() => {}} />);

    // Check if chart is rendered
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();
    expect(screen.getByText('Son 10 işlemin grafiği gösteriliyor.')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    // Mock the store state with some history
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: ['1 + 2 = 3', '3 * 4 = 12', '12 / 2 = 6']
      }
    });

    render(<Chart isOpen={false} onClose={() => {}} />);

    // Check if chart is not rendered
    expect(screen.queryByText('Fonksiyon Grafiği')).not.toBeInTheDocument();
  });

  it('shows empty state when there is no history', () => {
    // Mock the store state with empty history
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: []
      }
    });

    render(<Chart isOpen={true} onClose={() => {}} />);

    // Check if empty state is shown
    expect(screen.getByText('Grafik çizmek için yeterli veri yok')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    // Mock the store state with some history
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: ['1 + 2 = 3', '3 * 4 = 12', '12 / 2 = 6']
      }
    });

    render(<Chart isOpen={true} onClose={onClose} />);

    // Click the close button
    fireEvent.click(screen.getByText('Kapat'));
    expect(onClose).toHaveBeenCalled();
  });
});