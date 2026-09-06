# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]

More than 200 type utilities for [TypeScript] for applications, library,
and type-level programming.

## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [Installation](#installation)
3. [What's in the package?](#whats-in-the-package)
	1. [Update organization](#update-organization)
	2. [Update documentation](#update-documentation)
4. [Assertion Function](#assertion-function)
	1. [`assertType`](#asserttype)
5. [Type Guard](#type-guard)
6. [Type Utilities](#type-utilities)
7. [Type Specific Utilities](#type-specific-utilities)
	1. [any](#any)
	2. [Array](#array)
	3. [Union](#union)
	4. [`bigint`](#bigint)
	5. [Boolean](#boolean)
	6. [Function](#function)
	7. [Never](#never)
	8. [Null](#null)
	9. [Number](#number)
	10. [Numeric](#numeric)
	11. [Object](#object)
	12. [Promise](#promise)
	13. [String](#string)
	14. [Symbol](#symbol)
	15. [Tuple](#tuple)
	16. [Undefined](#undefined)
	17. [unknown](#unknown)
	18. [void](#void)
8. [Testing Utilities](#testing-utilities)
9. [Constant Types](#constant-types)
10. [JSON Support](#json-support)
11. [Type manipulation](#type-manipulation)
12. [Type Predicates](#type-predicates)
	 1. [Logical](#logical)
13. [Math](#math)
14. [Utility Functions](#utility-functions)
15. [Nominal Types](#nominal-types)
16. [Functional Types](#functional-types)
17. [Attribution](#attribution)
18. [Useful Tips](#useful-tips)
19. [Similar projects](#similar-projects)

## Installation

```sh
npm install type-plus

yarn add type-plus

pnpm add type-plus
```

## What's in the package?

With over 200 types in [`type-plus`],
it can become difficult to find the types you need.

Also, some types need to be updated as TypeScript continue to evolve.

Currently, we are updating [`type-plus`] with the following objective:

- Update organization
- Update documentation
- Clean up and deprecate types
- Upgrade TypeScript from 5.0.4 to 5.1 (potential breaking changes)

### Update organization

Top-level exports of [`type-plus`] will contain types and functions that do not expect the input to be a specific type. For example,

- `assertType()`, `isType()`, and `testType()`
- Type filters and predicates such as `AnyType` or `IsArray`

It can also have types and functions for specific types if it is a common convention,
or the is no ambiguity, or for backwards compatibility purpose.

Other type specific utilities will be added under their respective `*Plus` namespaces such as `ArrayPlus.At` or `NumberPlus.Positive`.

### Update documentation

Each type and utility function in [`type-plus`] will be updated to include examples and tags to indicate its category and behavior.

Each tag has an associated icon:

- 👽 *alias*: Alias of another type
- 🚦 *assertion*: assertion function
- 🔢 *customizable*: the behavior of the type is customizable.
- 💀 *deprecated*: deprecated and will be removed soon
- 🌪️ *filter*: a.k.a. *parse* These types perform some kind of test. If the input passes the test, the input is returned. Otherwise, it returns `never`
- 🛡️ *guard*: type guard function
- 💥 *immediate*: the effect of the type can be observed immediately during development
- ㊙️ *internal*: the type is internal and should not be used directly
- 🏃 *runtime*: the function has runtime effect
- 🩳 *shortcut*: Shortcut or convenient types
- 🧪 *testing*: the type or function are designed for test
- ⚗️ *transform*: these types transforms the input to another category
- 🧰 *type util*: types for building types
- 🦴 *utilities*: provide various functionalities
- 🎭 *predicate*: a.k.a. *predicate* or *logical*. These types perform some kind of test. If the input passes the test, it returns `true` or `false`

## Assertion Function

[Assertion Functions][assertion_functions] are special functions that asserts certain conditions of your program.

It is introduced in TypeScript 3.7.

They throw an error if the condition is not met, and return nothing otherwise.

These assertion functions are typically used in runtime,
so that that type of the value can be narrowed down.

### `assertType`

[`assertType`](./src/assertion/assert_type.ts) provides a generic assertion function,
as well as many assertion functions for built-in types.

> [`assertType<T>(subject)`](./src/assertion/readme.md#asserttype)

💀 deprecated. Use `assertType.as()` instead.

`assertType<T>(subject, validator)`:

🚦`assertion`: assert the `subject` is type `T` with the specified `validator`.

If `subject` fails the assertion,
a standard `TypeError` will be thrown and provide better error info.
For example:

```ts
const s: unknown = 1

// TypeError: subject fails to satisfy s => typeof s === 'boolean'
assertType<boolean>(s, s => typeof s === 'boolean')
```

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

> [`assertType.isUndefined()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `undefined`.

> [`assertType.noUndefined()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `undefined`.

> [`assertType.isNull()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `null`.

> [`assertType.noNull()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `null`.

> [`assertType.isNumber()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `number`.

> [`assertType.noNumber()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `number`.

> [`assertType.isBoolean()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `boolean`.

> [`assertType.noBoolean()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `boolean`.

> [`assertType.isTrue()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `true`.

> [`assertType.noTrue()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `true`.

> [`assertType.isFalse()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `false`.

> [`assertType.noFalse()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `false`.

> [`assertType.isString()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `string`.

> [`assertType.noString()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `string`.

> [`assertType.isFunction()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `function`.

> [`assertType.noFunction()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not `function`.

> [`assertType.isError()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is an `Error`.

> [`assertType.noError()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is not an `Error`.

> [`assertType.isConstructor()`](./src/assertion/readme.md#asserttype)

💀 deprecated. It does not work in all cases.

It passes for function that can be called with `new`.
If the subject is an arrow function, it can still return true after compilation.

> [`assertType.isNever()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` is `never`.

> [`assertType.custom()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: creates a custom assertion function.

Using it to create a custom assertion function that provides better error messages.

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

> [`assertType.as<T>()`](./src/assertion/readme.md#asserttype)

🚦`assertion`: assert the `subject` as `T` without validator.

This works similar to manual assertion `;(subject as T)`

## Type Guard

[User-defined type guard functions][type_guard] is a function which its return type is specified as `x is T`.

> [`isType()`](./src/type-guard/readme.md#istype)

🛡️ `guard`: a generic type guard function

## Type Utilities

> `Equal<A, B, Then = true, Else = false>`

💀 deprecated. Use `IsEqual` instead. This will be converted to a ↪️ `parse`.

> `IsEqual<A, B, Then = true, Else = false>`

⭕ `predicate`: if `A` and `B` are the same.

> `NotEqual<A, B, Then = true, Else = false>`

💀 deprecated. Use `IsNotEqual` instead. This will be converted to a ↪️ `parse`.

> `IsNotEqual<A, B, Then = true, Else = false>`:

⭕ `predicate`: check if `A` and `B` are not the same.

> `Extendable<A, B, Then = A, Else = never>`

↪️ `parse`: check if `A` extends `B`.

> `IsExtend<A, B, Then = true, Else = false>`

⭕ `predicate`: check if `A` extends `B`.

> `NotExtendable<A, B, Then = A, Else = never>`:

↪️ `parse`: check if `A` not extends `B`.

> `IsNotExtend<A, B, Then = true, Else = false>`:

⭕ `predicate`: check if `A` not extends `B`.

> `IsAssign<A, B, Then = true, Else = false>`

💀 `deprecated`: use `CanAssign` instead.

> `CanAssign<A, B, Then = true, Else = false>`:

⭕ `predicate`: check can `A` assign to `B`.

A typical usage is using it with `assertType`:

```ts
assertType.isFalse(false as CanAssign<boolean, { a: string }>)
assertType.isTrue(true as CanAssign<{ a:string, b:number }, { a: string }>)
```

> `StrictCanAssign<A, B, Then = true, Else = false>`

⭕ `predicate`: can `A` strictly assign to `B`

When `A` is a union, all branches must be assignable to `B`.

```ts
StrictCanAssign<number | string, number> // false
StrictCanAssign<number | string, number | string> // true
```

> `canAssign<T>(): (subject) => true`

⭕💻 `predicate`, `compile-time`

Returns a compile-time validating function to ensure `subject` is assignable to `T`.

```ts
const isConfig = canAssign<{ a: string }>()
assertType.isTrue(isConfig({ a: 'a' }))
```

> `canAssign<T>(false): (subject) => false`:

⭕💻 `predicate`, `compile-time`

Returns a compile-time validating function to ensure `subject` is not assignable to `T`.

```ts
const notA = canAssign<{ a: string }>(false)
assertType.isTrue(notA({ a: 1 }))

notA({ a: '' }) // TypeScript complains
```

## Type Specific Utilities

[`type-plus`](./README.md) provides type checking utilities for every type.

Each type has at least 4 type checks.
Using `string` as an example, there are `StringType<T>`, `IsString<T>`, `NotStringType<T>`, and `IsNotString<T>`.

Some types will have more checks, such as `boolean` has `StrictBooleanType<T>`, `TrueType<T>`, `FalseType<T>`.

You can learn more in their respective sections:

- [any](./src/any/readme.md)
- [array](./src/array/readme.md)
- [bigint](./src/bigint/readme.md)
- [boolean](./src/boolean/readme.md)
- [function](./src/function/readme.md)
- [never](./src/never/readme.md)
- [null](./src/null/readme.md)
- [number](./src/number/readme.md)
- [object](./src/object/readme.md)
- [string](./src/string/readme.md)
- [symbol](./src/symbol/readme.md)
- [tuple](./src/tuple/readme.md)
- [undefined](./src/undefined/readme.md)
- [unknown](./src/unknown/readme.md)
- [void](./src/void/readme.md)
- [mix types](./src/mix-types/readme.md)

### [any](./src/any/readme.md)

- [`AnyType`](./src/any/readme.md#anytype)
- [`IsAny`](./src/any/readme.md#isany)
- [`NotAnyType`](./src/any/readme.md#notanytype)
- [`IsNotAny`](./src/any/readme.md#isnotany)
- [`AnyOrNeverType`](./src/mix_types/readme.md#anyornevertype)
- [`IsAnyOrNever`](./src/mix_types/readme.md#isanyornever)

### [Array](./src/array/readme.md)

- 🌪️[`ArrayType`](./src/array/readme.md#arraytype): Filter `T` to ensure it is an array, excluding tuple.
- 🎭[`IsArray`](./src/array/readme.md#isarray): Validate that `T` is an array, excluding tuple.
- 🌪️[`NotArrayType`](./src/array/readme.md#notarraytype): Filter `T` to ensure it is not an array, excluding tuple.
- 🎭[`IsNotArrayType`](./src/array/readme.md#isnotarraytype): Validate that `T` is not an array, excluding tuple.
- 🦴[`At`](./src/array/readme.md#at): Gets the type of the array or tuple at positive or negative index `N`.
- 🦴💀[`Concat`](./src/array/readme.md#concat): Concatenates two arrays or tuples. Deprecated. Please use `ArrayPlus.Concat` instead.
- 🦴🔢[`FindFirst`](./src/array/readme.md#findfirst): Find the first type in the array or tuple `A` that matches `Criteria`.
- [`FindLast`](./src/array/readme.md#findlast)
- [`Some`](./src/array/readme.md#some)
- ⚗️[`Filter`](./src/array/readme.md#filter): Filter the array or tuple `A`, keeping entries satisfying `Criteria`.
- ⚗️👽[`KeepMatch`](./src/array/readme.md#keepmatch): Keeps entries satisfying `Criteria` in array or tuple `A`.
- 🦴🔢[`Head`](./src/array/readme.md#head): Gets the first entry in the tuple or the type of array `T`.
- [`IntersectOfProps`](./src/array/readme.md#intersectofprops)
- [`MapToProp`](./src/array/readme.md#maptoprop)
- 🦴🔢[`Last`](./src/array/readme.md#last): Gets the last entry in the tuple or the type of array `T`.
- [`literalArray`](./src/array/readme.md#literalarray)
- [`PadStart`](./src/array/readme.md#padstart)
- [`reduceWhile`](./src/array/readme.md#reducewhile)
- [`Reverse`](./src/array/readme.md#reverse)
- [`PropUnion`](./src/array/readme.md#propunion)
- [`UnionOfProps`](./src/array/readme.md#unionofprops)
- [`UnionOfValues`](./src/array/readme.md#unionofvalues)
- [`ArrayPlus.At`](./src/array/readme.md#arrayplusat)
- [`ArrayPlus.Concat`](./src/array/readme.md#arrayplusconcat)
- [`ArrayPlus.Entries`](./src/array/readme.md#arrayplusentries)
- 🦴🔢[`ArrayPlus.Find`](./src/array/readme.md#arrayplusfind): Finds the type in array `A` that matches `Criteria`.
- [`ArrayPlus.FindLast`](./src/array/readme.md#arrayplusfindlast)
- [`ArrayPlus.Reverse`](./src/array/readme.md#arrayplusreverse)
- [`ArrayPlus.SplitAt`](./src/array/readme.md#arrayplussplitat)
- [`ArrayPlus.Some`](./src/array/readme.md#arrayplussome)

### [Union](./src/union/readme.md)

- [`IsUnion`](./src/union//readme.md#isunion)
- [`UnionType`](./src/union/readme.md#uniontype)

### `bigint`

> [`BigintType<T, Then = T, Else = never>`](./src/bigint/bigint_type.ts#L15)

↪️ `parse`: if `T` is `bigint` or bigint literal.

> [`IsBigint<T, Then = true, Else = false>`](./src/bigint/bigint_type.ts#L33)

⭕ `predicate`: if `T` is `bigint` or bigint literal.

> [`NotBigintType<T, Then = T, Else = never>`](./src/bigint/bigint_type.ts#L47)

↪️ `parse`: if `T` is not `bigint` or bigint literal.

> [`IsNotBigInt<T, Then = true, Else = false>`](./src/bigint/bigint_type.ts#L61)

⭕ `predicate`: if `T` is not `bigint` or bigint literal.

> [`StrictBigintType<T, Then = T, Else = never>`](./src/bigint/strict_bigint_type.ts#L15)

↪️ `parse`: if `T` is exactly `bigint`.

> [`IsStrictBigint<T, Then = true, Else = false>`](./src/bigint/strict_bigint_type.ts#L33)

⭕ `predicate`: if `T` is exactly `bigint`.

> [`NotStrictBigintType<T, Then = T, Else = never>`](./src/bigint/strict_bigint_type.ts#L47)

↪️ `parse`: if `T` is not exactly `bigint`.

> [`IsNotStrictBigint<T, Then = true, Else = false>`](./src/bigint/strict_bigint_type.ts#L61)

⭕ `predicate`: if `T` is not exactly `bigint`.

### Boolean

> [`BooleanType<T>`](./src/boolean/readme.md#type-checking)

↪️ `parse`: `T === boolean`.

> [`IsBoolean<T>`](./src/boolean/readme.md#type-checking)

⭕ `predicate`: `T === boolean`

> [`NotBooleanType<T>`](./src/boolean/readme.md#type-checking)

↪️ `parse`: `T !== boolean`.

> [`IsNotBoolean<T>`](./src/boolean/readme.md#type-checking)

⭕ `predicate`: `T !== boolean`

### Function

> [`FunctionType<T>`](./src/function/readme.md#type-checking)

↪️ `parse`: `T === function`.

> [`IsFunction<T>`](./src/function/readme.md#type-checking)

⭕ `predicate`: `T === function`

> [`NotFunctionType<T>`](./src/function/readme.md#type-checking)

↪️ `parse`: `T !== function`.

> [`IsNotFunction<T>`](./src/function/readme.md#type-checking)

⭕ `predicate`: `T !== function`

> `AnyFunction<P, R>`

🔨 `utilities`: a generic type for any function

> `ExtractFunction<F>`

🔨 `utilities`: extract the function signature from a type `F`.

> `extractFunction(fn: F)`

🔨 `utilities`: adjust type of `fn` to its function signature only.

> `inspect<T>(value: T, inspector?: (v: T) => void)`

🔨 `utilities`: inspect a value and return it. Inspector defaults to `console.dir()`

### Never

> [`NeverType<T>`](./src/never/readme.md#type-checking)

↪️ `parse`: `T === never`.

> [`IsNever<T>`](./src/never/readme.md#type-checking)

⭕ `predicate`: `T === never`

> [`NotNeverType<T>`](./src/never/readme.md#type-checking)

↪️ `parse`: `T !== never`.

> [`IsNotNever<T>`](./src/never/readme.md#type-checking)

⭕ `predicate`: `T !== never`

### Null

> [`NullType<T>`](./src/null/readme.md#type-checking)

↪️ `parse`: `T === null`.

> [`IsNull<T>`](./src/null/readme.md#type-checking)

⭕ `predicate`: `T === null`

> [`NotNullType<T>`](./src/null/readme.md#type-checking)

↪️ `parse`: `T !== null`.

> [`IsNotNull<T>`](./src/null/readme.md#type-checking)

⭕ `predicate`: `T !== null`

### Number

> [`NumberType<T, Then = N, Else = never>`](./src/number/number_type.ts#L14)

↪️ `parse`: is the type `T` `number`.

> [`IsNumber<T, Then = true, Else = false>`](./src/number/number_type.ts#L27)

⭕ `predicate`: is the type `T` `number`.

> [`NotNumberType<T, Then = T, Else = never>`](./src/number/number_type.ts#L40)

↪️ `parse`: is the type `T` not `number`.

> [`IsNotNumber<T, Then = true, Else = false>`](./src/number/number_type.ts#L53)

⭕ `predicate`: is the type `T` not `number`.

> [`StrictNumberType<T, Then = N, Else = never>`](./src/number/strict_number_type.ts#L19)

↪️ `parse`: is the type `T` exactly `number`.

> [`IsStrictNumber<T, Then = true, Else = false>`](./src/number/strict_number_type.ts#L41)

⭕ `predicate`: is the type `T` exactly `number`.

> [`NotStrictNumberType<T, Then = T, Else = never>`](./src/number/strict_number_type.ts#L55)

↪️ `parse`: is the type `T` not exactly `number`.

> [`IsNotStrictNumber<T, Then = true, Else = false>`](./src/number/strict_number_type.ts#L69)

⭕ `predicate`: is the type `T` not exactly `number`.

### Numeric

> [`Numeric`](./src/numeric/numeric_type.ts#L4)

📘 `definition`: `number | bigint`.

> [`Zero`](ts/numeric_plus/numeric_type.ts#L9)

📘 `definition`: `0 | 0n`

> [`Integer<N, Then = N, Else = never>`](./src/numeric/integer.ts#L15)

↪️ `parse`: is integer.

> [`IsInteger<N, Then = true, Else = false>`](./src/numeric/integer.ts#L32)

⭕ `predicate`: is integer.

> [`NotInteger<N, Then = N, Else = never>`](./src/numeric/integer.ts#L45)

↪️ `parse`: is not integer.

> [`IsNotInteger<N, Then = true, Else = false>`](./src/numeric/integer.ts#L60)

⭕ `predicate`: is not integer.

> [`IsWhole<N, Then = true, Else = false>`](./src/numeric/integer.ts#L75)

💀⭕ `deprecated`, `predicate`: is integer. Use `IsInteger` instead.

> [`Negative<N, Then = N, Else = never>`](./src/numeric/negative.ts#L19)

↪️ `parse`: is negative.

> [`IsNegative<N, Then = true, Else = false>`](./src/numeric/negative.ts#L53)

⭕ `predicate`: is negative.

> [`NonNegative<N, Then = N, Else = never>`](./src/numeric/negative.ts#L69)

↪️ `parse`: is not negative.

> [`IsNonNegative<N, Then = N, Else = never>`](./src/numeric/negative.ts#L101)

⭕ `predicate`: is not negative.

> [`Positive<N, Then = N, Else = never>`](./src/numeric/positive.ts#15)

↪️ `parse`: is positive.

> [`IsPositive<N, Then = true, Else = false>`](./src/numeric/positive.ts#L36)

⭕ `predicate`: is positive.

> [`NotPositive<N, Then = N, Else = never>`](./src/numeric/positive.ts#48)

↪️ `parse`: is not positive.

> [`IsNotPositive<N, Then = true, Else = false>`](./src/numeric/positive.ts#L60)

⭕ `predicate`: is not positive.

### Object

> `filterKey()`

🔨 `utilities`: type adjusted filter by key.

> `findKey()`

🔨 `utilities`: type adjusted find by key.

> `forEachKey()`

🔨 `utilities`: type adjusted for each by key.

> `HasKey<T, K>`

🔨 `utilities`: predicate type checking `T` has key `K`.

> `hasKey()`

🔨 `utilities`: function of `HasKey`.

> `IsRecord<T>`

🔨 `utilities`: `logical` predicate for `Record`.

> `KeysWithDiffTypes<A, B>`

🔨 `utilities`: gets the keys common in `A` and `B` but with different value type.

> `mapKey()`

🔨 `utilities`: type adjusted map by key.

> `RecordValue<R>`

🔨 `utilities`: gets the value type `T`from `Record<any, T>`

[Video](https://www.youtube.com/watch?v=1J7xK6FUqPw).

> `reduceByKey()`

🔨 `utilities`: type adjusted reduce by key.

> `someKey()`

🔨 `utilities`: type adjusted some by key.

> `SpreadRecord<A, B>`

🔨 `utilities`: type for `{...a, ...b}` when both `a` and `b` are `Record`\
  for array, just do `[...A, ...B]`.

### Promise

> `AwaitedProp<T, V>`

🔨 `utilities`: `Awaited` on specified props `P` in `T`.

> `isPromise<R>(subject: any)`

🔨 `utilities`: `isPromise()` type guard.

> `MaybePromise<T>`

🔨 `utilities`: Alias of `T | Promise<T>`.

> `PromiseValue<P>`

🔨 `utilities`: Gets the type within the Promise.

> `PromiseValueMerge<P1, P2, ...P9>`

🔨 `utilities`: Merge the values of multiple promises.

> `mapSeries()`

🔨 `utilities`: Similar to `bluebird.mapSeries()` but works with `async`/`await`.

> `transformMaybePromise(value, transformer)`

🔨 `utilities`: Apply the `transformer` to the `value`.\
  It is also exported under `MaybePromise.transform()`.

### String

> [`StringType<T>`](ts/string/readme.md#type-checking)

↪️ `parse`: is `string`.

> [`IsString<T>`](ts/string/readme.md#type-checking)

⭕ `predicate`: is `string`.

> [`NotStringType<T>`](ts/string/readme.md#type-checking)

↪️ `parse`: is not `string`.

> [`IsNotString<T>`](ts/string/readme.md#type-checking)

⭕ `predicate`: is not `string`.

### Symbol

> [`SymbolType<T>`](ts/symbol/readme.md#type-checking)

↪️ `parse`: is `symbol`.

> [`IsSymbol<T>`](ts/symbol/readme.md#type-checking)

⭕ `predicate`: is `symbol`.

> [`NotSymbolType<T>`](ts/symbol/readme.md#type-checking)

↪️ `parse`: is not `symbol`.

> [`IsNotSymbol<T>`](ts/symbol/readme.md#type-checking)

⭕ `predicate`: is not `symbol`.

### Tuple

- 🌪️ [`TupleType`](./src/tuple/readme.md#tupletype): Filter `T` to ensure it is a tuple, excluding array.
- 🎭 [`IsTuple`](./src/tuple/readme.md#istuple): Validate that `T` is a tuple, excluding array.
- 🌪️ [`NotTupleType`](./src/tuple/readme.md#nottupletype): Filter `T` to ensure it is not a tuple, excluding array.
- 🎭 [`IsNotTuple`](./src/tuple/readme.md#isnottupletype): Validate that `T` is not a tuple, excluding array.
- ⚗️🔢[`CommonPropKeys`](./src/tuple/readme.md#commonpropkeys): Gets the common property keys of the elements in tuple `T`.
- ⚗️🔢[`DropFirst`](./src/tuple/readme.md#dropfirst): Drops the first entry in the tuple`T`.
- ⚗️🔢[`DropLast`](./src/tuple/readme.md#droplast): Drops the last entry in the tuple`T`.

> `CreateTuple<L, T>`

🔨 `utilities`: creates `tuple<T>` with `L` number of elements.

> `drop(array, value)`

🔨 `utilities`💀 `deprecated`: drop a particular value from an array. No replacement.

> `DropMatch<A, Criteria>`

🔨 `utilities`: drops entries matching `Criteria` in array or tuple `A`.

> `DropUndefined<A>`

🔨 `utilities`: drop undefined entries from array of tuple `A`.

### Undefined

> [`UndefinedType<T>`](./src/undefined/readme.md#type-checking)

↪️ `parse`: `T === undefined`.

> [`IsUndefined<T>`](./src/undefined/readme.md#type-checking)

⭕ `predicate`: `T === undefined`

> [`NotUndefinedType<T>`](./src/undefined/readme.md#type-checking)

↪️ `parse`: `T !== undefined`.

> [`IsNotUndefined<T>`](./src/undefined/readme.md#type-checking)

⭕ `predicate`: `T !== undefined`

### unknown

> [`UnknownType<T>`](./src/unknown/readme.md#type-checking)

↪️ `parse`: `T === unknown`.

> [`IsUnknown<T>`](./src/unknown/readme.md#type-checking)

⭕ `predicate`: `T === unknown`

> [`NotUnknownType<T>`](./src/unknown/readme.md#type-checking)

↪️ `parse`: `T !== unknown`.

> [`IsNotUnknown<T>`](./src/unknown/readme.md#type-checking)

⭕ `predicate`: `T !== unknown`

### void

> [`VoidType<T>`](./src/void/readme.md#type-checking)

↪️ `parse`: `T === void`.

> [`IsVoid<T>`](./src/void/readme.md#type-checking)

⭕ `predicate`: `T === void`

> [`NotVoidType<T>`](./src/void/readme.md#type-checking)

↪️ `parse`: `T !== void`.

> [`IsNotVoid<T>`](./src/void/readme.md#type-checking)

⭕ `predicate`: `T !== void`

## Testing Utilities

[`type-plus`](./README.md) provides some testing utilities to help you test your types.

One of the key utilities is [`testType`](./src/testing/readme.md#testtype).

```ts
import { testType } from 'type-plus'

testType.any<T>(true) // T is `any`
testType.equal<A, B>(true) // A is equal to B
testType.never<T>(false) // T is not `never`
```

You can learn more about them in the [docs](./src/testing/readme.md).

## Constant Types

> `KeyTypes`

📘 `definition`: type of all keys.

> `PrimitiveTypes`

📘 `definition`: all primitive types, including `Function`, `symbol`, and `bigint`.

> `ComposableTypes`

📘 `definition`: Types that can contain custom properties. i.e. `object`, `array`, `function`.

> `NonComposableTypes`

📘 `definition`: Types that cannot contain custom properties. i.e. not composable.

## JSON Support

> `JSONPrimitive`

📘 `definition`: primitive types valid in JSON

> `JSONObject`

📘 `definition`: JSON object

> `JSONArray`

📘 `definition`: JSON array

> `JSONTypes`

📘 `definition`: all JSON compatible types.

> `JSONTypes.get<T>(obj, ...props)`

🔨 `utilities`: get a cast value in JSON

```ts
import { JSONTypes } from 'type-plus'

const someJson: JSONTypes = { a: { b: ['z', { c: 'miku' }]}}

JSONTypes.get<string>(someJson, 'a', 'b', 1, 'c') // miku
```

## Type manipulation

> `ANotB<A, B>`

🔨 `utilities`: get object with properties in `A` and not in `B`, including properties with a different value type.

> `BNotA<A, B>`

🔨 `utilities`: flip of `ANotB`

> `as<T>(subject)`

🔨 `utilities`: assert `subject` as `T`. Avoid ASI issues such as `;(x as T).abc`

> `asAny(subject)`

🔨 `utilities`: assert `subject` as `any`. Avoid ASI issue such as `;(x as any).abc`

> `EitherAnd<A, B, [C, D]>`

💀🔨 `deprecated`,`utilities`: Renamed to `EitherOrBoth`. Combines 2 to 4 types as `A | B | (A & B)`.

This is useful for combining options.

> `EitherOrBoth<A, B, [C, D]>`

🔨 `utilities`: combines 2 to 4 types as `A | B | (A & B)`.

This is useful for combining options [video](https://youtu.be/jBxx03NT4Ik).

> `Except<T, K>`

💀🔨 `deprecated`,`utilities`: same as `Omit<T, K>`.

> `ExcludePropType<T, U>`

🔨 `utilities`: excludes type `U` from properties in `T`.

> `KeyofOptional<T>`

🔨 `utilities`: `keyof` that works with `Record<any, any> | undefined`.

> `KnownKeys<T>`

🔨 `utilities`: extract known (defined) keys from type `T`.

> `LeftJoin<A, B>`

🔨 `utilities`: left join `A` with `B`

> `NonNull<T>`

🔨 `utilities`: remove `null`

> `NonNullable<T>` (built-in)

🔨 `utilities`: adjust the type not to nullable

> `NonUndefined<T>`

🔨 `utilities`: remove `undefined`

> `Omit<T, K>`

🔨 `utilities`: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.

> `OptionalKeys<T>`

🔨 `utilities`: gets keys of optional properties in `T`.

> `PartialExcept<T, U>`

💀🔨 `deprecated`,`utilities`: same as `PartialOmit<T, U>`.

> `PartialOmit<T, U>`

🔨 `utilities`: makes the properties not specified in `U` becomes optional.

> `PartialPick<T, U>`

🔨 `utilities`: makes the properties specified in `U` becomes optional.

> `Pick<T, K>`

🔨 `utilities`: pick properties `K` from `T`. Works with unions.

> `RecursivePartial<T>`

🔨 `utilities`: make type `T` optional recursively.

> `RecursiveRequired<T>`

🔨 `utilities`: make type `T` required recursively.

> `ReplaceProperty<T, K, V>`

🔨 `utilities`: replace property `K` in `T` with `V`.

> `RequiredKeys<T>`

🔨 `utilities`: gets keys of required properties in `T`.

> `RequiredPick<T, U>`

🔨 `utilities`: makes the properties specified in `U` become required.

> `RequiredExcept<T, U>`

🔨 `utilities`: makes the properties not specified in `U` become required.

> `RecursiveIntersect<T, U>`

🔨 `utilities`: intersect type `U` onto `T` recursively.

> `ValueOf<T>`

🔨 `utilities`: type of the value of the properties of `T`.

> `Widen<T>`

🔨 `utilities`: widen literal types.

PropType

💀 ...no helper type for this. Just do `YourType['propName']`.

## Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

> `HasKey<T, K>`

🔨 `utilities`: predicate type checking `T` has key `K`.

> `IsAny<T>`

🔨 `utilities`: `T === any`.

> `IsBoolean<T>`

🔨 `utilities`: check for `boolean`, but not for `true` nor `false`.

> `IsDisjoint<A, B>`

🔨 `utilities`: is `A` and `B` is a disjoint set.

> `IsEmptyObject<T>`

🔨 `utilities`: is `T === {}`.

> `IsLiteral<T>`

🔨 `utilities`: is `T` a literal type (literal string or number).

### Logical

> `If<Condition, Then = true, Else = false>`

🔨 `utilities`: if statement

> `And<A, B, Then = true, Else = false>`

🔨 `utilities`: logical `AND`

> `Or<A, B, Then = true, Else = false>`

🔨 `utilities`: logical `OR`

> `Xor<A, B, Then = true, Else = false>`

🔨 `utilities`: logical `XOR`

> `Not<X, Then = true, Else = false>`

🔨 `utilities`: logical `NOT`

Note that these types work correctly with the `boolean` type.
e.g.:

```ts
type R = And<boolean, true> // boolean
type R = Not<boolean>       // boolean`
```

There is a problem with generic distribution: <https://github.com/microsoft/TypeScript/issues/41053>
So you may encounter some weird behavior if your logic is complex.

## Math

The math types in `type-plus` works with most numeric types.

It works with `number` and `bigint`, positive and negative number, including floating point numbers.

It will cast the type between `number` and `bigint` if needed.

> `Abs<N, Fail = never>`

🔨 `utilities`: `Abs(N)`.

> `Max<A, B, Fail = never>`

🔨 `utilities`: `max(A, B)`

> `GreaterThan<A, B>`

🔨 `utilities`: `A > B`.

> `Add<A, B>`

🔨 `utilities`: `A + B`.

> `Subtract<A, B>`

🔨 `utilities`: `A > B`.

> `Increment<A>`

🔨 `utilities`: alias of `Add<A, 1>`.

> `Decrement<A>`

🔨 `utilities`: alias of `Subtract<A, 1>`.

> `Multiply<A, B`

🔨 `utilities`: `A * B`.

## Utility Functions

> `amend(subject)...`

🔨 `utilities`: amend subject as union or intersect of `T`.

> `facade(subject, ...props)`

🔨 `utilities`: create a facade of `subject`.

> `getField(subject, key, defaultValue)`

🔨 `utilities`: get a field from a subject. Works against nullable and optional subject.

> `hasKey()`

🔨 `utilities`: function of `HasKey`.

> `hasProperty(value, prop)`

🔨 `utilities`: assert `value` has property `prop`. This will pick the correct union type.

> `isConstructor(subject)`

🔨 `utilities`: type guard `subject` is a constructor.

> `isSystemError(code, err)`

🔨 `utilities`: type guard `err` with NodeJS error code.

> `omit(obj, ...props)`

🔨 `utilities`: omit properties from `obj`.

> `pick(obj, ...props)`

🔨 `utilities`: pick properties from `obj`.

> `record<K, V>(value?)`

🔨 `utilities`: create a `Record<K, V>` without extra object prototype.

> `record<R>(value?)`

🔨 `utilities`: create a record `R` (e.g. `{ a: number }`) without extra object prototype.

> `required(...)`

🔨 `utilities`: merge options and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `requiredDeep(...)`

🔨 `utilities`: merge options deeply and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `split(target, ...splitters)`

🔨 `utilities`: split one object into multiple objects.

> `stub<T>(value)`

🔨 `utilities`: stub a particular type `T`.

> `stub.build<T>(init?)`

🔨 `utilities`: build a stub for particular type `T`.

> `typeOverrideIncompatible<T>()`

🔨 `utilities`: override only the incompatible portion between two types.

```ts
type A =  {
  foo: boolean,
  bar: string,
  baz: string
}

const overrider = typeOverrideIncompatible<A>()
const source = {
  foo: 1,
  bar: 'bar',
  baz: 'baz'
}

// only the `foo` property is available to override.
overrider(source, { foo: !!source.foo })
```

> `unpartial()`

🔨 `utilities`: merge options and remove `Partial<T>` values. From [`unpartial`](https://github.com/unional/unpartial)

> `context()`

🔨 `utilities`: a context builder.

This is useful to build context for functional programming.
It is a sync version of the `AsyncContext` from [`async-fp`](https://unional/async-fp).

```ts
import { context } from 'type-plus'

// { a: 1, b: 2 }
const ctx = context({ a: 1 })
  .extend(c => ({ b: c.a + 1 }))
  .build()
```

## Nominal Types

The TypeScript type system is structural.

In some cases, we want to express a type with nominal behavior.
`type-plus` provides two kinds of nominal types: `Brand` and `Flavor`.

`Brand<B, T>`:

`brand(type, subject?)`:

Branded nominal type is the stronger nominal type of the two.
It disallows unbranded type assigned to it:

```ts
const a = brand('a', { a: 1 })
const b = { a: 1 }
a = b // error
```

`subject` can be any type, from primitive to strings to objects.

`brand(type)`:

If you do not provide `subject`, `brand(type)` will return a brand creator,
so that you can use it to create multiple branded values:

```ts
const nike = brand('nike')
const shirt = nike('shirt')
const socks = nike('socks')
```

`Flavor<F, T>`:

`flavor(type, subject?)`:

The key difference between `Flavor` and `Brand` is that
unflavored type can be assigned to `Flavor`:

```ts
let f = flavor('orange', 'soda')
f = 'mist' // ok
```

Also, `Brand` of the same name can be assigned to `Flavor`,
but `Flavor` of the same name cannot be assigned to `Brand`.

`nominalMatch(a, b)`:

🔨 `utilities`: compare if the two values are nominally equal.

Works with both `Brand` and `Flavor`.

```ts
const b1 = brand('x', 1)
const b2 = brand('y', 1)

nominalMatch(b1, b2) // false
```

## Functional Types

> `ChainFn<T>: T`

🔨 `utilities`: chain function that returns the input type.

> `compose(...fns): F`

🔨 `utilities`: compose functions

## Attribution

Some code in this library is created by other people in the TypeScript community.
I'm merely adding them in and maybe making some adjustments.
Whenever possible, I add attribution to the person who created those **codes** in the file.

## Useful Tips

> <https://github.com/microsoft/TypeScript/wiki/Performance>

## Similar projects

- [`expect-type`]: Compile-time tests for types
- [`hotscript`]: Higher-order TypeScript
- [`spec.ts`]: write tests for your types!
- [`ts-calc`]: compute with typescript type system, part of [`hotscript`]
- [`ts-essentials`]: all essential TypeScript types in one place.
- [`ts-expect`]: Checks values in TypeScript match expectations.
- [`ts-toolbelt`]: TypeScript's largest utility library.
- [`type-fest`]: a collection of essential TypeScript types.
- [`type-zoo`]: a modest type lib usable today.
- [`typepark`]: a new type collection offering tuple manipulation and `Pipe`.
- [`typelevel-ts`]: a type lib by [@gcanti], author of several FP libraries in TS.
- [`typical`]: a playground of type-level operations for TypeScript.
- [`utility-types`]: collection of utility types, complementing TypeScript built-in mapped types and aliases.
- [`earl`]: Ergonomic, modern and type-safe assertion library for TypeScript

[@gcanti]: https://github.com/gcanti
[codecov_image]: https://codecov.io/gh/cyberuni/type-plus/branch/main/graph/badge.svg
[codecov_url]: https://codecov.io/gh/cyberuni/type-plus
[downloads_image]: https://img.shields.io/npm/dm/type-plus.svg?style=flat
[`earl`]: https://github.com/l2beat/earl
[`expect-type`]: https://github.com/mmkal/expect-type
[github_action_url]: https://github.com/cyberuni/type-plus/actions
[github_release]: https://github.com/cyberuni/type-plus/workflows/release/badge.svg
[`hotscript`]: https://github.com/gvergnaud/hotscript
[npm_image]: https://img.shields.io/npm/v/type-plus.svg?style=flat
[npm_url]: https://npmjs.org/package/type-plus
[`spec.ts`]: https://github.com/aleclarson/spec.ts
[`ts-calc`]: https://github.com/ecyrbe/ts-calc
[`ts-essentials`]: https://github.com/ts-essentials/ts-essentials
[`ts-expect`]: https://github.com/TypeStrong/ts-expect
[`ts-toolbelt`]: https://github.com/millsp/ts-toolbelt
[`type-fest`]: https://github.com/sindresorhus/type-fest
[`type-plus`]: https://github.com/cyberuni/type-plus
[`type-zoo`]: https://github.com/pelotom/type-zoo
[`typelevel-ts`]: https://github.com/gcanti/typelevel-ts
[`typepark`]: https://github.com/kgtkr/typepark
[TypeScript]: https://www.typescriptlang.org
[`typical`]: https://github.com/KiaraGrouwstra/typical
[`utility-types`]: https://github.com/piotrwitek/utility-types
[vscode_image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode_url]: https://code.visualstudio.com/
[assertion_functions]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions
[type_guard]: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
