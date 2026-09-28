---
'type-plus': minor
---

Add `LessThan`, `GreaterThanOrEqual`, `LessThanOrEqual` and `Min`, and the matching `MathPlus` members.

They compare `number` literals and share the limits of `GreaterThan`: `bigint`, the wide `number`, and a fractional pair whose difference is a whole number resolve to `$fail` (`never` by default).
`GreaterThanOrEqual` and `LessThanOrEqual` return that `$fail` value as is, not negated, and are `true` for two identical `number` literals, including fractional ones such as `GreaterThanOrEqual<1.5, 1.5>`.

There is no `MathPlus.ToPositive`: `Abs` is that type.
