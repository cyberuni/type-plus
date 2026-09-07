---
title: Testing
description: Assert and inspect types in your test files with testType, and build partial values with stub.
sidebar:
  order: 13
---

🧪 The `testing` category holds utilities designed for writing tests — `testType` for asserting and
inspecting types, and `stub` for producing values you only partially care about.

## testType

`testType` is the main testing API. Each method takes one type parameter for the type under test and one
value argument holding the *expected* result of a predicate. If the type does not match, the argument
fails to type check and the test fails at compile time.

```ts
import { testType } from 'type-plus'

testType.equal<1 | 2, 1 | 2>(true)
testType.never<never>(true)
testType.string<'abc'>(true)
testType.number<'abc'>(false)
```

Every method returns its argument asserted as the first type parameter, so you can capture it and let
your editor resolve the type:

```ts
const t = testType.equal<SomeComplexType, SomeCompositeType>(true)
type T = typeof t // resolves to SomeComplexType
```

At runtime `testType` is a `Proxy` whose every method is the identity function — the whole value of the
API is in the type signatures.

### Equality and assignability

```ts
testType.equal<A, B>(expected: IsEqual<A, B>): A
testType.equal<A, B, C>(expected: IsEqual<A, B> & IsEqual<A, C>): A
testType.canAssign<A, B, $O extends $Distributive.Options = {}>(expected: Assignable<A, B, $O>): A
testType.strictCanAssign<A, B, $O extends $Distributive.Options = {}>(
	expected: Assignable<A, B, $MergeOptions<{ distributive: false }, $O>>
): A
```

`canAssign` is distributive, so a union `A` can yield `boolean`, meaning both `true` and `false` pass.
Use `strictCanAssign` when every branch of the union must be assignable.

```ts
testType.canAssign<123, number>(true)
testType.strictCanAssign<number | string, number | string>(true)
testType.strictCanAssign<number | string, number>(false)
```

### Type checks

The `strict*` variants use `exact: true`, so a literal fails the check while the widened primitive passes.
The plain variants accept both.

```ts
testType.bigint<1n>(true)
testType.strictBigint<1n>(false)
testType.strictBigint<bigint>(true)

testType.string<'a'>(true)
testType.strictString<'a'>(false)
```

| Method | Checks |
| --- | --- |
| `any<T>` | `T` is exactly `any` |
| `unknown<T>` | `T` is exactly `unknown` |
| `never<T>` | `T` is exactly `never` |
| `void<T>` | `T` is exactly `void` |
| `undefined<T>` | `T` is exactly `undefined` |
| `null<T>` | `T` is exactly `null` |
| `boolean<T>` / `strictBoolean<T>` | `T` is a boolean or boolean literal / exactly `boolean` |
| `true<T>` / `false<T>` | `T` is exactly `true` / `false` |
| `number<T>` / `strictNumber<T>` | `T` is a number or number literal / exactly `number` |
| `bigint<T>` / `strictBigint<T>` | `T` is a bigint or bigint literal / exactly `bigint` |
| `string<T>` / `strictString<T>` | `T` is a string or string literal / exactly `string` |
| `symbol<T>` | `T` is a `symbol` |
| `object<T>` | `T` is an `object` — note functions, arrays and tuples are also objects |
| `array<T>` | `T` is exactly an array |
| `tuple<T>` | `T` is a tuple |
| `function<T>` / `strictFunction<T>` | `T` is a function / strictly a function |

### Options

Every type check takes an optional second type parameter holding
[the behavioral options](../../reference/options/) of the underlying `IsXXX` type:

```ts
testType.string<T, $O extends testType.$Options = {}>(expected): T
```

`testType.$Options` is `{ distributive?: boolean; exact?: boolean }`. Selection and branching options
are deliberately not part of the surface — `testType` always resolves its check as a predicate so that
`expected` stays a `true`/`false` literal.

Options you pass are merged *over* the method's own defaults, so omitting the type argument keeps the
behavior each method has always had:

```ts
testType.string<'a'>(true) // default: not exact
testType.string<'a', { exact: true }>(false) // opt into exact comparison

testType.array<[string]>(false) // `array` defaults to `exact: true`
testType.array<[string], { exact: false }>(true) // and it can be turned off

testType.strictString<'a'>(false) // `strict*` bakes in `exact: true`
testType.strictString<'a', { exact: false }>(true) // which is also overridable
```

The checks default to `distributive: false`, so a union has to satisfy the check as a whole.
Turn distribution on to evaluate each member separately, which widens the result to `boolean` when the
members disagree:

```ts
testType.string<'a' | 1>(false)
testType.string<'a' | 1, { distributive: true }>(true) // `boolean` accepts either
testType.string<'a' | 1, { distributive: true }>(false)
```

`canAssign` and `strictCanAssign` take the same parameter as their third, and accept
`distributive` only:

```ts
testType.canAssign<number | string, number, { distributive: false }>(false)
testType.strictCanAssign<number | string, number, { distributive: true }>(true)
```

`any`, `unknown`, `never`, `equal` and the `has*` family take no options — none of the types behind
them has a distributive or exact dimension. (`Equal.$Options` is `$Selection.$BaseOptions`: branch
overrides only.)

### Union membership

The `has*` methods check that a type *contains* a member, rather than *being* that member. They are the
`testType` face of the [`HasUndefined`], [`HasNull`] and [`HasVoid`] predicates.

```ts
testType.hasUndefined<T>(expected: HasUndefined<T>): T
testType.hasNull<T>(expected: HasNull<T>): T
testType.hasVoid<T>(expected: HasVoid<T>): T
```

They take no options type parameter: `distributive` is what the check is made of, and none of
`undefined`, `null` or `void` has a literal subtype for `exact` to narrow.

```ts
type R = number | undefined

testType.hasUndefined<R>(true)
testType.undefined<R>(false)
```

Each union branch is checked on its own, so a union passes when any branch matches.

```ts
testType.hasNull<string | null>(true)
testType.hasVoid<string | void>(true)
testType.hasNull<string | undefined>(false)
```

This is not the same as passing `{ distributive: true }` to the plain check. Distribution widens the
result to `boolean` when the branches disagree, and `boolean` accepts both arguments — so the assertion
stops asserting anything. `has*` folds the branches back into a single `true` or `false`:

```ts
testType.undefined<number | undefined, { distributive: true }>(true) // passes
testType.undefined<number | undefined, { distributive: true }>(false) // also passes

testType.hasUndefined<number | undefined>(true) // passes
testType.hasUndefined<number | undefined>(false) // fails
```

The special types follow the same rule as the plain checks above — `any`, `unknown`, `never` and `void`
are not treated as containing `undefined` or `null`, and `any`, `unknown` and `never` are not treated as
containing `void`.

```ts
testType.hasUndefined<any>(false)
testType.hasUndefined<void>(false)
testType.hasVoid<never>(false)
```

There is no `hasAny`, `hasUnknown` or `hasNever`. A union absorbs those types — `T | any` is `any`,
`T | unknown` is `unknown`, and `T | never` is `T` — so they can never be one branch among several, and
`testType.any`, `testType.unknown` and `testType.never` already answer the question.

[`HasUndefined`]: https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/undefined/has_undefined.ts
[`HasNull`]: https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/null/has_null.ts
[`HasVoid`]: https://github.com/cyberuni/type-plus/tree/main/packages/type-plus/src/void/has_void.ts

### Deferred checks

Each `testType.*` check asserts *immediately* — the expectation is an argument, so the failure lands
where the check is written. That is what stops a check from being extracted into a reusable helper: the
helper body is checked once, against type parameters that are not yet resolved, so nothing there can
either pass or fail.

`testType.defer.*` takes no argument and returns the result as a type instead. A helper returns the
results it collected, and `testType.assert()` checks them at the call site, where the type parameters
are resolved.

```ts
import { testType } from 'type-plus'

function testMyType<T>() {
	return [
		testType.defer.string<T>(),
		testType.defer.not.never<T>(),
	]
}

it('blah', () => { testType.assert(testMyType<'a'>()) }) // passes
it('bruh', () => { testType.assert(testMyType<1>()) })   // fails here, not in the helper
```

