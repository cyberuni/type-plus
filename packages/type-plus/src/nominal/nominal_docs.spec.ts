/**
 * Pins the `@example` blocks in the `src/nominal/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/nominal/*.ts`, so a
 * doc example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { expect, it } from 'vitest'

import { brand, flavor, nominalMatch } from '../index.js'

it('nominalMatch examples in TSDoc are accurate', () => {
	const a = brand('x', { a: 1 })
	const b = brand('x', { b: 2 })
	expect(nominalMatch(a, b)).toBe(true)

	const c = flavor('x', 1)
	const d = flavor('x', 2)
	expect(nominalMatch(c, d)).toBe(true)
})
