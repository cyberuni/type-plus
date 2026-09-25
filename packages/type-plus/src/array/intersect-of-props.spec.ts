import { it } from 'vitest'

import { type IntersectOfProps, testType } from '../index.js'

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
