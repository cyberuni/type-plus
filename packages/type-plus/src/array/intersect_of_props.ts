import type { KeyTypes } from '../object/index.js'
import type { Tail } from '../tuple/tail.js'

/**
 * 🦴 *utilities*
 *
 * Gets the intersect of properties of the elements in `A`.
 */
export type IntersectOfProps<A extends readonly Record<any, unknown>[], P extends KeyTypes> = number extends A['length']
	? A[0][P]
	: A['length'] extends 0
		? never
		: A['length'] extends 1
			? A[0][P]
			: A[0][P] & IntersectOfProps<Tail<A>, P>

/**
 * Gets the intersect of properties of the elements in `A`
 * This will be deprecated in 4.0. Please use IntersectOfProps instead.
 */
export type MapToProp<A extends readonly Record<any, any>[], P extends KeyTypes> = IntersectOfProps<A, P>
