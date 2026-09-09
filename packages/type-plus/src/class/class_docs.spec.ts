/**
 * Pins the `@example` blocks in the `src/class/*.ts` TSDoc comments to the
 * actual behavior.
 *
 * Every assertion here mirrors a line documented in `src/class/*.ts`, so a doc
 * example that drifts from the implementation fails to compile.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type AnyConstructor, testType } from '../index.js'

it('AnyConstructor examples in TSDoc are accurate', () => {
	class Foo {
		constructor(readonly a: number) {}
	}

	testType.equal<Foo extends AnyConstructor ? true : false, false>(true)
	testType.equal<typeof Foo extends AnyConstructor ? true : false, true>(true)
	testType.equal<typeof Foo extends AnyConstructor<[string]> ? true : false, false>(true)
})
