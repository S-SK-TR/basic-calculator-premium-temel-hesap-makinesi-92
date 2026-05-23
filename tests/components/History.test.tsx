import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from '@/components/History';
import { useStore } from '@/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

describe('History Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as jest.Mock).mockReturnValue({
      clearHistory: vi.fn()
    });
  });

  it('shows empty state when history is empty', () => {
    render(<History history={[]} />);
    expect(screen.getByText(/Henüz hesaplama yapılmadı/i)).toBeInTheDocument();
  });

  it('renders history items when history is not empty', () => {
    const testHistory = ['1 + 2 = 3', '3 * 4 = 12'];
    render(<History history={testHistory} />);

    testHistory.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
