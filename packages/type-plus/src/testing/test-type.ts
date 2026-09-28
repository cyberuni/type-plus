import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $MergeOptions } from '../$type/utils/$merge-options.js'
import type { $ForwardOptions, $StrictOptions } from '../$type/utils/$strict-options.js'
import type { IsAny } from '../any/is-any.js'
import type { IsArray } from '../array/is-array.js'
import type { IsBigint } from '../bigint/is-bigint.js'
import type { IsBoolean } from '../boolean/is-boolean.js'
import type { IsFalse } from '../boolean/is-false.js'
import type { IsTrue } from '../boolean/is-true.js'
import type { IsEqual } from '../equal/is-equal.js'
import type { AnyFunction } from '../function/any-function.js'
import type { IsFunction } from '../function/is-function.js'
import type { IsNever } from '../never/is-never.js'
import type { HasNull } from '../null/has-null.js'
import type { IsNull } from '../null/is-null.js'
import type { IsNumber } from '../number/is-number.js'
import type { HasKey } from '../object/has-key.js'
import type { IsObject } from '../object/is-object.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsString } from '../string/is-string.js'
import type { IsSymbol } from '../symbol/is-symbol.js'
import type { IsTuple } from '../tuple/is-tuple.js'
import type { HasUndefined } from '../undefined/has-undefined.js'
import type { IsUndefined } from '../undefined/is-undefined.js'
import type { IsUnknown } from '../unknown/is-unknown.js'
import type { HasVoid } from '../void/has-void.js'
import type { IsVoid } from '../void/is-void.js'
import type { _CallableWith, _ConstructibleWith } from './_callable-with.js'

/**
 * What `PromiseLike` `T` resolves to, one level deep and distributed over a union.
 */
type Resolved<T> = T extends PromiseLike<infer R> ? R : never

export namespace testType {
	/**
	 * Options accepted by the `testType.*` type checks.
	 *
	 * These are the behavioral options of the underlying `IsXXX` types.
	 * Selection and branching options are intentionally excluded:
	 * `testType` always resolves its check as a predicate,
	 * so that `expected` stays a `true`/`false` literal.
	 *
	 * Each method merges the options you pass over its own defaults,
	 * so omitting the type argument keeps the historical behavior.
	 *
	 * @example
	 * ```ts
	 * testType.string<'a'>(true) // default: not exact
	 * testType.string<'a', { exact: true }>(false) // opt into exact comparison
	 * testType.number<1 | 'a', { distributive: true }>(true) // distributes to `boolean`
	 * ```
	 */
	export type $Options = $Distributive.Options & $Exact.Options

