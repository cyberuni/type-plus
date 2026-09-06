---
'type-plus': patch
---

Remove the unreferenced half of the legacy `src/**/readme.md` documentation
tree, and the stale root `info.md`.

These are v6/v7-era pages documenting an API that no longer exists — for
example `src/numeric/readme.md` still described `Positive<T>`, `Negative<T>`,
`Integer<T>`, `IsWhole<T>` and a `NumericType<T, Then, Else>` signature, none
of which the package exports any more. `src` is listed in `files`, so they were
shipping in the tarball; 13 of the 33 are gone from it now.

Nothing was lost. The explanation that only lived in these pages was ported to
the documentation site first: branch-option composition, `$Special`, `$Error` /
`$InferError` and the `$Type` brand moved onto the *type branching* page, and
`Equal` — previously undocumented on the site — gained an *Equality* page
carrying the one-level intersection caveat.

The remaining 20 pages stay for now: `packages/type-plus/readme.md` links into
them 122 times, so they cannot be removed without rewriting the published
readme.
