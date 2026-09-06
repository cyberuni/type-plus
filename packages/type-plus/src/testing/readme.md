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
