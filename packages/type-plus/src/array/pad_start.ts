import type { PadStart as PadStartTuple } from '../tuple/tuple_plus.pad_start.js'
import type { PadStart as PadStartArray } from './array_plus.pad_start.js'

/**
 * Pads the start of an array or tuple with `PadWith`.
 *
 * ⚗️ *transform*
 *
 * @example
 * ```ts
 * // Padding array
 * PadStart<number[], 1, string> // [string, ...number[]]
 *
 * // Ignore if the type is compatible
 * PadStart<number[], 2, number> // number[]
 * PadStart<number[], 3, 1> // number[]
 *
 * // Padding tuple
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Ignore if MaxLength is less than the length of the tuple
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Default to unknown
 * PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
 * ```
 */
export type PadStart<
	A extends readonly unknown[],
	MaxLength extends number,
	PadWith = unknown,
> = number extends A['length'] ? PadStartArray<A, MaxLength, PadWith> : PadStartTuple<A, MaxLength, PadWith>
