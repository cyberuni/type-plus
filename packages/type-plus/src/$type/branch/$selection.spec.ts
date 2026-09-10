import { it } from 'vitest'

import { type $Else, type $Then, type IsNotObject, type IsObject, testType } from '../../index.js'

it('a branching type returns $Then or $Else when given its $Branch options', () => {
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
	testType.equal<IsObject<string, IsObject.$Branch>, $Else>(true)
	testType.equal<IsNotObject<{}, IsNotObject.$Branch>, $Else>(true)
})

it('the markers are matched with a single conditional', () => {
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

it('the selection option picks between the predicate, filter and branch forms', () => {
	testType.equal<IsObject<{}>, true>(true)
	testType.equal<IsObject<{}, { selection: 'filter' }>, {}>(true)
	testType.equal<IsObject<{}, IsObject.$Branch>, $Then>(true)
})
