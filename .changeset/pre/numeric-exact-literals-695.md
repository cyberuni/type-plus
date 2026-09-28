---
'type-plus': major
---

Honor `exact` on the numeric sign and integer predicates, and add the literal variants.

`IsPositive`, `IsNegative`, `IsInteger`, `IsNotPositive`, `IsNotNegative` and `IsNotInteger`
declared `exact` and never read it. The option compiled and did nothing. It now follows the string
family, where `exact` separates the wide type from its literals: with `exact: true` only the wide
`number` and `bigint` match, and every literal answers the `$else` branch. The sign of a wide type
is unknown, so it stays `boolean`.

```ts
type R = IsPositive<number, { exact: true }> // boolean
type R = IsPositive<1, { exact: true }> // was true, now false
type R = IsInteger<bigint, { exact: true }> // true
type R = IsNotInteger<1, { exact: true }> // was false, now true
```

The other half of the split is new: `IsPositiveLiteral`, `IsNegativeLiteral`, `IsIntegerLiteral`,
`IsNotPositiveLiteral`, `IsNotNegativeLiteral` and `IsNotIntegerLiteral` match only literals, the
way `IsNumberLiteral` does for `IsNumber`.

```ts
type R = IsPositiveLiteral<1> // true
type R = IsPositiveLiteral<1n> // true
type R = IsPositiveLiteral<-1> // false
type R = IsPositiveLiteral<number> // false
type R = IsIntegerLiteral<1.1> // false
```

They do not take `exact`. On strings `exact` excludes template literal types such as `${number}`;
numbers have no equivalent middle case — a numeric enum member and a literal intersected with a
record are both literals either way — so the option would compile and do nothing.

For the same reason `exact` is **removed** from `IsNumberLiteral`, `IsNotNumberLiteral`,
`IsBigintLiteral`, `IsNotBigintLiteral` and `IsNumeric`, none of which ever read it.

**Breaking** for code that:

- passes `{ exact: true }` to `IsPositive`, `IsNegative`, `IsInteger`, `IsNotPositive`,
  `IsNotNegative` or `IsNotInteger` — the option used to be ignored and now changes the answer.
  Drop it to keep the old result, or reach for the matching `*Literal` type;
- passes `exact` to `IsNumberLiteral`, `IsNotNumberLiteral`, `IsBigintLiteral`,
  `IsNotBigintLiteral` or `IsNumeric` — with `$StrictOptions` that is now a compile error. Drop it;
  the result is unchanged.

Calls that pass no `exact` answer exactly as before.

Closes [#695](https://github.com/cyberuni/type-plus/issues/695).
