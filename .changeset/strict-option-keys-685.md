---
'type-plus': major
---

Reject unknown option keys.

Every type that takes an options parameter `$O` now constrains it with `$StrictOptions<$O, X.$Options>`.
A misspelled key used to compile whenever a valid key sat next to it. It is now an error that names the key and, for a prefix match, suggests the valid one:

```ts
type R = IsObject<{}, { distributive: false; exactt: true }>
// Type 'true' is not assignable to type '"'exactt' is not a valid option. Did you mean 'exact'?"'.

type R = IsNever<1, { $void: 'V'; $else: 'E' }>
// Type '"V"' is not assignable to type '"'$void' is not a valid option"'.
```

`testType` rejects unknown keys the same way.

New exports:

- `$StrictOptions<$O, A>`: the constraint, for your own types.
- `$ForwardOptions<$O, A, K>`: narrows a generic wrapper's `$O` to the keys `A` accepts, so the wrapper can pass it on.
- `$ErrorMessage<M>`: the message string type the constraint reports through.

**Breaking** for a generic type that passes its own `$O` to a type-plus type:

```ts
type Mine<T, $O extends IsObject.$Options = {}> = IsObject<T, $O>
// error TS2344: Type '$O' does not satisfy the constraint '$StrictOptions<$O, $Options>'.
```

Repeat the strict constraint when your type takes the same options,
or forward through `$ForwardOptions` when it takes its own:

```ts
type Mine<T, $O extends $StrictOptions<$O, IsObject.$Options> = {}> = IsObject<T, $O>

type Yours<T, $O extends $StrictOptions<$O, Yours.$Options> = {}> =
	IsObject<T, $ForwardOptions<$O, IsObject.$Options>>
```

Do not narrow with `$O extends $StrictOptions<$O, IsObject.$Options> ? IsObject<T, $O> : never` in a type with options of its own:
it answers `never` whenever one of those options is passed.

The constraint costs about 3 type instantiations per use without options and about 15 with options.
See the [migration guide](https://cyberuni.github.io/type-plus/guides/strict-options/).

Refs [#689](https://github.com/cyberuni/type-plus/issues/689).
Closes [#685](https://github.com/cyberuni/type-plus/issues/685).
