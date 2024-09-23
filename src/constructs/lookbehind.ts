import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

/**
 * Positive lookbehind assertion.
 *
 * A positive lookbehind assertion is a zero-width assertion that matches a group of characters only if it is preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * lookbehind("a");
 * // /(?<=a)/
 *
 * lookbehind(["a", "b", "c"]);
 * // /(?<=abc)/
 * ```
 */
export function lookbehind(sequence: RegexSequence): EncodedRegex | null {
  const elements = ensureElements(sequence);
  if (elements.length === 0) {
    return null;
  }

  return {
    precedence: 'atom',
    pattern: `(?<=${encode(sequence).pattern})`,
  };
}
