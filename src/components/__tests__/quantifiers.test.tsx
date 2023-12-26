import { buildRegex } from '../../builders';
import { digit } from '../character-class';
import { oneOrMore, optionally, zeroOrMore } from '../quantifiers';

test('`oneOrMore` quantifier', () => {
  expect(oneOrMore('a')).toHavePattern('a+');
  expect(oneOrMore('ab')).toHavePattern('(?:ab)+');
});

test('`optionally` quantifier', () => {
  expect(optionally('a')).toHavePattern('a?');
  expect(optionally('ab')).toHavePattern('(?:ab)?');
});

test('`zeroOrMore` quantifier', () => {
  expect(zeroOrMore('a')).toHavePattern('a*');
  expect(zeroOrMore('ab')).toHavePattern('(?:ab)*');
});

test('`oneOrMore` does not generate capture when grouping', () => {
  const regex = buildRegex(oneOrMore('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('`optionally` does not generate capture when grouping', () => {
  const regex = buildRegex(optionally('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('`zeroOrMore` does not generate capture when grouping', () => {
  const regex = buildRegex(zeroOrMore('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('base quantifiers optimize grouping for atoms', () => {
  expect(oneOrMore(digit)).toHavePattern('\\d+');
  expect(optionally(digit)).toHavePattern('\\d?');
  expect(zeroOrMore(digit)).toHavePattern('\\d*');

  expect(oneOrMore('a')).toHavePattern('a+');
  expect(optionally('a')).toHavePattern('a?');
  expect(zeroOrMore('a')).toHavePattern('a*');
});
