import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplashIntroProps {
  onComplete: () => void;
}

export function SplashIntro({ onComplete }: SplashIntroProps) {
  const [numbers, setNumbers] = useState<string[]>([]);
  const [operators, setOperators] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Generate random math expressions
    const interval = setInterval(() => {
      const num1 = Math.floor(Math.random() * 100);
      const num2 = Math.floor(Math.random() * 100);
      const op = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
      let result;
      
      try {
        result = eval(`${num1}${op}${num2}`).toFixed(2);
      } catch {
        result = 'Error';
      }

      setNumbers(prev => [...prev, `${num1} ${op} ${num2}`].slice(-5));
      setResults(prev => [...prev, result].slice(-5));
    }, 300);

    // Complete after 5 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      onComplete();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-base)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md p-6 space-y-4"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Math Explorer</h1>
          <p className="text-[var(--text-muted)] mt-1">Discovering the beauty of numbers</p>
        </div>

        <div className="space-y-2">
          {numbers.map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "flex justify-between items-center p-3 rounded-xl",
                "bg-[var(--bg-surface)] border border-[var(--border)]",
                "text-[var(--text-primary)]"
              )}
            >
              <span className="font-mono">{num}</span>
              <span className="font-mono font-bold">= {results[i]}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}