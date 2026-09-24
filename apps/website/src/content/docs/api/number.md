---
title: Number and Numeric
description: Predicates for number, number literals, integers and sign, plus conversions between numeric literals and strings.
sidebar:
  order: 5
---

The `number` category identifies `number` and number literals. The `numeric` category widens that to
`number | bigint` and adds the value-shape predicates — integer, positive, negative — plus conversions
between numeric literals and strings. Both are exported from the package root, and `number/number_plus.ts`
re-exports the numeric set as well.

All the `Is*` types below accept the standard branching options (`selection`, `distributive`, `$any`,
`$unknown`, `$never`, `$void`, `$then`, `$else`). See
[type branching](/type-plus/api/type-branching/) and [Options](/type-plus/reference/options/).

`exact` is accepted only where it has something to say: on `IsNumber`, `IsInteger`, `IsPositive`,
`IsNegative` and their negations, where it separates the wide `number` and `bigint` types from their
literals. The `*Literal` predicates and `IsNumeric` reject it, because for them it would have nothing
left to separate.

## IsNumber and IsNotNumber

```ts
type IsNumber<T, $O extends $StrictOptions<$O, IsNumber.$Options> = {}>
type IsNotNumber<T, $O extends $StrictOptions<$O, IsNotNumber.$Options> = {}>
```

True for `number` and every number literal. `bigint` is not a `number`.

```ts
type R1 = IsNumber<number> // true
type R2 = IsNumber<1> // true
type R3 = IsNumber<1n> // false
type R4 = IsNumber<string | number> // boolean
```

With `selection: 'filter'` the matching part of the input comes back instead of a boolean:

```ts
type R1 = IsNumber<1, { selection: 'filter' }> // 1
type R2 = IsNumber<string | number, { selection: 'filter' }> // number
type R3 = IsNotNumber<string | 1, { selection: 'filter' }> // string
```

## IsNumberLiteral and IsNotNumberLiteral

```ts
type IsNumberLiteral<T, $O extends $StrictOptions<$O, IsNumberLiteral.$Options> = {}>
type IsNotNumberLiteral<T, $O extends $StrictOptions<$O, IsNotNumberLiteral.$Options> = {}>
```

Separates a literal from the wide `number` type.

```ts
type R1 = IsNumberLiteral<1> // true
type R2 = IsNumberLiteral<number> // false
type R3 = IsNumberLiteral<string | 1> // boolean
type R4 = IsNumberLiteral<string | 1, { distributive: false }> // false
```

These already answer the literal question, so they do not take `exact`; passing it is a compile
error.

## Numeric and Zero

```ts
type Numeric = number | bigint
type Zero = 0 | 0n
```

Two aliases the numeric predicates are built on. `Numeric` is the union the whole category operates over;
`Zero` covers both zero literals.

## IsNumeric and IsNotNumeric

```ts
type IsNumeric<T, $O extends $StrictOptions<$O, IsNumeric.$Options> = {}>
type IsNotNumeric<T, $O extends $StrictOptions<$O, IsNotNumeric.$Options> = {}>
```

`IsNumber` widened to `number | bigint`.

```ts
type R1 = IsNumeric<1> // true
type R2 = IsNumeric<1n> // true
type R3 = IsNumeric<1.1> // true
type R4 = IsNumeric<'1'> // false
```

`IsNumeric` does not take `exact`: `number | bigint` has no single wide form to be exact about.

## IsInteger and IsNotInteger

```ts
type IsInteger<T, $O extends $StrictOptions<$O, IsInteger.$Options> = {}>
type IsNotInteger<T, $O extends $StrictOptions<$O, IsNotInteger.$Options> = {}>
```

Every `bigint` is an integer, so `bigint` itself is one. For `number`, the literal is inspected for a
fractional part. The wide `number` type resolves to `boolean`, because it contains both integers and
non-integers.

