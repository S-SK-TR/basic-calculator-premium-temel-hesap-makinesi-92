import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';
import { describe, it, expect, vi } from 'vitest';

// Mock the NavLink component
vi.mock('react-router-dom', () => ({
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} data-testid={`navlink-${to}`}>{children}</a>
  )
}));

// Mock icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <div>LayoutDashboard</div>,
  BarChart2: () => <div>BarChart2</div>,
  Settings: () => <div>Settings</div>,
  Bell: () => <div>Bell</div>
}));

describe('AppShell Component', () => {
  it('renders correctly', () => {
    render(
      <AppShell>
        <div data-testid="content">Test Content</div>
      </AppShell>
    );

    // Check if navigation items are rendered
    expect(screen.getByTestId('navlink-/')).toBeInTheDocument();
    expect(screen.getByTestId('navlink-/analytics')).toBeInTheDocument();
    expect(screen.getByTestId('navlink-/settings')).toBeInTheDocument();

    // Check if content is rendered
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