	export interface TestType {
		/**
		 * Check if type `A` is equal to type `B` and `C`.
		 *
		 * @return `expected` as `A` for type inspection.
		 */
		equal<A, B, C>(expected: Expectation<IsEqual<A, B> & IsEqual<A, C>, 'equal', A, B | C>): A
		/**
		 * Check if type `A` is equal to type `B`.
		 *
		 * @return `expected` as `A` for type inspection.
		 */
		equal<A, B>(expected: Expectation<IsEqual<A, B>, 'equal', A, B>): A
		/**
		 * Check if `A` can assign to `B`.
		 *
		 * If `A` is a union,
		 * the check is distributive.
		 *
		 * Meaning the result can be `boolean`,
		 * meaning both `true` and `false` will pass.
		 *
		 * If you want to avoid the distributivity,
		 * use `testType.strictCanAssign()` instead.
		 *
		 * @example
		 * ```ts
		 * testType.canAssign<123, number> // true
		 *
		 * testType.canAssign<number | string, number> // boolean
		 * ```
		 *
		 * @return `expected` as `A` for type inspection.
		 */
		canAssign<A, B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(
			expected: Expectation<Assignable<A, B, $ForwardOptions<$O, Assignable.$Options>>, 'canAssign', A, B>,
		): A
		/**
		 * Check if `A` can fully assign to `B`.
		 *
		 * This checks all branches in an union `A` are assignable to `B`.
		 *
		 * @example
		 * ```ts
		 * testType.strictCanAssign<number | string, number | string> // true
		 *
		 * testType.strictCanAssign<number | string, number> // false
		 * ```
		 *
		 * @return `expected` as `A` for type inspection.
		 */
		strictCanAssign<A, B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(
			expected: Expectation<
				Assignable<A, B, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, Assignable.$Options>>>,
				'strictCanAssign',
				A,
				B
			>,
		): A
		/**
		 * Check if a function of type `F` can be called with arguments of the types in `Args`.
		 *
		 * The check passes when one of the overloads of `F` accepts `Args`,
		 * as a call would pick it.
		 * `equal` cannot express this for an overloaded function:
		 * `Parameters<F>` keeps only the last overload.
		 *
		 * Up to ten overloads are read.
		 * A generic overload is checked against the constraints of its type parameters,
		 * so `<T extends string>(value: T) => T` accepts `[string]`.
		 * A union of functions must accept `Args` in every member.
		 *
		 * @example
		 * ```ts
		 * function f(value: string): string
		 * function f(value: number, radix: number): string
		 *
		 * testType.callableWith<typeof f, [string]>(true)
		 * testType.callableWith<typeof f, [number, number]>(true)
		 * testType.callableWith<typeof f, [number]>(false) // no overload takes one number
		 * ```
		 *
		 * @return `expected` as `F` for type inspection.
		 */
		callableWith<F, Args extends readonly unknown[]>(
			expected: Expectation<_CallableWith<F, Args>, 'callableWith', F, Args>,
		): F
		/**
		 * Check if a class or constructor of type `F` can be constructed with `new`
		 * and arguments of the types in `Args`.
		 *
		 * The construct-signature counterpart of {@link testType.TestType.callableWith}:
		 * the check passes when one of the construct signatures of `F` accepts `Args`.
		 * An abstract class cannot be constructed, so it fails.
		 *
		 * @example
		 * ```ts
		 * testType.constructibleWith<DateConstructor, []>(true)
		 * testType.constructibleWith<DateConstructor, [number, number]>(true)
		 * testType.constructibleWith<DateConstructor, [boolean]>(false)
		 * ```
		 *
		 * @return `expected` as `F` for type inspection.
		 */
		constructibleWith<F, Args extends readonly unknown[]>(
			expected: Expectation<_ConstructibleWith<F, Args>, 'constructibleWith', F, Args>,
		): F
		/**
		 * Check if type `T` is exactly `any`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		any<T>(expected: Expectation<IsAny<T>, 'any', T, any>): T
		/**
		 * Check if type `T` is exactly `array`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		array<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsArray<T, $MergeOptions<{ exact: true }, $ForwardOptions<$O, IsArray.$Options>>>,
				'array',
				T,
				unknown[]
			>,
		): T
		/**
		 * Check if type `T` is exactly `bigint`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBigint<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBigint<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBigint.$Options>>>,
				'strictBigint',
				T,
				bigint
			>,
		): T
		/**
		 * Check if type `T` is `bigint` or bigint literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		bigint<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBigint<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBigint.$Options>>>,
				'bigint',
				T,
				bigint
			>,
		): T
		/**
		 * Check if type `T` is exactly `boolean`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBoolean<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBoolean<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBoolean.$Options>>>,
				'strictBoolean',
				T,
				boolean
			>,
		): T
		/**
		 * Check if type `T` is `boolean` and boolean literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		boolean<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBoolean<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBoolean.$Options>>>,
				'boolean',
				T,
				boolean
			>,
		): T
		/**
		 * Check if type `T` is exactly `true`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		true<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsTrue<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTrue.$Options>>>,
				'true',
				T,
				true
			>,
		): T
		/**
		 * Check if type `T` is exactly `false`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		false<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFalse<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFalse.$Options>>>,
				'false',
				T,
				false
			>,
		): T
		/**
		 * Check if type `T` is exactly `Function`, not a function signature.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictFunction<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFunction<
					T,
					$MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsFunction.$Options, 'exact'>>
				>,
				'strictFunction',
				T,
				Function
			>,
		): T
		/**
		 * Check if type `T` is `boolean` and boolean literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		function<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFunction<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFunction.$Options>>>,
				'function',
				T,
				Function
			>,
		): T
		/**
		 * Check if type `T` is exactly `never`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		never<T>(expected: Expectation<IsNever<T>, 'never', T, never>): T
		/**
		 * Check if type `T` is exactly `null`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		null<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNull<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNull.$Options>>>,
				'null',
				T,
				null
			>,
		): T
		/**
		 * Check if type `T` is `null` or an union containing `null`.
		 *
		 * Special types (`any`, `unknown`, `never`, `void`) are not considered as containing `null`,
		 * consistent with `testType.null()`.
		 *
		 * Takes no `$Options`: `distributive` is what the check is made of,
		 * and `null` has no literal subtype for `exact` to narrow.
		 *
		 * @example
		 * ```ts
		 * testType.hasNull<null>(true)
		 * testType.hasNull<number | null>(true)
		 *
		 * testType.hasNull<number>(false)
		 * ```
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasNull<T>(expected: Expectation<HasNull<T>, 'hasNull', T, null>): T
		/**
		 * Check if type `T` is exactly `number`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictNumber<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNumber<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsNumber.$Options>>>,
				'strictNumber',
				T,
				number
			>,
		): T
		/**
		 * Check if type `T` is `number` or number literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		number<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNumber<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNumber.$Options>>>,
				'number',
				T,
				number
			>,
		): T
		/**
		 * Check if type `T` is `object`.
		 *
		 * Note that `Function`, `Array`, and *tuple* are also `object`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		object<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsObject<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsObject.$Options>>>,
				'object',
				T,
				object
			>,
		): T
		/**
		 * Check if type `T` is exactly `string`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictString<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsString<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsString.$Options>>>,
				'strictString',
				T,
				string
			>,
		): T
		/**
		 * Check if type `T` is `string` or string literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		string<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsString<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsString.$Options>>>,
				'string',
				T,
				string
			>,
		): T
		/**
		 * Check if type `T` is a `symbol`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		symbol<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsSymbol<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsSymbol.$Options>>>,
				'symbol',
				T,
				symbol
			>,
		): T
		/**
		 * Check if type `T` is a *tuple*.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		tuple<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsTuple<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTuple.$Options>>>,
				'tuple',
				T,
				readonly unknown[]
			>,
		): T
		/**
		 * Check if type `T` is exactly `undefined`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		undefined<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsUndefined<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsUndefined.$Options>>>,
				'undefined',
				T,
				undefined
			>,
		): T
		/**
		 * Check if type `T` is `undefined` or an union containing `undefined`.
		 *
		 * Special types (`any`, `unknown`, `never`, `void`) are not considered as containing
		 * `undefined`, consistent with `testType.undefined()`.
		 *
		 * Takes no `$Options`: `distributive` is what the check is made of,
		 * and `undefined` has no literal subtype for `exact` to narrow.
		 *
		 * @example
		 * ```ts
		 * testType.hasUndefined<undefined>(true)
		 * testType.hasUndefined<number | undefined>(true)
		 *
		 * testType.hasUndefined<number>(false)
		 * ```
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasUndefined<T>(expected: Expectation<HasUndefined<T>, 'hasUndefined', T, undefined>): T
		/**
		 * Check if type `T` is exactly `unknown`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		unknown<T>(expected: Expectation<IsUnknown<T>, 'unknown', T, unknown>): T
		/**
		 * Check if type `T` is exactly `void`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		void<T, $O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsVoid<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsVoid.$Options>>>,
				'void',
				T,
				void
			>,
		): T
		/**
		 * Check if type `T` is `void` or an union containing `void`.
		 *
		 * Special types (`any`, `unknown`, `never`) are not considered as containing `void`,
		 * consistent with `testType.void()`.
		 *
		 * Takes no `$Options`: `distributive` is what the check is made of,
		 * and `void` has no literal subtype for `exact` to narrow.
		 *
		 * @example
		 * ```ts
		 * testType.hasVoid<void>(true)
		 * testType.hasVoid<number | void>(true)
		 *
		 * testType.hasVoid<number>(false)
		 * ```
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasVoid<T>(expected: Expectation<HasVoid<T>, 'hasVoid', T, void>): T
		/**
		 * Check if type `T` has the key `K`.
		 *
		 * The check is {@link HasKey} resolved as {@link IsTrue},
		 * so it is `testType.true<HasKey<T, K>>(expected)` under a name.
		 *
		 * A union `K` passes only when `T` has every key in it,
		 * and a union `T` has only the keys its members share.
		 * An optional key counts as present.
		 *
		 * Takes no `$Options`: `distributive` and `exact` have nothing to act on.
		 *
		 * @example
		 * ```ts
		 * testType.property<{ a: 1 }, 'a'>(true)
		 * testType.property<{ a?: 1 }, 'a'>(true)
		 * testType.property<{ a: 1 }, 'b'>(false)
		 *
		 * testType.property<{ a: 1; b: 2 }, 'a' | 'b'>(true)
		 * testType.property<{ a: 1 }, 'a' | 'b'>(false)
		 *
		 * testType.property<{ a: 1 } | { a: 2; b: 2 }, 'b'>(false)
		 * ```
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		property<T, K extends PropertyKey>(
			expected: Expectation<IsTrue<HasKey<T, K>, { distributive: false }>, 'property', T, Record<K, unknown>>,
		): T
		/**
		 * Check the type of a value.
		 *
		 * `testType.of(value)` binds the subject of the checks to the type of `value`,
		 * so you can check an inline expression or the inferred result of a generic call
		 * without naming a variable and writing `typeof`.
		 *
		 * Every check on the returned {@link testType.Subject} is the `testType` check
		 * of the same name, with its first type parameter already filled in.
		 * `testType.of(value).equal<B>(true)` is `testType.equal<typeof value, B>(true)`.
		 *
		 * The type is inferred as TypeScript infers any generic argument:
		 * an inline literal widens (`'a'` is checked as `string`),
		 * so write `as const` to keep it narrow.
		 * The value is never read.
		 *
		 * 🧪 *testing*
		 *
		 * @example
		 * ```ts
		 * testType.of([1, 2].map(String)).equal<string[]>(true)
		 * testType.of('a').string(true)
		 * testType.of('a').equal<'a'>(false) // widened to `string`
		 * testType.of('a' as const).equal<'a'>(true)
		 * ```
		 */
		of<T>(value: T): Subject<T>
		/**
		 * Deferred variants of the `testType` checks.
		 *
		 * A `testType.*` check asserts *immediately*: the expected value is an argument,
		 * so the failure is reported where the check is written.
		 * That makes it impossible to extract a check into a reusable helper —
		 * the helper body is checked once, against its unresolved type parameters.
		 *
		 * A `testType.defer.*` check takes no argument and *returns* the result as a type.
		 * Collect the results, return them from the helper,
		 * and hand them to `testType.assert()` at the call site,
		 * where the type parameters are resolved and the failure belongs.
		 *
		 * 🧪 *testing*
		 *
		 * @example
		 * ```ts
		 * function testMyType<T>() {
		 *   return [
		 *     testType.defer.equal<T, string>(),
		 *     testType.defer.not.never<T>(),
		 *   ]
		 * }
		 *
		 * it('blah', () => { testType.assert(testMyType<string>()) })
		 * it('bruh', () => { testType.assert(testMyType<'a'>()) })
		 * ```
		 */
		defer: Defer
		/**
		 * Assert that every deferred result passes.
		 *
		 * Accepts results in any shape a helper finds convenient to return —
		 * a single result, an array, an object, or any nesting of those.
		 *
		 * A failing result is a {@link testType.Failed} type,
		 * so the error names the check that failed along with the actual and expected types.
		 *
		 * 🧪 *testing*
		 *
		 * @example
		 * ```ts
		 * testType.assert(testType.defer.equal<1, 1>())
		 * testType.assert(testMyType<string>(), testMyOtherType<string>())
		 * ```
		 */
		assert(...results: Passed[]): void
		/**
		 * A quick way to inspect a type.
		 *
		 * The handler receives a `InspectedType` object.
		 * It contains `value` which is typed to `T`,
		 * and many other properties to inspect the behavior of `T`.
		 *
		 * The handler is not being call,
		 * it is use to hold the type in value for inspection.
		 *
		 * 🧪 *testing*
		 * 🦴 *utilities*
		 *
		 * @example
		 * ```ts
		 * testType.inspect<SomeType>(t => {
		 *   type T = typeof t.value // resolve and inspect the type `T`
		 *   t.extend_boolean // result of `T extends boolean`
		 * })
		 * ```
		 *
		 * After trying out the type, remove the line.
		 */
		inspect<T>(handler: (t: InspectedType<T>) => unknown): T
	}

