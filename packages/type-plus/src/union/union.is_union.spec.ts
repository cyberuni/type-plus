import { it } from 'vitest'

import { type $Else, type $Then, type IsUnion, testType } from '../index.js'

it('returns false for non-union', () => {
	testType.equal<IsUnion<any>, false>(true)
	testType.equal<IsUnion<unknown>, false>(true)
	testType.equal<IsUnion<void>, false>(true)
	testType.equal<IsUnion<never>, false>(true)

	testType.equal<IsUnion<undefined>, false>(true)
	testType.equal<IsUnion<null>, false>(true)
	testType.equal<IsUnion<true>, false>(true)
	testType.equal<IsUnion<false>, false>(true)
	testType.equal<IsUnion<number>, false>(true)
	testType.equal<IsUnion<1>, false>(true)
	testType.equal<IsUnion<string>, false>(true)
	testType.equal<IsUnion<'a'>, false>(true)
	testType.equal<IsUnion<symbol>, false>(true)
	testType.equal<IsUnion<bigint>, false>(true)
	testType.equal<IsUnion<1n>, false>(true)
	testType.equal<IsUnion<{}>, false>(true)
	testType.equal<IsUnion<{ a: 1 }>, false>(true)
	testType.equal<IsUnion<string[]>, false>(true)
	testType.equal<IsUnion<[]>, false>(true)
	testType.equal<IsUnion<Function>, false>(true)
	testType.equal<IsUnion<() => void>, false>(true)
})

it('returns true for boolean as it is a union of true | false', () => {
	testType.equal<IsUnion<boolean>, true>(true)
})

it('returns true for union type', () => {
	testType.true<IsUnion<number | string>>(true)
	testType.equal<IsUnion<'a' | 'b'>, true>(true)
})

it('can override the branches', () => {
	testType.equal<IsUnion<boolean, { $then: 1; $else: 2 }>, 1>(true)
	testType.equal<IsUnion<{ a: 1 }, { $then: 1; $else: 2 }>, 2>(true)
})

it('works as filter', () => {
	testType.equal<IsUnion<'a' | 'b', { selection: 'filter' }>, 'a' | 'b'>(true)
	testType.equal<IsUnion<boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsUnion<number | string, { selection: 'filter' }>, number | string>(true)

	testType.equal<IsUnion<any, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<unknown, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<void, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<number, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<{ a: 1 }, { selection: 'filter' }>, never>(true)
	testType.equal<IsUnion<[], { selection: 'filter' }>, never>(true)
})

it('works with unique branches', () => {
	testType.equal<IsUnion<'a' | 'b', IsUnion.$Branch>, $Then>(true)
	testType.equal<IsUnion<boolean, IsUnion.$Branch>, $Then>(true)
	testType.equal<IsUnion<number, IsUnion.$Branch>, $Else>(true)
	testType.equal<IsUnion<never, IsUnion.$Branch>, $Else>(true)
})

it('exposes the util as IsUnion.$', () => {
	testType.equal<IsUnion.$<'a' | 'b', {}>, true>(true)
	testType.equal<IsUnion.$<number, {}>, false>(true)
	testType.equal<IsUnion.$<'a' | 'b', { selection: 'filter' }>, 'a' | 'b'>(true)
})
