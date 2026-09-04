---
title: Array
description: Utilities to inspect and transform array and tuple types, including indexing, filtering, and padding.
sidebar:
  order: 2
---

The `array` category covers types that work on `Array<T>` and, in most cases, on tuples too.
Types that only make sense on a fixed-length tuple live in [tuple](/type-plus/api/tuple/).

Many of these types are also exported under the `ArrayPlus` namespace,
which holds the array-specific variant when a tuple-specific one also exists.

Sources: [`packages/type-plus/src/array`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/array).

## `IsArray` / `IsNotArray`

```ts
type IsArray<T, $O extends IsArray.$Options = {}>
type IsNotArray<T, $O extends IsNotArray.$Options = {}>
```

```ts
type R = IsArray<number[]> // true
type R = IsArray<[1]> // true
type R = IsArray<number> // false

type R = IsNotArray<number> // true
```

Both accept [type branching](/type-plus/api/type-branching/) options,
plus `exact` to exclude tuples from the check:

```ts
type R = IsArray<number[], { selection: 'filter' }> // number[]
type R = IsArray<number, { selection: 'filter' }> // never
type R = IsArray<number[] | 1, { distributive: false }> // false
```

## `Head` and `Last`

```ts
type Head<T extends readonly unknown[], Options extends Head.Options = Head.DefaultOptions>
type Last<T extends readonly unknown[], Options extends Last.Options = Last.DefaultOptions>
```

```ts
type R = Head<[1, 2, 3]> // 1
type R = Last<[1, 2, 3]> // 3
type R = Head<string[]> // string
type R = Last<[]> // never
```

Both take `Options['$never']` and `Options['caseEmptyTuple']` to override the `never` and `[]` cases.

## `At` and `IndexAt`

```ts
type At<A extends readonly unknown[], N extends number, Fail = never>
type IndexAt<A extends readonly unknown[], N extends number, Fail = never, Upper = A['length'], Lower = 0>
type IsIndexOutOfBound<A extends readonly unknown[], N extends number, Then = true, Else = false>
```

`At` reads the element type at index `N`, and like `Array.at()` supports negative numbers.
`IndexAt` normalizes the index itself.

```ts
type R = At<[1, 2, 3], 2> // 3
type R = At<[1, 2, 3], -1> // 3

type R = IndexAt<['a', 'b', 'c'], -2> // 1
type R = IndexAt<['a', 'b', 'c'], 3> // never

type R = IsIndexOutOfBound<[1], 1> // true
```

## `Filter` / `KeepMatch` and `DropMatch`

```ts
type Filter<A extends readonly unknown[], Criteria>
type KeepMatch<A extends readonly unknown[], Criteria> // alias of Filter
type ArrayPlus.DropMatch<A extends Readonly<unknown[]>, Criteria>
```

`Filter` keeps the entries satisfying `Criteria`. `DropMatch` removes them.

```ts
type R = Filter<[1, 2, '3'], number> // [1, 2]
type R = Filter<Array<string | undefined>, string> // string[]

type R = ArrayPlus.DropMatch<Array<string | undefined>, undefined> // string[]
type R = ArrayPlus.DropMatch<Array<string>, string> // never[]
```

`ArrayPlus.Filter` is the array-only variant, with `Options['$never']` and `Options['$notArray']`.

## Finding

```ts
type FindFirst<A, Criteria, Options extends FindFirst.Options = ...>
type First<A extends any[], Criteria> // alias of FindFirst
type FindLast<A extends readonly unknown[], Criteria>
type ArrayPlus.Find<A, Criteria, Options extends Find.Options = ...>
type Some<A extends readonly unknown[], Criteria, Mode extends 'strict' | 'loose' = 'loose', Then = true, Else = false>
```

```ts
type R = FindFirst<[true, 1, 'x', 3], string> // 'x'
type R = FindLast<[true, 123, 'x', 321], number> // 321
type R = FindFirst<Array<string>, string> // string
type R = FindFirst<[true, 1, 'x'], 2> // never

type R = Some<['a', true], boolean> // true
type R = Some<['a', true], boolean, 'strict'> // false
```

`FindFirst` and `ArrayPlus.Find` match widened types by default:
`FindFirst<Array<number>, 1>` is `1 | undefined`.
Set `Options['widen']` to `false`, or `Options['$widen']` to `never`, for a purely type-centric result.
`ElementMatch<T, Criteria, Options>` is the single-element matcher these are built on.

## `Reverse`, `Concat`, `PadStart`, `SplitAt`

```ts
type Reverse<A extends unknown[]>
type Concat<A extends Readonly<unknown[]>, B extends Readonly<unknown[]>>
type PadStart<A extends readonly unknown[], MaxLength extends number, PadWith = unknown>
type ArrayPlus.SplitAt<A, Index extends number, DeleteCount extends number = never, Insert extends readonly unknown[] = never>
```

```ts
type R = Reverse<[1, 2, 3]> // [3, 2, 1]
type R = Concat<[1], [2, 3]> // [1, 2, 3]

type R = PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
type R = PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
type R = PadStart<number[], 1, string> // [string, ...number[]]

type R = ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
type R = ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']> // [[1, 2, 'a', 'b', 5], [3, 4]]
```

`SplitAt` accepts negative indexes and clamps an out-of-bound index to the boundary.
`PadLeft` is a deprecated alias of `PadStart`.

## Values and properties of elements

```ts
type UnionOfValues<A extends readonly unknown[]>
type UnionOfProps<A extends readonly Record<any, any>[], P extends KeyTypes>
type IntersectOfProps<A extends readonly Record<any, unknown>[], P extends KeyTypes>
type ArrayPlus.CommonPropKeys<A extends readonly Record<KeyTypes, unknown>[], Options = ...>
```

```ts
type R = UnionOfValues<[1, 2, 3]> // 1 | 2 | 3
type R = UnionOfProps<[{ a: 1 }, { a: 2 }], 'a'> // 1 | 2
type R = IntersectOfProps<[{ a: { x: 1 } }, { a: { y: 2 } }], 'a'> // { x: 1 } & { y: 2 }
type R = ArrayPlus.CommonPropKeys<Array<{ a: 1; b: 1 } | { a: 1; c: 1 }>> // 'a'
```

`ArrayValue`, `PropUnion` and `MapToProp` are older names for `UnionOfValues`, `UnionOfProps` and `IntersectOfProps`.

## `Entries` and `IsReadonly`

```ts
type ArrayPlus.Entries<A extends readonly unknown[]>
type ArrayPlus.IsReadonly<A, $Options extends IsReadonly.Options = IsReadonly.DefaultOptions>
```

```ts
type R = ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
type R = ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>

type R = ArrayPlus.IsReadonly<readonly [1, 2]> // true
type R = ArrayPlus.IsReadonly<[1, 2]> // false
```

`IsReadonly` takes `$then`, `$else`, `$never` and `$notArray` branches.

## Loose array types

```ts
type LooseArrayType<T, Then = T, Else = never>
type IsLooseArray<T, Then = true, Else = false>
type NotLooseArrayType<T, Then = T, Else = never>
type IsNotLooseArray<T, Then = true, Else = false>
```

These do a loose check, so an intersection or union that contains an array still matches.

```ts
type R = LooseArrayType<number[] | 1> // number[]
type R = IsLooseArray<[1]> // true
type R = IsLooseArray<number> // false
```

## Runtime functions

| Function | Description |
| --- | --- |
| `literalArray(...entries)` | Returns an array whose items are restricted to the provided literals. |
| `reduceWhile(predicate, callbackfn, initialValue, array)` | `reduce()` with a predicate for early termination. |
