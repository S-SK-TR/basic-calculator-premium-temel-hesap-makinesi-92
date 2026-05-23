import React from 'react';
import { render, screen } from '@testing-library/react';
import { History } from '@/components/History';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn(() => ({
    calculator: {
      history: []
    }
  }))
}));

// Mock the Button component
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  )
}));

describe('History Component', () => {
  it('renders correctly with empty history', () => {
    render(<History history={[]} />);
    expect(screen.getByText('Geçmiş')).toBeInTheDocument();
    expect(screen.getByText('Henüz geçmiş yok')).toBeInTheDocument();
  });

  it('renders history items', () => {
    const history = ['3 + 5 = 8', '10 - 2 = 8'];
    render(<History history={history} />);

    history.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('shows clear history button when there is history', () => {
    const history = ['3 + 5 = 8'];
    render(<History history={history} />);
    expect(screen.getByText('Geçmişi Temizle')).toBeInTheDocument();
  });
});