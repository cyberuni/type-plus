---
'type-plus': minor
---

Add `If.$Fn` and `ArrayPlus.IsIndexOutOfBound.$Fn`, so both can be passed to `Filter`, `Find`, `Some` and `DropMatch`.

`If.$Fn` sends an input that is not a `boolean` to `$else`.
`ArrayPlus.IsIndexOutOfBound.$Fn<A>` fixes the array and takes the index as its input; an input that is not a `number` goes to `$else`.
