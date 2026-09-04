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

All the `Is*` types below accept the standard branching options
(`selection`, `distributive`, `exact`, `$any`, `$unknown`, `$never`, `$void`, `$then`, `$else`). See
[type branching](/type-plus/api/type-branching/) and [Options](/type-plus/reference/options/).

## IsNumber and IsNotNumber

```ts
type IsNumber<T, $O extends IsNumber.$Options = {}>
type IsNotNumber<T, $O extends IsNotNumber.$Options = {}>
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
type IsNumberLiteral<T, $O extends IsNumberLiteral.$Options = {}>
type IsNotNumberLiteral<T, $O extends IsNotNumberLiteral.$Options = {}>
```

Separates a literal from the wide `number` type.

```ts
type R1 = IsNumberLiteral<1> // true
type R2 = IsNumberLiteral<number> // false
type R3 = IsNumberLiteral<string | 1> // boolean
type R4 = IsNumberLiteral<string | 1, { distributive: false }> // false
```

## Numeric and Zero

```ts
type Numeric = number | bigint
type Zero = 0 | 0n
```

Two aliases the numeric predicates are built on. `Numeric` is the union the whole category operates over;
`Zero` covers both zero literals.

## IsNumeric and IsNotNumeric

```ts
type IsNumeric<T, $O extends IsNumeric.$Options = {}>
type IsNotNumeric<T, $O extends IsNotNumeric.$Options = {}>
```

`IsNumber` widened to `number | bigint`.

```ts
type R1 = IsNumeric<1> // true
type R2 = IsNumeric<1n> // true
type R3 = IsNumeric<1.1> // true
type R4 = IsNumeric<'1'> // false
```

## IsInteger and IsNotInteger

```ts
type IsInteger<T, $O extends IsInteger.$Options = {}>
type IsNotInteger<T, $O extends IsNotInteger.$Options = {}>
```

Every `bigint` is an integer. For `number`, the literal is inspected for a fractional part. The wide
`number` type is not an integer, because it contains non-integers.

```ts
type R1 = IsInteger<0> // true
type R2 = IsInteger<1n> // true
type R3 = IsInteger<1.1> // false
type R4 = IsNotInteger<number> // true
```

## IsPositive, IsNegative and their negations

```ts
type IsPositive<T, $O extends IsPositive.$Options = {}>
type IsNegative<T, $O extends IsNegative.$Options = {}>
type IsNotPositive<T, $O extends IsNotPositive.$Options = {}>
type IsNotNegative<T, $O extends IsNotNegative.$Options = {}>
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
type R3 = IsPositive<any> // boolean
```

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

`NumberPlus` and `NumericPlus` re-export the predicates of their category under one name, which is useful
when the flat names collide with your own:

```ts
import type { NumberPlus, NumericPlus } from 'type-plus'

type R1 = NumberPlus.IsNumber<1> // true
type R2 = NumericPlus.IsInteger<1n> // true
```

## Reference

| Type | Description |
| --- | --- |
| `IsNumber` / `IsNotNumber` | `T` is (not) `number` or a number literal |
| `IsNumberLiteral` / `IsNotNumberLiteral` | `T` is (not) a number literal |
| `IsNumeric` / `IsNotNumeric` | `T` is (not) `number \| bigint` |
| `IsInteger` / `IsNotInteger` | `T` is (not) an integer, `bigint` included |
| `IsPositive` / `IsNotPositive` | `T` is (not) a positive numeric literal, zero included |
| `IsNegative` / `IsNotNegative` | `T` is (not) a negative numeric literal |
| `Numeric` | `number \| bigint` |
| `Zero` | `0 \| 0n` |
| `StringToNumber<S, Fail>` | string literal to `number` literal |
| `StringToNumeric<S, Fail>` | string literal to `number` or `bigint` literal |
| `NumericToString<N>` | numeric literal to string literal |

For arithmetic on these literals, see [Math and Bigint](/type-plus/api/math/).

Source: [`src/number`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/number) and
[`src/numeric`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/numeric).
