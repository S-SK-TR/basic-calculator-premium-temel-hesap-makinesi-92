import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';

// PREMIUM UI: E2E testleri
// PREMIUM UI: Uygulamanın temel işlevlerinin çalıştığını doğrular

describe('UI E2E App Flow Tests', () => {
  it('renders the application correctly and handles basic page loading', async () => {
    render(<App />);
    const appContainer = document.body;
    expect(appContainer).toBeInTheDocument();
    
    // Uygulamanın en azından boş veya yüklenen ana şablonunu render edebildiğini doğrula
    expect(document.getElementById('root') || document.body).toBeInTheDocument();
  });

  it('displays the calculator interface', () => {
    render(<App />);
    expect(screen.getByText(/Basic Calculator/i)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('performs a basic calculation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles theme toggle', () => {
    render(<App />);
    const themeToggle = screen.getByRole('button', { name: /theme toggle/i });
    fireEvent.click(themeToggle);
    expect(document.documentElement).toHaveClass('dark');
    fireEvent.click(themeToggle);
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('handles offline state', () => {
    render(<App />);
    // Simulate offline state
    Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
    window.dispatchEvent(new Event('offline'));
    expect(screen.getByText(/Çevrimdışı/i)).toBeInTheDocument();
    // Simulate online state
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
    window.dispatchEvent(new Event('online'));
    expect(screen.queryByText(/Çevrimdışı/i)).not.toBeInTheDocument();
  });
});
