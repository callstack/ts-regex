"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[256],{1447:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>c,toc:()=>d});var t=s(4848),a=s(8453);const i={id:"examples",title:"Examples"},r=void 0,c={id:"examples",title:"Examples",description:"Match hashtags",source:"@site/docs/Examples.md",sourceDirName:".",slug:"/examples",permalink:"/ts-regex-builder/examples",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"examples",title:"Examples"},sidebar:"docs",previous:{title:"Unicode",permalink:"/ts-regex-builder/api/unicode"}},l={},d=[{value:"Match hashtags",id:"match-hashtags",level:2},{value:"Hex color validation",id:"hex-color-validation",level:2},{value:"URL validation",id:"url-validation",level:2},{value:"Email address validation",id:"email-address-validation",level:2},{value:"JavaScript number validation",id:"javascript-number-validation",level:2},{value:"IPv4 address validation",id:"ipv4-address-validation",level:2},{value:"Mixing with RegExp literals",id:"mixing-with-regexp-literals",level:2},{value:"Simple password validation",id:"simple-password-validation",level:2},{value:"Match currency values",id:"match-currency-values",level:2},{value:"Finding specific whole words",id:"finding-specific-whole-words",level:2},{value:"Finding specific suffixes",id:"finding-specific-suffixes",level:2}];function o(e){const n={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"match-hashtags",children:"Match hashtags"}),"\n",(0,t.jsx)(n.p,{children:"This regex matches and captures all hashtags in a given string."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const hashtags = buildRegExp(['#', capture(oneOrMore(word))], { global: true });\n\nconst hashtagMatches = '#hello #world'.matchAll(hashtags);\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/#(\\w+)/g"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-hashtags.ts",children:"example-hashtags.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"hex-color-validation",children:"Hex color validation"}),"\n",(0,t.jsx)(n.p,{children:"This regex validates whether a given string is a valid hex color, with 6 or 3 hex digits."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const hexDigit = charClass(digit, charRange('a', 'f'));\n\nconst regex = buildRegExp(\n  [\n    startOfString,\n    optional('#'),\n    choiceOf(\n      repeat(hexDigit, 6), // #rrggbb\n      repeat(hexDigit, 3), // #rgb\n    ),\n    endOfString,\n  ],\n  { ignoreCase: true },\n);\n\nconst isValid = regex.test('#ffffff');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^#?(?:[a-f\\d]{6}|[a-f\\d]{3})$/i"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-hex-color.ts",children:"example-hex-color.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"url-validation",children:"URL validation"}),"\n",(0,t.jsx)(n.p,{children:"This regex validates (in a simplified way) whether a given string is a URL."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const protocol = [choiceOf('http', 'https'), '://'];\nconst domainChars = charClass(charRange('a', 'z'), digit);\nconst domainCharsHypen = charClass(domainChars, anyOf('-'));\n\nconst domainSegment = choiceOf(\n  domainChars, // single char\n  [domainChars, zeroOrMore(domainCharsHypen), domainChars], // multi char\n);\n\nconst regex = buildRegExp([\n  startOfString,\n  optional(protocol),\n  oneOrMore([domainSegment, '.']), // domain segment\n  charRange('a', 'z'), // TLD first char\n  oneOrMore(domainChars), // TLD remaining chars\n  endOfString,\n]);\n\nconst isValid = regex.test('https://hello.github.com');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^(?:(?:http|https):\\/\\/)?(?:(?:[a-z\\d]|[a-z\\d][a-z\\d-]*[a-z\\d])\\.)+[a-z][a-z\\d]+$/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-url-simple.ts",children:"example-url-simple.ts"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["For more advanced URL validation check: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-url-advanced.ts",children:"example-url-advanced.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"email-address-validation",children:"Email address validation"}),"\n",(0,t.jsx)(n.p,{children:"This regex validates whether a given string is a properly formatted email address."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-.'));\nconst domainChars = charRange('a', 'z');\n\nconst regex = buildRegExp(\n  [\n    startOfString,\n    oneOrMore(usernameChars),\n    '@',\n    oneOrMore(hostnameChars),\n    '.',\n    repeat(domainChars, { min: 2 }),\n    endOfString,\n  ],\n  { ignoreCase: true },\n);\n\nconst isValid = regex.test('user@example.com');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^[a-z\\d._%+-]+@[a-z\\d.-]+\\.[a-z]{2,}$/i"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-email.ts",children:"example-email.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"javascript-number-validation",children:"JavaScript number validation"}),"\n",(0,t.jsx)(n.p,{children:"This regex validates if a given string is a valid JavaScript number."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const sign = anyOf('+-');\nconst exponent = [anyOf('eE'), optional(sign), oneOrMore(digit)];\n\nconst regex = buildRegExp([\n  startOfString,\n  optional(sing),\n  choiceOf(\n    [oneOrMore(digit), optional(['.', zeroOrMore(digit)])], // leading digit\n    ['.', oneOrMore(digit)], // leading dot\n  ),\n  optional(exponent), // exponent\n  endOfString,\n]);\n\nconst isValid = regex.test('1.0e+27');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?$/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-js-number.ts",children:"example-js-number.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"ipv4-address-validation",children:"IPv4 address validation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// Match integers from 0-255\nconst octet = choiceOf(\n  [digit],\n  [charRange('1', '9'), digit],\n  ['1', repeat(digit, 2)],\n  ['2', charRange('0', '4'), digit],\n  ['25', charRange('0', '5')],\n);\n\n// Match\nconst regex = buildRegExp([\n  startOfString, //\n  repeat([octet, '.'], 3),\n  octet,\n  endOfString,\n]);\n\nconst isValid = regex.test(192.168.0.1\");\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^(?:(?:\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])\\.){3}(?:\\d|[1-9]\\d|1\\d{2}|2[0-4]\\d|25[0-5])$/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-ipv4.ts",children:"example-ipv4.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"mixing-with-regexp-literals",children:"Mixing with RegExp literals"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// Match integers from 0-255\nconst octet = choiceOf(\n  /[0-9]/, // 0-9\n  /[1-9][0-9]/, // 10-99\n  /1[0-9][0-9]/, // 100-199\n  /2[0-4][0-9]/, // 200-249\n  /25[0-5]/, // 250-255\n);\n\n// Match\nconst regex = buildRegExp([\n  startOfString, //\n  repeat([octet, '.'], 3),\n  octet,\n  endOfString,\n]);\n\nconst isValid = regex.test(192.168.0.1\");\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^(?:(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\\.){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-regexp.ts",children:"example-regexp.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"simple-password-validation",children:"Simple password validation"}),"\n",(0,t.jsx)(n.p,{children:"This regex corresponds to following password policy:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"at least one uppercase letter"}),"\n",(0,t.jsx)(n.li,{children:"at least one lowercase letter"}),"\n",(0,t.jsx)(n.li,{children:"at least one digit"}),"\n",(0,t.jsx)(n.li,{children:"at least one special character"}),"\n",(0,t.jsx)(n.li,{children:"at least 8 characters long"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const atLeastOneUppercase = lookahead([zeroOrMore(any), /[A-Z]/]);\nconst atLeastOneLowercase = lookahead([zeroOrMore(any), /[a-z]/]);\nconst atLeastOneDigit = lookahead([zeroOrMore(any), /[0-9]/]);\nconst atLeastOneSpecialChar = lookahead([zeroOrMore(any), /[^A-Za-z0-9\\s]/]);\nconst atLeastEightChars = /.{8,}/;\n\n// Match\nconst validPassword = buildRegExp([\n  startOfString,\n  atLeastOneUppercase,\n  atLeastOneLowercase,\n  atLeastOneDigit,\n  atLeastOneSpecialChar,\n  atLeastEightChars,\n  endOfString,\n]);\n\nconst isValid = regex.test('Aa$123456');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\\s])(?:.{8,})$/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-password.ts",children:"example-password.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"match-currency-values",children:"Match currency values"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const currencySymbol = '$\u20ac\xa3\xa5R\u20bf';\nconst decimalSeparator = '.';\n\nconst firstThousandsClause = repeat(digit, { min: 1, max: 3 });\nconst thousandsSeparator = ',';\nconst thousands = repeat(digit, 3);\nconst thousandsClause = [optional(thousandsSeparator), thousands];\nconst cents = repeat(digit, 2);\nconst isCurrency = lookbehind(anyOf(currencySymbol));\n\nconst currencyRegex = buildRegExp([\n  isCurrency,\n  optional(whitespace),\n  firstThousandsClause,\n  zeroOrMore(thousandsClause),\n  optional([decimalSeparator, cents]),\n  endOfString,\n]);\n\nconst isValid = regex.test('\xa31,000');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/(?<=[$\u20ac\xa3\xa5R\u20bf])\\s?\\d{1,3}(?:,?\\d{3})*(?:\\.\\d{2})?$/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-currency.ts",children:"example-currency.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"finding-specific-whole-words",children:"Finding specific whole words"}),"\n",(0,t.jsx)(n.p,{children:"Ignoring cases where given word is part of a bigger word."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const wordsToFind = ['word', 'date'];\n\nconst regex = buildRegExp([\n  wordBoundary, // match whole words only\n  choiceOf(...wordsToFind),\n  wordBoundary,\n]);\n\nexpect(regex).toMatchString('word');\nexpect(regex).toMatchString('date');\n\nexpect(regex).not.toMatchString('sword');\nexpect(regex).not.toMatchString('update');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/\\b(?:word|date)\\b/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-find-words.ts",children:"example-find-words.ts"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"finding-specific-suffixes",children:"Finding specific suffixes"}),"\n",(0,t.jsx)(n.p,{children:"Ignoring cases where given word is part of a bigger word."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const suffixesToFind = ['acy', 'ism'];\n\nconst regex = buildRegExp([\n  nonWordBoundary, // match suffixes only\n  choiceOf(...suffixesToFind),\n  wordBoundary,\n]);\n\nexpect(regex).toMatchString('privacy ');\nexpect(regex).toMatchString('democracy');\n\nexpect(regex).not.toMatchString('acy');\nexpect(regex).not.toMatchString('ism');\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Encoded regex: ",(0,t.jsx)(n.code,{children:"/\\B(?:acy|ism)\\b/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["See tests: ",(0,t.jsx)(n.a,{href:"https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-find-suffixes.ts",children:"example-find-suffixes.ts"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>c});var t=s(6540);const a={},i=t.createContext(a);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);