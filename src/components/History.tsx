import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/store';
import { Button } from './ui/Button';

// PREMIUM UI: Geçmiş bileşeni
// PREMIUM UI: Framer Motion ile animasyonlu liste girişleri

interface HistoryProps {
  history: string[];
}

export function History({ history }: HistoryProps) {
  const clearHistory = useStore((state) => state.clearHistory);

  if (history.length === 0) {
    return (
      <div className="text-center text-[var(--text-muted)] py-8">
        Henüz hesaplama yapılmadı
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((entry, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm"
          >
            {entry}
          </motion.div>
        ))}
      </div>
      <Button
        onClick={clearHistory}
        variant="destructive"
        className="w-full mt-4"
      >
        Geçmişi Temizle
      </Button>
    </div>
  );
}
