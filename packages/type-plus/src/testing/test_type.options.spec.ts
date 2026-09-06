import { it } from 'vitest'

import { testType } from '../index.js'

it('keeps the no-options call form inferring as before', () => {
	// The second type parameter is optional.
	// Supplying only `T` resolves `$O` to `{}` and keeps the historical defaults.
	testType.string<'a'>(true)
	testType.strictString<'a'>(false)
	testType.number<1>(true)
	testType.array<string[]>(true)
	testType.array<[string]>(false)
	testType.canAssign<123, number>(true)
	testType.strictCanAssign<number | string, number>(false)

	// The return value is still `expected` asserted as `T`.
	const t = testType.string<'a'>(true)
	testType.equal<typeof t, 'a'>(true)
})

it('rejects the wrong expectation in the no-options call form', () => {
	// @ts-expect-error `'a'` is a string
	testType.string<'a'>(false)
	// @ts-expect-error `[string]` is not an array under the default `exact: true`
	testType.array<[string]>(true)
})

it('supports the `exact` option', () => {
	testType.string<'a', { exact: true }>(false)
	testType.string<string, { exact: true }>(true)
	testType.number<1, { exact: true }>(false)
	testType.bigint<1n, { exact: true }>(false)
	testType.boolean<true, { exact: true }>(false)

	// @ts-expect-error `exact: true` makes the literal fail
	testType.string<'a', { exact: true }>(true)
})

it('`exact` overrides a default of `true` as well as a default of `false`', () => {
	// `array` defaults to `exact: true`, so a tuple fails.
	testType.array<[string]>(false)
	// Turning it off accepts the tuple.
	testType.array<[string], { exact: false }>(true)

	// The `strict*` variants bake in `exact: true`; it can be turned off too.
	testType.strictString<'a'>(false)
	testType.strictString<'a', { exact: false }>(true)
	testType.strictNumber<1, { exact: false }>(true)
	testType.strictBigint<1n, { exact: false }>(true)
	testType.strictBoolean<true, { exact: false }>(true)
})

it('supports the `distributive` option', () => {
	// `testType` defaults to `distributive: false`,
	// so a union has to satisfy the check as a whole.
	testType.string<'a' | 1>(false)

	// Distributing evaluates each member, so the result widens to `boolean`.
	testType.string<'a' | 1, { distributive: true }>(true)
	testType.string<'a' | 1, { distributive: true }>(false)

	// A union where every member passes still resolves to `true`.
	testType.string<'a' | 'b', { distributive: true }>(true)
	// @ts-expect-error every member is a string, so `false` is not in the result
	testType.string<'a' | 'b', { distributive: true }>(false)
})

it('supports options on `canAssign` and `strictCanAssign`', () => {
	// `canAssign` is distributive by default.
	testType.canAssign<number | string, number>(true)
	testType.canAssign<number | string, number>(false)

	// Turning distribution off makes it behave like `strictCanAssign`.
	testType.canAssign<number | string, number, { distributive: false }>(false)
	testType.strictCanAssign<number | string, number>(false)

	// And `strictCanAssign` can be relaxed back.
	testType.strictCanAssign<number | string, number, { distributive: true }>(true)
	testType.strictCanAssign<number | string, number, { distributive: true }>(false)
})

it('accepts both options at once', () => {
	testType.string<'a' | 'b', { distributive: true; exact: true }>(false)
	testType.string<string | 1, { distributive: true; exact: true }>(true)
	testType.string<string | 1, { distributive: true; exact: true }>(false)
})

it('exposes the option shape as `testType.$Options`', () => {
	testType.canAssign<{ exact: true }, testType.$Options>(true)
	testType.canAssign<{ distributive: false }, testType.$Options>(true)
	testType.canAssign<{ exact: true; distributive: false }, testType.$Options>(true)

	// Selection and branching options are not part of the surface:
	// `testType` always resolves as a predicate.
	testType.canAssign<{ selection: 'filter' }, testType.$Options>(false)
})
