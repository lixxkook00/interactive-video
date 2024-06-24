/**
 * Recursively flattens an array.
 *
 * @template T The type of the array elements.
 * @param args The array to flatten.
 * @returns The flattened array.
 */
export const deepFlat = <T>(args: (T | T[])[]): T[] =>
  args.reduce<T[]>((acc, val) => acc.concat(Array.isArray(val) ? deepFlat(val) : val), []);
