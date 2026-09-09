import { it } from 'vitest'
import { type ArrayPlus, testType } from '../index.js'

it('never returns never', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<ArrayPlus.CommonPropKeys<never, { $never: 1 }>, 1>(true)
})

it('gets the keys common to every element', () => {
	testType.equal<ArrayPlus.CommonPropKeys<Array<{ a: 1 }>>, 'a'>(true)
	testType.equal<ArrayPlus.CommonPropKeys<Array<{ a: 1; b: 1 } | { a: 1; c: 1 }>>, 'a'>(true)
})

it('accepts readonly array', () => {
	testType.equal<ArrayPlus.CommonPropKeys<readonly [{ a: 1 }, { a: 2 }]>, 'a'>(true)
})
