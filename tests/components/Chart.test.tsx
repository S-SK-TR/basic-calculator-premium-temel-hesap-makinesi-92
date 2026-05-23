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
  Card: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  )
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

  it('renders nothing when isOpen is false', () => {
    const { container } = render(<Chart isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the chart when isOpen is true and there is history', () => {
    const testHistory = [
      '2 + 2 = 4',
      '3 * 5 = 15',
      '10 / 2 = 5'
    ];

    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        history: testHistory
      }
    });

    render(<Chart isOpen={true} onClose={() => {}} />);

    // Check if chart title is rendered
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();

    // Check if chart description is rendered
    expect(screen.getByText(/Son 10 işlemin grafiği gösteriliyor/i)).toBeInTheDocument();

    // Check if SVG element is rendered
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows empty state when there is no history', () => {
    render(<Chart isOpen={true} onClose={() => {}} />);

    // Check if empty state message is rendered
    expect(screen.getByText(/Grafik çizmek için yeterli veri yok/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = vi.fn();
    render(<Chart isOpen={true} onClose={onCloseMock} />);

    fireEvent.click(screen.getByText('Kapat'));

    // Check if onClose function was called
    expect(onCloseMock).toHaveBeenCalled();
  });
});
