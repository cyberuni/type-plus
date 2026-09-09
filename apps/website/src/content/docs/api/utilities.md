---
title: Utilities
description: Casts for tests, literal widening, either-or-both option shapes, and the option-merging machinery behind the $Options convention.
sidebar:
  order: 16
---

The `utils` category is the small tools that do not belong to a type family: casts for writing tests,
`Widen` for going from a literal back to its parent type, `EitherOrBoth` for option objects, and the
machinery the `$Options` convention is built from.

## `as` and `asAny`

```ts
function as<T>(subject: unknown): T
function asAny(subject: unknown): any
```

🦴 *utilities* — a type assertion behind a call.

```ts
import { as, asAny } from 'type-plus'

const r = as<{ a: number }>({}) // typed { a: number }, still `{}` at runtime

function f(_a: number) {}
f(asAny('x')) // compiles; the guard inside `f` is what is under test
```

These are exactly as unchecked as `subject as T`. Nothing verifies the claim and the value is returned
untouched. Their reason to exist is position: they compose in an expression where a type assertion would
need parentheses, which is what a test building a stub value wants.

`asAny` is `as<any>` under a shorter name, for handing a deliberately wrong value to a checked parameter.

For building partial objects in a test, prefer [`stub`](/type-plus/api/testing/), which keeps the shape
checked.

## `Widen`

```ts
type Widen<T>
```

⚗️ *transform* — widens a literal type to its parent type.

```ts
import type { Widen } from 'type-plus'

type R = Widen<1> // number
type R = Widen<true> // boolean
type R = Widen<'a'> // string

type R = Widen<{ a: 1 }> // { a: 1 }, unchanged
```

Only `number`, `boolean` and `string` literals widen; everything else is returned as is. This is what
`brand()` and `flavor()` apply to their input, so branding the literal `1` produces a branded `number`
rather than a branded `1`.

## `EitherOrBoth`

```ts
type EitherOrBoth<A, B, C = void, D = void>
```

🧰 *type util* — `A | B | (A & B)`, for up to four types.

```ts
import type { EitherOrBoth } from 'type-plus'

type A = { src: string; minify?: boolean }
type B = { logLevel: number }

function config(options: EitherOrBoth<A, B>) {}

config({ logLevel: 1 })
config({ src: 'src' })
config({ src: 'src', minify: false })
// config({ minify: false }) // compile error: neither A nor B is satisfied
```

Use it to compose several option groups into one parameter where at least one group must be satisfied in
full. A plain `Partial<A & B>` would accept the empty object and every half-filled combination; this
preserves each group's required fields.

Overlapping types have corner cases, since the unions and intersections are enumerated rather than
reconciled.

`EitherAnd` is the old name for the same type and is 💀 *deprecated*.

## `inspect`

```ts
function inspect<T>(value: T, inspector?: (value: Readonly<T>) => void): T
```

🦴 *utilities* — passes `value` to `inspector` and returns it unchanged.

```ts
import { inspect } from 'type-plus'

const total = inspect(items.map(price)).reduce(sum, 0)
```

A debugging aid: it drops into the middle of a chain without breaking it. The default inspector is
`console.dir`. Take it out before shipping.

## `TypePlusOptions`

```ts
namespace TypePlusOptions {
  type Merge<I, D>
  interface NotArray {
    $notArray?: unknown
  }
}
```

🧰 *namespace* ㊙️ *internal* — the machinery behind the options convention, not part of it.

`Merge<I, D>` fills a caller's options `I` in from the defaults `D`, and `NotArray` is the `$notArray`
branch the array types share.

```ts
import type { TypePlusOptions } from 'type-plus'

type R = TypePlusOptions.Merge<{ a: 1 }, { a: 0; b: 0 }> // { a: 1; b: 0 }
```

A caller passes an options object and never needs these. They are documented because they appear in the
signatures of the types that do. See [Options](/type-plus/reference/options/) for the convention itself.

## `NoInfer`

```ts
type NoInfer<T>
```

💀 *deprecated since 8.0.0* — use TypeScript's built-in `NoInfer`, added in 5.4.

## `amend`

```ts
function amend<S>(subject: S): { union<T>(): T & S; intersect<T>(): T | S }
```

🦴 *utilities* — casts `subject` to an intersection or a union with `T`.

```ts
import { amend } from 'type-plus'

const r = amend({ a: 1 }).union<{ b: string }>() // { b: string } & { a: number }
```

Note the naming: `union()` returns the intersection and `intersect()` returns the union. The names
describe the set of *values* accepted, not the type operator.

## Reference

| Symbol | Description |
| --- | --- |
| `as<T>(subject)` | type assertion as a call |
| `asAny(subject)` | `as<any>` |
| `amend(subject)` | cast to an intersection or union with `T` |
| `Widen<T>` | literal to its parent type |
| `EitherOrBoth<A, B, C, D>` | `A \| B \| (A & B)`, up to four types |
| `EitherAnd<A, B, C, D>` | 💀 renamed to `EitherOrBoth` |
| `inspect(value, inspector?)` | pass through an inspector, return the value |
| `TypePlusOptions` | ㊙️ the option-merging machinery |
| `NoInfer<T>` | 💀 use TypeScript's built-in |

Source: [`src/utils`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/utils).
