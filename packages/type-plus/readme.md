# type-plus

[![NPM version][npm_image]][npm_url]
[![NPM downloads][downloads_image]][npm_url]

[![Release][github_release]][github_action_url]
[![Codecov][codecov_image]][codecov_url]

[![Visual Studio Code][vscode_image]][vscode_url]

More than 200 type utilities for [TypeScript] for applications, library,
and type-level programming.

## v8 beta status

`type-plus` v8 is in active development again, published under the `beta` dist-tag
(currently `8.0.0-beta.11`). Breaking changes are expected between beta releases.

If you are on the beta and want a stable install, pin the exact version and upgrade
deliberately:

```sh
npm install type-plus@8.0.0-beta.11 --save-exact
```

Otherwise, stay on the latest official release (`type-plus@latest`) and adopt v8 when it
reaches a stable release.

## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [v8 beta status](#v8-beta-status)
3. [Installation](#installation)
4. [What's in the package?](#whats-in-the-package)
	1. [Update organization](#update-organization)
	2. [Update documentation](#update-documentation)
5. [Assertion Function](#assertion-function)
	1. [`assertType`](#asserttype)
6. [Type Guard](#type-guard)
7. [Type Utilities](#type-utilities)
8. [Type Specific Utilities](#type-specific-utilities)
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
9. [Testing Utilities](#testing-utilities)
10. [Constant Types](#constant-types)
11. [JSON Support](#json-support)
12. [Type manipulation](#type-manipulation)
13. [Type Predicates](#type-predicates)
	 1. [Logical](#logical)
14. [Math](#math)
15. [Utility Functions](#utility-functions)
16. [Nominal Types](#nominal-types)
17. [Functional Types](#functional-types)
18. [Attribution](#attribution)
19. [Useful Tips](#useful-tips)
20. [Similar projects](#similar-projects)

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

Other type specific utilities will be added under their respective `*Plus` namespaces such as `ArrayPlus.At` or `NumberPlus.IsPositive`.

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

🚦 *assertion*: assert the `subject` is type `T` with the specified `validator`.

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

🚦 *assertion*: assert the `subject` is `undefined`.

> [`assertType.noUndefined()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `undefined`.

> [`assertType.isNull()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `null`.

> [`assertType.noNull()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `null`.

> [`assertType.isNumber()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `number`.

> [`assertType.noNumber()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `number`.

> [`assertType.isBoolean()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `boolean`.

> [`assertType.noBoolean()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `boolean`.

> [`assertType.isTrue()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `true`.

> [`assertType.noTrue()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `true`.

> [`assertType.isFalse()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `false`.

> [`assertType.noFalse()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `false`.

> [`assertType.isString()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `string`.

> [`assertType.noString()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `string`.

> [`assertType.isFunction()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `function`.

> [`assertType.noFunction()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not `function`.

> [`assertType.isError()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is an `Error`.

> [`assertType.noError()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is not an `Error`.

> [`assertType.isConstructor()`](./src/assertion/readme.md#asserttype)

💀 deprecated. It does not work in all cases.

It passes for function that can be called with `new`.
If the subject is an arrow function, it can still return true after compilation.

> [`assertType.isNever()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` is `never`.

> [`assertType.custom()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: creates a custom assertion function.

Using it to create a custom assertion function that provides better error messages.

The message beautification is provided by [`tersify`](https://github.com/unional/tersify).

> [`assertType.as<T>()`](./src/assertion/readme.md#asserttype)

🚦 *assertion*: assert the `subject` as `T` without validator.

This works similar to manual assertion `;(subject as T)`

## Type Guard

[User-defined type guard functions][type_guard] is a function which its return type is specified as `x is T`.

> [`isType()`](./src/type-guard/readme.md#istype)

🛡️ *guard*: a generic type guard function

## Type Utilities

> [`Equal<A, B, $O>`](./src/equal/equal.ts)

🎭 *predicate*, 🔢 *customizable*: `A` and `B` are the same type.

> [`IsEqual<A, B, Then, Else>`](./src/equal/is_equal.ts)

💀 *deprecated* since 8.0.0: use `Equal` instead.

> [`IsNotEqual<A, B, Then, Else>`](./src/equal/is_equal.ts)

💀 *deprecated* since 8.0.0: use `Equal` instead.

> [`NotEqual<A, B, Then, Else>`](./src/equal/is_equal.ts)

💀 *deprecated*: this will be changed to a 🌪️ *filter* variant in the future.

> [`Assignable<A, B, $O>`](./src/predicates/assignable.ts)

🎭 *predicate*, 🔢 *customizable*: `A` is assignable to `B`.

> [`NotAssignable<A, B, $O>`](./src/predicates/not_assignable.ts)

🎭 *predicate*, 🔢 *customizable*: `A` is not assignable to `B`.

> [`IsLiteral<T, $O>`](./src/predicates/literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a scalar literal.

> [`IsEmptyObject<T>`](./src/predicates/IsEmptyObject.ts)

🎭 *predicate*: `T` is the empty object type `{}`.

> [`Extendable<A, B, Then, Else>`](./src/predicates/Extends.ts)

💀 *deprecated*: use `Assignable.$<A, B, { selection: 'filter' }>` instead.

> [`NotExtendable<A, B, Then, Else>`](./src/predicates/Extends.ts)

💀 *deprecated* since 8.0.0: use `NotAssignable.$<A, B, { selection: 'filter' }>` instead.

> [`IsExtend<A, B, Then, Else>`](./src/predicates/Extends.ts)

💀 *deprecated* since 8.0.0: use `Assignable.$<A, B, { $then: Then; $else: Else }>` instead.

> [`IsNotExtend<A, B, Then, Else>`](./src/predicates/Extends.ts)

💀 *deprecated* since 8.0.0: use `NotAssignable.$<A, B, { $then: Then; $else: Else }>` instead.

> [`CanAssign<A, B, Then, Else>`](./src/predicates/CanAssign.ts)

💀 *deprecated*: use `Assignable<A, B>` instead.

A typical usage is using it with `assertType`:

```ts
assertType.isFalse(false as CanAssign<boolean, { a: string }>)
assertType.isTrue(true as CanAssign<{ a: string; b: number }, { a: string }>)
```

`any`, `unknown` and `never` follow TypeScript's own assignability relation:
`any` is assignable to everything but `never` and everything is assignable to `any`,
`unknown` is assignable only to `any` and `unknown`,
and `never` is assignable to everything.

```ts
assertType.isTrue(true as CanAssign<any, number>)
assertType.isTrue(true as CanAssign<number, any>)
assertType.isFalse(false as CanAssign<unknown, number>)
assertType.isTrue(true as CanAssign<never, number>)
```

> [`IsAssign<A, B, Then, Else>`](./src/predicates/CanAssign.ts)

💀 *deprecated*: an alias of `CanAssign`, unchanged in behavior. Use `Assignable<A, B>` instead.

> [`StrictCanAssign<A, B, Then, Else>`](./src/predicates/CanAssign.ts)

💀 *deprecated*: use `Assignable<A, B, { distributive: false }>` instead. When `A` is a union, every
branch must be assignable to `B`.

```ts
StrictCanAssign<number | string, number> // false
StrictCanAssign<number | string, number | string> // true
```

> [`canAssign<T>(): (subject) => true`](./src/predicates/CanAssign.ts)

🎭 *predicate*, 💥 *immediate*

Returns a compile-time validating function to ensure `subject` is assignable to `T`.

```ts
const isConfig = canAssign<{ a: string }>()
assertType.isTrue(isConfig({ a: 'a' }))
```

> [`canAssign<T>(false): (subject) => false`](./src/predicates/CanAssign.ts)

🎭 *predicate*, 💥 *immediate*

Returns a compile-time validating function to ensure `subject` is not assignable to `T`.

```ts
const notA = canAssign<{ a: string }>(false)
assertType.isTrue(notA({ a: 1 }))

notA({ a: '' }) // TypeScript complains
```

## Type Specific Utilities

[`type-plus`](./readme.md) provides type checking utilities for every type.

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
- [mix types](./src/mix_types/readme.md)

### [any](./src/any/readme.md)

> [`IsAny<T, $O>`](./src/any/is_any.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `any`.

> [`IsNotAny<T, $O>`](./src/any/is_not_any.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `any`.

> [`IsAnyOrNever<T, $O>`](./src/mix_types/is_any_or_never.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is exactly `any` or exactly `never`.

### [Array](./src/array/readme.md)

> [`IsArray<T, $O>`](./src/array/is_array.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is an array, excluding tuple.

> [`IsNotArray<T, $O>`](./src/array/is_not_array.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not an array, excluding tuple.

> [`At<A, N>`](./src/array/array.at.ts)

🦴 *utilities*: the element of `A` at the positive or negative index `N`.

> [`Head<T>`](./src/array/head.ts)

🦴 *utilities*, 🔢 *customizable*: the first entry of the tuple, or the element type of the array `T`.

> [`Last<T>`](./src/array/last.ts)

🦴 *utilities*, 🔢 *customizable*: the last entry of the tuple, or the element type of the array `T`.

> [`Filter<A, Criteria>`](./src/array/filter.ts)

⚗️ *transform*: keeps the entries of `A` satisfying `Criteria`.

> [`KeepMatch<A, Criteria>`](./src/array/filter.ts)

⚗️ *transform*, 👽 *alias*: an alias of `Filter`.

> [`FindFirst<A, Criteria>`](./src/array/find_first.ts)

🦴 *utilities*, 🔢 *customizable*: the first entry of `A` matching `Criteria`.

> [`FindLast<A, Criteria>`](./src/array/array.find_last.ts)

🦴 *utilities*, 🔢 *customizable*: the last entry of `A` matching `Criteria`.

> [`Some<A, Criteria>`](./src/array/array.some.ts)

🎭 *predicate*, 🔢 *customizable*: any element of `A` matches `Criteria`.

> [`PadStart<A, L, PadWith>`](./src/array/pad_start.ts)

⚗️ *transform*: pads the start of `A` with `PadWith` up to length `L`.

> [`Reverse<A>`](./src/array/reverse.ts)

⚗️ *transform*: reverses the order of `A`.

> [`Concat<A, B>`](./src/array/array_plus.concat.ts)

💀 *deprecated*, 🦴 *utilities*: concatenates two arrays or tuples. Use `ArrayPlus.Concat` instead.

> [`IntersectOfProps<A, K>`](./src/array/intersect_of_props.ts)

⚗️ *transform*: the intersection of the `K` properties of the elements of `A`.

> [`MapToProp<A, K>`](./src/array/intersect_of_props.ts)

⚗️ *transform*, 👽 *alias*: an alias of `IntersectOfProps`.

> [`UnionOfProps<A, K>`](./src/array/union_of_props.ts)

⚗️ *transform*: the union of the `K` properties of the elements of `A`.

> [`PropUnion<A, K>`](./src/array/union_of_props.ts)

⚗️ *transform*, 👽 *alias*: an alias of `UnionOfProps`.

> [`UnionOfValues<A>`](./src/array/union_of_values.ts)

⚗️ *transform*: the union of the value types in `A`.

> [`ArrayPlus`](./src/array/array_plus.ts)

🧰 *type util*: the array types whose names are too generic to sit on the top level — `At`, `CommonPropKeys`, `Concat`, `DropMatch`, `ElementMatch`, `Entries`, `Filter`, `Find`, `FindLast`, `IndexAt`, `IsIndexOutOfBound`, `IsReadonly`, `PadStart`, `Reverse`, `Some`, `SplitAt`.

> [`literalArray(...items)`](./src/array/literal_array.ts)

🏃 *runtime*, 🦴 *utilities*: an array whose items are narrowed to the provided literals.

> [`reduceWhile(array, reducer, predicate, initial)`](./src/array/reduce_while.ts)

🏃 *runtime*, 🦴 *utilities*: `reduce()` with a predicate for early termination.

### [Union](./src/union/readme.md)

> [`IsUnion<T, $O>`](./src/union/union.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a union.

> [`SubUnion<T, U>`](./src/union/sub_union.ts)

🧰 *type util*: a union type constrained to a subset of the union `T`.

### [`bigint`](./src/bigint/readme.md)

Full reference: [Math and Bigint](https://cyberuni.github.io/type-plus/api/math/).

> [`IsBigint<T, $O>`](./src/bigint/is_bigint.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `bigint` or a bigint literal. With `{ exact: true }`, only `bigint` itself.

> [`IsNotBigint<T, $O>`](./src/bigint/is_not_bigint.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `bigint` nor a bigint literal.

> [`IsBigintLiteral<T, $O>`](./src/bigint/is_bigint_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a bigint literal. `bigint` itself is not.

> [`IsNotBigintLiteral<T, $O>`](./src/bigint/is_not_bigint_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a bigint literal.

### [Boolean](./src/boolean/readme.md)

> [`IsBoolean<T, $O>`](./src/boolean/is_boolean.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `boolean`, `true` or `false`.

> [`IsNotBoolean<T, $O>`](./src/boolean/is_not_boolean.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `boolean`.

> [`IsTrue<T, $O>`](./src/boolean/is_true.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `true`.

> [`IsNotTrue<T, $O>`](./src/boolean/is_not_true.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `true`.

> [`IsFalse<T, $O>`](./src/boolean/is_false.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `false`.

> [`IsNotFalse<T, $O>`](./src/boolean/is_not_false.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `false`.

### [Function](./src/function/readme.md)

> [`IsFunction<T, $O>`](./src/function/is_function.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `Function` or a function signature.

> [`IsNotFunction<T, $O>`](./src/function/is_not_function.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is neither `Function` nor a function signature.

> [`IsStrictFunction<T, $O>`](./src/function/is_strict_function.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is exactly `Function`.

> [`IsNotStrictFunction<T, $O>`](./src/function/is_not_strict_function.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not exactly `Function`.

> [`AnyFunction<P, R>`](./src/function/any_function.ts)

🧰 *type util*: a constraint matching any function.

> [`ExtractFunction<F>`](./src/function/extract_function.ts)

⚗️ *transform*: the function signature of a composite type `F`.

> [`extractFunction(fn)`](./src/function/extract_function.ts)

🏃 *runtime*, 🦴 *utilities*: narrow `fn` to its function signature only.

> [`inspect(value, inspector?)`](./src/utils/inspect.ts)

🏃 *runtime*, 🦴 *utilities*: inspect a value and return it. The inspector defaults to `console.dir()`.

### [Never](./src/never/readme.md)

> [`IsNever<T, $O>`](./src/never/is_never.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `never`.

> [`IsNotNever<T, $O>`](./src/never/is_not_never.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `never`.

### [Null](./src/null/readme.md)

> [`IsNull<T, $O>`](./src/null/is_null.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `null`.

> [`IsNotNull<T, $O>`](./src/null/is_not_null.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `null`.

> [`HasNull<T, $O>`](./src/null/has_null.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `null` or a union containing `null`.

### [Number](./src/number/readme.md)

Full reference: [Number and Numeric](https://cyberuni.github.io/type-plus/api/number/).

> [`IsNumber<T, $O>`](./src/number/is_number.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `number` or a number literal. With `{ exact: true }`, only `number` itself.

> [`IsNotNumber<T, $O>`](./src/number/is_not_number.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `number` nor a number literal.

> [`IsNumberLiteral<T, $O>`](./src/number/is_number_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a number literal. `number` itself is not.

> [`IsNotNumberLiteral<T, $O>`](./src/number/is_not_number_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a number literal.

### Numeric

Widens the number checks to `number | bigint` and adds the value-shape predicates.
Full reference: [Number and Numeric](https://cyberuni.github.io/type-plus/api/number/).

> [`Numeric`](./src/numeric/numeric_type.ts)

👽 *alias*: `number | bigint`.

> [`Zero`](./src/numeric/numeric_type.ts)

👽 *alias*: `0 | 0n`.

> [`IsNumeric<T, $O>`](./src/numeric/is_numeric.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `number` or `bigint`, literals included.

> [`IsNotNumeric<T, $O>`](./src/numeric/is_not_numeric.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is neither `number` nor `bigint`.

> [`IsInteger<T, $O>`](./src/numeric/is_integer.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is an integer, `bigint` included. `number` resolves to `boolean`.

> [`IsNotInteger<T, $O>`](./src/numeric/is_not_integer.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not an integer.

> [`IsPositive<T, $O>`](./src/numeric/is_positive.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a positive numeric type, zero included. `number` and `bigint` resolve to `boolean`.

> [`IsNotPositive<T, $O>`](./src/numeric/is_not_positive.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a positive numeric type.

> [`IsNegative<T, $O>`](./src/numeric/is_negative.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a negative numeric type. `number` and `bigint` resolve to `boolean`.

> [`IsNotNegative<T, $O>`](./src/numeric/is_not_negative.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a negative numeric type.

On the six above, `{ exact: true }` matches only the wide `number` and `bigint`, never a literal.
The `*Literal` types below are the other half of that split: they match only literals, so
`IsPositive<number>` is `boolean` while `IsPositiveLiteral<number>` is `false`.

> [`IsIntegerLiteral<T, $O>`](./src/numeric/is_integer_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is an integer literal, `bigint` literals included.

> [`IsNotIntegerLiteral<T, $O>`](./src/numeric/is_not_integer_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not an integer literal.

> [`IsPositiveLiteral<T, $O>`](./src/numeric/is_positive_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a positive numeric literal, zero included.

> [`IsNotPositiveLiteral<T, $O>`](./src/numeric/is_not_positive_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a positive numeric literal.

> [`IsNegativeLiteral<T, $O>`](./src/numeric/is_negative_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a negative numeric literal.

> [`IsNotNegativeLiteral<T, $O>`](./src/numeric/is_not_negative_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a negative numeric literal.

> [`StringToNumber<S, Fail>`](./src/numeric/cast.ts)

⚗️ *transform*: a string literal to a `number` literal, or `Fail` when the string is not one.

> [`StringToNumeric<S, Fail>`](./src/numeric/cast.ts)

⚗️ *transform*: a string literal to a `number` or `bigint` literal, or `Fail` when the string is not one.

> [`NumericToString<N>`](./src/numeric/cast.ts)

⚗️ *transform*: a numeric literal to its string literal form.

### Object

> `filterKey()`

🦴 *utilities*: type adjusted filter by key.

> `findKey()`

🦴 *utilities*: type adjusted find by key.

> `forEachKey()`

🦴 *utilities*: type adjusted for each by key.

> `HasKey<T, K>`

🦴 *utilities*: predicate type checking `T` has key `K`.

> `hasKey()`

🦴 *utilities*: function of `HasKey`.

> `IsRecord<T>`

🦴 *utilities*: `logical` predicate for `Record`.

> [`KeysWithDiffType<A, B>`](./src/object/KeysWithDiffType.ts)

🦴 *utilities*: the keys `A` and `B` share whose property types disagree.

> `mapKey()`

🦴 *utilities*: type adjusted map by key.

> `RecordValue<R>`

🦴 *utilities*: gets the value type `T`from `Record<any, T>`

[Video](https://www.youtube.com/watch?v=1J7xK6FUqPw).

> `reduceByKey()`

🦴 *utilities*: type adjusted reduce by key.

> `someKey()`

🦴 *utilities*: type adjusted some by key.

> `SpreadRecord<A, B>`

🦴 *utilities*: type for `{...a, ...b}` when both `a` and `b` are `Record`\
  for array, just do `[...A, ...B]`.

### Promise

> `AwaitedProp<T, V>`

🦴 *utilities*: `Awaited` on specified props `P` in `T`.

> `isPromise<R>(subject: any)`

🦴 *utilities*: `isPromise()` type guard.

> `MaybePromise<T>`

🦴 *utilities*: Alias of `T | Promise<T>`.

> `PromiseValue<P>`

💀 *deprecated*: use the built-in `Awaited<T>` instead.

> `PromiseValueMerge<P1, P2, ...P9>`

🦴 *utilities*: Merge the values of multiple promises.

> `mapSeries()`

🦴 *utilities*: Similar to `bluebird.mapSeries()` but works with `async`/`await`.

> `transformMaybePromise(value, transformer)`

🦴 *utilities*: Apply the `transformer` to the `value`.\
  It is also exported under `MaybePromise.transform()`.

### [String](./src/string/readme.md)

> [`IsString<T, $O>`](./src/string/is_string.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `string` or a string literal. With `{ exact: true }`, only `string` itself.

> [`IsNotString<T, $O>`](./src/string/is_not_string.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is neither `string` nor a string literal.

> [`IsStringLiteral<T, $O>`](./src/string/is_string_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a string literal. With `{ exact: true }`, template literals that do not reduce to one are excluded.

> [`IsNotStringLiteral<T, $O>`](./src/string/is_not_string_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a string literal.

> [`IsTemplateLiteral<T, $O>`](./src/string/is_template_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a template literal.

> [`IsNotTemplateLiteral<T, $O>`](./src/string/is_not_template_literal.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a template literal.

> [`StringIncludes<Subject, Search>`](./src/string/string.ts)

🎭 *predicate*, 🔢 *customizable*: `Subject` includes `Search`.

> [`StringSplit<S, Separator>`](./src/string/string.ts)

⚗️ *transform*: split `S` into a tuple of substrings.

> [`StringPlus`](./src/string/string_plus.ts)

🧰 *type util*: the string types whose names are too generic to sit on the top level.

### [Symbol](./src/symbol/readme.md)

> [`IsSymbol<T, $O>`](./src/symbol/is_symbol.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `symbol`.

> [`IsNotSymbol<T, $O>`](./src/symbol/is_not_symbol.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `symbol`.

### [Tuple](./src/tuple/readme.md)

> [`IsTuple<T, $O>`](./src/tuple/is_tuple.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is a tuple, excluding array.

> [`IsNotTuple<T, $O>`](./src/tuple/is_not_tuple.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not a tuple, excluding array.

> [`CreateTuple<L, T>`](./src/tuple/create_tuple.ts)

🦴 *utilities*: a tuple of `L` elements of type `T`.

> [`ToTuple<L, T, R>`](./src/tuple/create_tuple.ts)

㊙️ *internal*: the accumulator loop behind `CreateTuple`.

> [`CommonPropKeys<T>`](./src/tuple/common_prop_keys.ts)

⚗️ *transform*: the property keys common to every element of `T`.

> [`Tail<T>`](./src/tuple/tail.ts)

⚗️ *transform*: every entry of the tuple `T` except the first.

> [`DropFirst<T>`](./src/tuple/drop.ts)

⚗️ *transform*: drops the first entry of the tuple `T`.

> [`DropLast<T>`](./src/tuple/drop.ts)

⚗️ *transform*: drops the last entry of the tuple `T`.

> [`DropMatch<A, Criteria>`](./src/tuple/drop.ts)

⚗️ *transform*: drops the entries of `A` matching `Criteria`.

> [`DropNull<A>`](./src/tuple/drop.ts)

⚗️ *transform*, 👽 *alias*: `DropMatch<A, null>`.

> [`DropUndefined<A>`](./src/tuple/drop.ts)

⚗️ *transform*, 👽 *alias*: `DropMatch<A, undefined>`.

> [`DropNullable<A>`](./src/tuple/drop.ts)

⚗️ *transform*, 👽 *alias*: `DropMatch<A, null | undefined>`.

> [`TuplePlus`](./src/tuple/tuple_plus.ts)

🧰 *type util*: the tuple types whose names are too generic to sit on the top level.

> [`drop(array, value)`](./src/tuple/drop.ts)

💀 *deprecated*, 🏃 *runtime*, 🦴 *utilities*: drop a particular value from an array. No replacement.

### [Undefined](./src/undefined/readme.md)

> [`IsUndefined<T, $O>`](./src/undefined/is_undefined.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `undefined`.

> [`IsNotUndefined<T, $O>`](./src/undefined/is_not_undefined.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `undefined`.

> [`HasUndefined<T, $O>`](./src/undefined/has_undefined.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `undefined` or a union containing `undefined`.

### [unknown](./src/unknown/readme.md)

> [`IsUnknown<T, $O>`](./src/unknown/is_unknown.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is exactly `unknown`.

> [`IsNotUnknown<T, $O>`](./src/unknown/is_not_unknown.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not exactly `unknown`.

> [`NotUnknownOr<T, $Unknown>`](./src/unknown/not_unknown_or.ts)

🧰 *type util*: `T` when it is not `unknown`, otherwise `$Unknown`.

### [void](./src/void/readme.md)

> [`IsVoid<T, $O>`](./src/void/is_void.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `void`.

> [`IsNotVoid<T, $O>`](./src/void/is_not_void.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is not `void`.

> [`HasVoid<T, $O>`](./src/void/has_void.ts)

🎭 *predicate*, 🔢 *customizable*: `T` is `void` or a union containing `void`.

## Testing Utilities

[`type-plus`](./readme.md) provides some testing utilities to help you test your types.

One of the key utilities is [`testType`](./src/testing/readme.md#testtype).

```ts
import { testType } from 'type-plus'

testType.any<T>(true) // T is `any`
testType.equal<A, B>(true) // A is equal to B
testType.never<T>(false) // T is not `never`
```

To reuse a check across tests, extract it with the deferred form and assert it at the call site:

```ts
import { testType } from 'type-plus'

function testMyType<T>() {
	return [testType.defer.string<T>(), testType.defer.not.never<T>()]
}

testType.assert(testMyType<'a'>())
```

You can learn more about them in the [docs](./src/testing/readme.md).

## Constant Types

> `KeyTypes`

👽 *alias*: type of all keys.

> `PrimitiveTypes`

👽 *alias*: all primitive types, including `Function`, `symbol`, and `bigint`.

> `ComposableTypes`

👽 *alias*: Types that can contain custom properties. i.e. `object`, `array`, `function`.

> `NonComposableTypes`

👽 *alias*: Types that cannot contain custom properties. i.e. not composable.

## JSON Support

> `JSONPrimitive`

👽 *alias*: primitive types valid in JSON

> `JSONObject`

👽 *alias*: JSON object

> `JSONArray`

👽 *alias*: JSON array

> `JSONTypes`

👽 *alias*: all JSON compatible types.

> `JSONTypes.get<T>(obj, ...props)`

🦴 *utilities*: get a cast value in JSON

```ts
import { JSONTypes } from 'type-plus'

const someJson: JSONTypes = { a: { b: ['z', { c: 'miku' }]}}

JSONTypes.get<string>(someJson, 'a', 'b', 1, 'c') // miku
```

## Type manipulation

> `ANotB<A, B>`

🦴 *utilities*: get object with properties in `A` and not in `B`, including properties with a different value type.

> `BNotA<A, B>`

🦴 *utilities*: flip of `ANotB`

> `as<T>(subject)`

🦴 *utilities*: assert `subject` as `T`. Avoid ASI issues such as `;(x as T).abc`

> `asAny(subject)`

🦴 *utilities*: assert `subject` as `any`. Avoid ASI issue such as `;(x as any).abc`

> `EitherAnd<A, B, [C, D]>`

💀 *deprecated*, 🦴 *utilities*: Renamed to `EitherOrBoth`. Combines 2 to 4 types as `A | B | (A & B)`.

This is useful for combining options.

> `EitherOrBoth<A, B, [C, D]>`

🦴 *utilities*: combines 2 to 4 types as `A | B | (A & B)`.

This is useful for combining options [video](https://youtu.be/jBxx03NT4Ik).

> `Except<T, K>`

💀 *deprecated*, 🦴 *utilities*: same as `Omit<T, K>`.

> `ExcludePropType<T, U>`

🦴 *utilities*: excludes type `U` from properties in `T`.

> [`KeysOfOptional<T>`](./src/object/KeyofOptional.ts)

🦴 *utilities*: the key type of `T` as a record, i.e. the `K` in `Record<K, any>`.

> `KnownKeys<T>`

🦴 *utilities*: extract known (defined) keys from type `T`.

> `LeftJoin<A, B>`

🦴 *utilities*: left join `A` with `B`

> `NonNullable<T>` (TypeScript built-in)

🦴 *utilities*: removes `null` and `undefined` from `T`. `type-plus` no longer ships its own
`NonNull` and `NonUndefined`; use the built-in, or `IsNotNull` / `IsNotUndefined` to test instead.

> `Omit<T, K>`

🦴 *utilities*: From `T`, pick a set of properties whose keys are not in the union `K`. This is the opposite of `Pick<T, K>`.

> `OptionalKeys<T>`

🦴 *utilities*: gets keys of optional properties in `T`.

> `PartialExcept<T, U>`

💀 *deprecated*, 🦴 *utilities*: same as `PartialOmit<T, U>`.

> `PartialOmit<T, U>`

🦴 *utilities*: makes the properties not specified in `U` becomes optional.

> `PartialPick<T, U>`

🦴 *utilities*: makes the properties specified in `U` becomes optional.

> `Pick<T, K>`

🦴 *utilities*: pick properties `K` from `T`. Works with unions.

> `RecursivePartial<T>`

🦴 *utilities*: make type `T` optional recursively.

> `RecursiveRequired<T>`

🦴 *utilities*: make type `T` required recursively.

> `ReplaceProperty<T, K, V>`

🦴 *utilities*: replace property `K` in `T` with `V`.

> `RequiredKeys<T>`

🦴 *utilities*: gets keys of required properties in `T`.

> `RequiredPick<T, U>`

🦴 *utilities*: makes the properties specified in `U` become required.

> `RequiredExcept<T, U>`

🦴 *utilities*: makes the properties not specified in `U` become required.

> `RecursiveIntersect<T, U>`

🦴 *utilities*: intersect type `U` onto `T` recursively.

> `ValueOf<T>`

🦴 *utilities*: type of the value of the properties of `T`.

> `Widen<T>`

🦴 *utilities*: widen literal types.

PropType

💀 ...no helper type for this. Just do `YourType['propName']`.

## Type Predicates

Type predicates are type alias that returns `true` or `false`.
They can be used to compose complex types.

> `HasKey<T, K>`

🦴 *utilities*: predicate type checking `T` has key `K`.

> `IsAny<T>`

🦴 *utilities*: `T === any`.

> `IsBoolean<T>`

🦴 *utilities*: check for `boolean`, but not for `true` nor `false`.

> `IsDisjoint<A, B>`

🦴 *utilities*: is `A` and `B` is a disjoint set.

> `IsEmptyObject<T>`

🦴 *utilities*: is `T === {}`.

> `IsLiteral<T>`

🦴 *utilities*: is `T` a literal type (literal string or number).

### Logical

> [`If<Condition, $O>`](./src/predicates/If.ts)

🎭 *predicate*, 🔢 *customizable*: selects the `$then` branch when `Condition` is `true`, the `$else` branch otherwise.

> [`And<A, B, $O>`](./src/logical/logical.ts)

🎭 *predicate*, 🔢 *customizable*: logical `AND`.

> [`Or<A, B, $O>`](./src/logical/logical.ts)

🎭 *predicate*, 🔢 *customizable*: logical `OR`.

> [`Xor<A, B, $O>`](./src/logical/logical.ts)

🎭 *predicate*, 🔢 *customizable*: logical `XOR`.

> [`Not<X, $O>`](./src/logical/logical.ts)

🎭 *predicate*, 🔢 *customizable*: logical `NOT`.

Note that these types work correctly with the `boolean` type.
e.g.:

```ts
type R = And<boolean, true> // boolean
type R = Not<boolean>       // boolean
```

There is a problem with generic distribution: <https://github.com/microsoft/TypeScript/issues/41053>
So you may encounter some weird behavior if your logic is complex.

## Math

The math types in `type-plus` works with most numeric types.

It works with `number` and `bigint`, positive and negative number, including floating point numbers.

It will cast the type between `number` and `bigint` if needed.

> `Abs<N, Fail = never>`

🦴 *utilities*: `Abs(N)`.

> `Max<A, B, Fail = never>`

🦴 *utilities*: `max(A, B)`

> `GreaterThan<A, B>`

🦴 *utilities*: `A > B`.

> `Add<A, B>`

🦴 *utilities*: `A + B`.

> `Subtract<A, B>`

🦴 *utilities*: `A > B`.

> `Increment<A>`

🦴 *utilities*: alias of `Add<A, 1>`.

> `Decrement<A>`

🦴 *utilities*: alias of `Subtract<A, 1>`.

> `Multiply<A, B`

🦴 *utilities*: `A * B`.

## Utility Functions

> `amend(subject)...`

🦴 *utilities*: amend subject as union or intersect of `T`.

> `facade(subject, ...props)`

🦴 *utilities*: create a facade of `subject`.

> `getField(subject, key, defaultValue)`

🦴 *utilities*: get a field from a subject. Works against nullable and optional subject.

> `hasKey()`

🦴 *utilities*: function of `HasKey`.

> `hasProperty(value, prop)`

🦴 *utilities*: assert `value` has property `prop`. This will pick the correct union type.

> `isConstructor(subject)`

💀 *deprecated*, 🛡️ *guard*: `subject` is a constructor. Not a failsafe test — it returns `true` for
any function that can be called with `new`.

> `isSystemError(code, err)`

🦴 *utilities*: type guard `err` with NodeJS error code.

> `omit(obj, ...props)`

🦴 *utilities*: omit properties from `obj`.

> `pick(obj, ...props)`

🦴 *utilities*: pick properties from `obj`.

> `record<K, V>(value?)`

🦴 *utilities*: create a `Record<K, V>` without extra object prototype.

> `record<R>(value?)`

🦴 *utilities*: create a record `R` (e.g. `{ a: number }`) without extra object prototype.

> `required(...)`

🦴 *utilities*: merge options and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `requiredDeep(...)`

🦴 *utilities*: merge options deeply and remove `Partial<T>`. From [`unpartial`](https://github.com/unional/unpartial)

> `split(target, ...splitters)`

🦴 *utilities*: split one object into multiple objects.

> `stub<T>(value)`

🦴 *utilities*: stub a particular type `T`.

> `stub.build<T>(init?)`

🦴 *utilities*: build a stub for particular type `T`.

> `typeOverrideIncompatible<T>()`

🦴 *utilities*: override only the incompatible portion between two types.

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

💀 *deprecated*, 🦴 *utilities*: merge options and remove `Partial<T>` values. Use composition
instead: `unpartial(unpartial(a, b), c)`. From [`unpartial`](https://github.com/unional/unpartial)

> `context()`

🦴 *utilities*: a context builder.

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

🦴 *utilities*: compare if the two values are nominally equal.

Works with both `Brand` and `Flavor`.

```ts
const b1 = brand('x', 1)
const b2 = brand('y', 1)

nominalMatch(b1, b2) // false
```

## Functional Types

> `ChainFn<T>: T`

🦴 *utilities*: chain function that returns the input type.

> `compose(...fns): F`

🦴 *utilities*: compose functions

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
