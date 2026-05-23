import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  history: string[];
  isUnitConverterOpen: boolean;
  isChartOpen: boolean;
}

interface CalculatorActions {
  setValue: (value: string) => void;
  setOperation: (operation: string) => void;
  calculate: () => void;
  clear: () => void;
  addToHistory: (entry: string) => void;
  clearHistory: () => void;
  toggleUnitConverter: () => void;
  toggleChart: () => void;
}

interface AppState {
  theme: 'dark' | 'light';
  calculator: CalculatorState;
}

interface AppActions {
  setTheme: (theme: 'dark' | 'light') => void;
  setCalculator: (calculator: Partial<CalculatorState>) => void;
  calculate: () => void;
  clearCalculator: () => void;
  clearHistory: () => void;
  toggleUnitConverter: () => void;
  toggleChart: () => void;
}

export const useStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      theme: 'dark',
      calculator: {
        currentValue: '0',
        previousValue: '',
        operation: null,
        history: [],
        isUnitConverterOpen: false,
        isChartOpen: false
      },
      
      setTheme: (theme) => {
        set({ theme });
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
      
      setCalculator: (calculator) => set((state) => ({
        calculator: { ...state.calculator, ...calculator }
      })),
      
      calculate: () => set((state) => {
        const { currentValue, previousValue, operation } = state.calculator;
        if (!operation || !previousValue) return state;
        
        let result = 0;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        
        switch (operation) {
          case '+': result = prev + current; break;
          case '-': result = prev - current; break;
          case '*': result = prev * current; break;
          case '/': result = prev / current; break;
          case '%': result = prev % current; break;
          case '√': result = Math.sqrt(prev); break;
          case 'x²': result = prev * prev; break;
          default: return state;
        }
        
        const historyEntry = `${previousValue} ${operation} ${currentValue} = ${result}`;
        return {
          calculator: {
            ...state.calculator,
            currentValue: result.toString(),
            previousValue: '',
            operation: null,
            history: [...state.calculator.history, historyEntry]
          }
        };
      }),
      
      clearCalculator: () => set((state) => ({
        calculator: {
          ...state.calculator,
          currentValue: '0',
          previousValue: '',
          operation: null
        }
      })),
      
      clearHistory: () => set((state) => ({
        calculator: {
          ...state.calculator,
          history: []
        }
      })),
      
      toggleUnitConverter: () => set((state) => ({
        calculator: {
          ...state.calculator,
          isUnitConverterOpen: !state.calculator.isUnitConverterOpen
        }
      })),
      
      toggleChart: () => set((state) => ({
        calculator: {
          ...state.calculator,
          isChartOpen: !state.calculator.isChartOpen
        }
      }))
    }),
    { name: 'app-store' }
  )
);
