---
'type-plus': patch
---

Document that `NumericToString` is the inverse of `StringToNumber`, `StringToBigint` and `StringToNumeric` alike, so the casts need no `NumberToString` or `BigintToString`.
`StringToNumber` and `StringToBigint` now say which strings they reject and point to `StringToNumeric` and `NumericToString`.
