---
title: Equality
description: Compare two types for equality with Equal, and understand where a type-level equality check stops being exact.
sidebar:
  order: 14
---

Equality is hard to check in TypeScript.
A perfect check is in fact impossible to implement in the language itself —
it would have to come from the compiler as a built-in.
What `type-plus` provides is a check that is exact for the cases you are likely to write,
with one documented limit.

## `Equal`

```ts
type Equal<A, B, $O extends Equal.$Options = {}>
```

🎭 *predicate* — resolves to `true` when `A` and `B` are the same type, otherwise `false`.

It is the type-level counterpart of `===`,
and it handles the special types (`any`, `unknown`, `never`, `void`) correctly
rather than letting them swallow the comparison.

```ts
type R = Equal<1, 1> // true
type R = Equal<any, any> // true
type R = Equal<boolean, boolean> // true
type R = Equal<[1], [1]> // true

type R = Equal<boolean, true> // false
type R = Equal<any, 1> // false
type R = Equal<[any], [1]> // false
type R = Equal<{ a: 1 }, { a: 1; b: 2 }> // false
```

`IsEqual` and `IsNotEqual` are the earlier names for this check and are deprecated since 8.0.0.
Use `Equal` instead.

## Intersections are only flattened one level

An intersection is compared as though it were flattened,
but only at the first level.
The check does not recurse into properties to flatten intersections nested inside them.

```ts
// true — the intersection is at the top level
Equal<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>

// false — the intersection is nested one level down
Equal<{ nested: { a: number; b: string } }, { nested: { a: number } & { b: string } }>
```

This is deliberate.
Flattening intersections recursively would not terminate on a recursive type,
so the check trades exactness in the nested case for one that always halts.
