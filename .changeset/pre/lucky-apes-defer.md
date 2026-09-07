---
'type-plus': minor
---

Add `testType.defer` and `testType.assert` for deferred type testing.

A `testType.*` check asserts immediately: the expectation is an argument, so
the failure is reported where the check is written. That makes a check
impossible to extract into a reusable helper — the helper body is checked once,
against type parameters that are not yet resolved, so nothing there can pass or
fail.

`testType.defer.*` takes no argument and returns the result as a type instead.
A helper returns the results it collected, and `testType.assert()` checks them
at the call site, where the type parameters are resolved:

```ts
function testMyType<T>() {
	return [testType.defer.string<T>(), testType.defer.not.never<T>()]
}

it('blah', () => { testType.assert(testMyType<'a'>()) }) // passes
it('bruh', () => { testType.assert(testMyType<1>()) })   // fails here
```

`testType.assert()` accepts results in any shape a helper returns — a single
result, an array, an object, or any nesting of those. `testType.defer.not.*` is
the deferred form of passing `false`. Deferred checks take the same options as
their immediate counterparts, in the same position and merged over the same
defaults. Every check has a deferred form except `inspect`, which is a
development aid rather than a check.

A failing check resolves to `testType.Failed<Check, Actual, Expected>` rather
than a bare `false`, so the compiler error names the check that failed and the
types it compared.
