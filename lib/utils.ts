import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertRangeToArray(range: string) {
  let res = []
  let [start, end] = range.split('-')
  if (end) {
      for (let i = parseInt(start); i <= parseInt(end); i++) {
          res.push(i)
      }
  } else {
      res.push(parseInt(start))
  }
  return res as number[]
}
export function convertInputToAntiqueRange(input: string) {

  const inputArray = input.replace(/ /g, '').split(',');
  const arr = inputArray.map((x) => {
      if (x.includes('-')) {
          return convertRangeToArray(x).map((y) => y.toString().trim().padStart(4, '0'))
      } else return x.trim().padStart(4, '0')
  }).flat().sort()
  let unique = new Set(arr);
  return Array.from(unique) as string[]
}