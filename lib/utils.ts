import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { encode, decode } from 'js-base64';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodeData = (obj: any): string => {
  return encode(JSON.stringify(obj));
};

export const decodeData = (base64: string): any => {
  return JSON.parse(decode(base64));
};
