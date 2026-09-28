---
'type-plus': patch
---

A whole-number result from fractional inputs is now a numeric literal.

`Add<1.5, 2.5>` is `4`, `Subtract<1.5, 0.5>` is `1` and `Multiply<0.5, 4>` is `2`.
Each used to resolve to an error string such as `"The value '4.0' cannot be represented as bigint or number"`.
`GreaterThan`, `GreaterThanOrEqual`, `LessThan`, `LessThanOrEqual`, `Max` and `Min` now compare a fractional pair whose difference is a whole number: `GreaterThan<1.5, 2.5>` is `false` instead of `never`.
