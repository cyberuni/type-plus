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
type IsArray<T, $O extends $StrictOptions<$O, IsArray.$Options> = {}>
type IsNotArray<T, $O extends $StrictOptions<$O, IsNotArray.$Options> = {}>
```

```ts
type R = IsArray<number[]> // true
type R = IsArray<[1]> // true
type R = IsArray<number> // false

type R = IsNotArray<number> // true
```

The check is loose: a tuple is an array, the same way a string literal is a `string`.
Pass `exact` to narrow the check to `Array<T>` only:

```ts
type R = IsArray<[1], { exact: true }> // false
type R = IsArray<number[], { exact: true }> // true
```

Both accept [type branching](/type-plus/api/type-branching/) options:

```ts
type R = IsArray<number[], { selection: 'filter' }> // number[]
type R = IsArray<number, { selection: 'filter' }> // never
type R = IsArray<number[] | 1, { distributive: false }> // false
```

## `Head` and `Last`

```ts
type Head<T extends readonly unknown[], $O extends $StrictOptions<$O, Head.$Options> = {}>
type Last<T extends readonly unknown[], $O extends $StrictOptions<$O, Last.$Options> = {}>
```

```ts
type R = Head<[1, 2, 3]> // 1
type R = Last<[1, 2, 3]> // 3
type R = Head<string[]> // string
type R = Last<[]> // never
```

Both take `$O['$never']` and `$O['$emptyTuple']` to override the `never` and `[]` cases.

## `At` and `IndexAt`

```ts
type At<A extends readonly unknown[], N extends number, $O extends $StrictOptions<$O, At.$Options> = {}>
type IndexAt<A extends readonly unknown[], N extends number, $O extends $StrictOptions<$O, IndexAt.$Options> = {}>
type IsIndexOutOfBound<A extends readonly unknown[], N extends number, $O extends $StrictOptions<$O, IsIndexOutOfBound.$Options> = {}>
```

`At` reads the element type at index `N`, and like `Array.at()` supports negative numbers.
`IndexAt` normalizes the index itself.

```ts
type R = At<[1, 2, 3], 2> // 3
type R = At<[1, 2, 3], -1> // 3

type R = IndexAt<['a', 'b', 'c'], -2> // 1
type R = IndexAt<['a', 'b', 'c'], 3> // 3 (upper bound)

type R = IsIndexOutOfBound<[1], 1> // true
type R = IsIndexOutOfBound<[1], 1, { selection: 'filter' }> // 1
type R = IsIndexOutOfBound<[1], 0, { $then: 'yes'; $else: 'no' }> // 'no'
```

`IsIndexOutOfBound` accepts the full [type branching](/type-plus/api/type-branching/) options.
Before 8.0.0 it took `Then` and `Else` positionally; move them into `{ $then, $else }`.

`IndexAt` takes an options object to override each case it can land on:
`$O['$never']` when `A` is `never` (default `never`),
`$O['$array']` when `A` is an array rather than a tuple (default `N`),
`$O['$emptyTuple']` when `A` is `[]` (default `never`),
`$O['$upperBound']` when `N` is past the upper bound (default `A['length']`),
and `$O['$lowerBound']` when `N` is past the lower bound (default `0`).

```ts
type R = IndexAt<never, 0, { $never: 'n' }> // 'n'
type R = IndexAt<string[], 0, { $array: 'a' }> // 'a'
type R = IndexAt<[], 0, { $emptyTuple: 'e' }> // 'e'
type R = IndexAt<[1], 1, { $upperBound: 'u' }> // 'u'
type R = IndexAt<[1], -2, { $lowerBound: 'l' }> // 'l'
```

Before v8 these cases were positional type parameters
(`IndexAt<A, N, Fail, Upper, Lower>`); move them into the options object under
`$emptyTuple`, `$upperBound` and `$lowerBound`.

## `Filter` and `DropMatch`

🗑️ **removed in 8.0.0**: `KeepMatch` — use `Filter` instead.

```ts
type Filter<A extends readonly unknown[], Criteria>
type ArrayPlus.DropMatch<A extends Readonly<unknown[]>, Criteria>
```

`Filter` keeps the entries satisfying `Criteria`. `DropMatch` removes them.

```ts
type R = Filter<[1, 2, '3'], number> // [1, 2]
type R = Filter<Array<string | undefined>, string> // string[]

type R = ArrayPlus.DropMatch<Array<string | undefined>, undefined> // string[]
type R = ArrayPlus.DropMatch<Array<string>, string> // never[]
```

`DropMatch` also takes a [type function](/type-plus/guides/type-functions/) such as `IsObject.$Fn`,
and drops the element types it returns `true` for.
`Filter` takes one only for a tuple.

```ts
type R = ArrayPlus.DropMatch<Array<string | { a: 1 }>, IsObject.$Fn> // string[]
```

`ArrayPlus.Filter` is the array-only variant, with `$O['$never']` and `$O['$notArray']`.
It does not take a type function.

## Finding

```ts
type FindFirst<A, Criteria, $O extends $StrictOptions<$O, FindFirst.$Options> = {}>
type FindLast<A extends readonly unknown[], Criteria>
type ArrayPlus.Find<A, Criteria, $O extends $StrictOptions<$O, Find.$Options> = {}>
type Some<A extends readonly unknown[], Criteria, $O extends $StrictOptions<$O, Some.$Options> = {}>
```

```ts
type R = FindFirst<[true, 1, 'x', 3], string> // 'x'
type R = FindLast<[true, 123, 'x', 321], number> // 321
type R = FindFirst<Array<string>, string> // string
type R = FindFirst<[true, 1, 'x'], 2> // never

