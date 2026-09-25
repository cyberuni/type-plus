import { it } from 'vitest'

import { type Box, testType } from '../index.js'

it('boxes arrow function to Function', () => {
	testType.equal<Box<() => void>, Function>(true)
})

it('boxes literal to its boxed type', () => {
	testType.equal<Box<true>, Boolean>(true)
	testType.equal<Box<1>, Number>(true)
	testType.equal<Box<'a'>, String>(true)
})

it('boxes object type', () => {
	testType.equal<Box<object>, Object>(true)
})

it('keeps object literals', () => {
	testType.equal<Box<{ a: 1 }>, { a: 1 }>(true)
})
