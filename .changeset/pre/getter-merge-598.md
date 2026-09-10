---
'type-plus': patch
---

Fix `Merge` and `ObjectPlus.Merge` dropping `readonly` when the two types are disjoint.

`{ ...a, ...b }` copies property values onto a fresh object, so the result is always
writable. The disjoint fast path returned `A & B` unchanged, which kept `readonly` from
either side. Because a get-only accessor is a `readonly` property, that made a getter
merge in as a read-only property instead of a plain data property:

```ts
type R = Merge<{ get config(): ResolvedConfig }, { a: string }>
// was: { readonly config: ResolvedConfig } & { a: string }
// now: { config: ResolvedConfig; a: string }
```

Closes [#598](https://github.com/unional/type-plus/issues/598).
