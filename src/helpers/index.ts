/**
 * Check if the given number is a valid checksum.
 * @param {string} number - The number to check.
 * @returns {boolean} Whether the number is a valid checksum.
 *
 * @example
 * ```typescript
 * isValidChecksum('457500000'); // true
 * ```
 */
export function isValidChecksum(number: string): boolean {
  const digits: number[] = number.split('').map(Number); // Convert string to array of numbers
  let sum: number = 0;

  for (let i: number = 0; i < digits.length; i++) {
    sum += digits[i] * (i + 1); // Multiply each digit by its position (1-indexed)
  }

  return sum % 11 === 0; // Check if the sum is divisible by 11
}
