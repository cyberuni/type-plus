---
'type-plus': patch
---

Document the 36 undocumented exports in `src/object/`.

Every `@example` is pinned by a compiled assertion in
`src/object/object_docs.spec.ts`, so an example that drifts from the
implementation fails to build.

Four of the newly documented types do not do what their names say. The
documentation records the behavior rather than changing it:

- `KnownKeys<T>` resolves to `never` for every `T` on every supported
  TypeScript version.
- `KeysOfOptional<T>` returns `keyof T` when every property is required, and
  `never` as soon as one is optional.
- `RecursiveRequired<T>` does not descend into optional properties.
- `hasKey()` and `hasProperty()` test truthiness rather than key presence, and
  `getField()` replaces any falsy value with the default.
