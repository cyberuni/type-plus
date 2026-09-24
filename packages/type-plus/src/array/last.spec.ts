import { it } from 'vitest'

import { type AnyFunction, type Last, testType } from '../index.js'

it('returns never for empty tuple', () => {
	testType.equal<Last<never>, never>(true)
})

it('can override never case', () => {
	testType.equal<Last<never, { $never: 1 }>, 1>(true)
})

it('gets the type of an array', () => {
	testType.equal<Last<any[]>, any>(true)
	testType.equal<Last<never[]>, never>(true)
	testType.equal<Last<string[]>, string>(true)
	testType.equal<Last<AnyFunction[]>, AnyFunction>(true)
	testType.equal<Last<Array<string | number>>, string | number>(true)
})

it('gets never for empty tuple', () => {
	testType.equal<Last<[]>, never>(true)
})

it('gets the last entry of a tuple', () => {
	testType.equal<Last<[number, AnyFunction]>, AnyFunction>(true)
})

it('can override empty tuple behavior', () => {
	testType.equal<Last<[], { $emptyTuple: undefined }>, undefined>(true)
})

it('supports readonly array', () => {
	testType.equal<Last<readonly string[]>, string>(true)
	testType.equal<Last<readonly [number, AnyFunction]>, AnyFunction>(true)
})
