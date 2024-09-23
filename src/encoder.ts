import type { EncodedRegex, RegexElement, RegexSequence } from './types';
import { ensureElements } from './utils';

export function encode(sequence: RegexSequence): EncodedRegex | null {
  const elements = ensureElements(sequence);
  const encoded = elements.map((n) => encodeElement(n)).filter((n) => n != null);
  if (encoded.length === 0) {
    return null;
  }

  if (encoded.length === 1) {
    return encoded[0]!;
  }

  return {
    precedence: 'sequence',
    pattern: encoded
      .map((n) => (n.precedence === 'disjunction' ? encodeAtomic(n) : n.pattern))
      .join(''),
  };
}

export function encodeAtomic(sequence: RegexSequence): string | null {
  const encoded = encode(sequence);
  if (encoded == null) {
    return null;
  }

  return encoded.precedence === 'atom' ? encoded.pattern : `(?:${encoded.pattern})`;
}

function encodeElement(element: RegexElement): EncodedRegex | null {
  if (element == null) {
    return null;
  }

  if (typeof element === 'string') {
    return encodeText(element);
  }

  if (element instanceof RegExp) {
    return encodeRegExp(element);
  }

  if (typeof element === 'object') {
    // EncodedRegex
    if ('pattern' in element) {
      return element;
    }

    // LazyEncodableRegex
    if ('encode' in element) {
      return element.encode();
    }
  }

  throw new Error(`Unsupported element. Received: ${JSON.stringify(element, null, 2)}`);
}

function encodeText(text: string): EncodedRegex | null {
  if (text.length === 0) {
    return null;
  }

  return {
    // Optimize for single character case
    precedence: text.length === 1 ? 'atom' : 'sequence',
    pattern: escapeText(text),
  };
}

function encodeRegExp(regexp: RegExp): EncodedRegex {
  const pattern = regexp.source;

  return {
    // Encode at safe precedence
    precedence: isAtomicPattern(pattern) ? 'atom' : 'disjunction',
    pattern,
  };
}

// This is intended to catch only some popular atomic patterns like char classes and groups.
function isAtomicPattern(pattern: string): boolean {
  // Simple char, char class [...] or group (...)
  return pattern.length === 1 || /^\[[^[\]]*\]$/.test(pattern) || /^\([^()]*\)$/.test(pattern);
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
