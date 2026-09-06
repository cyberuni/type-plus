import type { IsEqual } from '../equal/is_equal.js'
import type { AnyRecord } from './any_record.js'
import type { IsDisjoint } from './IsDisjoint.js'
import type { Properties } from './properties.js'

/**
 * ⚗️ *transform*
 *
 * Joins `B` onto `A`: the properties of `A` that `B` does not redeclare, plus
 * all of `B`. On a collision `B` wins.
 *
 * Unlike `SpreadRecord`, the overlapping case is flattened through
 * `Properties`, so the result is a single object type rather than an
 * intersection. The two short-circuits are not flattened: identical records
 * return `A` as-is, and records sharing no keys return the intersection
 * `A & B`.
 *
 * @example
 * ```ts
 * type R = LeftJoin<{ a: number; b: string }, { b: number; c: boolean }>
 * // { a: number; b: number; c: boolean }
 *
 * type R = LeftJoin<{ a: 1 }, { a: 1 }> // { a: 1 }
 * type R = LeftJoin<{ a: 1 }, { b: 2 }> // { a: 1 } & { b: 2 }
 * ```
 */
export type LeftJoin<A extends AnyRecord, B extends AnyRecord> = IsEqual<A, B> extends true
	? A
	: IsDisjoint<A, B> extends true
		? A & B
		: Properties<{ [k in Exclude<keyof A, keyof B>]: A[k] } & { [k in keyof B]: B[k] }>
