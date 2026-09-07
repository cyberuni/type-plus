---
title: Type Guards and Assertions
description: Narrow types at runtime with isType and assertType, and validate assignability at the type level with the predicate types.
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

```ts
function assertType<T>(subject: T): asserts subject is T
function assertType<T>(subject: unknown, validator: (s: T) => boolean): asserts subject is T
```

An [assertion function][assertion_functions]. The one-argument form is the assertion equivalent of
`const x: T = subject`, without introducing an unused variable. The validator form throws a `TypeError`
when the check fails, with the validator source printed in the message via [`tersify`](https://github.com/unional/tersify).

```ts
import { assertType } from 'type-plus'

const s: unknown = 1

assertType<number>(s, v => typeof v === 'number')
s // number

// TypeError: subject fails to satisfy s => typeof s === 'boolean'
assertType<boolean>(s, v => typeof v === 'boolean')
```

A third overload takes a class constructor and narrows to `InstanceType<T>`. It is deprecated because
`instanceof` is not a failsafe test.

### assertType members

`assertType.isX(subject)` asserts the subject is exactly that type — a union fails at the type level.
`assertType.noX(subject)` asserts the subject does *not* contain that type, and does work against unions.

```ts
const a: any = undefined
assertType.isUndefined(a)
a // undefined

const b: number | undefined = 1
assertType.noUndefined(b) // compiler error: `b` may be undefined
```

| Member | Description |
| --- | --- |
| `isUndefined` / `noUndefined` | Subject is / does not contain `undefined` |
| `isNull` / `noNull` | Subject is / does not contain `null` |
| `isNumber` / `noNumber` | Subject is / does not contain `number` |
| `isBoolean` / `noBoolean` | Subject is / does not contain `boolean` |
| `isTrue` / `noTrue` | Subject is / does not contain `true` |
| `isFalse` / `noFalse` | Subject is / does not contain `false` |
| `isString` / `noString` | Subject is / does not contain `string` |
| `isFunction` / `noFunction` | Subject is / does not contain a function |
| `isError` / `noError` | Subject is / does not contain an `Error` |
| `isNever` | Subject type is `never`. Useful in exhaustiveness checks |
| `isConstructor` | Deprecated — an arrow function can still pass after compilation |
| `custom(validator)` | Builds a custom assertion function that throws a standard `TypeError` |
| `as<T>(subject)` | Asserts `subject` as `T` inline, with no runtime check |

## Assignable and NotAssignable

```ts
type Assignable<A, B, $O extends Assignable.$Options = {}>
type NotAssignable<A, B, $O extends NotAssignable.$Options = {}>
```

Validate whether `A` is assignable to `B`. These are the modern replacements for `CanAssign` and friends.

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

`Assignable.$<A, B, $O>` is the inner logic without the special-type checks, for building your own types.

## IsLiteral

```ts
type IsLiteral<T extends number | boolean | bigint | string | symbol, Then = true, Else = false>
```

Is `T` a scalar literal rather than its widened primitive.

```ts
type R1 = IsLiteral<'a'> // true
type R2 = IsLiteral<1n> // true
type R3 = IsLiteral<string> // false
```

## If

```ts
type If<Condition extends boolean, Then = true, Else = false>
```

Branch on a boolean type. Handy for composing the `Is*` predicates.

```ts
type R = If<IsLiteral<1>, 'literal', 'wide'> // 'literal'
```

## Other predicates

| Type | Description |
| --- | --- |
| `IsEmptyObject<T>` | `true` when `T` is `{}` and nothing more |
| `IsExtend<A, B, Then, Else>` | `A extends B ? Then : Else` |
| `IsNotExtend<A, B, Then, Else>` | The negation of `IsExtend` |
| `NotExtendable<A, B, Then, Else>` | Returns `A` (or `Then`) only when `A` does not extend `B` |
| `Extendable<A, B, Then, Else>` | Deprecated — use `Assignable` |
| `CanAssign<A, B>` | Deprecated — use `Assignable<A, B>` |
| `StrictCanAssign<A, B>` | Deprecated — use `Assignable<A, B, { distributive: false }>` |
| `IsAssign<A, B>` | Deprecated alias of `CanAssign` |
| `canAssign<T>()` | Runtime helper returning a function that checks assignability of its argument |

The `predicates` entry point also re-exports the logical types `And`, `Not`, `Or` and `Xor`.
Those are documented on the [boolean page](/type-plus/api/boolean/).

[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
[assertion_functions]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
