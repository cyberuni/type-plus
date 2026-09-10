import { it } from 'vitest'

import { testType, type UnionType } from '../index.js'

it('returns false for non-union', () => {
	testType.equal<UnionType<any>, never>(true)
	testType.equal<UnionType<unknown>, never>(true)
	testType.equal<UnionType<void>, never>(true)
	testType.equal<UnionType<never>, never>(true)

	testType.equal<UnionType<undefined>, never>(true)
	testType.equal<UnionType<null>, never>(true)
	testType.equal<UnionType<true>, never>(true)
	testType.equal<UnionType<false>, never>(true)
	testType.equal<UnionType<number>, never>(true)
	testType.equal<UnionType<1>, never>(true)
	testType.equal<UnionType<string>, never>(true)
	testType.equal<UnionType<'a'>, never>(true)
	testType.equal<UnionType<symbol>, never>(true)
	testType.equal<UnionType<bigint>, never>(true)
	testType.equal<UnionType<1n>, never>(true)
	testType.equal<UnionType<{}>, never>(true)
	testType.equal<UnionType<{ a: 1 }>, never>(true)
	testType.equal<UnionType<string[]>, never>(true)
	testType.equal<UnionType<[]>, never>(true)
	testType.equal<UnionType<Function>, never>(true)
	testType.equal<UnionType<() => void>, never>(true)
})

it('returns true for boolean as it is a union of true | false', () => {
	testType.equal<UnionType<boolean>, boolean>(true)
})

it('returns true for union type', () => {
	testType.equal<UnionType<number | string>, number | string>(true)
	testType.equal<UnionType<'a' | 'b'>, 'a' | 'b'>(true)
})

it('can override result', () => {
	testType.equal<UnionType<boolean, 1, 2>, 1>(true)
	testType.equal<UnionType<{ a: 1 }, 1, 2>, 2>(true)
})
