---
'type-plus': minor
---

Support TypeScript 5.4 and up.

The `typescript` peer range widens from `>= 5.6.0` to `>= 5.4.0`. Nothing in
the published types ever required 5.6 — the range was simply narrower than
what the compiler matrix tested. `verify:dts` now type-checks the emitted
`esm/index.d.ts` with 5.4, 5.5, 5.6 and 6.0, so the range is checked rather
than asserted.

The package is also now built with TypeScript 7 — one build, as before.
Emitted JavaScript is unchanged; the declarations differ only in how the
compiler renders them.
