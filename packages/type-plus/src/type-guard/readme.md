# Type Guard

[User-defined type guard functions][type_guard] is a function which its return type is specified as `x as T`.

It is introduced in TypeScript 1.6.

For example:

```ts
function isBool(x: unknown): x is boolean {
  return typeof x === 'boolean';
}
```

## isType

🗑️ **removed in 8.0.0**: the one-argument form `isType<T>(subject)`.
Use `subject satisfies T` in code, or `testType.canAssign<typeof subject, T>(true)` in a test.

## assertType

> `assertType<T>(subject: unknown, validator: (s: T) => unknown, message?: string): asserts subject is T`

🚦 *assertion*

The throwing counterpart of `isType()`: throws a `TypeError` unless `validator` passes,
and narrows `subject` to `T` after the call. Use it for pre- and post-conditions.

```ts
function area(shape: unknown) {
  assertType<{ width: number; height: number }>(
    shape,
    s => typeof s?.width === 'number' && typeof s?.height === 'number',
  )
  return shape.width * shape.height // narrowed
}
```

> `isType<T>(subject: unknown, validator: (s: T) => unknown): subject is T`

It is a generic type guard.
You can use it for do quick type guard without creating a custom one.

```ts
const s: unknown = 1

if (isType<1>(s, v => v === 1)) {
  // s is narrowed to type `1` here.
}
```

[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
