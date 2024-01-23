[![npm version](https://badge.fury.io/js/ts-regex-builder.svg)](https://badge.fury.io/js/ts-regex-builder)
![Build](https://github.com/callstack/ts-regex-builder/actions/workflows/ci.yml/badge.svg)
![npm bundle size](https://deno.bundlejs.com/badge?q=ts-regex-builder)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Star on GitHub](https://img.shields.io/github/stars/callstack/ts-regex-builder.svg?style=social)](https://github.com/callstack/ts-regex-builder/stargazers)

# TS Regex Builder

Build maintainable regular expressions for TypeScript and JavaScript.

[API docs](./docs/API.md) | [Examples](./docs/Examples.md)

## Goal

Regular expressions are a powerful tool for matching text patterns, yet they are notorious for their hard-to-parse syntax, especially in the case of more complex patterns.

This library allows users to create regular expressions in a structured way, making them easy to write and review. It provides a domain-specific langauge for defining regular expressions, which are finally turned into JavaScript-native `RegExp` objects for fast execution.

```ts
// Regular JS RegExp
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// TS Regex Builder DSL
const hexDigit = charClass(
  charRange('a', 'f'),
  charRange('A', 'F'),
  charRange('0', '9'),
);

const hexColor = buildRegExp([
  startOfString,
  optional('#'),
  capture(
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
  ),
  endOfString,
]);
```

## Installation

```sh
npm install ts-regex-builder
```

or

```sh
yarn add ts-regex-builder
```

## Basic usage

```js
import { buildRegExp, capture, oneOrMore } from 'ts-regex-builder';

// /Hello (\w+)/
const regex = buildRegExp(['Hello ', capture(oneOrMore(word))]);
```

## Regex domain-specific language

TS Regex Builder allows you to build complex regular expressions using domain-specific language.

Terminology:
- regex construct (`RegexConstruct`) - common name for all regex constructs like character classes, quantifiers, and anchors.
- regex element (`RegexElement`) - a fundamental building block of a regular expression, defined as either a regex construct or a string.
- regex sequence (`RegexSequence`) - a sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

Most of the regex constructs accept a regex sequence as their argument.

Examples of sequences:
- single element (construct): `capture('abc')`
- single element (string): `'Hello'`
- array of elements: `['USD', oneOrMore(digit)]`

Regex constructs can be composed into a tree structure:

```ts
const currencyCode = repeat(charRange('A', 'Z'), 3);
const currencyAmount = buildRegExp([
  choiceOf('$', '€', currencyCode), // currency
  capture(
    oneOrMore(digit), // integer part
    optional(['.', repeat(digit, 2)]), // fractional part
  ),
]);
```

See [API document](./docs/API.md).

### Regex Builders

| Builder                                  | Regex Syntax | Description                         |
| ---------------------------------------- | ------------- | ----------------------------------- |
| `buildRegExp(...)`                       | `/.../`       | Create `RegExp` instance            |
| `buildRegExp(..., { ignoreCase: true })` | `/.../i`      | Create `RegExp` instance with flags |

### Regex Constructs

| Construct           | Regex Syntax  | Notes                           |
| ------------------- | ------------- | ------------------------------- |
| `capture(...)`      | `(...)`       | Create a capture group          |
| `choiceOf(x, y, z)` | `x\|y\|z`     | Match one of provided sequences |

### Quantifiers

| Quantifier                       | Regex Syntax  | Description                                       |
| -------------------------------- | ------------- | ------------------------------------------------- |
| `zeroOrMore(x)`                  | `x*`          | Zero or more occurence of a pattern               |
| `oneOrMore(x)`                   | `x+`          | One or more occurence of a pattern                |
| `optional(x)`                    | `x?`          | Zero or one occurence of a pattern                |
| `repeat(x, n)`                   | `x{n}`        | Pattern repeats exact number of times             |
| `repeat(x, { min: n, })`         | `x{n,}`       | Pattern repeats at least given number of times    |
| `repeat(x, { min: n, max: n2 })` | `x{n1,n2}`    | Pattern repeats between n1 and n2 number of times |

### Character classes

| Character class       | Regex Syntax  | Description                                 |
| --------------------- | ------------- | ------------------------------------------- |
| `any`                 | `.`           | Any character                               |
| `word`                | `\w`          | Word characters                             |
| `digit`               | `\d`          | Digit characters                            |
| `whitespace`          | `\s`          | Whitespace characters                       |
| `anyOf('abc')`        | `[abc]`       | Any of supplied characters                  |
| `charRange('a', 'z')` | `[a-z]`       | Range of characters                         |
| `charClass(...)`      | `[...]`       | Concatenation of multiple character classes |
| `inverted(...)`       | `[^...]`      | Negation of a given character class         |

### Anchors

| Anchor          | Regex Syntax  | Description                                                              |
| --------------- | ------------- | ------------------------------------------------------------------------ |
| `startOfString` | `^`           | Match the start of the string (or the start of a line in multiline mode) |
| `endOfString`   | `$`           | Match the end of the string (or the end of a line in multiline mode)     |

## Examples

See [Examples document](./docs/Examples.md).

## Performance

Regular expressions created with this library are executed at runtime, so you should avoid creating them in a context where they would need to be executed multiple times, e.g., inside loops or functions. We recommend that you create a top-level object for each required regex.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
See the [project guidelines](GUIDELINES.md) to understand our core principles.

## License

MIT

## Inspiration

TS Regex Builder is inspired by [Swift Regex Builder API](https://developer.apple.com/documentation/regexbuilder).

## Reference

- [ECMAScript Regular Expression BNF Grammar](https://262.ecma-international.org/7.0/#sec-regular-expressions)
- [Swift Regex Builder API docs](https://developer.apple.com/documentation/regexbuilder)
- [Swift Evolution 351: Regex Builder DSL](https://github.com/apple/swift-evolution/blob/main/proposals/0351-regex-builder.md)


---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
