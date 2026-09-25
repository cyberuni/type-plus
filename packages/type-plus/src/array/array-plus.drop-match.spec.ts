import { it } from 'vitest'

import { type $Fn, type ArrayPlus, type IsObject, testType } from '../index.js'

it('drop all types gets never[]', () => {
	type A = ArrayPlus.DropMatch<Array<string>, string>
	testType.equal<A, never[]>(true)

	type B = ArrayPlus.DropMatch<Array<string | boolean>, string | boolean>
	testType.equal<B, never[]>(true)
})

it('drop undefined and null from array', () => {
	type A = ArrayPlus.DropMatch<Array<string | undefined>, undefined>
	testType.equal<A, string[]>(true)

	type B = ArrayPlus.DropMatch<Array<string | number | undefined>, undefined>
	testType.equal<B, Array<string | number>>(true)

	type C = ArrayPlus.DropMatch<Array<string | number | undefined | null>, undefined | null>
	testType.equal<C, Array<string | number>>(true)
})

it('can get undefined and null array when other types dropped', () => {
	type A = ArrayPlus.DropMatch<Array<string | undefined>, string>
	testType.equal<A, Array<undefined>>(true)

	type B = ArrayPlus.DropMatch<Array<string | number | null>, string>
	testType.equal<B, Array<number | null>>(true)
})

it('unmatched criteria returns original', () => {
	type Actual = ArrayPlus.DropMatch<Array<string | undefined>, number>
	testType.equal<Actual, Array<string | undefined>>(true)
})

it('drop all narrow types', () => {
	type A = ArrayPlus.DropMatch<Array<1 | 2 | 3>, number>
	testType.equal<A, never[]>(true)

	type B = ArrayPlus.DropMatch<Array<1 | 2 | 3 | string>, number>
	testType.equal<B, Array<string>>(true)
})

it('will not drop widen type', () => {
	type A = ArrayPlus.DropMatch<Array<number>, 1>
	testType.equal<A, Array<number>>(true)

	type B = ArrayPlus.DropMatch<Array<string | 'foo'>, 'foo'>
	testType.equal<B, Array<string>>(true)

	// C is currently `string[] | string[]` (TypeScript 4.6.2)
	// It does not collapse to `string[]`
	// type C = ArrayPlus.DropMatch<Array<string | 'foo'>, 'foo' | 'boo'>
	// Here `string[] | string[]` literal collapses to `string[]`
	// commenting this out as it will likely be improved in future versions of TypeScript
	// testType.equal<C, string[] | string[]>(true)
})

it('supports readonly array', () => {
	testType.equal<ArrayPlus.DropMatch<Readonly<Array<string | undefined>>, string>, Array<undefined>>(true)
	testType.equal<ArrayPlus.DropMatch<readonly (1 | 2 | 3 | string)[], number>, Array<string>>(true)
})

it('drops the element types a type function returns true for', () => {
	testType.equal<ArrayPlus.DropMatch<Array<string | { a: 1 }>, IsObject.$Fn>, string[]>(true)
	testType.equal<ArrayPlus.DropMatch<Array<{ a: 1 }>, IsObject.$Fn>, never[]>(true)
	testType.equal<ArrayPlus.DropMatch<Array<{ a: 1 } | object>, IsObject.$Fn<{ exact: true }>>, Array<{ a: 1 }>>(true)
	testType.equal<ArrayPlus.DropMatch<Array<string | { a: 1 }>, $Fn.Not<IsObject.$Fn>>, Array<{ a: 1 }>>(true)
})
