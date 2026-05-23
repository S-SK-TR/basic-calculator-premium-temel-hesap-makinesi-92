import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '@/store/store';

type Theme = 'dark' | 'light' | 'pastel';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  nextTheme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// PREMIUM UI: Tema geçişlerini yöneten sağlayıcı bileşeni
// PREMIUM UI: HTML elementine tema sınıfını uyguluyor
// PREMIUM UI: LocalStorage'da tema tercihini saklıyor

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Assuming useStore's theme can handle 'pastel' as a string. 
  // If useStore is strictly typed as 'dark' | 'light', a type error might occur outside this file.
  const { theme, setTheme } = useStore((state) => ({ 
    theme: state.theme as Theme, 
    setTheme: state.setTheme 
  }));

  useEffect(() => {
    // Ensure all possible theme classes are removed before adding the current one
    document.documentElement.classList.remove('dark', 'light', 'pastel');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    let newTheme: Theme;
    if (theme === 'dark') {
      newTheme = 'light';
    } else if (theme === 'light') {
      newTheme = 'pastel';
    } else {
      newTheme = 'dark';
    }
    setTheme(newTheme);
  };

  const nextTheme: Theme = 
    theme === 'dark' ? 'light' : 
    theme === 'light' ? 'pastel' : 'dark';

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, nextTheme }}>
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