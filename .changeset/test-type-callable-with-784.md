---
'type-plus': minor
---

Add `testType.callableWith` and `testType.constructibleWith`, which check that a function can be called, or a class constructed with `new`, with a list of argument types.
The check passes when one of the overloads accepts the arguments, which `equal` on `Parameters<F>` cannot express because it keeps only the last overload.

```ts
function f(value: string): string
function f(value: number, radix: number): string

testType.callableWith<typeof f, [string]>(true)
testType.callableWith<typeof f, [number]>(false)
testType.constructibleWith<DateConstructor, [number, number]>(true)
```

Both are also available on `testType.of(value)` and `testType.defer`.
