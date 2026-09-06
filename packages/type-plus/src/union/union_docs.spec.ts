/**
 * Pins the `@example` blocks in the `src/union/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/union/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type IsUnion, testType, type UnionType } from '../index.js'

it('UnionType examples in TSDoc are accurate', () => {
	testType.equal<UnionType<'a' | 'b'>, 'a' | 'b'>(true)
	testType.equal<UnionType<boolean>, boolean>(true)
	testType.equal<UnionType<number>, never>(true)
})

it('IsUnion examples in TSDoc are accurate', () => {
	testType.equal<IsUnion<'a' | 'b'>, true>(true)
	testType.equal<IsUnion<boolean>, true>(true)
	testType.equal<IsUnion<number>, false>(true)
})
