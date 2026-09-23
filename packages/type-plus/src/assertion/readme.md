# Assertion

[Assertion Functions][assertion_functions] are special functions that asserts certain conditions of your program.

It is introduced in TypeScript 3.7.

They throw an error if the condition is not met, and return nothing otherwise.

These assertion functions are typically used in runtime,
so that that type of the value can be narrowed down.

## [assertType](./assert_type.ts#l10)

`assertType<T>(subject)`

💥 *immediate*
🚦 *assertion*

It ensures `subject` satisfies `T`.
It is similar to `const x: T = subject` without introducing an unused variable.
You need to specify `T` for it to work.

`assertType<T>(subject, validator)`:

`assertType<T>(subject, Class)`:

✔️ `assertion function`, `runtime`

These overloads of `assertType` allow you to specify a `validator`.
With these overloads, `subject` can be `unknown` or `any`.

If `subject` fails the assertion,
a standard `TypeError` will be thrown and provide better error info.
For example:

```ts
const s: unknown = 1

// TypeError: subject fails to satisfy s => typeof s === 'boolean'
assertType<boolean>(s, s => typeof s === 'boolean')
```

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

`assertType.isUndefined(subject)`:

`assertType.isNull(subject)`:

`assertType.isNumber(subject)`:

`assertType.isBoolean(subject)`:

`assertType.isTrue(subject)`:

`assertType.isFalse(subject)`:

`assertType.isString(subject)`:

`assertType.isFunction(subject)`:

`assertType.isConstructor(subject)`:

`assertType.isError(subject)`:

✔️ `immediate`, `assertion function`, `runtime`

Compiler and runtime assertion with type narrowing from `any`.
They assert the type of `subject` is that specific type.
i.e. union type will fail at type level:

```ts
const s: number | undefined = undefined
assertType.isUndefined(s) // TypeScript complains
```

They accept `any` and will be narrowed to the specific type.

```ts
const s: any = undefined
assertType.isUndefined(s)
s // type is undefined
```

`assertType.isNever(subject)`:

✔️ `immediate`

Check if the subject type is `never`.
This function is not very useful in actual code as TypeScript will indicate the error.
But it can be useful when writing tests for types.

This is useful for variables. For type level only check, do the following:

```ts
assertType.isTrue(true as IsEqual<YourType, never>)
```

`assertType.noUndefined(subject)`:

`assertType.noNull(subject)`:

`assertType.noNumber(subject)`:

`assertType.noBoolean(subject)`:

`assertType.noTrue(subject)`:

`assertType.noFalse(subject)`:

`assertType.noString(subject)`:

`assertType.noFunction(subject)`:

`assertType.noError(subject)`:

✔️ `immediate`, `runtime`

Compiler and runtime assertion.
Assert `subject` type does not contain the specific type.
Work against unions.

```ts
const s: number | undefined = 1
assertType.noUndefined(s) // TypeScript complains
```

They accept `subject` with type `any` or `unknown`,
the assertion will happen in runtime to ensure `subject` is the specific type.

`assertType.as<T>(subject)`:

✔️ `immediate`

Assert `subject` as `T` inline.
This is useful to help TypeScript to adjust the type on the fly.

```ts
let s: number | undefined = 1
assertType.as<1>(s) // `s` type is now `1`
```

## References

- [Handbook][assertion_functions]

[assertion_functions]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
