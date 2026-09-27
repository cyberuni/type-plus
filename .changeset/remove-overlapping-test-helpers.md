---
'type-plus': major
---

Remove `canAssign()` and the one-argument `isType<T>(v)`. Neither checked anything at runtime.
`testType` is the testing API for types; in code, use `satisfies`.

| Removed | In a test | In code |
| --- | --- | --- |
| `canAssign<T>()(v)` | `testType.canAssign<typeof v, T>(true)` | `v satisfies T` |
| `canAssign<T>(false)(v)` | `testType.canAssign<typeof v, T>(false)` | |
| `isType<T>(v)` | `testType.canAssign<typeof v, T>(true)` | `v satisfies T` |

`isType(subject, validator)` is a runtime type guard and stays.