type R = Some<['a', true], boolean> // true
type R = Some<['a', true], boolean, { mode: 'strict' }> // false
```

`FindFirst` and `ArrayPlus.Find` match widened types by default:
`FindFirst<Array<number>, 1>` is `1 | undefined`.
Set `$O['widen']` to `false`, or `$O['$widen']` to `never`, for a purely type-centric result.
`ElementMatch<T, Criteria, Options>` is the single-element matcher these are built on.

`FindFirst`, `FindLast`, `ArrayPlus.Find` and `Some` also take a [type function](/type-plus/guides/type-functions/)
as `Criteria`. An element matches when the function returns `true`.
The `widen` options and `Some`'s `mode` do not apply to it.
Pass `IsEqual.$Fn<X>` to match an element exactly (strict mode).

`Some` accepts the full [type branching](/type-plus/api/type-branching/) options plus its own
`mode: 'loose' | 'strict'` (default `'loose'`). Before 8.0.0, `mode` was the third positional
parameter, `Then` and `Else` the fourth and fifth: `Some<A, C, 'strict'>` is now
`Some<A, C, { mode: 'strict' }>`, and `Some<A, C, 'loose', Then, Else>` is now
`Some<A, C, { $then: Then; $else: Else }>`.

```ts
type R = FindFirst<[1, { a: 1 }, object], IsObject.$Fn<{ exact: true }>> // object
type R = ArrayPlus.Find<Array<1 | { a: 1 }>, IsObject.$Fn> // { a: 1 }
type R = FindLast<[1, 'x', { a: 1 }, 2], IsObject.$Fn> // { a: 1 }
type R = FindFirst<[number, 1], IsEqual.$Fn<1>> // 1
type R = Some<[1, { a: 1 }], IsObject.$Fn> // true
type R = Some<Array<string | { a: 1 }>, IsObject.$Fn> // boolean
```

## `Reverse`, `PadStart`, `SplitAt`

🗑️ **removed in 8.0.0**: `Concat` and `ArrayPlus.Concat` — use the spread tuple `[...A, ...B]` instead.

```ts
type Reverse<A extends readonly unknown[]>
type PadStart<A extends readonly unknown[], MaxLength extends number, PadWith = unknown>
type ArrayPlus.SplitAt<A, Index extends number, DeleteCount extends number = never, Insert extends readonly unknown[] = never>
```

```ts
type R = Reverse<[1, 2, 3]> // [3, 2, 1]

type R = PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
type R = PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
type R = PadStart<number[], 1, string> // [string, ...number[]]

type R = ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2> // [[1, 2], [3, 4, 5]]
type R = ArrayPlus.SplitAt<[1, 2, 3, 4, 5], 2, 2, ['a', 'b']> // [[1, 2, 'a', 'b', 5], [3, 4]]
```

`SplitAt` accepts negative indexes and clamps an out-of-bound index to the boundary.

## Removed aliases

🗑️ **removed in 8.0.0**: use `FindFirst` and `PadStart` instead.

Both were thin aliases kept for the v7 line. Neither was exported from the package entry point in
v7, so this only affects deep imports:

| Removed | Replacement |
| --- | --- |
| `First<A, Criteria>` | `FindFirst<A, Criteria>`, `ArrayPlus.Find<A, Criteria>` |
| `PadLeft<A, Total, PadWith>` | `PadStart<A, MaxLength, PadWith>` |

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

🗑️ **removed in 8.0.0**:

- `PropUnion` — use `UnionOfProps` instead.
- `MapToProp` — use `IntersectOfProps` instead.
- `ArrayValue` — use `UnionOfValues` instead.

## `Entries` and `IsReadonly`

```ts
type ArrayPlus.Entries<A extends readonly unknown[]>
type ArrayPlus.IsReadonly<A, $O extends $StrictOptions<$O, IsReadonly.$Options> = {}>
```

```ts
type R = ArrayPlus.Entries<[1, 2, 3]> // [[0, 1], [1, 2], [2, 3]]
type R = ArrayPlus.Entries<Array<string | number>> // Array<[number, string | number]>

type R = ArrayPlus.IsReadonly<readonly [1, 2]> // true
type R = ArrayPlus.IsReadonly<[1, 2]> // false
type R = ArrayPlus.IsReadonly<readonly string[] | number[], { selection: 'filter' }> // readonly string[]
```

`IsReadonly` takes the full [type branching](/type-plus/api/type-branching/) options, including the
`$any`, `$unknown`, `$never` and `$void` branches, and has `IsReadonly.$Fn`. A value that is not an
array resolves to `$else`.
Before 8.0.0 it took the legacy `IsReadonly.Options` with a `$notArray` branch; for that, write
`IsArray<A, { $then: IsReadonly<A>; $else: X }>`.

## Loose array types

🗑️ **removed in 8.0.0**: use `IsArray` and `IsNotArray` instead.

`LooseArrayType` and its variances were a stopgap while `ArrayType` still did a strict,
tuple-excluding check. `IsArray` is loose by default, so the stopgap is no longer needed:

| Removed | Replacement |
| --- | --- |
| `LooseArrayType<T>` | `IsArray<T, { selection: 'filter' }>` |
| `IsLooseArray<T>` | `IsArray<T>` |
| `NotLooseArrayType<T>` | `IsNotArray<T, { selection: 'filter' }>` |
| `IsNotLooseArray<T>` | `IsNotArray<T>` |

`IsArray` also distributes over unions, so the filter form returns only the array members:

```ts
type R = IsArray<number[] | 1, { selection: 'filter' }> // number[]
```

## Runtime functions

| Function | Description |
| --- | --- |
| `literalArray(...entries)` | Returns an array whose items are restricted to the provided literals. |
| `reduceWhile(predicate, callbackfn, initialValue, array)` | `reduce()` with a predicate for early termination. |
