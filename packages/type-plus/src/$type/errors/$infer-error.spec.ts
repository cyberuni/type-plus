import { it } from 'vitest'

import { type $InferError, type $Type, testType } from '../../index.js'

it('can specify message only', () => {
	type R = $InferError<'some message'>

	testType.equal<R[$Type.$TypeKey], 'error'>(true)
	testType.equal<R[$Type.$ValueKey]['message'], 'Unable to infer: some message'>(true)
})

it('can specify type value', () => {
	type R = $InferError<'some message', { a: { b: { c: { d: { e: { f: { g: number } } } } } } }>
	testType.equal<R[$Type.$ValueKey]['type'], { a: { b: { c: { d: { e: { f: { g: number } } } } } } }>(true)
})
