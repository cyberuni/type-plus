# undefined

`undefined` is one of the two primitive values in JavaScript to represent the absence of a value.

## [IsUndefined](./is_undefined.ts)

`IsUndefined<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `undefined`.

```ts
type R = IsUndefined<undefined> // true

type R = IsUndefined<never> // false
type R = IsUndefined<unknown> // false
type R = IsUndefined<string | boolean> // false

type R = IsUndefined<string | undefined> // boolean
```

🔢 *customize*

Filter to ensure `T` is `undefined`, otherwise returns `never`.

```ts
type R = IsUndefined<undefined, { selection: 'filter' }> // undefined

type R = IsUndefined<never, { selection: 'filter' }> // never
type R = IsUndefined<unknown, { selection: 'filter' }> // never
type R = IsUndefined<string | boolean, { selection: 'filter' }> // never

type R = IsUndefined<string | undefined> // undefined
```

🔢 *customize*:

Disable distribution of union types.

```ts
type R = IsUndefined<undefined | 1> // boolean
type R = IsUndefined<undefined | 1, { distributive: false }> // false
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsUndefined<undefined, IsUndefined.$Branch> // $Then
type R = IsUndefined<string, IsUndefined.$Branch> // $Else
```

## [IsNotUndefined](./is_not_undefined.ts)

`IsNotUndefined<T, { distributive: true, selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is not `undefined`.

```ts
type R = IsNotUndefined<undefined> // false

type R = IsNotUndefined<never> // true
type R = IsNotUndefined<unknown> // true
type R = IsNotUndefined<string | boolean> // true
```

🔢 *customize*

Filter to ensure `T` is not `undefined`, otherwise returns `never`.

```ts
type R = IsNotUndefined<undefined, { selection: 'filter' }> // never

type R = IsNotUndefined<never, { selection: 'filter' }> // never
type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
```

🔢 *customize*

Disable distribution of union types.

```ts
type R = IsNotUndefined<undefined | 1> // boolean
type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotUndefined<string, IsNotUndefined.$Branch> // $Then
type R = IsNotUndefined<undefined, IsNotUndefined.$Branch> // $Else
```

## [HasUndefined](./has_undefined.ts)

`HasUndefined<T, { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 *predicate*

Validate if `T` is `undefined` or an union with `undefined`.

```ts
type R = HasUndefined<undefined> // true
type R = HasUndefined<undefined | 1> // true

type R = HasUndefined<number> // false
```

🔢 *customize*

Filter to ensure `T` is `undefined` or an union with `undefined`, otherwise returns `never`.

```ts
type R = HasUndefined<undefined> // undefined
type R = HasUndefined<undefined | 1> // undefined | 1

type R = HasUndefined<number> // never
```

🔢 *customize*

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = HasUndefined<undefined, $Selection.Branch> // $Then
type R = HasUndefined<string, $Selection.Branch> // $Else
```

## References

- [Handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#null-and-undefined
