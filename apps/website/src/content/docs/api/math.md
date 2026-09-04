---
title: Math and Bigint
description: Type-level arithmetic over number and bigint literals, plus the bigint identity utilities.
sidebar:
  order: 12
---

The `math` category performs arithmetic in the type system. Every operation accepts `number` or `bigint`,
supports negative and floating point values, and coerces between `number` and `bigint` when a result
cannot be represented in the input's type.

The `bigint` category holds the identity and cast utilities for `bigint` itself.

## The `Fail` parameter

Every math type takes a third type parameter, `Fail`, defaulting to `never`:

```ts
type Add<A extends number | bigint, B extends number | bigint, Fail = never>
```

`Fail` is returned when the operation cannot be computed — most commonly when an input is the wide
`number` or `bigint` type instead of a literal. Supply your own value to distinguish a failure from a
legitimate `never` result.

```ts
type R1 = Add<1, 2> // 3
type R2 = Add<number, 2> // never
type R3 = Add<number, 2, 'fail'> // 'fail'
```

Internally the operands are converted into a `NumericStruct` — a sign, digit tuple and exponent, similar
to a floating point representation — operated on, then converted back. That machinery lives in
`numeric_struct.ts` and is not part of the public API.

## Add and Increment

```ts
type Add<A extends number | bigint, B extends number | bigint, Fail = never>
type Increment<N extends number | bigint> // Add<N, 1>
```

```ts
type R1 = Add<1, 2> // 3
type R2 = Add<1.2, -2> // -0.8
type R3 = Add<1n, 2.3> // 3.3, coerced to number
type R4 = Add<9007199254740992, 1> // 9007199254740993n, coerced to bigint
type R5 = Increment<41> // 42
```

## Subtract and Decrement

```ts
type Subtract<A extends number | bigint, B extends number | bigint, Fail = never>
type Decrement<N extends number | bigint> // Subtract<N, 1>
```

```ts
type R1 = Subtract<100, 2> // 98
type R2 = Subtract<1.2, 2> // -0.8
type R3 = Subtract<1n, 2.3> // -1.3, coerced to number
type R4 = Decrement<1> // 0
```

## Multiply

```ts
type Multiply<A extends number | bigint, B extends number | bigint, Fail = never>
```

```ts
type R1 = Multiply<100, 2> // 200
type R2 = Multiply<1.2, 2> // 2.4
type R3 = Multiply<1n, 2.3> // 2.3, coerced to number
```

## GreaterThan and Max

```ts
type GreaterThan<A extends number | bigint, B extends number | bigint, Fail = never>
type Max<A extends number | bigint, B extends number | bigint, Fail = never>
```

`GreaterThan` performs `A > B`. `Max` returns whichever of `A` or `B` is larger.

```ts
type R1 = GreaterThan<100, 2> // true
type R2 = GreaterThan<1.2, 2> // false
type R3 = Max<-1, 2> // 2
type R4 = Max<1.2, 2> // 2
```

## Abs

```ts
type Abs<N extends number | bigint, Fail = never>
```

The absolute value of `N`. Returns `Fail` for the wide `number` and `bigint` types.

```ts
type R1 = Abs<-5> // 5
type R2 = Abs<5> // 5
type R3 = Abs<-1n> // 1n
type R4 = Abs<number> // never
```

## MathPlus.ToNegative

```ts
type ToNegative<N extends number | bigint>
```

`ToNegative` is exported only through the `MathPlus` namespace. It converts `N` to negative, and returns
`N` unchanged if it is already negative or zero.

```ts
import type { MathPlus } from 'type-plus'

type R1 = MathPlus.ToNegative<5> // -5
type R2 = MathPlus.ToNegative<0> // 0
type R3 = MathPlus.ToNegative<-5> // -5
```

`MathPlus` also re-exports `Add`, `Increment`, `Subtract`, `Decrement` and `Multiply`, so
`MathPlus.Add<1, 2>` and `Add<1, 2>` are the same type.

## IsBigint and IsNotBigint

```ts
type IsBigint<T, $O extends IsBigint.$Options = {}>
type IsNotBigint<T, $O extends IsNotBigint.$Options = {}>
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
type IsBigintLiteral<T, $O extends IsBigintLiteral.$Options = {}>
type IsNotBigintLiteral<T, $O extends IsNotBigintLiteral.$Options = {}>
```

Narrower than `IsBigint`: only bigint *literals* pass.

```ts
type R1 = IsBigintLiteral<1n> // true
type R2 = IsBigintLiteral<bigint> // false
type R3 = IsNotBigintLiteral<bigint> // true
type R4 = IsNotBigintLiteral<1n | string, { selection: 'filter' }> // string
```

## StringToBigint

```ts
type StringToBigint<S extends string, Fail = never>
```

Casts a string literal to a bigint literal when the string is a valid bigint form.

```ts
type R1 = StringToBigint<'1n'> // 1n
type R2 = StringToBigint<'-1n'> // -1n
type R3 = StringToBigint<'abc'> // never
```
