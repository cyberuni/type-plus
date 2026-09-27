---
'type-plus': minor
---

Add `Divide`, `A / B` on `number` and `bigint` literals, also available as `MathPlus.Divide`.

A result that does not terminate is truncated toward zero to `precision` fractional digits, 16 by default: `Divide<1, 3>` is `0.3333333333333333`, the same literal as the runtime `1 / 3`.
Set another precision with `Divide<2, 3, { precision: 2 }>` (`0.66`).
When either input is a `bigint`, `Divide` is `Quotient`, since a `bigint` has no fractional values: `Divide<7n, 2n>` is `3n`.
A zero divisor resolves to `$fail` (`never` by default), as in `Quotient`.
