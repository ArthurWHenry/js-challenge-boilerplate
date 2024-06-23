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

/**
 * Format bytes to a human-readable string.
 * @param {number} bytes - The number of bytes.
 * @param {number} [decimals=2] - The number of decimal places to include.
 * @returns {string} The formatted string.
 *
 * @example
 * ```typescript
 * formatBytes({ bytes: 1024 }); // '1kb'
 * ```
 */
export function formatBytes({
  bytes,
  decimals = 2,
}: {
  bytes: number;
  decimals?: number;
}): string {
  if (bytes === 0) return '0b';
  const k = 1024;
  const dm: number = decimals < 0 ? 0 : decimals;
  const sizes: string[] = ['b', 'kb', 'mb', 'gb', 'tb'];
  const i: number = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + sizes[i];
}