```ts
type R1 = IsInteger<0> // true
type R2 = IsInteger<1n> // true
type R3 = IsInteger<bigint> // true
type R4 = IsInteger<1.1> // false
type R5 = IsInteger<number> // boolean
type R6 = IsNotInteger<number> // boolean
```

With `exact: true` only the wide `number` and `bigint` match; every literal answers the `$else`
branch. `bigint` is still an integer and `number` still holds both, so the wide answers do not move:

```ts
type R1 = IsInteger<bigint, { exact: true }> // true
type R2 = IsInteger<number, { exact: true }> // boolean
type R3 = IsInteger<1, { exact: true }> // false
type R4 = IsInteger<1n, { exact: true }> // false
type R5 = IsNotInteger<1, { exact: true }> // true
type R6 = IsNotInteger<bigint, { exact: true }> // false
```

## IsPositive, IsNegative and their negations

```ts
type IsPositive<T, $O extends $StrictOptions<$O, IsPositive.$Options> = {}>
type IsNegative<T, $O extends $StrictOptions<$O, IsNegative.$Options> = {}>
type IsNotPositive<T, $O extends $StrictOptions<$O, IsNotPositive.$Options> = {}>
type IsNotNegative<T, $O extends $StrictOptions<$O, IsNotNegative.$Options> = {}>
```

Sign is read off the literal, so zero is positive and non-negative.

```ts
type R1 = IsPositive<1> // true
type R2 = IsPositive<0> // true
type R3 = IsPositive<-1> // false
type R4 = IsNegative<-1n> // true
type R5 = IsNotNegative<0> // true
```

The wide `number` and `bigint` types resolve to `boolean`, because they stand for the union of all
positive and all negative literals and the check distributes over that union:

```ts
type R1 = IsPositive<number> // boolean
type R2 = IsNegative<bigint> // boolean
```

The special types are not numeric, so `IsPositive` and `IsNegative` reject them and their negations
accept them:

```ts
type R1 = IsNegative<any> // false
type R2 = IsPositive<unknown> // false
type R3 = IsNotNegative<never> // true
type R4 = IsNotPositive<void> // true
```

With `exact: true` only the wide `number` and `bigint` match, so every literal answers the `$else`
branch. The sign of a wide type is unknown, so it stays `boolean`:

```ts
type R1 = IsPositive<number, { exact: true }> // boolean
type R2 = IsPositive<bigint, { exact: true }> // boolean
type R3 = IsPositive<1, { exact: true }> // false
type R4 = IsNegative<-1, { exact: true }> // false
type R5 = IsNotPositive<1, { exact: true }> // true
type R6 = IsNotNegative<-1, { exact: true }> // true
```

## The numeric literal predicates

```ts
type IsPositiveLiteral<T, $O extends $StrictOptions<$O, IsPositiveLiteral.$Options> = {}>
type IsNegativeLiteral<T, $O extends $StrictOptions<$O, IsNegativeLiteral.$Options> = {}>
type IsIntegerLiteral<T, $O extends $StrictOptions<$O, IsIntegerLiteral.$Options> = {}>
type IsNotPositiveLiteral<T, $O extends $StrictOptions<$O, IsNotPositiveLiteral.$Options> = {}>
type IsNotNegativeLiteral<T, $O extends $StrictOptions<$O, IsNotNegativeLiteral.$Options> = {}>
type IsNotIntegerLiteral<T, $O extends $StrictOptions<$O, IsNotIntegerLiteral.$Options> = {}>
```

The other half of the `exact` split: these match only literals, the way `IsNumberLiteral` does for
`IsNumber`. The wide `number` and `bigint` are not literals, so they never match — where
`IsPositive<number>` is `boolean`, `IsPositiveLiteral<number>` is `false`.

```ts
type R1 = IsPositiveLiteral<1> // true
type R2 = IsPositiveLiteral<1n> // true
type R3 = IsPositiveLiteral<-1> // false
type R4 = IsPositiveLiteral<number> // false
type R5 = IsNegativeLiteral<-1.1> // true
type R6 = IsIntegerLiteral<1n> // true
type R7 = IsIntegerLiteral<1.1> // false
type R8 = IsIntegerLiteral<bigint> // false
```

