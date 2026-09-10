# union

Union type is a type that combines multiple types as union.

A value belongs to a union type if it belongs to one (or more) of its member types.

For example:

```ts
type U1 = string | number

const u1: U1 = 'a'
const u2: U1 = 1
```

As a mental shortcut, you can think of it as an *or* operator.
But it is better to think of it as union of category instead.

## Union Members

Each member of a union type is referred to as the union's member.

It is useful to understand the relationship between members of a union type.

In this context, we are going to consider types as sets,
instead of categories, to make it easier to understand.

Given two union members of a union,
their relationship can be describe as "A x B" where "x" is:

- disjoint: there is no overlap between A and B (e.g. `number | string`).
- overlap: there are some overlap between A and B (e.g. `1 | 2` and `2 | 3` has overlap `2`)
- subset/superset: A is a subset of B (or B is a superset of A) when every element in A is also in B (e.g. `1 | 2` is a subset of `number`)

The union type will consider these relations when it is declared.

There are other relations between members of a union type,
which will affect how the union type behaves.

For example:

- property overlap: e.g. `{ a: 1 } | { a: 2 }`
- property overlap with extension: e.g. `{ a: 1, b?: 2 } | { a: 1, c?: 3 }`

The names of these relations are not properly defined and may change in the future.

## [IsUnion](./union.ts#l53)

`IsUnion<T, $O extends IsUnion.$Options = {}>`

🎭 *predicate*
🔢 *customizable*

Validate that `T` is a union.

```ts
import type { IsUnion } from 'type-plus'

type R = IsUnion<1 | 2> // true
type R = IsUnion<boolean> // true
type R = IsUnion<number> // false

type R = IsUnion<1 | 2, { selection: 'filter' }> // 1 | 2
type R = IsUnion<number, { selection: 'filter' }> // never

type R = IsUnion<number, { $then: 1; $else: 2 }> // 2
```

## Removed

🗑️ **removed in 8.0.0**

| Removed | Replacement |
| --- | --- |
| `UnionType<T>` | `IsUnion<T, { selection: 'filter' }>` |
| `UnionType<T, Then, Else>` | `IsUnion<T, { $then: Then; $else: Else }>` |

## Reference

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
