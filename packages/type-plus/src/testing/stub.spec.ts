import { expect, it } from 'vitest'
import { stub, testType } from './index.js'

it('accepts a partial of the requested type', () => {
	function foo(_v: { a: number; b: string }) {}

	foo(stub({ a: 1 }))
})

it('pass through the stub if it is a function', () => {
	// this is useful when the stub is being used generically,
	// and the value can be a function.
	const r = stub(() => ({ a: 1 }))
	testType.equal<typeof r, () => { a: number }>(true)
	expect(r()).toEqual({ a: 1 })
})

it('retains param types if the requested type is a function', () => {
	// This is the use case for `NoInfer`
	function foo(_v: (a: string, b: number) => boolean) {}

	foo(
		stub((_a, _b) => {
			testType.equal<typeof _a, string>(true)
			testType.equal<typeof _b, number>(true)
			return false
		}),
	)
})
