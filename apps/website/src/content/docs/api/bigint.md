---
title: Bigint
description: Identity predicates for bigint and bigint literals, plus the cast from a string literal to a bigint literal.
sidebar:
  order: 6
---

The `bigint` category identifies `bigint` and bigint literals, and casts a string literal to a bigint
literal. The predicates follow the usual [type branching](/type-plus/api/type-branching/) contract, so
each one can act as a boolean check, as a filter, or as a branch selector for your own types.

For arithmetic over `bigint`, see [Math](/type-plus/api/math/). Every math type accepts `number` or `bigint`.

## IsBigint and IsNotBigint

```ts
type IsBigint<T, $O extends $StrictOptions<$O, IsBigint.$Options> = {}>
type IsNotBigint<T, $O extends $StrictOptions<$O, IsNotBigint.$Options> = {}>
```

🎭 *predicate* — is `T` `bigint` or a bigint literal.

```ts
type R1 = IsBigint<bigint> // true
type R2 = IsBigint<1n> // true
type R3 = IsBigint<string | boolean> // false
type R4 = IsBigint<string | bigint> // boolean, distributed
type R5 = IsNotBigint<1n> // false
```

Both support `selection: 'filter'`, `exact: true`, `distributive: false`, and the `$any` / `$unknown` /
`$never` / `$void` branch overrides. See [type branching](/type-plus/api/type-branching/).

```ts
type R6 = IsBigint<1n, { exact: true }> // false — `1n` is not exactly `bigint`
type R7 = IsBigint<1n, { selection: 'filter' }> // 1n
type R8 = IsBigint<string | bigint, { distributive: false }> // false
```

## IsBigintLiteral and IsNotBigintLiteral

```ts
type IsBigintLiteral<T, $O extends $StrictOptions<$O, IsBigintLiteral.$Options> = {}>
type IsNotBigintLiteral<T, $O extends $StrictOptions<$O, IsNotBigintLiteral.$Options> = {}>
```

Narrower than `IsBigint`: only bigint *literals* pass.

```ts
type R1 = IsBigintLiteral<1n> // true
type R2 = IsBigintLiteral<bigint> // false
type R3 = IsNotBigintLiteral<bigint> // true
type R4 = IsNotBigintLiteral<1n | string, { selection: 'filter' }> // string
```

They already answer the literal question, so they do not take `exact`; passing it is a compile error.

## StringToBigint

```ts
type StringToBigint<S extends string, $O extends $StrictOptions<$O, StringToBigint.$Options> = {}>
```

Casts a string literal to a bigint literal when the string is a valid bigint form, which needs the
`n` suffix. `NumericToString` casts the other way and keeps the suffix; see
[the number casts](../number/#stringtonumber-stringtonumeric-and-numerictostring).

```ts
type R1 = StringToBigint<'1n'> // 1n
type R2 = StringToBigint<'-1n'> // -1n
type R3 = StringToBigint<'abc'> // never
```
