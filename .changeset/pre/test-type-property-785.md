---
'type-plus': minor
---

Add `testType.property<T, K>(expected)`, which checks that type `T` has the key `K`.
It is `testType.true<HasKey<T, K>>(expected)` under a name, with a deferred form and a `testType.of(value).property<K>()` counterpart.

```ts
testType.property<{ a?: 1 }, 'a'>(true)
testType.property<{ a: 1 }, 'a' | 'b'>(false) // every key in `K` must be present
testType.of({ a: 1 }).property<'a'>(true)
```
