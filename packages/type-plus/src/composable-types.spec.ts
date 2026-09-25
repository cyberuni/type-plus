import { expect, it } from 'vitest'

import { type ComposableTypes, canAssign, type NonComposableTypes } from './index.js'

it('includes object, array, and function', () => {
	;({}) satisfies ComposableTypes
	;[] satisfies ComposableTypes
	// function is composable because you can do
	// `Object.assign(fn, { ... })
	;(() => {}) satisfies ComposableTypes

	expect(canAssign<ComposableTypes>(false)(null)).toBe(true)
	expect(canAssign<ComposableTypes>(false)(undefined)).toBe(true)
	expect(canAssign<ComposableTypes>(false)(1)).toBe(true)
	expect(canAssign<ComposableTypes>(false)(true)).toBe(true)
	expect(canAssign<ComposableTypes>(false)('')).toBe(true)
	expect(canAssign<ComposableTypes>(false)(Symbol())).toBe(true)
})

it('NonComposableType excludes object, array, and function', () => {
	null satisfies NonComposableTypes
	undefined satisfies NonComposableTypes
	true satisfies NonComposableTypes
	1 satisfies NonComposableTypes
	'' satisfies NonComposableTypes
	Symbol() satisfies NonComposableTypes

	expect(canAssign<NonComposableTypes>(false)({})).toBe(true)
	expect(canAssign<NonComposableTypes>(false)([])).toBe(true)
	expect(canAssign<NonComposableTypes>(false)(() => {})).toBe(true)
})
