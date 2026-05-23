import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';
import { describe, it, expect, vi } from 'vitest';

// Mock the NavLink component
vi.mock('react-router-dom', () => ({
  NavLink: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

// Mock the icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: () => <div>Dashboard Icon</div>,
  BarChart2: () => <div>Analytics Icon</div>,
  Settings: () => <div>Settings Icon</div>,
  Bell: () => <div>Bell Icon</div>
}));

describe('AppShell Component', () => {
  it('renders the app shell with navigation items', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    // Check if navigation items are rendered
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Check if child content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders mobile bottom navigation', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    // Check if mobile navigation items are rendered
    expect(screen.getByText('Dashboard Icon')).toBeInTheDocument();
    expect(screen.getByText('Analytics Icon')).toBeInTheDocument();
    expect(screen.getByText('Settings Icon')).toBeInTheDocument();
  });
});
