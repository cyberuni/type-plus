---
'type-plus': minor
---

Add `IsNotAnyOrNever`, the negation of `IsAnyOrNever` (#749):

```ts
type R = IsNotAnyOrNever<any> // false
type R = IsNotAnyOrNever<never> // false
type R = IsNotAnyOrNever<1> // true
```
