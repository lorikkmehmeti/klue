import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

declare global {
   interface Array<T> {
      getRandomElement(): T | undefined;
   }
}

Array.prototype.getRandomElement = function () {
   const randomIndex = Math.floor(Math.random() * this.length);
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return this[randomIndex];
};