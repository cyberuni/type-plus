/**
 * Pins the `@example` blocks in the `src/$type/**` TSDoc comments to the actual
 * behavior.
 *
 * The branch markers and the option namespaces are what the whole
 * `$Options`/`$Branch` convention rests on, so their examples are worth the
 * same compiler check as the types that use them.
 *
 * Follows the pattern introduced for the numeric family in #662.
 */
import { it } from 'vitest'

import { type $Else, type $Then, type FailedT, type IsNotObject, type IsObject, testType } from '../index.js'

it('$Then and $Else examples in TSDoc are accurate', () => {
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<{}, IsNotObject.$Branch>, $Else>(true)

	type Handle<T> =
		IsObject<T, IsObject.$Branch> extends infer R
			? R extends $Then
				? 'an object'
				: R extends $Else
					? 'not an object'
					: never
			: never

	testType.equal<Handle<{}>, 'an object'>(true)
	testType.equal<Handle<string>, 'not an object'>(true)
})

it('$Selection examples in TSDoc are accurate', () => {
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
})

it('$Distributive examples in TSDoc are accurate', () => {
	testType.equal<IsObject<{} | 1>, boolean>(true)
	testType.equal<IsObject<{} | 1, { distributive: false }>, false>(true)
})

it('$Exact examples in TSDoc are accurate', () => {
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{}, { exact: true }>, false>(true)
	testType.equal<IsObject<object, { exact: true }>, true>(true)
})

it('FailedT example in TSDoc is accurate', () => {
	// the second parameter is phantom: it does not distinguish two `FailedT`
	testType.equal<FailedT<'missing', number | string>, FailedT<'missing', boolean>>(true)
})
