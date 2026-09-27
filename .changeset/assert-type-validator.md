---
'type-plus': minor
---

Add `assertType(subject, validator, message?)`, the throwing counterpart of `isType()` for pre- and post-conditions.
It throws a `TypeError` unless `validator` passes, and narrows `subject` to `T` after the call.

```ts
assertType<string>(value, (v) => typeof v === 'string', 'value must be a string')
value // string
```

The validator is required. Unlike the `assertType` removed earlier in 8.0, it has no no-validator overload and no `isX` members.
