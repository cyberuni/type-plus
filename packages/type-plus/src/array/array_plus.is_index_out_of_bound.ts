import type { IsNever } from '../never/is_never.js'
import type { IndexAt } from './array_plus.index_at.js'

/**
 * 🎭 *predicate*
 *
 * Is `N` an out of bound index of `A`.
 *
 * @example
 * ```ts
 * type R = IsIndexOutOfBound<[1], 0> // false
 * type R = IsIndexOutOfBound<[1], -1> // false
 *
 * type R = IsIndexOutOfBound<[1], 1> // true
 * type R = IsIndexOutOfBound<[1], -2> // true
 * ```
 */
export type IsIndexOutOfBound<A extends readonly unknown[], N extends number, Then = true, Else = false> = IsNever<
	IndexAt<A, N, { $never: never; caseEmptyTuple: never; caseUpperBound: never; caseLowerBound: never }>,
	{
		$then: Then
		$else: Else
	}
>
