import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

// PREMIUM UI: Premium kart bileşeni
// PREMIUM UI: Glassmorphism efektleri
// PREMIUM UI: Framer Motion ile animasyonlu giriş

export function Card({ className, children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card rounded-2xl border border-[var(--glass-border)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
