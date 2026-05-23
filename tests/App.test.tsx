import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { useStore } from '../src/store/store';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock the store
vi.mock('@/store/store', () => ({
  useStore: vi.fn()
}));

// Mock the ThemeProvider and ThemeToggle
vi.mock('@/components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button>Theme Toggle</button>
}));

// Mock the Calculator component
vi.mock('@/components/Calculator', () => ({
  Calculator: () => <div>Calculator Component</div>
}));

// Mock the AppShell component
vi.mock('@/components/layout/AppShell', () => ({
  AppShell: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('App Component', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Calculator Component')).toBeInTheDocument();
  });

  it('displays offline banner when not online', () => {
    // Mock navigator.onLine to be false
    Object.defineProperty(window.navigator, 'onLine', { value: false, configurable: true });

    render(<App />);
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
  });

  it('does not display offline banner when online', () => {
    // Mock navigator.onLine to be true
    Object.defineProperty(window.navigator, 'onLine', { value: true, configurable: true });

    render(<App />);
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });

  it('renders ThemeToggle component', () => {
    render(<App />);
    expect(screen.getByText('Theme Toggle')).toBeInTheDocument();
  });

  it('handles online/offline events correctly', () => {
    render(<App />);

    // Simulate going offline
    window.dispatchEvent(new Event('offline'));
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();

    // Simulate going online
    window.dispatchEvent(new Event('online'));
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });
});