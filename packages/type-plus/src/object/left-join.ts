import type { IsEqual } from '../equal/is-equal.js'
import type { AnyRecord } from './any-record.js'
import type { IsDisjoint } from './is-disjoint.js'
import type { Properties } from './properties.js'

/**
 * ⚗️ *transform*
 *
 * Joins `B` onto `A`: the properties of `A` that `B` does not redeclare, plus
 * all of `B`. On a collision `B` wins.
 *
 * Modifiers are preserved. A property of `A` that `B` does not redeclare keeps
 * its `?` and `readonly` from `A`, and every property of `B` keeps its
 * modifiers from `B`. On a collision `B` wins the modifiers as well as the
 * type: the property is replaced whole, so `A`'s `?` or `readonly` on a key
 * that `B` redeclares does not carry over.
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
 *
 * // `?` and `readonly` carry over from `A`
 * type R = LeftJoin<{ a?: number; readonly b: string; c: 1 }, { c: 2 }>
 * // { a?: number; readonly b: string; c: 2 }
 *
 * // on a collision `B`'s modifiers win
 * type R = LeftJoin<{ a?: number; readonly b: string }, { a: string; b?: number }>
 * // { a: string; b?: number }
 * ```
 */
export type LeftJoin<A extends AnyRecord, B extends AnyRecord> = IsEqual<A, B> extends true
	? A
	: IsDisjoint<A, B> extends true
		? A & B
		: Properties<{ [k in keyof A as k extends keyof B ? never : k]: A[k] } & { [k in keyof B]: B[k] }>
