# null

`null` is one of the two primitive values in JavaScript to represent the absence of a value.

Most of the time it is used when working with objects from JSON.

## [IsNull](./is_null.ts)

`IsNull<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `null`.

```ts
type R = IsNull<null> // true

type R = IsNull<never> // false
type R = IsNull<unknown> // false
type R = IsNull<string | boolean> // false

type R = IsNull<string | null> // boolean
```

🔢 *customize*

Filter to ensure `T` is `null`, otherwise returns `never`.

```ts
type R = IsNull<null, { selection: 'filter' }> // null

type R = IsNull<never, { selection: 'filter' }> // never
type R = IsNull<unknown, { selection: 'filter' }> // never
type R = IsNull<string | boolean, { selection: 'filter' }> // never

type R = IsNull<string | null> // null
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNull<null | 1> // boolean
type R = IsNull<null | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNull<null, $SelectionBranch> // $Then
type R = IsNull<string, $SelectionBranch> // $Else
```

## [IsNotnull](./is_not_null.ts)

`IsNotnull<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `null`.

```ts
type R = IsNotnull<null> // false

type R = IsNotnull<never> // true
type R = IsNotnull<unknown> // true
type R = IsNotnull<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not `null`, otherwise returns `never`.

```ts
type R = IsNotnull<null, { selection: 'filter' }> // never

type R = IsNotnull<never, { selection: 'filter' }> // never
type R = IsNotnull<unknown, { selection: 'filter' }> // unknown
type R = IsNotnull<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotnull<null | 1> // boolean
type R = IsNotnull<null | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotnull<string, $SelectionBranch> // $Then
type R = IsNotnull<null, $SelectionBranch> // $Else
```

## [HasNull](./has_null.ts)

`HasNull<T, { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `null` or an union with `null`.

```ts
type R = HasNull<null> // true
type R = HasNull<null | 1> // true

type R = HasNull<number> // false
```

🔢 *customize*

Filter to ensure `T` is `null` or an union with `null`, otherwise returns `never`.

```ts
type R = HasNull<null, { selection: 'filter' }> // null
type R = HasNull<null | 1, { selection: 'filter' }> // null | 1

type R = HasNull<number, { selection: 'filter' }> // never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = HasNull<null, $SelectionBranch> // $Then
type R = HasNull<string, $SelectionBranch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-null
