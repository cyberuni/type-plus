# testing

This folder contains utilities for testing.

## `testType`

`testType` is a test utilities for types.

This is designed specifically for testing.
The return value is the input `expected` parameter asserted as the first type parameter,
so that the type can be further inspected.

```ts
import { testType } from 'type-plus'

testType.any<T>(true) // T is `any`
testType.equal<A, B>(true) // A is equal to B
testType.never<T>(false) // T is not `never`

const t = testType.equal<SomeComplexType, SomeCompositeType>(true)
type T = typeof t // type resolution
```

Each type check takes an optional second type parameter carrying the behavioral options of the
underlying `IsXXX` type (`testType.$Options` is `{ distributive?: boolean; exact?: boolean }`).
They are merged over the method's own defaults, so the no-options call form is unchanged.

```ts
import { testType } from 'type-plus'

testType.string<'a'>(true) // default: not exact
testType.string<'a', { exact: true }>(false) // opt into exact comparison
testType.array<[string], { exact: false }>(true) // `array` defaults to `exact: true`
testType.string<'a' | 1, { distributive: true }>(true) // distributes to `boolean`
```

## `testType.defer` and `testType.assert`

`testType.*` checks assert *immediately* — the expectation is an argument, so the failure is reported
where the check is written. That makes them impossible to extract into a reusable helper: the helper
body is checked once, against unresolved type parameters.

`testType.defer.*` takes no argument and returns the result as a type instead. Return the results from
the helper and hand them to `testType.assert()` at the call site, where the type parameters are
resolved and the failure belongs.

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

`testType.assert()` takes any number of results in any shape — a single result, an array, an object,
or any nesting of those — so a helper can return whatever reads best.

`testType.defer.not.*` is the deferred form of passing `false`:
`testType.defer.not.equal<A, B>()` mirrors `testType.equal<A, B>(false)`.

Deferred checks take the same options as their immediate counterparts:
`testType.defer.string<T, { exact: true }>()`.

A failing check resolves to `testType.Failed<Check, Actual, Expected>`, so the compiler error names the
check that failed along with the types involved.

Every `testType` check has a deferred form except `inspect`, which is a development aid rather than a
check.

## [testType.inspect](./test_type.ts)

`testType.inspect<T>(fn)`

A quick way to inspect a type.

```ts
import { testType } from 'type-plus'

testType.inspect<SomeType>(t => {
  type T = typeof t.type // type resolution
})
```

It also provides additional methods and predefined inspections so that you can quickly check how the type behaves in specific cases.

```ts
import { testType } from 'type-plus'

testType.inspect<SomeType>(t => {
  t.extends<AnotherType>() // true or false
  t.union<number>() // SomeType | number`
  t.intersect<string>() // `SomeType & string`
  t.extends_boolean // true or false
})
```
