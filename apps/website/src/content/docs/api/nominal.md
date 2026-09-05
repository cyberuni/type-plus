---
title: Nominal Types
description: Add nominal typing to TypeScript's structural type system with brands and flavors.
sidebar:
  order: 10
---

TypeScript is structurally typed: any `number` is interchangeable with any other `number`,
so a `PersonId` and a `BlogId` are the same type as far as the compiler is concerned.

The `nominal` category adds *nominal* typing on top of that. It attaches a name to a type
so that two types with the same structure but different names are no longer interchangeable.
There are two strengths of this, and the difference between them is the thing to understand first.

## Brand vs. flavor

A **brand** is strict. A branded value can only come from `brand()`; a plain value of the underlying
type cannot be assigned to it. Going the other way still works — a branded value can be used
wherever the plain type is expected.

A **flavor** is permissive. Two different flavors cannot be mixed, but a plain, unflavored value
of the underlying type *can* be assigned to a flavored one. A brand with the same name is assignable
to the corresponding flavor.

```ts
import { brand, flavor, type Brand, type Flavor } from 'type-plus'

// brand: plain values are rejected
const branded = brand('person', { id: 1 })
const plain = { id: 1 }
// @ts-expect-error plain is not branded
const b: typeof branded = plain

// flavor: plain values are accepted
type PersonId = Flavor<'Person', number>
const personId: PersonId = 1 // ok

type BlogId = Flavor<'Blog', number>
const blogId: BlogId = 1
// @ts-expect-error a BlogId is not a PersonId
const p: PersonId = blogId
```

Reach for a brand when the value must be produced by your code — a validated email, a sanitized string,
a token issued by a factory. Reach for a flavor when you only want to catch argument mix-ups at call
sites while literals and existing values still work without ceremony.

## `Brand` and `brand`

```ts
type Brand<B extends string, T = never>
interface Branded<B extends string, T>
function brand<B extends string>(type: B): <T>(subject: T) => Brand<B, Widen<T>>
function brand<B extends string, T>(type: B, subject: T): Brand<B, Widen<T>>
```

`Brand<B, T>` is `Branded<B, T> & T` for ordinary types, so the branded value keeps every member of `T`.
For `null`, `undefined`, `symbol`, and `void` — which cannot be intersected usefully — it is `Branded<B, T>` alone.

```ts
import { brand, type Brand } from 'type-plus'

type Email = Brand<'email', string>

const email = brand('email', 'a@b.com') // Brand<'email', string>
email.toUpperCase() // string members are still available

// called with one argument, brand() returns a creator
const createUserId = brand('user-id')
let id1 = createUserId(1)
const id2 = createUserId(2)
id1 = id2 // same brand, assignable
```

Two brands with different names are not assignable to each other, and a branded value is assignable
back to its unbranded type.

At runtime `brand()` sets the `typeSym` property when the subject is an object.
For primitives the brand exists only at the type level, so it costs nothing.

## `Flavor` and `flavor`

```ts
type Flavor<F extends string, T>
interface Flavored<F extends string>
interface FlavoredUnit<F extends string, T>
function flavor<F extends string>(type: F): <T>(subject: T) => Flavor<F, Widen<T>>
function flavor<F extends string, T>(type: F, subject: T): Flavor<F, Widen<T>>
```

`Flavor<F, T>` is `Flavored<F> & T`, where `Flavored<F>` declares the name marker as an *optional*
property. That optionality is the whole mechanism: a plain `T` satisfies the type because the marker
is not required, while a value carrying a different name fails.

As with `Brand`, the special types `null`, `undefined`, `symbol`, and `void` use `FlavoredUnit<F, T>` instead.

```ts
import { flavor, type Flavor } from 'type-plus'

type PersonId = Flavor<'Person', number>

let a: PersonId = 1
let b: PersonId = 2
a = b // same flavor, fine

// flavor() also curries
const createPerson = flavor('person')
const person1 = createPerson(1)
const blogPost = flavor('Blog', 1)
// @ts-expect-error different flavors do not mix
const wrong: typeof person1 = blogPost
```

## `nominalMatch`

```ts
function nominalMatch<A extends string, B extends A>(a: Brand<A, unknown>, b: Brand<B, unknown>): boolean
function nominalMatch<A extends string, B extends A>(a: Flavor<A, unknown>, b: Flavor<B, unknown>): boolean
```

Compares two branded or flavored values at runtime. For objects it compares the stored `typeSym`.
For primitives, where the brand exists only in the type system, there is nothing to compare and it returns `true`.

```ts
import { brand, nominalMatch } from 'type-plus'

const a = brand('x', { v: 1 })
const b = brand('x', { v: 2 })

nominalMatch(a, b) // true
```

The signature constrains `B extends A`, so mismatched names are already a compile error —
the runtime check is for values whose names are only known dynamically.

## Symbols

| Export | Description |
| --- | --- |
| `typeSym` | The symbol key holding the brand or flavor name on an object. |
| `valueSym` | The symbol key carrying the underlying value type for `Branded` and `FlavoredUnit`. |

Both are unique symbols; you rarely reference them directly, but they appear in the expanded
type of any branded or flavored value.

## Source

- [`src/nominal`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/nominal)
