import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeProvider';
import { Moon, Sun, HelpCircle as HelpCircleIcon } from 'lucide-react';

// PREMIUM UI: Premium PWA iskeleti bileşeni
// PREMIUM UI: Glassmorphism efektleri ve animasyonlar
// PREMIUM UI: Tema geçiş butonu ile kullanıcı kontrolü

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50">
        <div className="glass-morphism backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <HelpCircleIcon className="h-6 w-6 text-brand-500" />
                <span className="ml-3 font-display text-lg font-semibold text-[var(--text-primary)]">Basic HelpCircle</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-[var(--glass-border)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <Moon className="h-5 w-5 text-blue-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="glass-morphism backdrop-blur-xl bg-[var(--glass-bg)] border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-sm text-[var(--text-muted)]">
            <p>© {new Date().getFullYear()} Basic HelpCircle - Premium Temel Hesap Makinesi</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--glass-bg)]/90 backdrop-blur-xl border-t border-[var(--glass-border)] pb-[var(--safe-area-inset-bottom)]">
        <div className="flex h-16">
          <button className="flex-1 flex flex-col items-center justify-center gap-1 text-[10px] font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <HelpCircleIcon size={20} />
            Hesap Makinesi
          </button>
        </div>
      </nav>
    </div>
  );
}
