import React, { useEffect, useState } from 'react';
import { Calculator } from './components/Calculator';
import { AppShell } from './components/layout/AppShell';
import { ThemeProvider } from './components/ThemeProvider';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { WifiOff } from 'lucide-react';

// PREMIUM UI: AppShell bileşeni ile premium PWA deneyimi sağlanıyor
// PREMIUM UI: ThemeProvider ile dark/light mode geçişleri yönetiliyor
// PREMIUM UI: Framer Motion ile sayfa geçişleri ve animasyonlar ekleniyor

export default function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ThemeProvider>
      <AppShell>
        {!isOnline && (
          <div className="fixed top-0 inset-x-0 z-[100] flex items-center justify-center gap-2 h-10 bg-amber-500 text-amber-950 text-sm font-medium">
            <WifiOff size={14} /> Çevrimdışı — Değişiklikler kaydedilecek
          </div>
        )}
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <Calculator />
      </AppShell>
    </ThemeProvider>
  );
}
