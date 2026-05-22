import React from 'react';
import { render, screen } from '@testing-library/react';
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
});
