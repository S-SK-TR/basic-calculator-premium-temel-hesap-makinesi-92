import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from '../../../src/components/layout/AppShell';
import { useStore } from '../../../src/store/store';

// Mock the useStore hook
vi.mock('../../../src/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the NavLink component
vi.mock('react-router-dom', () => ({
  NavLink: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  )
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <div>LayoutDashboard</div>,
  BarChart2: () => <div>BarChart2</div>,
  Settings: () => <div>Settings</div>,
  Bell: () => <div>Bell</div>
}));

// Mock the cn utility
vi.mock('../../../src/lib/utils', () => ({
  cn: (...classes: string[]) => classes.join(' ')
}));

describe('AppShell Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    // Mock the store state
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0',
        previousValue: '',
        operation: '',
        history: [],
        isUnitConverterOpen: false,
        isChartOpen: false
      }
    });

    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    // Check if AppShell is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();

    // Check if navigation items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});