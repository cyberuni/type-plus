---
'type-plus': patch
---

Accept a type function (`$Fn`) in `ArrayPlus.Filter`, and so in `Filter` and `KeepMatch` on an array.

`Filter<Array<1 | { a: 1 }>, IsObject.$Fn>` returned `never[]`, because `ArrayPlus.Filter` compared the element type against the function with `extends`.
It now keeps the members of the element type that the function returns `true` for (`Array<{ a: 1 }>`), and returns `never[]` when the function matches none of them.
