import { describe, it } from 'vitest'

import { type $Else, type $Fn, type $Then, type IsFalse, testType } from '../index.js'

it('returns true if T is false', () => {
	testType.equal<IsFalse<false>, true>(true)
})

it('returns boolean if T is boolean because it is distributive by default', () => {
	testType.equal<IsFalse<boolean>, boolean>(true)
	testType.equal<IsFalse<boolean, { distributive: false }>, false>(true)
})

it('returns false if T is true', () => {
	testType.equal<IsFalse<true>, false>(true)
})

it('returns false for special types', () => {
	testType.equal<IsFalse<void>, false>(true)
	testType.equal<IsFalse<unknown>, false>(true)
	testType.equal<IsFalse<any>, false>(true)
	testType.equal<IsFalse<never>, false>(true)
})

it('returns false for other types', () => {
	testType.equal<IsFalse<undefined>, false>(true)
	testType.equal<IsFalse<null>, false>(true)
	testType.equal<IsFalse<number>, false>(true)
	testType.equal<IsFalse<1>, false>(true)
	testType.equal<IsFalse<string>, false>(true)
	testType.equal<IsFalse<''>, false>(true)
	testType.equal<IsFalse<symbol>, false>(true)
	testType.equal<IsFalse<bigint>, false>(true)
	testType.equal<IsFalse<1n>, false>(true)
	testType.equal<IsFalse<{}>, false>(true)
	testType.equal<IsFalse<{ a: 1 }>, false>(true)
	testType.equal<IsFalse<string[]>, false>(true)
	testType.equal<IsFalse<[]>, false>(true)
	testType.equal<IsFalse<Function>, false>(true)
	testType.equal<IsFalse<() => void>, false>(true)
})

it('distributes over union type', () => {
	testType.equal<IsFalse<false | 1>, boolean>(true)
	testType.equal<IsFalse<boolean | 1>, boolean>(true)
	testType.equal<IsFalse<string | boolean>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsFalse<false | 1, { distributive: false }>, false>(true)
})

it('returns true for intersection type', () => {
	testType.equal<IsFalse<false & { a: 1 }>, true>(true)
	testType.equal<IsFalse<false & { a: 1 }, { distributive: false }>, true>(true)

	testType.equal<IsFalse<boolean & { a: 1 }>, boolean>(true)
	testType.equal<IsFalse<boolean & { a: 1 }, { distributive: false }>, false>(true)

	testType.equal<IsFalse<true & { a: 1 }>, false>(true)
	testType.equal<IsFalse<true & { a: 1 }, { distributive: false }>, false>(true)
})

it('works as filter', () => {
	testType.equal<IsFalse<false, { selection: 'filter' }>, false>(true)
	testType.equal<IsFalse<true, { selection: 'filter' }>, never>(true)
	testType.equal<IsFalse<boolean, { selection: 'filter' }>, false>(true)
	testType.equal<IsFalse<boolean, { selection: 'filter'; distributive: false }>, never>(true)

	testType.equal<IsFalse<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsFalse<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsFalse<string | false, { selection: 'filter' }>, false>(true)

	testType.equal<IsFalse<string | boolean, { selection: 'filter' }>, false>(true)
	testType.equal<IsFalse<string | true, { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsFalse<false, IsFalse.$Branch>, $Then>(true)
	testType.equal<IsFalse<boolean, IsFalse.$Branch>, $Then | $Else>(true)

	testType.equal<IsFalse<any, IsFalse.$Branch>, $Else>(true)
	testType.equal<IsFalse<unknown, IsFalse.$Branch>, $Else>(true)
	testType.equal<IsFalse<never, IsFalse.$Branch>, $Else>(true)
	testType.equal<IsFalse<void, IsFalse.$Branch>, $Else>(true)
})

it('can override $any branch', () => {
	testType.equal<IsFalse<any>, false>(true)
	testType.equal<IsFalse<any, { $any: unknown }>, unknown>(true)
})

it('can override $unknown branch', () => {
	testType.equal<IsFalse<unknown>, false>(true)
	testType.equal<IsFalse<unknown, { $unknown: unknown }>, unknown>(true)
})

it('can override $never branch', () => {
	testType.equal<IsFalse<never>, false>(true)
	testType.equal<IsFalse<never, { $never: unknown }>, unknown>(true)
})

describe('IsFalse.$Fn', () => {
	it('is IsFalse as a type function', () => {
		testType.equal<$Fn.Apply<IsFalse.$Fn, false>, true>(true)
		testType.equal<$Fn.Apply<IsFalse.$Fn, true>, false>(true)
	})
})

it('resolves `IsFalse.$Default` the same as no options', () => {
	// `IsFalse.$Default` documents the default; the type never reads it, so pin the two together.
	testType.equal<IsFalse<any, IsFalse.$Default>, IsFalse<any>>(true)
	testType.equal<IsFalse<unknown, IsFalse.$Default>, IsFalse<unknown>>(true)
	testType.equal<IsFalse<never, IsFalse.$Default>, IsFalse<never>>(true)
	testType.equal<IsFalse<void, IsFalse.$Default>, IsFalse<void>>(true)
	testType.equal<IsFalse<undefined, IsFalse.$Default>, IsFalse<undefined>>(true)
	testType.equal<IsFalse<null, IsFalse.$Default>, IsFalse<null>>(true)
	testType.equal<IsFalse<boolean, IsFalse.$Default>, IsFalse<boolean>>(true)
	testType.equal<IsFalse<true, IsFalse.$Default>, IsFalse<true>>(true)
	testType.equal<IsFalse<1, IsFalse.$Default>, IsFalse<1>>(true)
	testType.equal<IsFalse<number, IsFalse.$Default>, IsFalse<number>>(true)
	testType.equal<IsFalse<'a', IsFalse.$Default>, IsFalse<'a'>>(true)
	testType.equal<IsFalse<string, IsFalse.$Default>, IsFalse<string>>(true)
	testType.equal<IsFalse<symbol, IsFalse.$Default>, IsFalse<symbol>>(true)
	testType.equal<IsFalse<1n, IsFalse.$Default>, IsFalse<1n>>(true)
	testType.equal<IsFalse<{}, IsFalse.$Default>, IsFalse<{}>>(true)
	testType.equal<IsFalse<[], IsFalse.$Default>, IsFalse<[]>>(true)
	testType.equal<IsFalse<() => void, IsFalse.$Default>, IsFalse<() => void>>(true)
	testType.equal<IsFalse<1 | string, IsFalse.$Default>, IsFalse<1 | string>>(true)
})
