# unknown

`unknown` is one of the top types in TypeScript.
It is a "safer" variant of `any` that you cannot use the value until there are some type guards or type assertions to the value.

`unknown | T => unknown` except `unknown | any => any.

`unknown & T => T`

## [IsUnknown](./is_unknown.ts)

`IsUnknown<T, $Options = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is exactly `unknown`.

```ts
type R = IsUnknown<unknown> // true

type R = IsUnknown<number> // false
type R = IsUnknown<never> // false
```

🔢 *customize*

Filter to ensure `T` is exactly `unknown`.

```ts
type R = IsUnknown<unknown, { selection: 'filter' }> // unknown

type R = IsUnknown<number, { selection: 'filter' }> // never
type R = IsUnknown<never, { selection: 'filter' }> // never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsUnknown<unknown, IsUnknown.$Branch> // $Then
type R = IsUnknown<string, IsUnknown.$Branch> // $Else
```

### [IsNotUnknown](./is_not_unknown.ts)

`IsNotUnknown<T, $Options = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not exactly `unknown`.

```ts
type R = IsNotUnknown<unknown> // false

type R = IsNotUnknown<number> // true
type R = IsNotUnknown<never> // true
```

🔢 *customize*

Filter to ensure `T` is not exactly `unknown`.

```ts
type R = IsNotUnknown<unknown, { selection: 'filter' }> // never

type R = IsNotUnknown<number, { selection: 'filter' }> // number
type R = IsNotUnknown<never, { selection: 'filter' }> // never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotUnknown<unknown, IsNotUnknown.$Branch> // $Else
type R = IsNotUnknown<string, IsNotUnknown.$Branch> // $Then
```

### [NotUnknownOr](./not_unknown_or.ts)

`NotUnknownOr<T, Else>`

🌪️ *filter*

Returns `T` if `T` is not `unknown`, otherwise `$Unknown`.

```ts
type R = NotUnknownOr<number> // number
type R = NotUnknownOr<unknown> // $Unknown

// customize
type R = NotUnknownOr<unknown, number> // number
```

🔢 *customize*

Replace `unknown` branch with `Replace`.

```ts
type R = NotUnknownOr<unknown, number> // number
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown
