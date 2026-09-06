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

`any`, `unknown`, `never` and `equal` take no options — none of the types behind them has a
distributive or exact dimension. (`Equal.$Options` is `$Selection.$BaseOptions`: branch overrides
only.)

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
