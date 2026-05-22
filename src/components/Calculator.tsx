import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/store';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { History } from './History';

// PREMIUM UI: Premium hesap makinesi bileşeni
// PREMIUM UI: Glassmorphism efektleri ve animasyonlar
// PREMIUM UI: Framer Motion ile dinamik animasyonlar

const buttonVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.2 }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const buttonClasses = {
  number: "bg-brand-500/10 hover:bg-brand-500/20 text-brand-500 border-brand-500/20",
  operation: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 border-blue-500/20",
  clear: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border-rose-500/20",
  equals: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border-emerald-500/20"
};

const buttons = [
  { label: '7', type: 'number' },
  { label: '8', type: 'number' },
  { label: '9', type: 'number' },
  { label: '/', type: 'operation' },
  { label: '4', type: 'number' },
  { label: '5', type: 'number' },
  { label: '6', type: 'number' },
  { label: '*', type: 'operation' },
  { label: '1', type: 'number' },
  { label: '2', type: 'number' },
  { label: '3', type: 'number' },
  { label: '-', type: 'operation' },
  { label: '0', type: 'number' },
  { label: '.', type: 'number' },
  { label: '=', type: 'equals' },
  { label: '+', type: 'operation' },
  { label: 'C', type: 'clear' }
];

// PREMIUM UI: Hesap makinesi bileşeni
// PREMIUM UI: Framer Motion ile animasyonlu girişler
// PREMIUM UI: Premium UI bileşenleri kullanılıyor

export function Calculator() {
  const {
    calculator: { currentValue, previousValue, operation, history },
    setCalculator,
    calculate,
    clearCalculator
  } = useStore();

  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      clearCalculator();
      return;
    }

    if (value === '=') {
      calculate();
      return;
    }

    if (['+', '-', '*', '/'].includes(value)) {
      setCalculator({ previousValue: currentValue, operation: value, currentValue: '0' });
      return;
    }

    // Sıfırdan sonra gelen rakamları temizle
    if (currentValue === '0' && value !== '.') {
      setCalculator({ currentValue: value });
      return;
    }

    // Nokta ekleme kontrolü
    if (value === '.' && currentValue.includes('.')) {
      return;
    }

    setCalculator({ currentValue: currentValue + value });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calculator Card */}
      <Card className="flex-1">
        <div className="p-6">
          <div className="mb-4">
            <div className="text-right text-sm text-[var(--text-muted)]">
              {previousValue} {operation}
            </div>
            <div className="text-right text-4xl font-bold">
              {currentValue}
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-4 gap-3"
          >
            {buttons.map((button, index) => (
              <motion.div key={index} variants={buttonVariants}>
                <Button
                  onClick={() => handleButtonClick(button.label)}
                  className={`h-14 text-lg font-medium ${buttonClasses[button.type as keyof typeof buttonClasses]}`}
                >
                  {button.label}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Card>

      {/* History Card */}
      <Card className="lg:w-80">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Geçmiş</h3>
          <History history={history} />
        </div>
      </Card>
    </div>
  );
}
