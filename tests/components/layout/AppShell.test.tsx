import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppShell } from '@/components/layout/AppShell';
import { useTheme } from '@/components/ThemeProvider';

// Mock the useTheme hook
jest.mock('@/components/ThemeProvider', () => ({
  useTheme: jest.fn()
}));

// Mock the icons
jest.mock('lucide-react', () => ({
  Moon: () => <div data-testid="moon-icon">Moon</div>,
  Sun: () => <div data-testid="sun-icon">Sun</div>,
  HelpCircle: () => <div data-testid="help-circle-icon">HelpCircle</div>
}));

describe('AppShell Component', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme
    });
  });

  it('renders correctly with light theme', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByTestId('help-circle-icon')).toBeInTheDocument();
    expect(screen.getByText('Basic HelpCircle')).toBeInTheDocument();
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('renders correctly with dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme
    });

    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(
      <AppShell>
        <div>Test Content</div>
      </AppShell>
    );

    fireEvent.click(screen.getByRole('button', { name: /Switch to dark mode/i }));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
