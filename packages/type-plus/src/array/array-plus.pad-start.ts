import type { Assignable } from '../predicates/assignable.js'
import type { CreateTuple } from '../tuple/create-tuple.js'
import type { UnionOfValues } from './union-of-values.js'

/**
 * ⚗️ *transform*
 *
 * Pads the start of the array `A` with `MaxLength` elements of `PadWith`.
 *
 * An array has no length to pad up to, so `MaxLength` is the number of
 * elements added. `A` is returned unchanged when `MaxLength` is `0`, or when
 * `PadWith` is already assignable to the element type of `A`.
 *
 * This is the array half of `PadStart`; `TuplePlus.PadStart` is the tuple half.
 *
 * @example
 * ```ts
 * type R = ArrayPlus.PadStart<string[], 2, number> // [number, number, ...string[]]
 * type R = ArrayPlus.PadStart<string[], 2, 'a'> // string[]
 * type R = ArrayPlus.PadStart<string[], 1> // [unknown, ...string[]]
 * ```
 */
export type PadStart<A extends readonly unknown[], MaxLength extends number, PadWith = unknown> = MaxLength extends 0
	? A
	: Assignable<PadWith, UnionOfValues<A>> extends true
		? A
		: PadStart<[...CreateTuple<MaxLength, PadWith>, ...A], MaxLength, PadWith>
