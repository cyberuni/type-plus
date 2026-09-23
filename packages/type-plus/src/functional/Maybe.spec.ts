import { expect, test } from 'vitest'

import { type Assignable, assertType, canAssign, testType } from '../index.js'
import { type Just, just, type Maybe, type None, none } from './Maybe.js'

test('just(value) returns Maybe<T>', () => {
	assertType<Maybe<number>>(just(1))
})

test('just(undefined) returns Maybe<T>', () => {
	const b: boolean | undefined = undefined
	assertType<Maybe<boolean>>(just(b))
})

test('none<T>() returns Maybe<T>', () => {
	assertType<Maybe<boolean>>(none<boolean>())
})

test('unwrap Maybe<T> returns value', () => {
	const maybe = just('abc')
	const actual = maybe.unwrap()

	assertType<string>(actual)
	expect(actual).toBe('abc')
})

test('None can assign to Maybe<T>', () => {
	const actual = none<number>()

	testType.true<Assignable<typeof actual, Maybe<number>>>(true)
	testType.true<Assignable<None<number>, Maybe<number>>>(true)
	assertType.isTrue(canAssign<Maybe<number>>()(none<number>()))
})

test('Just<number can assign to Maybe<number>', () => {
	testType.true<Assignable<Just<number>, Maybe<number>>>(true)
	assertType.isTrue(canAssign<Maybe<number>>()(just(1)))
})

test('Just<string> is not assignable to Maybe<number>', () => {
	testType.false<Assignable<Just<'abc'>, Maybe<number>>>(true)

	assertType.isTrue(canAssign<Maybe<number>>(false)(just('abc')))
})
