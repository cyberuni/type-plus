import { it } from 'vitest'
import { type ArrayPlus, testType } from '../index.js'

it('gets Array<[number, T]> for array', () => {
	testType.equal<ArrayPlus.Entries<string[]>, Array<[number, string]>>(true)
	testType.equal<ArrayPlus.Entries<Array<string | number>>, Array<[number, string | number]>>(true)
})

it('returns [[0, T1], [1, T2],...[n, Tn]] for tuple', () => {
	testType.equal<ArrayPlus.Entries<[]>, []>(true)
	testType.equal<ArrayPlus.Entries<[1, 2, 3]>, [[0, 1], [1, 2], [2, 3]]>(true)
})

it('supports readonly array', () => {
	testType.equal<ArrayPlus.Entries<readonly [1, 2, 3]>, [[0, 1], [1, 2], [2, 3]]>(true)
})
