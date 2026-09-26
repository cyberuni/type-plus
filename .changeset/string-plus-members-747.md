---
'type-plus': minor
---

Add the type-level forms of more `String.prototype` methods to `StringPlus`:

- `StringPlus.StartsWith` and `StringPlus.EndsWith`: predicates shaped like `StringPlus.Includes`, with `$then`/`$else`, `selection: 'filter'` and the `$Branch` selectors.
- `StringPlus.Replace` and `StringPlus.ReplaceAll`: replace the first or every occurrence of a string pattern.

```ts
type R = StringPlus.StartsWith<'abc', 'ab'> // true
type R = StringPlus.ReplaceAll<'a.b.c', '.', '/'> // 'a/b/c'
```
