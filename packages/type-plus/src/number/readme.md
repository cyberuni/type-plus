# number

## [IsNumber](./is_number.ts)

`IsNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `number` or `number` literals.

```ts
type R = IsNumber<number> // true
type R = IsNumber<1> // true

type R = IsNumber<never> // false
type R = IsNumber<unknown> // false
type R = IsNumber<string | boolean> // false

type R = IsNumber<string | number> // boolean
```

🔢 *customize*

Filter to ensure `T` is `number` or `number` literals, otherwise returns `never`.

```ts
type R = IsNumber<number, { selection: 'filter' }> // number
type R = IsNumber<1, { selection: 'filter' }> // 1

type R = IsNumber<never, { selection: 'filter' }> // never
type R = IsNumber<unknown, { selection: 'filter' }> // never
type R = IsNumber<string | boolean, { selection: 'filter' }> // never

type R = IsNumber<string | number> // number
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsNumber<number | 1> // boolean
type R = IsNumber<number | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNumber<number, IsNumber.$Branch> // $Then
type R = IsNumber<string, IsNumber.$Branch> // $Else
```

### Exact match

The strict forms are options rather than separate types. Pass `{ exact: true }` to accept only the
wide `number` type and reject number literals:

```ts
type R = IsNumber<number, { exact: true }> // true
type R = IsNumber<1, { exact: true }> // false

type R = IsNumber<number, { exact: true, selection: 'filter' }> // number
type R = IsNumber<1, { exact: true, selection: 'filter' }> // never
```

## [IsNotNumber](./is_not_number.ts)

`IsNotNumber<T, { distributive: true, selection: 'predicate' | 'filter', $then: false, $else: true }>`

🎭 *predicate*

Validate if `T` is not `number` nor `number` literals.

```ts
type R = IsNotNumber<number> // false
type R = IsNotNumber<1> // false

type R = IsNotNumber<never> // true
type R = IsNotNumber<unknown> // true
type R = IsNotNumber<string | number> // boolean
```

🔢 *customize*

Filter to ensure `T` is not `number` nor `number` literals, otherwise returns `never`.

```ts
type R = IsNotNumber<number, { selection: 'filter' }> // never
type R = IsNotNumber<1, { selection: 'filter' }> // never

type R = IsNotNumber<never, { selection: 'filter' }> // never
type R = IsNotNumber<unknown, { selection: 'filter' }> // unknown
type R = IsNotNumber<string | 1, { selection: 'filter' }> // string
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotNumber<number | 1> // boolean
type R = IsNotNumber<number | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotNumber<string, IsNotNumber.$Branch> // $Then
type R = IsNotNumber<number, IsNotNumber.$Branch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean
