import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'operator' | 'function';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15, type: 'spring', stiffness: 400, damping: 10 }}
      disabled={disabled || isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        "glass-morphism",
        "backdrop-blur-sm",
        "border border-[var(--glass-border)]",
        "shadow-sm shadow-[var(--glass-glow)]",
        {
          'bg-gradient-to-br from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white': variant === 'primary',
          'bg-[var(--glass-bg)] hover:bg-[var(--glass-border)] text-[var(--text-primary)]': variant === 'secondary',
          'hover:bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]': variant === 'ghost',
          'bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white': variant === 'destructive',
          'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white': variant === 'operator',
          'bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white': variant === 'function',
          'h-8 px-3 text-xs': size === 'sm',
          'h-10 px-4 text-sm': size === 'md',
          'h-12 px-6 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
