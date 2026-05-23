import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import { useStore } from '@/store/store';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
}));

describe('Chart Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Mock the store implementation
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: []
      }
    });
  });

  it('does not render when not open', () => {
    render(<Chart isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Fonksiyon Grafiği')).not.toBeInTheDocument();
  });

  it('renders when open', () => {
    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Chart isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByText('Kapat'));
    expect(onClose).toHaveBeenCalled();
  });

  it('shows message when there is no data', () => {
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: []
      }
    });

    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Grafik çizmek için yeterli veri yok')).toBeInTheDocument();
  });

  it('renders chart when there is data', () => {
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: ['3 + 5 = 8', '10 - 2 = 8']
      }
    });

    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.queryByText('Grafik çizmek için yeterli veri yok')).not.toBeInTheDocument();
    // We can't easily test the SVG rendering, but we can check that the component renders
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();
  });
});