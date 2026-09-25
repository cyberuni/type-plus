---
title: Type Guards and Assertions
description: Narrow types at runtime with isType, and validate assignability at the type level with the predicate types.
sidebar:
  order: 11
---

This page covers three related categories: the 🛡️ *type guard* functions that narrow a value's type,
the 🚦 *assertion* functions that narrow by throwing, and the 🎭 *predicate* types that answer
assignability questions at the type level.

See [Categories](/type-plus/reference/categories/) for what the icons mean.

## isType

```ts
function isType<T>(subject: T): subject is T
function isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T
```

A generic [type guard][type_guard], so you do not have to write a one-off `x is T` function.

The single-argument overload is a compile-time only check: it ensures `subject` already satisfies `T`.

```ts
import { isType } from 'type-plus'

const s: unknown = 1

if (isType<1>(s, v => v === 1)) {
	s // 1
}
```

🗑️ **removed in 8.0.0**: the `isType.t`, `isType.f`, `isType.never` and `isType.equal` members.
`isType()` itself is unchanged. Use [`testType`](/type-plus/api/testing/) for type-level tests:

| Removed | Replacement |
| --- | --- |
| `isType.t<T>()` | `testType.true<T>(true)` |
| `isType.f<T>()` | `testType.false<T>(true)` |
| `isType.never<T>()` | `testType.never<T>(true)` |
| `isType.equal<true, A, B>()` | `testType.equal<A, B>(true)` |

## assertType

🗑️ **removed in 8.0.0**: `assertType` and all its members (`assertType.isX`/`noX`/`as`/`custom`) — no
replacement in type-plus. Use [`testType`](/type-plus/api/testing/) for type-level checks,
`x satisfies T` for compile-time assignability, and `isType` or an ordinary type guard / `if (...) throw`
for runtime narrowing.

## Assignable and NotAssignable

```ts
type Assignable<A, B, $O extends $StrictOptions<$O, Assignable.$Options> = {}>
type NotAssignable<A, B, $O extends $StrictOptions<$O, NotAssignable.$Options> = {}>
```

Validate whether `A` is assignable to `B`. These replaced `CanAssign` and friends, removed in 8.0.0.

```ts
type R1 = Assignable<'a', string> // true
type R2 = Assignable<'a', 'b'> // false
type R3 = NotAssignable<'a', 'b'> // true
```

Both support the full option set — `selection: 'filter'`, `distributive`, and the `$any` / `$unknown` /
`$never` branch overrides — plus the `$Options` and `$Branch` namespace members used for type-level
programming. See [type branching](/type-plus/api/type-branching/) and [Options](/type-plus/reference/options/).

```ts
type R4 = Assignable<1, number, { selection: 'filter' }> // 1
type R5 = Assignable<string | number, number> // boolean (distributed)
type R6 = Assignable<string | number, number, { distributive: false }> // false
```

The special types follow TypeScript's own assignability relation. `any` is assignable to every type
except `never`, and every type is assignable to `any` — so the relation is symmetric for `any`, just
as it is in the compiler. `unknown` is the top type: everything is assignable to it, and it is
assignable only to `any` and `unknown`. `never` is the bottom type: it is assignable to everything,
and nothing but `never` is assignable to it. `void` is not special here and is answered structurally.

```ts
type R7 = Assignable<any, number> // true
type R8 = Assignable<number, any> // true
type R9 = Assignable<any, never> // false
type R10 = Assignable<unknown, number> // false
type R11 = Assignable<never, number> // true
type R12 = Assignable<undefined, void> // true
```

`Assignable.$<A, B, $O>` is the inner logic without the special-type checks, for building your own types.

## IsLiteral

```ts
type IsLiteral<T extends number | boolean | bigint | string | symbol, $O extends $StrictOptions<$O, IsLiteral.$Options> = {}>
```

Is `T` a scalar literal rather than its widened primitive.

```ts
type R1 = IsLiteral<'a'> // true
type R2 = IsLiteral<1n> // true
type R3 = IsLiteral<string> // false
```

It accepts the full [type branching](/type-plus/api/type-branching/) options.

```ts
type R4 = IsLiteral<'a', { selection: 'filter' }> // 'a'
type R5 = IsLiteral<string, { selection: 'filter' }> // never
type R6 = IsLiteral<'a', { $then: 'yes'; $else: 'no' }> // 'yes'
```

Before 8.0.0 the branches were positional (`IsLiteral<T, Then, Else>`); move them into
`{ $then, $else }`.

## If

```ts
type If<Condition extends boolean, $O extends $StrictOptions<$O, If.$Options> = {}>
```

Branch on a boolean type. Handy for composing the `Is*` predicates.

```ts
type R = If<IsLiteral<1>, { $then: 'literal'; $else: 'wide' }> // 'literal'
type R = If<IsLiteral<string>, { $then: 'literal'; $else: 'wide' }> // 'wide'
```

It accepts the full [type branching](/type-plus/api/type-branching/) options.
Before 8.0.0 the branches were positional (`If<Condition, Then, Else>`);
move them into `{ $then, $else }`.

## Other predicates

| Type | Description |
| --- | --- |
| `IsEmptyObject<T, $O>` | `true` when `T` is `{}` and nothing more. Takes the [type branching](/type-plus/api/type-branching/) options and has `IsEmptyObject.$Fn` |
| `canAssign<T>()` | Runtime helper returning a function that checks assignability of its argument |

`IsExtend`, `IsNotExtend`, `Extendable`, `NotExtendable`, `CanAssign`, `StrictCanAssign` and
`IsAssign` were removed in 8.0.0. Use `Assignable` / `NotAssignable` instead:

| Removed | Replacement |
| --- | --- |
| `Extendable<A, B>` | `Assignable.$<A, B, { selection: 'filter' }>` |
| `NotExtendable<A, B>` | `NotAssignable.$<A, B, { selection: 'filter' }>` |
| `IsExtend<A, B, Then, Else>` | `Assignable.$<A, B, { $then: Then; $else: Else }>` |
| `IsNotExtend<A, B, Then, Else>` | `NotAssignable.$<A, B, { $then: Then; $else: Else }>` |
| `CanAssign<A, B>` | `Assignable<A, B>` |
| `StrictCanAssign<A, B>` | `Assignable<A, B, { distributive: false }>` |
| `IsAssign<A, B>` | `Assignable<A, B>` |

The `predicates` entry point also re-exports the logical types `And`, `Not`, `Or` and `Xor`.
Those are documented on the [boolean page](/type-plus/api/boolean/).

[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
