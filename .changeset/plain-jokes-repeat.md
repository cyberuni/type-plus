---
'type-plus': patch
---

Document the last 30 exports with no TSDoc, give every family a page on the
site, and pin the examples of the eleven families that had no pin file.

Closes #669. `pnpm docs:llms --undocumented` now reports `0 of 273`.

The 30 fall into two kinds. Eight are the `*Plus` namespace re-exports —
`ArrayPlus`, `NumberPlus`, `NumericPlus`, `TuplePlus`, `StringPlus` and the
`B` / `Bit` pair — which are containers, so each gets one comment saying what
it groups, how it differs from the same names on the top-level surface, and
that its members carry their own docs. The other 22 are ordinary API and get
prose plus a pinned example: the JSON types, `nominalMatch`, `isPromise`,
`mapSeries`, `DropNull` / `DropNullable` / `DropUndefined`, `ToTuple`,
`as` / `asAny`, `TypePlusOptions`, `AnyConstructor`, `AnyFunction`, `ChainFn`,
`ContextBaseShape`, `ContextBuilder`, `SystemErrors` and `SystemErrorCodes`.

The five families with no page on the site are resolved. `src/binary/` folds
into Boolean and Logical, next to the boolean operators it mirrors, and
`src/class/` folds into Function and Functional, since a class is a constructor
function. `src/nodejs/`, `src/utils/` and the root files get pages of their own:
Node.js, Utilities, and Type Sets and JSON. `llms.txt` no longer carries an
"Undocumented families" bullet.

Every `@example` in the eleven families that had no `*_docs.spec.ts` is now
pinned with `testType.equal`, the pattern from #662, so the claim `llms.txt`
makes about those families is true rather than approximate. That surfaced
thirteen documented claims that the compiler disagrees with, corrected here:

- `FindFirst<[true, number | string], string>` is `string`, not
  `string | undefined`; `FindFirst<Array<1 | 2 | 'x'>, number>` is `1 | 2`, not
  `1 | 2 | undefined`; `FindFirst<Array<string | number>, number>` is `number`,
  not `number | undefined`. Same three for `ArrayPlus.Find`.
- The root cause of those six: `FindFirst` documented its options as
  `$noMatch` and `$unionMiss` defaulting to `undefined`. The real names are
  `$notMatch` and `$unionNotMatch`, and both default to `never`.
- `KeepMatch<[1, 2, 3], number>` is `[1, 2, 3]`. Nothing is dropped, all three
  are numbers.
- `FindLast`'s two examples were written as `ArrayPlus.Find<...>`, a different
  type that rejects tuples. The claimed results were right; the symbol was not.
- `IsNotFunction<Function | 1, { distributive: false }>` is `true`, not
  `false`, and its `$Branch` example had `$Then` and `$Else` the wrong way
  round — `Function` is a function, so `IsNotFunction` takes the else branch.
- `ExtractFunction`'s example was not valid TypeScript. It is
  `ExtractFunction<(() => void) & { a: 1 }>`.
- `NoInfer` documented `assertEqual({ x: 1 }, { x: 1, y: 2 })` as an error. It
  compiles.
- `EitherOrBoth`'s own example called it by its deprecated name, `EitherAnd`.

`IsFunction` and `IsNotFunction` also still referred to `$SelectionBranch`,
retired in v8, in place of their own `$Branch`. Twenty-four other files still
do; they belong to families outside this change.

Two generator fixes back the count. `export * as X from './x.js'` aliases a
*module* symbol, whose file-level doc comment TypeScript does not surface
through `getDocumentationComment`, so eight namespaces were reported
undocumented no matter what was written on them; the generator now reads that
comment. And the coverage sentence used to say "the rest have a name and a
signature only" when the rest were the `unpartial` re-exports, documented in
that package.
