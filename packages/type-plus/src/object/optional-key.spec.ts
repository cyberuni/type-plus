import { describe, it } from 'vitest'

import {
	type $Else,
	type $Fn,
	type $Then,
	type IsOptionalKey,
	type OptionalKeys,
	type OptionalProps,
	type TuplePlus,
	testType,
} from '../index.js'

describe('IsOptionalKey', () => {
	it('returns true for optional prop', () => {
		testType.true<IsOptionalKey<{ a?: number }, 'a'>>(true)
		testType.true<IsOptionalKey<{ a?: number; b: number }, 'a'>>(true)
	})

	it('returns false for non-optional prop', () => {
		testType.false<IsOptionalKey<{ a: number }, 'a'>>(true)
		testType.false<IsOptionalKey<{ a: number; b?: number }, 'a'>>(true)
	})

	it('works with union type', () => {
		type X = { a?: string; b: string } | { c: string; d?: string }

		testType.true<IsOptionalKey<X, 'a'>>(true)
		testType.false<IsOptionalKey<X, 'b'>>(true)
		testType.false<IsOptionalKey<X, 'c'>>(true)
		testType.true<IsOptionalKey<X, 'd'>>(true)
	})

	it('can override the branches', () => {
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'a', { $then: 'yes'; $else: 'no' }>, 'yes'>(true)
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'b', { $then: 'yes'; $else: 'no' }>, 'no'>(true)
	})

	it('resolves `IsOptionalKey.$Default` the same as no options', () => {
		// `IsOptionalKey.$Default` documents the default; the type never reads it, so pin the two together.
		testType.equal<IsOptionalKey<{ a: 1; b?: 2 }, 'a', IsOptionalKey.$Default>, IsOptionalKey<{ a: 1; b?: 2 }, 'a'>>(
			true,
		)
		testType.equal<IsOptionalKey<{ a: 1; b?: 2 }, 'b', IsOptionalKey.$Default>, IsOptionalKey<{ a: 1; b?: 2 }, 'b'>>(
			true,
		)
		testType.equal<IsOptionalKey<{ a: 1; b?: 2 }, 'c', IsOptionalKey.$Default>, IsOptionalKey<{ a: 1; b?: 2 }, 'c'>>(
			true,
		)
		testType.equal<
			IsOptionalKey<{ a: 1; b?: 2 }, 'a' | 'b' | 'c', IsOptionalKey.$Default>,
			IsOptionalKey<{ a: 1; b?: 2 }, 'a' | 'b' | 'c'>
		>(true)
		testType.equal<
			IsOptionalKey<{ a: 1 } | { b?: 2 }, 'b', IsOptionalKey.$Default>,
			IsOptionalKey<{ a: 1 } | { b?: 2 }, 'b'>
		>(true)
	})

	it('works as filter', () => {
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'a' | 'b', { selection: 'filter' }>, 'a'>(true)
		testType.equal<IsOptionalKey<{ a?: number; b: number }, 'b', { selection: 'filter' }>, never>(true)
	})

	it('the filter form over `keyof T` is `OptionalKeys<T>`', () => {
		type X = { a?: string; b: string; c?: number }
		testType.equal<IsOptionalKey<X, keyof X, { selection: 'filter' }>, OptionalKeys<X>>(true)
	})

	it('works with unique branches', () => {
		testType.equal<IsOptionalKey<{ a?: number }, 'a', IsOptionalKey.$Branch>, $Then>(true)
		testType.equal<IsOptionalKey<{ a: number }, 'a', IsOptionalKey.$Branch>, $Else>(true)
	})
})

describe('OptionalKeys', () => {
	it('gets the keys of the optional properties', () => {
		testType.equal<OptionalKeys<{ a?: number; b?: number }>, 'a' | 'b'>(true)
		testType.equal<OptionalKeys<{ a?: number; b?: number; c: number }>, 'a' | 'b'>(true)
	})

	it('gets never if T has no optional properties', () => {
		testType.equal<OptionalKeys<{}>, never>(true)
		testType.equal<OptionalKeys<{ c: number }>, never>(true)
	})

	it('gets the keys of optional properties across unions', () => {
		testType.equal<OptionalKeys<{ a?: number } | { b?: number }>, 'a' | 'b'>(true)
	})
})

describe('OptionalProps<T>', () => {
	it('returns empty for object with no optional properties', () => {
		testType.equal<OptionalProps<{}>, {}>(true)
		testType.equal<OptionalProps<{ a: number }>, {}>(true)
	})

	it('returns only the optional properties', () => {
		testType.equal<OptionalProps<{ a?: number }>, { a?: number }>(true)
		testType.equal<OptionalProps<{ a?: number | undefined }>, { a?: number | undefined }>(true)
		testType.equal<OptionalProps<{ a?: number; b: number | undefined }>, { a?: number }>(true)
	})

	it('extracts optional properties from composite function', () => {
		testType.equal<
			OptionalProps<{
				(): void
				a?: number
			}>,
			{ a?: number }
		>(true)
		testType.equal<
			OptionalProps<
				(() => void) & {
					a?: number
				}
			>,
			{ a?: number }
		>(true)
	})

	it('ex', () => {
		testType.equal<OptionalProps<{ a?: number } | { b?: number }>, { a?: number } | { b?: number }>(true)
	})
})

// ---- weaker implementations ----
// export type IsOptionalKey<T, K extends keyof T, Then = true, Else = false> =
// 	{ [k in K]?: T[k] } extends { [k in K]: T[k] }
// 	? Then
// 	: Else

// export type OptionalKeys<T extends AnyRecord> = Exclude<
// 	{ [k in keyof T]: IsOptionalKey<T, k, k, never> }[keyof T],
// 	undefined
// >

describe('IsOptionalKey.$Fn', () => {
	it('is IsOptionalKey with its fixed input applied', () => {
		testType.equal<$Fn.Apply<IsOptionalKey.$Fn<'a'>, { a?: 1 }>, true>(true)
		testType.equal<$Fn.Apply<IsOptionalKey.$Fn<'a'>, { a: 1 }>, false>(true)
		testType.equal<TuplePlus.Filter<[{ a?: 1 }, { a: 1 }], IsOptionalKey.$Fn<'a'>>, [{ a?: 1 }]>(true)
	})
})
