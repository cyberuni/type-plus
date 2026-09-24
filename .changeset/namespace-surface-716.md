---
'type-plus': minor
---

Tidy the namespace surface. Nothing is removed; the losing names are deprecated and will go in a
later major.

- `Bit` is the one name for the bit namespace. `B` is deprecated: it is the name type parameters are
  most often given (`And<A, B>`), so a type parameter `B` shadows the namespace inside any generic that
  declares one. Replace `B.And` with `Bit.And`.
- `NumberPlus` is deprecated in favor of `NumericPlus`. It held the same members plus `IsNumber` and
  `IsNotNumber`, which are on the top level. Replace `NumberPlus.IsInteger` with
  `NumericPlus.IsInteger`, and `NumberPlus.IsNumber` with `IsNumber`.
- `MathPlus` now holds every math type: `Abs`, `GreaterThan` and `Max` join `Add`, `Decrement`,
  `Increment`, `Multiply`, `Subtract` and `ToNegative`.
- `KeepMatch`, `PropUnion` and `MapToProp` are deprecated. Use `Filter`, `UnionOfProps` and
  `IntersectOfProps`, the same types under their primary names.
- The `ArrayPlus` and `TuplePlus` TSDoc now lists what each namespace exports.
