---
'type-plus': minor
---

Add `Slice<A, Start, End>`, also available as `ArrayPlus.Slice`: the type level `Array.prototype.slice()`.

It gets the section of an array or tuple from `Start` up to, but not including, `End`, with negative indices and out-of-bound clamping as `slice()` does: `Slice<[1, 2, 3], -2>` is `[2, 3]`.
