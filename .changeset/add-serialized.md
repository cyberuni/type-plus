---
"type-plus": minor
---

Add `Serialized` and `Deserialized`, which carry a value's type through a string so a two-line wrapper gives `JSON` or flatted a typed round trip.

`Serialized<T, { circular: true }>` tags a format that keeps circular references, such as flatted's, and does not mix with plain JSON either way.
