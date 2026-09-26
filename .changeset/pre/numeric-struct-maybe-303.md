---
'type-plus': patch
---

`Add`, `Subtract` and `Multiply` now pass a failed input through the internal
`NumericStruct` operations instead of unwrapping each input first (#303). The
results are unchanged, including every `Fail` result and the results for union
inputs.
