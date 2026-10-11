import { it } from 'vitest'

import type { $Error, $Type } from '../../index.js'
import { testType } from '../../testing/index.js'

it('requires message', () => {
	type R = $Error<'some message'>
	testType.equal<R[$Type.$TypeKey], 'error'>(true)
	testType.equal<R[$Type.$ValueKey]['message'], 'some message'>(true)

	testType.equal<R['message'], 'some message'>(true)
})

it('can provide type', () => {
	type R = $Error<'some message', number>

	testType.equal<R[$Type.$TypeKey], 'error'>(true)
	testType.equal<R[$Type.$ValueKey]['message'], 'some message'>(true)
	testType.equal<R[$Type.$ValueKey]['type'], number>(true)

	testType.equal<R['message'], 'some message'>(true)
	testType.equal<R['type'], number>(true)
})
