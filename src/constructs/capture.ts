import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface Capture extends RegexConstruct {
  type: 'capture';
  children: RegexElement[];
  options?: CaptureOptions;
}

export type CaptureOptions = {
  /**
   * Name to be given to the capturing group.
   */
  name?: string;
};

export interface Reference extends RegexConstruct {
  type: 'reference';
  name: string;
}

/**
 * Creates a capturing group which allows the matched pattern to be available:
 * - in the match results (`String.match`, `String.matchAll`, or `RegExp.exec`)
 * - in the regex itself, through {@link ref}
 */
export function capture(sequence: RegexSequence, options?: CaptureOptions): Capture {
  return {
    type: 'capture',
    children: ensureArray(sequence),
    options,
    encode: encodeCapture,
  };
}

/**
 * Creates a reference (a.k.a. backreference) to a capturing group.
 *
 * Backreferences allows to match the same text that was previously captured by a capturing group.
 *
 * @param name - Name to be given to the capturing group which receives this reference. If not provided, a unique name will be generated.
 */
export function ref(name: string): Reference {
  return {
    type: 'reference',
    name,
    encode: encodeReference,
  };
}

function encodeCapture(this: Capture): EncodeResult {
  const name = this.options?.name;
  if (name) {
    return {
      precedence: 'atom',
      pattern: `(?<${name}>${encodeSequence(this.children).pattern})`,
    };
  }

  return {
    precedence: 'atom',
    pattern: `(${encodeSequence(this.children).pattern})`,
  };
}

function encodeReference(this: Reference): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `\\k<${this.name}>`,
  };
}
