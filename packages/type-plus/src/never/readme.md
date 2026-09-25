# never

`never` is a bottom type in TypeScript.
That means it is a subtype of all other types.

## [IsNever](./is-never.ts)

`IsNever<T, $Options = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `never`.

```ts
type R = IsNever<never> // true

type R = IsNever<1> // false
```

🔢 *customize*

Filter to ensure `T` is `never`, otherwise returns `$NotNever`.

Filter normally returns `never` in the `$else` clause.
But since we are checking for `never` here,
we have to return `$NotNever` instead.

```ts
type R = IsNever<never, { selection: 'filter' }> // never

type R = IsNever<1, { selection: 'filter' }> // $NotNever
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNever<never, IsNever.$Branch> // $Then
type R = IsNever<1, IsNever.$Branch> // $Else
```

### [IsNotNever](./is-not-never.ts)

`IsNotNever<T, $Options = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` not `never`.

```ts
type R = IsNotNever<1> // true

type R = IsNotNever<never> // false
```

🔢 *customize*

Filter to ensure `T` is not `never`, otherwise returns `$Never`.

Filter normally returns `never` in the `$else` clause.
But since we are checking for `never` here,
we have to return `$Never` instead.

```ts
type R = IsNotNever<1, { selection: 'filter' }> // 1

type R = IsNotNever<never, { selection: 'filter' }> // $Never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotNever<never, IsNotNever.$Branch> // $Else
type R = IsNotNever<1, IsNotNever.$Branch> // $Then
```

## [$Never](../$type/special/$never.ts)

`$Never` is a special branch type to indicate the type is `never`.

It is used in [`IsNotNever`](#isnotnever).

## [$Never.$Options](../$type/special/$never.ts)

🧰 *type util*

`$NeverOptions` enables customizing the behavior of the `$never` branch.

The `$never` branch is used to handle when the input type is `never`.

```ts
type YourType<
  T,
  $Options extends YourType.$Options = YourType.$Default
> = ...

namespace YourType {
  export type $Options = $NeverOptions
  export type $Default = $NeverDefault
  export type $Branch = $NeverBranch
}
```

## [$Never.$Branch](../$type/special/$never.ts)

🧰 *type util*

`$NeverBranch` is the branch option for the `$never` branch.

It sets the value to [`$Never`](#never-1),
so that the branch can be uniquely identified and handled.

Use this to allow the consumer to customize the behavior of your type.

```ts
namespace YourType {
  export interface $Options extends $Never.$Options, IsString.$Options {}
}

type YourType<T, $O extends $StrictOptions<$O, YourType.$Options> = {}> =
  IsNever<T, { $then: $Never; $else: $Else }> extends infer R
    ? R extends $Never
      ? $ResolveOptions<[$O['$never'], never]>
      : IsString<T, $ForwardOptions<$O, IsString.$Options>>
    : never

type R = YourType<T, $Never.$Branch> extends $Never ? HandleNever : HandleOthers
```

`$StrictOptions` rejects option keys `YourType` does not declare.
`$O` is generic inside `YourType`, so it cannot go to `IsString` as is:
`$ForwardOptions` keeps only the keys `IsString` accepts, dropping `$never`.
See [Unknown option keys and generic wrappers](https://cyberuni.github.io/type-plus/guides/strict-options/).

## [$Never.$Default](../$type/special/$never.ts)

🧰 *type util*

`$NeverDefault` is the default option for the `$never` branch.

Unsurprisingly, defaulting `$never` to `never`.

## [$NotNever](../$type/special/$never.ts)

`$NotNever` is a special branch type to indicate the type is not `never`.

It is used in [`IsNever`](#isnever).

## References

- [Handbook]
- [TypeScript Deep Dive][deep_dive]

[deep_dive]: https://basarat.gitbook.io/typescript/type-system/never
[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#never
