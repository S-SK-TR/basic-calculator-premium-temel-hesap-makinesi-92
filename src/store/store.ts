import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface CalculatorState {
  currentValue: string;
  previousValue: string;
  operation: string | null;
  history: string[];
}

interface CalculatorActions {
  setValue: (value: string) => void;
  setOperation: (operation: string) => void;
  calculate: () => void;
  clear: () => void;
  addToHistory: (entry: string) => void;
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
}

export const useStore = create<AppState & AppActions>()(
  persist(
    (set) => ({
      theme: 'dark',
      calculator: {
        currentValue: '0',
        previousValue: '',
        operation: null,
        history: []
      },
      
      setTheme: (theme) => set({ theme }),
      
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
      }))
    }),
    { name: 'app-store' }
  )
);
