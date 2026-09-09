# `any`

The `any` type is one of the two top types in TypeScript.
It is a super-type of all types.
It is a way to opt-out of type checking and let the values pass through compile-time checks.

## [`IsAny`](./is_any.ts)

```ts
IsAny<T, $O = {
	selection: 'predicate' | 'filter' = 'predicate',
	$then: unknown = true,
	$else: unknown = false,
	$unknown: unknown,
	$never: unknown,
	$void: unknown
}>
```

🎭 **predicate**

Validate if `T` is `any`.

```ts
type R = IsAny<any> // true

type R = IsAny<never> // false
type R = IsAny<unknown> // false
type R = IsAny<string | boolean> // false
```

🌪️ **filter**

Filter to ensure `T` is `any`.

```ts
type R = IsAny<any, { selection: 'filter' }> // any
type R = IsAny<never, { selection: 'filter' }> // never
type R = IsAny<unknown, { selection: 'filter' }> // never
type R = IsAny<string | boolean, { selection: 'filter' }> // never
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsAny<any, $Selection.Branch> // $Then
type R = IsAny<string, $Selection.Branch> // $Else
type R = IsAny<unknown, IsAny.$Branch> // $Unknown
type R = IsAny<never, IsAny.$Branch> // $Never
type R = IsAny<void, IsAny.$Branch> // $Void
```

### [`IsNotAny`](./is_not_any.ts)

`IsNotAny<T, $O = { selection: 'predicate' | 'filter', $then: true, $else: false }>`

🎭 **predicate**

Validate if `T` is not exactly `any`.

```ts
type R = IsNotAny<any> // false

type R = IsNotAny<never> // true
type R = IsNotAny<unknown> // true
type R = IsNotAny<string | boolean> // true
```

🌪️ **filter**

Filter to ensure `T` is not exactly `any`.

```ts
type R = IsNotAny<any, { selection: 'filter' }> // never

type R = IsNotAny<never, { selection: 'filter' }> // never
type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
```

🔱 **branching**

Use unique branch identifiers to allow precise processing of the result.

```ts
type R = IsNotAny<any, IsNotAny.$Branch> // $Else
type R = IsNotAny<string, IsNotAny.$Branch> // $Then
```

## Trivia

> Both `any` and `unknown` are top types?

Well, yeah:

```ts
type A = any extends unknown ? true : false // true
type B = unknown extends any ? true : false // true
```

> Aren't using `any` is bad?

If you use it to simply tell TypeScript to shut up because you are lazy, then yes.

But it is ok to use `any` in many cases, as the type system of TypeScript is not sounded.

There are many cases it is not possible to induce the type correctly.

## References

- [handbook]

[handbook]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any
