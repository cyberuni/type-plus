import { it } from 'vitest'

import { type $Else, type $Then, type IsNotTuple, testType } from '../index.js'

it('returns false if T is a tuple', () => {
	testType.false<IsNotTuple<[]>>(true)
	testType.false<IsNotTuple<[1]>>(true)
})

it('returns true if T is an array', () => {
	testType.true<IsNotTuple<string[]>>(true)
})

it('returns true for special types', () => {
	testType.true<IsNotTuple<void>>(true)
	testType.true<IsNotTuple<unknown>>(true)
	testType.true<IsNotTuple<any>>(true)
	testType.true<IsNotTuple<never>>(true)
})

it('returns true if T for other types', () => {
	testType.true<IsNotTuple<undefined>>(true)
	testType.true<IsNotTuple<null>>(true)
	testType.true<IsNotTuple<boolean>>(true)
	testType.true<IsNotTuple<true>>(true)
	testType.true<IsNotTuple<false>>(true)
	testType.true<IsNotTuple<number>>(true)
	testType.true<IsNotTuple<1>>(true)
	testType.true<IsNotTuple<string>>(true)
	testType.true<IsNotTuple<''>>(true)
	testType.true<IsNotTuple<symbol>>(true)
	testType.true<IsNotTuple<bigint>>(true)
	testType.true<IsNotTuple<1n>>(true)
	testType.true<IsNotTuple<{}>>(true)
	testType.true<IsNotTuple<string[]>>(true)
	testType.true<IsNotTuple<Function>>(true)
	testType.true<IsNotTuple<() => void>>(true)
})

it('distributes over union type', () => {
	testType.equal<IsNotTuple<[1] | number>, boolean>(true)
})

it('can disable union distribution', () => {
	testType.equal<IsNotTuple<[] | number, { distributive: false }>, true>(true)
	testType.equal<IsNotTuple<[] | number, { distributive: false; selection: 'filter' }>, [] | number>(true)
})

it('returns false if T is union of tuples', () => {
	testType.equal<IsNotTuple<[] | [1]>, false>(true)
})

it('returns false if T is intersection of tuples', () => {
	testType.equal<IsNotTuple<[] & { a: 1 }>, false>(true)
})

// TODO: add $never support back to the system
// it('can override never case', () => {
// 	testType.equal<IsNotTuple<never, 1, 2, { $never: 3 }>, 3>(true)
// })

it('works as filter', () => {
	testType.equal<IsNotTuple<[], { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<[1], { selection: 'filter' }>, never>(true)

	testType.equal<IsNotTuple<never, { selection: 'filter' }>, never>(true)
	testType.equal<IsNotTuple<unknown, { selection: 'filter' }>, unknown>(true)
	testType.equal<IsNotTuple<[] | number, { selection: 'filter' }>, number>(true)
	testType.equal<IsNotTuple<[] | boolean, { selection: 'filter' }>, boolean>(true)
	testType.equal<IsNotTuple<[1] | bigint, { selection: 'filter' }>, bigint>(true)
})

it('works with unique branches', () => {
	testType.equal<IsNotTuple<[], IsNotTuple.$Branch>, $Else>(true)

	testType.equal<IsNotTuple<bigint, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<any, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<unknown, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<never, IsNotTuple.$Branch>, $Then>(true)
	testType.equal<IsNotTuple<void, IsNotTuple.$Branch>, $Then>(true)
})
