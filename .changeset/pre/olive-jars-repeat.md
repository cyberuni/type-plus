---
'type-plus': patch
---

Document the 9 undocumented exports in `src/math/`.

Every `@example` is pinned by a compiled assertion in
`src/math/math_docs.spec.ts`, so an example that drifts from the
implementation fails to build.

The edges these types were missing documentation for are the ones a caller
cannot guess:

- `GreaterThan` and `Max` accept `bigint` in their constraint but resolve to
  `Fail` for every `bigint` argument.
- Arithmetic on fractional literals whose result is a whole number resolves to
  an error string rather than a number.
- `Add`, `Subtract` and `Multiply` are exact decimal, so `Add<0.1, 0.2>` is
  `0.3` where the runtime gives `0.30000000000000004`.
- Nothing guards overflow past `Number.MAX_SAFE_INTEGER`.
