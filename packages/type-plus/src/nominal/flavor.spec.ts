import { describe, expect, it, test } from 'vitest'

import { assertType, brand, type CanAssign, type Flavor, flavor, testType } from '../index.js'

it('branded type does not resolve to never', () => {
	testType.never<Flavor<'test', undefined>>(false)
	testType.never<Flavor<'test', null>>(false)

	testType.never<Flavor<'test', boolean>>(false)
	testType.never<Flavor<'test', true>>(false)
	testType.never<Flavor<'test', false>>(false)

	testType.never<Flavor<'test', number>>(false)
	testType.never<Flavor<'test', 0>>(false)
	testType.never<Flavor<'test', 1>>(false)

	testType.never<Flavor<'test', string>>(false)
	testType.never<Flavor<'test', 'a'>>(false)

	const uniSym = Symbol()
	testType.never<Flavor<'test', symbol>>(false)
	testType.never<Flavor<'test', typeof uniSym>>(false)

	testType.never<Flavor<'test', bigint>>(false)
	testType.never<Flavor<'test', 1n>>(false)

	testType.never<Flavor<'test', object>>(false)
	testType.never<Flavor<'test', {}>>(false)
	testType.never<Flavor<'test', { a: 1 }>>(false)
	testType.never<Flavor<'test', []>>(false)

	testType.never<Flavor<'test', Function>>(false)
	testType.never<Flavor<'test', () => void>>(false)
})

it('cannot assign between null and undefined brand', () => {
	type N = Flavor<'b', null>
	type U = Flavor<'b', undefined>
	testType.canAssign<N, U>(false)
})

test('underlying type can be assigned to Flavor', () => {
	type PersonId = Flavor<'Person', number>
	type BlogId = Flavor<'Blog', number>

	let personId: PersonId = 1
	let personId2: PersonId = 2

	personId = personId2
	personId2 = personId

	const blogId: BlogId = 1

	testType.canAssign<typeof blogId, typeof personId>(false)
})

describe('flavor()', () => {
	test('basic use case', () => {
		const a = flavor('a', { a: 1 as const })
		const b = flavor('b', { b: 'b' })

		testType.false<CanAssign<typeof a, typeof b>>(true)
		assertType<1>(a.a)
		assertType<string>(b.b)
	})
	test('same flavor of the same type can be assigned to each other', () => {
		const a = flavor('a', { a: 1 })
		let b = flavor('a', { a: 2 })
		b = a
		expect(b.a).toBe(1)
	})
	test('brand with the same name can be assigned to flavor', () => {
		const b = brand('x', { a: 1 })
		const f = flavor('x', { a: 1 })
		testType.true<CanAssign<typeof b, typeof f>>(true)
	})
	test('without subject creates a typed flavor creator', () => {
		const createPerson = flavor('person')
		let person1 = createPerson(1)
		let person2 = createPerson(2)

		const createBlogPost = flavor('Blog')
		const blogPost = createBlogPost(1)

		person1 = person2
		person2 = person1

		testType.false<CanAssign<typeof blogPost, typeof person1>>(true)
	})
})
