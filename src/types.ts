export type RegexComponent = string | RegexQuantifier;

export type RegexQuantifier = One | OneOrMore | Optionally;

// Quantifiers
export type OneOrMore = {
  type: 'oneOrMore';
  children: RegexComponent[];
};

export type Optionally = {
  type: 'optionally';
  children: RegexComponent[];
};

export type One = {
  type: 'one';
  children: RegexComponent[];
};
