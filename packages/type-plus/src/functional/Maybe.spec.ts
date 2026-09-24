import { expect, test } from 'vitest'

import { type Assignable, canAssign, testType } from '../index.js'
import { type Just, just, type Maybe, type None, none } from './Maybe.js'

test('just(value) returns Maybe<T>', () => {
	just(1) satisfies Maybe<number>
})

test('just(undefined) returns Maybe<T>', () => {
	const b: boolean | undefined = undefined
	just(b) satisfies Maybe<boolean>
})

test('none<T>() returns Maybe<T>', () => {
	none<boolean>() satisfies Maybe<boolean>
})

test('unwrap Maybe<T> returns value', () => {
	const maybe = just('abc')
	const actual = maybe.unwrap()

	actual satisfies string
	expect(actual).toBe('abc')
})

test('None can assign to Maybe<T>', () => {
	const actual = none<number>()

	testType.true<Assignable<typeof actual, Maybe<number>>>(true)
	testType.true<Assignable<None<number>, Maybe<number>>>(true)
	expect(canAssign<Maybe<number>>()(none<number>())).toBe(true)
})

test('Just<number can assign to Maybe<number>', () => {
	testType.true<Assignable<Just<number>, Maybe<number>>>(true)
	expect(canAssign<Maybe<number>>()(just(1))).toBe(true)
})

test('Just<string> is not assignable to Maybe<number>', () => {
	testType.false<Assignable<Just<'abc'>, Maybe<number>>>(true)

	expect(canAssign<Maybe<number>>(false)(just('abc'))).toBe(true)
})
