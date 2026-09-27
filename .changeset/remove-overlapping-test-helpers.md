---
'type-plus': major
---

Remove the helpers that overlapped `testType`, so `testType` is the one assertion API:

- `canAssign<T>()(v)`: use `testType.canAssign<typeof v, T>(true)` in a test, or `v satisfies T`.
  `canAssign<T>(false)(v)` becomes `testType.canAssign<typeof v, T>(false)`.
- The one-argument `isType<T>(v)`: use `v satisfies T`. It narrowed nothing.
  `isType(subject, validator)` is a runtime type guard and stays.
