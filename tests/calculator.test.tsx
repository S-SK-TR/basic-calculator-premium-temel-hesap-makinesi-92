import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../src/components/Calculator';
import { useStore } from '../src/store/store';

// Mock the store
jest.mock('../src/store/store');

describe('Calculator Component', () => {
  const mockSetCalculator = jest.fn();
  const mockCalculate = jest.fn();
  const mockClearCalculator = jest.fn();

  beforeEach(() => {
    (useStore as jest.Mock).mockReturnValue({
      calculator: {
        currentValue: '0',
        previousValue: '',
        operation: null,
        history: []
      },
      setCalculator: mockSetCalculator,
      calculate: mockCalculate,
      clearCalculator: mockClearCalculator
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Calculator />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
  });

  it('handles number input', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    expect(mockSetCalculator).toHaveBeenCalledWith({ currentValue: '1' });
  });

  it('handles operation input', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    expect(mockSetCalculator).toHaveBeenCalledWith({
      previousValue: '1',
      operation: '+',
      currentValue: '0'
    });
  });

  it('handles equals operation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('='));
    expect(mockCalculate).toHaveBeenCalled();
  });

  it('handles clear operation', () => {
    render(<Calculator />);
    fireEvent.click(screen.getByText('C'));
    expect(mockClearCalculator).toHaveBeenCalled();
  });
});
