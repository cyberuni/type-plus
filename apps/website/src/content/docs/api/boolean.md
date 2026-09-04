---
title: Boolean and Logical
description: Predicates for boolean, true and false, and the type-level And, Or, Not and Xor operators.
sidebar:
  order: 6
---

`boolean` is a primitive union: it is exactly `true | false`. That makes it the type where distribution and
branching options matter most, so the `boolean` category identifies each of the three types separately.
The `logical` category then operates on boolean results with `And`, `Or`, `Not` and `Xor`.

## The branching options pattern

Every predicate here follows the same shape, and `IsBoolean` is the canonical example:

```ts
type IsBoolean<T, $O extends IsBoolean.$Options = {}>

namespace IsBoolean {
  type $Options = $Selection.Options &
    $Distributive.Options &
    $Exact.Options &
    $InputOptions<$Any | $Unknown | $Never | $Void>
  type $Branch<$O extends $Options = {}>
  type $<T, $O extends $UtilOptions>
}
```

Three parts are worth knowing:

- **`$Options`** is what you may pass as the second type argument. `$Selection.Options` gives you
  `selection: 'predicate' | 'filter'` plus the `$then`/`$else` branches; `$Distributive.Options` gives
  `distributive`; `$InputOptions` gives `$any`, `$unknown`, `$never` and `$void` for the special types.
- **`$Branch`** replaces the branch results with unique selectors, so a caller can tell exactly which
  branch was taken. See [type branching](/type-plus/api/type-branching/).
- **`$<T, $O>`** is the internal type util. It skips the special-type handling and is meant for building
  your own types on top, not for everyday use.

```ts
type R1 = IsBoolean<boolean> // true
type R2 = IsBoolean<boolean, { selection: 'filter' }> // boolean
type R3 = IsBoolean<boolean, { $then: 'yes', $else: 'no' }> // 'yes'
type R4 = IsBoolean<any, { $any: 'any' }> // 'any'
type R5 = IsBoolean<boolean, IsBoolean.$Branch> // $Then
```

## IsBoolean and IsNotBoolean

```ts
type IsBoolean<T, $O extends IsBoolean.$Options = {}>
type IsNotBoolean<T, $O extends IsNotBoolean.$Options = {}>
```

True for `boolean`, `true` and `false` alike.

```ts
type R1 = IsBoolean<boolean> // true
type R2 = IsBoolean<true> // true
type R3 = IsBoolean<false> // true
type R4 = IsBoolean<number> // false
type R5 = IsBoolean<string | boolean> // boolean
```

Filtering keeps the boolean part of a union, and disabling distribution evaluates the union as a whole:

```ts
type R1 = IsBoolean<string | boolean, { selection: 'filter' }> // boolean
type R2 = IsNotBoolean<string | boolean, { selection: 'filter' }> // string
type R3 = IsBoolean<boolean | 1> // boolean
type R4 = IsBoolean<boolean | 1, { distributive: false }> // false
```

## IsTrue, IsFalse and their negations

```ts
type IsTrue<T, $O extends IsTrue.$Options = {}>
type IsFalse<T, $O extends IsFalse.$Options = {}>
type IsNotTrue<T, $O extends IsNotTrue.$Options = {}>
type IsNotFalse<T, $O extends IsNotFalse.$Options = {}>
```

These check the exact literal. Because `boolean` is `true | false` and the check distributes, feeding it
`boolean` takes both branches and yields `boolean`:

```ts
type R1 = IsTrue<true> // true
type R2 = IsTrue<false> // false
type R3 = IsTrue<boolean> // boolean
type R4 = IsTrue<number> // false

type R5 = IsFalse<false> // true
type R6 = IsNotTrue<false> // true
type R7 = IsNotFalse<true> // true
```

Filtering narrows a union down to the literal you asked for:

```ts
type R1 = IsTrue<boolean, { selection: 'filter' }> // true
type R2 = IsTrue<string | boolean, { selection: 'filter' }> // true
type R3 = IsNotTrue<string | boolean, { selection: 'filter' }> // string | false
```

With `$Branch`, `boolean` reports both branches, which is how you detect the ambiguous case:

```ts
type R1 = IsTrue<true, IsTrue.$Branch> // $Then
type R2 = IsTrue<boolean, IsTrue.$Branch> // $Then | $Else
type R3 = IsTrue<string, IsTrue.$Branch> // $Else
```

## And, Or, Not and Xor

```ts
type And<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}>
type Or<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}>
type Not<X extends boolean, $O extends $Selection.$BaseOptions = {}>
type Xor<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}>
```

The logic operators. Inputs are constrained to `boolean`, so they compose directly with the predicates
above.

```ts
type R1 = And<true, true> // true
type R2 = And<true, false> // false

type R3 = Or<true, false> // true
type R4 = Or<false, false> // false

type R5 = Not<true> // false
type R6 = Not<false> // true

type R7 = Xor<true, false> // true
type R8 = Xor<true, true> // false
```

They take `$Selection.$BaseOptions`, the `$then`/`$else` half of the selection options, so a result can be
mapped straight to your own values:

```ts
type R = And<IsString<'a'>, IsNumber<1>, { $then: 'both', $else: 'not both' }> // 'both'
```

Note that `Xor` only forwards `$O` when `A` is `false`; when `A` is `true` it delegates to `Not<B>` with
the default branches.

## Reference

| Type | Description |
| --- | --- |
| `IsBoolean` / `IsNotBoolean` | `T` is (not) `boolean`, `true` or `false` |
| `IsTrue` / `IsNotTrue` | `T` is (not) exactly `true` |
| `IsFalse` / `IsNotFalse` | `T` is (not) exactly `false` |
| `And<A, B, $O>` | logical and |
| `Or<A, B, $O>` | logical or |
| `Not<X, $O>` | logical not |
| `Xor<A, B, $O>` | logical exclusive or |

See [Options](/type-plus/reference/options/) for `selection`, `distributive` and `exact`.

Source: [`src/boolean`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/boolean) and
[`src/logical`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/logical).
