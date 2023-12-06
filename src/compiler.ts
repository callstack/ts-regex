import type { RegexElement } from './types';
import { compilers as quantifiers } from './quantifiers';

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(...elements: RegexElement[]): RegExp {
  const pattern = compileList(elements);
  return new RegExp(pattern);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(...elements: RegexElement[]): string {
  return compileList(elements);
}

// Recursive compilation

function compileList(elements: RegexElement[]): string {
  return elements.map((c) => compileSingle(c)).join('');
}

function compileSingle(elements: RegexElement): string {
  if (typeof elements === 'string') {
    return elements;
  }

  const elementCompiler = quantifiers[elements.type];
  if (!elementCompiler) {
    throw new Error(`Unknown elements type ${elements.type}`);
  }

  const children = compileList(elements.children);
  return elementCompiler(children);
}
