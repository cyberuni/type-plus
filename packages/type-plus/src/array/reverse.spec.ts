import { test } from 'vitest'

import { type Reverse, testType } from '../index.js'

test('empty array gets itself', () => {
	testType.equal<Reverse<[]>, []>(true)
})

test('array type gets itself', () => {
	testType.equal<Reverse<string[]>, string[]>(true)
})

test('single element array gets itself', () => {
	testType.equal<Reverse<[1]>, [1]>(true)
})

test('multi elements', () => {
	testType.equal<Reverse<[1, 2, 3, 4]>, [4, 3, 2, 1]>(true)
})

test('keeps readonly on a readonly tuple', () => {
	testType.equal<Reverse<readonly [1, 2, 3]>, readonly [3, 2, 1]>(true)
	testType.equal<Reverse<readonly [1]>, readonly [1]>(true)
	testType.equal<Reverse<readonly []>, readonly []>(true)
})

test('readonly array gets itself', () => {
	testType.equal<Reverse<readonly string[]>, readonly string[]>(true)
})
