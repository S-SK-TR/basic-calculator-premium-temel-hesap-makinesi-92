import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// PREMIUM UI: Utility fonksiyonları
// PREMIUM UI: Tailwind ve clsx entegrasyonu

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
