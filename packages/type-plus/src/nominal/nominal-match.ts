import type { Brand } from './brand.js'
import { typeSym } from './constants.js'
import type { Flavor } from './flavor.js'

/**
 * Whether two branded or flavored values carry the same nominal type.
 *
 * Most of the work happens at compile time: the signature constrains `B` to
 * extend `A`, so passing two different brands does not compile at all. At
 * runtime it compares the hidden type symbol, which only object-valued brands
 * carry; a brand over a primitive has nowhere to put the symbol, so the pair is
 * reported as matching and the compile-time constraint is the whole check.
 *
 * @example
 * ```ts
 * const a = brand('x', { a: 1 })
 * const b = brand('x', { b: 2 })
 * const r = nominalMatch(a, b) // true
 *
 * const c = flavor('x', 1)
 * const d = flavor('x', 2)
 * const r = nominalMatch(c, d) // true
 *
 * // nominalMatch(brand('x', { a: 1 }), brand('y', { a: 1 })) // does not compile
 * ```
 */
export function nominalMatch<A extends string, B extends A>(a: Brand<A, unknown>, b: Brand<B, unknown>): boolean
export function nominalMatch<A extends string, B extends A>(a: Flavor<A, unknown>, b: Flavor<B, unknown>): boolean
export function nominalMatch<A extends string, B extends A>(
	a: Brand<A, unknown> | Flavor<A, unknown>,
	b: Brand<B, unknown> | Flavor<B, unknown>,
) {
	if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) return a[typeSym] === b[typeSym]

	return true
}
