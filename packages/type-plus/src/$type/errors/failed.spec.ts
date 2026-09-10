import { it } from 'vitest'

import { type Failed, type FailedT, testType } from '../../index.js'

it('shows error message (inspect by hover over it)', () => {
	type R = Failed<'error message'>

	testType.equal<R, Failed<'error message'>>(true)
})

it('shows error message with type', () => {
	type R = FailedT<'type should be', number | string>

	testType.equal<R, FailedT<'type should be', number | string>>(true)
})

it('the type parameter is phantom: it does not distinguish two FailedT', () => {
	testType.equal<FailedT<'missing', number | string>, FailedT<'missing', boolean>>(true)
})
