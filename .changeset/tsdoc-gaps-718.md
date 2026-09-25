---
'type-plus': patch
---

Fill TSDoc and `@example` gaps on public exports.

Newly documented: `ArrayPlus.PadStart`, `stub.build` and `stub.builder`.
The `ArrayPlus.Reverse` doc comment was a plain `/*` comment and did not show up in the `.d.ts`; it now does.
`stub.build` and `stub.builder` carry their TSDoc on a merged `stub` namespace, because the `.d.ts` emit dropped it from the expando assignments.

Added `@example`s to `At`, `Tail`, `UnionKeys`, `UnionOfValues`, `SubUnion`, `Widen`, `Partial`, `PartialPick`, `PartialOmit`, `Pick`, `Omit`, `OptionalProps`, `ExtractFunction`, `ExcludePropType`, `KeyTypes`, `AdjustExactOptionalProps`, `RecursiveIntersect`, `And`, `Or`, `Not`, `Xor`, `Brand`, `Flavor`, `StringToNumber`, `StringToBigint`, `StringToNumeric`, `NumericToString`, and the `$Any`, `$Never`, `$Unknown` and `$Void` markers, whose examples were pseudo-code before.
A `testType.equal` in each symbol's spec pins every example.

Fixed two wrong examples: the `selection: 'filter'` example of `HasUndefined` left out the option, and one `PadStart` line said it showed an ignored `MaxLength` but showed padding.
