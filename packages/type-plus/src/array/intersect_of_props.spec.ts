import { it } from 'vitest'

import { type IntersectOfProps, type MapToProp, testType } from '../index.js'

it('gets property from single value tuple', () => {
	type S = [{ a: number }]
	type A = IntersectOfProps<S, 'a'>

	testType.equal<A, number>(true)
})

it('gets property from multiple values', () => {
	type S = [{ a: { x: number } }, { a: { y: string } }]
	type A = IntersectOfProps<S, 'a'>
	testType.equal<A, { x: number } & { y: string }>(true)
})

it('gets property from array', () => {
	testType.equal<IntersectOfProps<Array<{ a: number } | { a: string }>, 'a'>, number | string>(true)
})

it('support readonly array', () => {
	type A = IntersectOfProps<readonly [{ a: { x: number } }, { a: { y: string } }], 'a'>
	testType.equal<A, { x: number } & { y: string }>(true)
})

it('MapToProp supports readonly tuple', () => {
	type A = MapToProp<readonly [{ a: { x: number } }, { a: { y: string } }], 'a'>
	testType.equal<A, { x: number } & { y: string }>(true)
})

it('MapToProp, the deprecated name, is the same as IntersectOfProps', () => {
	type S = [{ a: { x: 1 } }, { a: { y: 2 } }]
	testType.equal<MapToProp<S, 'a'>, IntersectOfProps<S, 'a'>>(true)
})