	/**
	 * A deferred check that passed.
	 *
	 * Also the shape `testType.assert()` accepts:
	 * a passing result, or any array/object nesting of passing results.
	 */
	export type Passed = true | readonly Passed[] | { readonly [key: string]: Passed }

	/**
	 * A deferred check that failed.
	 *
	 * It is not assignable to {@link testType.Passed},
	 * so `testType.assert()` rejects it,
	 * and the compiler error names the check along with the actual and expected types.
	 */
	export interface Failed<Check extends string, Actual, Expected> {
		failed: Check
		actual: Actual
		expected: Expected
	}

	/**
	 * The `expected` parameter of an immediate `testType.*` check.
	 *
	 * `Result` is the check's predicate result.
	 * When it is `true` or `false`, the parameter accepts that literal,
	 * or a {@link testType.Failed} naming the check that the other literal would assert.
	 * No boolean literal is assignable to `Failed`,
	 * so passing the wrong literal fails with an error that names the check,
	 * the actual type, and the expected type —
	 * the same `Failed` a deferred check reports.
	 *
	 * When `Result` is `boolean` (a distributive check over a union),
	 * both literals pass and there is nothing to name.
	 * When `Result` is `never` (the three-type `testType.equal` when the types differ),
	 * no literal passes, and the parameter is the `Failed` alone.
	 *
	 * `Result` is deliberately unconstrained.
	 * Constraining it to `boolean` makes the compiler prove every check's generic predicate
	 * (`IsString<T, $MergeOptions<…>>` and the like) is a `boolean` when it checks `testType.TestType`,
	 * which does not finish in a practical time.
	 *
	 * @example
	 * ```ts
	 * type R = testType.Expectation<false, 'equal', string, number>
	 * //   ^? false | testType.Failed<'equal', string, number>
	 *
	 * // Argument of type 'true' is not assignable to parameter of type
	 * // 'false | Failed<"equal", string, number>'.
	 * testType.equal<string, number>(true)
	 * ```
	 */
	export type Expectation<Result, Check extends string, Actual, Expected> = [Result] extends [never]
		? Failed<Check, Actual, Expected>
		: [Result] extends [true]
			? true | Failed<`not ${Check}`, Actual, Expected>
			: [Result] extends [false]
				? false | Failed<Check, Actual, Expected>
				: Result

