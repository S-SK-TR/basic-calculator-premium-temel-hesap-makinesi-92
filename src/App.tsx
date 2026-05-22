import React from 'react';
import { Calculator } from './components/Calculator';
import { AppShell } from './components/layout/AppShell';
import { ThemeProvider } from './components/ThemeProvider';

// PREMIUM UI: AppShell bileşeni ile premium PWA deneyimi sağlanıyor
// PREMIUM UI: ThemeProvider ile dark/light mode geçişleri yönetiliyor
// PREMIUM UI: Framer Motion ile sayfa geçişleri ve animasyonlar ekleniyor

export default function App() {
  return (
    <ThemeProvider>
      <AppShell>
        <Calculator />
      </AppShell>
    </ThemeProvider>
  );
}
