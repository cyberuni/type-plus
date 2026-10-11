---
"type-plus": major
---

Let a later `stub.builder().with()` object win over an earlier initializer on the same key.

Before, a later `.with()` object only filled in keys the earlier initializers left unset, so `stub.builder({ a: 1 }).with({ a: 5 }).create()()` returned `{ a: 1 }`. It now returns `{ a: 5 }`. Objects are deep-merged, so nested keys a later object does not set are kept.

The partial stub passed to the created function still wins over every object initializer, and a function initializer still receives the stub so far and returns the next one.

Migration:
- If you relied on an earlier `.with()` value surviving a later one, reorder the `.with()` calls or drop the key from the later object.
