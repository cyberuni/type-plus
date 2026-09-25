import { it } from 'vitest'
import type { AdjustExactOptionalProps } from '../index.js'
import { testType } from '../testing/test-type.js'

it('adds undefined to optional props', () => {
	type X = { a: string; b?: string }
	type S = AdjustExactOptionalProps<X>
	testType.equal<S, { a: string; b?: string | undefined }>(true)
})

it('works with empty object', () => {
	type X = {}
	type S = AdjustExactOptionalProps<X>
	testType.equal<S, {}>(true)
})

it('works with type with only optional props', () => {
	type X = { a?: string }
	type S = AdjustExactOptionalProps<X>
	// it should not have `& {}`.
	// can't test this programmatically.
	testType.equal<S, { a?: string | undefined }>(true)
})

it('works with type with only required props', () => {
	type X = { a: string }
	type S = AdjustExactOptionalProps<X>
	// it should not have `& {}`.
	// can't test this programmatically.
	testType.equal<S, { a: string }>(true)
})

it('works with intersection', () => {
	type X = { a: string; b?: string } & { c: string }
	type S = AdjustExactOptionalProps<X>
	testType.equal<S, { a: string; b?: string | undefined; c: string }>(true)
})

it('works with union', () => {
	type X = { a: string; b?: string } | { c: string }
	type S = AdjustExactOptionalProps<X>
	testType.equal<S, { a: string; b?: string | undefined } | { c: string }>(true)
})
