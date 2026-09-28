---
'type-plus': minor
---

Add `ArrayPlus.Join`, the type-level `Array.prototype.join`. It joins a tuple into a string and is the inverse of `StringPlus.Split`.

```ts
type R = ArrayPlus.Join<['a', 'b', 'c']> // 'a,b,c'
type R = ArrayPlus.Join<['a', 'b', 'c'], '/'> // 'a/b/c'
```
