---
'type-plus': patch
---

Report a non-object options argument (`IsObject<T, string>`) as `Type 'string' has no properties in common with type '$Options'`, instead of listing every member of `string` as an unknown option.
