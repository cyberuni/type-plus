import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { IsAny } from '../any/is_any.js'
import type { IsArray } from '../array/is_array.js'
import type { IsBigint } from '../bigint/is_bigint.js'
import type { IsBoolean } from '../boolean/is_boolean.js'
import type { IsFalse } from '../boolean/is_false.js'
import type { IsTrue } from '../boolean/is_true.js'
import type { IsEqual } from '../equal/is_equal.js'
import type { IsFunction } from '../function/is_function.js'
import type { IsStrictFunction } from '../function/is_strict_function.js'
import type { IsNever } from '../never/is_never.js'
import type { IsNull } from '../null/is_null.js'
import type { IsNumber } from '../number/is_number.js'
import type { IsObject } from '../object/is_object.js'
import type { Assignable } from '../predicates/assignable.js'
import type { IsString } from '../string/is_string.js'
import type { IsSymbol } from '../symbol/is_symbol.js'
import type { IsTuple } from '../tuple/is_tuple.js'
import type { IsUndefined } from '../undefined/is_undefined.js'
import type { IsUnknown } from '../unknown/is_unknown.js'
import type { IsVoid } from '../void/is_void.js'

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
		equal<A, B, C>(expected: IsEqual<A, B> & IsEqual<A, C>): A
		/**
		 * Check if type `A` is equal to type `B`.
		 *
		 * @return `expected` as `A` for type inspection.
		 */
		equal<A, B>(expected: IsEqual<A, B>): A
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
		canAssign<A, B, $O extends $Distributive.Options = {}>(expected: Assignable<A, B, $O>): A
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
		strictCanAssign<A, B, $O extends $Distributive.Options = {}>(
			expected: Assignable<A, B, $MergeOptions<{ distributive: false }, $O>>,
		): A
		/**
		 * Check if type `T` is exactly `any`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		any<T>(expected: IsAny<T>): T
		/**
		 * Check if type `T` is exactly `array`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		array<T, $O extends $Options = {}>(expected: IsArray<T, $MergeOptions<{ exact: true }, $O>>): T
		/**
		 * Check if type `T` is exactly `bigint`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBigint<T, $O extends $Options = {}>(
			expected: IsBigint<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
		): T
		/**
		 * Check if type `T` is `bigint` or bigint literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		bigint<T, $O extends $Options = {}>(expected: IsBigint<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `boolean`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictBoolean<T, $O extends $Options = {}>(
			expected: IsBoolean<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
		): T
		/**
		 * Check if type `T` is `boolean` and boolean literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		boolean<T, $O extends $Options = {}>(expected: IsBoolean<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `true`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		true<T, $O extends $Options = {}>(expected: IsTrue<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `false`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		false<T, $O extends $Options = {}>(expected: IsFalse<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `boolean`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictFunction<T, $O extends $Options = {}>(
			expected: IsStrictFunction<T, $MergeOptions<{ distributive: false }, $O>>,
		): T
		/**
		 * Check if type `T` is `boolean` and boolean literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		function<T, $O extends $Options = {}>(expected: IsFunction<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `never`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		never<T>(expected: IsNever<T>): T
		/**
		 * Check if type `T` is exactly `null`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		null<T, $O extends $Options = {}>(expected: IsNull<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `number`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictNumber<T, $O extends $Options = {}>(
			expected: IsNumber<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
		): T
		/**
		 * Check if type `T` is `number` or number literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		number<T, $O extends $Options = {}>(expected: IsNumber<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is `object`.
		 *
		 * Note that `Function`, `Array`, and *tuple* are also `object`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		object<T, $O extends $Options = {}>(expected: IsObject<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `string`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		strictString<T, $O extends $Options = {}>(
			expected: IsString<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
		): T
		/**
		 * Check if type `T` is `string` or string literals.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		string<T, $O extends $Options = {}>(expected: IsString<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is a `symbol`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		symbol<T, $O extends $Options = {}>(expected: IsSymbol<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is a *tuple*.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		tuple<T, $O extends $Options = {}>(expected: IsTuple<T, $MergeOptions<{ distributive: false }, $O>>): T
		/**
		 * Check if type `T` is exactly `undefined`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		undefined<T, $O extends $Options = {}>(expected: IsUndefined<T, $MergeOptions<{ distributive: false }, $O>>): T
		// hasUndefined<T>(expected: CanAssign<T, undefined>): T
		/**
		 * Check if type `T` is exactly `unknown`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		unknown<T>(expected: IsUnknown<T>): T
		/**
		 * Check if type `T` is exactly `void`.
		 *
		 * @return `expected` as `T` for type inspection.
		 */
		void<T, $O extends $Options = {}>(expected: IsVoid<T, $MergeOptions<{ distributive: false }, $O>>): T
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
		canAssign<A, B, $O extends $Distributive.Options = {}>(): Check<
			Expect,
			Assignable<A, B, $O>,
			Failed<CheckName<Expect, 'canAssign'>, A, B>
		>
		/**
		 * Deferred {@link testType.TestType.strictCanAssign}: can `A` fully assign to `B`?
		 */
		strictCanAssign<A, B, $O extends $Distributive.Options = {}>(): Check<
			Expect,
			Assignable<A, B, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'strictCanAssign'>, A, B>
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
		array<T, $O extends $Options = {}>(): Check<
			Expect,
			IsArray<T, $MergeOptions<{ exact: true }, $O>>,
			Failed<CheckName<Expect, 'array'>, T, unknown[]>
		>
		/**
		 * Deferred {@link testType.TestType.strictBigint}.
		 */
		strictBigint<T, $O extends $Options = {}>(): Check<
			Expect,
			IsBigint<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
			Failed<CheckName<Expect, 'strictBigint'>, T, bigint>
		>
		/**
		 * Deferred {@link testType.TestType.bigint}.
		 */
		bigint<T, $O extends $Options = {}>(): Check<
			Expect,
			IsBigint<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'bigint'>, T, bigint>
		>
		/**
		 * Deferred {@link testType.TestType.strictBoolean}.
		 */
		strictBoolean<T, $O extends $Options = {}>(): Check<
			Expect,
			IsBoolean<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
			Failed<CheckName<Expect, 'strictBoolean'>, T, boolean>
		>
		/**
		 * Deferred {@link testType.TestType.boolean}.
		 */
		boolean<T, $O extends $Options = {}>(): Check<
			Expect,
			IsBoolean<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'boolean'>, T, boolean>
		>
		/**
		 * Deferred {@link testType.TestType.true}.
		 */
		true<T, $O extends $Options = {}>(): Check<
			Expect,
			IsTrue<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'true'>, T, true>
		>
		/**
		 * Deferred {@link testType.TestType.false}.
		 */
		false<T, $O extends $Options = {}>(): Check<
			Expect,
			IsFalse<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'false'>, T, false>
		>
		/**
		 * Deferred {@link testType.TestType.strictFunction}.
		 */
		strictFunction<T, $O extends $Options = {}>(): Check<
			Expect,
			IsStrictFunction<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'strictFunction'>, T, Function>
		>
		/**
		 * Deferred {@link testType.TestType.function}.
		 */
		function<T, $O extends $Options = {}>(): Check<
			Expect,
			IsFunction<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'function'>, T, Function>
		>
		/**
		 * Deferred {@link testType.TestType.null}.
		 */
		null<T, $O extends $Options = {}>(): Check<
			Expect,
			IsNull<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'null'>, T, null>
		>
		/**
		 * Deferred {@link testType.TestType.strictNumber}.
		 */
		strictNumber<T, $O extends $Options = {}>(): Check<
			Expect,
			IsNumber<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
			Failed<CheckName<Expect, 'strictNumber'>, T, number>
		>
		/**
		 * Deferred {@link testType.TestType.number}.
		 */
		number<T, $O extends $Options = {}>(): Check<
			Expect,
			IsNumber<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'number'>, T, number>
		>
		/**
		 * Deferred {@link testType.TestType.object}.
		 */
		object<T, $O extends $Options = {}>(): Check<
			Expect,
			IsObject<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'object'>, T, object>
		>
		/**
		 * Deferred {@link testType.TestType.strictString}.
		 */
		strictString<T, $O extends $Options = {}>(): Check<
			Expect,
			IsString<T, $MergeOptions<{ distributive: false; exact: true }, $O>>,
			Failed<CheckName<Expect, 'strictString'>, T, string>
		>
		/**
		 * Deferred {@link testType.TestType.string}.
		 */
		string<T, $O extends $Options = {}>(): Check<
			Expect,
			IsString<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'string'>, T, string>
		>
		/**
		 * Deferred {@link testType.TestType.symbol}.
		 */
		symbol<T, $O extends $Options = {}>(): Check<
			Expect,
			IsSymbol<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'symbol'>, T, symbol>
		>
		/**
		 * Deferred {@link testType.TestType.tuple}.
		 */
		tuple<T, $O extends $Options = {}>(): Check<
			Expect,
			IsTuple<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'tuple'>, T, readonly unknown[]>
		>
		/**
		 * Deferred {@link testType.TestType.undefined}.
		 */
		undefined<T, $O extends $Options = {}>(): Check<
			Expect,
			IsUndefined<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'undefined'>, T, undefined>
		>
		/**
		 * Deferred {@link testType.TestType.void}.
		 */
		void<T, $O extends $Options = {}>(): Check<
			Expect,
			IsVoid<T, $MergeOptions<{ distributive: false }, $O>>,
			Failed<CheckName<Expect, 'void'>, T, void>
		>
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
		return prop === 'defer' ? defer : (expected: unknown) => expected
	},
})

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
