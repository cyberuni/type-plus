---
title: Tuple
description: Utilities to build, inspect, and reshape tuple types, including dropping entries and creating fixed-length tuples.
sidebar:
  order: 3
---

The `tuple` category covers types that need a known, fixed length.
Types that work on both tuples and `Array<T>` live in [array](/type-plus/api/array/).

The tuple-only variants are grouped under the `TuplePlus` namespace,
which mirrors the `ArrayPlus` namespace of the array category.

Sources: [`packages/type-plus/src/tuple`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/tuple).

## `IsTuple` / `IsNotTuple`

```ts
type IsTuple<T, $O extends IsTuple.$Options = {}>
type IsNotTuple<T, $O extends IsNotTuple.$Options = {}>
```

Validate that `T` is a tuple, excluding array.

```ts
type R = IsTuple<[]> // true
type R = IsTuple<[1]> // true
type R = IsTuple<number[]> // false
type R = IsTuple<unknown> // false

type R = IsNotTuple<string[]> // true
```

Both accept [type branching](/type-plus/api/type-branching/) options:

```ts
type R = IsTuple<[1], { selection: 'filter' }> // [1]
type R = IsTuple<never, { selection: 'filter' }> // never
type R = IsTuple<[] | 1, { distributive: false }> // false
type R = IsTuple<[], IsTuple.$Branch> // $Then
```

## `CreateTuple` and `ToTuple`

```ts
type CreateTuple<L extends number, T = unknown, Fail = never>
type ToTuple<R extends any[], S extends number[], X = any>
```

`CreateTuple` builds a tuple of `L` elements of type `T`.
A non-integer or negative `L` returns `Fail`, and `number` as `L` returns `T[]`.

```ts
type R = CreateTuple<3> // [unknown, unknown, unknown]
type R = CreateTuple<5, 1> // [1, 1, 1, 1, 1]
type R = CreateTuple<number, 1> // 1[]
type R = CreateTuple<1.2> // never
type R = CreateTuple<1.2, 1, null> // null
```

Lengths up to `9999` are supported. `ToTuple` is the digit-based device `CreateTuple` is built on.

## `Tail`

```ts
type Tail<T extends readonly unknown[]>
```

Gets the types of a tuple except the first entry.

```ts
type R = Tail<[1, 'a', 'b']> // ['a', 'b']
type R = Tail<[]> // never
type R = Tail<string[]> // string[]
type R = Tail<[number, ...string[]]> // string[]
```

Note the difference from `DropFirst`: `Tail<[]>` is `never`, while `DropFirst<[]>` is `[]`.

## `DropFirst` and `DropLast`

```ts
type DropFirst<T extends unknown[], Options extends DropFirst.Options = DropFirst.DefaultOptions<T>>
type DropLast<T extends unknown[], Cases extends DropLast.Options = DropLast.DefaultOptions<T>>
```

```ts
type R = DropFirst<[true, 1, 'x', 3]> // [1, 'x', 3]
type R = DropLast<[true, 1, 'x', 3]> // [true, 1, 'x']

type R = DropFirst<['x']> // []
type R = DropFirst<[]> // []
type R = DropFirst<string[]> // string[]
```

Both take `Options['$array']` for the array case and `Options['caseEmptyTuple']` for the empty tuple case.

## `DropMatch` and friends

```ts
type DropMatch<A extends Readonly<Array<unknown>>, Criteria>
type DropNull<A extends Array<any>>
type DropNullable<A extends Array<any>>
type DropUndefined<A extends Array<any>>
```

`DropMatch` removes the entries matching `Criteria`, dispatching to a tuple or array implementation
depending on whether the length is known.

```ts
type R = DropMatch<[1, undefined, 3], undefined> // [1, 3]
type R = DropMatch<[1, string | undefined, 3], undefined> // [1, string, 3]
type R = DropMatch<Array<string | undefined>, undefined> // string[]

type R = DropUndefined<[1, undefined, 3]> // [1, 3]
type R = DropNullable<[1, null, undefined]> // [1]
```

`TuplePlus.DropMatch` is the tuple-only implementation.

The runtime `drop()` carries the same transformation:

```ts
const r = drop([1, 2, 3, 4] as const, 1) // [2, 3, 4]
```

## `TuplePlus.Filter`

```ts
type TuplePlus.Filter<T extends readonly unknown[], Criteria = true>
```

Keeps the entries matching `Criteria`. It defaults to filtering for `true`.

```ts
type R = TuplePlus.Filter<[1, 2, '3'], number> // [1, 2]
type R = TuplePlus.Filter<[true, false, true]> // [true, true]
type R = TuplePlus.Filter<[]> // []
```

## `TuplePlus.Find`

```ts
type TuplePlus.Find<A, Criteria, Options extends Find.Options = ...>
```

Finds the first type in the tuple matching `Criteria`.

```ts
type R = TuplePlus.Find<[true, 1, 'x', 3], string> // 'x'
type R = TuplePlus.Find<[true, 1, 'x', 3], number> // 1
type R = TuplePlus.Find<[true, 1, 'x'], 2> // never
type R = TuplePlus.Find<[], number, { $emptyTuple: 1 }> // 1
```

It matches widened types by default, so `TuplePlus.Find<[string, number, 1], 1>` is `1 | undefined`.
Set `Options['widen']` to `false`, or `Options['$widen']` to `never`, to disable that.
Passing an array returns a `'does not support array...'` message type;
use `FindFirst` or `ArrayPlus.Find` instead, or override `Options['$array']`.

## `TuplePlus.PadStart`

```ts
type TuplePlus.PadStart<Tuple extends readonly unknown[], MaxLength extends number, PadWith = unknown>
```

```ts
type R = TuplePlus.PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
type R = TuplePlus.PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
type R = TuplePlus.PadStart<[1, 2, 3], 2> // [1, 2, 3]
```

When `MaxLength` is less than the tuple length, the tuple is returned unchanged.

## `CommonPropKeys`

```ts
type CommonPropKeys<T extends Record<KeyTypes, unknown>[], Options extends CommonPropKeys.Options = ...>
```

Gets the property keys common to every element of the tuple.

```ts
type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
type R = CommonPropKeys<[{ a: number; c: 1 }, { b: number; c: 2 }]> // 'c'
type R = CommonPropKeys<[{ a: 1; b: 2 }]> // 'a' | 'b'
type R = CommonPropKeys<never, { $never: 1 }> // 1
```

It dispatches to the array implementation when the length is not known.
`TuplePlus.CommonPropKeys` is the tuple-only version, and `CommonKeys` is a deprecated alias.
