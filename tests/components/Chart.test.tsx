import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Chart } from '@/components/Chart';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
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
      history: ['1 + 2 = 3', '4 * 5 = 20', '6 / 2 = 3']
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue(mockStore);
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(<Chart isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when isOpen is true', () => {
    render(<Chart isOpen={true} onClose={() => {}} />);
    expect(screen.getByText('Fonksiyon Grafiği')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Chart isOpen={true} onClose={onClose} />);
    const closeButton = screen.getByText('Kapat');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('displays chart when there is history data', () => {
    render(<Chart isOpen={true} onClose={() => {}} />);
    // Check if SVG element is rendered (indicating chart is displayed)
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('displays message when there is no history data', () => {
    (useStore as any).mockReturnValue({
      calculator: {
        history: []
      }
    });

    render(<Chart isOpen={true} onClose={() => {}} />);
    expect(screen.getByText(/Grafik çizmek için yeterli veri yok/i)).toBeInTheDocument();
  });
});