```ts
testType.defer.<check><...>(): true | testType.Failed<Check, Actual, Expected>
testType.defer.not.<check><...>(): true | testType.Failed<Check, Actual, Expected>
testType.assert(...results: testType.Passed[]): void
```

Every check listed above has a deferred form, with the same type parameters. `inspect` does not — it is
a development aid, not a check.

`testType.assert()` accepts results in any shape a helper finds convenient to return: a single result,
an array, an object, or any nesting of those.

```ts
function testMyType<T>() {
	return {
		isString: testType.defer.string<T>(),
		isNotNumber: testType.defer.not.number<T>(),
	}
}

testType.assert(testMyType<'a'>())
```

`testType.defer.not.*` is the deferred form of passing `false` to the immediate check, so
`testType.defer.not.equal<A, B>()` mirrors `testType.equal<A, B>(false)`.

Deferred checks take the same [options](#options) as their immediate counterparts, in the same
position and merged over the same defaults:

```ts
testType.defer.string<'a', { exact: true }>()          // fails — the literal is not exactly `string`
testType.defer.array<[string], { exact: false }>()     // passes — `array`'s `exact: true` turned off
testType.defer.canAssign<number | string, number, { distributive: false }>()
```

so a helper can fix an option once and every call site inherits it:

```ts
function testExactly<T>() {
	return testType.defer.string<T, { exact: true }>()
}

testType.assert(testExactly<string>()) // passes
testType.assert(testExactly<'a'>())    // fails here
```

A failing check resolves to `testType.Failed<Check, Actual, Expected>` rather than a bare `false`, so the
compiler error names the check and the types it compared:

```
Argument of type '{ isString: testType.Failed<"string", 1, string>; isNotNumber: true; }'
is not assignable to parameter of type 'Passed'.
```

### testType.inspect

```ts
testType.inspect<T>(handler: (t: InspectedType<T>) => unknown): T
```

A scratchpad for figuring out how a type behaves. The handler is never called — it exists only to hold a
value you can hover over.

```ts
testType.inspect<SomeType>(t => {
	type T = typeof t.type // resolve the type
	t.extends_boolean // result of `SomeType extends boolean`
	t.extends<AnotherType>() // true or false
	t.union<number>() // SomeType | number
	t.intersect<string>() // SomeType & string
})
```

`InspectedType<T>` exposes three families of members, each with a generic form and a set of prebuilt
cases against `any`, `unknown`, `void`, `never`, `undefined`, `null`, `boolean`, `true`, `false`,
`number`, `1`, `bigint`, `1n`, `string`, `'a'`, `symbol`, `object`, `Function`, `unknown[]` and `[]`:

- `extends<R>()` and `extends_*` — the result of `T extends X`
- `union<R>()` and `union_*` — the type `T | X`
- `intersect<R>()` and `intersect_*` — the type `T & X`

Remove the `inspect` call once you have your answer; it is a development aid, not a test.

## stub

```ts
function stub<T extends AnyFunction>(stub: T): T
function stub<T>(stub: RecursivePartial<NoInfer<T>>): T
```

Produce a value typed as `T` while only supplying the parts your test uses. Functions pass through as-is.

```ts
import { stub } from 'type-plus'

type User = { id: string; name: string; profile: { email: string } }

const user = stub<User>({ name: 'Alice' })
user.name // string
```

### stub.builder and stub.build

`stub.builder<T>(init)` returns a builder with `.with(init)` to layer on more partials or handler
functions, and `.create()` to produce the final stub factory. `stub.build<T>(init)` is the shorthand for
`stub.builder<T>(init).create()`.

```ts
const b = stub.builder<{ a: number; b: string }>({ a: 1 }).with({ b: 'b' }).create()

b({ a: 2 }) // { a: 2, b: 'b' }
```

Object initializers are deep-merged onto the accumulated stub; function initializers receive the
accumulated stub and return the next one.
