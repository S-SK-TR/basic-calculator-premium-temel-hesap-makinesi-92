import { useStore, initialState } from '@/store/store';
import { act, renderHook } from '@testing-library/react';

describe('Calculator Store', () => {
  it('initializes with correct state', () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.calculator).toEqual(initialState.calculator);
    expect(result.current.theme).toBe(initialState.theme);
  });

  it('updates calculator state correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setCalculator({
        currentValue: '5',
        previousValue: '10',
        operation: '+'
      });
    });

    expect(result.current.calculator.currentValue).toBe('5');
    expect(result.current.calculator.previousValue).toBe('10');
    expect(result.current.calculator.operation).toBe('+');
  });

  it('performs calculation correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setCalculator({
        currentValue: '5',
        previousValue: '10',
        operation: '+'
      });
      result.current.calculate();
    });

    expect(result.current.calculator.currentValue).toBe('15');
    expect(result.current.calculator.history).toContain('10 + 5 = 15');
  });

  it('clears calculator correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setCalculator({
        currentValue: '5',
        previousValue: '10',
        operation: '+'
      });
      result.current.clearCalculator();
    });

    expect(result.current.calculator).toEqual({
      ...initialState.calculator,
      history: []
    });
  });

  it('toggles unit converter correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.toggleUnitConverter();
    });

    expect(result.current.calculator.isUnitConverterOpen).toBe(true);

    act(() => {
      result.current.toggleUnitConverter();
    });

    expect(result.current.calculator.isUnitConverterOpen).toBe(false);
  });

  it('toggles chart correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.toggleChart();
    });

    expect(result.current.calculator.isChartOpen).toBe(true);

    act(() => {
      result.current.toggleChart();
    });

    expect(result.current.calculator.isChartOpen).toBe(false);
  });

  it('clears history correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setCalculator({
        currentValue: '5',
        previousValue: '10',
        operation: '+'
      });
      result.current.calculate();
      result.current.clearHistory();
    });

    expect(result.current.calculator.history).toEqual([]);
  });

  it('updates theme correctly', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setTheme('dark');
    });

    expect(result.current.theme).toBe('dark');

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
  });
});
