/**
 * Pins the `@example` blocks in the `src/utils/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/utils/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import {
	amend,
	as,
	asAny,
	type EitherAnd,
	type EitherOrBoth,
	type NoInfer,
	type TypePlusOptions,
	testType,
	type Widen,
} from '../index.js'

it('as examples in TSDoc are accurate', () => {
	const r = as<{ a: number }>({})
	expect(r).toEqual({})
	testType.equal<typeof r, { a: number }>(true)

	const s = as<string>(1)
	expect(s).toBe(1)
	testType.equal<typeof s, string>(true)
})

it('asAny examples in TSDoc are accurate', () => {
	const r = asAny('x')
	expect(r).toBe('x')
	testType.equal<typeof r, any>(true)

	function f(_a: number) {}
	f(asAny('x'))
})

it('TypePlusOptions example in TSDoc is accurate', () => {
	testType.equal<TypePlusOptions.Merge<{ a: 1 }, { a: 0; b: 0 }>, { a: 1; b: 0 }>(true)
})

/**
 * The utilities page on the site shows these; pinned here for the same reason
 * the TSDoc examples are.
 */
it('the Utilities page examples are accurate', () => {
	testType.equal<Widen<1>, number>(true)
	testType.equal<Widen<true>, boolean>(true)
	testType.equal<Widen<'a'>, string>(true)
	testType.equal<Widen<{ a: 1 }>, { a: 1 }>(true)

	type A = { src: string; minify?: boolean }
	type B = { logLevel: number }
	function config(_options: EitherOrBoth<A, B>) {}
	config({ logLevel: 1 })
	config({ src: 'src' })
	config({ src: 'src', minify: false })
	// @ts-expect-error neither `A` nor `B` is satisfied
	config({ minify: false })

	const r = amend({ a: 1 }).union<{ b: string }>()
	testType.equal<typeof r, { b: string } & { a: number }>(true)
	expect(r).toEqual({ a: 1 })
})

it('NoInfer example in TSDoc is accurate', () => {
	function assertEqual<T>(a: T, b: NoInfer<T>) {
		return a === b
	}

	expect(assertEqual(123, 324)).toBe(false)
	// @ts-expect-error `b` cannot widen `T`
	assertEqual(123, 'abc')
})

it('EitherAnd example in TSDoc is accurate', () => {
	type A = { src: string; minify?: boolean }
	type B = { logLevel: number }
	function config(_options: EitherAnd<A, B>) {}
	config({ logLevel: 1 })
	config({ src: 'src' })
	config({ src: 'src', minify: false })
	// @ts-expect-error neither `A` nor `B` is satisfied
	config({ minify: false })
})
