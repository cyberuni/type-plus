---
title: Function and Functional
description: Identify function types, extract call signatures, and compose functions or build contexts at runtime.
sidebar:
  order: 8
---

The `function` category identifies and manipulates function types.
The `functional` category provides runtime helpers written in a functional style, plus the types that describe them.

## `IsFunction` and `IsNotFunction`

```ts
type IsFunction<T, $O extends IsFunction.$Options = {}>
type IsNotFunction<T, $O extends IsNotFunction.$Options = {}>
```

🎭 *predicate* — validates that `T` is `Function` or any function signature.

```ts
import type { IsFunction, IsNotFunction } from 'type-plus'

type R = IsFunction<Function> // true
type R = IsFunction<() => void> // true

type R = IsFunction<number> // false
type R = IsFunction<never> // false
type R = IsFunction<unknown> // false

type R = IsNotFunction<() => void> // false
type R = IsNotFunction<number> // true
```

Both are distributive, so a union that mixes functions and non-functions yields `boolean`:

```ts
type R = IsFunction<Function | number> // boolean
type R = IsFunction<Function | number, { distributive: false }> // false
```

With `selection: 'filter'` they become filters instead of predicates:

```ts
type R = IsFunction<(() => string) | number, { selection: 'filter' }> // () => string
type R = IsNotFunction<(() => string) | number, { selection: 'filter' }> // number
```

They support the full option set — `$any`, `$unknown`, `$never`, `$void`, `$then`, `$else`,
`selection`, `distributive`, and the `$Branch` selectors. See [type branching](/type-plus/api/type-branching/)
and [options](/type-plus/reference/options/).

## `IsStrictFunction` and `IsNotStrictFunction`

```ts
type IsStrictFunction<T, $O extends IsStrictFunction.$Options = {}>
type IsNotStrictFunction<T, $O extends IsNotStrictFunction.$Options = {}>
```

🎭 *predicate* — validates that `T` is exactly `Function`, not a specific call signature.

```ts
import type { IsStrictFunction, IsNotStrictFunction } from 'type-plus'

type R = IsStrictFunction<Function> // true
type R = IsStrictFunction<() => void> // false
type R = IsStrictFunction<(() => void) & { a: 1 }> // false

type R = IsNotStrictFunction<Function> // false
type R = IsNotStrictFunction<() => void> // true
```

Use these when the distinction between the bare `Function` type and a callable signature matters.
They take the same options as `IsFunction`.

## `AnyFunction`

```ts
type AnyFunction<Params extends any[] = any[], Result = any> = (...args: Params) => Result
```

🧰 *type util* — a constraint for "any function", with optional parameter and result types.

```ts
import type { AnyFunction } from 'type-plus'

function callTwice<F extends AnyFunction>(fn: F) {
	/* ... */
}

type Handler = AnyFunction<[event: string], void> // (event: string) => void
```

## `ExtractFunction`

```ts
type ExtractFunction<T extends AnyFunction>
function extractFunction<T extends AnyFunction>(fn: T): ExtractFunction<T>
```

⚗️ *transform* — pulls the call signature out of a composite type, dropping the extra properties.

```ts
import { extractFunction, type ExtractFunction } from 'type-plus'

type Composite = (() => void) & { a: 1 }

type R = ExtractFunction<Composite> // () => void

const fn = extractFunction((() => {}) as Composite) // () => void
```

It works on an intersection of a function with other members. It does not work on overloads or unions.

## `ChainFn` and `EndoFn`

```ts
type ChainFn<T> = (param: T) => T
type EndoFn<T> = (param: T) => T
```

Both describe a function that returns the same type it takes.
`ChainFn` names the chaining use case; `EndoFn` names the mathematical one — an endofunctor maps a category back to itself.

```ts
import type { ChainFn } from 'type-plus'

const trim: ChainFn<string> = (s) => s.trim()
```

## `compose`

```ts
function compose<FS extends AnyFunction[]>(
	...fns: FS
): (...args: Parameters<Head<FS>>) => ReturnType<Last<FS>>
```

Composes functions left to right. Each function receives the previous function's return value.
The composed function takes the parameters of the first function and returns the result of the last.

```ts
import { compose } from 'type-plus'

const parseThenDouble = compose(
	(s: string) => Number.parseInt(s, 10),
	(n: number) => n * 2,
)

parseThenDouble('21') // 42, typed (s: string) => number
```

## `context`

```ts
function context<Init extends ContextBaseShape, Ctx extends ContextBaseShape = Init>(
	init?: Init | (() => Init),
): ContextBuilder<Init, Ctx>
```

Builds a context object incrementally. Each `extend()` adds properties and widens the resulting type;
`build()` produces the accumulated context.

```ts
import { context } from 'type-plus'

const ctx = context({ id: 1 })
	.extend((c) => ({ label: `item-${c.id}` }))
	.extend(() => ({ enabled: true }))
	.build() // { id: number; label: string; enabled: boolean }
```

An extender returns only the new properties; the builder left-joins them onto the current context.
Returning an existing property overrides its value.

Supporting types:

| Type | Description |
| --- | --- |
| `ContextBaseShape` | `Record<string \| symbol, any>` — the constraint every context satisfies. |
| `ContextExtender<Current, Additional>` | `(context: Current) => Additional` — the shape of an `extend()` callback. |
| `ContextBuilder<Init, Ctx>` | The builder returned by `context()`, exposing `extend()` and `build()`. |

## Source

- [`src/function`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/function)
- [`src/functional`](https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/functional)
