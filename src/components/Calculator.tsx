import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/store/store';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { History } from './History';
import { UnitConverterModal } from './UnitConverterModal';
import { Chart } from './Chart';
import { HelpCircle, BarChart2 } from 'lucide-react';

// Buton tıklama animasyonu için variants
const buttonClickVariants = {
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

// Ekran animasyonu için variants
const displayVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  }
};

// Butonlar için container variants
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const buttons = [
  { label: '7', type: 'number', key: 'Digit7' },
  { label: '8', type: 'number', key: 'Digit8' },
  { label: '9', type: 'number', key: 'Digit9' },
  { label: '/', type: 'operator', key: 'Slash' },
  { label: '4', type: 'number', key: 'Digit4' },
  { label: '5', type: 'number', key: 'Digit5' },
  { label: '6', type: 'number', key: 'Digit6' },
  { label: '*', type: 'operator', key: 'KeyM' },
  { label: '1', type: 'number', key: 'Digit1' },
  { label: '2', type: 'number', key: 'Digit2' },
  { label: '3', type: 'number', key: 'Digit3' },
  { label: '-', type: 'operator', key: 'Minus' },
  { label: '0', type: 'number', key: 'Digit0' },
  { label: '.', type: 'number', key: 'Period' },
  { label: '=', type: 'function', key: 'Enter' },
  { label: '+', type: 'operator', key: 'Equal' },
  { label: 'C', type: 'function', key: 'KeyC' },
  { label: '%', type: 'function', key: 'KeyP' },
  { label: '√', type: 'function', key: 'KeyR' },
  { label: 'x²', type: 'function', key: 'KeyX' }
];

const CalculatorComponent = React.memo(function Calculator() {
  const {
    calculator: { currentValue, previousValue, operation, history, isUnitConverterOpen, isChartOpen },
    setCalculator,
    calculate,
    clearCalculator,
    toggleUnitConverter,
    toggleChart
  } = useStore();

  const calculatorRef = useRef<HTMLDivElement>(null);

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

    if (value === '%') {
      setCalculator({ currentValue: (parseFloat(currentValue) / 100).toString() });
      return;
    }

    if (value === '√') {
      setCalculator({ currentValue: Math.sqrt(parseFloat(currentValue)).toString() });
      return;
    }

    if (value === 'x²') {
      setCalculator({ currentValue: (parseFloat(currentValue) ** 2).toString() });
      return;
    }

    if (currentValue === '0' && value !== '.') {
      setCalculator({ currentValue: value });
      return;
    }

    if (value === '.' && currentValue.includes('.')) {
      return;
    }

    setCalculator({ currentValue: currentValue + value });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!calculatorRef.current?.contains(document.activeElement)) return;

    const keyMap: Record<string, string> = {
      'Escape': 'C',
      'Backspace': 'C',
      'Enter': '='
    };

    const button = buttons.find(b => b.key === e.code);
    if (button) {
      e.preventDefault();
      handleButtonClick(button.label);
    } else if (keyMap[e.code]) {
      e.preventDefault();
      handleButtonClick(keyMap[e.code]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentValue]);

  return (
    <div
      ref={calculatorRef}
      className="flex flex-col lg:flex-row gap-4"
      role="application"
      aria-label="Hesap makinesi"
    >
      <Card className="flex-1">
        <div className="p-4">
          <motion.div
            variants={displayVariants}
            initial="initial"
            animate="animate"
            className="mb-4"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="text-right text-sm text-[var(--text-muted)]">
              {previousValue} {operation}
            </div>
            <div className="text-right text-3xl font-bold text-[var(--text-primary)]">
              {currentValue}
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="grid grid-cols-4 gap-2 sm:gap-3"
          >
            {buttons.map((button, index) => (
              <motion.div
                key={index}
                whileTap="tap"
                whileHover="hover"
                variants={buttonClickVariants}
              >
                <Button
                  onClick={() => handleButtonClick(button.label)}
                  variant={button.type === 'number' ? 'primary' :
                           button.type === 'operator' ? 'operator' : 'function'}
                  className={`h-12 sm:h-14 text-base sm:text-lg font-medium touch-pinch-zoom focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  aria-label={`Buton ${button.label}`}
                >
                  {button.label}
                </Button>
              </motion.div>
            ))}

            <motion.div
              whileTap="tap"
              whileHover="hover"
              variants={buttonClickVariants}
            >
              <Button
                onClick={toggleUnitConverter}
                variant="function"
                className="h-12 sm:h-14 text-base sm:text-lg font-medium touch-pinch-zoom focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Birim dönüştürücü aç"
              >
                <HelpCircle size={20} />
              </Button>
            </motion.div>

            <motion.div
              whileTap="tap"
              whileHover="hover"
              variants={buttonClickVariants}
            >
              <Button
                onClick={toggleChart}
                variant="function"
                className="h-12 sm:h-14 text-base sm:text-lg font-medium touch-pinch-zoom focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Grafik aç"
              >
                <BarChart2 size={20} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>

      <Card className="lg:w-80">
        <div className="p-4">
          <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-[var(--text-primary)]">Geçmiş</h3>
          <History history={history} />
        </div>
      </Card>

      <UnitConverterModal
        isOpen={isUnitConverterOpen}
        onClose={toggleUnitConverter}
      />

      <Chart
        isOpen={isChartOpen}
        onClose={toggleChart}
      />
    </div>
  );
});

export const Calculator = React.memo(CalculatorComponent);
