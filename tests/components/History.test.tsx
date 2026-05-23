import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { History } from '@/components/History';
import { useStore } from '@/store/store';

// Mock the useStore hook
jest.mock('@/store/store', () => ({
  useStore: jest.fn()
}));

// Mock the Button component
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('History Component', () => {
  const mockClearHistory = jest.fn();

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue(mockClearHistory);
  });

  it('renders empty state when history is empty', () => {
    render(<History history={[]} />);
    expect(screen.getByText('Henüz hesaplama yapılmadı')).toBeInTheDocument();
  });

  it('renders history entries when history is not empty', () => {
    const testHistory = ['1 + 1 = 2', '2 * 3 = 6'];
    render(<History history={testHistory} />);

    testHistory.forEach(entry => {
      expect(screen.getByText(entry)).toBeInTheDocument();
    });
  });

  it('calls clearHistory when clear button is clicked', () => {
    render(<History history={['1 + 1 = 2']} />);
    fireEvent.click(screen.getByText('Geçmişi Temizle'));
    expect(mockClearHistory).toHaveBeenCalled();
  });
});
