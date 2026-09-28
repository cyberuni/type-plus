---
'type-plus': minor
---

Name the check, the actual type and the expected type when an immediate `testType` check fails.

`testType.equal<string, number>(true)` failed with `Argument of type 'true' is not assignable to parameter of type 'false'`.
It now fails with `... parameter of type 'false | Failed<"equal", string, number>'`, the same `testType.Failed` a `testType.defer` check reports.
Checks are called the same way. The new `testType.Expectation` type is the `expected` parameter of every immediate check, including `testType.property`, `testType.callableWith`, `testType.constructibleWith` and the checks `testType.of(value)` returns.
