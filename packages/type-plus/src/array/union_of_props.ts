import type { KeyTypes } from '../object/index.js'
import type { Tail } from '../tuple/tail.js'

/**
 * Gets the union of properties of the elements in `A`
 */
export type UnionOfProps<A extends readonly Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
	? never
	: A['length'] extends 1
		? A[0][P]
		: A[0][P] | UnionOfProps<Tail<A>, P>

/**
 * 🦴 *utilities*
 * 👽 *alias*
 *
 * Gets the union of properties of the elements in `A`.
 *
 * @alias of [UnionOfProps](./union_of_props.ts)
 * @deprecated Use `UnionOfProps`, the same type under its primary name.
 * `PropUnion` will be removed in a future major.
 */
export type PropUnion<A extends readonly Record<any, any>[], P extends KeyTypes> = UnionOfProps<A, P>
