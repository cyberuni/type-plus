import { it } from 'vitest'

import { testType } from '../index.js'

it('accepts string', () => {
	testType.strictString<string>(true)
})

it('rejects string literal', () => {
	testType.strictString<''>(false)
	testType.strictString<'a'>(false)
})

it('consider string intersection type as strict string', () => {
	testType.strictString<string & { a: 1 }>(true)
})

it('rejects others', () => {
	testType.strictString<any>(false)
	testType.strictString<never>(false)
	testType.strictString<unknown>(false)
	testType.strictString<void>(false)

	testType.strictString<undefined>(false)
	testType.strictString<null>(false)
	testType.strictString<boolean>(false)
	testType.strictString<true>(false)
	testType.strictString<false>(false)
	testType.strictString<number>(false)
	testType.strictString<-1>(false)
	testType.strictString<0>(false)
	testType.strictString<1>(false)
	testType.strictString<bigint>(false)
	testType.strictString<1n>(false)
	testType.strictString<symbol>(false)
	testType.strictString<{}>(false)
	testType.strictString<string[]>(false)
	testType.strictString<[]>(false)
	testType.strictString<Function>(false)
	testType.strictString<() => void>(false)
})
