/**
 * Pins the `@example` blocks in the `src/nodejs/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/nodejs/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type SystemErrorCodes, type SystemErrors, testType } from '../index.js'

it('SystemErrors example in TSDoc is accurate', () => {
	testType.equal<SystemErrors['ENOENT'], Error & { code: 'ENOENT'; path: string }>(true)
})

it('SystemErrorCodes examples in TSDoc are accurate', () => {
	testType.equal<'ENOENT' extends SystemErrorCodes ? true : false, true>(true)
	testType.equal<'EDQUOT' extends SystemErrorCodes ? true : false, false>(true)
})
