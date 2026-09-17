---
'type-plus': minor
---

Add `$Options`, `$Default` and `$Branch` to `HasNull`, `HasUndefined`, `HasVoid` and `IsAnyOrNever`, like the other predicates.

Their option errors now name `$Options`, as every other predicate's do, instead of `Options`. `HasNull.$Branch`, which the `HasNull` docs already used, now exists.