	/**
	 * Resolves a deferred check to `true` when `Actual` accepts the expectation `Expect`,
	 * and to `F` (a {@link testType.Failed}) when it does not.
	 *
	 * `Expect extends Actual` mirrors how the immediate `testType.*` checks work:
	 * they accept the expected value when it is assignable to the predicate result,
	 * so a distributive predicate that widens to `boolean` accepts both `true` and `false`.
	 */
	export type Check<Expect extends boolean, Actual, F> = Expect extends Actual ? true : F

	/**
	 * The name a failed check reports, negated for `testType.defer.not.*`.
	 */
	export type CheckName<Expect extends boolean, Name extends string> = Expect extends true ? Name : `not ${Name}`

	/**
	 * `testType.defer` — the deferred checks, plus `not` for the negated ones.
	 */
	export interface Defer extends DeferredTestType<true> {
		/**
		 * The negated deferred checks.
		 *
		 * `testType.defer.not.equal<A, B>()` is the deferred form of `testType.equal<A, B>(false)`.
		 */
		not: DeferredTestType<false>
	}

	/**
	 * The deferred mirror of {@link testType.TestType}.
	 *
	 * Every check takes the same type parameters as its immediate counterpart,
	 * takes no value argument,
	 * and returns `true` when it passes or a {@link testType.Failed} when it does not.
	 *
	 * `testType.inspect` has no deferred form — it is a development aid, not a check.
	 */
	export interface DeferredTestType<Expect extends boolean> {
		/**
		 * Deferred {@link testType.TestType.equal}: is type `A` equal to type `B` and `C`?
		 */
		equal<A, B, C>(): Check<Expect, IsEqual<A, B> & IsEqual<A, C>, Failed<CheckName<Expect, 'equal'>, A, B | C>>
		/**
		 * Deferred {@link testType.TestType.equal}: is type `A` equal to type `B`?
		 */
		equal<A, B>(): Check<Expect, IsEqual<A, B>, Failed<CheckName<Expect, 'equal'>, A, B>>
		/**
		 * Deferred {@link testType.TestType.canAssign}: can `A` assign to `B`?
		 */
		canAssign<A, B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(): Check<
			Expect,
			Assignable<A, B, $ForwardOptions<$O, Assignable.$Options>>,
			Failed<CheckName<Expect, 'canAssign'>, A, B>
		>
		/**
		 * Deferred {@link testType.TestType.strictCanAssign}: can `A` fully assign to `B`?
		 */
		strictCanAssign<A, B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(): Check<
			Expect,
			Assignable<A, B, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, Assignable.$Options>>>,
			Failed<CheckName<Expect, 'strictCanAssign'>, A, B>
		>
		/**
		 * Deferred {@link testType.TestType.callableWith}: can `F` be called with `Args`?
		 */
		callableWith<F, Args extends readonly unknown[]>(): Check<
			Expect,
			_CallableWith<F, Args>,
			Failed<CheckName<Expect, 'callableWith'>, F, Args>
		>
		/**
		 * Deferred {@link testType.TestType.constructibleWith}: can `F` be constructed with `Args`?
		 */
		constructibleWith<F, Args extends readonly unknown[]>(): Check<
			Expect,
			_ConstructibleWith<F, Args>,
			Failed<CheckName<Expect, 'constructibleWith'>, F, Args>
		>
		/**
		 * Deferred {@link testType.TestType.any}: is type `T` exactly `any`?
		 */
		any<T>(): Check<Expect, IsAny<T>, Failed<CheckName<Expect, 'any'>, T, any>>
		/**
		 * Deferred {@link testType.TestType.never}: is type `T` exactly `never`?
		 */
		never<T>(): Check<Expect, IsNever<T>, Failed<CheckName<Expect, 'never'>, T, never>>
		/**
		 * Deferred {@link testType.TestType.unknown}: is type `T` exactly `unknown`?
		 */
		unknown<T>(): Check<Expect, IsUnknown<T>, Failed<CheckName<Expect, 'unknown'>, T, unknown>>
		/**
		 * Deferred {@link testType.TestType.array}.
		 */
		array<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsArray<T, $MergeOptions<{ exact: true }, $ForwardOptions<$O, IsArray.$Options>>>,
			Failed<CheckName<Expect, 'array'>, T, unknown[]>
		>
		/**
		 * Deferred {@link testType.TestType.strictBigint}.
		 */
		strictBigint<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsBigint<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBigint.$Options>>>,
			Failed<CheckName<Expect, 'strictBigint'>, T, bigint>
		>
		/**
		 * Deferred {@link testType.TestType.bigint}.
		 */
		bigint<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsBigint<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBigint.$Options>>>,
			Failed<CheckName<Expect, 'bigint'>, T, bigint>
		>
		/**
		 * Deferred {@link testType.TestType.strictBoolean}.
		 */
		strictBoolean<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsBoolean<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBoolean.$Options>>>,
			Failed<CheckName<Expect, 'strictBoolean'>, T, boolean>
		>
		/**
		 * Deferred {@link testType.TestType.boolean}.
		 */
		boolean<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsBoolean<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBoolean.$Options>>>,
			Failed<CheckName<Expect, 'boolean'>, T, boolean>
		>
		/**
		 * Deferred {@link testType.TestType.true}.
		 */
		true<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsTrue<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTrue.$Options>>>,
			Failed<CheckName<Expect, 'true'>, T, true>
		>
		/**
		 * Deferred {@link testType.TestType.false}.
		 */
		false<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsFalse<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFalse.$Options>>>,
			Failed<CheckName<Expect, 'false'>, T, false>
		>
		/**
		 * Deferred {@link testType.TestType.strictFunction}.
		 */
		strictFunction<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsFunction<
				T,
				$MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsFunction.$Options, 'exact'>>
			>,
			Failed<CheckName<Expect, 'strictFunction'>, T, Function>
		>
		/**
		 * Deferred {@link testType.TestType.function}.
		 */
		function<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsFunction<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFunction.$Options>>>,
			Failed<CheckName<Expect, 'function'>, T, Function>
		>
		/**
		 * Deferred {@link testType.TestType.null}.
		 */
		null<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsNull<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNull.$Options>>>,
			Failed<CheckName<Expect, 'null'>, T, null>
		>
		/**
		 * Deferred {@link testType.TestType.hasNull}.
		 */
		hasNull<T>(): Check<Expect, HasNull<T>, Failed<CheckName<Expect, 'hasNull'>, T, null>>
		/**
		 * Deferred {@link testType.TestType.strictNumber}.
		 */
		strictNumber<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsNumber<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsNumber.$Options>>>,
			Failed<CheckName<Expect, 'strictNumber'>, T, number>
		>
		/**
		 * Deferred {@link testType.TestType.number}.
		 */
		number<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsNumber<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNumber.$Options>>>,
			Failed<CheckName<Expect, 'number'>, T, number>
		>
		/**
		 * Deferred {@link testType.TestType.object}.
		 */
		object<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsObject<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsObject.$Options>>>,
			Failed<CheckName<Expect, 'object'>, T, object>
		>
		/**
		 * Deferred {@link testType.TestType.strictString}.
		 */
		strictString<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsString<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsString.$Options>>>,
			Failed<CheckName<Expect, 'strictString'>, T, string>
		>
		/**
		 * Deferred {@link testType.TestType.string}.
		 */
		string<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsString<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsString.$Options>>>,
			Failed<CheckName<Expect, 'string'>, T, string>
		>
		/**
		 * Deferred {@link testType.TestType.symbol}.
		 */
		symbol<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsSymbol<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsSymbol.$Options>>>,
			Failed<CheckName<Expect, 'symbol'>, T, symbol>
		>
		/**
		 * Deferred {@link testType.TestType.tuple}.
		 */
		tuple<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsTuple<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTuple.$Options>>>,
			Failed<CheckName<Expect, 'tuple'>, T, readonly unknown[]>
		>
		/**
		 * Deferred {@link testType.TestType.undefined}.
		 */
		undefined<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsUndefined<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsUndefined.$Options>>>,
			Failed<CheckName<Expect, 'undefined'>, T, undefined>
		>
		/**
		 * Deferred {@link testType.TestType.hasUndefined}.
		 */
		hasUndefined<T>(): Check<Expect, HasUndefined<T>, Failed<CheckName<Expect, 'hasUndefined'>, T, undefined>>
		/**
		 * Deferred {@link testType.TestType.void}.
		 */
		void<T, $O extends $StrictOptions<$O, $Options> = {}>(): Check<
			Expect,
			IsVoid<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsVoid.$Options>>>,
			Failed<CheckName<Expect, 'void'>, T, void>
		>
		/**
		 * Deferred {@link testType.TestType.hasVoid}.
		 */
		hasVoid<T>(): Check<Expect, HasVoid<T>, Failed<CheckName<Expect, 'hasVoid'>, T, void>>
		/**
		 * Deferred {@link testType.TestType.property}: does type `T` have the key `K`?
		 */
		property<T, K extends PropertyKey>(): Check<
			Expect,
			IsTrue<HasKey<T, K>, { distributive: false }>,
			Failed<CheckName<Expect, 'property'>, T, Record<K, unknown>>
		>
	}

