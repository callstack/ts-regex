import { buildPattern, buildRegExp } from '../../builders';
import { oneOrMore, optional, zeroOrMore } from '../../constructs/quantifiers';
import { repeat } from '../../constructs/repeat';

test('basic quantifies', () => {
  expect('a').toHavePattern(/a/);
  expect(['a', 'b']).toHavePattern(/ab/);

  expect(oneOrMore('a')).toHavePattern(/a+/);
  expect(optional('a')).toHavePattern(/a?/);

  expect(['a', oneOrMore('b')]).toHavePattern(/ab+/);
  expect(['a', oneOrMore('bc')]).toHavePattern(/a(?:bc)+/);
  expect(['a', oneOrMore('bc')]).toHavePattern(/a(?:bc)+/);

  expect(['a', repeat('b', { min: 1, max: 5 })]).toHavePattern(/ab{1,5}/);

  expect(['a', zeroOrMore('b')]).toHavePattern(/ab*/);
  expect(['a', zeroOrMore('bc')]).toHavePattern(/a(?:bc)*/);
  expect(['a', zeroOrMore('bc')]).toHavePattern(/a(?:bc)*/);

  expect([optional('a'), 'b']).toHavePattern(/a?b/);

  expect([optional('a'), 'b', oneOrMore('d')]).toHavePattern(/a?bd+/);
});

test('`buildPattern` escapes special characters', () => {
  expect('.').toHavePattern(/\./);
  expect('*').toHavePattern(/\*/);
  expect('+').toHavePattern(/\+/);
  expect('?').toHavePattern(/\?/);
  expect('^').toHavePattern(/\^/);
  expect('$').toHavePattern(/\$/);
  expect('{').toHavePattern(/\{/);
  expect('}').toHavePattern(/\}/);
  expect('|').toHavePattern(/\|/);
  expect('[').toHavePattern(/\[/);
  expect(']').toHavePattern(/\]/);
  expect('\\').toHavePattern(/\\/);

  expect('*.*').toHavePattern(/\*\.\*/);

  expect([oneOrMore('.*'), zeroOrMore('[]{}')]).toHavePattern(/(?:\.\*)+(?:\[\]\{\})*/);
});

test('`buildRegExp` throws error on unknown element', () => {
  expect(() =>
    // @ts-expect-error intentionally passing incorrect object
    buildRegExp({ type: 'unknown' }),
  ).toThrowErrorMatchingInlineSnapshot(`"\`encodeNode\`: unknown element type unknown"`);
});

test('`buildPattern` throws on empty text', () => {
  expect(() => buildPattern('')).toThrowErrorMatchingInlineSnapshot(
    `"\`encodeText\`: received text should not be empty"`,
  );
});
