---
'type-plus': patch
---

Correct the `src/**/readme.md` pages, which documented a v7 API that no longer exists.

#667 deleted 13 of the 33 legacy readme pages because nothing linked to them. The surviving 20 are
linked from `packages/type-plus/readme.md` — the npm landing page — and nothing stopped them
drifting the same way. They had: **40 of their 117 source links pointed at files deleted in the v8
rewrite**, and the prose around them documented types that are no longer exported.

Replaced with the types that exist, each verified against the compiler:

- `StringType` / `StrictStringType` / `IsStrictString` and their negations →
  `IsString<T, { selection: 'filter' }>` and `{ exact: true }`.
- `FunctionType` / `StrictFunctionType` and their negations → `IsFunction` / `IsStrictFunction`.
- `ObjectType`, `SymbolType`, `TupleType`, `ArrayType`, `AnyOrNeverType` and their negations →
  `IsObject`, `IsSymbol`, `IsTuple`, `IsAnyOrNever`.
- `IsStrictNumber` and `IsStrictBoolean` → the `{ exact: true }` option on `IsNumber` and
  `IsBoolean`.
- The retired `$SelectionBranch` → each type's own `$Branch`, or `$Selection.Branch` for the `Has*`
  family, which has no namespace of its own.
- `$NeverOptions` / `$NeverBranch` / `$NeverDefault` → the `$Never.*` members that replaced them.

Two claims were wrong on their own terms rather than merely outdated:
`IsStrictFunction<Function & { a: 1 }>` was documented as `never`; the intersection collapses to
`Function`, so it is `true`. And `src/null/readme.md` documented a type called `IsNotnull`.

Also fixes three broken links: `./array.find_last.tsl19` (missing `#`), `./array.concat.ts`
(the file is `array_plus.concat.ts`), and `./src/mix-types/readme.md` on the npm landing page
(the directory is `mix_types`).

`src/readme_docs.spec.ts` now pins every example on these pages with `testType.equal`, so the same
drift fails to compile next time.
