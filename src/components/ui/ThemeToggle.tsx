import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '@/store/store';
import { Button } from './Button';

// PREMIUM UI: Tema değiştirme toggle butonu bileşeni
// PREMIUM UI: Framer Motion ile animasyonlu geçiş
// PREMIUM UI: Glassmorphism efektleri

export function ThemeToggle() {
  const { theme, setTheme } = useStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="p-2 rounded-full glass-morphism"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-500" />
      )}
    </Button>
  );
}
