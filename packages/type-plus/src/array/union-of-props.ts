import type { KeyTypes } from '../object/key-types.js'
import type { Tail } from '../tuple/tail.js'

/**
 * Gets the union of properties of the elements in `A`
 */
export type UnionOfProps<A extends readonly Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
	? never
	: A['length'] extends 1
		? A[0][P]
		: A[0][P] | UnionOfProps<Tail<A>, P>
