// By Drew Colthorp, <https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/#comment-604580>
// <https://gist.github.com/dcolthorp/aa21cf87d847ae9942106435bf47565d>

import { isType } from '../type-guard/is-type.js'
import type { Widen } from '../utils/widen.js'
import { typeSym, valueSym } from './constants.js'

/**
 * 🧰 *type util*
 *
 * Creates a "flavored" version of the type `T`, named `F`.
 *
 * TypeScript will disallow mixing flavors,
 * but will allow unflavored values of that type to be passed in where a flavored version is expected.
 * This is a less restrictive form of branding: compare `Brand`.
 *
 * @example
 * ```ts
 * type PersonId = Flavor<'Person', number>
 * type BlogId = Flavor<'Blog', number>
 *
 * const personId: PersonId = 1 // ok: a plain `number` is accepted
 * const n: number = personId // ok
 * const blogId: BlogId = personId // error: a different flavor
 * ```
 */
export type Flavor<F extends string, T> = [T] extends [null] | [undefined] | [symbol] | [void]
	? FlavoredUnit<F, T>
	: Flavored<F> & T

/**
 * A flavored type of `F`
 */
export interface Flavored<F extends string> {
	[typeSym]?: F
}

/**
 * A special flavored type for special types.
 */
export interface FlavoredUnit<F extends string, T> {
	[typeSym]?: F
	[valueSym]: T
}

/**
 * Creates a brand creator with the specified type.
 */
export function flavor<F extends string>(type: F): <T>(subject: T) => Flavor<F, Widen<T>>
/**
 * Creates a branded value of specified type.
 */
export function flavor<F extends string, T>(type: F, subject: T): Flavor<F, Widen<T>>
export function flavor(type: string, subject?: unknown) {
	if (subject === undefined) return <T>(subject: T) => flavor(type, subject)

	if (isType<{ [typeSym]: string }>(subject, (s) => typeof s === 'object' && s !== null)) {
		// if subject is not an object, the branding will exist only in type-level.
		subject[typeSym] = type
	}

	return subject
}
