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
 * 🦴 *utilities*
 * 👽 *alias*
 *
 * Gets the intersect of properties of the elements in `A`.
 *
 * @alias of [IntersectOfProps](./intersect_of_props.ts)
 * @deprecated Use `IntersectOfProps`, the same type under its primary name.
 * `MapToProp` will be removed in a future major.
 */
export type MapToProp<A extends readonly Record<any, any>[], P extends KeyTypes> = IntersectOfProps<A, P>
