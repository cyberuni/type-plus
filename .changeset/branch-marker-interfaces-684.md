---
'type-plus': major
---

Make the branch markers named interfaces, and declare every predicate's `$Options` as an interface.

`$Then`, `$Else`, `$Any`, `$Unknown`, `$Never`, `$NotNever` and `$Void` were string subtypes built
on `$Type`. They are now interfaces extending `$Branch`, which carries the branch name in a
namespaced string key:

```ts
export interface $Branch<P extends `$${string}`> {
	readonly '~type-plus/branch': P
}
export interface $Then extends $Branch<'$then'> {}
```

Markers print by name in hovers and errors, are no longer strings, and stay distinct from each other:

```ts
const a: $Then = 1
// was: Type '1' is not assignable to type '$<"branch", "$then"> & "$then"'.
// now: Type 'number' is not assignable to type '$Then'.

type R = IsString<$Then> // was true, now false
```

The `$Options` of each predicate (`IsObject.$Options`, `IsNever.$Options`, `Assignable.$Options`,
and 60 more) is now an `interface … extends …` instead of an intersection alias. Expanding one
now shows `$Options` instead of `$Selection.Options & … & $InputOptions<($<"branch", "$any"> & "$any") | …>`,
and each use costs 2 to 4 fewer type instantiations.

**Breaking** only for code that:

- reads `_$value` (or `$Type.$ValueKey`) on a marker — read `'~type-plus/branch'` instead, or match
  the marker with `extends`;
- relies on a marker being a string, such as `$Then extends string` or `$Then extends '$then'`.

Refs [#689](https://github.com/cyberuni/type-plus/issues/689).
Closes [#684](https://github.com/cyberuni/type-plus/issues/684).
