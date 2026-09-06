import { it } from 'vitest'

import { testType } from '../index.js'

it('defers a check so it can live in a reusable helper', () => {
	// the helper body type checks on its own — `T` is not resolved here,
	// so nothing can fail yet.
	function testMyType<T>() {
		return testType.defer.string<T>()
	}

	testType.assert(testMyType<'a'>())

	// the failure is reported here, at the helper's call site.
	// @ts-expect-error
	testType.assert(testMyType<1>())
})

it('accepts a single result', () => {
	testType.assert(testType.defer.equal<1, 1>())

	// @ts-expect-error
	testType.assert(testType.defer.equal<1, 2>())
})

it('accepts multiple results as arguments', () => {
	testType.assert(testType.defer.equal<1, 1>(), testType.defer.number<1>())

	// @ts-expect-error
	testType.assert(testType.defer.equal<1, 1>(), testType.defer.string<1>())
})

it('accepts an array of results', () => {
	function testMyType<T>() {
		return [testType.defer.string<T>(), testType.defer.not.never<T>()]
	}

	testType.assert(testMyType<'a'>())

	// @ts-expect-error
	testType.assert(testMyType<never>())
})

it('accepts an object of results', () => {
	function testMyType<T>() {
		return {
			isString: testType.defer.string<T>(),
			isNotNumber: testType.defer.not.number<T>(),
		}
	}

	testType.assert(testMyType<'a'>())

	// @ts-expect-error
	testType.assert(testMyType<1>())
})

it('accepts results nested to any depth', () => {
	function inner<T>() {
		return { isString: testType.defer.string<T>() }
	}
	function outer<T>() {
		return [inner<T>(), [testType.defer.not.never<T>()]]
	}

	testType.assert(outer<'a'>())

	// @ts-expect-error
	testType.assert(outer<1>())
})

it('composes helpers that take value arguments', () => {
	function testReturnType<R>(_fn: () => R) {
		return testType.defer.number<R>()
	}

	testType.assert(testReturnType(() => 1))

	// @ts-expect-error
	testType.assert(testReturnType(() => 'a'))
})

it('covers equal with three types', () => {
	testType.assert(testType.defer.equal<1, 1, 1>())

	// @ts-expect-error
	testType.assert(testType.defer.equal<1, 1, 2>())
})

it('mirrors the distributivity of the immediate checks', () => {
	// `canAssign` is distributive, so a union can widen to `boolean`,
	// which the immediate check accepts for both `true` and `false`.
	testType.canAssign<number | string, number>(true)
	testType.canAssign<number | string, number>(false)
	testType.assert(testType.defer.canAssign<number | string, number>())
	testType.assert(testType.defer.not.canAssign<number | string, number>())

	// `strictCanAssign` is not distributive.
	testType.assert(testType.defer.strictCanAssign<number | string, number | string>())
	testType.assert(testType.defer.not.strictCanAssign<number | string, number>())

	// @ts-expect-error
	testType.assert(testType.defer.strictCanAssign<number | string, number>())
})

it('negates a check with `not`', () => {
	testType.assert(testType.defer.not.equal<1, 2>())

	// @ts-expect-error
	testType.assert(testType.defer.not.equal<1, 1>())
})

it('covers every check `testType` has, except `inspect`', () => {
	testType.assert(
		testType.defer.any<any>(),
		testType.defer.array<number[]>(),
		testType.defer.bigint<1n>(),
		testType.defer.boolean<true>(),
		testType.defer.canAssign<1, number>(),
		testType.defer.equal<1, 1>(),
		testType.defer.false<false>(),
		testType.defer.function<() => void>(),
		testType.defer.never<never>(),
		testType.defer.null<null>(),
		testType.defer.number<1>(),
		testType.defer.object<{ a: 1 }>(),
		testType.defer.strictBigint<bigint>(),
		testType.defer.strictBoolean<boolean>(),
		testType.defer.strictCanAssign<1, number>(),
		testType.defer.strictFunction<Function>(),
		testType.defer.strictNumber<number>(),
		testType.defer.strictString<string>(),
		testType.defer.string<'a'>(),
		testType.defer.symbol<symbol>(),
		testType.defer.true<true>(),
		testType.defer.tuple<[1, 2]>(),
		testType.defer.undefined<undefined>(),
		testType.defer.unknown<unknown>(),
		testType.defer.void<void>(),
	)

	testType.assert(
		testType.defer.not.any<1>(),
		testType.defer.not.array<1>(),
		testType.defer.not.bigint<1>(),
		testType.defer.not.boolean<1>(),
		testType.defer.not.canAssign<string, number>(),
		testType.defer.not.equal<1, 2>(),
		testType.defer.not.false<true>(),
		testType.defer.not.function<1>(),
		testType.defer.not.never<1>(),
		testType.defer.not.null<1>(),
		testType.defer.not.number<'a'>(),
		testType.defer.not.object<1>(),
		testType.defer.not.strictBigint<1n>(),
		testType.defer.not.strictBoolean<true>(),
		testType.defer.not.strictCanAssign<number | string, number>(),
		testType.defer.not.strictFunction<() => void>(),
		testType.defer.not.strictNumber<1>(),
		testType.defer.not.strictString<'a'>(),
		testType.defer.not.string<1>(),
		testType.defer.not.symbol<1>(),
		testType.defer.not.true<false>(),
		testType.defer.not.tuple<1>(),
		testType.defer.not.undefined<1>(),
		testType.defer.not.unknown<1>(),
		testType.defer.not.void<1>(),
	)
})

it('takes the same options as the immediate checks', () => {
	// the option lands after the type under test, so the no-options form is unchanged.
	testType.assert(testType.defer.string<'a'>())

	// `exact` narrows the check the same way it does immediately.
	testType.string<'a', { exact: true }>(false)
	testType.assert(testType.defer.not.string<'a', { exact: true }>())
	testType.assert(testType.defer.string<string, { exact: true }>())

	// @ts-expect-error `exact: true` makes the literal fail
	testType.assert(testType.defer.string<'a', { exact: true }>())
})

it('merges options over each check’s own defaults', () => {
	// `array` bakes in `exact: true`, so a tuple fails by default.
	testType.assert(testType.defer.not.array<[string]>())
	// and turning it off accepts the tuple.
	testType.assert(testType.defer.array<[string], { exact: false }>())

	// the `strict*` variants bake in `exact: true`, overridable the same way.
	testType.assert(testType.defer.not.strictString<'a'>())
	testType.assert(testType.defer.strictString<'a', { exact: false }>())
})

it('supports the `distributive` option', () => {
	// the checks default to `distributive: false`, so a union is judged as a whole.
	testType.assert(testType.defer.not.string<'a' | 1>())
	// distributing widens the result to `boolean`, which accepts either expectation.
	testType.assert(testType.defer.string<'a' | 1, { distributive: true }>())
	testType.assert(testType.defer.not.string<'a' | 1, { distributive: true }>())

	// `canAssign` and `strictCanAssign` take it as their third parameter.
	testType.assert(testType.defer.not.canAssign<number | string, number, { distributive: false }>())
	testType.assert(testType.defer.strictCanAssign<number | string, number, { distributive: true }>())
})

it('carries options through a deferred helper', () => {
	function testExactly<T>() {
		return testType.defer.string<T, { exact: true }>()
	}

	testType.assert(testExactly<string>())

	// the literal fails the exact check, reported at the call site.
	// @ts-expect-error
	testType.assert(testExactly<'a'>())
})