Each `IsNot*Literal` is the negation of its positive form, so everything that is not that kind of
literal passes — the wide types, the non-numeric types and the special types included:

```ts
type R1 = IsNotPositiveLiteral<-1> // true
type R2 = IsNotPositiveLiteral<number> // true
type R3 = IsNotPositiveLiteral<string> // true
type R4 = IsNotPositiveLiteral<1> // false
type R5 = IsNotIntegerLiteral<1.1> // true
type R6 = IsNotIntegerLiteral<1n> // false
```

They do not take `exact`. On strings `exact` excludes template literal types such as `${number}`,
which do not reduce to a single literal; numbers have no equivalent middle case, so the option would
compile and do nothing.

## StringToNumber, StringToNumeric and NumericToString

```ts
type StringToNumber<S extends string, Fail = never>
type StringToNumeric<S extends string, Fail = never>
type NumericToString<N extends number | bigint>
```

Conversions between numeric literal types and their string forms. `StringToNumber` produces a `number`
literal, `StringToNumeric` also recognises the `n` suffix and produces a `bigint`. `Fail` is returned when
the string is not a numeric literal.

```ts
type R1 = StringToNumber<'1'> // 1
type R2 = StringToNumber<'-1'> // -1
type R3 = StringToNumber<'abc'> // never
type R4 = StringToNumber<'abc', 'fail'> // 'fail'

type R5 = StringToNumeric<'1n'> // 1n
type R6 = NumericToString<1.23> // '1.23'
type R7 = NumericToString<-1n> // '-1n'
```

`StringToNumber` also normalises redundant fractional zeroes: `StringToNumber<'1.0'>` is `1` and
`StringToNumber<'-0'>` is `0`.

## Namespaces

`NumericPlus` re-exports the numeric predicates under one name, which is useful when the flat names
collide with your own:

```ts
import type { NumericPlus } from 'type-plus'

type R1 = NumericPlus.IsInteger<1n> // true
type R2 = NumericPlus.IsPositive<-1> // false
```

`NumberPlus` is deprecated. It held the same members as `NumericPlus` plus `IsNumber` and
`IsNotNumber`, which are on the top level: replace `NumberPlus.IsInteger` with `NumericPlus.IsInteger`,
and `NumberPlus.IsNumber` with `IsNumber`.

## Reference

| Type | Description |
| --- | --- |
| `IsNumber` / `IsNotNumber` | `T` is (not) `number` or a number literal |
| `IsNumberLiteral` / `IsNotNumberLiteral` | `T` is (not) a number literal |
| `IsNumeric` / `IsNotNumeric` | `T` is (not) `number \| bigint` |
| `IsInteger` / `IsNotInteger` | `T` is (not) an integer, `bigint` included |
| `IsPositive` / `IsNotPositive` | `T` is (not) a positive numeric type, zero included |
| `IsNegative` / `IsNotNegative` | `T` is (not) a negative numeric type |
| `IsIntegerLiteral` / `IsNotIntegerLiteral` | `T` is (not) an integer literal |
| `IsPositiveLiteral` / `IsNotPositiveLiteral` | `T` is (not) a positive numeric literal, zero included |
| `IsNegativeLiteral` / `IsNotNegativeLiteral` | `T` is (not) a negative numeric literal |
| `Numeric` | `number \| bigint` |
| `Zero` | `0 \| 0n` |
| `StringToNumber<S, Fail>` | string literal to `number` literal |
| `StringToNumeric<S, Fail>` | string literal to `number` or `bigint` literal |
| `NumericToString<N>` | numeric literal to string literal |

For arithmetic on these literals, see [Math and Bigint](/type-plus/api/math/).

Source: [`src/number`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/number) and
[`src/numeric`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/numeric).
