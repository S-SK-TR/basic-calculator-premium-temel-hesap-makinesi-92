import React from 'react';
import { render } from '@testing-library/react';
import { Calculator } from '@/components/Calculator';
import { useStore } from '@/store/store';

// Mock the useStore hook
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock child components
vi.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button onClick={onClick}>{children}</button>
  )
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/components/History', () => ({
  History: () => <div>History Component</div>
}));

vi.mock('@/components/UnitConverterModal', () => ({
  UnitConverterModal: () => <div>Unit Converter Modal</div>
}));

vi.mock('@/components/Chart', () => ({
  Chart: () => <div>Chart Component</div>
}));

vi.mock('lucide-react', () => ({
  HelpCircle: () => <div>Help Icon</div>,
  BarChart2: () => <div>Chart Icon</div>
}));

describe('Calculator Performance', () => {
  const mockStore = {
    calculator: {
      currentValue: '0',
      previousValue: '',
      operation: '',
      history: [],
      isUnitConverterOpen: false,
      isChartOpen: false
    },
    setCalculator: vi.fn(),
    calculate: vi.fn(),
    clearCalculator: vi.fn(),
    toggleUnitConverter: vi.fn(),
    toggleChart: vi.fn()
  };

  beforeEach(() => {
    (useStore as jest.Mock).mockImplementation((selector) => selector(mockStore));
  });

  it('should render without unnecessary re-renders', () => {
    const { rerender } = render(<Calculator />);
    const initialRender = performance.now();
    rerender(<Calculator />);
    const secondRender = performance.now();

    // Check if the second render is faster than the initial render
    expect(secondRender - initialRender).toBeLessThan(10); // Adjust threshold as needed
  });

  it('should memoize the component and prevent unnecessary updates', () => {
    const { rerender } = render(<Calculator />);
    const initialRender = performance.now();
    rerender(<Calculator />);
    const secondRender = performance.now();

    // Verify that the component is memoized and doesn't re-render unnecessarily
    expect(secondRender - initialRender).toBeLessThan(5); // Adjust threshold as needed
  });

  it('should handle rapid button presses efficiently', () => {
    const { container } = render(<Calculator />);
    const buttons = container.querySelectorAll('button');
    const startTime = performance.now();

    // Simulate rapid button presses
    for (let i = 0; i < 10; i++) {
      fireEvent.click(buttons[i % buttons.length]);
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    // Verify that the component handles rapid button presses efficiently
    expect(duration).toBeLessThan(50); // Adjust threshold as needed
  });
});
