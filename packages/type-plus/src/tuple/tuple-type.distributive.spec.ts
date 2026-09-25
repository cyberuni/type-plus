import { it } from 'vitest'

import { type IsNever, testType } from '../index.js'

// @todo: this should be a new type that filter within the union.
// That type cannot support override because the `Then` type can be overridden,
// and the logic will not be correct.
type TupleTypeFilterUnion<T> = IsNever<
	T,
	{
		$then: never
		$else: T extends any[] ? (number extends T['length'] ? never : T) : never
	}
>

it.skip('returns filtered union if T is an union of tuple with non-tuple types', () => {
	testType.equal<TupleTypeFilterUnion<[1] | string>, [1]>(true)
	testType.equal<TupleTypeFilterUnion<[1] | [1, 2] | string>, [1] | [1, 2]>(true)
})
