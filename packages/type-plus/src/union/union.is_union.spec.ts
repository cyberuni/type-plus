import { it } from 'vitest'

import { type IsUnion, testType } from '../index.js'

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
