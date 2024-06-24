/**
 * Converts a string to camel case.
 *
 * @param string - The input string.
 */
export const camelCase = (string: string) => string.replace(/\W+\w/g, (match) => match.slice(-1).toUpperCase());
/**
 * Converts a string to camel case.
 *
 * @param string - The input string.
 */
export const getOrdinalSuffix = (number: number) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = number % 10;
  const suffix = lastDigit <= 3 && number !== 11 && number !== 12 && number !== 13 ? suffixes[lastDigit] : suffixes[0];
  return `${number}${suffix}`;
};
