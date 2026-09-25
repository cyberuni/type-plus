import { expect, it } from 'vitest'

import { type Brand, brand, flavor, testType } from '../index.js'

it('branded type does not resolve to never', () => {
	testType.never<Brand<'test', undefined>>(false)
	testType.never<Brand<'test', null>>(false)

	testType.never<Brand<'test', boolean>>(false)
	testType.never<Brand<'test', true>>(false)
	testType.never<Brand<'test', false>>(false)

	testType.never<Brand<'test', number>>(false)
	testType.never<Brand<'test', 0>>(false)
	testType.never<Brand<'test', 1>>(false)

	testType.never<Brand<'test', string>>(false)
	testType.never<Brand<'test', 'a'>>(false)

	const uniSym = Symbol()
	testType.never<Brand<'test', symbol>>(false)
	testType.never<Brand<'test', typeof uniSym>>(false)

	testType.never<Brand<'test', bigint>>(false)
	testType.never<Brand<'test', 1n>>(false)

	testType.never<Brand<'test', object>>(false)
	testType.never<Brand<'test', {}>>(false)
	testType.never<Brand<'test', { a: 1 }>>(false)
	testType.never<Brand<'test', []>>(false)

	testType.never<Brand<'test', Function>>(false)
	testType.never<Brand<'test', () => void>>(false)
})

it('keeps unbranded values and other brands out, while the branded value stays a T', () => {
	type PersonId = Brand<'Person', number>
	type BlogId = Brand<'Blog', number>

	testType.canAssign<number, PersonId>(false)
	const personId = brand('Person', 1)
	testType.equal<typeof personId, PersonId>(true)
	testType.canAssign<PersonId, number>(true)
	testType.canAssign<PersonId, BlogId>(false)
})

it('cannot assign from unbranded type', () => {
	const a = brand('a', { a: 1 })
	const b = { a: 1 }

	testType.canAssign<typeof b, typeof a>(false)
})

it('can assign to unbranded type', () => {
	let a = { a: 1 }
	const b = brand('a', { a: 1 })
	a = b
	testType.canAssign<typeof b, typeof a>(true)
})

it('cannot assign between null and undefined brand', () => {
	type N = Brand<'b', null>
	type U = Brand<'b', undefined>
	testType.canAssign<N, U>(false)
})

it('cannot assign between two different brand', () => {
	const a = brand('a', { a: 1 as const })
	const b = brand('b', { b: 'b' })

	testType.canAssign<typeof a, typeof b>(false)
	testType.equal<typeof a.a, 1>(true)
	testType.equal<typeof b.b, string>(true)
})

it('can assign betwen same brand of the same type', () => {
	const a = brand('a', { a: 1 })
	let b = brand('a', { a: 2 })

	b = a
	expect(b.a).toBe(1)
})

it('cannot assign betwen same brand with different type', () => {
	const a = brand('a', { a: 1 })
	const b = brand('a', { b: 2 })

	testType.canAssign<typeof a, typeof b>(false)
})

it('cannot assign from flavor with the same name', () => {
	const b = brand('x', { a: 1 })
	const f = flavor('x', { a: 1 })
	testType.canAssign<typeof f, typeof b>(false)
})

it('can assign to flavor with the same name (this is a feature of flavor)', () => {
	const b = brand('x', { a: 1 })
	const f = flavor('x', { a: 1 })
	testType.canAssign<typeof b, typeof f>(true)
})

it('creates a typed brand ceator when invoke without subject', () => {
	const createPerson = brand('person')
	let person1 = createPerson(1)
	let person2 = createPerson(2)

	const createBlogPost = brand('Blog')
	const blogPost = createBlogPost(1)

	person1 = person2
	person2 = person1

	testType.equal<typeof blogPost, typeof person1>(false)
})

it('accepts null as subject', () => {
	const b = brand('x', null)
	testType.never<typeof b>(false)
})

it('accepts undefined as subject', () => {
	const b = brand('x', undefined)
	testType.never<typeof b>(false)
})

it('accepts function as subject', () => {
	const b = brand('x', function boo() {})
	const c = brand('x', function coo() {})

	testType.never<typeof b>(false)
	testType.canAssign<typeof b, typeof c>(true)
	testType.canAssign<typeof c, typeof b>(true)
})

it('can assign to another function brand based on function assignment logic', () => {
	function af() {}
	function bf(_: string) {}
	function cf(_: number) {}
	const a = brand('x', af)
	const b = brand('x', bf)
	const c = brand('x', cf)

	testType.canAssign<typeof af, typeof bf>(true)
	testType.canAssign<typeof a, typeof b>(true)

	testType.canAssign<typeof bf, typeof af>(false)
	testType.canAssign<typeof b, typeof a>(false)

	testType.canAssign<typeof cf, typeof bf>(false)
	testType.canAssign<typeof c, typeof b>(false)
})
