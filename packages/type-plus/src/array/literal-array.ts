import type { KeyTypes } from '../object/key-types.js'

/**
 * 🦴 *utilities*
 *
 * return an array whose items are restricted to the provided literals.
 */
export function literalArray<T extends KeyTypes>(...entries: T[]): T[] {
	return entries
}
