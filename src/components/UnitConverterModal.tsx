import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { X, HelpCircle } from 'lucide-react';

interface UnitConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UnitConverterModal({ isOpen, onClose }: UnitConverterModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('feet');
  const [result, setResult] = useState('');

  const unitGroups = {
    length: {
      meter: 'Metre',
      feet: 'Fit',
      inch: 'İnç',
      cm: 'Santimetre',
      km: 'Kilometre'
    },
    weight: {
      kg: 'Kilogram',
      gram: 'Gram',
      pound: 'Pound',
      ounce: 'Ons'
    },
    temperature: {
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin'
    }
  };

  const convertUnits = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return;

    let convertedValue;

    // Length conversions
    if (fromUnit === 'meter' && toUnit === 'feet') convertedValue = value * 3.28084;
    else if (fromUnit === 'feet' && toUnit === 'meter') convertedValue = value / 3.28084;
    else if (fromUnit === 'meter' && toUnit === 'inch') convertedValue = value * 39.3701;
    else if (fromUnit === 'inch' && toUnit === 'meter') convertedValue = value / 39.3701;
    // Add more conversions as needed

    // Temperature conversions
    else if (fromUnit === 'celsius' && toUnit === 'fahrenheit') convertedValue = (value * 9/5) + 32;
    else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') convertedValue = (value - 32) * 5/9;
    else if (fromUnit === 'celsius' && toUnit === 'kelvin') convertedValue = value + 273.15;
    else if (fromUnit === 'kelvin' && toUnit === 'celsius') convertedValue = value - 273.15;

    // Weight conversions
    else if (fromUnit === 'kg' && toUnit === 'gram') convertedValue = value * 1000;
    else if (fromUnit === 'gram' && toUnit === 'kg') convertedValue = value / 1000;
    else if (fromUnit === 'kg' && toUnit === 'pound') convertedValue = value * 2.20462;
    else if (fromUnit === 'pound' && toUnit === 'kg') convertedValue = value / 2.20462;

    else convertedValue = value; // Same unit

    setResult(convertedValue.toFixed(2));
  };

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <Card className="w-full max-w-md relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-[var(--bg-elevated)] transition-colors"
            >
              <X size={18} className="text-[var(--text-muted)]" />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle size={20} />
                Birim Dönüştürücü
              </h2>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Değer</label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Birim</label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(unitGroups).map(([group, units]) => (
                        <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                          {Object.entries(units).map(([unit, label]) => (
                            <option key={unit} value={unit}>{label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleSwapUnits}
                    className="p-2 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--border)] transition-colors"
                  >
                    <HelpCircle size={16} className="text-[var(--text-muted)]" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Sonuç</label>
                    <input
                      type="text"
                      value={result}
                      readOnly
                      className="w-full p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] focus:outline-none"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Birim</label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {Object.entries(unitGroups).map(([group, units]) => (
                        <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
                          {Object.entries(units).map(([unit, label]) => (
                            <option key={unit} value={unit}>{label}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={convertUnits}
                  className="w-full mt-2"
                >
                  Dönüştür
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