	/**
	 * The checks of {@link testType.TestType}, with the subject bound to `T`.
	 *
	 * Returned by `testType.of(value)`.
	 * Each check takes the same arguments as its `testType` counterpart,
	 * minus the first type parameter, which is `T`.
	 *
	 * `parameters`, `returns` and `resolves` bind a part of `T` as a new subject,
	 * so the same checks apply to a function's parameters, its return type, or what a promise resolves to.
	 *
	 * 🧪 *testing*
	 *
	 * @example
	 * ```ts
	 * testType.of((a: number) => String(a)).returns.equal<string>(true)
	 *
	 * const subject = testType.of({ a: 1 })
	 * subject.equal<{ a: number }>(true)
	 * subject.canAssign<{ a: 1 }>(false)
	 * subject.object(true)
	 * ```
	 */
	export interface Subject<T> {
		/**
		 * The parameters of the function `T`, as a tuple, bound as the new subject.
		 *
		 * `testType.of(fn).parameters.equal<P>(true)` is `testType.equal<Parameters<typeof fn>, P>(true)`.
		 * For a union of functions it is the union of their parameter tuples,
		 * and for an overloaded function it is the parameters of the last overload,
		 * as with `Parameters<T>`.
		 *
		 * When `T` is not a function, it is a {@link testType.Failed} with no checks,
		 * so any check on it is a compile error that names `parameters` and the actual type.
		 *
		 * @example
		 * ```ts
		 * testType.of((a: number, b?: string) => [a, b]).parameters.equal<[a: number, b?: string | undefined]>(true)
		 * testType.of(() => 1).parameters.equal<[]>(true)
		 * ```
		 */
		parameters: [T] extends [AnyFunction]
			? Subject<Parameters<Extract<T, AnyFunction>>>
			: Failed<'parameters', T, AnyFunction>
		/**
		 * The return type of the function `T`, bound as the new subject.
		 *
		 * `testType.of(fn).returns.equal<R>(true)` is `testType.equal<ReturnType<typeof fn>, R>(true)`.
		 * For a union of functions it is the union of their return types,
		 * and for an overloaded function it is the return type of the last overload,
		 * as with `ReturnType<T>`.
		 *
		 * When `T` is not a function, it is a {@link testType.Failed} with no checks,
		 * so any check on it is a compile error that names `returns` and the actual type.
		 *
		 * @example
		 * ```ts
		 * testType.of((a: number) => String(a)).returns.equal<string>(true)
		 * testType.of(async () => 1).returns.equal<Promise<number>>(true)
		 * ```
		 */
		returns: [T] extends [AnyFunction]
			? Subject<ReturnType<Extract<T, AnyFunction>>>
			: Failed<'returns', T, AnyFunction>
		/**
		 * The type that the promise (or other `PromiseLike`) `T` resolves to, bound as the new subject.
		 *
		 * It unwraps one level, so chain it after `returns` to check an async function:
		 * `testType.of(fn).returns.resolves.equal<R>(true)`.
		 * For a union of promises it is the union of what they resolve to.
		 *
		 * When `T` is not a `PromiseLike`, it is a {@link testType.Failed} with no checks,
		 * so any check on it is a compile error that names `resolves` and the actual type.
		 *
		 * @example
		 * ```ts
		 * testType.of(Promise.resolve(1)).resolves.equal<number>(true)
		 * testType.of(async () => 'a' as const).returns.resolves.equal<'a'>(true)
		 * ```
		 */
		resolves: [T] extends [PromiseLike<any>] ? Subject<Resolved<T>> : Failed<'resolves', T, PromiseLike<unknown>>
		/**
		 * {@link testType.TestType.equal}: is type `T` equal to type `B` and `C`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		equal<B, C>(expected: Expectation<IsEqual<T, B> & IsEqual<T, C>, 'equal', T, B | C>): T
		/**
		 * {@link testType.TestType.equal}: is type `T` equal to type `B`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		equal<B>(expected: Expectation<IsEqual<T, B>, 'equal', T, B>): T
		/**
		 * {@link testType.TestType.canAssign}: can `T` assign to `B`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		canAssign<B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(
			expected: Expectation<Assignable<T, B, $ForwardOptions<$O, Assignable.$Options>>, 'canAssign', T, B>,
		): T
		/**
		 * {@link testType.TestType.strictCanAssign}: can `T` fully assign to `B`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictCanAssign<B, $O extends $StrictOptions<$O, $Distributive.Options> = {}>(
			expected: Expectation<
				Assignable<T, B, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, Assignable.$Options>>>,
				'strictCanAssign',
				T,
				B
			>,
		): T
		/**
		 * {@link testType.TestType.callableWith}: can `T` be called with `Args`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		callableWith<Args extends readonly unknown[]>(
			expected: Expectation<_CallableWith<T, Args>, 'callableWith', T, Args>,
		): T
		/**
		 * {@link testType.TestType.constructibleWith}: can `T` be constructed with `Args`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		constructibleWith<Args extends readonly unknown[]>(
			expected: Expectation<_ConstructibleWith<T, Args>, 'constructibleWith', T, Args>,
		): T
		/**
		 * {@link testType.TestType.any}: is type `T` exactly `any`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		any(expected: Expectation<IsAny<T>, 'any', T, any>): T
		/**
		 * {@link testType.TestType.array}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		array<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsArray<T, $MergeOptions<{ exact: true }, $ForwardOptions<$O, IsArray.$Options>>>,
				'array',
				T,
				unknown[]
			>,
		): T
		/**
		 * {@link testType.TestType.strictBigint}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBigint<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBigint<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBigint.$Options>>>,
				'strictBigint',
				T,
				bigint
			>,
		): T
		/**
		 * {@link testType.TestType.bigint}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		bigint<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBigint<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBigint.$Options>>>,
				'bigint',
				T,
				bigint
			>,
		): T
		/**
		 * {@link testType.TestType.strictBoolean}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBoolean<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBoolean<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsBoolean.$Options>>>,
				'strictBoolean',
				T,
				boolean
			>,
		): T
		/**
		 * {@link testType.TestType.boolean}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		boolean<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsBoolean<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsBoolean.$Options>>>,
				'boolean',
				T,
				boolean
			>,
		): T
		/**
		 * {@link testType.TestType.true}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		true<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsTrue<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTrue.$Options>>>,
				'true',
				T,
				true
			>,
		): T
		/**
		 * {@link testType.TestType.false}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		false<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFalse<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFalse.$Options>>>,
				'false',
				T,
				false
			>,
		): T
		/**
		 * {@link testType.TestType.strictFunction}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictFunction<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFunction<
					T,
					$MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsFunction.$Options, 'exact'>>
				>,
				'strictFunction',
				T,
				Function
			>,
		): T
		/**
		 * {@link testType.TestType.function}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		function<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsFunction<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsFunction.$Options>>>,
				'function',
				T,
				Function
			>,
		): T
		/**
		 * {@link testType.TestType.never}: is type `T` exactly `never`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		never(expected: Expectation<IsNever<T>, 'never', T, never>): T
		/**
		 * {@link testType.TestType.null}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		null<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNull<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNull.$Options>>>,
				'null',
				T,
				null
			>,
		): T
		/**
		 * {@link testType.TestType.hasNull}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasNull(expected: Expectation<HasNull<T>, 'hasNull', T, null>): T
		/**
		 * {@link testType.TestType.strictNumber}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictNumber<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNumber<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsNumber.$Options>>>,
				'strictNumber',
				T,
				number
			>,
		): T
		/**
		 * {@link testType.TestType.number}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		number<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsNumber<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsNumber.$Options>>>,
				'number',
				T,
				number
			>,
		): T
		/**
		 * {@link testType.TestType.object}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		object<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsObject<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsObject.$Options>>>,
				'object',
				T,
				object
			>,
		): T
		/**
		 * {@link testType.TestType.strictString}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictString<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsString<T, $MergeOptions<{ distributive: false; exact: true }, $ForwardOptions<$O, IsString.$Options>>>,
				'strictString',
				T,
				string
			>,
		): T
		/**
		 * {@link testType.TestType.string}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		string<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsString<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsString.$Options>>>,
				'string',
				T,
				string
			>,
		): T
		/**
		 * {@link testType.TestType.symbol}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		symbol<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsSymbol<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsSymbol.$Options>>>,
				'symbol',
				T,
				symbol
			>,
		): T
		/**
		 * {@link testType.TestType.tuple}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		tuple<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsTuple<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsTuple.$Options>>>,
				'tuple',
				T,
				readonly unknown[]
			>,
		): T
		/**
		 * {@link testType.TestType.undefined}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		undefined<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsUndefined<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsUndefined.$Options>>>,
				'undefined',
				T,
				undefined
			>,
		): T
		/**
		 * {@link testType.TestType.hasUndefined}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasUndefined(expected: Expectation<HasUndefined<T>, 'hasUndefined', T, undefined>): T
		/**
		 * {@link testType.TestType.unknown}: is type `T` exactly `unknown`?
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		unknown(expected: Expectation<IsUnknown<T>, 'unknown', T, unknown>): T
		/**
		 * {@link testType.TestType.void}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		void<$O extends $StrictOptions<$O, $Options> = {}>(
			expected: Expectation<
				IsVoid<T, $MergeOptions<{ distributive: false }, $ForwardOptions<$O, IsVoid.$Options>>>,
				'void',
				T,
				void
			>,
		): T
		/**
		 * {@link testType.TestType.hasVoid}.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		hasVoid(expected: Expectation<HasVoid<T>, 'hasVoid', T, void>): T
		/**
		 * {@link testType.TestType.property}: does type `T` have the key `K`?
		 *
		 * @example
		 * ```ts
		 * testType.of({ a: 1 }).property<'a'>(true)
		 * testType.of({ a: 1 }).property<'b'>(false)
		 * ```
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		property<K extends PropertyKey>(
			expected: Expectation<IsTrue<HasKey<T, K>, { distributive: false }>, 'property', T, Record<K, unknown>>,
		): T
	}

	export type InspectedType<T> = {
		type: T
		extends<R>(): T extends R ? true : false
		extends_any: T extends any ? true : false
		extends_unknown: T extends unknown ? true : false
		extends_void: T extends void ? true : false
		extends_never: T extends never ? true : false
		extends_undefined: T extends undefined ? true : false
		extends_null: T extends null ? true : false
		extends_boolean: T extends boolean ? true : false
		extends_true: T extends true ? true : false
		extends_false: T extends false ? true : false
		extends_number: T extends number ? true : false
		extends_1: T extends 1 ? true : false
		extends_bigint: T extends bigint ? true : false
		extends_1n: T extends 1n ? true : false
		extends_string: T extends string ? true : false
		extends_a: T extends 'a' ? true : false
		extends_symbol: T extends symbol ? true : false
		extends_object: T extends object ? true : false
		extends_function: T extends Function ? true : false
		extends_array_unknown: T extends unknown[] ? true : false
		extends_tuple_empty: T extends [] ? true : false
		union<R>(): T | R
		union_any: T | any
		union_unknown: T | unknown
		union_void: T | void
		union_never: T | never
		union_undefined: T | undefined
		union_null: T | null
		union_boolean: T | boolean
		union_true: T | true
		union_false: T | false
		union_number: T | number
		union_1: T | 1
		union_bigint: T | bigint
		union_1n: T | 1n
		union_string: T | string
		union_a: T | 'a'
		union_symbol: T | symbol
		union_object: T | object
		union_function: T | Function
		union_array_unknown: T | unknown[]
		union_tuple_empty: T | []
		intersect<R>(): T & R
		intersect_any: T & any
		intersect_unknown: T & unknown
		intersect_void: T & void
		intersect_never: T & never
		intersect_undefined: T & undefined
		intersect_null: T & null
		intersect_boolean: T & boolean
		intersect_true: T & true
		intersect_false: T & false
		intersect_number: T & number
		intersect_1: T & 1
		intersect_bigint: T & bigint
		intersect_1n: T & 1n
		intersect_string: T & string
		intersect_a: T & 'a'
		intersect_symbol: T & symbol
		intersect_object: T & object
		intersect_function: T & Function
		intersect_array_unknown: T & unknown[]
		intersect_tuple_empty: T & []
	}
}

/**
 * Test utilities for types.
 *
 * This is designed specifically for testing.
 * The return value is the input `expected` parameter asserted as the first type parameter,
 * so that the type can be further inspected.
 */
export const testType = new Proxy({} as testType.TestType, {
	get(_target, prop, _receiver) {
		return prop === 'defer' ? defer : prop === 'of' ? of : (expected: unknown) => expected
	},
})

/**
 * The members of {@link testType.Subject} that are subjects themselves.
 */
const subjectMembers = new Set<string | symbol>(['parameters', 'returns', 'resolves'])

/**
 * The subject of `testType.of(value)` lives only in its type,
 * so every check on it returns `expected`, as the top-level checks do,
 * and every subject member is the subject again.
 */
const subject: object = new Proxy(
	{},
	{
		get(_target, prop, _receiver) {
			return subjectMembers.has(prop) ? subject : (expected: unknown) => expected
		},
	},
)

function of(_value: unknown) {
	return subject
}

/**
 * The deferred checks carry their result in the return *type*.
 * At runtime they have nothing to say, so every one of them is a no-op.
 */
function createDefer(withNot: boolean): unknown {
	return new Proxy(
		{},
		{
			get(_target, prop, _receiver) {
				return withNot && prop === 'not' ? createDefer(false) : () => undefined
			},
		},
	)
}

const defer = createDefer(true)
