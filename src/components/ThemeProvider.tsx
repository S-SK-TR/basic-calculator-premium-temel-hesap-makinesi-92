import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '@/store/store';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// PREMIUM UI: Tema geçişlerini yöneten sağlayıcı bileşeni
// PREMIUM UI: HTML elementine tema sınıfını uyguluyor
// PREMIUM UI: LocalStorage'da tema tercihini saklıyor

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useStore();

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
