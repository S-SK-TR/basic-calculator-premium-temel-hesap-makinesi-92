import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';
import { describe, it, expect, vi } from 'vitest';

// Mock the NavLink component
vi.mock('react-router-dom', () => ({
  NavLink: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  )
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <svg data-testid="dashboard-icon" />,
  BarChart2: () => <svg data-testid="analytics-icon" />,
  Settings: () => <svg data-testid="settings-icon" />,
  Bell: () => <svg data-testid="bell-icon" />
}));

describe('AppShell Component', () => {
  it('renders without crashing', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('renders notification bell', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );
    expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
  });

  it('renders user profile section', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});