import { it } from 'vitest'

import { type ArrayPlus, testType } from '../index.js'

it('returns the array unchanged when MaxLength is 0', () => {
	testType.equal<ArrayPlus.PadStart<string[], 0, number>, string[]>(true)
})

it('returns the array unchanged when PadWith is assignable to its element type', () => {
	testType.equal<ArrayPlus.PadStart<string[], 2, string>, string[]>(true)
	testType.equal<ArrayPlus.PadStart<string[], 2, 'a'>, string[]>(true)
})

it('adds MaxLength elements of PadWith to the start', () => {
	testType.equal<ArrayPlus.PadStart<string[], 2, number>, [number, number, ...string[]]>(true)
})

it('pads with unknown by default', () => {
	testType.equal<ArrayPlus.PadStart<string[], 1>, [unknown, ...string[]]>(true)
})
