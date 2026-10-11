import { it } from 'vitest'
import type { $Type } from '../index.js'
import { testType } from '../testing/index.js'

it('is unique for each value', () => {
	type X = $Type<'a', 'b'>
	type Y = $Type<'a', 'c'>
	// @ts-expect-error
	let _x: X = {} as any
	const y: Y = {} as any

	// Y is not assignable to X
	// @ts-expect-error
	_x = y
})

it('can be used without value', () => {
	type X = $Type<'a'>

	const _x: X = {} as any

	testType.equal<typeof _x, $Type<'a'>>(true)
})

it('same type is assignable', () => {
	type X = $Type<'a'>
	type Y = $Type<'a'>

	testType.equal<X, Y>(true)
})

it('can be used with primitive types', () => {
	testType.equal<$Type<'a', null>[$Type.$ValueKey], null>(true)
	testType.equal<$Type<'a', undefined>[$Type.$ValueKey], undefined>(true)
	testType.equal<$Type<'a', void>[$Type.$ValueKey], void>(true)
	testType.equal<$Type<'a', unknown>[$Type.$ValueKey], unknown>(true)
	testType.equal<$Type<'a', never>[$Type.$ValueKey], never>(true)
	testType.equal<$Type<'a', boolean>[$Type.$ValueKey], boolean>(true)
	testType.equal<$Type<'a', true>[$Type.$ValueKey], true>(true)
	testType.equal<$Type<'a', false>[$Type.$ValueKey], false>(true)
	testType.equal<$Type<'a', number>[$Type.$ValueKey], number>(true)
	testType.equal<$Type<'a', 123>[$Type.$ValueKey], 123>(true)
	testType.equal<$Type<'a', string>[$Type.$ValueKey], string>(true)
	testType.equal<$Type<'a', 'abc'>[$Type.$ValueKey], 'abc'>(true)
	testType.equal<$Type<'a', symbol>[$Type.$ValueKey], symbol>(true)
	testType.equal<$Type<'a', bigint>[$Type.$ValueKey], bigint>(true)
	testType.equal<$Type<'a', 1n>[$Type.$ValueKey], 1n>(true)
	testType.equal<$Type<'a', Function>[$Type.$ValueKey], Function>(true)
})

it('can be used with object', () => {
	type X = $Type<'a', { a: 1 }>

	testType.equal<X[$Type.$ValueKey], { a: 1 }>(true)
	testType.equal<X[$Type.$ValueKey]['a'], 1>(true)
	testType.equal<X['a'], 1>(true)
	testType.canAssign<X, { a: 1 }>(true)
	testType.canAssign<{ a: 1 }, X>(false)
})

it('can set bare usage', () => {
	type X = $Type<'a', { a: 1 }, { bare: true }>

	testType.equal<X[$Type.$ValueKey], { a: 1 }>(true)
	testType.canAssign<X, { a: 1 }>(false)
})
