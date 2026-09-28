---
'type-plus': minor
---

Add `Quotient` and `Remainder`, integer division on `number` and `bigint` literals, also available as `MathPlus.Quotient` and `MathPlus.Remainder`.

`Quotient<-7, 2>` is `-3`: it truncates toward zero, as `bigint` division does at runtime.
`Remainder<-7, 2>` is `-1`: it takes the sign of the dividend, as `%` does.
A fractional input or a zero divisor resolves to `$fail` (`never` by default).
