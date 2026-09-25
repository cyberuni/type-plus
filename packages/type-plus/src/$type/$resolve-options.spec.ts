import { it } from 'vitest'

import { type $Never, type $ResolveOptions, type $Then, testType } from '../index.js'

// alternative implementation
// export type $ResolveOptions<Values extends unknown[]> =
// 0 extends 1 & Values
// ? $Error<'Values cannot be `any`.', Values>
// : ([Values, never] extends [never, Values]
// 	? $Error<'Values cannot be `never`.', Values>
// 	: (Values extends []
// 		? $Error<'Values cannot be `[]`.', Values>
// 		: $ResolveOptions._<Values, never>))

it('returns first non unknown', () => {
	testType.equal<$ResolveOptions<[unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, unknown, 1]>, 1>(true)
	testType.equal<$ResolveOptions<[unknown, unknown, $Never]>, $Never>(true)
	testType.equal<$ResolveOptions<[$Never, $Then]>, $Never>(true)
	testType.equal<$ResolveOptions<[unknown, $Never, $Then]>, $Never>(true)
})

it('returns last element', () => {
	testType.equal<$ResolveOptions<[1]>, 1>(true)
	testType.equal<$ResolveOptions<[any]>, any>(true)
	testType.equal<$ResolveOptions<[void]>, void>(true)
	testType.equal<$ResolveOptions<[false]>, false>(true)
	testType.equal<$ResolveOptions<[never]>, never>(true)
	testType.equal<$ResolveOptions<[unknown]>, unknown>(true)
})
