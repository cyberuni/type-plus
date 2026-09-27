import { it } from 'vitest'

import { type ComposableTypes, type NonComposableTypes, testType } from './index.js'

it('includes object, array, and function', () => {
	;({}) satisfies ComposableTypes
	;[] satisfies ComposableTypes
	// function is composable because you can do
	// `Object.assign(fn, { ... })
	;(() => {}) satisfies ComposableTypes

	testType.equal<{ a: 1 } extends ComposableTypes ? true : false, true>(true)
	testType.equal<(() => void) extends ComposableTypes ? true : false, true>(true)
	testType.equal<string extends ComposableTypes ? true : false, false>(true)

	testType.canAssign<null, ComposableTypes>(false)
	testType.canAssign<undefined, ComposableTypes>(false)
	testType.canAssign<1, ComposableTypes>(false)
	testType.canAssign<true, ComposableTypes>(false)
	testType.canAssign<'', ComposableTypes>(false)
	testType.canAssign<symbol, ComposableTypes>(false)
})

it('NonComposableType excludes object, array, and function', () => {
	null satisfies NonComposableTypes
	undefined satisfies NonComposableTypes
	true satisfies NonComposableTypes
	1 satisfies NonComposableTypes
	'' satisfies NonComposableTypes
	Symbol() satisfies NonComposableTypes

	testType.equal<string extends NonComposableTypes ? true : false, true>(true)
	testType.equal<null extends NonComposableTypes ? true : false, true>(true)
	testType.equal<{ a: 1 } extends NonComposableTypes ? true : false, false>(true)

	testType.canAssign<{}, NonComposableTypes>(false)
	testType.canAssign<[], NonComposableTypes>(false)
	testType.canAssign<() => void, NonComposableTypes>(false)
})
