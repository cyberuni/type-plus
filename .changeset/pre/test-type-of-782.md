---
'type-plus': minor
---

Add `testType.of(value)`, which checks the type of a value without naming a variable and writing `typeof`.
It returns a `testType.Subject<T>` holding every `testType` check with the subject bound to the type of `value`.

```ts
testType.of([1, 2].map(String)).equal<string[]>(true)
testType.of('a' as const).string<{ exact: true }>(false)
```

An inline literal widens as in any generic call, so write `as const` to keep it narrow.
