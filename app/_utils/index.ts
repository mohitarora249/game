import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function deepClone2DArray<T>(arr: T[][]): T[][] {
  return arr.map((row) => [...row]);
}
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}