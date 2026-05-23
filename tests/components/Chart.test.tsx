import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Card component
vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('Chart Component', () => {
  const mockStore = {
    calculator: {
      history: []
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue(mockStore);
  });

  it('does not render when isOpen is false', () => {
    render(<Chart isOpen={false} onClose={vi.fn()} />);
    expect(screen.queryByText('Fonksiyon Grafiği')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();
  });

  it('shows empty state when there is no history', () => {
    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(/Grafik çizmek için yeterli veri yok/i)).toBeInTheDocument();
  });

  it('renders chart when there is history', () => {
    const historyWithData = [
      '1 + 2 = 3',
      '3 * 4 = 12',
      '12 / 2 = 6'
    ];

    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: historyWithData
      }
    });

    render(<Chart isOpen={true} onClose={vi.fn()} />);
    expect(screen.queryByText(/Grafik çizmek için yeterli veri yok/i)).not.toBeInTheDocument();
    // We can't test SVG rendering directly, but we can check if the component tries to render it
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<Chart isOpen={true} onClose={onCloseMock} />);
    fireEvent.click(screen.getByText('Kapat'));
    expect(onCloseMock).toHaveBeenCalled();
  });
});
