import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from '@/components/History';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  )
}));

describe('History Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      clearHistory: vi.fn()
    });
  });

  it('renders empty state when history is empty', () => {
    render(<History history={[]} />);

    // Check if empty state message is rendered
    expect(screen.getByText(/Henüz hesaplama yapılmadı/i)).toBeInTheDocument();
  });

  it('renders history items when history is not empty', () => {
    const testHistory = [
      '2 + 2 = 4',
      '3 * 5 = 15',
      '10 / 2 = 5'
    ];

    render(<History history={testHistory} />);

    // Check if all history items are rendered
    testHistory.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('calls clearHistory when clear button is clicked', () => {
    const clearHistoryMock = vi.fn();
    (useStore as jest.Mock).mockReturnValue({
      clearHistory: clearHistoryMock
    });

    render(<History history={['2 + 2 = 4']} />);

    fireEvent.click(screen.getByText('Geçmişi Temizle'));

    // Check if clearHistory function was called
    expect(clearHistoryMock).toHaveBeenCalled();
  });
});
