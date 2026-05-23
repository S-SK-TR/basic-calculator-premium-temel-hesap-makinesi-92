import React from 'react';
import { Moon, Sun, Palette } from 'lucide-react';
import { Button } from './Button';
import { useTheme } from '../ThemeProvider';

// PREMIUM UI: Tema değiştirme toggle butonu bileşeni
// PREMIUM UI: Framer Motion ile animasyonlu geçiş
// PREMIUM UI: Glassmorphism efektleri

export function ThemeToggle() {
  const { theme, toggleTheme, nextTheme } = useTheme();

  let IconComponent: React.ElementType;
  let iconColorClass: string;

  if (theme === 'dark') {
    IconComponent = Sun;
    iconColorClass = 'text-yellow-400';
  } else if (theme === 'light') {
    IconComponent = Moon;
    iconColorClass = 'text-blue-500';
  } else {
    IconComponent = Palette;
    iconColorClass = 'text-pink-400';
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className="p-2 rounded-full glass-morphism"
      aria-label={`Switch to ${nextTheme} mode`}
    >
      <IconComponent className={`h-5 w-5 ${iconColorClass}`} />
    </Button>
  );
}