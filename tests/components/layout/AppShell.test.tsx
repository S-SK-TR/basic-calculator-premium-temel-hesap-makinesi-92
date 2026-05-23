import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';

// Mock the NavLink component
vi.mock('react-router-dom', () => ({
  NavLink: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

// Mock the children component
const MockChild = () => <div data-testid="child">Child Component</div>;

describe('AppShell Component', () => {
  it('renders correctly', () => {
    render(
      <AppShell>
        <MockChild />
      </AppShell>
    );

    // Check if the app shell elements are rendered
    expect(screen.getByText('AppName')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('shows active navigation item', () => {
    // Mock the useLocation hook to return a specific path
    vi.mock('react-router-dom', async (importOriginal) => {
      const original = await importOriginal();
      return {
        ...original,
        useLocation: () => ({ pathname: '/analytics' }),
        NavLink: ({ children, to, ...props }: any) => (
          <a href={to} {...props} className={to === '/analytics' ? 'active' : ''}>{children}</a>
        )
      };
    });

    render(
      <AppShell>
        <MockChild />
      </AppShell>
    );

    // Check if the Analytics link has the active class
    expect(screen.getByText('Analytics')).toHaveClass('active');
  });
});