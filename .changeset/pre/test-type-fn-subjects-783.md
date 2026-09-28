---
'type-plus': minor
---

Add `parameters`, `returns` and `resolves` to `testType.Subject`, so `testType.of(value)` can check a function's parameters, its return type, or what a promise resolves to with any `testType` check.

```ts
testType.of((a: number) => String(a)).parameters.equal<[a: number]>(true)
testType.of((a: number) => String(a)).returns.equal<string>(true)
testType.of(async () => 1).returns.resolves.equal<number>(true)
```

On a subject that is not a function (or not a `PromiseLike` for `resolves`), the member is a `testType.Failed` with no checks, so a check on it fails to compile.
