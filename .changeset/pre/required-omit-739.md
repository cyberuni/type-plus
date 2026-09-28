---
'type-plus': minor
---

Align `RequiredPick` and `RequiredExcept` with `PartialPick` and `PartialOmit` (#739).

- Add `RequiredOmit<T, U>`, and deprecate `RequiredExcept<T, U>` as an alias of it. `Omit` names the
  complement, as in `PartialOmit`.
- `RequiredPick` and `RequiredOmit` now constrain `U` to `UnionKeys<T>` instead of `keyof T`, so `U`
  may name a key of any member of a union `T`.
- Both now distribute over a union `T`. This changes the result for a union input:

  ```ts
  type U = { k: 'x'; a?: 1 } | { k: 'y'; a?: 2; b?: 3 }

  type R = RequiredPick<U, 'a'>
  // before: { a: 1 | 2 } & { k: 'x' | 'y' }
  // after:  ({ k: 'x' } & { a: 1 }) | ({ k: 'y'; b?: 3 } & { a: 2 })
  ```

  For a non-union `T`, the result has the same properties as before.
