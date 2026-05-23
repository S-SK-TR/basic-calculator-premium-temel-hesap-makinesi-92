import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles conditional classes', () => {
    const result = cn(
      'base-class',
      true && 'active-class',
      false && 'inactive-class'
    );
    expect(result).toBe('base-class active-class');
  });

  it('handles undefined and null values', () => {
    const result = cn(
      'base-class',
      undefined,
      null,
      'another-class'
    );
    expect(result).toBe('base-class another-class');
  });

  it('handles array of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles nested arrays', () => {
    const result = cn(['class1', ['class2', 'class3']], 'class4');
    expect(result).toBe('class1 class2 class3 class4');
  });

  it('handles tailwind-merge functionality', () => {
    // This tests that conflicting classes are merged properly
    const result = cn('p-4', 'p-2', 'text-red-500', 'text-blue-500');
    expect(result).toBe('p-2 text-blue-500');
  });
});
