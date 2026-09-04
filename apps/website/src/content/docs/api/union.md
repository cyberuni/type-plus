---
title: Union and Mixed Types
description: Detect and constrain union types, and merge, box, or exclude across arbitrary type combinations.
sidebar:
  order: 7
---

A union type combines multiple types with `|`. A value belongs to a union if it belongs to at least one of its members.

This page covers the `union` utilities, which detect and constrain unions,
and the `mix_types` utilities, which work across arbitrary combinations of types rather than a single category.

## `UnionType`

```ts
type UnionType<T, Then = T, Else = never>
```

🌪️ *filter* — keeps `T` when it is a union, otherwise returns `Else`.

```ts
import type { UnionType } from 'type-plus'

type R = UnionType<'a' | 'b'> // 'a' | 'b'
type R = UnionType<boolean> // boolean
type R = UnionType<number> // never
type R = UnionType<number, 1, 2> // 2
```

`boolean` is a union because it is `true | false`.

## `IsUnion`

```ts
type IsUnion<T, Then = true, Else = false>
```

🎭 *predicate* — the boolean-returning counterpart of `UnionType`.

```ts
import type { IsUnion } from 'type-plus'

type R = IsUnion<'a' | 'b'> // true
type R = IsUnion<boolean> // true
type R = IsUnion<number> // false
```

Both take their branches positionally, so they do not use the [type branching](/type-plus/api/type-branching/) options object.

## `SubUnion`

```ts
type SubUnion<U, T extends U> = T
```

🧰 *type util* — declares a type that must be a subset of the union `U`.
The value of the type is `T` itself; the constraint is the point.

```ts
import type { SubUnion } from 'type-plus'

type Fruit = 'apple' | 'banana' | 'cherry'

type Picked = SubUnion<Fruit, 'apple'> // 'apple'

// @ts-expect-error 'carrot' is not a Fruit
type Bad = SubUnion<Fruit, 'carrot'>
```

Use it instead of `type Picked = 'apple'` when you want the compiler to reject a member that drifts out of the source union.

## `Merge`

```ts
type Merge<A, B>
function merge<A, B>(a: A, b: B): Merge<A, B>
```

⚗️ *transform* — the type-level equivalent of `{ ...a, ...b }`.

Unlike the object-only merge, `A` and `B` are unconstrained: primitives are boxed
(`number` becomes `Number`, and so on) before merging, and the special types are handled explicitly.

```ts
import { merge, type Merge } from 'type-plus'

type R = Merge<{ a: 1 }, { b: 2 }> // { a: 1; b: 2 }

type R = Merge<{ a: 1 }, never> // never
type R = Merge<{ a: 1 }, unknown> // { a: 1 }
type R = Merge<{ a: 1 }, undefined> // { a: 1 }
type R = Merge<{ a: 1 }, void> // { a: 1 } & void

const r = merge({ a: 1 }, {} as { a?: string | undefined }) // { a: number | string }
```

`never` in either position wins and produces `never`. `unknown`, `undefined`, and `null` are treated as "nothing to merge" and the other side is returned.

## `Box`

```ts
type Box<T, Options extends Box.Options = Box.DefaultOptions>
```

⚗️ *transform* — converts a primitive type to its boxed object type.

```ts
import type { Box } from 'type-plus'

type R = Box<number> // Number
type R = Box<string> // String
type R = Box<'abc'> // String
type R = Box<() => void> // Function
type R = Box<object> // Object

type R = Box<undefined> // never
type R = Box<undefined, { $notBoxable: 'nope' }> // 'nope'
```

`$notBoxable` sets what is returned when `T` has no boxed form. It defaults to `never`.

## `Exclude`

```ts
type Exclude<T, U, R = never>
```

🌪️ *filter* — a drop-in replacement for the built-in `Exclude<T, U>` that can also replace the removed members with `R`.

```ts
import type { Exclude } from 'type-plus'

type R = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type R = Exclude<'a' | 'b' | 'c', 'a', 'd'> // 'b' | 'c' | 'd'

type R = Exclude<undefined | 1, undefined, 2> // 1 | 2
```

Importing this shadows the global `Exclude` in that file, which is intentional — the two-argument form behaves identically.

## `IsAnyOrNever`

```ts
type IsAnyOrNever<T, $O extends $Selection.Options = $Selection.Predicate>
```

🎭 *predicate* 🩳 *shortcut* — validates that `T` is exactly `any` or exactly `never`.
These two are the cases most type utilities have to special-case first, so this bundles both checks.

```ts
import type { IsAnyOrNever } from 'type-plus'

type R = IsAnyOrNever<any> // true
type R = IsAnyOrNever<never> // true

type R = IsAnyOrNever<unknown> // false
type R = IsAnyOrNever<void> // false
type R = IsAnyOrNever<1> // false
```

It accepts the full [type branching](/type-plus/api/type-branching/) options, so `{ selection: 'filter' }`,
`$then`/`$else`, and the branch selectors all work as usual.

## Source

- [`src/union`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/union)
- [`src/mix_types`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/mix_types)
