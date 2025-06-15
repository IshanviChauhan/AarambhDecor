import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parsePrice = (priceString?: string): number => {
  if (!priceString) return 0;
  // Remove "Rs. ", currency symbol, and commas, then parse
  const cleanedPrice = priceString.replace(/Rs\.\s*|,/g, '').replace(/[₹]/g, '');
  const price = parseFloat(cleanedPrice);
  return isNaN(price) ? 0 : price;
};
