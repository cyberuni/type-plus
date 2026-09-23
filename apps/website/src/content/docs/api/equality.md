---
title: Equality
description: Compare two types for equality with IsEqual, and understand where a type-level equality check stops being exact.
sidebar:
  order: 14
---

Equality is hard to check in TypeScript.
A perfect check is in fact impossible to implement in the language itself —
it would have to come from the compiler as a built-in.
What `type-plus` provides is a check that is exact for the cases you are likely to write,
with one documented limit.

## `IsEqual` / `IsNotEqual`

```ts
type IsEqual<A, B, $O extends $StrictOptions<$O, IsEqual.$Options> = {}>
type IsNotEqual<A, B, $O extends $StrictOptions<$O, IsNotEqual.$Options> = {}>
```

🎭 *predicate* — `IsEqual` resolves to `true` when `A` and `B` are the same type, otherwise `false`.
`IsNotEqual` is its inverse, with the same rules.

It is the type-level counterpart of `===`,
and it handles the special types (`any`, `unknown`, `never`, `void`) correctly
rather than letting them swallow the comparison.

```ts
type R = IsEqual<1, 1> // true
type R = IsEqual<any, any> // true
type R = IsEqual<boolean, boolean> // true
type R = IsEqual<[1], [1]> // true

type R = IsEqual<boolean, true> // false
type R = IsEqual<any, 1> // false
type R = IsEqual<[any], [1]> // false
type R = IsEqual<{ a: 1 }, { a: 1; b: 2 }> // false

type R = IsNotEqual<1, 1> // false
type R = IsNotEqual<boolean, true> // true
```

`symbol` gets no special treatment: two distinct `unique symbol`s are not equal, and a
`unique symbol` is not equal to `symbol`. Before 8.0.0, `IsEqual` (then a deprecated alias of the
removed `Equal`) reported both of those as equal.

```ts
declare const s1: unique symbol
declare const s2: unique symbol

type R = IsEqual<typeof s1, typeof s1> // true
type R = IsEqual<typeof s1, typeof s2> // false
type R = IsEqual<typeof s1, symbol> // false
```

`Equal` and the old positional `IsEqual`/`IsNotEqual`/`NotEqual` were removed in 8.0.0; see
[Migrating from Then/Else to $Options](../../guides/migrating-then-else-to-options/).

## Intersections are only flattened one level

An intersection is compared as though it were flattened,
but only at the first level.
The check does not recurse into properties to flatten intersections nested inside them.

```ts
// true — the intersection is at the top level
IsEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>

// false — the intersection is nested one level down
IsEqual<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>
```

This is deliberate.
Flattening intersections recursively would not terminate on a recursive type,
so the check trades exactness in the nested case for one that always halts.
