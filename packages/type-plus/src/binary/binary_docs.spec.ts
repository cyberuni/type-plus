/**
 * Pins the `@example` blocks in the `src/binary/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/binary/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type B, type Bit, testType } from '../index.js'

it('B and Bit examples in TSDoc are accurate', () => {
	testType.equal<B.And<1, 1>, 1>(true)
	testType.equal<Bit.Or<0, 1>, 1>(true)
	testType.equal<B.Not<0>, 1>(true)
	testType.equal<Bit.Xor<1, 1>, 0>(true)

	testType.equal<B.Bit, 0 | 1>(true)
})
