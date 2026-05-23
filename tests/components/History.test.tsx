import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from '@/components/History';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('History Component', () => {
  const mockClearHistory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue(mockClearHistory);
  });

  it('renders empty state when history is empty', () => {
    render(<History history={[]} />);
    expect(screen.getByText(/Henüz hesaplama yapılmadı/i)).toBeInTheDocument();
  });

  it('renders history items when history is not empty', () => {
    const history = ['1 + 2 = 3', '4 * 5 = 20', '6 / 2 = 3'];
    render(<History history={history} />);

    history.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('calls clearHistory when clear button is clicked', () => {
    const history = ['1 + 2 = 3'];
    render(<History history={history} />);

    const clearButton = screen.getByText('Geçmişi Temizle');
    fireEvent.click(clearButton);
    expect(mockClearHistory).toHaveBeenCalled();
  });
});