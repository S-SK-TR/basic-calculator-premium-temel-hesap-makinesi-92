import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from '../../src/components/History';
import { useStore } from '../../src/store/store';

// Mock the useStore hook
vi.mock('../../src/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the Button component
vi.mock('../../src/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

describe('History Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders correctly with history', () => {
    const history = ['1 + 2 = 3', '3 * 4 = 12', '12 / 2 = 6'];

    render(<History history={history} />);

    // Check if history items are rendered
    history.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('shows empty state when there is no history', () => {
    render(<History history={[]} />);

    // Check if empty state is shown
    expect(screen.getByText('Henüz hesaplama yapılmadı')).toBeInTheDocument();
  });

  it('calls clearHistory when clear button is clicked', () => {
    const clearHistory = vi.fn();
    (useStore as jest.Mock).mockReturnValue(clearHistory);

    render(<History history={['1 + 2 = 3']} />);

    // Click the clear button
    fireEvent.click(screen.getByText('Geçmişi Temizle'));
    expect(clearHistory).toHaveBeenCalled();
  });
});