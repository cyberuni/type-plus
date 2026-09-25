import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts bigint', () => {
	testType.strictBigint<bigint>(true)
})

it('rejects bigint literal', () => {
	testType.strictBigint<0n>(false)
	testType.strictBigint<1n>(false)
})

it('accepts intersection with bigint', () => {
	testType.strictBigint<bigint & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.strictBigint<any>(false)
	testType.strictBigint<never>(false)
	testType.strictBigint<unknown>(false)
	testType.strictBigint<void>(false)

	testType.strictBigint<undefined>(false)
	testType.strictBigint<null>(false)
	testType.strictBigint<boolean>(false)
	testType.strictBigint<true>(false)
	testType.strictBigint<false>(false)
	testType.strictBigint<number>(false)
	testType.strictBigint<1>(false)
	testType.strictBigint<string>(false)
	testType.strictBigint<''>(false)
	testType.strictBigint<symbol>(false)
	testType.strictBigint<{}>(false)
	testType.strictBigint<string[]>(false)
	testType.strictBigint<[]>(false)
	testType.strictBigint<Function>(false)
	testType.strictBigint<() => void>(false)
})
